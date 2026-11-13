import assert from 'node:assert/strict';
import { access, mkdtemp, readdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createBrowser, sleep } from './browser-session.mjs';

const baseUrl = process.env.BASE_URL || 'http://127.0.0.1:3210';
const output = await mkdtemp(path.join(tmpdir(), 'ta4-test-'));
const browser = await createBrowser();
const { evaluate, send, navigate, screenshot } = browser;
const root = 'document.querySelector(".ta4-module")';

async function key(k) {
  await send('Input.dispatchKeyEvent', { type: 'keyDown', key: k, code: k });
  await send('Input.dispatchKeyEvent', { type: 'keyUp', key: k, code: k });
  await sleep(30);
}

try {
  const assetFiles = [
    'ta4-banner-01-mask.svg',
    'ta4-banner-02-mask.svg',
    'ta4-banner-03-mask.svg',
    'ta4-banner-04-mask.svg',
    'ta4-target-base-mask.svg',
    'ta4-arrow-dart-mask.svg',
    'ta4-source-shape-01.svg',
    'ta4-source-shape-02.svg',
    'ta4-source-shape-03.svg',
  ];

  const entries = await readdir(new URL('../public/assets/shapes/ta4-target-arrow/', import.meta.url));
  for (const file of assetFiles) {
    assert.ok(entries.includes(file), `Missing ${file}`);
    const res = await fetch(`${baseUrl}/assets/shapes/ta4-target-arrow/${file}`);
    assert.equal(res.status, 200, `${file} HTTP 200`);
    assert.ok(res.headers.get('content-type')?.includes('image/svg+xml'));
  }
  console.log('PASS all 9 TA4 SVG assets HTTP 200 from /assets/shapes/ta4-target-arrow/');

  for (const route of ['/', '/shapes/ta4-target-arrow']) {
    assert.equal((await fetch(`${baseUrl}${route}`)).status, 200);
    for (const [w, h] of [[1920, 1080], [1440, 960], [1024, 900], [768, 900], [520, 860], [390, 844], [320, 640]]) {
      await navigate(`${baseUrl}${route}`, w, h, '.ta4-module');
      const layout = await evaluate(`(() => {
        const mod = ${root};
        const csMod = getComputedStyle(mod);
        const stage = mod.querySelector('.ta4-stage').getBoundingClientRect();
        const csBanners = getComputedStyle(mod.querySelector('.ta4-banners-layer'));
        const banners = [...mod.querySelectorAll('.ta4-banner')];
        const items = [...mod.querySelectorAll('.ta4-banner-item')];
        return {
          overflow: document.documentElement.scrollWidth > innerWidth,
          bgColor: csMod.backgroundColor,
          bgImage: csMod.backgroundImage,
          stageRatio: stage.width / stage.height,
          stageInViewport: stage.left >= -1 && stage.right <= innerWidth + 1,
          bannersFilter: csBanners.filter,
          bannerCount: banners.length,
          hitCount: mod.querySelectorAll('.ta4-hitmap__banner').length,
          bannersOk: banners.every(b => {
            const f = getComputedStyle(b.querySelector('.ta4-banner__fill'));
            const m = f.maskImage || f.webkitMaskImage;
            return Boolean(m && m !== 'none');
          }),
          itemsOk: items.every(it => {
            const icon = it.querySelector('.ta4-banner-item__icon svg')?.getBoundingClientRect();
            const copy = it.querySelector('.ta4-banner-item__copy')?.getBoundingClientRect();
            const label = it.querySelector('.ta4-banner-item__label')?.getBoundingClientRect();
            const leftCreaseX = stage.left + stage.width * (175.9 / 600);
            const rightCreaseX = stage.left + stage.width * (257.89 / 600);
            return Boolean(icon && icon.width >= 10 && copy && label && label.width > 0 && label.left > leftCreaseX + 1.5 && label.right < rightCreaseX - 1.5);
          }),
          mobileCardsVisible: getComputedStyle(mod.querySelector('.ta4-mobile-cards')).display !== 'none',
        };
      })()`);

      assert.equal(layout.overflow, false, `overflow ${route} ${w}px`);
      assert.equal(layout.bgColor, 'rgb(255, 255, 255)', `white bg ${route} ${w}px`);
      assert.equal(layout.bgImage, 'none', `no bg image ${route} ${w}px`);
      assert.ok(Math.abs(layout.stageRatio - 1) < 0.02, `1:1 ratio ${w}px`);
      assert.equal(layout.stageInViewport, true, `in viewport ${w}px`);
      assert.ok(layout.bannersFilter.includes('drop-shadow'));
      assert.equal(layout.bannerCount, 4);
      assert.equal(layout.hitCount, 4);
      assert.equal(layout.bannersOk, true);
      assert.equal(layout.itemsOk, true);
      assert.equal(layout.mobileCardsVisible, w <= 680);

      if (route === '/shapes/ta4-target-arrow' && (w === 1440 || w === 768 || w === 390 || w === 320)) {
        await screenshot(path.join(output, `ta4-reference-${w}.png`));
      }
      console.log(`PASS TA4 layout ${route} ${w}x${h}`);
    }
  }

  await navigate(`${baseUrl}/shapes/ta4-target-arrow`, 1280, 960, '.ta4-module');
  await evaluate(`${root}.querySelectorAll('.ta4-hitmap__banner')[1].dispatchEvent(new MouseEvent('click', { bubbles: true }))`);
  await sleep(40);
  assert.equal(await evaluate(`${root}.querySelectorAll('.ta4-banner')[1].classList.contains('ta4-banner--active')`), true);
  assert.equal(await evaluate(`${root}.querySelectorAll('.ta4-hitmap__banner')[1].getAttribute('aria-pressed')`), 'true');

  await evaluate(`${root}.querySelectorAll('.ta4-hitmap__banner')[1].focus()`);
  await key('ArrowDown');
  assert.equal(await evaluate(`document.activeElement === ${root}.querySelectorAll('.ta4-hitmap__banner')[2]`), true);
  await key('Escape');
  assert.equal(await evaluate(`${root}.querySelectorAll('.ta4-hitmap__banner')[1].getAttribute('aria-pressed')`), 'false');

  await navigate(`${baseUrl}/shapes/ta4-target-arrow?theme=modern`, 1024, 900, '.ta4-module');
  await screenshot(path.join(output, 'ta4-modern-1024.png'));
  await assert.rejects(access(new URL('../shape 33', import.meta.url)), { code: 'ENOENT' });
  assert.deepEqual(browser.errors, []);
  console.log(`PASS all TA4 checks. Screenshots: ${output}`);
} finally {
  await browser.close();
}
