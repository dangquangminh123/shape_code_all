import type { IconType } from 'react-icons';
import { LuCog, LuMonitor, LuTimer } from 'react-icons/lu';

export interface Ob3OptionConfig {
  id: string;
  index: number;
  label: string;
  title: string;
  subtext: string;
  subtext2: string;
  description: string;
  primaryColor: string;
  darkColor: string;
  foldColor: string;
  lightColor: string;
  icon: IconType;
}

export const OB3_OPTIONS: Ob3OptionConfig[] = [
  {
    id: 'option-01',
    index: 0,
    label: 'Option 01',
    title: 'Phát Triển Web & Di Động',
    subtext: 'Kiến trúc linh hoạt',
    subtext2: 'chuẩn công nghệ mới',
    description: 'Xây dựng giao diện hiệu năng cao, tối ưu hóa trải nghiệm người dùng với tốc độ phản hồi tức thì.',
    primaryColor: '#0284c7',
    darkColor: '#0369a1',
    foldColor: '#0c2340',
    lightColor: '#38bdf8',
    icon: LuMonitor,
  },
  {
    id: 'option-02',
    index: 1,
    label: 'Option 02',
    title: 'Tự Động Hóa Vận Hành',
    subtext: 'Triển khai tự động',
    subtext2: 'không gián đoạn 24/7',
    description: 'Thiết lập quy trình CI/CD hoàn chỉnh, kiểm thử tự động toàn diện và triển khai không downtime.',
    primaryColor: '#059669',
    darkColor: '#047857',
    foldColor: '#04281f',
    lightColor: '#34d399',
    icon: LuCog,
  },
  {
    id: 'option-03',
    index: 2,
    label: 'Option 03',
    title: 'Tối Ưu Tốc Độ Ship Hàng',
    subtext: 'Đo lường thời gian thực',
    subtext2: 'tinh gọn chu kỳ',
    description: 'Đo lường thời gian phản hồi thực tế, tinh gọn backlog và rút ngắn chu kỳ phát hành tính năng.',
    primaryColor: '#d97706',
    darkColor: '#b45309',
    foldColor: '#451a03',
    lightColor: '#fbbf24',
    icon: LuTimer,
  },
];
