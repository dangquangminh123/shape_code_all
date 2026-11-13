import assert from 'node:assert/strict';
import { access, mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createBrowser, sleep } from './browser-session.mjs';

const baseUrl = process.env.BASE_URL || 'http://127.0.0.1:3210';
const output = await mkdtemp(path.join(tmpdir(), 'vt4-test-'));
const browser = await createBrowser();
const { evaluate, send, navigate, screenshot } = browser;
const root = 'document.querySelector(".vt4")';

async function key(keyName, code = keyName) {
  await send('Input.dispatchKeyEvent', { type: 'keyDown', key: keyName, code });
  await send('Input.dispatchKeyEvent', { type: 'keyUp', key: keyName, code });
  await sleep(30);
}

try {
  const maskFiles = [
    'vt4-tube-full-mask.svg',
    'vt4-tube-body-mask.svg',
    'vt4-tube-foil-mask.svg',
    'vt4-tube-rim-mask.svg',
    'vt4-tube-cap-mask.svg',
    'vt4-ribbon-face-mask.svg',
    'vt4-ribbon-bevel-mask.svg',
  ];
  await assert.rejects(
    access(new URL('../public/assets/vt4-tube-ribbon/', import.meta.url)),
    { code: 'ENOENT' },
    'VT4 assets must stay under public/assets/shapes without a duplicate sibling folder',
  );
  for (const file of maskFiles) {
    const response = await fetch(`${baseUrl}/assets/shapes/vt4-tube-ribbon/${file}`);
    assert.equal(response.status, 200, `${file} loads from the shapes folder`);
    assert.ok(response.headers.get('content-type')?.includes('image/svg+xml'));
  }
  console.log('PASS all 7 VT4 SVG masks HTTP 200 from shapes; no duplicate asset folder');

  for (const route of ['/', '/shapes/vt4-tube-ribbon']) {
    assert.equal((await fetch(`${baseUrl}${route}`)).status, 200);
    for (const [width, height] of [[2560, 1440], [1440, 1000], [1200, 900], [1024, 768], [800, 700], [640, 900], [610, 900], [420, 860], [375, 812], [320, 640]]) {
      await navigate(`${baseUrl}${route}`, width, height, '.vt4');
      const layout = await evaluate(`(() => {
        const mod = ${root};
        const tube = mod.querySelector('.vt4__tube');
        const options = [...mod.querySelectorAll('.vt4__option')];
        return {
          overflow: document.documentElement.scrollWidth > innerWidth,
          tubeZ: Number(getComputedStyle(tube).zIndex),
          optionsZ: Number(getComputedStyle(mod.querySelector('.vt4__options')).zIndex),
          numbers: [...mod.querySelectorAll('.vt4__option-number')].map(el => el.textContent.trim()),
          icons: [...mod.querySelectorAll('.vt4__option-icon')].map(el => ({
            tag: el.tagName.toLowerCase(),
            name: el.dataset.vt4Icon,
            paths: el.querySelectorAll('path').length,
          })),
          seams: options.map(opt => {
            const face = opt.querySelector('.vt4__face--fill').getBoundingClientRect();
            const bevel = opt.querySelector('.vt4__bevel--fill').getBoundingClientRect();
            return bevel.left - face.right;
          }),
          bevelOnRight: options.map(opt => {
            const optBox = opt.getBoundingClientRect();
            const bevel = opt.querySelector('.vt4__bevel--fill').getBoundingClientRect();
            return bevel.left > optBox.left + optBox.width * 0.85 && Math.abs(optBox.right - bevel.right) < 1.5;
          }),
          masks: ['.vt4__tube-silver', '.vt4__tube-foil', '.vt4__tube-rim', '.vt4__tube-cap', '.vt4__face--fill', '.vt4__bevel--fill']
            .map(sel => getComputedStyle(mod.querySelector(sel)).maskImage || getComputedStyle(mod.querySelector(sel)).webkitMaskImage),
          contentMasks: options.map(opt => getComputedStyle(opt.querySelector('.vt4__option-content')).maskImage),
        };
      })()`);
      assert.equal(layout.overflow, false, `${route} ${width}x${height} overflow`);
      assert.deepEqual(layout.numbers, ['01', '02', '03', '04']);
      assert.deepEqual(layout.icons.map(i => i.name), ['droplet', 'leaf', 'sparkles', 'shield']);
      assert.ok(layout.icons.every(i => i.tag === 'svg' && i.paths > 0));
      assert.ok(layout.tubeZ > layout.optionsZ);
      assert.ok(layout.seams.every(gap => Math.abs(gap) <= 2), 'VT4 face right edge meets bevel left edge seamlessly');
      assert.ok(layout.bevelOnRight.every(Boolean), 'VT4 3D bevel is positioned at the right end of each option bar');
      assert.ok(
        layout.masks.every(m => m?.includes('/assets/shapes/vt4-tube-ribbon/')),
        'all rendered VT4 masks use the canonical shapes folder',
      );
      assert.ok(layout.contentMasks.every(m => !m || m === 'none'));
      if (route === '/shapes/vt4-tube-ribbon' && (width === 1200 || width === 420)) {
        await screenshot(path.join(output, `vt4-colorful-${width}.png`));
      }
      console.log(`PASS VT4 layout ${route} ${width}x${height}`);
    }
  }

  await navigate(`${baseUrl}/shapes/vt4-tube-ribbon`, 1200, 900, '.vt4');
  await evaluate(`${root}.querySelector('[data-vt4-index="3"]').click()`);
  await sleep(40);
  const sel3 = await evaluate(`({
    rootSelected: ${root}.dataset.vt4Selected,
    pressed: [...${root}.querySelectorAll('.vt4__option')].map(b => b.getAttribute('aria-pressed')),
    hasClass: ${root}.querySelector('[data-vt4-index="3"]').classList.contains('is-selected'),
    status: ${root}.querySelector('[data-vt4-status]').textContent.trim(),
  })`);
  assert.equal(sel3.rootSelected, '3');
  assert.deepEqual(sel3.pressed, ['false', 'false', 'true', 'false']);
  assert.equal(sel3.hasClass, true);
  assert.ok(sel3.status.includes('PHỤC HỒI'));

  await evaluate(`${root}.querySelector('[data-vt4-index="3"]').focus()`);
  await key('Escape');
  assert.equal(await evaluate(`${root}.dataset.vt4Selected`), '');

  await navigate(`${baseUrl}/shapes/vt4-tube-ribbon?theme=silver-red&instances=2`, 1200, 900, '.vt4');
  await screenshot(path.join(output, 'vt4-silver-red-1200.png'));
  await evaluate(`document.querySelectorAll('.vt4')[0].querySelector('[data-vt4-index="2"]').click()`);
  await sleep(40);
  assert.deepEqual(await evaluate(`[...document.querySelectorAll('.vt4')].map(el => el.dataset.vt4Selected)`), ['2', '']);

  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  assert.ok(await evaluate(`[...document.querySelectorAll('.vt4__option,.vt4__tube')].every(el => getComputedStyle(el).transitionDuration === '0s')`));
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] });
  assert.deepEqual(browser.errors, []);
  console.log(`PASS all VT4 checks. Screenshots: ${output}`);
} finally {
  await browser.close();
}
