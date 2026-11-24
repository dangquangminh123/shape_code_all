import type { IconType } from 'react-icons';
import {
  FaBriefcase,
  FaChartLine,
  FaLightbulb,
  FaRocket,
  FaUsers,
} from 'react-icons/fa6';

export const TP5_ASSET_BASE = '/assets/shapes/tp5-trophy-tiers';

export const TP5_MASK_FILES = {
  handles: 'tp5-handles-mask.svg',
  pedestal: 'tp5-pedestal-mask.svg',
  band01: 'tp5-band-01-mask.svg',
  band02: 'tp5-band-02-mask.svg',
  band03: 'tp5-band-03-mask.svg',
  band04: 'tp5-band-04-mask.svg',
  band05: 'tp5-band-05-mask.svg',
} as const;

export interface Tp5Masks {
  handles?: string;
  pedestal?: string;
  band01?: string;
  band02?: string;
  band03?: string;
  band04?: string;
  band05?: string;
}

export interface Tp5TierItem {
  id: string;
  tier: 1 | 2 | 3 | 4 | 5;
  label: string;
  description: string;
  icon: IconType;
  maskFile: string;
  colors: {
    light: string;
    mid: string;
    dark: string;
  };
}

export const TP5_TIERS: Tp5TierItem[] = [
  {
    id: 'tp5-tier-1',
    tier: 1,
    label: 'Lợi nhuận',
    description: 'Tăng trưởng doanh thu bền vững và tối ưu hóa biên lợi nhuận ròng.',
    icon: FaChartLine,
    maskFile: TP5_MASK_FILES.band01,
    colors: {
      light: '#38bdf8',
      mid: '#0ea5e9',
      dark: '#0284c7',
    },
  },
  {
    id: 'tp5-tier-2',
    tier: 2,
    label: 'Đội ngũ',
    description: 'Phối hợp nhịp nhàng đa phòng ban để nâng cao hiệu suất vận hành.',
    icon: FaUsers,
    maskFile: TP5_MASK_FILES.band02,
    colors: {
      light: '#67e8f9',
      mid: '#22d3ee',
      dark: '#0891b2',
    },
  },
  {
    id: 'tp5-tier-3',
    tier: 3,
    label: 'Kinh doanh',
    description: 'Chuẩn hóa quy trình thương mại và mở rộng tệp khách hàng mục tiêu.',
    icon: FaBriefcase,
    maskFile: TP5_MASK_FILES.band03,
    colors: {
      light: '#fde047',
      mid: '#facc15',
      dark: '#eab308',
    },
  },
  {
    id: 'tp5-tier-4',
    tier: 4,
    label: 'Khởi tạo',
    description: 'Triển khai nhanh sản phẩm mẫu và kiểm chứng phản hồi từ thị trường.',
    icon: FaRocket,
    maskFile: TP5_MASK_FILES.band04,
    colors: {
      light: '#fb923c',
      mid: '#f97316',
      dark: '#ea580c',
    },
  },
  {
    id: 'tp5-tier-5',
    tier: 5,
    label: 'Ý tưởng',
    description: 'Khởi nguồn tư duy đột phá đặt nền móng vững chắc cho toàn hành trình.',
    icon: FaLightbulb,
    maskFile: TP5_MASK_FILES.band05,
    colors: {
      light: '#fb7185',
      mid: '#e11d48',
      dark: '#be123c',
    },
  },
];
