import type { IconType } from 'react-icons';
import { FaBrain, FaLightbulb, FaLocationDot } from 'react-icons/fa6';

export const KC3_ASSET_BASE = '/assets/shapes/kc3-knowledge-capture';

export const KC3_MASK_FILES = {
  cap: 'kc3-cap-mask.svg',
  bannerFill: 'kc3-banner-fill-mask.svg',
  bannerFrame: 'kc3-banner-frame-mask.svg',
} as const;

export type Kc3MaskRole = keyof typeof KC3_MASK_FILES;
export type Kc3Masks = Partial<Record<Kc3MaskRole, string>>;

export interface Kc3StageItem {
  id: string;
  index: number;
  title: string;
  description: string;
  icon: IconType;
  colors: {
    capLight: string;
    capDark: string;
    bodyLight: string;
    bodyDark: string;
    frame: string;
    glow: string;
  };
}

export const KC3_STAGES: readonly Kc3StageItem[] = [
  {
    id: 'kc3-identifying',
    index: 0,
    title: 'Nhận diện tri thức',
    description:
      'Bắt đầu bằng việc xác định tri thức quy trình và kinh nghiệm cốt lõi mang tính quyết định, từ đó chuẩn hóa thành tài liệu nền tảng.',
    icon: FaLightbulb,
    colors: {
      capLight: '#087d9c',
      capDark: '#045a73',
      bodyLight: '#08abd1',
      bodyDark: '#008bb0',
      frame: '#046a87',
      glow: 'rgba(8, 171, 209, 0.28)',
    },
  },
  {
    id: 'kc3-locating',
    index: 1,
    title: 'Định vị nguồn lực',
    description:
      'Khoanh vùng nơi lưu giữ chuyên môn thực tế và bảo toàn giá trị cốt lõi nhằm tạo nền móng vững chắc cho chiến lược phát triển dài hạn.',
    icon: FaLocationDot,
    colors: {
      capLight: '#b58906',
      capDark: '#8c6803',
      bodyLight: '#f6bc0d',
      bodyDark: '#df9f04',
      frame: '#9c7504',
      glow: 'rgba(246, 188, 13, 0.28)',
    },
  },
  {
    id: 'kc3-collecting',
    index: 2,
    title: 'Thu thập & Tích lũy',
    description:
      'Hệ thống hóa dữ liệu vận hành thiết yếu để nâng cao hiệu suất công việc liên tục và năng lực thích ứng của toàn tổ chức.',
    icon: FaBrain,
    colors: {
      capLight: '#a6071f',
      capDark: '#7a0415',
      bodyLight: '#e30b2c',
      bodyDark: '#c20722',
      frame: '#8c061a',
      glow: 'rgba(227, 11, 44, 0.28)',
    },
  },
] as const;
