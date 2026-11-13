import assert from 'node:assert/strict';
import { access, mkdtemp, readdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createBrowser, sleep } from './browser-session.mjs';

const baseUrl = process.env.BASE_URL || 'http://127.0.0.1:3210';
const output = await mkdtemp(path.join(tmpdir(), 'st7-test-'));
const browser = await createBrowser();
const { evaluate, send, navigate, screenshot } = browser;
const root = 'document.querySelector(".st7-module")';

async function key(k) {
  await send('Input.dispatchKeyEvent', { type: 'keyDown', key: k, code: k });
  await send('Input.dispatchKeyEvent', { type: 'keyUp', key: k, code: k });
  await sleep(30);
}

try {
  const assetFiles = [
    'st7-horizontal-tube-mask.svg',
    'st7-sealed-edge-ribs.svg',
    'st7-fluid-splash-mask.svg',
    'source-blob-original.svg',
    'source-tube-original.svg',
  ];

  // Ensure no duplicate st7 folder outside public/assets/shapes/st7-squeeze-tubes
  await assert.rejects(
    access(new URL('../public/assets/st7-squeeze-tubes/', import.meta.url)),
    { code: 'ENOENT' },
  );

  const entries = await readdir(new URL('../public/assets/shapes/st7-squeeze-tubes/', import.meta.url));
  for (const file of assetFiles) {
    assert.ok(entries.includes(file), `Expected ${file} in public/assets/shapes/st7-squeeze-tubes/`);
    const res = await fetch(`${baseUrl}/assets/shapes/st7-squeeze-tubes/${file}`);
    assert.equal(res.status, 200, `${file} HTTP 200`);
    assert.ok(res.headers.get('content-type')?.includes('image/svg+xml'));
  }
  console.log('PASS all 5 ST7 SVG assets HTTP 200 from /assets/shapes/st7-squeeze-tubes/');

  for (const route of ['/', '/shapes/st7-squeeze-tubes']) {
    assert.equal((await fetch(`${baseUrl}${route}`)).status, 200);
    for (const [w, h] of [
      [1920, 1080],
      [1280, 900],
      [900, 900],
      [768, 900],
      [520, 840],
      [375, 812],
      [320, 640],
    ]) {
      await navigate(`${baseUrl}${route}`, w, h, '.st7-module');
      const layout = await evaluate(`(() => {
        const mod = ${root};
        const stage = mod.querySelector('.st7-stage').getBoundingClientRect();
        const pieces = [...mod.querySelectorAll('.st7-piece')];
        return {
          overflow: document.documentElement.scrollWidth > innerWidth,
          stageRatio: stage.width / stage.height,
          pieceCount: pieces.length,
          pieces: pieces.map(p => {
            const r = p.getBoundingClientRect();
            const shell = p.querySelector('.st7-tube-shell');
            const visual = p.querySelector('.st7-tube-visual');
            const splash = p.querySelector('.st7-marker-splash');
            const icon = p.querySelector('.st7-tube-icon')?.getBoundingClientRect();
            const caption = p.querySelector('.st7-tube-caption');
            const csShell = getComputedStyle(shell);
            const csVisual = getComputedStyle(visual);
            const csSplash = getComputedStyle(splash);
            const csCaption = getComputedStyle(caption);
            return {
              top: r.top,
              left: r.left,
              right: r.right,
              bottom: r.bottom,
              shellMask: csShell.maskImage || csShell.webkitMaskImage,
              splashMask: csSplash.maskImage || csSplash.webkitMaskImage,
              visualFilter: csVisual.filter,
              visualTransform: csVisual.transform,
              captionTransform: csCaption.transform,
              iconOk: Boolean(icon && icon.width >= 8 && icon.height >= 8),
            };
          }),
        };
      })()`);

      assert.equal(layout.overflow, false, `no overflow ${route} ${w}px`);
      assert.equal(layout.pieceCount, 3);
      assert.ok(Math.abs(layout.stageRatio - 1) < 0.02, `stage 1:1 ratio at ${w}px`);
      assert.ok(
        layout.pieces.every(
          p =>
            p.shellMask &&
            p.shellMask !== 'none' &&
            p.splashMask &&
            p.splashMask !== 'none' &&
            p.visualFilter.includes('drop-shadow') &&
            p.iconOk &&
            p.left >= 0 &&
            p.right <= w + 1,
        ),
      );
      assert.ok(layout.pieces[0].top < layout.pieces[1].top && layout.pieces[1].top < layout.pieces[2].top);

      if (route === '/shapes/st7-squeeze-tubes' && (w === 1280 || w === 900 || w === 375)) {
        await screenshot(path.join(output, `st7-reference-${w}.png`));
      }
      console.log(`PASS ST7 layout ${route} ${w}x${h}`);
    }
  }

  await navigate(`${baseUrl}/shapes/st7-squeeze-tubes`, 1280, 900, '.st7-module');
  await evaluate(`${root}.querySelector('.st7-piece--02').click()`);
  await sleep(40);
  const clicked = await evaluate(`({
    active: ${root}.querySelector('.st7-piece--02').classList.contains('st7-piece--active'),
    pressed: ${root}.querySelector('.st7-piece--02').getAttribute('aria-pressed'),
  })`);
  assert.equal(clicked.active, true);
  assert.equal(clicked.pressed, 'true');

  await evaluate(`${root}.querySelector('.st7-piece--02').focus()`);
  await key('ArrowDown');
  assert.equal(
    await evaluate(`document.activeElement?.classList?.contains('st7-piece--03')`),
    true,
  );
  await key('Escape');
  assert.equal(
    await evaluate(`${root}.querySelector('.st7-piece--02').getAttribute('aria-pressed')`),
    'false',
  );

  await navigate(`${baseUrl}/shapes/st7-squeeze-tubes?theme=silver-red`, 900, 900, '.st7-module');
  await screenshot(path.join(output, 'st7-silver-red-900.png'));
  assert.deepEqual(browser.errors, []);
  console.log(`PASS all ST7 checks. Screenshots: ${output}`);
} finally {
  await browser.close();
}
