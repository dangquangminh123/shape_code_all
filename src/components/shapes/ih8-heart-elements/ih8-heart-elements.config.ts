export const IH8_ASSET_BASE = '/assets/shapes/ih8-heart-elements';

export type Ih8Step = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';
export type Ih8Side = 'left' | 'right';
export type Ih8Theme = 'colorful' | 'color' | 'silver-red';
export type Ih8IconName =
  | 'chart-pie'
  | 'book-open'
  | 'lightbulb'
  | 'users'
  | 'droplet'
  | 'comments'
  | 'atom'
  | 'database';

export type Ih8MaskRole =
  | 'crownLeft'
  | 'crownRight'
  | 'shoulderLeft'
  | 'shoulderRight'
  | 'curveLeft'
  | 'curveRight'
  | 'pointLeft'
  | 'pointRight'
  | 'coreHeart';

export type Ih8Masks = Partial<Record<Ih8MaskRole, string>>;

export const IH8_MASK_FILES: Record<Ih8MaskRole, string> = {
  crownLeft: 'ih8-heart-crown-left.svg',
  crownRight: 'ih8-heart-crown-right.svg',
  shoulderLeft: 'ih8-heart-shoulder-left.svg',
  shoulderRight: 'ih8-heart-shoulder-right.svg',
  curveLeft: 'ih8-heart-curve-left.svg',
  curveRight: 'ih8-heart-curve-right.svg',
  pointLeft: 'ih8-heart-point-left.svg',
  pointRight: 'ih8-heart-point-right.svg',
  coreHeart: 'ih8-core-heart-surface.svg',
};

export interface Ih8Item {
  step: Ih8Step;
  side: Ih8Side;
  maskRole: Ih8MaskRole;
  icon: Ih8IconName;
  title: string;
  description: string;
}

export const IH8_ITEMS: Ih8Item[] = [
  { step: '1', side: 'left', maskRole: 'crownLeft', icon: 'chart-pie', title: 'TƯ DUY NỀN TẢNG', description: 'Xác định mục tiêu, nắm bắt dữ liệu và nhận diện vấn đề trọng tâm.' },
  { step: '2', side: 'right', maskRole: 'crownRight', icon: 'book-open', title: 'KHÁM PHÁ KIẾN THỨC', description: 'Chọn lọc tài liệu, hệ thống hóa những điều thực sự quan trọng.' },
  { step: '3', side: 'left', maskRole: 'shoulderLeft', icon: 'lightbulb', title: 'KHƠI NGUỒN Ý TƯỞNG', description: 'Mở rộng góc nhìn, thử những cách tiếp cận mới và sáng tạo.' },
  { step: '4', side: 'right', maskRole: 'shoulderRight', icon: 'users', title: 'KẾT NỐI ĐỘI NHÓM', description: 'Trao đổi rõ ràng, phối hợp linh hoạt và cùng chia sẻ trách nhiệm.' },
  { step: '5', side: 'left', maskRole: 'curveLeft', icon: 'droplet', title: 'THỬ NGHIỆM THỰC TẾ', description: 'Chuyển ý tưởng thành hành động và kiểm chứng từng giả thuyết.' },
  { step: '6', side: 'right', maskRole: 'curveRight', icon: 'comments', title: 'PHẢN HỒI NHANH', description: 'Tiếp nhận nhận xét, điều chỉnh và liên tục cải thiện chất lượng.' },
  { step: '7', side: 'left', maskRole: 'pointLeft', icon: 'atom', title: 'TỐI UY QUY TRÌNH'.replace('TỐI UY', 'TỐI ƯU'), description: 'Tinh gọn từng bước, giảm thao tác thừa và tăng tính nhất quán.' },
  { step: '8', side: 'right', maskRole: 'pointRight', icon: 'database', title: 'LƯU TRỮ KẾT QUẢ', description: 'Tổng hợp dữ liệu, chuẩn hóa và sẵn sàng tái sử dụng sau này.' },
];

export const IH8_LEFT_ITEMS = IH8_ITEMS.filter(item => item.side === 'left');
export const IH8_RIGHT_ITEMS = IH8_ITEMS.filter(item => item.side === 'right');
