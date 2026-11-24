import type { IconType } from 'react-icons';
import {
  FaEarthAsia,
  FaHouseChimney,
  FaRecycle,
  FaUsers,
} from 'react-icons/fa6';

export const EC4_ASSET_BASE = '/assets/shapes/ec4-ecology-plant';

export const EC4_MASK_FILES = {
  card: 'ec4-card-mask.svg',
  badge: 'ec4-badge-mask.svg',
  leafCluster: 'ec4-leaf-cluster-mask.svg',
  bowlBody: 'ec4-bowl-body-mask.svg',
  bowlRim: 'ec4-bowl-rim-mask.svg',
  stem: 'ec4-stem-mask.svg',
} as const;

export interface Ec4Masks {
  card?: string;
  badge?: string;
  leafCluster?: string;
  bowlBody?: string;
  bowlRim?: string;
  stem?: string;
}

export interface Ec4StepItem {
  number: '01' | '02' | '03' | '04';
  id: string;
  side: 'left' | 'right';
  row: 1 | 2;
  title: string;
  description: string;
  icon: IconType;
  colors: {
    start: string;
    end: string;
    pocket: string;
    ring: string;
    leafLight: string;
    leafDark: string;
  };
}

export const EC4_STEPS: Ec4StepItem[] = [
  {
    number: '01',
    id: 'ec4-step-01',
    side: 'left',
    row: 1,
    title: 'Cộng đồng Xanh',
    description:
      'Kết nối đội ngũ nhân sự và hình thành văn hóa làm việc bền vững, giảm thiểu lãng phí mỗi ngày.',
    icon: FaUsers,
    colors: {
      start: '#0d9488',
      end: '#5eead4',
      pocket: '#0f766e',
      ring: '#0d9488',
      leafLight: '#34d399',
      leafDark: '#0f766e',
    },
  },
  {
    number: '02',
    id: 'ec4-step-02',
    side: 'right',
    row: 1,
    title: 'Tuần hoàn Tài nguyên',
    description:
      'Tối ưu tái chế vật liệu, sử dụng năng lượng sạch và khép kín vòng đời sản phẩm hiệu quả.',
    icon: FaRecycle,
    colors: {
      start: '#65a30d',
      end: '#a3e635',
      pocket: '#4d7c0f',
      ring: '#65a30d',
      leafLight: '#a3e635',
      leafDark: '#4d7c0f',
    },
  },
  {
    number: '03',
    id: 'ec4-step-03',
    side: 'left',
    row: 2,
    title: 'Hạ tầng Sinh thái',
    description:
      'Thiết kế không gian vận hành tiết kiệm điện nước, tận dụng ánh sáng tự nhiên và vật liệu thân thiện.',
    icon: FaHouseChimney,
    colors: {
      start: '#059669',
      end: '#6ee7b7',
      pocket: '#047857',
      ring: '#059669',
      leafLight: '#34d399',
      leafDark: '#047857',
    },
  },
  {
    number: '04',
    id: 'ec4-step-04',
    side: 'right',
    row: 2,
    title: 'Tác động Toàn cầu',
    description:
      'Đo lường chỉ số giảm phát thải carbon định kỳ để mở rộng giá trị tích cực cho hệ sinh thái chung.',
    icon: FaEarthAsia,
    colors: {
      start: '#16a34a',
      end: '#86efac',
      pocket: '#15803d',
      ring: '#16a34a',
      leafLight: '#84cc16',
      leafDark: '#15803d',
    },
  },
];
