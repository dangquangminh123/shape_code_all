export type Gb5StepId =
  | 'gb5-step-01'
  | 'gb5-step-02'
  | 'gb5-step-03'
  | 'gb5-step-04'
  | 'gb5-step-05';

export type Gb5IconKind = 'team' | 'money' | 'gears' | 'cycle' | 'chart';

export interface Gb5Palette {
  bowMain: string;
  bowFold: string;
  bowHighlight: string;
  bowShadow: string;
  numberColor: string;
  glowRgba: string;
  badgeBg: string;
}

export interface Gb5BoxSlot {
  cxPx: number;
  bowTopPx: number;
  leftPct: number;
  topPct: number;
  widthPct: number;
  heightPct: number;
}

export interface Gb5MiniSlot {
  cxPx: number;
  leftPct: number;
}

export interface Gb5StepConfig {
  id: Gb5StepId;
  index: number;
  number: string;
  row: 'top' | 'bottom';
  iconKind: Gb5IconKind;
  title: string;
  description: string;
  categoryTag: string;
  metricBadge: string;
  miniSummary: string;
  boxSlot: Gb5BoxSlot;
  miniSlot: Gb5MiniSlot;
  palette: Gb5Palette;
}

export interface Gb5SnowflakeSpec {
  id: string;
  leftPct: number;
  topPct: number;
  sizePx: number;
  rotationDeg: number;
  opacity: number;
}

export const GB5_STAGE_WIDTH = 1500;
// Reference artwork only; excludes the JPEG's 100px attribution footer.
export const GB5_STAGE_HEIGHT = 1061;

// Edit copy, per-step palettes and shared theme here; no geometry changes needed.
// The canvas stays pure white, consistent with every shape in the showcase.
export const GB5_THEME = {
  titleColor: '#252724',
  bodyColor: '#727570',
  timelineColor: '#bd1823',
  timelineShadow: '#8e0f17',
} as const;

const DEFAULT_TITLE = 'Lorem ipsum';
const LOREM_COPY =
  'Lorem ipsum dolor sit amet bibendum libero sit amet consectetur adipiscing elit. Euismod ipsum aliquam.';

const MINI_LOREM =
  'Lorem ipsum dolor sit amet bibendum libero sit amet consectetur adipiscing elit. Euismod ipsum aliquam.';

function makeBoxSlot(cxPx: number, bowTopPx: number): Gb5BoxSlot {
  const widthPx = 304;
  const heightPx = 372;
  const leftPx = cxPx - widthPx / 2;
  const topPx = bowTopPx;
  return {
    cxPx,
    bowTopPx,
    leftPct: Number(((leftPx / GB5_STAGE_WIDTH) * 100).toFixed(3)),
    topPct: Number(((topPx / GB5_STAGE_HEIGHT) * 100).toFixed(3)),
    widthPct: Number(((widthPx / GB5_STAGE_WIDTH) * 100).toFixed(3)),
    heightPct: Number(((heightPx / GB5_STAGE_HEIGHT) * 100).toFixed(3)),
  };
}

function makeMiniSlot(cxPx: number): Gb5MiniSlot {
  return {
    cxPx,
    leftPct: Number(((cxPx / GB5_STAGE_WIDTH) * 100).toFixed(3)),
  };
}

export const GB5_STEPS: readonly Gb5StepConfig[] = [
  {
    id: 'gb5-step-01',
    index: 0,
    number: '01',
    row: 'top',
    iconKind: 'team',
    title: DEFAULT_TITLE,
    description: LOREM_COPY,
    categoryTag: 'STAKEHOLDER ALIGNMENT',
    metricBadge: 'STAGE 01 · TEAM',
    miniSummary: MINI_LOREM,
    boxSlot: makeBoxSlot(370, 42),
    miniSlot: makeMiniSlot(248),
    palette: {
      bowMain: '#1fa56d',
      bowFold: '#075536',
      bowHighlight: '#31c184',
      bowShadow: '#137d4c',
      numberColor: '#23ad73',
      glowRgba: 'rgba(5, 178, 108, 0.28)',
      badgeBg: 'rgba(5, 178, 108, 0.12)',
    },
  },
  {
    id: 'gb5-step-02',
    index: 1,
    number: '02',
    row: 'top',
    iconKind: 'money',
    title: DEFAULT_TITLE,
    description: LOREM_COPY,
    categoryTag: 'CAPITAL ALLOCATION',
    metricBadge: 'STAGE 02 · BUDGET',
    miniSummary: MINI_LOREM,
    boxSlot: makeBoxSlot(759, 135),
    miniSlot: makeMiniSlot(488),
    palette: {
      bowMain: '#2883c9',
      bowFold: '#16496c',
      bowHighlight: '#44a3ea',
      bowShadow: '#2169a7',
      numberColor: '#278dd4',
      glowRgba: 'rgba(5, 114, 198, 0.28)',
      badgeBg: 'rgba(5, 114, 198, 0.12)',
    },
  },
  {
    id: 'gb5-step-03',
    index: 2,
    number: '03',
    row: 'top',
    iconKind: 'gears',
    title: DEFAULT_TITLE,
    description: LOREM_COPY,
    categoryTag: 'WORKFLOW AUTOMATION',
    metricBadge: 'STAGE 03 · OPS',
    miniSummary: MINI_LOREM,
    boxSlot: makeBoxSlot(1148, 42),
    miniSlot: makeMiniSlot(750),
    palette: {
      bowMain: '#d1a325',
      bowFold: '#6c5008',
      bowHighlight: '#efbf3c',
      bowShadow: '#a58018',
      numberColor: '#d5a72a',
      glowRgba: 'rgba(218, 179, 19, 0.30)',
      badgeBg: 'rgba(218, 179, 19, 0.14)',
    },
  },
  {
    id: 'gb5-step-04',
    index: 3,
    number: '04',
    row: 'bottom',
    iconKind: 'cycle',
    title: DEFAULT_TITLE,
    description: LOREM_COPY,
    categoryTag: 'ITERATIVE FEEDBACK LOOP',
    metricBadge: 'STAGE 04 · SYNC',
    miniSummary: MINI_LOREM,
    boxSlot: makeBoxSlot(449, 443),
    miniSlot: makeMiniSlot(1012),
    palette: {
      bowMain: '#d31a70',
      bowFold: '#780836',
      bowHighlight: '#ec3c8e',
      bowShadow: '#a41753',
      numberColor: '#d51c71',
      glowRgba: 'rgba(234, 16, 112, 0.28)',
      badgeBg: 'rgba(234, 16, 112, 0.12)',
    },
  },
  {
    id: 'gb5-step-05',
    index: 4,
    number: '05',
    row: 'bottom',
    iconKind: 'chart',
    title: DEFAULT_TITLE,
    description: LOREM_COPY,
    categoryTag: 'PERFORMANCE ANALYTICS',
    metricBadge: 'STAGE 05 · KPI',
    miniSummary: MINI_LOREM,
    boxSlot: makeBoxSlot(1072, 443),
    miniSlot: makeMiniSlot(1288),
    palette: {
      bowMain: '#e63e20',
      bowFold: '#7e210d',
      bowHighlight: '#f65d39',
      bowShadow: '#b5331a',
      numberColor: '#df4025',
      glowRgba: 'rgba(240, 56, 19, 0.28)',
      badgeBg: 'rgba(240, 56, 19, 0.12)',
    },
  },
] as const;

export const GB5_SNOWFLAKES: readonly Gb5SnowflakeSpec[] = [
  { id: 'sf-01', leftPct: 7.3, topPct: 14.6, sizePx: 142, rotationDeg: 0, opacity: 0.54 },
  { id: 'sf-02', leftPct: 51.0, topPct: 15.0, sizePx: 280, rotationDeg: 0, opacity: 0.38 },
  { id: 'sf-03', leftPct: 14.6, topPct: 59.4, sizePx: 246, rotationDeg: 4, opacity: 0.42 },
  { id: 'sf-04', leftPct: 39.2, topPct: 52.0, sizePx: 156, rotationDeg: 12, opacity: 0.40 },
  { id: 'sf-05', leftPct: 90.4, topPct: 55.5, sizePx: 254, rotationDeg: 2, opacity: 0.42 },
  { id: 'sf-06', leftPct: 52.0, topPct: 81.0, sizePx: 238, rotationDeg: 10, opacity: 0.40 },
  { id: 'sf-07', leftPct: 10.4, topPct: 87.5, sizePx: 160, rotationDeg: -5, opacity: 0.45 },
  { id: 'sf-08', leftPct: 90.3, topPct: 87.5, sizePx: 152, rotationDeg: 5, opacity: 0.48 },
] as const;
