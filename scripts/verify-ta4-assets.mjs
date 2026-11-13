import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assets = path.join(root, 'public/assets/shapes/ta4-target-arrow');
const names = [
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

for (const [index, name] of names.entries()) {
  const full = path.join(assets, name);
  assert.ok(fs.existsSync(full), `Missing asset ${name}`);
  const text = fs.readFileSync(full, 'utf8');
  assert.ok(text.includes('<svg'), `Invalid SVG ${name}`);
  assert.ok(/viewBox\s*=/.test(text), `Missing viewBox ${name}`);
  assert.ok(!text.includes('<image'), `Embedded broken <image> tag found in ${name}`);
  if (index < 6) {
    assert.ok(/viewBox="0 0 600 600"/.test(text), `Unnormalized canvas in ${name}`);
    assert.ok(text.includes('<path') && text.includes('fill="white"'), `Invalid mask path in ${name}`);
  }
}

const css = fs.readFileSync(path.join(root, 'src/components/shapes/ta4-target-arrow/ta4-target-arrow.css'), 'utf8');
const tsx = fs.readFileSync(path.join(root, 'src/components/shapes/ta4-target-arrow/Ta4TargetArrow.tsx'), 'utf8');
assert.match(css, /ta4-banners-layer[\s\S]*drop-shadow/);
assert.match(css, /mask-image:\s*var\(--ta4-mask-url\)/);
assert.match(tsx, /react-icons\/fa6/);
assert.match(tsx, /TA4_BANNERS_GEOMETRY/);
console.log('PASS TA4: 9 valid cleaned source/mask SVGs, 600x600 shared geometry, scoped CSS/React Icons');
