import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assets = path.join(root, 'public/assets/shapes/wh9-heart-ring');
const origDir = path.join(assets, 'source-original');
const compDir = path.join(root, 'src/components/shapes/wh9-heart-ring');

const geometry = JSON.parse(fs.readFileSync(path.join(compDir, 'wh9-heart-ring.geometry.json'), 'utf8'));
assert.equal(geometry.viewBox, '0 0 640 640');
assert.equal(geometry.radius, 280);
assert.equal(geometry.paths.length, 6);
assert.deepEqual(geometry.sources, [
  'wh9-source-sector-01.svg',
  'wh9-source-sector-02.svg',
  'wh9-source-sector-03.svg',
  'wh9-source-sector-04.svg',
  'wh9-source-sector-05.svg',
  'wh9-source-sector-06.svg',
]);
assert.equal(geometry.heart.source, 'wh9-source-heart-07.svg');

for (let i = 1; i <= 6; i += 1) {
  const name = `wh9-sector-mask-0${i}.svg`;
  const text = fs.readFileSync(path.join(assets, name), 'utf8');
  assert.ok(text.includes('viewBox="0 0 640 640"'), `Missing 640x640 viewBox in ${name}`);
  assert.ok(text.includes(geometry.paths[i - 1]), `Path mismatch in ${name}`);
}

const heartSvg = fs.readFileSync(path.join(assets, 'wh9-heart-core.svg'), 'utf8');
assert.ok(heartSvg.includes('viewBox="0 0 640 640"'));
assert.ok(heartSvg.includes(geometry.heart.path));
assert.ok(heartSvg.includes(geometry.heart.transform));

const originals = fs.readdirSync(origDir).filter((f) => f.endsWith('.svg'));
assert.equal(originals.length, 7, 'Must preserve all 7 Illustrator source SVGs');

const config = fs.readFileSync(path.join(compDir, 'wh9-heart-ring.config.ts'), 'utf8');
const tsx = fs.readFileSync(path.join(compDir, 'Wh9HeartRing.tsx'), 'utf8');
assert.match(config, /react-icons\/fa6/);
assert.match(config, /react-icons\/lu/);
assert.match(tsx, /react-icons\/lu/);
assert.doesNotMatch(tsx, /<img\b|<i\b|iStock|Hampl/i);
assert.doesNotMatch(config, /TITLE LINE|Lorem ipsum|NỀN TẢNG|GIÁ TRỊ CỐT LÕI/i);

console.log('PASS WH9: 7 normalized SVGs + 7 source SVGs + shared geometry JSON + React Icons verified');
