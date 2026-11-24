import type { IconType } from 'react-icons';
import { FaCircleCheck } from 'react-icons/fa6';

export const CS6_ASSET_BASE = '/assets/shapes/cs6-slanted-pillars';

export const CS6_MASK_FILES = {
  bar: 'cs6-bar-mask.svg',
  wing: 'cs6-wing-mask.svg',
} as const;

export type Cs6MaskRole = keyof typeof CS6_MASK_FILES;
export type Cs6Masks = Partial<Record<Cs6MaskRole, string>>;

export interface Cs6PillarItem {
  id: string;
  index: number;
  label: string;
  description: string;
  icon: IconType;
  colors: {
    light: string;
    mid: string;
    dark: string;
    wing: string;
    glow: string;
  };
}

export const CS6_PILLARS: readonly Cs6PillarItem[] = [
  {
    id: 'cs6-pillar-1',
    index: 0,
    label: 'Công bằng & Minh bạch',
    description: 'Chính sách đãi ngộ phản ánh đúng năng lực, vai trò và đóng góp thực tế.',
    icon: FaCircleCheck,
    colors: {
      light: '#6074ff',
      mid: '#4458e8',
      dark: '#3142c4',
      wing: '#27358a',
      glow: 'rgba(68, 88, 232, 0.28)',
    },
  },
  {
    id: 'cs6-pillar-2',
    index: 1,
    label: 'Tính cạnh tranh',
    description: 'Mức phúc lợi hấp dẫn giúp thu hút và giữ chân nhân sự chủ chốt.',
    icon: FaCircleCheck,
    colors: {
      light: '#38a3f1',
      mid: '#1982d8',
      dark: '#1062ad',
      wing: '#144c7a',
      glow: 'rgba(25, 130, 216, 0.28)',
    },
  },
  {
    id: 'cs6-pillar-3',
    index: 2,
    label: 'Tuân thủ pháp lý',
    description: 'Mọi quy chuẩn phúc lợi bám sát quy định lao động và tiêu chuẩn ngành.',
    icon: FaCircleCheck,
    colors: {
      light: '#34d38a',
      mid: '#15a866',
      dark: '#0d7e4b',
      wing: '#0b5c39',
      glow: 'rgba(21, 168, 102, 0.28)',
    },
  },
  {
    id: 'cs6-pillar-4',
    index: 3,
    label: 'Gắn kết hiệu suất',
    description: 'Thưởng và ghi nhận tương xứng với kết quả tạo ra cho mục tiêu chung.',
    icon: FaCircleCheck,
    colors: {
      light: '#fde047',
      mid: '#eab308',
      dark: '#c28e04',
      wing: '#85650d',
      glow: 'rgba(234, 179, 8, 0.28)',
    },
  },
  {
    id: 'cs6-pillar-5',
    index: 4,
    label: 'Truyền thông rõ ràng',
    description: 'Giúp từng thành viên hiểu rõ lộ trình phát triển và cơ cấu quyền lợi.',
    icon: FaCircleCheck,
    colors: {
      light: '#fb923c',
      mid: '#ea6c12',
      dark: '#be5008',
      wing: '#82390b',
      glow: 'rgba(234, 108, 18, 0.28)',
    },
  },
  {
    id: 'cs6-pillar-6',
    index: 5,
    label: 'Linh hoạt thích ứng',
    description: 'Dễ dàng điều chỉnh gói quyền lợi theo nhu cầu cá nhân và giai đoạn mới.',
    icon: FaCircleCheck,
    colors: {
      light: '#fb5873',
      mid: '#e13250',
      dark: '#b31d38',
      wing: '#781427',
      glow: 'rgba(225, 50, 80, 0.28)',
    },
  },
] as const;
