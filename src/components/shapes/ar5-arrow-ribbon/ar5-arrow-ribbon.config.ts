export type Ar5IconName = 'phone' | 'bulb' | 'analysis' | 'search' | 'target';
export type Ar5MaskRole = 'arrow' | 'tab' | 'medallion';
export type Ar5Masks = Partial<Record<Ar5MaskRole, string>>;

export const AR5_ASSET_BASE = '/assets/shapes/ar5-arrow-ribbon';
export const AR5_MASK_FILES: Record<Ar5MaskRole, string> = {
  arrow: 'ar5-rail-arrow-mask.svg',
  tab: 'ar5-ribbon-tab-mask.svg',
  medallion: 'ar5-medallion-notch-mask.svg',
};

export interface Ar5RowItem {
  number: string;
  icon: Ar5IconName;
  title: string;
  description: string;
}

export const AR5_ROWS: Ar5RowItem[] = [
  {
    number: '01', icon: 'phone', title: 'KẾT NỐI & KHỞI ĐẦU',
    description: 'Kết nối ý tưởng, xác định nhu cầu và mở ra hành trình phát triển của bạn.',
  },
  {
    number: '02', icon: 'bulb', title: 'KHƠI NGUỒN Ý TƯỞNG',
    description: 'Khám phá góc nhìn mới, nuôi dưỡng sáng tạo và tìm ra hướng đi khác biệt.',
  },
  {
    number: '03', icon: 'analysis', title: 'PHÂN TÍCH & ĐỊNH HƯỚNG',
    description: 'Thấu hiểu dữ liệu, đánh giá cơ hội và xây dựng kế hoạch hành động rõ ràng.',
  },
  {
    number: '04', icon: 'search', title: 'KHÁM PHÁ & HOÀN THIỆN',
    description: 'Đi sâu vào từng chi tiết, thử nghiệm và cải tiến để nâng cao chất lượng.',
  },
  {
    number: '05', icon: 'target', title: 'CHINH PHỤC MỤC TIÊU',
    description: 'Biến kế hoạch thành kết quả, tạo giá trị bền vững và sẵn sàng tiến xa hơn.',
  },
];
