export type S8fTheme = 'reference' | 'silver-red';

export const S8F_SECTORS = [
  {
    id: 1,
    number: '01',
    css: 'crimson',
    mask: 's8f-sector-01-crimson-mask.svg',
    icon: 'chart',
    title: 'Chiến lược',
    description: 'Xác định tầm nhìn, xây dựng kế hoạch và đặt mục tiêu rõ ràng.',
  },
  {
    id: 2,
    number: '02',
    css: 'charcoal',
    mask: 's8f-sector-02-charcoal-mask.svg',
    icon: 'handshake',
    title: 'Hợp tác',
    description: 'Kết nối đối tác, phát triển quan hệ và tạo dựng lòng tin.',
  },
  {
    id: 3,
    number: '03',
    css: 'slate',
    mask: 's8f-sector-03-slate-mask.svg',
    icon: 'money',
    title: 'Tài chính',
    description: 'Quản trị nguồn lực và tối ưu hiệu quả trong từng giai đoạn.',
  },
  {
    id: 4,
    number: '04',
    css: 'teal',
    mask: 's8f-sector-04-teal-mask.svg',
    icon: 'idea',
    title: 'Đổi mới',
    description: 'Khơi mở ý tưởng, thử nghiệm cách làm và cải tiến sản phẩm.',
  },
  {
    id: 5,
    number: '05',
    css: 'sand',
    mask: 's8f-sector-05-sand-mask.svg',
    icon: 'people',
    title: 'Nhân sự',
    description: 'Phát triển đội ngũ, chia sẻ kiến thức và đồng hành bền vững.',
  },
] as const;
