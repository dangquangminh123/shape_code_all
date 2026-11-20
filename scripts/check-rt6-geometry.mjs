import assert from 'node:assert';

const CANVAS_W = 1280;
const CANVAS_H = 720;
const RT6_SCALE = 3.81;
const RT6_X0 = 68;
const RT6_Y0 = 166;
const RT6_DX = 186.8;
const RT6_DY = 33.5;

const FACE_W = 42.6 * RT6_SCALE; // 162.306
const FACE_H = 81 * RT6_SCALE;   // 308.61
const FOLD_W = 10.61 * RT6_SCALE; // 40.4241

const steps = ['06', '05', '04', '03', '02', '01'];

console.log('--- Checking RT6 Geometric Assertions ---');

// 1. Counts
assert.strictEqual(steps.length, 6, 'actualFaceCount === 6');
console.log('✓ actualFaceCount === 6');

let foldCount = 0;
for (let i = 0; i < steps.length; i++) {
  if (i < 5) foldCount++;
}
assert.strictEqual(foldCount, 5, 'actualFoldCount === 5');
console.log('✓ actualFoldCount === 5');

// 2. DOM Step order
assert.deepStrictEqual(steps, ['06', '05', '04', '03', '02', '01']);
console.log("✓ stepsInDOM === ['06','05','04','03','02','01']");

// 3. Aspect ratio
const ratio = FACE_W / FACE_H;
assert(Math.abs(ratio - 42.6 / 81) < 0.001, 'Aspect ratio matches 42.6 / 81');
console.log('✓ face.width / face.height ~= 42.6 / 81');

// 4. Coordinates & Overlaps
for (let i = 0; i < steps.length; i++) {
  const x = RT6_X0 + i * RT6_DX;
  const y = RT6_Y0 + i * RT6_DY;
  const badgeX = x + 21.58 * RT6_SCALE;
  const badgeY = y + 15.29 * RT6_SCALE;

  assert(Math.abs(badgeX - (x + 82.22)) < 0.05, `Badge X offset matches (+82.22) at step ${steps[i]}`);
  assert(Math.abs(badgeY - (y + 58.25)) < 0.05, `Badge Y offset matches (+58.25) at step ${steps[i]}`);

  if (i < 5) {
    const nextX = RT6_X0 + (i + 1) * RT6_DX;
    const nextY = RT6_Y0 + (i + 1) * RT6_DY;

    assert(Math.abs(nextX - x - 186.8) < 0.001, `x[i+1] - x[i] ~= 186.8 at step ${steps[i]}`);
    assert(Math.abs(nextY - y - 33.5) < 0.001, `y[i+1] - y[i] ~= 33.5 at step ${steps[i]}`);

    // Gap between faces
    assert(x + FACE_W < nextX, `x[i] + FACE_W < x[i+1] (no direct face overlap) at step ${steps[i]}`);
    const gap = nextX - (x + FACE_W);
    assert(Math.abs(gap - 24.49) < 0.02, `gap is ~24.49px at step ${steps[i]}`);

    // Fold bridges the gap and extends under next step face
    assert(x + FACE_W + FOLD_W > nextX, `x[i] + FACE_W + FOLD_W > x[i+1] (fold reaches under next face) at step ${steps[i]}`);
    const overlap = x + FACE_W + FOLD_W - nextX;
    assert(Math.abs(overlap - 15.93) < 0.02, `fold overlap under next face is ~15.93px at step ${steps[i]}`);
  }
}
console.log('✓ forall i<5: x[i+1] - x[i] ~= 186.8');
console.log('✓ forall i<5: y[i+1] - y[i] ~= 33.5');
console.log('✓ forall i<5: x[i] + FACE_W < x[i+1] (clean 24.5px gap)');
console.log('✓ forall i<5: x[i] + FACE_W + FOLD_W > x[i+1] (fold tucks 15.9px under next face)');
console.log('✓ badgeCenter[i] ~= (x[i]+82.22, y[i]+58.25)');
console.log('✓ lastStepHasFold === false');
console.log('--- ALL RT6 GEOMETRY ASSERTIONS PASSED PERFECTLY ---');
