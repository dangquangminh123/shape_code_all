import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { createBrowser, sleep } from './lib/browser-session.mjs';
const base = process.env.TEST_BASE || 'http://localhost:3212';
const output = process.env.TEST_OUTPUT || '/tmp/shape-auto-motion-check';
await mkdir(output, { recursive: true });
const b = await createBrowser();
const failures = [];
let checks = 0;
function check(label, pass) { checks++; console.log(pass ? 'PASS' : 'FAIL', label); if (!pass) failures.push(label); }
async function wait(expression, label, timeout = 8000) {
  for (let i = 0; i < timeout / 50; i++) { if (await b.evaluate(expression)) return; await sleep(50); }
  throw new Error(`Timed out: ${label}`);
}
const status = id => b.evaluate(`__shapeAutoMotion.status().find(r=>r.id===${JSON.stringify(id)})`);
const auto = `document.getAnimations().filter(a=>a.id.startsWith('shape-auto:'))`;
const media = value => b.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value }] });
try {
  await b.send('Emulation.setFocusEmulationEnabled', { enabled: true });
  await media('reduce');
  await b.navigate(`${base}/`, 1440, 1000, '.lm6-module');
  await wait('!!window.__shapeAutoMotion', 'engine');
  const recipes = await b.evaluate('__shapeAutoMotion.list()');
  check('17 different recipes', recipes.length === 17 && new Set(recipes.map(r => r.name)).size === 17);
  const baseline = await b.evaluate(`__shapeAutoMotion.list().map(r=>({id:r.id,html:document.querySelector(r.root).outerHTML}))`);
  await media('no-preference');
  for (const recipe of recipes) {
    const id = JSON.stringify(recipe.id);
    // Force a real offscreen/re-entry cycle, even when adjacent short roots share the viewport.
    await b.evaluate(`scrollTo(0, ${recipe.id === 'step-stack-demo' ? 'document.body.scrollHeight' : '0'})`);
    await sleep(100);
    await b.evaluate(`document.querySelector(${JSON.stringify(recipe.root)}).scrollIntoView({block:'center'})`);
    await wait(`__shapeAutoMotion.status().find(r=>r.id===${id}).running`, `${recipe.id} entrance`);
    let state = await status(recipe.id);
    check(`${recipe.id}: all selector counts match`, state.instances.every(r => r.mismatches.length === 0));
    check(`${recipe.id}: autonomous entrance`, state.instances[0].phase === 'entrance');
    await wait(`__shapeAutoMotion.status().find(r=>r.id===${id}).instances[0].phase==='idle'`, `${recipe.id} idle`);
    state = await status(recipe.id);
    check(`${recipe.id}: one idle effect, no errors`, state.instances[0].animations === 1 && state.running && !state.instances[0].errors.length);
    check(`${recipe.id}: no offscreen effects`, await b.evaluate(`__shapeAutoMotion.status().filter(r=>!r.visible).every(r=>!r.running && r.instances.every(i=>i.animations===0))`));
    check(`${recipe.id}: DOM/style/mask geometry untouched`, await b.evaluate(`document.querySelector(${JSON.stringify(recipe.root)}).outerHTML`) === baseline.find(r => r.id === recipe.id).html);
    await b.evaluate(`__shapeAutoMotion.replay(${id}); __shapeAutoMotion.pause()`);
    check(`${recipe.id}: neutral transforms preserve CSS`, await b.evaluate(`(() => {
      const list=${auto}.filter(a=>a.id.startsWith('shape-auto:'+${id}+':') && a.effect.getKeyframes().some(k=>'transform' in k));
      return list.every(a=>{ a.currentTime=a.effect.getTiming().delay+a.effect.getTiming().duration-0.001;
        const e=a.effect.target; const animated=getComputedStyle(e).transform; a.cancel();
        const original=getComputedStyle(e).transform;
        const x=new DOMMatrix(animated==='none'?undefined:animated), y=new DOMMatrix(original==='none'?undefined:original);
        return ['a','b','c','d','e','f'].every(k=>Math.abs(x[k]-y[k])<.05);
      });
    })()`));
    await b.evaluate(`__shapeAutoMotion.replay(${id}); __shapeAutoMotion.resume()`);
    if (recipe.id === 'sr6-startup-rocket' || recipe.id === 'wh9-heart-ring') {
      await sleep(450); await b.screenshot(`${output}/${recipe.id}-entrance.png`);
    }
  }
  await b.evaluate('__shapeAutoMotion.pause()');
  const clocks = await b.evaluate(`${auto}.map(a=>a.currentTime)`);
  await sleep(180);
  check('global pause freezes clocks', JSON.stringify(clocks) === JSON.stringify(await b.evaluate(`${auto}.map(a=>a.currentTime)`)));
  await b.evaluate(`document.querySelector('.ssd-wrapper').scrollIntoView({block:'center'})`);
  await sleep(200);
  check('pause survives viewport entries', await b.evaluate(`${auto}.every(a=>a.playState!=='running')`));
  await b.evaluate('__shapeAutoMotion.resume()'); await sleep(150);
  check('resume only starts visible shapes', await b.evaluate(`__shapeAutoMotion.status().every(r=>r.visible || !r.running)`));
  await media('reduce'); await sleep(100);
  check('dynamic reduced motion cancels owned effects', await b.evaluate(`${auto}.length===0`));
  await media('no-preference'); await sleep(100);
  check('motion resumes when preference permits', (await status('step-stack-demo')).running);
  for (const recipe of recipes) {
    await b.navigate(`${base}/shapes/${recipe.id}`, 414, 900, recipe.root);
    await wait('!!window.__shapeAutoMotion', 'route engine');
    await media('reduce'); await sleep(100);
    check(`${recipe.id}: 414px no overflow`, await b.evaluate('document.documentElement.scrollWidth <= innerWidth + 1'));
    check(`${recipe.id}: mobile selectors`, (await status(recipe.id)).instances.every(i => !i.mismatches.length));
    const interactive = await b.evaluate(`(() => {const root=document.querySelector(${JSON.stringify(recipe.root)});
      const e=[...root.querySelectorAll(${JSON.stringify(recipe.id === 'sr6-startup-rocket' ? '.sr6-timeline__pin' : '[aria-pressed]')})].find(e=>e.getClientRects().length);
      if(!e)return null; e.dispatchEvent(new MouseEvent('click',{bubbles:true})); window.__testControl=e; return true;})()`);
    if (interactive) {
      await sleep(60);
      check(`${recipe.id}: original React click`, await b.evaluate('__testControl.getAttribute("aria-pressed")==="true"'));
      await b.evaluate(`__testControl.focus(); __testControl.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}));`);
      await sleep(60);
      check(`${recipe.id}: original Escape`, await b.evaluate('__testControl.getAttribute("aria-pressed")==="false"'));
    } else {
      const selector = recipe.id === 'ar5-arrow-ribbon' ? '.ar5-row' : '.ssd-level';
      await b.evaluate(`document.querySelector(${JSON.stringify(selector)}).focus()`); await sleep(80);
      check(`${recipe.id}: focus feedback`, await b.evaluate(`document.querySelector(${JSON.stringify(selector)}).className.includes('is-active')`));
    }
  }
  await media('no-preference');
  await b.navigate(`${base}/shapes/sr6-startup-rocket?instances=2`, 1440, 1000, '.sr6-module');
  await wait('window.__shapeAutoMotion?.status().find(r=>r.id==="sr6-startup-rocket").instances.length===2', 'two instances');
  check('independent duplicate instances', (await status('sr6-startup-rocket')).instances.length === 2);
  await b.navigate(base, 1440, 1000, '.lm6-module');
  await wait('!!window.__shapeAutoMotion', 'home engine');
  check('single root per shape on homepage', await b.evaluate('__shapeAutoMotion.status().every(r=>r.instances.length===1)'));
  await sleep(150);
  check('homepage roots run', await b.evaluate('__shapeAutoMotion.status().some(r=>r.running)'));
  check('homepage renders all 17 shapes without gallery cards', await b.evaluate(`__shapeAutoMotion.list().every(r=>!!document.querySelector(r.root)) && !document.querySelector('.shape-gallery-card') && !document.querySelector('.shape-studio')`));
  for (const width of [360, 414, 768, 1024]) {
    await b.send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: false });
    await sleep(150);
    check(`homepage ${width}px no overflow`, await b.evaluate('document.documentElement.scrollWidth <= innerWidth + 1'));
  }
  await b.navigate(`${base}/shapes/sr6-startup-rocket?motion-interaction`, 1440, 1000, '.sr6-module');
  await wait('!!window.__shapeAutoMotion', 'motion interactions');
  await b.evaluate(`__shapeAutoMotion.replay('sr6-startup-rocket');document.querySelector('.sr6-rocket__piece').click()`);
  await sleep(100);
  check('click during entrance remains React-owned', await b.evaluate(`document.querySelector('.sr6-rocket__piece').getAttribute('aria-pressed')==='true'`));
  await sleep(2300);
  await b.screenshot(`${output}/rocket-complete.png`);
  await b.navigate(`${base}/shapes/wh9-heart-ring`, 1440, 1000, '.wh9-module');
  await wait('!!window.__shapeAutoMotion', 'heart complete'); await sleep(2500);
  await b.screenshot(`${output}/heart-complete.png`);
  await b.send('Emulation.setScriptExecutionDisabled', { value: true });
  await b.navigate(`${base}/shapes/sr6-startup-rocket?no-js`, 414, 900, '.sr6-module');
  check('no-JS shape visible', await b.evaluate(`getComputedStyle(document.querySelector('.sr6-rocket__surface')).opacity==='1' && document.querySelector('.sr6-module').getBoundingClientRect().height>100`));
  await b.navigate(`${base}/?no-js`, 414, 900, '.lm6-module');
  check('no-JS homepage keeps all 17 shapes visible', await b.evaluate(`['.ssd-wrapper','.ar5-module','.hfr6','.vt4','.ih8-module','.sr6-module','.st7-module','.s8f-module','.d8p-module','.ta4-module','.wh9-module','.gb5-root','.pn10-module','.cb5-module','.tc5-module','.pb4-module','.lm6-module'].every(s=>!!document.querySelector(s))`));
  await b.send('Emulation.setScriptExecutionDisabled', { value: false });
  check('no browser errors', b.errors.length === 0);
  if (b.errors.length) console.log(JSON.stringify(b.errors));
} finally { await b.close(); }
await writeFile(`${output}/results.json`, JSON.stringify({ checks, failures }, null, 2));
console.log(`TOTAL ${checks}; FAILURES ${failures.length}`);
assert.equal(failures.length, 0, failures.join('\n'));
