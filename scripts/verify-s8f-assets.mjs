import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assets = path.join(root, 'public/assets/shapes/s8f-starflow');
const names = [
  's8f-sector-01-crimson-mask.svg',
  's8f-sector-02-charcoal-mask.svg',
  's8f-sector-03-slate-mask.svg',
  's8f-sector-04-teal-mask.svg',
  's8f-sector-05-sand-mask.svg',
  's8f-star-core-mask.svg',
  's8f-source-vane-light-mask.svg',
  's8f-original-curved-vane.svg',
  's8f-original-fivepoint-star.svg',
];
for (const [index, name] of names.entries()) {
  const full = path.join(assets, name);
  assert.ok(fs.existsSync(full), `Missing asset ${name}`);
  const text = fs.readFileSync(full, 'utf8');
  assert.ok(text.includes('<svg'), `Invalid SVG ${name}`);
  assert.ok(/viewBox\s*=/.test(text), `Missing viewBox ${name}`);
  if (index < 7) assert.ok(/viewBox="0 0 600 600"/.test(text), `Unnormalized canvas in ${name}`);
  if (index < 5) assert.ok(text.includes('<path') && text.includes('fill="white"'), `Invalid petal mask ${name}`);
  if (index === 5) assert.ok(text.includes('<polygon'), 'Missing normalized star polygon');
}
const css = fs.readFileSync(path.join(root, 'src/components/shapes/s8f-starflow/s8f-starflow.css'), 'utf8');
const tsx = fs.readFileSync(path.join(root, 'src/components/shapes/s8f-starflow/S8fStarflow.tsx'), 'utf8');
assert.match(css, /s8f-wheel__surface[\s\S]*drop-shadow/);
assert.match(css, /mask: var\(--s8f-mask-url\)/);
assert.match(tsx, /react-icons\/fa6/);
assert.match(tsx, /S8F_SECTOR_PATHS/);
console.log('PASS S8F: 9 valid source/mask SVGs, 600x600 shared geometry, scoped CSS/React Icons');
