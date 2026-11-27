export const CS5_ASSET_BASE = '/assets/shapes/cs5-cylinder-steps';

export const CS5_MASK_FILES = {
  cylinderBody: 'cs5-cylinder-body-mask.svg',
  cylinderCap: 'cs5-cylinder-cap-mask.svg',
  cylinderFull: 'cs5-cylinder-full-mask.svg',
  calloutOutline: 'cs5-callout-outline-mask.svg',
  connectorLine: 'cs5-connector-line-mask.svg',
  connectorDot: 'cs5-connector-dot-mask.svg',
  sleeve: 'cs5-sleeve-mask.svg',
  sleeveRim: 'cs5-sleeve-rim-mask.svg',
} as const;

export type Cs5Masks = Partial<Record<keyof typeof CS5_MASK_FILES, string>>;
export type Cs5IconName = 'target' | 'tap' | 'growth' | 'search' | 'timer';

export interface Cs5StepItem {
  id: string;
  number: string;
  title: string;
  description: string;
  summary: string;
  icon: Cs5IconName;
  /** Coordinates in the supplied 602 × 612 reference. */
  y: number;
  /** Sleeve offset within the 280px cylinder; tube endpoints stay aligned. */
  sleeveX: number;
  colors: {
    accent: string;
    top: string;
    middle: string;
    bottom: string;
    cap: string;
    number: string;
  };
}

export const CS5_HEADING = {
  lead: 'QUY TRÌNH',
  detail: '5 BƯỚC PHÁT TRIỂN',
  description: 'Từ định hướng rõ ràng đến kết quả cụ thể.',
} as const;

export const CS5_STEPS: readonly Cs5StepItem[] = [
  {
    id: 'cs5-direction', number: '01', title: 'Định hướng',
    description: 'Chọn đúng mục tiêu, thống nhất điều cần đạt.',
    summary: 'Chọn đúng mục tiêu.', icon: 'target', y: 127, sleeveX: 27,
    colors: { accent: '#ae8200', top: '#ffe400', middle: '#ffcd00', bottom: '#e7a000', cap: '#ffe830', number: '#575008' },
  },
  {
    id: 'cs5-action', number: '02', title: 'Hành động',
    description: 'Kết nối đội ngũ, đưa kế hoạch vào thực hiện.',
    summary: 'Biến ý tưởng thành việc.', icon: 'tap', y: 218, sleeveX: 50,
    colors: { accent: '#d56800', top: '#ff9900', middle: '#f27b00', bottom: '#c94b00', cap: '#ff9a0a', number: '#683914' },
  },
  {
    id: 'cs5-measure', number: '03', title: 'Đo lường',
    description: 'Theo dõi tiến độ, ghi nhận từng bước tiến.',
    summary: 'Ghi nhận từng bước tiến.', icon: 'growth', y: 309, sleeveX: 82,
    colors: { accent: '#b50877', top: '#d50086', middle: '#b90075', bottom: '#8e0058', cap: '#cb0083', number: '#531340' },
  },
  {
    id: 'cs5-analysis', number: '04', title: 'Phân tích',
    description: 'Tìm điểm cải tiến, làm rõ điều tạo giá trị.',
    summary: 'Tìm điểm cần cải tiến.', icon: 'search', y: 400, sleeveX: 109,
    colors: { accent: '#078d99', top: '#00b6c5', middle: '#008a9e', bottom: '#005574', cap: '#00aeb7', number: '#164953' },
  },
  {
    id: 'cs5-delivery', number: '05', title: 'Hoàn thành',
    description: 'Về đích đúng hẹn, sẵn sàng cho chặng mới.',
    summary: 'Về đích đúng thời hạn.', icon: 'timer', y: 491, sleeveX: 137,
    colors: { accent: '#1a4a7a', top: '#075592', middle: '#133e75', bottom: '#152b50', cap: '#09558b', number: '#152f50' },
  },
] as const;
