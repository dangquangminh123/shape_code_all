import type { IconType } from 'react-icons';
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
  angle: number;
}

export const SQ5_DIMENSIONS: Sq5DimensionConfig[] = [
  {
    id: 'scope',
    index: 0,
    letter: 'S',
    name: 'Scope',
    vietnameseTitle: 'Phạm Vi Bàn Giao (Scope)',
    description: 'Xác định rõ ràng những gì được cam kết hoàn thành và bàn giao trong phạm vi dự án.',
    color: '#0d9488',
    gradientTop: '#2dd4bf',
    gradientBot: '#0f766e',
    icon: LuFileCheck,
    angle: -54,
  },
  {
    id: 'quality',
    index: 1,
    letter: 'Q',
    name: 'Quality',
    vietnameseTitle: 'Chất Lượng Sản Phẩm (Quality)',
    description: 'Bộ tiêu chuẩn đánh giá, độ ổn định và cấp độ hoàn thiện của sản phẩm bàn giao.',
    color: '#7cb342',
    gradientTop: '#aed581',
    gradientBot: '#558b2f',
    icon: LuAward,
    angle: 18,
  },
  {
    id: 'effort',
    index: 2,
    letter: 'E',
    name: 'Effort',
    vietnameseTitle: 'Nỗ Lực & Nguồn Lực (Effort)',
    description: 'Ngân sách đầu tư, quy mô nhân lực và công sức cần thiết để hoàn thành mục tiêu.',
    color: '#f59e0b',
    gradientTop: '#fbbf24',
    gradientBot: '#d97706',
    icon: LuCog,
    angle: 90,
  },
  {
    id: 'risk',
    index: 3,
    letter: 'R',
    name: 'Risk',
    vietnameseTitle: 'Quản Trị Rủi Ro (Risk)',
    description: 'Mức độ dung sai cho các biến động và độ lệch kỳ vọng so với kế hoạch ban đầu.',
    color: '#e74c3c',
    gradientTop: '#f87171',
    gradientBot: '#c0392b',
    icon: LuTriangleAlert,
    angle: 162,
  },
  {
    id: 'time',
    index: 4,
    letter: 'T',
    name: 'Time',
    vietnameseTitle: 'Thời Gian Thực Hiện (Time)',
    description: 'Thời hạn hoàn thành, tiến độ các mốc sự kiện và tổng thời gian đưa vào vận hành.',
    color: '#34495e',
    gradientTop: '#64748b',
    gradientBot: '#1e293b',
    icon: LuClock,
    angle: 234,
  },
];
