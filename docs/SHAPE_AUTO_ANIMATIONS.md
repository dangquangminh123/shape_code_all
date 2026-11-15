# SHAPE AUTO MOTION v1.0.0

An **installable patch**, not a gallery redesign or a list of animation libraries.
Native WAAPI animates the actual React/SVG-mask layers automatically on viewport entry.
No hover, click or Play button is required. No dependency is added.

## Install on macOS

Unzip `shape_auto_motion_patch-1.0.0.zip`. In the target repository:

```bash
# Optional: git switch -c feature/shape-auto-motion
bash /absolute/path/to/shape_auto_motion_patch/install.sh .
npm run typecheck && npm run build && npm run dev
```

Node.js and the target repository's installed TypeScript are required (`npm install` first
if necessary). The installer resolves payloads relative to itself, not your current directory;
paths containing spaces work. It parses TSX, reuses an existing `next/script` import (including
an alias), or inserts its own import after directives/imports, and inserts one
`<Script src="/shape-auto-animations.js" strategy="afterInteractive" />` before `</body>`.
An unrecognizable/invalid layout is rejected before writing files. Running twice is safe.

Core installation copies the engine to `public/shape-auto-animations.js` and this guide to
`docs/SHAPE_AUTO_ANIMATIONS.md`. It does **not** overwrite the homepage, shape components,
shape styles, metadata or geometry. The original layout is preserved as
`src/app/layout.tsx.before-shape-auto-motion`; an existing backup is never overwritten.
Changed existing payload files also receive a `.before-shape-auto-motion` backup.

Repository convenience entry point: `bash scripts/install-shape-auto-motion.sh [target]`.
It invokes the exact same installer; it does not claim to run builds for you.

### Local gallery adapter (optional when installing elsewhere)

The local gallery inspected here contains flattened JPGs. Moving an image cannot animate
its individual layers. This working tree now has **lazy same-origin live iframe previews**
inside the existing cards, without changing grid/list/filter/card design. The image remains
as the no-JS/loading fallback. Original component pages render at a 1200×900 preview viewport
and are scaled to the card, preserving their desktop breakpoints. Frames mount only while
the card is visible and are removed offscreen. The card remains a keyboard-accessible link;
preview frames are decorative, non-focusable and do not intercept pointer input.

To install this specific adapter into a copy of the inspected local gallery:

```bash
bash /absolute/path/to/shape_auto_motion_patch/install.sh . --live-gallery
```

This flag is hash-guarded: it refuses incompatible/local changes rather than overwriting
unknown gallery code. It installs `LiveShapePreview.tsx`, `/previews/[id]`, adapter-only CSS,
and the small card/hint updates. It also replaces this gallery's legacy detail animation
wrapper with plain children and navigation, preventing two animation engines from competing.
Original shape components and their CSS still remain untouched. The generic core works on
standalone pages using the app layout and on `/showcase`; it cannot convert a different
project's static gallery automatically. Do not run a legacy animation wrapper on the same
layers as this engine. There is no claim that a different GitHub branch has this local gallery.

## All 17 choreographies

Every recipe has three or four staggered tracks, followed by **one** subtle idle accent.
Entrances last roughly 1.5–2.3 seconds, idle cycles 3.2–5.2 seconds. Counts refer to actual
DOM layers, not the numeric prefix in a shape's name (Starflow has **five**, not eight blades).

| Shape | Entrance sequence | Visible-only idle |
| --- | --- | --- |
| `step-stack-demo` | 3 levels build bottom-up with overshoot; icons and 2 copy blocks follow | One small icon floats |
| `ar5-arrow-ribbon` | 5 arrows fly in; medallions stamp; numbered tabs unfold | Medallion icon sways |
| `hfr6-heartwheel` | 6 sector surfaces reveal clockwise; sector copy fades; actual heart pops | Heart emblem double-beat |
| `vt4-tube-ribbon` | Tube lands with slight tilt; 4 ribbon options slide; icons pop | Foil opacity gleam |
| `ih8-heart-elements` | 8 interactive petals converge; matching badges pop; core settles | Core stars shimmer |
| `sr6-startup-rocket` | 6 pieces assemble bottom-up; rocket lifts; route reveals; 6 timeline steps follow | Rocket + its hit areas hover 3px |
| `st7-squeeze-tubes` | 3 pieces compress/release; marker stamps and tube captions follow | Tube sheen breathes |
| `s8f-starflow` | 5 blade fills bloom in place; captions appear; central star settles | Star emblem sways |
| `d8p-diamond-petals` | 8 faceted fills unfold; stationary petal copy follows; lockup pops | Small avatar floats |
| `ta4-target-arrow` | Target appears; 4 banner fills reveal toward target; labels and callout follow | Callout icon floats |
| `wh9-heart-ring` | 6 masked paints form a color wave; numbers stamp; copy and heart appear | Heart paint light breathes |
| `gb5-gift-boxes` | 5 gifts drop/bounce with their hit areas; lid numbers stamp; miniatures echo | One box icon floats |
| `pn10-pencil-ribbon` | Pen lands; 5 bands fill; 5 interactive ribbons unfold | Marker sheen breathes |
| `cb5-clipboard` | Board/paper settles; 5 rows slide; actual check SVGs stamp | Metal clip gleams |
| `tc5-trophy-cups` | 5 whole trophy groups rise; emblems stamp; captions appear | One cup facet gleams |
| `pb4-pump-bottle` | 4 color bands fill bottom-up; cap presses; 4 step labels enter | Pump cap travels 1.5px |
| `lm6-levels-marks` | 6 milestones settle like dominoes; numbers stamp; reflections follow | One thin edge gleams |


## Lifecycle and safety contract

- IntersectionObserver starts at a nonzero intersection, including very tall mobile roots.
- No pre-hiding CSS. No script/unsupported API/reduced motion leaves the original visible.
- Delayed tracks use backwards fill; idle starts only after every entrance finishes.
- Finished effects are cancelled. No commitStyles, persistent transforms, inline style changes,
  path edits, wrapper insertion or mask URL changes are applied to the shape DOM.
- Transform effects use WAAPI `composite: add`, preserving live CSS/SVG transforms rather than
  replacing them with scale(1) or a cached matrix. Opacity is relative to the original opacity;
  finished effects release ownership to CSS. No mask assets or hitbox paths are changed.
- Radial fills reveal in place without separating artwork from independent hitmaps. Moving
  interactive groups carry their controls. Decorative child pops do not replace event handlers.
- Leaving viewport cancels effects and restores the static original; returning replays entrance.
  Global pause persists through scrolling/replay/mount. Resume affects visible roots only.
  Hidden documents pause clocks. Reduced-motion changes cancel all motion immediately.
- SPA removal disconnects observation and cancels removed instances. Duplicate instances have
  independent phase and clocks. Duplicate script execution is ignored.
- No perpetual rAF/timer loop or style/class observer. One small idle accent per visible root.
  Effects are not guaranteed compositor-only or 60 FPS on every device.

## Console diagnostics

```js
window.__shapeAutoMotion?.list()  // selectors, expected counts, timing, effects
window.__shapeAutoMotion?.status() // mounted/visible/running + per-instance state
window.__shapeAutoMotion?.replay('sr6-startup-rocket')
window.__shapeAutoMotion?.pause()
window.__shapeAutoMotion?.resume()
```

Each status `instances` entry has `instance`, `phase` (waiting/entrance/idle), `plays`, live
animation count, selector `mismatches` and execution `errors`. Running is read from actual
Animation play states. Replay returns false for absent/unknown shapes; when paused, reduced
motion or offscreen it queues rather than forcing hidden motion. Gallery frames have their
own API: select the frame in DevTools or inspect its `contentWindow.__shapeAutoMotion`.
The gallery parent correctly reports no direct shape roots.

If API is undefined, check `/shape-auto-animations.js` in Network and the layout inclusion.
If mounted=false, there is no live matching root. Inspect mismatches before adding selectors.

## Extend to shape 18

Add a recipe to RECIPES in the engine:

```js
recipe('my-new-shape', '.my-root', 'Rows build then badges settle', [
  track('.my-row', 4, 'stack', 0, 140, 800),
  track('.my-badge', 4, 'pop', 350, 140, 600),
  track('.my-caption', 4, 'fade', 650, 140, 650),
], idle('.my-small-accent', 1, 'float', 4200))
```

Verify counts, unique choreography, shared artwork/hitbox transforms, responsive alternatives,
final geometry, keyboard selection and reduced motion. Add a named frames/restFrames primitive
only when necessary. No new library or rewritten SVG is needed. CSS-mask assets are not inline
drawable paths.

## Verification / limitations

Against an already-running production build:

```bash
npm run typecheck && npm run build
# Separate terminal: npm run start
TEST_BASE=http://localhost:3210 node scripts/check-auto-motion.mjs
node scripts/check-auto-motion-install.mjs
```

Tests use the existing Chrome DevTools helper and locally installed Chrome (`CHROME_BIN`
overrides the binary), without adding Playwright. Evidence defaults to
`/tmp/shape-auto-motion-check/`. Checks cover actual selectors, entrance/idle, offscreen cleanup,
neutral additive transforms, unchanged DOM geometry, mobile layouts and React controls,
duplicate instances, SPA navigation, live previews and reduced motion. Inspect screenshots too.
Safari/iOS device behavior and different, uninspected gallery implementations are not claimed
verified by Chrome tests.

## Revert

Review your diff first. Restore `.before-shape-auto-motion` files only if no newer edits would
be lost. Otherwise remove only the engine import/tag and adapter edits manually; delete added
engine/guide/adapter files when unused. Never blanket-reset unrelated work.
