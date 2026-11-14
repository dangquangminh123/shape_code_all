# GB5 Gift Boxes

Shape 32's five gift boxes, source-derived SVG geometry, seven reusable mask assets,
gift-category icons and a synchronized timeline on a plain white background.
No snowflake ornaments are rendered or requested by the component.

## Usage

```tsx
import { Gb5GiftBoxes } from '@/components/shapes/gb5-gift-boxes';

<Gb5GiftBoxes />
<Gb5GiftBoxes initialActiveId="gb5-step-03" className="my-gift-boxes" />
```

The dedicated route is `/shapes/gb5-gift-boxes`; the home showcase includes it too.
The bounded `?instances=2` showcase variant renders two independent instances, with
step 03 initially selected in the second, for regression testing.

## Layout and interaction

- Desktop uses the 1500 × 1061 artwork canvas (not the JPEG attribution footer).
- At 900px and below, cards reflow to two columns; at 560px and below, one column.
- Hover/focus previews a step without changing selection. Click/tap, Enter, or
  Space toggles selection. Both card and timeline controls expose `aria-pressed`.
- Arrow keys wrap within the current control group; Home/End jump to its ends.
  Escape clears selection while retaining keyboard focus and its visible preview.
- The hidden status announces selection, not hover. Decorative SVGs are hidden
  from assistive technology; interactive SVG paths remain exposed as buttons.
- `useId` scopes SVG and accessibility references per instance. Reduced-motion
  users get highlighting without movement. No additional runtime libraries.

## Nội dung và màu sắc / Customization

Edit `gb5-gift-boxes.config.ts` beside this README:

- `GB5_STEPS`: each box's `title`, `description`, `miniSummary`, and `iconKind`.
- Each step's `palette`: `bowMain`, `bowHighlight`, `bowShadow`, `bowFold`,
  `numberColor`, and interaction `glowRgba`.
- `GB5_THEME`: heading/body colors and timeline colors. The section and stage
  backgrounds stay pure white (`#ffffff`) to match the rest of the shape showcase;
  the reference image's gray background gradient is intentionally not used.
- Default categories: thưởng cá nhân, quà tập thể, quà tri ân, quà Giáng sinh,
  quà kỷ niệm. Each has its own Vietnamese description and timeline summary.
- Titles, descriptions, icons, accessible labels and timeline content share the
  same config; no placeholder copy or separate hard-coded timeline text.

The default styling follows the reference's italic serif headings, light serif
numbers, left-aligned descriptions, smooth white paper, shaded ribbon loops and
gift-category icons. Local system fonts avoid adding a remote font dependency.
Keep headings short (one line) and descriptions around 100 characters to fit the
reference-sized desktop cards. Tablet/mobile reflows are intentional adaptations.

Assets are served from `public/assets/shapes/gb5-gift-boxes/`; `source-original/`
contains untouched copies of both supplied SVGs. The reference JPEG is not used
as a UI background, and the stock watermark/attribution footer is not rendered.

## Validation and asset generation

From the repository root:

```sh
npm run typecheck
npm run build
```

For manual UI checks, run `npm run dev` (port 3210), then open the home page and
`/shapes/gb5-gift-boxes` at desktop and mobile widths.

Regenerate geometry and masks with
`python3 /Users/dangquangminh/Desktop/code_all_shape/scripts/generate_gb5_assets.py`.
The generator uses the preserved original SVG copies under
`/Users/dangquangminh/Desktop/code_all_shape/public/assets/shapes/gb5-gift-boxes/source-original/`
and does not require the removed reference folder.
It intentionally accepts only the move/cubic/close commands used by these source
paths. Typography, gift-category icons and responsive reflow are an adaptation, not a
pixel-identical reproduction of the stock JPEG.
