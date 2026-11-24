import type { IconType } from 'react-icons';
import { FaChartColumn, FaGears, FaLightbulb } from 'react-icons/fa6';

export const CO3_ASSET_BASE = '/assets/shapes/co3-cube-options';

export const CO3_MASK_FILES = {
  banner: 'co3-banner-mask.svg',
  cubeLeft: 'co3-cube-left-mask.svg',
  cubeFront: 'co3-cube-front-mask.svg',
  cubeTop: 'co3-cube-top-mask.svg',
} as const;

export type Co3MaskRole = keyof typeof CO3_MASK_FILES;
export type Co3Masks = Partial<Record<Co3MaskRole, string>>;

export interface Co3OptionItem {
  id: string;
  step: string;
  index: number;
  widthPercent: number;
  title: string;
  description: string;
  icon: IconType;
  colors: {
    cubeTop: string;
    cubeLeft: string;
    cubeFrontLight: string;
    cubeFrontDark: string;
    bannerStart: string;
    bannerEnd: string;
    glow: string;
  };
}

export const CO3_OPTIONS: readonly Co3OptionItem[] = [
  {
    id: 'co3-step-03',
    step: '03',
    index: 0,
    widthPercent: 78,
    title: 'Hệ thống ấn tượng',
    description: 'Kiến trúc vận hành đồng bộ giúp mọi quy trình phối hợp mượt mà và chính xác.',
    icon: FaGears,
    colors: {
      cubeTop: '#38bdf8',
      cubeLeft: '#1d4ed8',
      cubeFrontLight: '#0ea5e9',
      cubeFrontDark: '#0284c7',
      bannerStart: '#0369a1',
      bannerEnd: '#06b6d4',
      glow: 'rgba(14, 165, 233, 0.28)',
    },
  },
  {
    id: 'co3-step-02',
    step: '02',
    index: 1,
    widthPercent: 89,
    title: 'Sáng tạo đột phá',
    description: 'Biến dữ liệu đo lường thành lợi thế tăng trưởng bền vững cho doanh nghiệp.',
    icon: FaChartColumn,
    colors: {
      cubeTop: '#a3e635',
      cubeLeft: '#4d7c0f',
      cubeFrontLight: '#84cc16',
      cubeFrontDark: '#65a30d',
      bannerStart: '#4d7c0f',
      bannerEnd: '#84cc16',
      glow: 'rgba(101, 163, 13, 0.28)',
    },
  },
  {
    id: 'co3-step-01',
    step: '01',
    index: 2,
    widthPercent: 100,
    title: 'Ý tưởng khởi nguồn',
    description: 'Đặt nền móng tư duy chiến lược rõ ràng ngay từ bước khởi đầu dự án.',
    icon: FaLightbulb,
    colors: {
      cubeTop: '#fbbf24',
      cubeLeft: '#b45309',
      cubeFrontLight: '#fb923c',
      cubeFrontDark: '#ea580c',
      bannerStart: '#ea580c',
      bannerEnd: '#facc15',
      glow: 'rgba(245, 158, 11, 0.28)',
    },
  },
] as const;
