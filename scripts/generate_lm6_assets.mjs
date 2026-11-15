import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';

// The supplied arrow already contains its four bevel surfaces. Split only;
// never redraw, simplify or round its path / polygon coordinates.
const root = new URL('../public/assets/shapes/lm6-levels-marks/', import.meta.url);
const sources = await Promise.all([1, 2].map(i => readFile(new URL(`originals/lm6-source-0${i}.svg`, root))));
const elements = svg => [...svg.toString().matchAll(/<(?:path|polygon)\b[^>]*\/>/g)].map(m => m[0]);
const arrow = elements(sources[0]);
const reflection = elements(sources[1]);
assert.equal(arrow.length, 5);
assert.match(arrow[4], /d="M0,81"/); // Empty Illustrator move: retained in archive, not visible.
assert.equal(reflection.length, 1);
const parts = [
  ...['front', 'top', 'side', 'edge'].map((name, index) => ({ name, viewBox: '0 0 95.53 80.6', element: arrow[index] })),
  { name: 'reflection', viewBox: '0 0 280.01 81', element: reflection[0] },
];
for (const { name, viewBox, element } of parts) {
  await writeFile(new URL(`lm6-${name}-mask.svg`, root), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" preserveAspectRatio="none">\n${element}\n</svg>\n`);
  console.log(`Generated lm6-${name}-mask.svg; original geometry preserved`);
}
const hash = data => createHash('sha256').update(data).digest('hex');
const manifest = {
  reference: { file: 'lm6-reference.jpg', width: 960, height: 720, sha256: hash(await readFile(new URL('lm6-reference.jpg', root))) },
  originals: sources.map((data, index) => ({ file: `originals/lm6-source-0${index + 1}.svg`, bytes: data.length, sha256: hash(data) })),
  masks: parts.map(({ name, viewBox }) => ({ file: `lm6-${name}-mask.svg`, viewBox })),
};
await writeFile(new URL('manifest.json', root), `${JSON.stringify(manifest, null, 2)}\n`);
