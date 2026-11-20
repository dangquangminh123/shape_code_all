#!/usr/bin/env node
/** Run from the actual repo root after applying the fix. */
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';

const root = process.cwd();
const get = path => readFileSync(resolve(root, path), 'utf8');
const f = {
  rt6: get('src/components/shapes/rt6-reverse-timeline/Rt6ReverseTimeline.tsx'),
  rt6config: get('src/components/shapes/rt6-reverse-timeline/rt6-reverse-timeline.config.ts'),
  rt6css: get('src/components/shapes/rt6-reverse-timeline/rt6-reverse-timeline.css'),
  sq5: get('src/components/shapes/sq5-sqert-model/Sq5SqertModel.tsx'),
  sq5geo: get('src/components/shapes/sq5-sqert-model/sq5-sqert-model.geometry.ts'),
  sq5css: get('src/components/shapes/sq5-sqert-model/sq5-sqert-model.css'),
  ob3: get('src/components/shapes/ob3-option-banners/Ob3OptionBanners.tsx'),
  ob3geo: get('src/components/shapes/ob3-option-banners/ob3-option-banners.geometry.ts'),
  ob3css: get('src/components/shapes/ob3-option-banners/ob3-option-banners.css'),
  animation: get('public/shape-auto-animations.js'),
};
const tests = [
  ['RT6 original paths', () => assert(f.rt6.includes('M42.6,81c-6.33') && f.rt6.includes('M8.27,70.78V10.81'))],
  ['RT6 6 descending steps', () => assert.equal((f.rt6config.match(/number: '0[1-6]'/g) || []).length, 6)],
  ['RT6 responsive no horizontal scroller', () => assert(f.rt6.includes('rt6-mobile-list') && f.rt6css.includes('grid-template-columns: minmax(0, 1fr)'))],
  ['SQERT separate SVG paths', () => assert(f.sq5.includes('SQ5_PETALS_GEOMETRY.map') && f.sq5geo.includes("sourceFile: '5.svg'"))],
  ['SQERT 5 unique source paths', () => assert.equal(new Set([...f.sq5geo.matchAll(/sourceFile: '(\d).svg'/g)].map(x => x[1])).size, 5)],
  ['SQERT label size restored', () => assert(f.sq5css.includes('750 56px'))],
  ['SQERT keyboard navigation', () => assert(f.sq5.includes("keyNav(event, index, 'petal')") && f.sq5.includes('aria-pressed'))],
  ['OB3 original SVG paths', () => assert(f.ob3geo.includes('OB3_MIDDLE_BAND_PATH') && f.ob3geo.includes('OB3_LOOP_FRONT_PATH'))],
  ['OB3 fold and face unified transform', () => assert(f.ob3.includes('transform={OB3_RIGHT_TRANSFORM}') && f.ob3.includes('OB3_FOLD_POLYGON_POINTS') && f.ob3.includes('OB3_RIGHT_RECT'))],
  ['OB3 no descriptive foreignObject', () => assert(f.ob3.includes('descriptionLines.map') && f.ob3.includes('wrapWords'))],
  ['OB3 readable mobile mode', () => assert(f.ob3css.includes('@media (max-width: 720px)') && f.ob3.includes('ob3-mobile-view'))],
  ['All three animation recipes installed', () => {
    for (const id of ['rt6-reverse-timeline', 'sq5-sqert-model', 'ob3-option-banners'])
      assert.equal(f.animation.split(`recipe('${id}'`).length - 1, 1);
  }],
  ['No artwork deformation in three recipes', () => {
    const start = f.animation.indexOf("recipe('rt6-reverse-timeline'");
    const end = f.animation.indexOf('  ];', start);
    const part = f.animation.slice(start, end);
    assert(part.includes("track('.sq5-svg', 1, 'fade'"));
    assert(part.includes("track('.rt6-svg', 1, 'fade'"));
    assert(!part.includes('vortex-spin-in') && !part.includes('accordion-fold'));
  }],
];
let failed = 0;
for (const [name, fn] of tests) {
  try { fn(); console.log('PASS', name); }
  catch (error) { failed++; console.error('FAIL', name, error.message); }
}
console.log(`${tests.length - failed}/${tests.length} structural checks passed.`);
if (failed) process.exit(1);
