import assert from 'node:assert/strict';
import { access, mkdtemp, readdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createBrowser, sleep } from './browser-session.mjs';

const baseUrl = process.env.BASE_URL || 'http://127.0.0.1:3210';
const output = await mkdtemp(path.join(tmpdir(), 'd8p-test-'));
const browser = await createBrowser();
const { evaluate, send, navigate, screenshot } = browser;
const root = 'document.querySelector(".d8p-module")';

async function key(k) {
  await send('Input.dispatchKeyEvent', { type: 'keyDown', key: k, code: k });
  await send('Input.dispatchKeyEvent', { type: 'keyUp', key: k, code: k });
  await sleep(30);
}

try {
  const assetFiles = [
    'd8p-petal-01-mask.svg',
    'd8p-petal-02-mask.svg',
    'd8p-petal-03-mask.svg',
    'd8p-petal-04-mask.svg',
    'd8p-petal-05-mask.svg',
    'd8p-petal-06-mask.svg',
    'd8p-petal-07-mask.svg',
    'd8p-petal-08-mask.svg',
    'd8p-center-circle-mask.svg',
    'd8p-original-petal.svg',
    'd8p-original-center-circle.svg',
  ];

  const entries = await readdir(new URL('../public/assets/shapes/d8p-diamond-petals/', import.meta.url));
  for (const file of assetFiles) {
    assert.ok(entries.includes(file), `Missing ${file}`);
    const res = await fetch(`${baseUrl}/assets/shapes/d8p-diamond-petals/${file}`);
    assert.equal(res.status, 200, `${file} HTTP 200`);
    assert.ok(res.headers.get('content-type')?.includes('image/svg+xml'));
  }
  console.log('PASS all 11 D8P SVG assets HTTP 200 from /assets/shapes/d8p-diamond-petals/');

  for (const route of ['/', '/shapes/d8p-diamond-petals']) {
    assert.equal((await fetch(`${baseUrl}${route}`)).status, 200);
    for (const [w, h] of [[1920, 1080], [1440, 960], [1024, 900], [768, 900], [520, 860], [390, 844], [320, 640]]) {
      await navigate(`${baseUrl}${route}`, w, h, '.d8p-module');
      const layout = await evaluate(`(() => {
        const mod = ${root};
        const csMod = getComputedStyle(mod);
        const stage = mod.querySelector('.d8p-stage').getBoundingClientRect();
        const csPetals = getComputedStyle(mod.querySelector('.d8p-petals-layer'));
        const csCore = getComputedStyle(mod.querySelector('.d8p-core__surface'));
        const petals = [...mod.querySelectorAll('.d8p-petal')];
        const contents = [...mod.querySelectorAll('.d8p-petal-content')];
        return {
          overflow: document.documentElement.scrollWidth > innerWidth,
          bgColor: csMod.backgroundColor,
          bgImage: csMod.backgroundImage,
          stageRatio: stage.width / stage.height,
          stageInViewport: stage.left >= -1 && stage.right <= innerWidth + 1,
          petalsFilter: csPetals.filter,
          coreMask: csCore.maskImage || csCore.webkitMaskImage,
          petalCount: petals.length,
          hitCount: mod.querySelectorAll('.d8p-hitmap__petal').length,
          petalsOk: petals.every(p => {
            const f = getComputedStyle(p.querySelector('.d8p-petal__fill'));
            const m = f.maskImage || f.webkitMaskImage;
            return Boolean(m && m !== 'none');
          }),
          contentsOk: contents.every(c => {
            const icon = c.querySelector('.d8p-petal-content__icon svg')?.getBoundingClientRect();
            const num = c.querySelector('.d8p-petal-content__number')?.getBoundingClientRect();
            return Boolean(icon && icon.width >= 10 && num && num.width > 0);
          }),
          mobileCardsVisible: getComputedStyle(mod.querySelector('.d8p-mobile-cards')).display !== 'none',
        };
      })()`);

      assert.equal(layout.overflow, false, `overflow ${route} ${w}px`);
      assert.equal(layout.bgColor, 'rgb(255, 255, 255)', `white bg ${route} ${w}px`);
      assert.equal(layout.bgImage, 'none', `no bg image ${route} ${w}px`);
      assert.ok(Math.abs(layout.stageRatio - 1) < 0.02, `1:1 ratio ${w}px`);
      assert.equal(layout.stageInViewport, true, `in viewport ${w}px`);
      assert.ok(layout.petalsFilter.includes('drop-shadow'));
      assert.ok(layout.coreMask && layout.coreMask !== 'none');
      assert.equal(layout.petalCount, 8);
      assert.equal(layout.hitCount, 8);
      assert.equal(layout.petalsOk, true);
      assert.equal(layout.contentsOk, true);
      assert.equal(layout.mobileCardsVisible, w <= 680);

      if (route === '/shapes/d8p-diamond-petals' && (w === 1440 || w === 768 || w === 390 || w === 320)) {
        await screenshot(path.join(output, `d8p-reference-${w}.png`));
      }
      console.log(`PASS D8P layout ${route} ${w}x${h}`);
    }
  }

  await navigate(`${baseUrl}/shapes/d8p-diamond-petals`, 1280, 960, '.d8p-module');
  await evaluate(`${root}.querySelectorAll('.d8p-hitmap__petal')[1].dispatchEvent(new MouseEvent('click', { bubbles: true }))`);
  await sleep(40);
  assert.equal(await evaluate(`${root}.querySelectorAll('.d8p-petal')[1].classList.contains('d8p-petal--active')`), true);
  assert.equal(await evaluate(`${root}.querySelectorAll('.d8p-hitmap__petal')[1].getAttribute('aria-pressed')`), 'true');

  await evaluate(`${root}.querySelectorAll('.d8p-hitmap__petal')[1].focus()`);
  await key('ArrowRight');
  assert.equal(await evaluate(`document.activeElement === ${root}.querySelectorAll('.d8p-hitmap__petal')[2]`), true);
  await key('Escape');
  assert.equal(await evaluate(`${root}.querySelectorAll('.d8p-hitmap__petal')[1].getAttribute('aria-pressed')`), 'false');

  await navigate(`${baseUrl}/shapes/d8p-diamond-petals?theme=spectrum`, 1024, 900, '.d8p-module');
  await screenshot(path.join(output, 'd8p-spectrum-1024.png'));
  await assert.rejects(access(new URL('../shape 31', import.meta.url)), { code: 'ENOENT' });
  assert.deepEqual(browser.errors, []);
  console.log(`PASS all D8P checks. Screenshots: ${output}`);
} finally {
  await browser.close();
}
