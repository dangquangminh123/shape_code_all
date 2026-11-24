import type { IconType } from 'react-icons';
import {
  FaBullseye,
  FaChessKnight,
  FaCompassDrafting,
  FaUsersViewfinder,
} from 'react-icons/fa6';

export const AB4_ASSET_BASE = '/assets/shapes/ab4-arc-bulb';

export const AB4_MASK_FILES = {
  arc: 'ab4-arc-mask.svg',
  bulbGlass: 'ab4-bulb-glass-mask.svg',
  bulbBase: 'ab4-bulb-base-mask.svg',
  bulbStem: 'ab4-bulb-stem-mask.svg',
  bulbFilament: 'ab4-bulb-filament-mask.svg',
  bulbRays: 'ab4-bulb-rays-mask.svg',
  circleOuter: 'ab4-circle-outer-mask.svg',
  circleInner: 'ab4-circle-inner-mask.svg',
} as const;

export type Ab4MaskRole = keyof typeof AB4_MASK_FILES;
export type Ab4Masks = Partial<Record<Ab4MaskRole, string>>;

export interface Ab4NodeItem {
  id: string;
  step: number;
  side: 'left' | 'right';
  slot: 'bottom-left' | 'top-left' | 'top-right' | 'bottom-right';
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

export const AB4_NODES: readonly Ab4NodeItem[] = [
  {
    id: 'ab4-step-1',
    step: 1,
    side: 'left',
    slot: 'bottom-left',
    title: 'Phác thảo chiến lược',
    description: 'Hoạch định lộ trình phát triển sản phẩm theo từng giai đoạn tăng trưởng.',
    icon: FaCompassDrafting,
    colors: {
      light: '#38bdf8',
      mid: '#0ea5e9',
      dark: '#0284c7',
      glow: 'rgba(14, 165, 233, 0.28)',
    },
  },
  {
    id: 'ab4-step-2',
    step: 2,
    side: 'left',
    slot: 'top-left',
    title: 'Trọng tâm mục tiêu',
    description: 'Xác lập chỉ số đo lường rõ ràng giúp đội ngũ tập trung đúng hướng.',
    icon: FaBullseye,
    colors: {
      light: '#ef4444',
      mid: '#dc2626',
      dark: '#b91c1c',
      glow: 'rgba(220, 38, 38, 0.28)',
    },
  },
  {
    id: 'ab4-step-3',
    step: 3,
    side: 'right',
    slot: 'top-right',
    title: 'Nước đi linh hoạt',
    description: 'Chủ động thích ứng thị trường và tối ưu phương án cạnh tranh bền vững.',
    icon: FaChessKnight,
    colors: {
      light: '#22c55e',
      mid: '#16a34a',
      dark: '#15803d',
      glow: 'rgba(22, 163, 74, 0.28)',
    },
  },
  {
    id: 'ab4-step-4',
    step: 4,
    side: 'right',
    slot: 'bottom-right',
    title: 'Thấu hiểu khách hàng',
    description: 'Phân tích hành vi người dùng để mở rộng tệp khách hàng mục tiêu.',
    icon: FaUsersViewfinder,
    colors: {
      light: '#8b5cf6',
      mid: '#7c3aed',
      dark: '#6d28d9',
      glow: 'rgba(124, 58, 237, 0.28)',
    },
  },
] as const;
