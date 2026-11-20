import { type IconType } from 'react-icons';
import { LuAward, LuClock, LuCog, LuFileCheck, LuTriangleAlert } from 'react-icons/lu';
import { type Sq5DimensionId } from './sq5-sqert-model.geometry';

export type { Sq5DimensionId };

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
}

export const SQ5_DIMENSIONS: Sq5DimensionConfig[] = [
  {
    id: 'scope',
    index: 0,
    letter: 'S',
    name: 'Scope',
    vietnameseTitle: 'Phạm Vi Bàn Giao',
    description: 'Xác định rõ ràng những gì được cam kết hoàn thành và bàn giao trong phạm vi dự án.',
    color: '#149b8f',
    gradientTop: '#17ab9e',
    gradientBot: '#0f857a',
    icon: LuFileCheck,
  },
  {
    id: 'quality',
    index: 1,
    letter: 'Q',
    name: 'Quality',
    vietnameseTitle: 'Chất Lượng Sản Phẩm',
    description: 'Bộ tiêu chuẩn đánh giá, độ ổn định và cấp độ hoàn thiện của sản phẩm bàn giao.',
    color: '#8bb747',
    gradientTop: '#99c94e',
    gradientBot: '#7ca43e',
    icon: LuAward,
  },
  {
    id: 'effort',
    index: 2,
    letter: 'E',
    name: 'Effort',
    vietnameseTitle: 'Nỗ Lực & Nguồn Lực',
    description: 'Ngân sách đầu tư, quy mô nhân lực và công sức cần thiết để hoàn thành mục tiêu.',
    color: '#f58220',
    gradientTop: '#fa943e',
    gradientBot: '#e07116',
    icon: LuCog,
  },
  {
    id: 'risk',
    index: 3,
    letter: 'R',
    name: 'Risk',
    vietnameseTitle: 'Quản Trị Rủi Ro',
    description: 'Mức độ dung sai cho các biến động và độ lệch kỳ vọng so với kế hoạch ban đầu.',
    color: '#d84436',
    gradientTop: '#e65345',
    gradientBot: '#c4372a',
    icon: LuTriangleAlert,
  },
  {
    id: 'time',
    index: 4,
    letter: 'T',
    name: 'Time',
    vietnameseTitle: 'Thời Gian Thực Hiện',
    description: 'Thời hạn hoàn thành, tiến độ các mốc sự kiện và tổng thời gian đưa vào vận hành.',
    color: '#4a6174',
    gradientTop: '#577287',
    gradientBot: '#3d5161',
    icon: LuClock,
  },
];

export const SQ5_DIMENSIONS_MAP: Record<Sq5DimensionId, Sq5DimensionConfig> = {
  scope: SQ5_DIMENSIONS[0],
  quality: SQ5_DIMENSIONS[1],
  effort: SQ5_DIMENSIONS[2],
  risk: SQ5_DIMENSIONS[3],
  time: SQ5_DIMENSIONS[4],
};
