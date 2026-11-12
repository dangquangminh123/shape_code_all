import assert from 'node:assert/strict';
import { mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createBrowser, sleep } from './browser-session.mjs';
import { assertPresentation } from './assert-step-stack-presentation.mjs';

const baseUrl = process.env.BASE_URL || 'http://127.0.0.1:3000';
const output = await mkdtemp(path.join(tmpdir(), 'step-stack-test-'));
const routes = ['/', '/shapes/step-stack-demo'];
for (const route of routes) {
  const response = await fetch(`${baseUrl}${route}`);
  assert.equal(response.status, 200, route);
}
const browser = await createBrowser();
const { evaluate, send, navigate, screenshot } = browser;
try {
  for (const route of routes) {
    for (const [width, height] of [
      [2560, 1440], [1920, 1080], [1792, 898], [1440, 900], [1200, 800],
      [1024, 600], [844, 390], [768, 1024], [600, 800], [390, 844], [320, 568],
    ]) {
      await navigate(`${baseUrl}${route}`, width, height);
      await assertPresentation(evaluate, width, height);
      const geometry = await evaluate(`(() => {
        const rect = el => el.getBoundingClientRect().toJSON();
        const levels = [...document.querySelectorAll('.ssd-level')];
        const boxes = [...document.querySelectorAll('.ssd-content-box')];
        return {
          levels: levels.map(el => ({...rect(el), z: Number(getComputedStyle(el).zIndex), label: el.innerText})),
          boxes: boxes.map(rect), overflow: document.documentElement.scrollWidth > innerWidth,
          images: document.querySelectorAll('.step-stack-demo img').length,
          masks: levels.map(el => getComputedStyle(el.querySelector('.ssd-shape-fill')).maskImage),
          controls: document.querySelectorAll('.ssd-ConfigBtn').length,
        };
      })()`);
      assert.equal(geometry.overflow, false, `${route} overflows at ${width}px`);
      assert.equal(geometry.levels.length, 3);
      assert.equal(geometry.boxes.length, 2);
      assert.equal(geometry.images, 0);
      assert.equal(geometry.controls, 0);
      assert.deepEqual(geometry.levels.map(l => l.label), ['01', '02', '03']);
      const [top, mid, base] = geometry.levels;
      for (const level of [top, mid]) assert.ok(Math.abs(level.x + level.width / 2 - base.x - base.width / 2) < 0.1);
      assert.ok(top.width < mid.width && mid.width < base.width);
      assert.ok(top.bottom > mid.top && mid.bottom > base.top, 'layers must overlap');
      assert.ok(top.z < mid.z && mid.z < base.z, 'base must be foremost');
      assert.ok(Math.abs(top.width / top.height - 1212.45 / 1789.5) < 0.001);
      assert.ok(Math.abs(mid.width / mid.height - 2495.87 / 1748.4) < 0.001);
      assert.ok(Math.abs(base.width / base.height - 1451.9 / 1439.02) < 0.001);
      assert.ok(geometry.boxes[1].top >= geometry.boxes[0].bottom);
      if (width >= 600) {
        assert.ok(geometry.boxes[0].left > base.right);
        assert.ok(geometry.boxes[1].left > geometry.boxes[0].left);
      } else {
        assert.ok(geometry.boxes[0].top > base.bottom);
      }
      ['top', 'mid', 'base'].forEach((level, i) => assert.ok(geometry.masks[i].includes(`ssd-stack-${level}.svg`)));
      if (route !== '/' && [1792, 1200, 390, 320].includes(width)) await screenshot(path.join(output, `step-stack-${width}.png`));
      console.log(`PASS fullscreen centered layout ${route} at ${width}x${height}`);
    }
  }

  await navigate(`${baseUrl}/shapes/step-stack-demo`, 1200);
  const assets = await evaluate(`(async () => {
    const results = [];
    for (const level of ['top', 'mid', 'base']) {
      const response = await fetch('/assets/shapes/step-stack-demo/ssd-stack-' + level + '.svg');
      const holder = document.createElement('div');
      holder.style.position = 'absolute';
      holder.style.visibility = 'hidden';
      holder.innerHTML = await response.text();
      document.body.append(holder);
      const svg = holder.querySelector('svg');
      const box = svg.querySelector('path').getBBox();
      results.push({ status: response.status, type: response.headers.get('content-type'),
        viewBox: svg.getAttribute('viewBox').split(/\\s+/).map(Number),
        bounds: [box.x, box.y, box.width, box.height],
        external: svg.querySelectorAll('image, use, script').length });
      holder.remove();
    }
    return results;
  })()`);
  for (const asset of assets) {
    assert.equal(asset.status, 200);
    assert.ok(asset.type.includes('image/svg+xml'));
    assert.equal(asset.external, 0);
    asset.bounds.forEach((value, i) => assert.ok(Math.abs(value - asset.viewBox[i]) < 0.02));
  }
  console.log('PASS SVG loading and cropped path bounds');

  async function hover(selector) {
    const point = await evaluate(`(() => { const r = document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height * 0.7 }; })()`);
    await send('Input.dispatchMouseEvent', { type: 'mouseMoved', ...point });
    await sleep(100);
  }
  const activeSteps = () => evaluate(`Array.from(document.querySelectorAll('.is-active')).map(el => Number(el.dataset.step))`);
  for (const step of [1, 2]) {
    await hover(`.level-${step}`);
    assert.deepEqual(await activeSteps(), [step, step]);
    await hover(`.content-${step}`);
    assert.deepEqual(await activeSteps(), [step, step]);
  }
  await hover('.level-3');
  assert.deepEqual(await activeSteps(), [3]);
  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 2, y: 2 });
  await evaluate(`document.querySelector('.level-1').focus()`);
  await sleep(100);
  assert.deepEqual(await activeSteps(), [1, 1]);
  await hover('.content-2');
  assert.deepEqual(await activeSteps(), [2, 2]);
  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 2, y: 2 });
  await sleep(100);
  assert.deepEqual(await activeSteps(), [1, 1], 'pointer leave should preserve keyboard focus');
  await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
  await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
  await sleep(100);
  assert.deepEqual(await activeSteps(), [2, 2]);
  assert.ok(await evaluate(`document.activeElement.matches('.level-2:focus-visible') && getComputedStyle(document.activeElement).outlineStyle === 'solid'`));
  await evaluate('document.activeElement.blur()');
  await sleep(100);
  assert.deepEqual(await activeSteps(), []);
  console.log('PASS bidirectional hover, focus persistence and keyboard navigation');

  await navigate(`${baseUrl}/`, 1200);
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  assert.ok(await evaluate(`Array.from(document.querySelectorAll('.ssd-level,.ssd-shape-fill,.ssd-content-box h3')).every(el => getComputedStyle(el).transitionDuration === '0s')`));
  assert.deepEqual(browser.errors, [], 'browser runtime / console errors');
  console.log('PASS reduced motion and no browser errors');
} finally {
  await browser.close();
}
console.log(`PASS all Step Stack checks. Screenshots: ${output}`);
