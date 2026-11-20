import { type IconType } from 'react-icons';
import { LuAward, LuClock, LuCog, LuFileCheck, LuTriangleAlert } from 'react-icons/lu';

export type Sq5DimensionId = 'scope' | 'quality' | 'effort' | 'risk' | 'time';

export interface Sq5DimensionConfig {
  id: Sq5DimensionId;
  index: number;
  letter: string;
  name: string;
  vietnameseTitle: string;
  description: string;
  color: string;
  gradientTop: string;
  gradientBot: string;
  icon: IconType;
  angle: number; // Rotational polar angle of petal bulb & upright letter
}

// Master canonical petal path (from originals/SVG/5.svg)
export const SQ5_PETAL_PATH =
  'M51.37,23.62c-0.32,0.18-0.65,0.36-0.96,0.55c-0.32,0.18-0.63,0.37-0.94,0.58c-0.93,0.58-1.84,1.2-2.73,1.86' +
  'c-0.3,0.22-0.59,0.44-0.88,0.67c-0.29,0.22-0.58,0.45-0.86,0.68c-0.02,0.02-0.04,0.03-0.05,0.04c-0.55,0.45-1.08,0.92-1.61,1.4' +
  'c-0.27,0.24-0.54,0.5-0.8,0.75c-0.26,0.25-0.52,0.51-0.78,0.77c-0.26,0.26-0.52,0.52-0.76,0.79c-0.26,0.26-0.51,0.53-0.74,0.81' +
  'c-0.25,0.27-0.5,0.55-0.72,0.83c-0.25,0.28-0.48,0.56-0.7,0.85c-0.24,0.29-0.46,0.57-0.68,0.86c-0.23,0.29-0.45,0.59-0.66,0.88' +
  'c-0.22,0.3-0.44,0.59-0.64,0.9c-1.87,2.72-3.44,5.67-4.64,8.79c-0.14,0.35-0.27,0.7-0.39,1.05c-0.13,0.35-0.25,0.71-0.36,1.06' +
  'c-0.12,0.36-0.24,0.71-0.34,1.07c-0.11,0.36-0.22,0.72-0.31,1.08c-0.1,0.36-0.19,0.73-0.28,1.1c-0.79,3.24-1.21,6.64-1.21,10.12' +
  'c0,7.18,1.76,13.94,4.87,19.88c-8.86-7.37-14.69-18.24-15.39-30.48C7.96,47.49,0,37.54,0,25.73C0,11.52,11.52,0,25.73,0' +
  'c7.59,0,14.41,3.28,19.11,8.51C48.51,12.58,50.9,17.83,51.37,23.62z';

// Precise geometric offsets to align petal rotation center at (0, 0)
export const SQ5_PETAL_OFFSET_X = 73.93;
export const SQ5_PETAL_OFFSET_Y = 92.07;

// Constant radius from center (0, 0) for all 5 letters S, Q, E, R, T
export const SQ5_LETTER_RADIUS = 82.0;

export const SQ5_DIMENSIONS: Sq5DimensionConfig[] = [
  {
    id: 'scope',
    index: 0,
    letter: 'S',
    name: 'Scope',
    vietnameseTitle: 'Phạm Vi Bàn Giao',
    description: 'Xác định rõ ràng những gì được cam kết hoàn thành và bàn giao trong phạm vi dự án.',
    color: '#0d9488',
    gradientTop: '#14b8a6',
    gradientBot: '#0f766e',
    icon: LuFileCheck,
    angle: -126, // Top-Left (-126 deg)
  },
  {
    id: 'quality',
    index: 1,
    letter: 'Q',
    name: 'Quality',
    vietnameseTitle: 'Chất Lượng Sản Phẩm',
    description: 'Bộ tiêu chuẩn đánh giá, độ ổn định và cấp độ hoàn thiện của sản phẩm bàn giao.',
    color: '#65a30d',
    gradientTop: '#84cc16',
    gradientBot: '#4d7c0f',
    icon: LuAward,
    angle: -54, // Top-Right (-54 deg = -126 + 72)
  },
  {
    id: 'effort',
    index: 2,
    letter: 'E',
    name: 'Effort',
    vietnameseTitle: 'Nỗ Lực & Nguồn Lực',
    description: 'Ngân sách đầu tư, quy mô nhân lực và công sức cần thiết để hoàn thành mục tiêu.',
    color: '#ea580c',
    gradientTop: '#f97316',
    gradientBot: '#c2410c',
    icon: LuCog,
    angle: 18, // Middle-Right (+18 deg = -54 + 72)
  },
  {
    id: 'risk',
    index: 3,
    letter: 'R',
    name: 'Risk',
    vietnameseTitle: 'Quản Trị Rủi Ro',
    description: 'Mức độ dung sai cho các biến động và độ lệch kỳ vọng so với kế hoạch ban đầu.',
    color: '#dc2626',
    gradientTop: '#ef4444',
    gradientBot: '#b91c1c',
    icon: LuTriangleAlert,
    angle: 90, // Straight Down (+90 deg = +18 + 72)
  },
  {
    id: 'time',
    index: 4,
    letter: 'T',
    name: 'Time',
    vietnameseTitle: 'Thời Gian Thực Hiện',
    description: 'Thời hạn hoàn thành, tiến độ các mốc sự kiện và tổng thời gian đưa vào vận hành.',
    color: '#334155',
    gradientTop: '#475569',
    gradientBot: '#1e293b',
    icon: LuClock,
    angle: 162, // Middle-Left (+162 deg = +90 + 72)
  },
];
