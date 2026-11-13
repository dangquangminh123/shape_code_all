import assert from 'node:assert/strict';
import { access, mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createBrowser, sleep } from './browser-session.mjs';

const baseUrl = process.env.BASE_URL || 'http://127.0.0.1:3210';
const output = await mkdtemp(path.join(tmpdir(), 'ih8-test-'));
const browser = await createBrowser();
const { evaluate, send, navigate, screenshot } = browser;
const root = 'document.querySelector(".ih8-module")';

async function key(keyName, code = keyName) {
  await send('Input.dispatchKeyEvent', { type: 'keyDown', key: keyName, code });
  await send('Input.dispatchKeyEvent', { type: 'keyUp', key: keyName, code });
  await sleep(30);
}

try {
  const maskFiles = [
    'ih8-heart-crown-left.svg',
    'ih8-heart-crown-right.svg',
    'ih8-heart-shoulder-left.svg',
    'ih8-heart-shoulder-right.svg',
    'ih8-heart-curve-left.svg',
    'ih8-heart-curve-right.svg',
    'ih8-heart-point-left.svg',
    'ih8-heart-point-right.svg',
    'ih8-core-heart-surface.svg',
  ];

  await assert.rejects(
    access(new URL('../public/assets/ih8-heart-elements/', import.meta.url)),
    { code: 'ENOENT' },
    'IH8 assets must stay under public/assets/shapes without a duplicate sibling folder',
  );
  await assert.rejects(
    access(new URL('../public/assets/modules/ih8-heart-elements/', import.meta.url)),
    { code: 'ENOENT' },
    'IH8 assets must stay under public/assets/shapes without a modules folder',
  );

  for (const file of maskFiles) {
    const response = await fetch(`${baseUrl}/assets/shapes/ih8-heart-elements/${file}`);
    assert.equal(response.status, 200, `${file} loads from the shapes folder`);
    assert.ok(response.headers.get('content-type')?.includes('image/svg+xml'));
  }
  console.log('PASS all 9 IH8 SVG masks HTTP 200 from /assets/shapes/ih8-heart-elements/');

  const expectedIcons = [
    'chart-pie',
    'book-open',
    'lightbulb',
    'users',
    'droplet',
    'comments',
    'atom',
    'database',
  ];
  const expectedTitles = [
    'TƯ DUY NỀN TẢNG',
    'KHÁM PHÁ KIẾN THỨC',
    'KHƠI NGUỒN Ý TƯỞNG',
    'KẾT NỐI ĐỘI NHÓM',
    'THỬ NGHIỆM THỰC TẾ',
    'PHẢN HỒI NHANH',
    'TỐI ƯU QUY TRÌNH',
    'LƯU TRỮ KẾT QUẢ',
  ];

  for (const route of ['/', '/shapes/ih8-heart-elements']) {
    assert.equal((await fetch(`${baseUrl}${route}`)).status, 200);
    for (const [width, height] of [
      [2560, 1440],
      [1440, 1000],
      [1280, 900],
      [1024, 768],
      [800, 700],
      [710, 900],
      [640, 900],
      [420, 860],
      [375, 812],
      [320, 640],
    ]) {
      await navigate(`${baseUrl}${route}`, width, height, '.ih8-module');
      const layout = await evaluate(`(() => {
        const mod = ${root};
        const petals = [...mod.querySelectorAll('.ih8-petal')];
        const core = mod.querySelector('.ih8-core');
        const wheel = mod.querySelector('.ih8-wheel');
        const leftSide = mod.querySelector('.ih8-side--left');
        const rightSide = mod.querySelector('.ih8-side--right');
        return {
          overflow: document.documentElement.scrollWidth > innerWidth,
          petalSteps: petals.map(el => el.dataset.ih8Step),
          leftSteps: [...leftSide.querySelectorAll('.ih8-info')].map(el => el.dataset.ih8Step),
          rightSteps: [...rightSide.querySelectorAll('.ih8-info')].map(el => el.dataset.ih8Step),
          titles: [1, 2, 3, 4, 5, 6, 7, 8].map(s => mod.querySelector('.ih8-info[data-ih8-step="' + s + '"] .ih8-info__title')?.textContent.trim()),
          icons: petals.map(el => {
            const svg = el.querySelector('.ih8-petal__svg-icon');
            return { tag: svg?.tagName.toLowerCase(), name: svg?.dataset.ih8Icon, paths: svg?.querySelectorAll('path').length ?? 0 };
          }),
          stars: [...core.querySelectorAll('.ih8-core__star-icon')].length,
          coreStrong: core.querySelector('.ih8-core__copy strong')?.textContent.trim(),
          coreSub: core.querySelector('.ih8-core__copy > span:not(.ih8-core__stars)')?.textContent.trim(),
          coreZ: Number(getComputedStyle(core).zIndex),
          petalZ: Math.max(...petals.map(el => Number(getComputedStyle(el).zIndex))),
          masks: [
            ...petals.map(el => getComputedStyle(el.querySelector('.ih8-petal__fill')).maskImage || getComputedStyle(el.querySelector('.ih8-petal__fill')).webkitMaskImage),
            getComputedStyle(core.querySelector('.ih8-core__surface')).maskImage || getComputedStyle(core.querySelector('.ih8-core__surface')).webkitMaskImage,
          ],
          coreCopyMask: getComputedStyle(core.querySelector('.ih8-core__copy')).maskImage,
          wheelBox: wheel.getBoundingClientRect().toJSON(),
          leftBox: leftSide.getBoundingClientRect().toJSON(),
          rightBox: rightSide.getBoundingClientRect().toJSON(),
          petalBoxes: petals.map(el => el.getBoundingClientRect().toJSON()),
          strokeDisplays: petals.map(el => getComputedStyle(el.querySelector('.ih8-petal__stroke')).display),
          fillDeltas: petals.map(el => {
            const p = el.getBoundingClientRect();
            const f = el.querySelector('.ih8-petal__fill').getBoundingClientRect();
            return Math.max(Math.abs(p.width - f.width), Math.abs(p.height - f.height));
          }),
          extraHeadings: mod.querySelectorAll('h1, h2, header, nav').length,
        };
      })()`);

      assert.equal(layout.overflow, false, `${route} ${width}x${height} overflow`);
      assert.equal(layout.extraHeadings, 0);
      assert.deepEqual(layout.petalSteps, ['1', '2', '3', '4', '5', '6', '7', '8']);
      assert.deepEqual(layout.leftSteps, ['1', '3', '5', '7']);
      assert.deepEqual(layout.rightSteps, ['2', '4', '6', '8']);
      assert.deepEqual(layout.titles, expectedTitles);
      assert.deepEqual(layout.icons.map(i => i.name), expectedIcons);
      assert.ok(layout.icons.every(i => i.tag === 'svg' && i.paths > 0));
      assert.equal(layout.stars, 5);
      assert.equal(layout.coreStrong, '8 YẾU TỐ');
      assert.equal(layout.coreSub, 'TRỌNG TÂM');
      assert.ok(layout.coreZ > layout.petalZ);
      assert.ok(layout.masks.every(m => m?.includes('/assets/shapes/ih8-heart-elements/')));
      assert.ok(layout.strokeDisplays.every(d => d === 'none'), 'IH8 rescaled stroke masks are suppressed');
      assert.ok(layout.fillDeltas.every(d => d < 0.5), 'IH8 petal fills match petal bounds (inset: 0)');
      assert.ok(!layout.coreCopyMask || layout.coreCopyMask === 'none');
      for (const [a, b] of [[0, 1], [2, 3], [4, 5], [6, 7]]) {
        assert.ok(Math.abs(layout.petalBoxes[a].width - layout.petalBoxes[b].width) < 1.5, `row pair ${a + 1}-${b + 1} equal width`);
        assert.ok(Math.abs(layout.petalBoxes[a].top - layout.petalBoxes[b].top) < 1.5, `row pair ${a + 1}-${b + 1} equal top`);
      }
      assert.ok(layout.petalBoxes[2].right < layout.wheelBox.left + layout.wheelBox.width * 0.25, 'shoulder-left stays on left heart wall');
      assert.ok(layout.petalBoxes[3].left > layout.wheelBox.left + layout.wheelBox.width * 0.75, 'shoulder-right stays on right heart wall');

      if (width > 710) {
        assert.ok(layout.leftBox.right <= layout.wheelBox.left + 40, `desktop left column on ${width}px`);
        assert.ok(layout.rightBox.left >= layout.wheelBox.right - 40, `desktop right column on ${width}px`);
      } else {
        assert.ok(layout.wheelBox.bottom <= layout.leftBox.top + 32, `mobile heart above info columns on ${width}px`);
      }

      if (route === '/shapes/ih8-heart-elements' && (width === 1280 || width === 420)) {
        await screenshot(path.join(output, `ih8-colorful-${width}.png`));
      }
      console.log(`PASS IH8 layout ${route} ${width}x${height}`);
    }
  }

  await navigate(`${baseUrl}/shapes/ih8-heart-elements`, 1280, 900, '.ih8-module');
  await evaluate(`${root}.querySelector('.ih8-petal[data-ih8-step="3"]').click()`);
  await sleep(40);
  const pinned3 = await evaluate(`({
    pinned: ${root}.dataset.ih8Pinned,
    active: [...${root}.querySelectorAll('.is-active')].map(el => el.tagName.toLowerCase() + ':' + el.dataset.ih8Step),
    pressed: [...${root}.querySelectorAll('[data-ih8-step="3"]')].map(el => el.getAttribute('aria-pressed')),
    transform: getComputedStyle(${root}.querySelector('.ih8-petal[data-ih8-step="3"]')).transform,
  })`);
  assert.equal(pinned3.pinned, '3');
  assert.deepEqual(pinned3.active.sort(), ['button:3', 'div:3']);
  assert.deepEqual(pinned3.pressed, ['true', 'true']);
  assert.equal(pinned3.transform, 'none', 'active IH8 petal does not translate or scale away from adjacent heart segments');

  await evaluate(`${root}.querySelector('.ih8-petal[data-ih8-step="3"]').focus()`);
  await key('ArrowRight');
  assert.equal(await evaluate(`document.activeElement?.dataset?.ih8Step`), '4');
  assert.equal(await evaluate(`${root}.dataset.ih8Active`), '4');

  await key('Escape');
  assert.equal(await evaluate(`${root}.dataset.ih8Pinned`), '');

  await navigate(`${baseUrl}/shapes/ih8-heart-elements?theme=silver-red&instances=2`, 1280, 900, '.ih8-module');
  await screenshot(path.join(output, 'ih8-silver-red-1280.png'));
  await evaluate(`document.querySelectorAll('.ih8-module')[0].querySelector('.ih8-info[data-ih8-step="5"]').click()`);
  await sleep(40);
  assert.deepEqual(
    await evaluate(`[...document.querySelectorAll('.ih8-module')].map(el => el.dataset.ih8Pinned)`),
    ['5', ''],
  );

  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  assert.ok(
    await evaluate(
      `[...document.querySelectorAll('.ih8-petal,.ih8-info')].every(el => getComputedStyle(el).transitionDuration === '0s')`,
    ),
  );
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] });
  assert.deepEqual(browser.errors, []);
  console.log(`PASS all IH8 checks. Screenshots: ${output}`);
} finally {
  await browser.close();
}
