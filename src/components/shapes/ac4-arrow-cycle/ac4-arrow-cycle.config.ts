import type { IconType } from 'react-icons';
import {
  FaChartLine,
  FaGears,
  FaLightbulb,
  FaRocket,
} from 'react-icons/fa6';

export const AC4_ASSET_BASE = '/assets/shapes/ac4-arrow-cycle';

export const AC4_MASK_FILES = {
  face: 'ac4-arrow-face-mask.svg',
  rim: 'ac4-arrow-rim-mask.svg',
  flap: 'ac4-arrow-flap-mask.svg',
} as const;

export type Ac4MaskRole = keyof typeof AC4_MASK_FILES;
export type Ac4Masks = Partial<Record<Ac4MaskRole, string>>;

export interface Ac4CycleStep {
  id: string;
  letter: 'A' | 'B' | 'C' | 'D';
  index: number;
  corner: 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left';
  title: string;
  description: string;
  icon: IconType;
  colors: {
    faceLight: string;
    faceDark: string;
    rim: string;
    flap: string;
    glow: string;
  };
}

export const AC4_STEPS: readonly Ac4CycleStep[] = [
  {
    id: 'ac4-step-a',
    letter: 'A',
    index: 0,
    corner: 'top-left',
    title: 'Khởi tạo ý tưởng',
    description: 'Khám phá vấn đề cốt lõi và định hình giải pháp giá trị cho khách hàng.',
    icon: FaLightbulb,
    colors: {
      faceLight: '#facc15',
      faceDark: '#eab308',
      rim: '#fde68a',
      flap: '#9a6b00',
      glow: 'rgba(234, 179, 8, 0.28)',
    },
  },
  {
    id: 'ac4-step-b',
    letter: 'B',
    index: 1,
    corner: 'top-right',
    title: 'Xây dựng hệ thống',
    description: 'Chuẩn hóa quy trình vận hành và kết nối nguồn lực triển khai linh hoạt.',
    icon: FaGears,
    colors: {
      faceLight: '#ef4444',
      faceDark: '#dc2626',
      rim: '#fca5a5',
      flap: '#7f1d1d',
      glow: 'rgba(220, 38, 38, 0.28)',
    },
  },
  {
    id: 'ac4-step-c',
    letter: 'C',
    index: 2,
    corner: 'bottom-right',
    title: 'Tăng tốc triển khai',
    description: 'Đưa sản phẩm ra thị trường nhanh chóng và tối ưu trải nghiệm thực tế.',
    icon: FaRocket,
    colors: {
      faceLight: '#38a3be',
      faceDark: '#25829b',
      rim: '#7dd3fc',
      flap: '#164e63',
      glow: 'rgba(37, 130, 155, 0.28)',
    },
  },
  {
    id: 'ac4-step-d',
    letter: 'D',
    index: 3,
    corner: 'bottom-left',
    title: 'Đo lường & Tối ưu',
    description: 'Đánh giá hiệu suất chu kỳ để tiếp tục cải tiến bền vững ở vòng lặp mới.',
    icon: FaChartLine,
    colors: {
      faceLight: '#8bc34a',
      faceDark: '#689f38',
      rim: '#bef264',
      flap: '#3f6212',
      glow: 'rgba(104, 159, 56, 0.28)',
    },
  },
] as const;
