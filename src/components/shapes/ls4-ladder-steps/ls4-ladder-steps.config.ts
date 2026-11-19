import type { IconType } from 'react-icons';
import { LuHammer, LuLightbulb, LuRocket, LuTrendingUp } from 'react-icons/lu';

export interface Ls4StepColors {
  iconBox: string;
  textBox: string;
  topIcon: string;
  topText: string;
  sideFacet: string;
  highlight: string;
  ink: string;
}

export interface Ls4StepCoords {
  leftPercent: number;
  topPercent: number;
}

export interface Ls4Step {
  id: string;
  stepNumber: number;
  /** Nhãn ngắn hiển thị trên mặt nghiêng phía trên. */
  label: string;
  /** Tiêu đề đầy đủ, dùng cho aria-label và phần chi tiết khi chọn. */
  title: string;
  /** Mô tả chính hiển thị trên mặt trước. */
  description: string;
  /** Ghi chú bổ sung, chỉ hiện khi bậc thang được chọn. */
  detail: string;
  icon: IconType;
  colors: Ls4StepColors;
  coords: Ls4StepCoords;
}

/* Hệ tọa độ tham chiếu 720 × 540: mỗi bậc dịch phải 40px và nâng lên 100px. */
export const ls4Steps: Ls4Step[] = [
  {
    id: 'idea',
    stepNumber: 1,
    label: 'Ý tưởng',
    title: 'Khám phá ý tưởng',
    description:
      'Lắng nghe người dùng, xác định vấn đề cốt lõi và phác thảo giải pháp có thể kiểm chứng nhanh.',
    detail: 'Đầu ra: bản mô tả vấn đề, chân dung khách hàng và giả thuyết giá trị.',
    icon: LuLightbulb,
    colors: {
      iconBox: '#1d3557',
      textBox: '#274c77',
      topIcon: '#14253d',
      topText: '#1b3a5c',
      sideFacet: '#6b8fb8',
      highlight: '#a9c3e0',
      ink: '#0f1f33',
    },
    coords: { leftPercent: (77 / 720) * 100, topPercent: (392 / 540) * 100 },
  },
  {
    id: 'build',
    stepNumber: 2,
    label: 'Xây dựng',
    title: 'Xây dựng sản phẩm mẫu',
    description:
      'Thiết kế và phát triển phiên bản tối thiểu, ưu tiên tính năng mang lại giá trị rõ ràng nhất.',
    detail: 'Đầu ra: MVP chạy được, bộ kiểm thử cơ bản và kế hoạch thử nghiệm.',
    icon: LuHammer,
    colors: {
      iconBox: '#0b6e85',
      textBox: '#118ab2',
      topIcon: '#07505f',
      topText: '#0a6378',
      sideFacet: '#6cc4dc',
      highlight: '#b3e3f0',
      ink: '#053b47',
    },
    coords: { leftPercent: (117 / 720) * 100, topPercent: (292 / 540) * 100 },
  },
  {
    id: 'launch',
    stepNumber: 3,
    label: 'Ra mắt',
    title: 'Ra mắt thị trường',
    description:
      'Đưa sản phẩm đến nhóm khách hàng đầu tiên, đo lường phản hồi và điều chỉnh liên tục.',
    detail: 'Đầu ra: người dùng thật, số liệu kích hoạt và danh sách cải tiến ưu tiên.',
    icon: LuRocket,
    colors: {
      iconBox: '#c4553b',
      textBox: '#e76f51',
      topIcon: '#8f3b28',
      topText: '#b04a33',
      sideFacet: '#f4a68f',
      highlight: '#fbd3c6',
      ink: '#5c2416',
    },
    coords: { leftPercent: (156 / 720) * 100, topPercent: (192 / 540) * 100 },
  },
  {
    id: 'scale',
    stepNumber: 4,
    label: 'Mở rộng',
    title: 'Mở rộng và tăng trưởng',
    description:
      'Tối ưu vận hành, mở rộng kênh phân phối và xây dựng đội ngũ để tăng trưởng bền vững.',
    detail: 'Đầu ra: quy trình lặp lại được, doanh thu ổn định và lộ trình dài hạn.',
    icon: LuTrendingUp,
    colors: {
      iconBox: '#b87a0f',
      textBox: '#d99423',
      topIcon: '#83570a',
      topText: '#a8700d',
      sideFacet: '#f2c674',
      highlight: '#fae3b4',
      ink: '#4f3505',
    },
    coords: { leftPercent: (196 / 720) * 100, topPercent: (92 / 540) * 100 },
  },
];
