import type { IconType } from 'react-icons';
import { LuCog, LuMonitor, LuTimer } from 'react-icons/lu';

export interface Ob3OptionConfig {
  id: string;
  index: number;
  label: string;
  title: string;
  description: string;
  primaryColor: string;
  darkColor: string;
  gradientLoop: string;
  gradientBar: string;
  icon: IconType;
}

export const OB3_OPTIONS: Ob3OptionConfig[] = [
  {
    id: 'option-01',
    index: 0,
    label: 'Option 01',
    title: 'Phát Triển Web & Di Động',
    description: 'Xây dựng giao diện hiệu năng cao, tối ưu hóa trải nghiệm người dùng trên đa nền tảng với tốc độ tải trang dưới 1s.',
    primaryColor: '#0284c7',
    darkColor: '#0369a1',
    gradientLoop: 'linear-gradient(135deg, #38bdf8, #0284c7 60%, #0369a1)',
    gradientBar: 'linear-gradient(90deg, #0284c7, #0ea5e9)',
    icon: LuMonitor,
  },
  {
    id: 'option-02',
    index: 1,
    label: 'Option 02',
    title: 'Tự Động Hóa Vận Hành',
    description: 'Thiết lập quy trình CI/CD hoàn chỉnh, kiểm thử tự động toàn diện và triển khai hạ tầng đám mây không downtime.',
    primaryColor: '#059669',
    darkColor: '#047857',
    gradientLoop: 'linear-gradient(135deg, #34d399, #059669 60%, #047857)',
    gradientBar: 'linear-gradient(90deg, #059669, #10b981)',
    icon: LuCog,
  },
  {
    id: 'option-03',
    index: 2,
    label: 'Option 03',
    title: 'Tối Ưu Tốc Độ Ship Hàng',
    description: 'Đo lường thời gian phản hồi thực tế, tinh gọn backlog và rút ngắn chu kỳ phát hành tính năng cho khách hàng.',
    primaryColor: '#d97706',
    darkColor: '#b45309',
    gradientLoop: 'linear-gradient(135deg, #fbbf24, #d97706 60%, #b45309)',
    gradientBar: 'linear-gradient(90deg, #d97706, #f59e0b)',
    icon: LuTimer,
  },
];
