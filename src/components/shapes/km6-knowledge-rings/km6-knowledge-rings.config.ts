import type { IconType } from 'react-icons';
import {
  FaBolt,
  FaDatabase,
  FaDiagramProject,
  FaMicrochip,
  FaPeopleGroup,
  FaShareNodes,
} from 'react-icons/fa6';

export const KM6_ASSET_BASE = '/assets/shapes/km6-knowledge-rings';

export const KM6_MASK_FILES = {
  ringBody: 'km6-ring-body-mask.svg',
  ringRim: 'km6-ring-rim-mask.svg',
} as const;

export type Km6MaskRole = keyof typeof KM6_MASK_FILES;
export type Km6Masks = Partial<Record<Km6MaskRole, string>>;

export interface Km6StageItem {
  id: string;
  num: string;
  index: number;
  side: 'left' | 'right';
  sideRow: 0 | 1 | 2;
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

export const KM6_STAGES: readonly Km6StageItem[] = [
  {
    id: 'km6-01',
    num: '01',
    index: 0,
    side: 'right',
    sideRow: 0,
    title: 'Thu thập dữ liệu',
    description: 'Tổng hợp thông tin thực tế và kinh nghiệm vận hành từ mọi điểm chạm.',
    icon: FaDatabase,
    colors: {
      light: '#7dd3fc',
      mid: '#0ea5e9',
      dark: '#0369a1',
      glow: 'rgba(14, 165, 233, 0.28)',
    },
  },
  {
    id: 'km6-02',
    num: '02',
    index: 1,
    side: 'right',
    sideRow: 1,
    title: 'Khai thác & Ứng dụng',
    description: 'Chuyển hóa tri thức thành hành động cụ thể phục vụ quyết định nhanh.',
    icon: FaBolt,
    colors: {
      light: '#d4d48c',
      mid: '#a3a154',
      dark: '#716f32',
      glow: 'rgba(163, 161, 84, 0.28)',
    },
  },
  {
    id: 'km6-03',
    num: '03',
    index: 2,
    side: 'right',
    sideRow: 2,
    title: 'Chia sẻ & Truy cập',
    description: 'Mở quyền tra cứu minh bạch giúp mọi bộ phận kết nối nguồn lực kịp thời.',
    icon: FaShareNodes,
    colors: {
      light: '#34d399',
      mid: '#059669',
      dark: '#065f46',
      glow: 'rgba(5, 150, 105, 0.28)',
    },
  },
  {
    id: 'km6-04',
    num: '04',
    index: 3,
    side: 'left',
    sideRow: 2,
    title: 'Văn hóa tri thức',
    description: 'Khuyến khích tinh thần học hỏi liên tục và chủ động ghi nhận bài học mới.',
    icon: FaPeopleGroup,
    colors: {
      light: '#86efac',
      mid: '#4d9b58',
      dark: '#2f6d38',
      glow: 'rgba(77, 155, 88, 0.28)',
    },
  },
  {
    id: 'km6-05',
    num: '05',
    index: 4,
    side: 'left',
    sideRow: 1,
    title: 'Chuẩn hóa quy trình',
    description: 'Đóng gói kinh nghiệm thực chiến thành quy chuẩn dễ nhân rộng toàn đội ngũ.',
    icon: FaDiagramProject,
    colors: {
      light: '#e2a0a0',
      mid: '#b95858',
      dark: '#883737',
      glow: 'rgba(185, 88, 88, 0.28)',
    },
  },
  {
    id: 'km6-06',
    num: '06',
    index: 5,
    side: 'left',
    sideRow: 0,
    title: 'Công nghệ nền tảng',
    description: 'Số hóa kho tri thức bằng hạ tầng tìm kiếm thông minh và đồng bộ tức thời.',
    icon: FaMicrochip,
    colors: {
      light: '#93a8d9',
      mid: '#4e6aa8',
      dark: '#33487a',
      glow: 'rgba(78, 106, 168, 0.28)',
    },
  },
] as const;
