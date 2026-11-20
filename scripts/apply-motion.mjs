#!/usr/bin/env node
/**
 * Add real, geometry-safe animations to RT6, SQ5 (SQERT) and OB3.
 * Target: shape_code_all Next.js repository, November 21 2026 snapshot.
 * Changes ONLY three recipes, scoped WAAPI helpers, and 2 small scoped CSS files.
 * Safe, idempotent, creates backups. Never stages, commits or pushes unless requested.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { spawnSync } from 'node:child_process';

const cwd = process.cwd();
const isDry = process.argv.includes('--check') || process.argv.includes('--dry-run');
const doCommit = process.argv.includes('--commit');
const doPush = process.argv.includes('--push');
if (doPush && !doCommit) throw Error('Pass --commit together with --push.');
if (!existsSync(join(cwd, 'src/app/layout.tsx')) || !existsSync(join(cwd, 'public/shape-auto-animations.js'))) {
  throw Error('Run this installer from the root of shape_code_all (where package.json and public/shape-auto-animations.js exist).');
}
const marker = 'THREE_SHAPES_MOTION_V2';
const paths = [
  'public/shape-auto-animations.js',
  'src/components/shapes/rt6-reverse-timeline/rt6-reverse-timeline.css',
  'src/components/shapes/ob3-option-banners/ob3-option-banners.css',
];

const RECIPES = {
  'rt6-reverse-timeline': `    recipe('rt6-reverse-timeline', '.rt6-module', 'Staircase light cascade + soft number stamps', [
      track('.rt6-step', 6, 'rt6-ribbon-light', 0, 150, 660),
      track('.rt6-step__badge', 6, 'rt6-badge-pop', 260, 150, 560),
      track('.rt6-step__content', 6, 'fade', 350, 150, 480),
      // Mobile has a separate card layout. Animate each complete card as one unit.
      track('.rt6-mobile-card', 6, 'rt6-mobile-card-enter', 0, 110, 640),
      track('.rt6-mobile-number', 6, 'rt6-badge-pop', 260, 110, 560),
    ], idle('.rt6-step__badge, .rt6-mobile-number', 12, 'halo-breathe', 4800)),`,
  'sq5-sqert-model': `    recipe('sq5-sqert-model', '.sq5-module', 'Five-petal clockwise illumination, central focus, legend sweep', [
      track('.sq5-petal', 5, 'sq5-petal-light', 0, 140, 690),
      track('.sq5-petal__letter', 5, 'fade', 250, 140, 400),
      track('.sq5-hub', 1, 'sq5-core-focus', 650, 0, 620),
      track('.sq5-item', 5, 'legend-cascade', 180, 100, 600),
    ], idle('.sq5-hub', 1, 'halo-breathe', 5600)),`,
  'ob3-option-banners': `    recipe('ob3-option-banners', '.ob3-module', 'Three rigid banners slide in, icons pop, text revealed', [
      track('.ob3-row', 3, 'ob3-banner-enter', 0, 280, 760),
      track('.ob3-icon-host svg', 3, 'ob3-icon-pop', 320, 280, 510),
      track('.ob3-mobile__icon-strip svg', 3, 'ob3-icon-pop', 320, 280, 510),
      track('.ob3-mid__content', 3, 'fade', 360, 280, 460),
      track('.ob3-right__label', 3, 'fade', 405, 280, 430),
      track('.ob3-right__copy', 3, 'fade', 455, 280, 440),
    ], idle('.ob3-icon-host svg, .ob3-mobile__icon-strip svg', 6, 'halo-breathe', 5200)),`,
};

const NEW_FRAMES = `      // ${marker} BEGIN: geometry-safe shape-specific effects.
      // Structural SVG pieces remain at their authored coordinates.
      case 'rt6-ribbon-light': return [
        { opacity: 0, filter: 'brightness(1.42)' },
        { opacity: 1, filter: 'brightness(1.12)', offset: .70 },
        { opacity: 1, filter: 'brightness(1)' },
      ];
      case 'rt6-badge-pop': return move('scale(.68)', 'scale(1.12)');
      // Mobile cards keep their contents attached while entering as a unit.
      case 'rt6-mobile-card-enter': return move('translateY(15px)', 'translateY(-2px)');
      case 'sq5-petal-light': return [
        { opacity: 0, filter: 'brightness(1.70) saturate(1.15)' },
        { opacity: 1, filter: 'brightness(1.18) saturate(1)', offset: .74 },
        { opacity: 1, filter: 'brightness(1) saturate(1)' },
      ];
      case 'sq5-core-focus': return [
        { opacity: 0, filter: 'brightness(1.55)' },
        { opacity: 1, filter: 'brightness(1.12)', offset: .72 },
        { opacity: 1, filter: 'brightness(1)' },
      ];
      // The entire OB3 button moves as ONE unit: no separated fold, face or text.
      case 'ob3-banner-enter': return move('translateX(-16px) scale(.99)', 'translateX(2px) scale(1.005)');
      // Only the decoration moves independently; never the two joined SVG masks.
      case 'ob3-icon-pop': return move('scale(.68)', 'scale(1.1)');
      // ${marker} END.
`;
const NEW_IDLE = `      // ${marker}: very gentle highlight, no permanent movement.
      case 'halo-breathe': return [
        { filter: 'brightness(1)', offset: 0 },
        { filter: 'brightness(1.16)', offset: .32 },
        { filter: 'brightness(1)', offset: .55 },
        { filter: 'brightness(1)', offset: 1 },
      ];
`;

function replaceRecipe(code, id, replacement) {
  const start = code.indexOf(`    recipe('${id}'`);
  if (start < 0) throw Error(`Recipe '${id}' missing. Patch not applied.`);
  const other = code.indexOf('\n    recipe(', start + 8);
  const endList = code.indexOf('\n  ];', start + 8);
  const end = [other, endList].filter(n => n >= 0).sort((a, b) => a - b)[0];
  if (end === undefined) throw Error(`Could not identify recipe boundary: ${id}`);
  const previous = code.slice(start, end).trim();
  if (!previous.includes(`recipe('${id}'`) || !previous.endsWith('),')) {
    throw Error(`Unexpected structure at recipe '${id}'. Stop rather than overwrite arbitrary source.`);
  }
  return code.slice(0, start) + replacement + code.slice(end);
}

function patchEngine(code) {
  if (!code.includes('function frames(') || !code.includes('function restFrames(') || !code.includes('function startIdle(')) {
    throw Error('WAAPI engine has changed unexpectedly; refusing to patch.');
  }
  for (const [name, replacement] of Object.entries(RECIPES)) code = replaceRecipe(code, name, replacement);
  code = code.replace('// THREE_SHAPES_FIX_V1: static geometry, atomic animation groups, no idle loops',
    '// THREE_SHAPES_MOTION_V2: structured motion without breaking SVG geometry');
  const framesStart = code.indexOf('function frames(');
  const restStart = code.indexOf('function restFrames(');
  const defaultFrame = '      default: return [{ opacity: 0 }, { opacity: 1 }];';
  if (code.includes(`// ${marker} BEGIN:`)) {
    // Patch is idempotent: recipes have been reconciled above.
  } else {
    const p = code.indexOf(defaultFrame, framesStart);
    if (p < 0 || p >= restStart) throw Error('Cannot find frames() default case.');
    code = code.slice(0, p) + NEW_FRAMES + code.slice(p);
  }
  if (!code.includes(`// ${marker}: very gentle highlight`)) {
    const endRest = code.indexOf('\n  }', code.indexOf('function restFrames('));
    const defaultInRest = code.lastIndexOf('      default:', endRest);
    if (defaultInRest < code.indexOf('function restFrames(')) throw Error('Missing restFrames default.');
    code = code.slice(0, defaultInRest) + NEW_IDLE + code.slice(defaultInRest);
  }
  // Include SVG-group filters in the existing WAAPI keyframe renderer.
  const oldKeys = "const keys = ['transform', 'opacity', 'clipPath'];";
  const newKeys = "const keys = ['transform', 'opacity', 'clipPath', 'filter'];";
  if (code.includes(oldKeys)) code = code.replace(oldKeys, newKeys);
  else if (!code.includes(newKeys)) throw Error('WAAPI property list changed unexpectedly.');

  // Make idle optional in the common engine, preventing unrelated recipes from
  // breaking all subsequent shapes when they omit idle.
  const oldValidate = 'return [...record.recipe.tracks, record.recipe.idle].map(spec => ({';
  const newValidate = 'return [...record.recipe.tracks, ...(record.recipe.idle ? [record.recipe.idle] : [])].map(spec => ({';
  if (code.includes(oldValidate)) code = code.replace(oldValidate, newValidate);
  else if (!code.includes(newValidate)) throw Error('WAAPI validation function changed unexpectedly.');
  const oldIdle = `    const spec = record.recipe.idle;
    // Exactly one small accent per shape, never all repeated surfaces.
    const node = targets(record, spec).find(element => element.getClientRects().length);
    if (node) animate(record, node, restFrames(spec.effect), {`;
  const newIdle = `    const spec = record.recipe.idle;
    // No idle track is valid: all other shape recipes continue to work.
    // Exactly one small accent per shape, never all repeated surfaces.
    const node = spec ? targets(record, spec).find(element => element.getClientRects().length) : null;
    if (node) animate(record, node, restFrames(spec.effect), {`;
  if (code.includes(oldIdle)) code = code.replace(oldIdle, newIdle);
  else if (!code.includes(newIdle)) throw Error('WAAPI startIdle() changed unexpectedly.');
  return code;
}

const RT6_CSS = `
/* ${marker} -- badge pop is centered on each existing SVG badge, not the canvas origin. */
.rt6-module .rt6-step__badge {
  transform-box: fill-box;
  transform-origin: center center;
}
.rt6-module .rt6-mobile-number { transform-origin: center center; }
`;
const OB3_CSS = `
/* ${marker} -- animate only icon contents and the entire assembled banner. */
.ob3-module .ob3-row { transform-origin: left center; }
.ob3-module .ob3-icon-host svg,
.ob3-module .ob3-mobile__icon-strip svg {
  transform-origin: center center;
  transform-box: fill-box;
}
`;

const changes = new Map();
for (const relPath of paths) {
  const file = join(cwd, relPath);
  if (!existsSync(file)) throw Error('Missing file: ' + relPath);
  const before = readFileSync(file, 'utf8');
  const after = relPath.endsWith('.js')
    ? patchEngine(before)
    : before + (before.includes(marker) ? '' : relPath.includes('rt6') ? RT6_CSS : OB3_CSS);
  changes.set(relPath, { file, before, after, changed: before !== after });
}
const touched = [...changes].filter(([p, data]) => data.changed).map(([p]) => p);
console.log('Preflight OK: ' + paths.length + ' permitted files; changes=' + touched.length);
touched.forEach(x => console.log('  ' + x));
if (isDry) { console.log('DRY RUN ONLY.'); process.exit(0); }

if (touched.length) {
  const stamp = new Date().toISOString().replace(/[.:]/g, '-');
  const backupDir = join(cwd, '.three-shape-motion-backup', stamp);
  for (const relPath of touched) {
    const data = changes.get(relPath);
    const backupFile = join(backupDir, relPath);
    mkdirSync(dirname(backupFile), { recursive: true });
    copyFileSync(data.file, backupFile);
    writeFileSync(data.file, data.after, 'utf8');
  }
  console.log('Original files backed up to ' + backupDir);
} else console.log('Already installed (idempotent).');

function git(args) {
  const r = spawnSync('git', args, { stdio:'inherit', cwd });
  if (r.status !== 0) throw Error('git ' + args.join(' ') + ' failed');
}
if (doCommit) {
  const diff=spawnSync('git',['diff','--quiet','HEAD','--',...paths],{cwd});
  if(diff.status===1){
    git(['add','--',...paths]);
    // --only keeps any pre-staged unrelated files out of this commit.
    git(['commit','--only','-m','feat(shapes): restore distinct SQERT RT6 OB3 animations','--',...paths]);
  } else if(diff.status===0)console.log('Target files already committed; nothing new to commit.');
  else throw Error('Git diff failed; refusing to commit');
}
if (doPush) {
  const r=spawnSync('git',['branch','--show-current'],{cwd,encoding:'utf8'});
  if(r.status!==0||!r.stdout.trim())throw Error('Cannot resolve current branch');
  git(['push','origin',`HEAD:${r.stdout.trim()}`]);
}
console.log('Complete. Next: node scripts/check-auto-motion.mjs against a running Next server.');
