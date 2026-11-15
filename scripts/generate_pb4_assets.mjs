import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';

// Crop Illustrator artboards only. Original path data is retained verbatim.
// Bounds measured with SVGGeometryElement.getBBox().
const root = new URL('../public/assets/shapes/pb4-pump-bottle/', import.meta.url);
const assets = [
  ['cap', '843.2 188.2 2313.5 2123.5'],
  ['body', '514.5 126.9 2971 2246.1'],
  ['band-01', '149.8 782.7 3700.3 934.2'],
  ['band-02', '174.5 961.9 3651.2 845.8'],
  ['band-03', '452.2 943.1 3095.6 710.1'],
  ['band-04', '308.7 821.7 3382.5 857'],
];
for (const [index, [name, viewBox]] of assets.entries()) {
  const original = await readFile(new URL(`originals/pb4-source-0${index + 1}.svg`, root), 'utf8');
  const paths = [...original.matchAll(/<path\b[^>]*\bd="([^"]+)"[^>]*\/?\s*>/g)].map(match => match[1]);
  assert.equal(paths.length, 1, `Unexpected source paths: ${name}`);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" preserveAspectRatio="none">\n  <path d="${paths[0]}"/>\n</svg>\n`;
  await writeFile(new URL(`pb4-${name}-mask.svg`, root), svg);
  console.log(`Generated pb4-${name}-mask.svg; original path preserved`);
}
