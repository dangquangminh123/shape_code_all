export const HB4_ASSET_BASE = '/assets/shapes/hb4-hanger-banners';

export const HB4_MASK_FILES = {
  hanger: 'hb4-hanger-mask.svg',
  banner: 'hb4-banner-mask.svg',
  medallion: 'hb4-medallion-mask.svg',
} as const;

export type Hb4Masks = Partial<Record<keyof typeof HB4_MASK_FILES, string>>;
export type Hb4IconName = 'idea' | 'gears' | 'database' | 'target';

export interface Hb4BannerItem {
  id: string;
  number: string;
  title: string;
  description: string;
  summary: string;
  icon: Hb4IconName;
  /** Coordinates in the 735 × 400 artwork, measured from the supplied reference. */
  x: number;
  y: number;
  colors: {
    hanger: string;
    banner: string;
    ink: string;
    glow: string;
  };
}

export const HB4_HEADING = 'Bốn bước biến ý tưởng thành kết quả';

export const HB4_BANNERS: readonly Hb4BannerItem[] = [
  {
    id: 'hb4-idea',
    number: '01',
    title: 'Ý tưởng',
    description: 'Khơi mở góc nhìn mới, tìm lời giải sáng tạo cho những điều quan trọng.',
    summary: 'Khơi mở ý tưởng, tìm lời giải mới.',
    icon: 'idea',
    x: 63,
    y: 97,
    colors: { hanger: '#f37667', banner: '#c32f1b', ink: '#ffffff', glow: 'rgba(243, 118, 103, .25)' },
  },
  {
    id: 'hb4-process',
    number: '02',
    title: 'Vận hành',
    description: 'Kết nối con người và quy trình để từng ý tưởng trở thành hành động.',
    summary: 'Kết nối đội ngũ, cùng hành động.',
    icon: 'gears',
    x: 216,
    y: 61,
    colors: { hanger: '#89d8ed', banner: '#49bfe6', ink: '#173c48', glow: 'rgba(73, 191, 230, .25)' },
  },
  {
    id: 'hb4-data',
    number: '03',
    title: 'Dữ liệu',
    description: 'Ghi nhận kết quả, hiểu điều đang diễn ra và cải tiến bằng dữ liệu.',
    summary: 'Đo lường kết quả, liên tục cải tiến.',
    icon: 'database',
    x: 369,
    y: 97,
    colors: { hanger: '#c7d59b', banner: '#a6bd70', ink: '#2c3d1e', glow: 'rgba(166, 189, 112, .25)' },
  },
  {
    id: 'hb4-goal',
    number: '04',
    title: 'Mục tiêu',
    description: 'Tập trung vào ưu tiên, hoàn thành từng cột mốc và tạo giá trị bền vững.',
    summary: 'Giữ đúng ưu tiên, chạm tới mục tiêu.',
    icon: 'target',
    x: 522,
    y: 61,
    colors: { hanger: '#ffbd78', banner: '#fa971f', ink: '#4b300c', glow: 'rgba(250, 151, 31, .25)' },
  },
] as const;
