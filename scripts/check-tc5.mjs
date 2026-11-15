import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import postcss from 'postcss';
import { createBrowser, sleep } from './lib/browser-session.mjs';

const base = process.env.TEST_BASE || 'http://localhost:3210';
const output = process.env.TEST_OUTPUT || '/tmp/tc5-check';
await mkdir(output, { recursive: true });
let checks = 0;
const failures = [];
const b = await createBrowser();
function check(name, pass) {
  checks++;
  console.log(pass ? 'PASS' : 'FAIL', name);
  if (!pass) failures.push(name);
}
const measure = `(() => {
  const q=s=>[...document.querySelectorAll(s)], el=s=>document.querySelector(s);
  const r=e=>e.getBoundingClientRect(), cs=e=>getComputedStyle(e);
  const fits=e=>e.scrollWidth<=e.clientWidth+1&&e.scrollHeight<=e.clientHeight+1;
  const inside=(e,p)=>{const a=r(e),b=r(p);return a.left>=b.left-1&&a.right<=b.right+1&&a.top>=b.top-1&&a.bottom<=b.bottom+1;};
  const art=el('.tc5-artwork'), box=r(art), cups=q('.tc5-cup'), captions=q('.tc5-caption'), controls=q('.tc5-control');
  const near=(a,b)=>Math.abs(a-b)<.002;
  return {
    content:cups.length===5&&captions.length===5&&q('.tc5-cup__icon svg').length===5,
    white:cs(el('.tc5-module')).backgroundColor==='rgb(255, 255, 255)',
    overflow:document.documentElement.scrollWidth<=innerWidth+1,
    referenceRatio:near(box.height/box.width,500/715),
    referencePosition:near((r(cups[0]).left-box.left)/box.width,96/715)&&near((r(cups[0]).top-box.top)/box.height,158/500),
    cupRatio:near(r(cups[0]).width/r(cups[0]).height,141/160)&&near(r(cups[1]).width/r(cups[1]).height,113/160),
    horizontal:cups.every(e=>Math.abs(r(e).top-r(cups[0]).top)<1&&Math.abs(r(e).bottom-r(cups[0]).bottom)<1),
    layered:cups.slice(1).every((e,i)=>r(e).left<r(cups[i]).right&&r(e).left>r(cups[i]).left),
    captions:captions.every((e,i)=>r(e).top>r(cups[i]).bottom&&(!i||r(e).left>=r(captions[i-1]).right)),
    copy:q('.tc5-caption,.tc5-cup__number').every(fits),
    textBounds:q('.tc5-caption h3,.tc5-caption > strong,.tc5-caption p').filter(e=>cs(e).display!=='none').every(e=>inside(e,e.closest('.tc5-caption'))),
    bounds:[...cups,...captions].every(e=>inside(e,art)),
    noDecorations:q('.tc5-heading,.tc5-podium,.tc5-module header,.tc5-module h2').length===0&&!el('.tc5-module').textContent.includes('Năm bước nhỏ, một hành trình lớn.'),
    named:el('.tc5-module').getAttribute('aria-label')==='Năm cúp thành tựu'&&!el('.tc5-module').hasAttribute('aria-labelledby'),
    masks:cups.every(e=>(cs(e).webkitMaskImage||cs(e).maskImage).includes('tc5-')),
    tapTargets:controls.every(e=>r(e).width>=40&&r(e).height>=44),
    accessible:controls.every(e=>e.getAttribute('aria-label').length>45&&e.hasAttribute('aria-pressed')),
    zoomAllowed:!/(user-scalable=no|maximum-scale=1)/.test(el('meta[name=viewport]').content)
  };
})()`;

async function key(value) {
  const codes={Enter:13,Escape:27,ArrowLeft:37,ArrowRight:39,Home:36,End:35,' ':32};
  const text=value==='Enter'?'\r':value===' '?' ':undefined;
  const args={key:value,code:value===' '?'Space':value,windowsVirtualKeyCode:codes[value],nativeVirtualKeyCode:codes[value]};
  await b.send('Input.dispatchKeyEvent',{...args,type:'keyDown',text,unmodifiedText:text});
  await b.send('Input.dispatchKeyEvent',{...args,type:'keyUp'});
  await sleep(40);
}

try {
  for (const [width,height] of [[320,568],[375,667],[414,736],[430,932],[600,800],[715,500],[736,414],[768,1024],[1024,768],[1440,1000]]) {
    await b.navigate(`${base}/shapes/tc5-trophy-cups`,width,height,'.tc5-control');
    await b.send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:width===414?3:1,mobile:true});
    await sleep(60);
    for (const [name,pass] of Object.entries(await b.evaluate(measure))) check(`${width}x${height} ${name}`,pass);
    await b.screenshot(`${output}/tc5-${width}x${height}.png`);
  }
  // iPhones need not have the desktop condensed typeface installed.
  await b.evaluate(`document.querySelector('.tc5-artwork').style.fontFamily='Helvetica Neue, Arial, sans-serif'`);
  for (const width of [320,375,414,600,736,1100]) {
    await b.send('Emulation.setDeviceMetricsOverride',{width,height:736,deviceScaleFactor:1,mobile:true});
    const result=await b.evaluate(measure);
    check(`system font ${width}`,result.copy&&result.textBounds&&result.bounds);
  }
  await b.evaluate(`document.querySelector('.tc5-artwork').style.removeProperty('font-family')`);
  await b.navigate(`${base}/shapes/tc5-trophy-cups`,414,736,'.tc5-control');
  await b.evaluate(`document.querySelector('.tc5-control').focus()`);
  await key('ArrowRight');
  check('Right focuses second cup',await b.evaluate(`document.activeElement===document.querySelectorAll('.tc5-control')[1]`));
  await key('End');
  check('End focuses last cup',await b.evaluate(`document.activeElement===document.querySelectorAll('.tc5-control')[4]`));
  await key('ArrowRight');
  check('Right wraps to first cup',await b.evaluate(`document.activeElement===document.querySelector('.tc5-control')`));
  await key('ArrowLeft');
  check('Left wraps to last cup',await b.evaluate(`document.activeElement===document.querySelectorAll('.tc5-control')[4]`));
  await key('Home');
  check('visible keyboard focus',await b.evaluate(`getComputedStyle(document.querySelector('.tc5-control')).outlineStyle==='solid'`));
  await key('Enter');
  check('Enter selects cup',await b.evaluate(`document.querySelector('.tc5-control').getAttribute('aria-pressed')==='true'`));
  await key(' ');
  check('Space toggles selection',await b.evaluate(`document.querySelector('.tc5-control').getAttribute('aria-pressed')==='false'`));
  await key('Enter');
  await key('Escape');
  check('Escape clears selection and keeps focus',await b.evaluate(`document.querySelector('.tc5-control').getAttribute('aria-pressed')==='false'&&document.activeElement===document.querySelector('.tc5-control')`));
  await b.send('Emulation.setTouchEmulationEnabled',{enabled:true});
  const point=await b.evaluate(`(() => {const r=document.querySelectorAll('.tc5-control')[2].getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2};})()`);
  await b.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[point]});
  await b.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
  await sleep(80);
  check('touch selects third cup',await b.evaluate(`document.querySelectorAll('.tc5-control')[2].getAttribute('aria-pressed')==='true'`));
  await b.send('Emulation.setPageScaleFactor',{pageScaleFactor:2});
  check('pinch zoom 200%',await b.evaluate('visualViewport.scale>=1.99'));
  await b.send('Emulation.setPageScaleFactor',{pageScaleFactor:1});
  await b.send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
  check('reduced motion',await b.evaluate(`getComputedStyle(document.querySelector('.tc5-cup')).transitionDuration==='0s'`));

  const sheets=await b.evaluate(`[...document.styleSheets].map(s=>({href:s.href,text:s.ownerNode.textContent}))`);
  const legacy=await Promise.all(sheets.map(async sheet=>{
    const css=postcss.parse(sheet.href?await fetch(sheet.href).then(r=>r.text()):sheet.text);
    css.walkAtRules('container',rule=>rule.remove());
    css.walkDecls(decl=>{
      if (/^(mask|container)(-|$)/.test(decl.prop)||/[\d.]cq[whib]\b|[\d.]dvh\b|color-mix\(/.test(decl.value)) decl.remove();
    });
    return css.toString();
  }));
  await b.evaluate(`(() => { [...document.styleSheets].forEach(s=>{s.disabled=true;}); const style=document.createElement('style');style.textContent=${JSON.stringify(legacy.join('\n'))};document.head.append(style);})()`);
  for (const [width,height] of [[320,568],[414,736],[736,414],[1440,1000]]) {
    await b.send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:true});
    for (const [name,pass] of Object.entries(await b.evaluate(measure))) check(`prefixed-only ${width} ${name}`,pass);
  }
  await b.screenshot(`${output}/prefixed-only.png`);
  await b.send('Emulation.setScriptExecutionDisabled',{value:true});
  await b.navigate(`${base}/shapes/tc5-trophy-cups?no-js=1`,414,736,'.tc5-control');
  check('server rendered without JavaScript',await b.evaluate(`document.querySelectorAll('.tc5-cup').length===5&&document.querySelectorAll('.tc5-caption').length===5`));
  await b.send('Emulation.setScriptExecutionDisabled',{value:false});
  const css=await readFile(new URL('../src/components/shapes/tc5-trophy-cups/tc5-trophy-cups.css',import.meta.url),'utf8');
  check('no unsupported layout dependencies',!/@container|[\d.](?:cqw|dvh)\b|color-mix\(/.test(css));
  for (const [index,name] of ['first','next'].entries()) {
    const folder=new URL('../public/assets/shapes/tc5-trophy-cups/',import.meta.url);
    const original=await readFile(new URL(`originals/tc5-source-0${index+1}.svg`,folder),'utf8');
    const mask=await readFile(new URL(`tc5-${name}-cup-mask.svg`,folder),'utf8');
    const paths=svg=>[...svg.matchAll(/\bd="([^"]+)"/g)].map(m=>m[1].replace(/\s+/g,' '));
    check(`${name} cup paths unchanged`,JSON.stringify(paths(original))===JSON.stringify(paths(mask))&&paths(mask).length===2);
    check(`${name} mask served`,(await fetch(`${base}/assets/shapes/tc5-trophy-cups/tc5-${name}-cup-mask.svg`)).ok);
  }
  check('no browser errors',b.errors.length===0);
} finally { await b.close(); }
await writeFile(`${output}/results.json`,JSON.stringify({checks,failures},null,2));
console.log(`TOTAL ${checks}; FAILURES ${failures.length}`);
assert.deepEqual(failures,[]);
