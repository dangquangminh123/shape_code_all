import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';

// Rebuild from the two archived Illustrator uploads with Node built-ins only.
// Every curved silhouette below uses its original path/ellipse coordinates.
// Three affine slices lengthen only the straight middle: stretching the whole
// 3488.5 x 1320.2 cylinder to 280 x 54 would make both end caps much too wide.
const root = new URL('../public/assets/shapes/cs5-cylinder-steps/', import.meta.url);
const hash = data => createHash('sha256').update(data).digest('hex');
const format = value => Number(value.toFixed(9)).toString();
const originals = [
  {
    file: 'originals/cs5-source-cylinder.svg', uploadedName: 'shape 1(1).svg',
    expectedSha256: '448a11a6af9f6f725e443a78e01f795f2cd14cd2599e30fb9b40771a09b77624',
  },
  {
    file: 'originals/cs5-source-callout.svg', uploadedName: 'shape 2(1).svg',
    expectedSha256: 'ce01af6aa807244f22144ee8be2e2350ae3c6c43a868407d9a7ba7a3be499713',
  },
];
const sources = await Promise.all(originals.map(async original => {
  const data = await readFile(new URL(original.file, root));
  assert.equal(hash(data), original.expectedSha256, `${original.file}: source changed; remeasure before regenerating`);
  return data;
}));
const paths = source => [...source.toString().matchAll(/<path\b[^>]*\bd="([^"]+)"[^>]*\/?\s*>/g)].map(match => match[1]);
const elements = (source, tag) => [...source.toString().matchAll(new RegExp(`<${tag}\\b[^>]*\\/>`, 'g'))].map(match => match[0]);
const attrs = (element, names) => Object.fromEntries(names.map(name => {
  const value = element.match(new RegExp(`\\b${name}="([^"]+)"`));
  assert.ok(value, `Missing ${name} in source element`);
  return [name, Number(value[1])];
}));
const cylinderPaths = paths(sources[0]);
const calloutPaths = paths(sources[1]);
assert.equal(cylinderPaths.length, 5);
assert.equal(calloutPaths.length, 5);
assert.match(cylinderPaths[2], /^M3459\.4,1899\.6/);
assert.match(calloutPaths[3], /^M3079\.8,1944\.5/);
const cap = attrs(elements(sources[0], 'ellipse')[1], ['cx', 'cy', 'rx', 'ry']);
const dot = attrs(elements(sources[1], 'ellipse')[2], ['cx', 'cy', 'rx', 'ry']);
const line = attrs(elements(sources[1], 'rect')[0], ['x', 'y', 'width', 'height']);
assert.deepEqual(cap, { cx: 3395.8, cy: 1250, rx: 312.9, ry: 660.1 });
assert.deepEqual(dot, { cx: 3585.3, cy: 1319.5, rx: 67.5, ry: 104.1 });
assert.deepEqual(line, { x: 2832.3, y: 1291.9, width: 741.6, height: 55.1 });

const matrix = (sx, sy, tx, ty) => `matrix(${format(sx)} 0 0 ${format(sy)} ${format(tx)} ${format(ty)})`;
const ellipse = (id, shape) => `<ellipse id="${id}" ${Object.entries(shape).map(([name, value]) => `${name}="${value}"`).join(' ')}/>`;

// Extend each curved end two pixels INTO the straight center, never the other
// way round. This keeps more than one device pixel of overlap at mobile size
// without flattening the end curves. Original d attributes stay verbatim.
function slicedPath({ id, d, sourceX, targetX, sourceY, targetY, height, style = '' }) {
  const sy = (targetY[1] - targetY[0]) / (sourceY[1] - sourceY[0]);
  const ty = targetY[0] - sourceY[0] * sy;
  const source = `<path id="${id}-source" d="${d}"${style ? ` ${style}` : ''}/>`;
  const slices = sourceX.slice(0, -1).map((x, index) => {
    const sx = (targetX[index + 1] - targetX[index]) / (sourceX[index + 1] - x);
    const transform = matrix(sx, sy, targetX[index] - x * sx, ty);
    const clipLeft = targetX[index] - (index === 0 ? 1 : index === 2 ? 2 : 0);
    const clipRight = targetX[index + 1] + (index === 0 ? 2 : index === 2 ? 1 : 0);
    return {
      sourceX: [x, sourceX[index + 1]], targetX: [targetX[index], targetX[index + 1]], transform,
      clip: `<clipPath id="${id}-clip-${index}" clipPathUnits="userSpaceOnUse"><rect x="${format(clipLeft)}" y="-1" width="${format(clipRight - clipLeft)}" height="${height + 2}"/></clipPath>`,
      use: `<g clip-path="url(#${id}-clip-${index})"><use href="#${id}-source" transform="${transform}"/></g>`,
    };
  });
  return {
    defs: [source, ...slices.map(slice => slice.clip)].join('\n'),
    body: slices.map(slice => slice.use).join('\n'),
    geometry: { sourceX, targetX, sourceY, targetY, clipOverlap: { pixels: 2, direction: 'Extend end slices into the straight center only' }, slices: slices.map(({ sourceX, targetX, transform }) => ({ sourceX, targetX, transform })) },
  };
}

const cylinder = slicedPath({
  id: 'cs5-cylinder', d: cylinderPaths[2],
  sourceX: [220.2, 878.6, 3082.9, 3708.7], targetX: [0, 18, 268, 280],
  sourceY: [589.9, 1910.1], targetY: [0, 54], height: 54,
});
const capTransform = cylinder.geometry.slices[2].transform;
const capDefinition = ellipse('cs5-cylinder-cap-source', cap);
const capUse = `<use href="#cs5-cylinder-cap-source" transform="${capTransform}"/>`;
// The supplied concave face and front ellipse touch at an antialiased edge.
// Underpaint that INTERNAL join so two half-alpha edges cannot expose a white
// hairline. This rectangle is wholly inside the existing combined silhouette
// and beneath the cap; neither outer contour nor target geometry is changed.
const capJoinBacking = { x: 267, y: 0.5, width: 7, height: 53 };
const capJoin = `<rect ${Object.entries(capJoinBacking).map(([name, value]) => `${name}="${value}"`).join(' ')}/>`;

// The outline is a real transparent stroke of the uploaded callout path.
// Inset by .75 px so its stroke remains inside the 207 x 66 image viewport.
// The circular left end has r=32.25 and the concave midpoint is x=192.
const calloutYScale = 64.5 / 1250;
const callout = slicedPath({
  id: 'cs5-callout', d: calloutPaths[3],
  sourceX: [116.6, 741.6, 2834.2, 3191.6], targetX: [0.75, 33, 192, 206.25],
  sourceY: [694.5, 1944.5], targetY: [0.75, 65.25], height: 66,
  style: `fill="none" stroke="#000" stroke-width="${format(1.35 / calloutYScale)}" stroke-linejoin="round"`,
});

// A short copy of the existing cylinder face becomes the translucent sleeve.
// Its six-pixel end curves leave a broad, quiet area for the step number.
const sleeve = slicedPath({
  id: 'cs5-sleeve', d: cylinderPaths[2],
  sourceX: [220.2, 878.6, 3082.9, 3459.5], targetX: [0, 6, 95, 101],
  sourceY: [593.3, 1910.1], targetY: [0, 54], height: 54,
});
const sleeveShape = `<g id="cs5-sleeve-shape">\n${sleeve.body}\n</g>`;
const rimInset = 1.3;
const rimInnerTransform = matrix((101 - rimInset * 2) / 101, (54 - rimInset * 2) / 54, rimInset, rimInset);
const sleeveRim = `<mask id="cs5-sleeve-rim" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse" x="0" y="0" width="101" height="54" style="mask-type:luminance">\n<use href="#cs5-sleeve-shape" fill="#fff"/>\n<use href="#cs5-sleeve-shape" transform="${rimInnerTransform}" fill="#000"/>\n</mask>`;

const lineTransform = matrix(36 / line.width, 1.4 / line.height, -line.x * 36 / line.width, -line.y * 1.4 / line.height);
const dotMatrix = radius => matrix(radius / dot.rx, radius / dot.ry, 3.5 - dot.cx * radius / dot.rx, 3.5 - dot.cy * radius / dot.ry);
const dotDefinition = ellipse('cs5-connector-dot-source', dot);
const dotRing = `<mask id="cs5-connector-dot-ring" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse" x="0" y="0" width="7" height="7" style="mask-type:luminance">\n<use href="#cs5-connector-dot-source" transform="${dotMatrix(3.4)}" fill="#fff"/>\n<use href="#cs5-connector-dot-source" transform="${dotMatrix(2.1)}" fill="#000"/>\n</mask>`;

const parts = [
  {
    file: 'cs5-cylinder-body-mask.svg', width: 280, height: 54,
    defs: cylinder.defs, body: `${cylinder.body}\n${capJoin}`,
    source: originals[0].file, sourceElements: ['path[2]'],
    geometry: { ...cylinder.geometry, capJoinBacking, note: 'Left convex tip 18px; central run 250px; right end region 12px. Shared canvas with cap. An internal backing rectangle prevents a transparent body/cap join; it stays below the cap and inside the original combined silhouette.' },
  },
  {
    file: 'cs5-cylinder-cap-mask.svg', width: 280, height: 54,
    defs: capDefinition, body: capUse,
    source: originals[0].file, sourceElements: ['ellipse[1]'],
    geometry: { original: cap, transform: capTransform, targetBounds: { x: 268, y: 0, width: 12, height: 54 } },
  },
  {
    file: 'cs5-cylinder-full-mask.svg', width: 280, height: 54,
    defs: `${cylinder.defs}\n${capDefinition}`, body: `${cylinder.body}\n${capJoin}\n${capUse}`,
    source: originals[0].file, sourceElements: ['path[2]', 'ellipse[1]'],
    geometry: { ...cylinder.geometry, capJoinBacking, note: 'Combined silhouette for clipping highlights. Body/cap layers use the same viewBox; an internal backing rectangle removes alpha seams without changing the outer contour.' },
  },
  {
    file: 'cs5-callout-outline-mask.svg', width: 207, height: 66,
    defs: callout.defs, body: callout.body,
    source: originals[1].file, sourceElements: ['path[3]'],
    geometry: { ...callout.geometry, outlineWidth: 1.35, note: 'Transparent stroke only; no white fill. The center of the concave edge is x=192, y=33.' },
  },
  {
    file: 'cs5-connector-line-mask.svg', width: 36, height: 1.4,
    defs: '', body: `<rect ${Object.entries(line).map(([name, value]) => `${name}="${value}"`).join(' ')} transform="${lineTransform}"/>`,
    source: originals[1].file, sourceElements: ['rect[0]'],
    geometry: { original: line, transform: lineTransform, note: 'Solid connector; preserve the uploaded rectangle coordinates. Render at 32.5px width so it stops at the left edge of the transparent dot centered 36px from the connector origin.' },
  },
  {
    file: 'cs5-connector-dot-mask.svg', width: 7, height: 7,
    defs: `${dotDefinition}\n${dotRing}`, body: '<rect width="7" height="7" mask="url(#cs5-connector-dot-ring)"/>',
    source: originals[1].file, sourceElements: ['ellipse[2]'],
    geometry: { original: dot, center: [3.5, 3.5], outerRadius: 3.4, innerRadius: 2.1, note: 'Two affine copies of the uploaded ellipse form a transparent circular ring; background is visible through its center.' },
  },
  {
    file: 'cs5-sleeve-mask.svg', width: 101, height: 54,
    defs: sleeve.defs, body: sleeve.body,
    source: originals[0].file, sourceElements: ['path[2]'],
    geometry: { ...sleeve.geometry, note: 'Reuse the concave cylinder face at sleeve width; apply translucent fill with CSS.' },
  },
  {
    file: 'cs5-sleeve-rim-mask.svg', width: 101, height: 54,
    defs: `${sleeve.defs}\n${sleeveShape}\n${sleeveRim}`, body: '<use href="#cs5-sleeve-shape" mask="url(#cs5-sleeve-rim)"/>',
    source: originals[0].file, sourceElements: ['path[2]'],
    geometry: { ...sleeve.geometry, rimInset, innerTransform: rimInnerTransform, note: 'Outer sleeve minus an inset affine copy; all curves still come from the original path.' },
  },
];

const masks = [];
for (const { defs, body, width, height, ...part } of parts) {
  const viewBox = `0 0 ${width} ${height}`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" preserveAspectRatio="none">\n${defs ? `<defs>\n${defs}\n</defs>\n` : ''}${body}\n</svg>\n`;
  await writeFile(new URL(part.file, root), svg);
  masks.push({ ...part, viewBox, bytes: Buffer.byteLength(svg), sha256: hash(svg) });
  console.log(`Generated ${part.file}; source geometry preserved with affine slices`);
}

const reference = await readFile(new URL('cs5-reference.png', root));
assert.equal(reference.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
const manifest = {
  generator: 'scripts/generate_cs5_assets.mjs',
  reference: { file: 'cs5-reference.png', uploadedName: '28.png', width: reference.readUInt32BE(16), height: reference.readUInt32BE(20), bytes: reference.length, sha256: hash(reference) },
  originals: originals.map(({ file, uploadedName }, index) => ({ file, uploadedName, bytes: sources[index].length, sha256: hash(sources[index]) })),
  sourceGeometry: {
    artboard: '0 0 4000 2500',
    cylinderBody: { source: originals[0].file, element: 'path[2]', bounds: { x: 220.2, y: 593.3, width: 3239.3, height: 1316.8 } },
    cylinderCap: { source: originals[0].file, element: 'ellipse[1]', ...cap },
    callout: { source: originals[1].file, element: 'path[3]', bounds: { x: 116.6, y: 694.5, width: 3075, height: 1250 } },
    connectorLine: { source: originals[1].file, element: 'rect[0]', ...line },
    connectorDot: { source: originals[1].file, element: 'ellipse[2]', ...dot },
    excluded: 'Degenerate polygons and off-artboard construction paths remain intact in originals. The visible cylinder face also supplies the sleeve; no tracing or replacement curved paths are introduced.',
  },
  masks,
  composition: {
    artboard: { width: 602, height: 612, background: 'transparent' },
    rowTops: [127, 218, 309, 400, 491],
    callout: { left: 41, width: 207, height: 66 },
    cylinder: { left: 280, topWithinRow: 7, width: 280, height: 54 },
    connector: { left: 233, centerYWithinRow: 33, lineMaskWidth: 36, renderedLineWidth: 32.5, dotCenterX: 269, dotDiameter: 7 },
    sleeve: { leftByRow: [307, 330, 362, 389, 417], width: 101, height: 54 },
    content: { iconCenterX: 71, textLeft: 107, textWidth: 112 },
    note: 'The reference PNG is source evidence only. Do not render its background, watermarks, or branding as module UI.',
  },
};
await writeFile(new URL('manifest.json', root), `${JSON.stringify(manifest, null, 2)}\n`);
