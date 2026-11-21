export interface Ss5BookColorConfig {
  tail: string;
  body: string;
  spine: string;
  spineShadow: string;
  border: string;
}

export interface Ss5BookItem {
  id: string;
  index: number;
  label: string;
  vietnameseTitle: string;
  text: string;
  colors: Ss5BookColorConfig;
  iconType: 'test-quiz' | 'confidence' | 'retention' | 'focus' | 'performance';
}

// Exact paths preserved from 6_tick/SVG/1.svg and 6_tick/SVG/2.svg
export const SS5_TAIL_PATH =
  'M118.6,39.76c0-14.14,4.84-27.09,12.84-37.13c0.01-0.02,0.02-0.03,0.02-0.05c-5.07-0.78-12.94-1.81-22.6-2.3C83.34-1.03,69.37,2.6,46.98,3.9C36.03,4.53,19.89,4.77-0.13,2.43c6.27,13.77,12.54,27.54,18.8,41.3c-6.25,12.4-12.51,24.8-18.76,37.2c21.99,0.41,39.72-0.95,52.01-2.3c15.42-1.7,23.84-3.57,39.5-4.28c16.51-0.75,30.07,0.28,39.04,1.29c0-0.01-0.01-0.02-0.01-0.03C123.04,65.75,118.6,53.3,118.6,39.76z';

export const SS5_BODY_OUTLINE_PATH =
  'M375.19,81H38.2C17.14,81,0,62.83,0,40.5S17.14,0,38.2,0h336.99c1.55,0,2.8,1.25,2.8,2.8s-1.25,2.8-2.8,2.8H38.2C20.23,5.6,5.6,21.26,5.6,40.5s14.62,34.9,32.6,34.9h336.99c1.55,0,2.8,1.25,2.8,2.8S376.74,81,375.19,81z';

export const SS5_BODY_FILL_PATH =
  'M361.53,5.6H38.2C20.23,5.6,5.6,21.26,5.6,40.5s14.62,34.9,32.6,34.9h323.33c-3.14-6.85-7.64-19.21-7.57-35.26C354.02,24.46,358.41,12.39,361.53,5.6z';

export const SS5_SPINE_ARC_PATH =
  'M33.05,74.96C17.52,72.31,5.6,57.86,5.6,40.5c0-17.36,11.92-31.81,27.44-34.46c-9.29,7.14-15.5,19.92-15.5,34.46S23.76,67.82,33.05,74.96z';

// Calibrated from 720x540 reference slide:
// - Book body (2.svg) is 86.5px tall (uniform scale 86.5 / 81 = 1.0679)
// - Bookmark tail (1.svg) is 57.5px tall (uniform scale 57.5 / 81 = 0.7099), centered vertically (+14.5px)
// - Tightly cropped viewBox around the 5 staggered books keeps shadows intact without empty void
export const SS5_CANVAS_CONFIG = {
  viewBox: '86 62 556 462',
  baseY: 76,
  stepY: 86.5,
  oddTailX: 138,
  evenTailX: 104,
  oddSpineX: 222,
  evenSpineX: 188,
  tailOffsetY: 14.5,
  tailScale: 57.5 / 81,
  bodyScale: 86.5 / 81,
  tailWidth: 131.33,
  bodyWidth: 377.99,
  height: 81,
  // Safe text bounds inside 2.svg local coordinates (spine ends ~38, concave right edge starts ~354)
  textX: 64,
  textMaxWidth: 268,
};

export const SS5_BOOKS: Ss5BookItem[] = [
  {
    id: 'ss5-book-1',
    index: 1,
    label: '01',
    vietnameseTitle: 'Giải tỏa lo âu & Căng thẳng trước kỳ thi',
    text: 'You get anxious or nervous a lot right before a test or quiz.',
    iconType: 'test-quiz',
    colors: {
      tail: '#167964',
      body: '#1ea185',
      spine: '#5ee1c5',
      spineShadow: '#0e4d3f',
      border: '#167964',
    },
  },
  {
    id: 'ss5-book-2',
    index: 2,
    label: '02',
    vietnameseTitle: 'Xây dựng sự tự tin khi bước vào phòng thi',
    text: 'You don’t feel very confident when it’s time to take the test.',
    iconType: 'confidence',
    colors: {
      tail: '#77943e',
      body: '#9bbb5c',
      spine: '#c4d79e',
      spineShadow: '#4e6229',
      border: '#77943e',
    },
  },
  {
    id: 'ss5-book-3',
    index: 3,
    label: '03',
    vietnameseTitle: 'Phương pháp ghi nhớ sâu & Chuyển đổi dữ liệu',
    text: 'You don’t remember much information after you spend time studying.',
    iconType: 'retention',
    colors: {
      tail: '#c6770c',
      body: '#f29b26',
      spine: '#f7c37d',
      spineShadow: '#8c5307',
      border: '#c6770c',
    },
  },
  {
    id: 'ss5-book-4',
    index: 4,
    label: '04',
    vietnameseTitle: 'Duy trì sự tập trung cao độ & Tránh sao nhãng',
    text: 'It’s hard for you to stay focused when you try to study.',
    iconType: 'focus',
    colors: {
      tail: '#8e2b23',
      body: '#bd392f',
      spine: '#de827b',
      spineShadow: '#5c1c17',
      border: '#8e2b23',
    },
  },
  {
    id: 'ss5-book-5',
    index: 5,
    label: '05',
    vietnameseTitle: 'Tối ưu hóa kết quả thực chiến trên bài làm',
    text: 'You don’t do as well as you think you should on tests or quizzes.',
    iconType: 'performance',
    colors: {
      tail: '#333f4f',
      body: '#445469',
      spine: '#8497b0',
      spineShadow: '#212934',
      border: '#333f4f',
    },
  },
];
