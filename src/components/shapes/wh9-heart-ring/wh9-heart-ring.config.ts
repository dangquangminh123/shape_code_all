import type { IconType } from 'react-icons';
import {
  FaBoltLightning,
  FaCompassDrafting,
  FaEarListen,
  FaHandsHoldingCircle,
  FaSeedling,
  FaShieldHeart,
} from 'react-icons/fa6';
import { LuHeartHandshake } from 'react-icons/lu';

export type Wh9Theme = 'reference' | 'silver-red';

export interface Wh9Step {
  index: number;
  number: string;
  title: string;
  description: string;
  icon: IconType;
  start: string;
  end: string;
  /** Coordinates expressed in the shared 640x640 coordinate system of the SVG masks. */
  num: [number, number];
  titlePos: [number, number];
  descPos: [number, number];
  descWidth: number;
}

/**
 * Every number, title, and description block is positioned strictly inside its
 * curved pinwheel sector outside the central heart halo on the 640x640 artboard,
 * matching the reference Infographic layout.
 */
export const WH9_STEPS: Wh9Step[] = [
  {
    index: 0,
    number: '01',
    title: 'LẮNG NGHE',
    description: 'Thấu hiểu mong muốn ngay từ điểm chạm đầu tiên.',
    icon: FaEarListen,
    start: '#ffd248',
    end: '#f6c330',
    num: [380, 88],
    titlePos: [228, 106],
    descPos: [228, 130],
    descWidth: 118,
  },
  {
    index: 1,
    number: '02',
    title: 'ĐỊNH HÌNH',
    description: 'Thiết kế giải pháp sát đúng với từng kỳ vọng.',
    icon: FaCompassDrafting,
    start: '#ffa20d',
    end: '#f58f00',
    num: [556, 264],
    titlePos: [406, 148],
    descPos: [460, 180],
    descWidth: 96,
  },
  {
    index: 2,
    number: '03',
    title: 'PHẢN HỒI',
    description: 'Xử lý linh hoạt qua quy trình rõ ràng, mạch lạc.',
    icon: FaBoltLightning,
    start: '#fa4c16',
    end: '#ec3b09',
    num: [490, 492],
    titlePos: [468, 336],
    descPos: [444, 368],
    descWidth: 114,
  },
  {
    index: 3,
    number: '04',
    title: 'CAM KẾT',
    description: 'Bảo chứng chất lượng minh bạch trong mỗi ngày.',
    icon: FaShieldHeart,
    start: '#1db4f8',
    end: '#0a9fe7',
    num: [248, 558],
    titlePos: [308, 492],
    descPos: [298, 518],
    descWidth: 122,
  },
  {
    index: 4,
    number: '05',
    title: 'ĐỒNG HÀNH',
    description: 'Chăm sóc tận tình xuyên suốt mọi chặng hành trình.',
    icon: FaHandsHoldingCircle,
    start: '#25d2a1',
    end: '#12be8e',
    num: [82, 378],
    titlePos: [110, 400],
    descPos: [138, 430],
    descWidth: 116,
  },
  {
    index: 5,
    number: '06',
    title: 'LAN TỎA',
    description: 'Bồi đắp gắn kết bền lâu và nhân rộng giá trị mới.',
    icon: FaSeedling,
    start: '#89c250',
    end: '#74af3d',
    num: [148, 150],
    titlePos: [88, 202],
    descPos: [62, 234],
    descWidth: 100,
  },
];

export const WH9_CENTER = {
  icon: LuHeartHandshake,
  heading: 'TÂM ĐIỂM NIỀM TIN',
  description: 'Sáu mắt xích nuôi dưỡng trải nghiệm gắn bó bền lâu và trọn vẹn mỗi ngày.',
};
