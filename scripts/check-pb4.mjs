import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import postcss from 'postcss';
import { createBrowser, sleep } from './lib/browser-session.mjs';

const base = process.env.TEST_BASE || 'http://localhost:3210';
const output = process.env.TEST_OUTPUT || '/tmp/pb4-check';
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
  const art=el('.pb4-artwork'), box=r(art), body=el('.pb4-body'), cap=el('.pb4-cap');
  const captions=q('.pb4-caption'), controls=q('.pb4-control'), labels=q('.pb4-label'), dots=q('.pb4-dot');
  const near=(a,b)=>Math.abs(a-b)<.002;
  return {
    content:q('.pb4-band').length===4&&captions.length===4&&q('.pb4-caption__icon svg').length===4,
    white:cs(el('.pb4-module')).backgroundColor==='rgb(255, 255, 255)',
    overflow:document.documentElement.scrollWidth<=innerWidth+1,
    referenceRatio:near(box.height/box.width,350/525),
    enlargedCanvas:Math.abs(box.width-Math.min(innerWidth,1320))<1,
    readableLabels:labels.every(e=>parseFloat(cs(e.querySelector('strong')).fontSize)>=box.width*29/525-.1&&parseFloat(cs(e.querySelector('span')).fontSize)>=box.width*10.8/525-.1),
    readableCaptions:captions.every(e=>parseFloat(cs(e).fontSize)>=(innerWidth<=600?Math.min(12,Math.max(9,innerWidth*.024)):Math.max(12,box.width*8.4/525))-.1),
    enlargedIcons:q('.pb4-caption__icon svg').every(e=>r(e).width>=parseFloat(cs(e.closest('.pb4-caption')).fontSize)*1.45-.1),
    enlargedDots:dots.every(e=>r(e).width>=box.width*9/525-.1),
    captionSeparation:captions.every((e,i)=>!i||r(e).top>=r(captions[i-1]).bottom+1),
    iconCopySeparation:captions.every(e=>{const text=[...e.children].find(c=>!c.classList.contains('pb4-caption__icon')&&cs(c).display!=='none');return r(text).left>=r(e.querySelector('.pb4-caption__icon')).right+1&&inside(text,e);}),
    bottlePosition:near((r(body).left-box.left)/box.width,67/525)&&near((r(body).top-box.top)/box.height,110/350),
    capPosition:near((r(cap).left-box.left)/box.width,127/525)&&near((r(cap).top-box.top)/box.height,33/350),
    capConnected:Math.abs(r(cap).bottom-r(body).top)<box.height*.008,
    bodyRatio:near(r(body).width/r(body).height,210/188),
    ordered:labels.every((e,i)=>!i||r(e).top>=r(labels[i-1]).bottom-3*box.width/525-1),
    paired:captions.every((e,i)=>r(e).left>r(labels[i]).right&&Math.abs((r(e).top+r(e).bottom)/2-(r(dots[i]).top+r(dots[i]).bottom)/2)<1),
    copy:q('.pb4-caption,.pb4-label').every(fits),
    textBounds:labels.every(e=>[...e.children].every(c=>inside(c,e))),
    bounds:[body,cap,...captions,...labels,...dots].every(e=>inside(e,art)),
    noDecorations:q('.pb4-module header,.pb4-module h2').length===0,
    named:el('.pb4-module').getAttribute('aria-label')==='Bốn bước chăm sóc làn da',
    masks:q('.pb4-cap,.pb4-body,.pb4-band').every(e=>(cs(e).webkitMaskImage||cs(e).maskImage).includes('pb4-')),
    tapTargets:controls.every(e=>r(e).width>=44&&r(e).height>=24),
    accessible:controls.every(e=>e.getAttribute('aria-label').length>60&&e.hasAttribute('aria-pressed')),
    mobileCopy:innerWidth>600||captions.every(e=>cs(e.querySelector('.pb4-caption__summary')).display!=='none'&&parseFloat(cs(e).fontSize)>=8),
    zoomAllowed:!/(user-scalable=no|maximum-scale=1)/.test(el('meta[name=viewport]').content)
  };
})()`;

async function key(value) {
  const codes={Enter:13,Escape:27,ArrowUp:38,ArrowDown:40,Home:36,End:35,Tab:9,' ':32};
  const text=value==='Enter'?'\r':value===' '?' ':undefined;
  const args={key:value,code:value===' '?'Space':value,windowsVirtualKeyCode:codes[value],nativeVirtualKeyCode:codes[value]};
  await b.send('Input.dispatchKeyEvent',{...args,type:'keyDown',text,unmodifiedText:text});
  await b.send('Input.dispatchKeyEvent',{...args,type:'keyUp'});
  await sleep(40);
}

try {
  for (const [width,height] of [[320,568],[375,667],[414,736],[430,932],[525,350],[600,800],[601,800],[736,414],[768,1024],[1024,768],[1100,900],[1320,900],[1440,1000],[1920,1080]]) {
    await b.navigate(`${base}/shapes/pb4-pump-bottle`,width,height,'.pb4-control');
    await b.send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:width===414?3:1,mobile:width<800});
    for (const [name,pass] of Object.entries(await b.evaluate(measure))) check(`${width} ${name}`,pass);
    await b.screenshot(`${output}/${width}.png`);
  }
  await b.navigate(`${base}/shapes/pb4-pump-bottle`,414,736,'.pb4-control');
  await b.evaluate(`document.querySelector('.pb4-control').focus()`);
  await key('Enter');
  check('Enter selects first band',await b.evaluate(`document.querySelector('.pb4-control').getAttribute('aria-pressed')==='true'&&document.querySelector('.pb4-band').classList.contains('is-selected')`));
  await key('ArrowDown');
  check('ArrowDown focus',await b.evaluate(`document.activeElement===document.querySelectorAll('.pb4-control')[1]`));
  await key(' ');
  check('Space selects second band exclusively',await b.evaluate(`document.querySelectorAll('.pb4-control[aria-pressed=true]').length===1&&document.querySelectorAll('.pb4-control')[1].getAttribute('aria-pressed')==='true'`));
  await key('Escape');
  check('Escape clears without losing focus',await b.evaluate(`document.querySelectorAll('.pb4-control[aria-pressed=true]').length===0&&document.activeElement===document.querySelectorAll('.pb4-control')[1]`));
  await key('End');
  check('End focus',await b.evaluate(`document.activeElement===document.querySelectorAll('.pb4-control')[3]`));
  await key('ArrowDown');
  check('ArrowDown wraps',await b.evaluate(`document.activeElement===document.querySelector('.pb4-control')`));
  await key('ArrowUp');
  check('ArrowUp wraps',await b.evaluate(`document.activeElement===document.querySelectorAll('.pb4-control')[3]`));
  await key('Home');
  await key('Tab');
  check('Tab focus',await b.evaluate(`document.activeElement===document.querySelectorAll('.pb4-control')[1]`));
  check('visible keyboard focus',await b.evaluate(`getComputedStyle(document.activeElement.querySelector('.pb4-label')).outlineStyle==='solid'`));
  await b.send('Emulation.setTouchEmulationEnabled',{enabled:true});
  const point=await b.evaluate(`(() => {const r=document.querySelectorAll('.pb4-label')[2].getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2};})()`);
  for (let i=0;i<2;i++) {
    await b.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[point]});
    await b.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
    await sleep(80);
    check(i?'touch toggles off':'touch selects third band',await b.evaluate(`document.querySelectorAll('.pb4-control')[2].getAttribute('aria-pressed')==='${i?'false':'true'}'`));
  }
  await b.send('Emulation.setPageScaleFactor',{pageScaleFactor:2});
  check('pinch zoom 200%',await b.evaluate('visualViewport.scale>=1.99'));
  await b.send('Emulation.setPageScaleFactor',{pageScaleFactor:1});
  await b.send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
  check('reduced motion',await b.evaluate(`getComputedStyle(document.querySelector('.pb4-band')).transitionDuration==='0s'`));
  await b.evaluate(`document.querySelector('.pb4-artwork').style.fontFamily='system-ui'`);
  for (const [name,pass] of Object.entries(await b.evaluate(measure))) check(`system font ${name}`,pass);

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
  await b.navigate(`${base}/shapes/pb4-pump-bottle?no-js=1`,414,736,'.pb4-control');
  check('server rendered without JavaScript',await b.evaluate(`document.querySelectorAll('.pb4-band').length===4&&document.querySelectorAll('.pb4-caption').length===4`));
  for (const [name,pass] of Object.entries(await b.evaluate(measure))) check(`SSR ${name}`,pass);
  await b.send('Emulation.setScriptExecutionDisabled',{value:false});
  const css=await readFile(new URL('../src/components/shapes/pb4-pump-bottle/pb4-pump-bottle.css',import.meta.url),'utf8');
  check('no unsupported layout dependencies',!/@container|[\d.](?:cqw|dvh)\b|color-mix\(/.test(css));
  for (const [index,name] of ['cap','body','band-01','band-02','band-03','band-04'].entries()) {
    const folder=new URL('../public/assets/shapes/pb4-pump-bottle/',import.meta.url);
    const original=await readFile(new URL(`originals/pb4-source-0${index+1}.svg`,folder),'utf8');
    const mask=await readFile(new URL(`pb4-${name}-mask.svg`,folder),'utf8');
    const paths=svg=>[...svg.matchAll(/\bd="([^"]+)"/g)].map(m=>m[1]);
    check(`${name} path unchanged`,JSON.stringify(paths(original))===JSON.stringify(paths(mask))&&paths(mask).length===1);
    check(`${name} mask served`,(await fetch(`${base}/assets/shapes/pb4-pump-bottle/pb4-${name}-mask.svg`)).ok);
  }
  check('no browser errors',b.errors.length===0);
} finally { await b.close(); }
await writeFile(`${output}/results.json`,JSON.stringify({checks,failures},null,2));
console.log(`TOTAL ${checks}; FAILURES ${failures.length}`);
assert.deepEqual(failures,[]);
