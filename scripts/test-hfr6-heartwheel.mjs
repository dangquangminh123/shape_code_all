import assert from 'node:assert/strict';
import { mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createBrowser, sleep } from './browser-session.mjs';

const baseUrl = process.env.BASE_URL || 'http://127.0.0.1:3210';
const output = await mkdtemp(path.join(tmpdir(), 'hfr6-test-'));
const browser = await createBrowser();
const { evaluate, send, navigate, screenshot } = browser;
const root = 'document.querySelector(".hfr6")';
const active = () => evaluate(`[...${root}.querySelectorAll('.hfr6-sector.hfr6-is-active')].map(el => el.dataset.hfr6Sector)`);
const selected = () => evaluate(`[...${root}.querySelectorAll('[data-hfr6-control][aria-pressed="true"]')].map(el => el.dataset.hfr6Control)`);
async function key(key, code = key) {
  await send('Input.dispatchKeyEvent', { type: 'keyDown', key, code });
  await send('Input.dispatchKeyEvent', { type: 'keyUp', key, code });
  await sleep(30);
}
async function point(index) {
  return evaluate(`(() => {
    const box = ${root}.querySelector('.hfr6__wheel').getBoundingClientRect();
    const angle = (-90 + ${index} * 60) * Math.PI / 180;
    return { x: box.x + box.width * (320 + 210 * Math.cos(angle)) / 640,
      y: box.y + box.height * (320 + 210 * Math.sin(angle)) / 640 };
  })()`);
}
async function click(at) {
  await send('Input.dispatchMouseEvent', { type: 'mousePressed', ...at, button: 'left', clickCount: 1 });
  await send('Input.dispatchMouseEvent', { type: 'mouseReleased', ...at, button: 'left', clickCount: 1 });
  await sleep(40);
}
try {
  for (const route of ['/', '/shapes/hfr6-heartwheel']) {
    assert.equal((await fetch(`${baseUrl}${route}`)).status, 200);
    for (const width of [2560, 1440, 1024, 768, 641, 640, 390, 380, 375, 320]) {
      await navigate(`${baseUrl}${route}`, width, 1000, '.hfr6');
      const layout = await evaluate(`(() => {
        const module = ${root};
        const rect = el => el.getBoundingClientRect().toJSON();
        return {
          overflow: document.documentElement.scrollWidth > innerWidth,
          module: rect(module), wheel: rect(module.querySelector('.hfr6__wheel')),
          previous: module.previousElementSibling?.className,
          previousBottom: module.previousElementSibling?.getBoundingClientRect().bottom,
          headings: module.querySelectorAll('h1,h2,h3,header,nav').length,
          heartText: module.querySelector('.hfr6-heart').textContent,
          numbers: [...module.querySelectorAll('.hfr6-sector__number')].map(el => el.textContent),
          strokeDisplays: [...module.querySelectorAll('.hfr6-sector__stroke')].map(el => getComputedStyle(el).display),
          fillInsets: [...module.querySelectorAll('.hfr6-sector__fill')].map(el => {
            const s = el.parentElement.getBoundingClientRect();
            const f = el.getBoundingClientRect();
            return Math.max(Math.abs(s.width - f.width), Math.abs(s.height - f.height));
          }),
          masks: [...module.querySelectorAll('.hfr6-sector__fill,.hfr6-heart__shape')].map(el => getComputedStyle(el).maskImage),
          icons: [...module.querySelectorAll('.hfr6-sector__svg-icon')].map(el => ({
            tag: el.tagName.toLowerCase(),
            name: el.dataset.hfr6Icon,
            paths: el.querySelectorAll('path,circle,rect,line,polyline,polygon').length,
          })),
          copies: [...module.querySelectorAll('.hfr6-sector__content')].map(el => getComputedStyle(el).maskImage),
          summaries: [...module.querySelectorAll('.hfr6-sector__summary')].map(el => getComputedStyle(el).display),
          mobile: getComputedStyle(module.querySelector('.hfr6-mobile')).display,
          cards: [...module.querySelectorAll('.hfr6-mobile__item')].map(rect),
          controls: [...module.querySelectorAll('[data-hfr6-control]')].every(el => el.tagName === 'path' && el.getAttribute('role') === 'button' && el.getAttribute('aria-label').length > 20),
        };
      })()`);
      assert.equal(layout.overflow, false, `${route}: overflow at ${width}`);
      assert.equal(layout.headings, 0);
      assert.equal(layout.heartText, '');
      assert.ok(layout.strokeDisplays.every(d => d === 'none'), 'HFR6 separate stroke mask is suppressed');
      assert.ok(layout.fillInsets.every(delta => delta < 0.5), 'HFR6 sector fill matches 640x640 surface bounds (inset: 0)');
      assert.deepEqual(layout.numbers, ['01', '02', '03', '04', '05', '06']);
      assert.equal(layout.controls, true);
      assert.equal(layout.masks.length, 7);
      assert.ok(layout.masks.every(mask => mask.startsWith('url(')));
      assert.ok(layout.copies.every(mask => mask === 'none'));
      assert.equal(layout.icons.length, 6);
      assert.deepEqual(layout.icons.map(icon => icon.name), ['compass', 'search', 'dollar', 'laptop', 'target', 'briefcase']);
      assert.ok(layout.icons.every(icon => icon.tag === 'svg' && icon.paths > 0));
      assert.ok(Math.abs(layout.wheel.width - layout.wheel.height) < 1);
      assert.ok(Math.abs(layout.wheel.x + layout.wheel.width / 2 - width / 2) < 1);
      assert.equal(layout.mobile === 'grid', width <= 640);
      assert.ok(layout.summaries.every(display => (display === 'none') === (width <= 640)));
      if (width <= 640) {
        assert.equal(layout.cards.length, 6);
        assert.ok(layout.cards.every(card => card.width > 100 && card.height >= 44));
        assert.equal(Math.abs(layout.cards[0].top - layout.cards[1].top) < 1, width > 380);
      }
      if (route === '/') {
        assert.equal(layout.previous, 'ar5-module');
        assert.ok(Math.abs(layout.module.top - layout.previousBottom) < 1, 'HFR6 directly follows AR5');
      }
      if (route !== '/' && [1440, 640, 390, 320].includes(width)) await screenshot(path.join(output, `hfr6-${width}.png`));
      console.log(`PASS HFR6 layout ${route} at ${width}px`);
    }
  }

  await navigate(`${baseUrl}/shapes/hfr6-heartwheel`, 1440, 1000, '.hfr6');
  const assets = await evaluate(`(async () => {
    const shapeFiles = [
      'hfr6-sector-01-north.svg',
      'hfr6-sector-02-north-east.svg',
      'hfr6-sector-03-south-east.svg',
      'hfr6-sector-04-south.svg',
      'hfr6-sector-05-south-west.svg',
      'hfr6-sector-06-north-west.svg',
      'hfr6-core-heart.svg',
    ];
    const shapes = [];
    for (const file of shapeFiles) {
      const url = '/assets/shapes/hfr6-heartwheel/' + file;
      const response = await fetch(url);
      const text = await response.text();
      const image = new Image();
      image.src = url;
      await image.decode();
      shapes.push({
        file,
        status: response.status,
        type: response.headers.get('content-type'),
        viewBox: text.includes('viewBox="0 0 640 640"'),
        loaded: image.naturalWidth > 0,
      });
    }
    const activeMasks = [...${root}.querySelectorAll('.hfr6-sector__fill,.hfr6-heart__shape')].map(el => getComputedStyle(el).maskImage);
    return { shapes, masks: ${root}.dataset.hfr6Masks, activeMasks };
  })()`);
  assert.equal(assets.shapes.length, 7);
  assert.ok(assets.shapes.every(shape => shape.status === 200 && shape.type.includes('image/svg+xml') && shape.viewBox && shape.loaded));
  assert.deepEqual(assets.masks.split(' ').sort(), ['01', '02', '03', '04', '05', '06', 'heart']);
  assert.ok(assets.activeMasks.every(mask => mask.includes('/assets/shapes/hfr6-heartwheel/hfr6-')));
  console.log('PASS all 7 normalized HFR6 shape SVG masks');

  for (let index = 0; index < 6; index++) {
    const step = `0${index + 1}`;
    const at = await point(index);
    const hit = await evaluate(`document.elementFromPoint(${at.x}, ${at.y}).dataset.hfr6Control`);
    assert.equal(hit, step);
    await send('Input.dispatchMouseEvent', { type: 'mouseMoved', ...at });
    await sleep(40);
    assert.deepEqual(await active(), [step]);
    const overlap = await evaluate(`(() => {
      const heart = ${root}.querySelector('.hfr6-hitmap__heart-guard');
      const ctm = heart.getScreenCTM();
      const svg = ${root}.querySelector('.hfr6-hitmap');
      const nodes = [...${root}.querySelectorAll('.hfr6-sector--${step} .hfr6-sector__number,.hfr6-sector--${step} .hfr6-sector__copy,.hfr6-sector--${step} .hfr6-sector__icon')];
      return nodes.some(node => {
        const box = node.getBoundingClientRect();
        return [[box.left, box.top], [box.right, box.top], [box.left, box.bottom], [box.right, box.bottom], [box.left + box.width / 2, box.top + box.height / 2]]
          .some(([x, y]) => { const pt = svg.createSVGPoint(); pt.x = x; pt.y = y; return heart.isPointInFill(pt.matrixTransform(ctm.inverse())); });
      });
    })()`);
    assert.equal(overlap, false, `sector ${step} copy/icon stays clear of the heart`);
  }
  const center = await evaluate(`(() => { const b = ${root}.querySelector('.hfr6__wheel').getBoundingClientRect(); return { x: b.x + b.width / 2, y: b.y + b.height / 2 }; })()`);
  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', ...center });
  await sleep(40);
  assert.deepEqual(await active(), [], 'heart guard clears hover');
  await click(await point(1));
  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 5, y: 5 });
  await sleep(40);
  assert.deepEqual(await selected(), ['02']);
  assert.deepEqual(await active(), ['02']);
  await evaluate(`${root}.querySelector('[data-hfr6-control="02"]').focus()`);
  await key('ArrowRight');
  assert.equal(await evaluate(`document.activeElement.dataset.hfr6Control`), '03');
  assert.deepEqual(await active(), ['03']);
  await key('Enter');
  assert.deepEqual(await selected(), ['03']);
  await key('Escape');
  assert.deepEqual(await selected(), []);
  assert.deepEqual(await active(), []);

  await navigate(`${baseUrl}/shapes/hfr6-heartwheel`, 390, 900, '.hfr6');
  const card = await evaluate(`(() => { const b = ${root}.querySelector('[data-hfr6-mobile="04"]').getBoundingClientRect(); return { x: b.x + b.width / 2, y: b.y + b.height / 2 }; })()`);
  await click(card);
  assert.deepEqual(await selected(), ['04']);
  assert.deepEqual(await active(), ['04']);

  await navigate(`${baseUrl}/shapes/hfr6-heartwheel?theme=silver-red&instances=2`, 1280, 1000, '.hfr6');
  await screenshot(path.join(output, 'hfr6-silver-red.png'));
  await evaluate(`document.querySelectorAll('.hfr6')[0].querySelector('[data-hfr6-control="01"]').dispatchEvent(new MouseEvent('click', { bubbles: true }))`);
  assert.deepEqual(await evaluate(`[...document.querySelectorAll('.hfr6')].map(el => [...el.querySelectorAll('[data-hfr6-control][aria-pressed="true"]')].map(c => c.dataset.hfr6Control))`), [['01'], []]);
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  assert.ok(await evaluate(`[...document.querySelectorAll('.hfr6-sector__surface,.hfr6-sector__icon,.hfr6-sector__number,.hfr6-sector__copy')].every(el => getComputedStyle(el).transitionDuration === '0s')`));
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] });
  await navigate(`${baseUrl}/shapes/hfr6-heartwheel`, 1280, 960, '.hfr6');
  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', ...(await point(1)) });
  await sleep(60);
  assert.ok(await evaluate(`[...document.querySelectorAll('.hfr6-sector__surface')].every(el => getComputedStyle(el).transform === 'none')`), 'sector shapes never translate or shift out of the circle');
  await screenshot(path.join(output, 'hfr6-hover.png'));
  await evaluate(`document.querySelector('[data-hfr6-control="02"]').focus()`);
  await key('ArrowLeft');
  await screenshot(path.join(output, 'hfr6-focus.png'));
  assert.deepEqual(browser.errors, [], 'no runtime or resource errors');
  console.log(`PASS all HFR6 checks. Screenshots: ${output}`);
} finally {
  await browser.close();
}
