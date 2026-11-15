import assert from 'node:assert/strict';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { createBrowser, sleep } from './lib/browser-session.mjs';

const base = process.env.TEST_BASE || 'http://localhost:3210';
const output = process.env.TEST_OUTPUT || '/tmp/cb5-check';
await mkdir(output, { recursive: true });
const b = await createBrowser();
const failures = [];
let checks = 0;
function check(name, pass) {
  checks++;
  console.log(pass ? 'PASS' : 'FAIL', name);
  if (!pass) failures.push(name);
}
const measure = `(() => {
  const q=s=>Array.from(document.querySelectorAll(s)), el=s=>document.querySelector(s);
  const rect=e=>e.getBoundingClientRect();
  const visible=e=>getComputedStyle(e).display!=='none';
  const inside=(e,p)=>{const a=rect(e),b=rect(p);return a.left>=b.left-1&&a.right<=b.right+1&&a.top>=b.top-1&&a.bottom<=b.bottom+1;};
  const fits=e=>e.scrollWidth<=e.clientWidth+1&&e.scrollHeight<=e.clientHeight+1;
  const rows=q('.cb5-row'), board=el('.cb5-board'), stage=el('.cb5-stage');
  const boardRect=rect(board), stageRect=rect(stage);
  const artworkRect=rect(el('.cb5-artwork'));
  return {
    counts:rows.length===5&&q('.cb5-checklist li').length===5&&q('.cb5-row__icon svg').length===5,
    noDecorations:q('.cb5-heading,.cb5-business-icons').length===0&&!/business\\s+infographic/i.test(el('.cb5-module').textContent),
    compactArtwork:Math.abs(artworkRect.top-stageRect.top)<1&&Math.abs(artworkRect.height-stageRect.height)<1,
    namedSection:el('.cb5-module').getAttribute('aria-label')==='Bảng kẹp & năm bước phát triển',
    white:getComputedStyle(el('.cb5-module')).backgroundColor==='rgb(255, 255, 255)',
    overflow:document.documentElement.scrollWidth<=innerWidth+1,
    copy:q('.cb5-row__copy,.cb5-checklist li').every(fits),
    textBounds:q('.cb5-row__copy strong,.cb5-row__copy > span').filter(visible).every(e=>inside(e,e.closest('.cb5-row'))),
    checklistBounds:q('.cb5-checklist li').every(e=>inside(e,el('.cb5-paper'))),
    order:rows.every((e,i)=>!i||rect(e).top>=rect(rows[i-1]).bottom),
    ratio:Math.abs(stageRect.height/stageRect.width-.555)<.001,
    overlap:Math.abs((boardRect.left-stageRect.left)/stageRect.width-.615)<.001&&rect(rows[0]).right>boardRect.left,
    clip:rect(el('.cb5-clip')).top<boardRect.top&&rect(el('.cb5-clip')).bottom>boardRect.top,
    tapTargets:rows.every(e=>rect(e).height>=24&&rect(e).width>=24),
    zoomAllowed:!/(user-scalable=no|maximum-scale=1)/.test(el('meta[name=viewport]').content),
    accessible:rows.every(e=>e.getAttribute('aria-label')?.length>45&&e.hasAttribute('aria-pressed'))
  };
})()`;

try {
  for (const [width,height] of [[320,568],[375,667],[414,736],[736,414],[768,1024],[1024,768],[1440,1000]]) {
    await b.navigate(`${base}/shapes/cb5-clipboard`,width,height,'.cb5-row');
    await b.send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:true});
    await sleep(50);
    for(const [name,pass] of Object.entries(await b.evaluate(measure))) check(`${width}x${height} ${name}`,pass);
    await b.screenshot(`${output}/cb5-${width}x${height}.png`);
  }
  // iOS does not necessarily have the desktop condensed fonts installed.
  await b.evaluate(`document.querySelector('.cb5-artwork').style.fontFamily='Helvetica Neue, Arial, sans-serif'`);
  for (const width of [320,375,414,612,736]) {
    await b.send('Emulation.setDeviceMetricsOverride',{width,height:736,deviceScaleFactor:1,mobile:true});
    const result=await b.evaluate(measure);
    check(`system font ${width} copy and bounds`,result.copy&&result.textBounds&&result.checklistBounds);
  }
  await b.evaluate(`document.querySelector('.cb5-artwork').style.removeProperty('font-family')`);
  await b.navigate(`${base}/shapes/cb5-clipboard`,414,736,'.cb5-row');
  const masks = await b.evaluate(`Array.from(document.querySelectorAll('.cb5-module *')).map(e=>getComputedStyle(e).maskImage)`);
  const assets = [...new Set(masks.flatMap(mask=>[...mask.matchAll(/url\("?([^"\)]+)"?\)/g)].map(match=>match[1])))];
  check('all five shape masks used',assets.length===5);
  for(const asset of assets) check(`asset ${asset.split('/').pop()}`,(await fetch(asset)).ok);
  await b.evaluate(`document.querySelector('.cb5-row').focus()`);
  async function key(value) {
    const codes={Enter:13,Escape:27,ArrowDown:40,ArrowUp:38,Home:36,End:35,' ':32};
    const code=value===' '?'Space':value;
    const text=value==='Enter'?'\r':value===' '?' ':undefined;
    await b.send('Input.dispatchKeyEvent',{type:'keyDown',key:value,code,windowsVirtualKeyCode:codes[value],nativeVirtualKeyCode:codes[value],text,unmodifiedText:text});
    await b.send('Input.dispatchKeyEvent',{type:'keyUp',key:value,code,windowsVirtualKeyCode:codes[value],nativeVirtualKeyCode:codes[value]});
    await sleep(30);
  }
  await key('ArrowDown');
  check('ArrowDown focuses second row',await b.evaluate(`document.activeElement===document.querySelectorAll('.cb5-row')[1]`));
  await key('End');
  check('End focuses fifth row',await b.evaluate(`document.activeElement===document.querySelectorAll('.cb5-row')[4]`));
  await key('Home');
  await key('Enter');
  check('Enter selects row',await b.evaluate(`document.querySelector('.cb5-row').getAttribute('aria-pressed')==='true'`));
  await key(' ');
  check('Space toggles selected row',await b.evaluate(`document.querySelector('.cb5-row').getAttribute('aria-pressed')==='false'`));
  await key('Enter');
  await key('Escape');
  check('Escape clears selection, keeps focus',await b.evaluate(`document.querySelector('.cb5-row').getAttribute('aria-pressed')==='false'&&document.activeElement===document.querySelector('.cb5-row')`));
  await b.send('Emulation.setTouchEmulationEnabled',{enabled:true});
  const point=await b.evaluate(`(() => {const r=document.querySelectorAll('.cb5-row')[2].getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2};})()`);
  await b.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[point]});
  await b.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
  await sleep(50);
  check('tap selects third row',await b.evaluate(`document.querySelectorAll('.cb5-row')[2].getAttribute('aria-pressed')==='true'`));
  await b.send('Emulation.setPageScaleFactor',{pageScaleFactor:2});
  check('pinch zoom 200%',await b.evaluate('visualViewport.scale>=1.99'));
  await b.send('Emulation.setPageScaleFactor',{pageScaleFactor:1});
  await b.send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
  check('reduced motion',await b.evaluate(`getComputedStyle(document.querySelector('.cb5-row__shape')).transitionDuration==='0s'`));
  await b.send('Emulation.setScriptExecutionDisabled',{value:true});
  await b.navigate(`${base}/shapes/cb5-clipboard?no-js=1`,414,736,'.cb5-row');
  check('server-rendered without JavaScript',await b.evaluate(`document.querySelectorAll('.cb5-row').length===5&&document.querySelectorAll('.cb5-checklist li').length===5`));
  const noJs=await b.evaluate(measure);
  check('clean composition without JavaScript',noJs.noDecorations&&noJs.compactArtwork&&noJs.namedSection);
  await b.send('Emulation.setScriptExecutionDisabled',{value:false});
  const css=await readFile(new URL('../src/components/shapes/cb5-clipboard/cb5-clipboard.css',import.meta.url),'utf8');
  check('no modern-only CSS units or queries',!/@container|\d(?:cqw|dvh)\b|color-mix\(/.test(css));
  check('no browser errors',b.errors.length===0);
} finally { await b.close(); }
await writeFile(`${output}/results.json`,JSON.stringify({checks,failures},null,2));
console.log(`TOTAL ${checks}; FAILURES ${failures.length}`);
assert.deepEqual(failures,[]);
