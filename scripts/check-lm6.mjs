import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import postcss from 'postcss';
import { createBrowser, sleep } from './lib/browser-session.mjs';

const base = process.env.TEST_BASE || 'http://localhost:3210';
const output = process.env.TEST_OUTPUT || '/tmp/lm6-check';
await mkdir(output, { recursive: true });
const b = await createBrowser();
let checks = 0;
const failures = [];
function check(name, pass) {
  checks++;
  console.log(pass ? 'PASS' : 'FAIL', name);
  if (!pass) failures.push(name);
}
const measure = `(() => {
  const q=s=>[...document.querySelectorAll(s)],el=s=>document.querySelector(s);
  const r=e=>e.getBoundingClientRect(),cs=e=>getComputedStyle(e);
  const fits=e=>e.scrollWidth<=e.clientWidth+1&&e.scrollHeight<=e.clientHeight+1;
  const inside=(e,p)=>{const a=r(e),b=r(p);return a.left>=b.left-1&&a.right<=b.right+1&&a.top>=b.top-1&&a.bottom<=b.bottom+1;};
  const art=el('.lm6-artwork'),box=r(art),arrows=q('.lm6-arrow'),caps=q('.lm6-caption'),reflections=q('.lm6-reflection'),controls=q('.lm6-control');
  const near=(a,b)=>Math.abs(a-b)<.002;
  return {
    content:arrows.length===6&&caps.length===6&&q('.lm6-caption li svg').length===12,
    white:cs(el('.lm6-module')).backgroundColor==='rgb(255, 255, 255)',
    overflow:document.documentElement.scrollWidth<=innerWidth+1,
    referenceRatio:near(box.height/box.width,.75),
    canvasSize:Math.abs(box.width-Math.min(innerWidth,1320))<1,
    arrowCoordinates:arrows.every((e,i)=>near((r(e).left-box.left)/box.width,[19,167,315,464,613,762][i]/960)&&near((r(e).top-box.top)/box.height,316/720)),
    arrowRatio:arrows.every(e=>near(r(e).width/r(e).height,184/156)),
    captionCoordinates:caps.every((e,i)=>near((r(e).left-box.left)/box.width,[9,171,326,470,618,763][i]/960)&&near((r(e).top-box.top)/box.height,(i%2?530:110)/720)),
    alternating:caps.every((e,i)=>i%2?r(e).top>r(reflections[i]).bottom:r(e).bottom<r(arrows[i]).top),
    captionSeparation:caps.every((e,i)=>i<2||r(e).left>r(caps[i-2]).right),
    reflectionAttached:reflections.every((e,i)=>Math.abs(r(e).top-r(arrows[i]).bottom)<1&&near(r(e).height/box.height,51/720)),
    reflectionNumber:reflections.every(e=>cs(e.querySelector('span')).transform.includes('0.32')),
    surfaces:q('.lm6-surface').length===24&&q('.lm6-surface,.lm6-reflection').every(e=>(cs(e).webkitMaskImage||cs(e).maskImage).includes('lm6-')),
    copy:q('.lm6-heading,.lm6-caption,.lm6-caption h3,.lm6-caption li').every(fits),
    textBounds:q('.lm6-caption li').every(e=>[...e.children].filter(c=>cs(c).display!=='none').every(c=>inside(c,e))),
    bounds:[el('.lm6-heading'),...arrows,...caps,...reflections].every(e=>inside(e,art)),
    numbers:q('.lm6-number').map(e=>e.textContent).join('')==='123456',
    named:el('.lm6-module').getAttribute('aria-label')==='Cấp độ và cột mốc — sáu giai đoạn',
    accessible:controls.every(e=>e.getAttribute('aria-label').length>60&&e.hasAttribute('aria-pressed')),
    tapTargets:controls.every(e=>r(e).width>=44&&r(e).height>=44),
    visibleHitTargets:controls.every(e=>{const p=r(e);return document.elementFromPoint(p.left+p.width*.38,p.top+p.height*.6)===e.querySelector('strong');}),
    mobileCopy:innerWidth>600||caps.every(e=>cs(e.querySelector('.lm6-caption__short')).display!=='none'&&parseFloat(cs(e.querySelector('li')).fontSize)>=9),
    zoomAllowed:!/(user-scalable=no|maximum-scale=1)/.test(el('meta[name=viewport]').content)
  };
})()`;
async function measureAt(label) {
  for (const [name, pass] of Object.entries(await b.evaluate(measure))) check(`${label} ${name}`, pass);
}
async function key(value) {
  const codes={Enter:13,Escape:27,ArrowLeft:37,ArrowRight:39,Home:36,End:35,Tab:9,' ':32};
  const text=value==='Enter'?'\r':value===' '?' ':undefined;
  const args={key:value,code:value===' '?'Space':value,windowsVirtualKeyCode:codes[value],nativeVirtualKeyCode:codes[value]};
  await b.send('Input.dispatchKeyEvent',{...args,type:'keyDown',text,unmodifiedText:text});
  await b.send('Input.dispatchKeyEvent',{...args,type:'keyUp'});
  await sleep(40);
}

try {
  for (const [width,height] of [[320,568],[375,667],[414,736],[430,932],[525,700],[600,800],[601,800],[736,600],[768,1024],[960,720],[1024,900],[1320,1000],[1440,1100],[1920,1200]]) {
    await b.navigate(`${base}/shapes/lm6-levels-marks`,width,height,'.lm6-control');
    await measureAt(width);
    await b.screenshot(`${output}/${width}.png`);
  }
  await b.navigate(`${base}/shapes/lm6-levels-marks`,960,720,'.lm6-control');
  await key('Tab');
  check('Tab focuses first stage',await b.evaluate(`document.activeElement===document.querySelector('.lm6-control')`));
  await key('Enter');
  check('Enter selects first stage',await b.evaluate(`document.querySelector('.lm6-control').getAttribute('aria-pressed')==='true'`));
  for (const [value,index] of [['ArrowRight',1],['End',5],['ArrowRight',0],['ArrowLeft',5],['Home',0]]) {
    await key(value);
    check(`keyboard ${value} ${index}`,await b.evaluate(`document.activeElement===document.querySelectorAll('.lm6-control')[${index}]`));
  }
  await key(' ');
  check('Space toggles off',await b.evaluate(`!document.querySelector('.lm6-stage.is-selected')`));
  await key('Enter');
  await key('Escape');
  check('Escape clears and retains focus',await b.evaluate(`!document.querySelector('.lm6-stage.is-selected')&&document.activeElement===document.querySelector('.lm6-control')`));
  check('focus visible',await b.evaluate(`getComputedStyle(document.activeElement).outlineStyle==='solid'`));
  await b.navigate(`${base}/shapes/lm6-levels-marks`,414,736,'.lm6-control');
  await b.send('Emulation.setDeviceMetricsOverride',{width:414,height:736,deviceScaleFactor:3,mobile:true});
  await b.send('Emulation.setTouchEmulationEnabled',{enabled:true});
  for (let i=0;i<6;i++) {
    const point=await b.evaluate(`(() => {const r=document.querySelectorAll('.lm6-control')[${i}].getBoundingClientRect();return {x:r.left+r.width*.38,y:r.top+r.height*.6};})()`);
    await b.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[point]});
    await b.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
    await sleep(60);
    check(`touch selects stage ${i+1}`,await b.evaluate(`document.querySelectorAll('.lm6-control')[${i}].getAttribute('aria-pressed')==='true'&&document.querySelectorAll('.lm6-stage.is-selected').length===1`));
  }
  await b.send('Emulation.setPageScaleFactor',{pageScaleFactor:2});
  check('pinch zoom 200%',await b.evaluate('visualViewport.scale>=1.99'));
  await b.send('Emulation.setPageScaleFactor',{pageScaleFactor:1});
  await b.send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
  check('reduced motion',await b.evaluate(`getComputedStyle(document.querySelector('.lm6-arrow')).transitionDuration==='0s'`));
  await b.evaluate(`document.querySelector('.lm6-artwork').style.fontFamily='system-ui'`);
  for (const [width,height] of [[320,568],[414,736],[601,800],[960,720],[1440,1100]]) {
    await b.send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:true});
    await measureAt(`system font ${width}`);
  }
  await b.screenshot(`${output}/system-font.png`);
  await b.evaluate(`document.querySelector('.lm6-artwork').style.fontFamily=''`);

  // Remove modern features to exercise the iOS 15 prefixed-mask fallback.
  // This is Chrome regression coverage, not an actual Safari/iPhone test.
  const sheets=await b.evaluate(`[...document.styleSheets].map(s=>({href:s.href,text:s.ownerNode.textContent}))`);
  const legacy=await Promise.all(sheets.map(async sheet=>{
    const css=postcss.parse(sheet.href?await fetch(sheet.href).then(r=>r.text()):sheet.text);
    css.walkAtRules('container',rule=>rule.remove());
    css.walkDecls(decl=>{if (/^(mask|container)(-|$)/.test(decl.prop)||/[\d.]cq[whib]\b|[\d.]dvh\b|color-mix\(/.test(decl.value)) decl.remove();});
    return css.toString();
  }));
  await b.evaluate(`(() => {[...document.styleSheets].forEach(s=>{s.disabled=true;});const style=document.createElement('style');style.textContent=${JSON.stringify(legacy.join('\n'))};document.head.append(style);})()`);
  for (const [width,height] of [[320,568],[414,736],[736,414],[1440,1100]]) {
    await b.send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:true});
    await measureAt(`prefixed-only ${width}`);
    if(width===736) {
      await b.evaluate(`window.scrollTo(0,document.documentElement.scrollHeight)`);
      check('landscape bottom captions reachable',await b.evaluate(`[...document.querySelectorAll('.lm6-stage:nth-child(even) .lm6-caption')].every(e=>e.getBoundingClientRect().bottom<=innerHeight+1)`));
      await b.screenshot(`${output}/landscape-scrolled.png`);
      await b.evaluate('window.scrollTo(0,0)');
    }
  }
  await b.send('Emulation.setScriptExecutionDisabled',{value:true});
  await b.navigate(`${base}/shapes/lm6-levels-marks?no-js=1`,414,736,'.lm6-control');
  await measureAt('SSR without JS');
  await b.send('Emulation.setScriptExecutionDisabled',{value:false});
  const root=new URL('../public/assets/shapes/lm6-levels-marks/',import.meta.url);
  const manifest=JSON.parse(await readFile(new URL('manifest.json',root),'utf8'));
  for (const asset of [...manifest.originals,manifest.reference]) {
    const data=await readFile(new URL(asset.file,root));
    check(`${asset.file} archive hash`,createHash('sha256').update(data).digest('hex')===asset.sha256);
  }
  const originals=await Promise.all(manifest.originals.map(asset=>readFile(new URL(asset.file,root),'utf8')));
  const geometry=svg=>[...svg.matchAll(/<(?:path|polygon)\b[^>]*\/>/g)].map(m=>m[0]);
  for (const [i,asset] of manifest.masks.entries()) {
    const svg=await readFile(new URL(asset.file,root),'utf8');
    check(`${asset.file} geometry unchanged`,geometry(svg)[0]===geometry(originals[i<4?0:1])[i<4?i:0]);
    check(`${asset.file} served`,(await fetch(`${base}/assets/shapes/lm6-levels-marks/${asset.file}`)).ok);
  }
  const css=await readFile(new URL('../src/components/shapes/lm6-levels-marks/lm6-levels-marks.css',import.meta.url),'utf8');
  check('no unsupported layout dependencies',!/@container|[\d.](?:cqw|dvh)\b|color-mix\(|:has\(/.test(css));
  check('no browser errors',b.errors.length===0);
} finally {await b.close();}
await writeFile(`${output}/results.json`,JSON.stringify({checks,failures},null,2));
console.log(`TOTAL ${checks}; FAILURES ${failures.length}`);
assert.deepEqual(failures,[]);
