import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';

// Rebuild only from the archived uploads; no external tools or npm packages.
// Keep the original Illustrator path coordinates verbatim. Crop the unused
// artboard, then rotate/crop the banner's straight section rather than squash
// its semicircular end to fit the reference's 99:216 width/height ratio.
const root = new URL('../public/assets/shapes/hb4-hanger-banners/', import.meta.url);
const hash = data => createHash('sha256').update(data).digest('hex');
const format = value => Number(value.toFixed(6)).toString();
const viewBox = values => values.map(format).join(' ');
const originals = [
  {
    file: 'originals/hb4-source-banner.svg',
    uploadedName: 'shape 1.svg',
    expectedSha256: '2eac28b0c9e00bc7c46adad90674098bbdcc71d917c6bff0632ea4e49edfe5fd',
  },
  {
    file: 'originals/hb4-source-hanger.svg',
    uploadedName: 'shape 2.svg',
    expectedSha256: 'f714261627bf3cf4beef003764b4373ace122d4314fa211e8d5b35098fb4b2a4',
  },
];
const sources = await Promise.all(originals.map(async source => {
  const data = await readFile(new URL(source.file, root));
  assert.equal(hash(data), source.expectedSha256, `${source.file}: original upload changed; remeasure geometry before regenerating`);
  return data;
}));
const paths = data => [...data.toString().matchAll(/<path\b[^>]*\bd="([^"]+)"[^>]*\/?\s*>/g)].map(match => match[1]);
const bannerPaths = paths(sources[0]);
const hangerPaths = paths(sources[1]);
assert.equal(bannerPaths.length, 2, 'Expected the off-artboard hanger and the visible horizontal banner');
assert.equal(hangerPaths.length, 1, 'Expected one hanger silhouette');
assert.match(bannerPaths[0], /^M3135\.3-3467\.9/);
assert.match(bannerPaths[1], /^M3626,1783\.1H888\.8/);

const circleElement = sources[0].toString().match(/<circle\b[^>]*\/>/g);
assert.equal(circleElement?.length, 1, 'Expected the original medallion circle');
const circle = Object.fromEntries(['cx', 'cy', 'r'].map(name => {
  const value = circleElement[0].match(new RegExp(`\\b${name}="([^"]+)"`));
  assert.ok(value, `Missing circle ${name}`);
  return [name, Number(value[1])];
}));
assert.deepEqual(circle, { cx: 943.7, cy: 1250, r: 488.3 });

// Exact visible path bounds. The archived banner also includes a hanger at
// negative y (-4861.3 to -3467.5), outside its original 4000 x 2500 artboard.
const hangerBounds = { x: 190.7, y: 176.8, width: 3618.591884215975, height: 1937.9 };
const bannerBounds = { x: 355.7, y: 716.9, width: 3288.7, height: 1066.2 };
const padding = 0.75;
const bannerWidth = bannerBounds.height;
const bannerHeight = bannerWidth * 216 / 99;
const cropRight = bannerBounds.x + bannerHeight;
const rotation = `matrix(0 -1 1 0 ${format(-bannerBounds.y)} ${format(cropRight)})`;
const parts = [
  {
    name: 'hanger',
    file: 'hb4-hanger-mask.svg',
    source: originals[1].file,
    sourceElement: 'path[0]',
    sourceBounds: hangerBounds,
    viewBox: viewBox([hangerBounds.x - padding, hangerBounds.y - padding, hangerBounds.width + padding * 2, hangerBounds.height + padding * 2]),
    element: `  <path d="${hangerPaths[0]}"/>`,
    geometry: { padding, operation: 'Crop the empty artboard; preserve the original hanger path.' },
  },
  {
    name: 'banner',
    file: 'hb4-banner-mask.svg',
    source: originals[0].file,
    sourceElement: 'path[1]',
    sourceBounds: bannerBounds,
    viewBox: viewBox([0, 0, bannerWidth, bannerHeight]),
    element: `  <g transform="${rotation}">\n    <path d="${bannerPaths[1]}"/>\n  </g>`,
    geometry: {
      transform: rotation,
      sourceCrop: { x: bannerBounds.x, y: bannerBounds.y, width: bannerHeight, height: bannerWidth },
      targetAspect: { width: 99, height: 216 },
      operation: 'Rotate -90 degrees. Crop excess rectangular length at the top; keep the lower semicircle unscaled. Exclude the off-artboard hanger and medallion circle.',
    },
  },
  {
    name: 'medallion',
    file: 'hb4-medallion-mask.svg',
    source: originals[0].file,
    sourceElement: 'circle[0]',
    sourceBounds: { x: circle.cx - circle.r, y: circle.cy - circle.r, width: circle.r * 2, height: circle.r * 2 },
    viewBox: viewBox([circle.cx - circle.r, circle.cy - circle.r, circle.r * 2, circle.r * 2]),
    element: `  <circle cx="${circle.cx}" cy="${circle.cy}" r="${circle.r}"/>`,
    geometry: { targetSize: { width: 85, height: 85 }, operation: 'Crop the original circle tightly and display separately, so its position and diameter match the reference. Color is supplied by CSS alpha masking.' },
  },
];

const masks = [];
for (const { name, element, ...part } of parts) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${part.viewBox}" preserveAspectRatio="none">\n${element}\n</svg>\n`;
  await writeFile(new URL(part.file, root), svg);
  masks.push({ ...part, bytes: Buffer.byteLength(svg), sha256: hash(svg) });
  console.log(`Generated ${part.file}; original ${name} geometry preserved`);
}

const reference = await readFile(new URL('hb4-reference.png', root));
assert.equal(reference.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', 'Expected the uploaded PNG reference');
const manifest = {
  generator: 'scripts/generate_hb4_assets.mjs',
  reference: { file: 'hb4-reference.png', width: reference.readUInt32BE(16), height: reference.readUInt32BE(20), bytes: reference.length, sha256: hash(reference) },
  originals: originals.map(({ file, uploadedName }, index) => ({ file, uploadedName, bytes: sources[index].length, sha256: hash(sources[index]) })),
  masks,
  composition: {
    referenceCanvas: { width: 735, height: 413 },
    darkStageHeight: 380,
    hangerSize: { width: 151, height: 81 },
    bannerSize: { width: 99, height: 216 },
    bannerTopFromHanger: 70,
    medallionDiameter: 85,
    medallionBottomInset: 7,
    columnPitch: 153,
    alternatingVerticalOffset: 36,
    note: 'Columns 1 and 3 sit lower than columns 2 and 4. The banner overlaps the hanger base. Keep the hook and banner inside the same animated wrapper.',
  },
};
await writeFile(new URL('manifest.json', root), `${JSON.stringify(manifest, null, 2)}\n`);
