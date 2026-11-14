export type StepStackIconKey = 'droplets' | 'sparkles' | 'heart';

export interface StepStackLevelItem {
  step: number;
  levelClass: string;
  numberLabel: string;
  icon: StepStackIconKey;
  ariaLabel: string;
}

export interface StepStackContentItem {
  step: number;
  contentClass: string;
  icon: StepStackIconKey;
  title: string;
  description: string;
}

export const STEP_STACK_LEVELS: StepStackLevelItem[] = [
  {
    step: 1,
    levelClass: 'level-1',
    numberLabel: '01',
    icon: 'droplets',
    ariaLabel: 'Son dưỡng môi 01 - Dưỡng môi mềm mịn',
  },
  {
    step: 2,
    levelClass: 'level-2',
    numberLabel: '02',
    icon: 'sparkles',
    ariaLabel: 'Son dưỡng môi 02 - Sắc môi tươi tắn',
  },
  {
    step: 3,
    levelClass: 'level-3',
    numberLabel: '03',
    icon: 'heart',
    ariaLabel: 'Son dưỡng môi 03 - Nâng niu đôi môi mỗi ngày',
  },
];

export const STEP_STACK_CONTENTS: StepStackContentItem[] = [
  {
    step: 1,
    contentClass: 'content-1',
    icon: 'droplets',
    title: 'DƯỠNG MÔI MỀM MỊN',
    description:
      'Nâng niu đôi môi với lớp son dưỡng mỏng nhẹ, giúp giữ ẩm và làm mềm môi khô. Thoa nhẹ mỗi ngày để đôi môi luôn mịn màng, dễ chịu.',
  },
  {
    step: 2,
    contentClass: 'content-2',
    icon: 'sparkles',
    title: 'SẮC MÔI TƯƠI TẮN',
    description:
      'Một chút sắc hồng tự nhiên, một lớp bóng nhẹ tinh tế — tôn vẻ xinh tươi của đôi môi. Dùng riêng để trang điểm nhẹ nhàng hoặc làm lớp nền trước son màu.',
  },
];

