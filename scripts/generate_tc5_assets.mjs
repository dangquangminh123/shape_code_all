import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';

// Crop only the Illustrator artboard. All supplied path data stays unchanged.
// Bounds were measured with SVGGeometryElement.getBBox(), not guessed from pixels.
const root = new URL('../public/assets/shapes/tc5-trophy-cups/', import.meta.url);
const assets = [
  { source: 'tc5-source-01.svg', mask: 'tc5-first-cup-mask.svg', viewBox: '1114.2 215.5 1771.6 2016.5' },
  { source: 'tc5-source-02.svg', mask: 'tc5-next-cup-mask.svg', viewBox: '1534.5 198.1 1483.2 2103.8' },
];
for (const { source, mask, viewBox } of assets) {
  const original = await readFile(new URL(`originals/${source}`, root), 'utf8');
  const paths = [...original.matchAll(/<path\b[^>]*\bd="([^"]+)"[^>]*\/?\s*>/g)].map(match => match[1]);
  assert.equal(paths.length, 2, `Unexpected source paths: ${source}`);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" preserveAspectRatio="none">\n${paths.map(d => `  <path d="${d}"/>`).join('\n')}\n</svg>\n`;
  await writeFile(new URL(mask, root), svg.replace(/\r/g, ''));
  console.log(`Generated ${mask}; preserved ${paths.length} source paths`);
}
