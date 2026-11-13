import assert from 'node:assert/strict';
import { mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createBrowser, sleep } from './browser-session.mjs';

const baseUrl = process.env.BASE_URL || 'http://127.0.0.1:3210';
const output = await mkdtemp(path.join(tmpdir(), 'ar5-test-'));
const browser = await createBrowser();
const { evaluate, send, navigate, screenshot } = browser;
try {
  for (const route of ['/', '/shapes/ar5-arrow-ribbon']) {
    assert.equal((await fetch(`${baseUrl}${route}`)).status, 200);
    for (const [width, height] of [[2560, 1440], [1440, 1100], [1024, 768], [960, 800], [768, 1024], [640, 900], [639, 900], [390, 844], [375, 812], [320, 568]]) {
      await navigate(`${baseUrl}${route}`, width, height, '.ar5-row');
      const layout = await evaluate(`(() => {
        const rect = el => el.getBoundingClientRect().toJSON();
        const module = document.querySelector('.ar5-module');
        const stage = document.querySelector('.step-stack-demo');
        return {
          module: rect(module), stage: stage && rect(stage), rowsBox: rect(module.querySelector('.ar5-rows')),
          overflow: document.documentElement.scrollWidth > innerWidth,
          chrome: document.querySelectorAll('header,nav,.guide-card,.ar5-module button,.ar5-module a').length,
          images: module.querySelectorAll('img,image').length,
          maskedShapes: module.querySelectorAll('.ar5-has-mask').length,
          icons: [...module.querySelectorAll('.ar5-medallion-icon svg')].map(el => ({
            name: el.dataset.ar5Icon,
            paths: el.querySelectorAll('path').length,
            text: el.parentElement.textContent,
          })),
          rows: [...module.querySelectorAll('.ar5-row')].map(el => ({
            box: rect(el), arrow: rect(el.querySelector('.ar5-arrow')), badge: rect(el.querySelector('.ar5-medallion')),
            tab: rect(el.querySelector('.ar5-tab')), copy: rect(el.querySelector('.ar5-arrow-copy')),
            title: rect(el.querySelector('.ar5-arrow-title')), desc: rect(el.querySelector('.ar5-arrow-desc')),
            number: el.querySelector('.ar5-tab-number').textContent,
            bigNumber: getComputedStyle(el.querySelector('.ar5-arrow-number')).display,
            textMask: getComputedStyle(el.querySelector('.ar5-arrow-content')).maskImage,
            tip: parseFloat(getComputedStyle(el).getPropertyValue('--ar5-arrow-tip')),
            z: Number(getComputedStyle(el).zIndex),
            decoration: [...el.querySelectorAll('.ar5-arrow,.ar5-medallion,.ar5-tab')].every(node => getComputedStyle(node).pointerEvents === 'none'),
          })),
        };
      })()`);
      assert.equal(layout.overflow, false, `${route} overflow at ${width}`);
      assert.equal(layout.chrome, 0);
      assert.equal(layout.images, 0, 'no reference image / raster icon');
      assert.equal(layout.maskedShapes, 15, 'all five rows use the three supplied masks from the AR5 folder');
      assert.deepEqual(layout.icons.map(icon => icon.name), ['phone', 'bulb', 'analysis', 'search', 'target']);
      assert.ok(layout.icons.every(icon => icon.paths > 0 && icon.text === ''), 'icons must be SVG paths, never text symbols');
      assert.equal(layout.rows.length, 5);
      assert.equal(layout.module.width, width);
      assert.ok(layout.module.height >= height);
      assert.ok(Math.abs(layout.rowsBox.left + layout.rowsBox.width / 2 - width / 2) < 1);
      if (route === '/') {
        assert.ok(Math.abs(layout.module.top - layout.stage.bottom) < 1, 'AR5 directly follows Step Stack');
        assert.ok(layout.stage.height >= height);
      } else assert.equal(layout.stage, null);
      layout.rows.forEach((row, i) => {
        assert.equal(row.number, `0${i + 1}`);
        assert.equal(row.bigNumber === 'none', width < 640);
        assert.equal(row.textMask, 'none');
        assert.equal(row.decoration, true);
        assert.ok(row.badge.right > row.arrow.left && row.badge.left < row.arrow.left);
        assert.ok(row.copy.left >= row.badge.right + 8, `copy overlaps medallion at ${width}`);
        assert.ok(row.copy.right <= row.arrow.right - row.tip + 1, `copy touches arrow tip at ${width}`);
        assert.ok(row.title.top > row.arrow.top && row.desc.bottom < row.arrow.bottom, `copy outside arrow at ${width}`);
        assert.ok(row.tab.top < row.badge.top && row.tab.bottom > row.badge.top);
        assert.ok(row.box.left >= 10 && row.box.right <= width - 10);
        if (i) {
          assert.ok(row.tab.top > layout.rows[i - 1].box.bottom, `rows overlap at ${width}`);
          assert.ok(row.z < layout.rows[i - 1].z);
        }
      });
      if (route !== '/' && [1440, 390, 320].includes(width)) await screenshot(path.join(output, `ar5-${width}.png`));
      console.log(`PASS AR5 layout ${route} ${width}x${height}`);
    }
  }

  await navigate(`${baseUrl}/`, 1440, 1200, '.ar5-row');
  await evaluate(`document.querySelector('.ar5-module').scrollIntoView()`);
  const active = () => evaluate(`Array.from(document.querySelectorAll('.ar5-is-active')).map(el => el.querySelector('.ar5-tab-number').textContent)`);
  async function key(key, code = key) {
    await send('Input.dispatchKeyEvent', { type: 'keyDown', key, code });
    await send('Input.dispatchKeyEvent', { type: 'keyUp', key, code });
    await sleep(50);
  }
  async function hover(index) {
    const point = await evaluate(`(() => { const r = document.querySelectorAll('.ar5-row')[${index}].getBoundingClientRect(); return { x: r.right - 100, y: r.y + r.height / 2 }; })()`);
    await send('Input.dispatchMouseEvent', { type: 'mouseMoved', ...point });
    await sleep(250);
  }
  await hover(1);
  assert.deepEqual(await active(), ['02']);
  assert.equal(await evaluate(`document.querySelectorAll('.ssd-wrapper .is-active').length`), 0);
  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 2, y: 2 });
  await evaluate(`document.querySelector('.ar5-row').focus()`);
  await key('ArrowDown');
  assert.deepEqual(await active(), ['02']);
  await key('End');
  assert.deepEqual(await active(), ['05']);
  await key('ArrowDown');
  assert.deepEqual(await active(), ['01']);
  await key('ArrowUp');
  assert.deepEqual(await active(), ['05']);
  await key('Home');
  assert.deepEqual(await active(), ['01']);
  await key('Escape');
  assert.deepEqual(await active(), []);
  assert.ok(await evaluate(`document.activeElement.matches('.ar5-row:focus-visible') && getComputedStyle(document.activeElement).outlineStyle === 'solid'`));
  await key('ArrowDown');
  await hover(2);
  assert.deepEqual(await active(), ['03']);
  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 2, y: 2 });
  await sleep(50);
  assert.deepEqual(await active(), ['02'], 'pointer leave restores focused row');
  console.log('PASS isolated hover, focus, ArrowUp/Down, Home/End and Escape');

  await navigate(`${baseUrl}/shapes/ar5-arrow-ribbon`, 390, 844, '.ar5-row');
  await send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 1 });
  const touch = await evaluate(`(() => { const r = document.querySelectorAll('.ar5-row')[1].getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; })()`);
  await send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [touch] });
  await send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await sleep(250);
  assert.deepEqual(await active(), ['02']);
  await send('Emulation.setTouchEmulationEnabled', { enabled: false });
  console.log('PASS touch highlight');

  const assets = await evaluate(`(async () => {
    const module = document.querySelector('.ar5-module');
    const roles = { arrow: 'ar5-rail-arrow-mask.svg', tab: 'ar5-ribbon-tab-mask.svg', medallion: 'ar5-medallion-notch-mask.svg' };
    const result = [];
    for (const [role, file] of Object.entries(roles)) {
      const shape = module.querySelector('.ar5-' + role);
      const masked = shape.classList.contains('ar5-has-mask');
      const style = getComputedStyle(shape.querySelector('.ar5-' + role + '-fill'));
      const url = '/assets/shapes/ar5-arrow-ribbon/' + file;
      const item = { masked, mask: style.maskImage, file, url };
      const response = await fetch(url);
      item.status = response.status;
      item.type = response.headers.get('content-type');
      const xml = new DOMParser().parseFromString(await response.text(), 'image/svg+xml');
      item.valid = !xml.querySelector('parsererror') && !!xml.querySelector('svg path');
      if (item.valid) {
        const svg = document.importNode(xml.documentElement, true);
        svg.style.cssText = 'position:fixed;visibility:hidden;pointer-events:none';
        document.body.append(svg);
        try {
          const bounds = svg.querySelector('path').getBBox();
          const viewBox = svg.viewBox.baseVal;
          item.bounds = [bounds.x, bounds.y, bounds.width, bounds.height];
          item.viewBox = [viewBox.x, viewBox.y, viewBox.width, viewBox.height];
          item.aspect = svg.getAttribute('preserveAspectRatio');
        } finally { svg.remove(); }
        const image = new Image();
        image.src = url;
        await image.decode();
        item.loaded = image.naturalWidth > 0 && image.naturalHeight > 0;
      }
      shape.classList.remove('ar5-has-mask');
      try {
        const fallback = getComputedStyle(shape.querySelector('.ar5-' + role + '-fill'));
        item.fallbackMask = fallback.maskImage;
        item.fallbackShape = role === 'medallion' ? fallback.borderRadius : fallback.clipPath;
      } finally { if (masked) shape.classList.add('ar5-has-mask'); }
      result.push(item);
    }
    return result;
  })()`);
  for (const asset of assets) {
    assert.equal(asset.masked, true, `${asset.file} must activate its mask`);
    assert.equal(asset.status, 200);
    assert.ok(asset.type?.includes('image/svg+xml') && asset.valid && asset.loaded);
    assert.equal(asset.mask, `url("${new URL(asset.url, baseUrl).href}")`, 'mask uses the direct AR5 asset URL');
    assert.equal(asset.aspect, 'none');
    asset.viewBox.forEach((value, i) => assert.ok(Math.abs(value - asset.bounds[i]) < 0.1, `${asset.file} viewBox matches path bounds`));
    assert.equal(asset.fallbackMask, 'none');
    assert.ok(asset.fallbackShape === '50%' || asset.fallbackShape.startsWith('polygon('));
  }
  console.log('PASS direct SVG URLs, all supplied masks, cropped path bounds and CSS fallback styles');

  await evaluate(`document.querySelector('.ar5-module').classList.add('ar5-module--silver-red', 'ar5-module--clean')`);
  assert.deepEqual(await evaluate(`(() => {
    const module = document.querySelector('.ar5-module');
    return [getComputedStyle(module).backgroundColor, getComputedStyle(module.querySelector('.ar5-arrow-content')).color];
  })()`), ['rgb(255, 255, 255)', 'rgb(63, 70, 84)']);
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  assert.ok(await evaluate(`Array.from(document.querySelectorAll('.ar5-arrow,.ar5-arrow-content,.ar5-arrow-skin,.ar5-medallion,.ar5-tab')).every(el => getComputedStyle(el).transitionDuration === '0s' && getComputedStyle(el).transform === 'none')`));
  assert.deepEqual(browser.errors, [], 'no browser runtime or resource errors');
  console.log('PASS silver-red/clean themes, reduced motion and no browser errors');
} finally {
  await browser.close();
}
console.log(`PASS all AR5 checks. Screenshots: ${output}`);
