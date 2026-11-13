import assert from 'node:assert/strict';
import { mkdtemp, readdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createBrowser, sleep } from './browser-session.mjs';

const baseUrl = process.env.BASE_URL || 'http://127.0.0.1:3210';
const output = await mkdtemp(path.join(tmpdir(), 'wh9-test-'));
const browser = await createBrowser();
const { evaluate, send, navigate, screenshot } = browser;
const root = 'document.querySelector(".wh9-module")';

async function key(k) {
  await send('Input.dispatchKeyEvent', { type: 'keyDown', key: k, code: k });
  await send('Input.dispatchKeyEvent', { type: 'keyUp', key: k, code: k });
  await sleep(30);
}

try {
  const assetFiles = [
    'wh9-sector-mask-01.svg',
    'wh9-sector-mask-02.svg',
    'wh9-sector-mask-03.svg',
    'wh9-sector-mask-04.svg',
    'wh9-sector-mask-05.svg',
    'wh9-sector-mask-06.svg',
    'wh9-heart-core.svg',
  ];

  const entries = await readdir(new URL('../public/assets/shapes/wh9-heart-ring/', import.meta.url));
  for (const file of assetFiles) {
    assert.ok(entries.includes(file), `Missing ${file}`);
    const res = await fetch(`${baseUrl}/assets/shapes/wh9-heart-ring/${file}`);
    assert.equal(res.status, 200, `${file} HTTP 200`);
    assert.ok(res.headers.get('content-type')?.includes('image/svg+xml'));
  }
  const orig = await readdir(new URL('../public/assets/shapes/wh9-heart-ring/source-original/', import.meta.url));
  assert.equal(orig.filter((f) => f.endsWith('.svg')).length, 7);
  console.log('PASS all WH9 SVG assets HTTP 200');

  for (const route of ['/', '/shapes/wh9-heart-ring']) {
    assert.equal((await fetch(`${baseUrl}${route}`)).status, 200);
    for (const [w, h] of [[1920, 1080], [1440, 960], [1024, 900], [768, 900], [520, 860], [390, 844], [320, 640]]) {
      await navigate(`${baseUrl}${route}`, w, h, '.wh9-module');
      const layout = await evaluate(`(() => {
        const mod = ${root};
        const stage = mod.querySelector('.wh9-stage').getBoundingClientRect();
        const numbers = [...mod.querySelectorAll('.wh9-number')];
        const copies = [...mod.querySelectorAll('.wh9-copy')];
        const core = mod.querySelector('.wh9-core-copy');
        const coreR = core.getBoundingClientRect();
        const heartR = mod.querySelector('.wh9-art__heart').getBoundingClientRect();
        return {
          overflow: document.documentElement.scrollWidth > innerWidth,
          ratio: stage.width / stage.height,
          inView: stage.left >= -1 && stage.right <= innerWidth + 1,
          sectors: mod.querySelectorAll('.wh9-sector-paint').length,
          hits: mod.querySelectorAll('.wh9-hitmap__sector').length,
          paletteCount: mod.querySelectorAll('.wh9-palette').length,
          heartRing: Boolean(mod.querySelector('.wh9-art__heart')),
          coreFit: coreR.left > heartR.left + 8 && coreR.right < heartR.right - 8 && coreR.top > heartR.top + 12 && coreR.bottom < heartR.bottom - 12,
          numsOk: numbers.length === 6 && numbers.every((n) => {
            const r = n.getBoundingClientRect();
            return r.width > 0 && r.left > stage.left && r.right < stage.right && r.top > stage.top && r.bottom < stage.bottom;
          }),
          copiesOk: copies.length === 6 && copies.every((c) => {
            const st = c.querySelector('.wh9-copy__heading')?.getBoundingClientRect();
            const desc = c.querySelector('.wh9-copy__description')?.getBoundingClientRect();
            const descVis = innerWidth > 520 ? Boolean(desc && desc.width > 0 && desc.left > stage.left && desc.right < stage.right) : true;
            return Boolean(st && st.width > 0 && st.left > stage.left && st.right < stage.right && descVis);
          }),
          mobileVis: getComputedStyle(mod.querySelector('.wh9-mobile-list')).display !== 'none',
          mobileIcons: [...mod.querySelectorAll('.wh9-mobile-item')].every((it) =>
            Boolean(it.querySelector('[data-wh9-mobile-icon] svg') && it.querySelector('.wh9-mobile-item__chevron'))
          ),
        };
      })()`);

      assert.equal(layout.overflow, false, `overflow ${route} ${w}px`);
      assert.ok(Math.abs(layout.ratio - 1) < 0.02, `1:1 ratio ${w}px`);
      assert.equal(layout.inView, true, `inView ${w}px`);
      assert.equal(layout.sectors, 6);
      assert.equal(layout.hits, 6);
      assert.equal(layout.paletteCount, 0);
      assert.equal(layout.heartRing, true);
      assert.equal(layout.coreFit, true, `coreFit ${w}px`);
      assert.equal(layout.numsOk, true, `numsOk ${w}px`);
      assert.equal(layout.copiesOk, true, `copiesOk ${w}px`);
      assert.equal(layout.mobileVis, w <= 520, `mobileVis ${w}px`);
      if (w <= 520) assert.equal(layout.mobileIcons, true);

      if (route === '/shapes/wh9-heart-ring' && (w === 1440 || w === 768 || w === 390 || w === 320)) {
        await screenshot(path.join(output, `wh9-reference-${w}.png`));
      }
      console.log(`PASS WH9 ${route} ${w}x${h}`);
    }
  }

  await navigate(`${baseUrl}/shapes/wh9-heart-ring`, 1280, 960, '.wh9-module');
  await evaluate(`${root}.querySelectorAll('.wh9-hitmap__sector')[1].dispatchEvent(new MouseEvent('click', { bubbles: true }))`);
  await sleep(40);
  assert.equal(await evaluate(`${root}.querySelectorAll('.wh9-sector-paint')[1].classList.contains('is-active')`), true);
  assert.equal(await evaluate(`${root}.querySelectorAll('.wh9-hitmap__sector')[1].getAttribute('aria-pressed')`), 'true');

  await evaluate(`${root}.querySelectorAll('.wh9-hitmap__sector')[1].focus()`);
  await key('ArrowRight');
  assert.equal(await evaluate(`document.activeElement === ${root}.querySelectorAll('.wh9-hitmap__sector')[2]`), true);
  await key('Escape');
  assert.equal(await evaluate(`${root}.querySelectorAll('.wh9-hitmap__sector')[1].getAttribute('aria-pressed')`), 'false');

  await navigate(`${baseUrl}/shapes/wh9-heart-ring?theme=silver-red`, 1280, 960, '.wh9-module');
  await screenshot(path.join(output, 'wh9-silver-red-1280.png'));
  assert.deepEqual(browser.errors, []);
  console.log(`SCREENSHOT_DIR=${output}`);
} finally {
  await browser.close();
}
