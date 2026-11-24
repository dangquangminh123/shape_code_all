import type { IconType } from 'react-icons';
import {
  FaComments,
  FaFlask,
  FaLocationDot,
  FaMusic,
  FaScaleBalanced,
  FaScroll,
} from 'react-icons/fa6';

export const LB6_ASSET_BASE = '/assets/shapes/lb6-lightbulb-ideas';

export const LB6_MASK_FILES = {
  bulbHead: 'lb6-bulb-head-mask.svg',
  bulbBase: 'lb6-bulb-base-mask.svg',
  bolt: 'lb6-bolt-mask.svg',
  circle: 'lb6-circle-mask.svg',
} as const;

export type Lb6MaskRole = keyof typeof LB6_MASK_FILES;
export type Lb6Masks = Partial<Record<Lb6MaskRole, string>>;

export interface Lb6IdeaItem {
  id: string;
  side: 'left' | 'right';
  order: number;
  title: string;
  description: string;
  icon: IconType;
  colors: {
    light: string;
    mid: string;
    dark: string;
    glow: string;
  };
}

export const LB6_IDEAS: readonly Lb6IdeaItem[] = [
  {
    id: 'lb6-left-1',
    side: 'left',
    order: 0,
    title: 'Cân bằng giải pháp',
    description: 'Đánh giá hài hòa giữa giá trị người dùng và hiệu quả vận hành thực tế.',
    icon: FaScaleBalanced,
    colors: {
      light: '#38bdf8',
      mid: '#0ea5e9',
      dark: '#0284c7',
      glow: 'rgba(14, 165, 233, 0.28)',
    },
  },
  {
    id: 'lb6-left-2',
    side: 'left',
    order: 1,
    title: 'Trao đổi đa chiều',
    description: 'Kết nối phản hồi liên tục giữa các nhóm để tinh chỉnh ý tưởng cốt lõi.',
    icon: FaComments,
    colors: {
      light: '#fb7185',
      mid: '#f43f5e',
      dark: '#e11d48',
      glow: 'rgba(244, 63, 94, 0.28)',
    },
  },
  {
    id: 'lb6-left-3',
    side: 'left',
    order: 2,
    title: 'Chuẩn hóa quy trình',
    description: 'Hệ thống hóa tài liệu thiết kế giúp mọi thành viên triển khai đồng nhất.',
    icon: FaScroll,
    colors: {
      light: '#fb923c',
      mid: '#f97316',
      dark: '#ea580c',
      glow: 'rgba(249, 115, 22, 0.28)',
    },
  },
  {
    id: 'lb6-right-1',
    side: 'right',
    order: 3,
    title: 'Định vị mục tiêu',
    description: 'Xác định đúng trọng tâm thị trường và cột mốc tăng trưởng theo từng giai đoạn.',
    icon: FaLocationDot,
    colors: {
      light: '#2dd4bf',
      mid: '#14b8a6',
      dark: '#0d9488',
      glow: 'rgba(20, 184, 166, 0.28)',
    },
  },
  {
    id: 'lb6-right-2',
    side: 'right',
    order: 4,
    title: 'Thử nghiệm sáng tạo',
    description: 'Kiểm chứng nhanh các giả thuyết mới để tìm ra phương án đột phá nhất.',
    icon: FaFlask,
    colors: {
      light: '#facc15',
      mid: '#eab308',
      dark: '#ca8a04',
      glow: 'rgba(234, 179, 8, 0.28)',
    },
  },
  {
    id: 'lb6-right-3',
    side: 'right',
    order: 5,
    title: 'Nhịp điệu trải nghiệm',
    description: 'Đồng bộ tương tác mượt mà và cảm xúc thị giác xuyên suốt toàn sản phẩm.',
    icon: FaMusic,
    colors: {
      light: '#a78bfa',
      mid: '#8b5cf6',
      dark: '#7c3aed',
      glow: 'rgba(139, 92, 246, 0.28)',
    },
  },
] as const;
