import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const root = path.resolve(import.meta.dirname, '..');
const masks = path.join(root, 'public/assets/shapes/sr6-startup-rocket');
const components = path.join(root, 'src/components/shapes/sr6-startup-rocket');
const names = [
  'sr6-nose-cone-mask.svg',
  'sr6-upper-shell-mask.svg',
  'sr6-mid-shell-mask.svg',
  'sr6-wing-assembly-mask.svg',
  'sr6-engine-skirt-mask.svg',
  'sr6-exhaust-flame-mask.svg',
];
const targetRatios = [1.5412, 2.275, 2.3542, 1.487, 1.883, 0.6934];
const css = fs.readFileSync(path.join(components, 'sr6-startup-rocket.css'), 'utf8');
const tsx = fs.readFileSync(path.join(components, 'Sr6StartupRocket.tsx'), 'utf8');

names.forEach((name, index) => {
  const xml = fs.readFileSync(path.join(masks, name), 'utf8');
  const match = xml.match(/viewBox="([^"]+)"/);
  assert.ok(match, `${name}: missing viewBox`);
  assert.ok(/<path\s+fill="#fff"\s+d="/.test(xml), `${name}: empty path / no white mask`);
  const [, , width, height] = match[1].split(/\s+/).map(Number);
  assert.ok(Math.abs(width / height - targetRatios[index]) < 0.005, `${name}: incorrect ratio`);
  assert.ok(css.includes(name), `${name}: CSS does not reference SVG`);
});
for (const icon of ['FaGears', 'FaEnvelope', 'FaChartColumn', 'FaGlobe', 'FaShareNodes', 'FaClock']) {
  assert.ok(tsx.includes(icon), `Missing React Icon ${icon}`);
}
assert.ok(css.includes('drop-shadow(0 9px 8px'), 'Unified rocket silhouette shadow is missing');
assert.ok(!/sr6-rocket__piece--0\d[^}]*inset:\s*-/.test(css), 'Negative inset creating false stroke detected');
console.log('PASS: 6 normalized SVG masks, ratios, CSS URLs, 6 React Icons, unified shadow.');
console.log('NOTE: This is a STATIC test, not a browser screenshot or runtime Next.js test.');
