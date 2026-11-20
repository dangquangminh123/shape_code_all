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
  rightFaceColor: string;
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
    primaryColor: '#1d6bb7',
    rightFaceColor: '#2482dc',
    foldColor: '#124373',
    lightColor: '#3b9bf5',
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
    primaryColor: '#26a669',
    rightFaceColor: '#2ec77d',
    foldColor: '#186942',
    lightColor: '#42dc92',
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
    primaryColor: '#c99124',
    rightFaceColor: '#e2aa38',
    foldColor: '#7d5710',
    lightColor: '#f1bd4f',
    icon: LuTimer,
  },
];
