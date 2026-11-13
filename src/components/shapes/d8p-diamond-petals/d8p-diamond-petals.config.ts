export type D8pTheme = 'reference' | 'spectrum';

export type D8pIconKey =
  | 'target'
  | 'gears'
  | 'savings'
  | 'idea'
  | 'mail'
  | 'handshake'
  | 'revenue'
  | 'growth';

export interface D8pPetalConfig {
  id: number;
  number: string;
  css: string;
  mask: string;
  icon: D8pIconKey;
  title: string;
  description: string;
}

export const D8P_PETALS: readonly D8pPetalConfig[] = [
  {
    id: 1,
    number: '01',
    css: 'lime',
    mask: 'd8p-petal-01-mask.svg',
    icon: 'target',
    title: 'Định vị mục tiêu',
    description: 'Xác lập tầm nhìn cốt lõi và hệ chuẩn đo lường rõ ràng.',
  },
  {
    id: 2,
    number: '02',
    css: 'coral',
    mask: 'd8p-petal-02-mask.svg',
    icon: 'gears',
    title: 'Tư duy hệ thống',
    description: 'Chuẩn hóa quy trình vận hành thông minh và linh hoạt.',
  },
  {
    id: 3,
    number: '03',
    css: 'teal',
    mask: 'd8p-petal-03-mask.svg',
    icon: 'savings',
    title: 'Tối ưu nguồn vốn',
    description: 'Phân bổ ngân sách trọng tâm bảo toàn dòng tiền bền vững.',
  },
  {
    id: 4,
    number: '04',
    css: 'charcoal',
    mask: 'd8p-petal-04-mask.svg',
    icon: 'idea',
    title: 'Đổi mới sáng tạo',
    description: 'Khơi mở giải pháp đột phá nâng cao năng lực cạnh tranh.',
  },
  {
    id: 5,
    number: '05',
    css: 'forest',
    mask: 'd8p-petal-05-mask.svg',
    icon: 'mail',
    title: 'Kết nối đa kênh',
    description: 'Lan tỏa thông điệp thương hiệu nhất quán tới khách hàng.',
  },
  {
    id: 6,
    number: '06',
    css: 'crimson',
    mask: 'd8p-petal-06-mask.svg',
    icon: 'handshake',
    title: 'Hợp tác chiến lược',
    description: 'Xây dựng liên minh đối tác uy tín cùng kiến tạo giá trị.',
  },
  {
    id: 7,
    number: '07',
    css: 'ocean',
    mask: 'd8p-petal-07-mask.svg',
    icon: 'revenue',
    title: 'Gia tăng lợi nhuận',
    description: 'Mở rộng dòng doanh thu chất lượng với biên lợi nhuận cao.',
  },
  {
    id: 8,
    number: '08',
    css: 'espresso',
    mask: 'd8p-petal-08-mask.svg',
    icon: 'growth',
    title: 'Bứt phá thị phần',
    description: 'Tăng tốc quy mô trưởng thành trên nền tảng dữ liệu thực.',
  },
];
