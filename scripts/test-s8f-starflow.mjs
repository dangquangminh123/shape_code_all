import assert from 'node:assert/strict';
import { access, mkdtemp, readdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createBrowser, sleep } from './browser-session.mjs';

const baseUrl = process.env.BASE_URL || 'http://127.0.0.1:3210';
const output = await mkdtemp(path.join(tmpdir(), 's8f-test-'));
const browser = await createBrowser();
const { evaluate, send, navigate, screenshot } = browser;
const root = 'document.querySelector(".s8f-module")';

async function key(k) {
  await send('Input.dispatchKeyEvent', { type: 'keyDown', key: k, code: k });
  await send('Input.dispatchKeyEvent', { type: 'keyUp', key: k, code: k });
  await sleep(30);
}

try {
  const assetFiles = [
    's8f-sector-01-crimson-mask.svg',
    's8f-sector-02-charcoal-mask.svg',
    's8f-sector-03-slate-mask.svg',
    's8f-sector-04-teal-mask.svg',
    's8f-sector-05-sand-mask.svg',
    's8f-star-core-mask.svg',
    's8f-source-vane-light-mask.svg',
    's8f-original-curved-vane.svg',
    's8f-original-fivepoint-star.svg',
  ];

  await assert.rejects(access(new URL('../shape 26', import.meta.url)), { code: 'ENOENT' });

  const entries = await readdir(new URL('../public/assets/shapes/s8f-starflow/', import.meta.url));
  for (const file of assetFiles) {
    assert.ok(entries.includes(file), `Missing ${file}`);
    const res = await fetch(`${baseUrl}/assets/shapes/s8f-starflow/${file}`);
    assert.equal(res.status, 200, `${file} HTTP 200`);
    assert.ok(res.headers.get('content-type')?.includes('image/svg+xml'));
  }
  console.log('PASS all 9 S8F SVG assets HTTP 200 from /assets/shapes/s8f-starflow/');

  for (const route of ['/', '/shapes/s8f-starflow']) {
    assert.equal((await fetch(`${baseUrl}${route}`)).status, 200);
    for (const [w, h] of [[1920, 1080], [1440, 960], [1024, 900], [768, 900], [520, 860], [390, 844], [320, 640]]) {
      await navigate(`${baseUrl}${route}`, w, h, '.s8f-module');
      const layout = await evaluate(`(() => {
        const mod = ${root};
        const csMod = getComputedStyle(mod);
        const wheel = mod.querySelector('.s8f-wheel').getBoundingClientRect();
        const csSurface = getComputedStyle(mod.querySelector('.s8f-wheel__surface'));
        const csStar = getComputedStyle(mod.querySelector('.s8f-star__surface'));
        const blades = [...mod.querySelectorAll('.s8f-blade')];
        const captions = [...mod.querySelectorAll('.s8f-caption')];
        return {
          overflow: document.documentElement.scrollWidth > innerWidth,
          bgColor: csMod.backgroundColor,
          bgImage: csMod.backgroundImage,
          wheelRatio: wheel.width / wheel.height,
          wheelInViewport: wheel.left >= -1 && wheel.right <= innerWidth + 1,
          surfaceFilter: csSurface.filter,
          starMask: csStar.maskImage || csStar.webkitMaskImage,
          bladeCount: blades.length,
          hitCount: mod.querySelectorAll('.s8f-wheel__hit-sector').length,
          bladesOk: blades.every(b => {
            const f = getComputedStyle(b.querySelector('.s8f-blade__fill'));
            const s = getComputedStyle(b.querySelector('.s8f-blade__sheen'));
            const m1 = f.maskImage || f.webkitMaskImage;
            const m2 = s.maskImage || s.webkitMaskImage;
            return m1 && m1 !== 'none' && m1 === m2;
          }),
          captionsOk: captions.every(c => {
            const icon = c.querySelector('.s8f-caption__icon svg')?.getBoundingClientRect();
            const head = c.querySelector('.s8f-caption__heading')?.getBoundingClientRect();
            return Boolean(icon && icon.width >= 10 && icon.height >= 10 && head && head.width > 0);
          }),
          mobileCardsVisible: getComputedStyle(mod.querySelector('.s8f-mobile-cards')).display !== 'none',
        };
      })()`);

      assert.equal(layout.overflow, false, `overflow ${route} ${w}px`);
      assert.equal(layout.bgColor, 'rgb(255, 255, 255)', `white bg ${route} ${w}px`);
      assert.equal(layout.bgImage, 'none', `no bg image ${route} ${w}px`);
      assert.ok(Math.abs(layout.wheelRatio - 1) < 0.02, `1:1 ratio ${w}px`);
      assert.equal(layout.wheelInViewport, true, `in viewport ${w}px`);
      assert.ok(layout.surfaceFilter.includes('drop-shadow'));
      assert.ok(layout.starMask && layout.starMask !== 'none');
      assert.equal(layout.bladeCount, 5);
      assert.equal(layout.hitCount, 5);
      assert.equal(layout.bladesOk, true);
      assert.equal(layout.captionsOk, true);
      assert.equal(layout.mobileCardsVisible, w <= 680);

      if (route === '/shapes/s8f-starflow' && (w === 1440 || w === 768 || w === 390 || w === 320)) {
        await screenshot(path.join(output, `s8f-reference-${w}.png`));
      }
      console.log(`PASS S8F layout ${route} ${w}x${h}`);
    }
  }

  await navigate(`${baseUrl}/shapes/s8f-starflow`, 1280, 900, '.s8f-module');
  await evaluate(`${root}.querySelectorAll('.s8f-wheel__hit-sector')[1].dispatchEvent(new MouseEvent('click', { bubbles: true }))`);
  await sleep(40);
  assert.equal(await evaluate(`${root}.querySelectorAll('.s8f-blade')[1].classList.contains('s8f-blade--active')`), true);
  assert.equal(await evaluate(`${root}.querySelectorAll('.s8f-wheel__hit-sector')[1].getAttribute('aria-pressed')`), 'true');

  await evaluate(`${root}.querySelectorAll('.s8f-wheel__hit-sector')[1].focus()`);
  await key('ArrowRight');
  assert.equal(await evaluate(`document.activeElement === ${root}.querySelectorAll('.s8f-wheel__hit-sector')[2]`), true);
  await key('Escape');
  assert.equal(await evaluate(`${root}.querySelectorAll('.s8f-wheel__hit-sector')[1].getAttribute('aria-pressed')`), 'false');

  await navigate(`${baseUrl}/shapes/s8f-starflow?theme=silver-red`, 1024, 900, '.s8f-module');
  await screenshot(path.join(output, 's8f-silver-red-1024.png'));
  assert.deepEqual(browser.errors, []);
  console.log(`PASS all S8F checks. Screenshots: ${output}`);
} finally {
  await browser.close();
}
