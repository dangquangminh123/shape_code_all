import type { IconType } from 'react-icons';
import {
  FaBriefcase,
  FaDollarSign,
  FaMagnifyingGlass,
  FaMobileScreenButton,
} from 'react-icons/fa6';

export const DT4_ASSET_BASE = '/assets/shapes/dt4-dual-tubes';

export const DT4_MASK_FILES = {
  tubeBody: 'dt4-tube-body-mask.svg',
  tubeCap: 'dt4-tube-cap-mask.svg',
  tubeCapRibs: 'dt4-tube-cap-ribs-mask.svg',
  ribbonBar: 'dt4-ribbon-bar-mask.svg',
} as const;

export interface Dt4Masks {
  tubeBody?: string;
  tubeCap?: string;
  tubeCapRibs?: string;
  ribbonBar?: string;
}

export interface Dt4TierItem {
  number: '01' | '02' | '03' | '04';
  id: string;
  title: string;
  description: string;
  icon: IconType;
  colors: {
    wingLeft: string;
    mid: string;
    wingRight: string;
    tubeLight: string;
    tubeDark: string;
    reflection: string;
  };
}

export const DT4_TIERS: Dt4TierItem[] = [
  {
    number: '01',
    id: 'dt4-tier-01',
    title: 'Chiến lược Tài chính',
    description: 'Tối ưu ngân sách đầu tư và kiểm soát dòng tiền dự án.',
    icon: FaDollarSign,
    colors: {
      wingLeft: '#ea580c',
      mid: '#f59e0b',
      wingRight: '#fbbf24',
      tubeLight: '#fbbf24',
      tubeDark: '#ea580c',
      reflection: 'rgba(245, 158, 11, 0.28)',
    },
  },
  {
    number: '02',
    id: 'dt4-tier-02',
    title: 'Trải nghiệm Di động',
    description: 'Thiết kế giao diện đa thiết bị mượt mà, phản hồi tức thì.',
    icon: FaMobileScreenButton,
    colors: {
      wingLeft: '#be123c',
      mid: '#e11d48',
      wingRight: '#f43f5e',
      tubeLight: '#fb7185',
      tubeDark: '#be123c',
      reflection: 'rgba(225, 29, 72, 0.24)',
    },
  },
  {
    number: '03',
    id: 'dt4-tier-03',
    title: 'Vận hành Hệ thống',
    description: 'Chuẩn hóa quy trình phối hợp và tự động hóa tác vụ cốt lõi.',
    icon: FaBriefcase,
    colors: {
      wingLeft: '#0369a1',
      mid: '#0ea5e9',
      wingRight: '#38bdf8',
      tubeLight: '#38bdf8',
      tubeDark: '#0284c7',
      reflection: 'rgba(14, 165, 233, 0.25)',
    },
  },
  {
    number: '04',
    id: 'dt4-tier-04',
    title: 'Phân tích & Tối ưu',
    description: 'Đo lường hiệu suất thực tế và rà soát lỗ hổng định kỳ.',
    icon: FaMagnifyingGlass,
    colors: {
      wingLeft: '#15803d',
      mid: '#22c55e',
      wingRight: '#4ade80',
      tubeLight: '#4ade80',
      tubeDark: '#16a34a',
      reflection: 'rgba(34, 197, 94, 0.28)',
    },
  },
];
