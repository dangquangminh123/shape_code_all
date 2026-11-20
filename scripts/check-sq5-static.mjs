import assert from 'node:assert';
import {
  SQ5_HUB_GEOMETRY,
  SQ5_PETALS_GEOMETRY,
  SQ5_VIEWBOX,
} from '../src/components/shapes/sq5-sqert-model/sq5-sqert-model.geometry.ts';

console.log('--- Checking SQ5 Static & Geometric Assertions ---');

// 1. Petal count and distinct paths
assert.strictEqual(SQ5_PETALS_GEOMETRY.length, 5, 'Petal count must be exactly 5');
const uniquePaths = new Set(SQ5_PETALS_GEOMETRY.map((p) => p.d));
assert.strictEqual(uniquePaths.size, 5, 'All 5 petals must use distinct original SVG paths');
console.log('✓ Exactly 5 petals with 5 distinct original SVG paths');

// 2. Expected mapping from Table 3 in audit
const expected = [
  { id: 'scope', letter: 'S', sourceFile: '5.svg', x: 586, y: 122, w: 128, h: 203, letterX: 644, letterY: 176 },
  { id: 'quality', letter: 'Q', sourceFile: '1.svg', x: 672, y: 123, w: 185, h: 125, letterX: 801, letterY: 176 },
  { id: 'effort', letter: 'E', sourceFile: '2.svg', x: 743, y: 226, w: 159, h: 163, letterX: 846, letterY: 329 },
  { id: 'risk', letter: 'R', sourceFile: '3.svg', x: 659, y: 285, w: 131, h: 186, letterX: 725, letterY: 419 },
  { id: 'time', letter: 'T', sourceFile: '4.svg', x: 544, y: 260, w: 196, h: 125, letterX: 597, letterY: 324 },
];

const [vbX, vbY, vbW, vbH] = SQ5_VIEWBOX.split(' ').map(Number);
assert.strictEqual(vbX, 520);
assert.strictEqual(vbY, 118);
assert.strictEqual(vbW, 400);
assert.strictEqual(vbH, 368);
const maxX = vbX + vbW; // 920
const maxY = vbY + vbH; // 486

for (let i = 0; i < 5; i++) {
  const p = SQ5_PETALS_GEOMETRY[i];
  const exp = expected[i];

  assert.strictEqual(p.id, exp.id, `Petal ${i} id matches ${exp.id}`);
  assert.strictEqual(p.letter, exp.letter, `Petal ${i} letter matches ${exp.letter}`);
  assert.strictEqual(p.sourceFile, exp.sourceFile, `Petal ${i} sourceFile matches ${exp.sourceFile}`);
  assert.strictEqual(p.x, exp.x, `Petal ${p.letter} x matches ${exp.x}`);
  assert.strictEqual(p.y, exp.y, `Petal ${p.letter} y matches ${exp.y}`);
  assert.strictEqual(p.w, exp.w, `Petal ${p.letter} w matches ${exp.w}`);
  assert.strictEqual(p.h, exp.h, `Petal ${p.letter} h matches ${exp.h}`);
  assert.strictEqual(p.letterX, exp.letterX, `Petal ${p.letter} letterX matches ${exp.letterX}`);
  assert.strictEqual(p.letterY, exp.letterY, `Petal ${p.letter} letterY matches ${exp.letterY}`);

  // Scale validity
  assert(!Number.isNaN(p.scaleX) && p.scaleX > 0, `scaleX is positive number for ${p.letter}`);
  assert(!Number.isNaN(p.scaleY) && p.scaleY > 0, `scaleY is positive number for ${p.letter}`);

  // ViewBox bounds
  assert(p.x >= vbX && p.x + p.w <= maxX, `Petal ${p.letter} bounding box inside ViewBox X`);
  assert(p.y >= vbY && p.y + p.h <= maxY, `Petal ${p.letter} bounding box inside ViewBox Y`);
  assert(p.letterX >= vbX && p.letterX <= maxX, `Letter ${p.letter} inside ViewBox X`);
  assert(p.letterY >= vbY && p.letterY <= maxY, `Letter ${p.letter} inside ViewBox Y`);
  console.log(`✓ Petal ${p.letter} (${p.sourceFile}) bbox and letter coordinates verified`);
}

// 3. Hub geometry
assert.strictEqual(SQ5_HUB_GEOMETRY.cx, 722.5, 'Hub cx === 722.5');
assert.strictEqual(SQ5_HUB_GEOMETRY.cy, 287, 'Hub cy === 287');
assert.strictEqual(SQ5_HUB_GEOMETRY.r, 47.5, 'Hub r === 47.5');
assert.strictEqual(SQ5_HUB_GEOMETRY.text, 'SQERT', 'Hub text === SQERT');
assert(SQ5_HUB_GEOMETRY.cx - SQ5_HUB_GEOMETRY.r >= vbX && SQ5_HUB_GEOMETRY.cx + SQ5_HUB_GEOMETRY.r <= maxX);
assert(SQ5_HUB_GEOMETRY.cy - SQ5_HUB_GEOMETRY.r >= vbY && SQ5_HUB_GEOMETRY.cy + SQ5_HUB_GEOMETRY.r <= maxY);
console.log('✓ Hub center (722.5, 287) with radius 47.5 verified inside ViewBox');

console.log('--- ALL SQ5 STATIC ASSERTIONS PASSED PERFECTLY ---');
