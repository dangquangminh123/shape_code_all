export type Gb5StepId =
  | 'gb5-step-01'
  | 'gb5-step-02'
  | 'gb5-step-03'
  | 'gb5-step-04'
  | 'gb5-step-05';

export type Gb5IconKind = 'award' | 'team' | 'gratitude' | 'christmas' | 'celebration';

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
    iconKind: 'award',
    title: 'Thưởng cá nhân',
    description: 'Ghi nhận nỗ lực và thành tích nổi bật bằng món quà dành riêng cho người xứng đáng.',
    categoryTag: 'VINH DANH CÁ NHÂN',
    metricBadge: '01 · THÀNH TÍCH',
    miniSummary: 'Một dấu ấn riêng cho mỗi thành tựu đáng tự hào.',
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
    iconKind: 'team',
    title: 'Quà tập thể',
    description: 'Cùng chia sẻ niềm vui, tôn vinh tinh thần đồng đội và những thành quả chung.',
    categoryTag: 'GẮN KẾT ĐỒNG ĐỘI',
    metricBadge: '02 · ĐỒNG HÀNH',
    miniSummary: 'Chúc mừng đội ngũ đã cùng nhau làm nên thành công.',
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
    iconKind: 'gratitude',
    title: 'Quà tri ân',
    description: 'Gửi lời cảm ơn chân thành đến khách hàng, đối tác và những người luôn đồng hành.',
    categoryTag: 'THAY LỜI CẢM ƠN',
    metricBadge: '03 · TRÂN TRỌNG',
    miniSummary: 'Trao sự trân trọng, gìn giữ những mối quan hệ quý.',
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
    iconKind: 'christmas',
    title: 'Quà Giáng sinh',
    description: 'Gói ghém lời chúc an lành, mang chút ấm áp và bất ngờ đến những người thương.',
    categoryTag: 'MÙA LỄ AN LÀNH',
    metricBadge: '04 · YÊU THƯƠNG',
    miniSummary: 'Món quà nhỏ, niềm vui lớn trong mùa sum vầy.',
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
    iconKind: 'celebration',
    title: 'Quà kỷ niệm',
    description: 'Lưu giữ dấu mốc đáng nhớ: sinh nhật, ngày thành lập hay một khởi đầu mới.',
    categoryTag: 'DẤU MỐC ĐÁNG NHỚ',
    metricBadge: '05 · KỶ NIỆM',
    miniSummary: 'Để mỗi dịp đặc biệt trở thành một ký ức đẹp.',
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
