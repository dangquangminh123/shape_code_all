import assert from 'node:assert/strict';
import { access, mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createBrowser, sleep } from './browser-session.mjs';

const baseUrl = process.env.BASE_URL || 'http://127.0.0.1:3210';
const output = await mkdtemp(path.join(tmpdir(), 'sr6-test-'));
const browser = await createBrowser();
const { evaluate, send, navigate, screenshot } = browser;
const root = 'document.querySelector(".sr6-module")';

async function key(k) {
  await send('Input.dispatchKeyEvent', { type: 'keyDown', key: k, code: k });
  await send('Input.dispatchKeyEvent', { type: 'keyUp', key: k, code: k });
  await sleep(30);
}

try {
  const maskFiles = [
    'sr6-nose-cone-mask.svg',
    'sr6-upper-shell-mask.svg',
    'sr6-mid-shell-mask.svg',
    'sr6-wing-assembly-mask.svg',
    'sr6-engine-skirt-mask.svg',
    'sr6-exhaust-flame-mask.svg',
  ];

  await assert.rejects(
    access(new URL('../public/assets/sr6-startup-rocket/', import.meta.url)),
    { code: 'ENOENT' },
  );

  for (const file of maskFiles) {
    const res = await fetch(`${baseUrl}/assets/shapes/sr6-startup-rocket/${file}`);
    assert.equal(res.status, 200, `${file} HTTP 200`);
    assert.ok(res.headers.get('content-type')?.includes('image/svg+xml'));
  }
  console.log('PASS all 6 SR6 SVG masks HTTP 200 from /assets/shapes/sr6-startup-rocket/');

  for (const route of ['/', '/shapes/sr6-startup-rocket']) {
    assert.equal((await fetch(`${baseUrl}${route}`)).status, 200);
    for (const [w, h] of [
      [1440, 1000],
      [1280, 900],
      [1024, 768],
      [740, 820],
      [720, 960],
      [420, 900],
      [390, 844],
      [320, 640],
    ]) {
      await navigate(`${baseUrl}${route}`, w, h, '.sr6-module');
      const layout = await evaluate(`(() => {
        const mod = ${root};
        const pieces = [...mod.querySelectorAll('.sr6-rocket__piece')];
        const steps = [...mod.querySelectorAll('.sr6-timeline__step')];
        const pins = [...mod.querySelectorAll('.sr6-timeline__pin')];
        const rocket = mod.querySelector('.sr6-rocket').getBoundingClientRect();
        const timeline = mod.querySelector('.sr6-timeline').getBoundingClientRect();
        const arcDisplay = getComputedStyle(mod.querySelector('.sr6-timeline__arc')).display;
        const assemblyFilter = getComputedStyle(mod.querySelector('.sr6-rocket__assembly')).filter;
        return {
          overflow: document.documentElement.scrollWidth > innerWidth,
          pieceCount: pieces.length,
          stepCount: steps.length,
          pinCount: pins.length,
          assemblyFilter,
          arcDisplay,
          rocketBox: { right: rocket.right, bottom: rocket.bottom },
          timelineBox: { left: timeline.left, top: timeline.top },
          pieces: pieces.map(p => {
            const r = p.getBoundingClientRect();
            const s = p.querySelector('.sr6-rocket__surface').getBoundingClientRect();
            const cs = getComputedStyle(p.querySelector('.sr6-rocket__surface'));
            const icon = p.querySelector('.sr6-rocket__icon svg').getBoundingClientRect();
            return {
              top: r.top,
              surfaceMatch: Math.abs(r.left - s.left) < 0.5 && Math.abs(r.top - s.top) < 0.5 && Math.abs(r.width - s.width) < 0.5 && Math.abs(r.height - s.height) < 0.5,
              mask: cs.maskImage || cs.webkitMaskImage,
              iconOk: icon.width >= 14 && icon.height >= 14,
            };
          }),
        };
      })()`);

      assert.equal(layout.overflow, false, `no overflow ${route} ${w}px`);
      assert.equal(layout.pieceCount, 6);
      assert.equal(layout.stepCount, 6);
      assert.equal(layout.pinCount, 6);
      assert.ok(layout.assemblyFilter.includes('drop-shadow'));
      assert.ok(layout.pieces.every(p => p.surfaceMatch && p.mask && p.mask !== 'none' && p.iconOk));

      for (let i = 0; i < 5; i++) {
        assert.ok(layout.pieces[i].top < layout.pieces[i + 1].top);
      }

      if (w > 720) {
        assert.notEqual(layout.arcDisplay, 'none');
        assert.ok(layout.rocketBox.right <= layout.timelineBox.left + 40);
      } else {
        assert.equal(layout.arcDisplay, 'none');
        assert.ok(layout.rocketBox.bottom <= layout.timelineBox.top + 36);
      }

      if (route === '/shapes/sr6-startup-rocket' && (w === 1280 || w === 420)) {
        await screenshot(path.join(output, `sr6-reference-${w}.png`));
      }
      console.log(`PASS SR6 layout ${route} ${w}x${h}`);
    }
  }

  await navigate(`${baseUrl}/shapes/sr6-startup-rocket`, 1280, 900, '.sr6-module');
  await evaluate(`${root}.querySelector('.sr6-rocket__piece--03').click()`);
  await sleep(40);
  const clicked = await evaluate(`({
    pinned: ${root}.dataset.sr6Pinned,
    pieceActive: ${root}.querySelector('.sr6-rocket__piece--03').classList.contains('is-active'),
    stepActive: ${root}.querySelector('.sr6-timeline__step--03').classList.contains('is-active'),
    pieceTransform: getComputedStyle(${root}.querySelector('.sr6-rocket__piece--03')).transform,
  })`);
  assert.equal(clicked.pinned, '3');
  assert.equal(clicked.pieceActive, true);
  assert.equal(clicked.stepActive, true);
  assert.equal(clicked.pieceTransform, 'none');

  await evaluate(`${root}.querySelector('.sr6-timeline__pin[data-sr6-step="3"]').focus()`);
  await key('ArrowDown');
  assert.equal(await evaluate(`document.activeElement?.dataset?.sr6Step`), '4');
  await key('Escape');
  assert.equal(await evaluate(`${root}.dataset.sr6Pinned`), '');

  await navigate(`${baseUrl}/shapes/sr6-startup-rocket?theme=silver-red&instances=2`, 1280, 900, '.sr6-module');
  await screenshot(path.join(output, 'sr6-silver-red-1280.png'));
  assert.deepEqual(browser.errors, []);
  console.log(`PASS all SR6 checks. Screenshots: ${output}`);
} finally {
  await browser.close();
}
