export type Ta4Theme = 'reference' | 'modern';

export type Ta4IconKey = 'lock' | 'plan' | 'clock' | 'idea';

export interface Ta4BannerConfig {
  id: number;
  number: string;
  optionLabel: string;
  css: string;
  mask: string;
  icon: Ta4IconKey;
  subtitle: string;
  detail: string;
}

export const TA4_BANNERS: readonly Ta4BannerConfig[] = [
  {
    id: 1,
    number: '01',
    optionLabel: 'OPTION 01',
    css: 'cyan',
    mask: 'ta4-banner-01-mask.svg',
    icon: 'lock',
    subtitle: 'Bảo mật nền tảng',
    detail: 'Thiết lập lá chắn quản trị rủi ro và bảo vệ dữ liệu cốt lõi toàn diện.',
  },
  {
    id: 2,
    number: '02',
    optionLabel: 'OPTION 02',
    css: 'crimson',
    mask: 'ta4-banner-02-mask.svg',
    icon: 'plan',
    subtitle: 'Kế hoạch thực thi',
    detail: 'Chuẩn hóa lộ trình hành động theo từng mốc KPI định lượng chính xác.',
  },
  {
    id: 3,
    number: '03',
    optionLabel: 'OPTION 03',
    css: 'pearl',
    mask: 'ta4-banner-03-mask.svg',
    icon: 'clock',
    subtitle: 'Tối ưu tiến độ',
    detail: 'Rút ngắn chu kỳ vận hành và phân bổ nguồn lực đúng thời điểm vàng.',
  },
  {
    id: 4,
    number: '04',
    optionLabel: 'OPTION 04',
    css: 'amber',
    mask: 'ta4-banner-04-mask.svg',
    icon: 'idea',
    subtitle: 'Đột phá sáng tạo',
    detail: 'Kích hoạt giải pháp công nghệ mới giúp gia tăng lợi thế dẫn đầu thị trường.',
  },
];
