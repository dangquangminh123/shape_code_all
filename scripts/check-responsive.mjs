import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import postcss from 'postcss';
import { createBrowser, sleep } from './lib/browser-session.mjs';

// Feature-removal regression, NOT an iOS emulator. Run on real iOS as well.
const base = process.env.TEST_BASE || 'http://localhost:3210';
const output = process.env.TEST_OUTPUT || '/tmp/shape-responsive-check';
const widths = (process.env.TEST_WIDTHS || '320,375,414,430,520,640,768,1024,1440').split(',').map(Number);
const modes = (process.env.TEST_MODES || 'modern,legacy').split(',');
await mkdir(output, { recursive: true });
let checks = 0;
const failures = [];
const b = await createBrowser();

function legacyCSS(text) {
  const css = postcss.parse(text);
  css.walkAtRules('container', rule => rule.remove());
  css.walkAtRules('supports', rule => {
    if (/container-type|cqw/.test(rule.params)) {
      if (/^not\b/.test(rule.params)) rule.replaceWith(...rule.nodes);
      else rule.remove();
    }
  });
  css.walkDecls(decl => {
    if (/[\d.]cq[whib]\b|[\d.]dvh\b|color-mix\(/.test(decl.value) || /^container(?:-|$)/.test(decl.prop)) decl.remove();
  });
  return css.toString();
}

try {
  for (const mode of modes) {
    await b.navigate(`${base}/?responsive-test=${mode}`, widths[0], 736, '.pn10-ribbon');
    if (mode === 'legacy') {
      // Transform source CSS, not CSSOM: CSSOM has discarded earlier fallbacks.
      const sheets = await b.evaluate(`Array.from(document.styleSheets).map(s => ({href:s.href,text:s.ownerNode.textContent}))`);
      const transformed = await Promise.all(sheets.map(async s => legacyCSS(s.href ? await fetch(s.href).then(r => r.text()) : s.text)));
      await b.evaluate(`(() => {
        Array.from(document.styleSheets).forEach(s => {s.disabled=true;});
        const s=document.createElement('style'); s.textContent=${JSON.stringify(transformed.join('\n'))};
        document.head.append(s);
      })()`);
    }
    for (const width of widths) {
      await b.send('Emulation.setDeviceMetricsOverride', {width,height:736,deviceScaleFactor:1,mobile:true});
      await b.send('Emulation.setTouchEmulationEnabled', {enabled:true});
      await sleep(120);
      const result = await b.evaluate(`(() => {
        const q=s=>Array.from(document.querySelectorAll(s));
        const el=s=>document.querySelector(s);
        const cs=e=>getComputedStyle(e);
        const r=e=>e.getBoundingClientRect();
        const fits=e=>e.scrollWidth<=e.clientWidth+1 && e.scrollHeight<=e.clientHeight+1;
        const inside=(a,b)=>{a=r(a);b=r(b);return a.left>=b.left-1&&a.right<=b.right+1&&a.top>=b.top-1&&a.bottom<=b.bottom+1;};
        const ordered=nodes=>nodes.every((e,i)=>!i||r(e).top>=r(nodes[i-1]).bottom-1);
        const mobile=innerWidth<=520;
        const out={
          viewport:innerWidth===${width},
          allModules:q('.app-main > *').length===17,
          noPageOverflow:document.documentElement.scrollWidth<=innerWidth+1,
          stackCopyFits:q('.ssd-content-box').every(fits),
          giftCopyFits:q('.gb5-body-copy').every(fits),
          giftIconBounds:q('.gb5-mini-icon-box').every(e=>r(e).width<=40&&r(e).height<=40&&q('.gb5-mini-icon-box svg').every(svg=>r(svg).width<=40&&r(svg).height<=40)),
          giftTimelineFits:q('.gb5-mini-caption').every(e=>inside(e,el('.gb5-stage'))),
          heartCoreFits:inside(el('.wh9-core-copy'),el('.wh9-stage'))&&r(el('.wh9-core-copy')).height<r(el('.wh9-stage')).height*.4,
          starCopyFits:q('.s8f-star__copy strong,.s8f-star__copy span').every(e=>inside(e,el('.s8f-wheel'))),
          tubeCaptionFits:inside(el('.vt4__tube-caption'),el('.vt4__tube')),
          arrowsCopyFits:q('.ar5-arrow-content').every(e=>q('.ar5-arrow-title,.ar5-arrow-desc').filter(t=>e.contains(t)).every(t=>inside(t,e))),
          creamBehind:q('.st7-piece').every(e=>+cs(e.querySelector('.st7-tube')).zIndex>+cs(e.querySelector('.st7-marker')).zIndex),
          railBehind:+cs(el('.pn10-rail')).zIndex<+cs(el('.pn10-ribbons')).zIndex,
          clipboardLayers:+cs(el('.cb5-board')).zIndex>+cs(el('.cb5-rails')).zIndex,
          clipboardComposition:Math.abs(r(el('.cb5-stage')).height/r(el('.cb5-stage')).width-.555)<.001,
          clipboardCopy:q('.cb5-row__copy,.cb5-checklist li').every(fits),
          clipboardContent:q('.cb5-row').length===5&&q('.cb5-checklist li').length===5&&q('.cb5-row__icon svg').length===5,
          clipboardNoDecorations:q('.cb5-heading,.cb5-business-icons').length===0&&!/business\\s+infographic/i.test(el('.cb5-module').textContent),
          clipboardCompact:Math.abs(r(el('.cb5-artwork')).top-r(el('.cb5-stage')).top)<1&&Math.abs(r(el('.cb5-artwork')).height-r(el('.cb5-stage')).height)<1,
          clipboardNamed:el('.cb5-module').getAttribute('aria-label')==='Bảng kẹp & năm bước phát triển',
          clipboardBounds:q('.cb5-row__icon,.cb5-row__copy,.cb5-row__number').every(e=>inside(e,e.closest('.cb5-row')))&&q('.cb5-checklist li').every(e=>inside(e,el('.cb5-paper'))),
          clipboardTapTargets:q('.cb5-row').every(e=>r(e).height>=24&&r(e).width>=24),
          trophyComposition:q('.tc5-control').length===5&&Math.abs(r(el('.tc5-artwork')).height/r(el('.tc5-artwork')).width-500/715)<.001,
          trophyHorizontal:q('.tc5-cup').every(e=>Math.abs(r(e).top-r(el('.tc5-cup')).top)<1),
          trophyBounds:q('.tc5-cup,.tc5-caption').every(e=>inside(e,el('.tc5-artwork'))),
          trophyNoDecorations:q('.tc5-heading,.tc5-podium,.tc5-module header,.tc5-module h2').length===0&&!el('.tc5-module').textContent.includes('Năm bước nhỏ, một hành trình lớn.'),
          trophyNamed:el('.tc5-module').getAttribute('aria-label')==='Năm cúp thành tựu'&&!el('.tc5-module').hasAttribute('aria-labelledby'),
          trophyCopy:q('.tc5-caption,.tc5-cup__number').every(fits),
          trophyTapTargets:q('.tc5-control').every(e=>r(e).height>=44&&r(e).width>=40),
          trophyWhite:cs(el('.tc5-module')).backgroundColor==='rgb(255, 255, 255)',
          pumpComposition:q('.pb4-control').length===4&&Math.abs(r(el('.pb4-artwork')).height/r(el('.pb4-artwork')).width-350/525)<.001,
          pumpCopy:q('.pb4-caption,.pb4-label').every(fits),
          pumpBounds:q('.pb4-body,.pb4-cap,.pb4-caption').every(e=>inside(e,el('.pb4-artwork'))),
          pumpContent:q('.pb4-band').length===4&&q('.pb4-caption__icon svg').length===4,
          pumpWhite:cs(el('.pb4-module')).backgroundColor==='rgb(255, 255, 255)',
          levelsComposition:q('.lm6-control').length===6&&Math.abs(r(el('.lm6-artwork')).height/r(el('.lm6-artwork')).width-610/960)<.001,
          levelsHorizontal:q('.lm6-arrow').every(e=>Math.abs(r(e).top-r(el('.lm6-arrow')).top)<1),
          levelsAlternating:q('.lm6-caption').every((e,i)=>i%2?r(e).top>r(q('.lm6-reflection')[i]).bottom:r(e).bottom<r(q('.lm6-arrow')[i]).top),
          levelsCopy:q('.lm6-caption,.lm6-caption h3,.lm6-caption li').every(fits),
          levelsBounds:q('.lm6-arrow,.lm6-caption,.lm6-reflection').every(e=>inside(e,el('.lm6-artwork'))),
          levelsNoTitle:q('.lm6-heading,.lm6-module h1,.lm6-module h2,.lm6-module header').length===0&&!el('.lm6-module').textContent.includes('6 giai đoạn'),
          levelsWhite:cs(el('.lm6-module')).backgroundColor==='rgb(255, 255, 255)',
          levelsIcons:q('.lm6-caption li svg').length===12
        };
        if(mobile){
          out.stackSingleColumn=r(el('.ssd-content-col')).top>=r(el('.ssd-stack')).bottom;
          out.tubeReflow=cs(el('.vt4__tube')).position==='relative';
          out.rocketReflow=cs(el('.sr6-module__stage')).flexDirection==='column'&&ordered(q('.sr6-timeline__step'));
          out.starDescriptionHidden=q('.s8f-caption__description').every(e=>cs(e).display==='none');
          out.heartTextScaled=parseFloat(cs(el('.wh9-core-copy span:last-child')).fontSize)<10;
        }
        return out;
      })()`);
      for (const [name, pass] of Object.entries(result)) {
        checks++;
        const label=`${mode} ${width}: ${name}`;
        console.log(pass?'PASS':'FAIL',label);
        if (!pass) failures.push(label);
      }
      if (width===414) {
        for (const [name,selector] of [['stack','.ssd-wrapper'],['tube','.vt4'],['rocket','.sr6-module'],['star','.s8f-module'],['heart','.wh9-module'],['gift','.gb5-timeline-zone'],['clipboard','.cb5-module'],['trophies','.tc5-module'],['pump-bottle','.pb4-module'],['levels-marks','.lm6-module']]) {
          await b.evaluate(`document.querySelector('${selector}').scrollIntoView({block:'start'})`);
          await b.screenshot(`${output}/${mode}-${width}-${name}.png`);
        }
      }
    }
  }
  assert.equal(b.errors.length,0,JSON.stringify(b.errors));
} finally { await b.close(); }
await writeFile(`${output}/results.json`,JSON.stringify({checks,failures},null,2));
console.log(`TOTAL ${checks}; FAILURES ${failures.length}`);
assert.deepEqual(failures,[]);
