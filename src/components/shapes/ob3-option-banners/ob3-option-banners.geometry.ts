// Exact geometry and mathematical alignment for OB3 Option Banners

export const OB3_VIEWBOX = '0 0 455.1 81';

// 2.svg Path #1: Loop & Arrowhead pointing right (front layer)
export const OB3_LOOP_FRONT_PATH =
  'M51.95,73.07V56.31c-11.8,0.16-23.62,0.32-35.42,0.48c-1.56,0-5.97,0.22-10.28,3.3c-4,2.85-5.67,6.55-6.24,8.04' +
  'c0-9.97,0-19.93,0-29.9c0.17-4.27,1.13-14.96,8.5-19.4c3.02-1.82,6.02-1.97,8-1.97c11.81-0.03,23.64-0.07,35.45-0.1V0' +
  'c8.84,12.17,17.68,24.36,26.52,36.53C69.63,48.71,60.79,60.88,51.95,73.07z';

// 2.svg Path #2: Middle Band (under arrowhead: y=35.33 to 81, x=77.59 to 182.2)
export const OB3_MIDDLE_BAND_PATH =
  'M77.59,35.31c0.3,0.41,0.59,0.81,0.89,1.22c-8.84,12.18-17.68,24.36-26.52,36.54V56.31c-11.8,0.16-23.62,0.32-35.42,0.48' +
  'c-1.56,0-5.97,0.22-10.28,3.3c-4,2.85-5.67,6.55-6.24,8.04v-3.32c0,1.11,0,2.21,0,3.32c0.72,1.7,1.76,3.55,3.29,5.32' +
  'c6.5,7.52,16.68,7.58,18.97,7.54H182.2V35.33C147.33,35.32,112.46,35.32,77.59,35.31z';

// 1.svg Original Polygon (3D Fold Connector)
export const OB3_FOLD_POLYGON_POINTS = '18.46,0 0,10.48 0,81 18.46,70.52';

// 1.svg Original Rect (Right Banner Face)
export const OB3_RIGHT_RECT = {
  x: 18.46,
  y: 0,
  width: 254.44,
  height: 70.52,
};

// Coordinate mapping constants
export const SOURCE_2_WIDTH = 182.2;
export const SOURCE_2_MID_TOP = 35.33;
export const SOURCE_1_FACE_HEIGHT = 70.52;
export const SOURCE_1_FOLD_TOP_LEFT = 10.48;

// Exact vertical scale factor so right banner height matches middle banner height (45.67px)
export const OB3_Y_SCALE = (81 - SOURCE_2_MID_TOP) / SOURCE_1_FACE_HEIGHT; // 0.6476176971072037
export const OB3_Y_ORIGIN = SOURCE_2_MID_TOP - SOURCE_1_FOLD_TOP_LEFT * OB3_Y_SCALE; // 28.542966534316508

// Unified transformation for all SVG1 elements (polygon fold + right rect face)
export const OB3_RIGHT_TRANSFORM = `translate(${SOURCE_2_WIDTH} ${OB3_Y_ORIGIN}) scale(1 ${OB3_Y_SCALE})`;
