import assert from 'node:assert';
import {
  OB3_FOLD_POLYGON_POINTS,
  OB3_LOOP_FRONT_PATH,
  OB3_MIDDLE_BAND_PATH,
  OB3_RIGHT_RECT,
  OB3_RIGHT_TRANSFORM,
  OB3_VIEWBOX,
  OB3_Y_ORIGIN,
  OB3_Y_SCALE,
  SOURCE_1_FACE_HEIGHT,
  SOURCE_1_FOLD_TOP_LEFT,
  SOURCE_2_MID_TOP,
  SOURCE_2_WIDTH,
} from '../src/components/shapes/ob3-option-banners/ob3-option-banners.geometry.ts';

console.log('--- Checking OB3 Static & Geometric Assertions ---');

// 1. ViewBox
assert.strictEqual(OB3_VIEWBOX, '0 0 455.1 81');
console.log('✓ OB3_VIEWBOX === 0 0 455.1 81');

// 2. Paths non-empty and well-formed
assert(OB3_LOOP_FRONT_PATH.length > 50, 'OB3_LOOP_FRONT_PATH exists');
assert(OB3_MIDDLE_BAND_PATH.length > 50, 'OB3_MIDDLE_BAND_PATH exists');
console.log('✓ Both 2.svg paths extracted correctly');

// 3. Middle band height
const midHeight = 81 - SOURCE_2_MID_TOP;
assert(Math.abs(midHeight - 45.67) < 0.001, 'Middle band height === 45.67');
console.log('✓ Middle band height === 45.67');

// 4. Exact mathematical alignment of fold
const foldLeftTopY = OB3_Y_ORIGIN + SOURCE_1_FOLD_TOP_LEFT * OB3_Y_SCALE;
const foldLeftBotY = OB3_Y_ORIGIN + 81 * OB3_Y_SCALE;

assert(Math.abs(foldLeftTopY - SOURCE_2_MID_TOP) < 0.0001, 'Fold left top connects exactly at y=35.33');
assert(Math.abs(foldLeftBotY - 81) < 0.0001, 'Fold left bottom connects exactly at y=81.0');
console.log('✓ Fold left edge connects seamlessly to middle band (y: 35.33 -> 81.0)');

// 5. Right banner height and vertical step
const rightFaceTopY = OB3_Y_ORIGIN + 0 * OB3_Y_SCALE;
const rightFaceBotY = OB3_Y_ORIGIN + SOURCE_1_FACE_HEIGHT * OB3_Y_SCALE;
const rightFaceHeight = rightFaceBotY - rightFaceTopY;

assert(Math.abs(rightFaceHeight - midHeight) < 0.0001, 'Right banner height matches middle band height (45.67)');
console.log('✓ Both middle and right banners have IDENTICAL height = 45.67');

const stepUp = SOURCE_2_MID_TOP - rightFaceTopY;
assert(Math.abs(stepUp - 6.787) < 0.001, 'Step up matches fold geometry (6.787 units)');
console.log('✓ Right banner steps up seamlessly by 6.787 units');

// 6. Total width
const totalWidth = SOURCE_2_WIDTH + OB3_RIGHT_RECT.x + OB3_RIGHT_RECT.width;
assert(Math.abs(totalWidth - 455.10) < 0.01, 'Total width matches 455.10');
console.log('✓ Total banner geometry width === 455.10 fits within 455.1');

console.log('--- ALL OB3 STATIC ASSERTIONS PASSED PERFECTLY ---');
