import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assets = path.join(root, 'public/assets/shapes/d8p-diamond-petals');
const names = [
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

for (const [index, name] of names.entries()) {
  const full = path.join(assets, name);
  assert.ok(fs.existsSync(full), `Missing asset ${name}`);
  const text = fs.readFileSync(full, 'utf8');
  assert.ok(text.includes('<svg'), `Invalid SVG ${name}`);
  assert.ok(/viewBox\s*=/.test(text), `Missing viewBox ${name}`);
  assert.ok(!text.includes('<image'), `Embedded raster <image> forbidden in ${name}`);
  if (index < 9) {
    assert.ok(/viewBox="0 0 1000 1000"/.test(text), `Unnormalized canvas in ${name}`);
    assert.ok(text.includes('<path') && text.includes('fill="white"'), `Invalid mask path in ${name}`);
  }
}

const css = fs.readFileSync(path.join(root, 'src/components/shapes/d8p-diamond-petals/d8p-diamond-petals.css'), 'utf8');
const tsx = fs.readFileSync(path.join(root, 'src/components/shapes/d8p-diamond-petals/D8pDiamondPetals.tsx'), 'utf8');
assert.match(css, /d8p-petals-layer[\s\S]*drop-shadow/);
assert.match(css, /mask-image:\s*var\(--d8p-mask-url\)/);
assert.match(tsx, /react-icons\/fa6/);
assert.match(tsx, /D8P_PETAL_PATHS/);
console.log('PASS D8P: 11 valid source/mask SVGs, 1000x1000 shared geometry, scoped CSS/React Icons');
