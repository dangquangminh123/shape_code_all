export type StepStackIconKey = 'compass' | 'rocket' | 'layers';

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
    icon: 'compass',
    ariaLabel: 'Tầng 01 - Khởi tạo nền tảng',
  },
  {
    step: 2,
    levelClass: 'level-2',
    numberLabel: '02',
    icon: 'rocket',
    ariaLabel: 'Tầng 02 - Thực hành và phát triển',
  },
  {
    step: 3,
    levelClass: 'level-3',
    numberLabel: '03',
    icon: 'layers',
    ariaLabel: 'Tầng 03 - Nền tảng trụ cột',
  },
];

export const STEP_STACK_CONTENTS: StepStackContentItem[] = [
  {
    step: 1,
    contentClass: 'content-1',
    icon: 'compass',
    title: 'KHỞI TẠO NỀN TẢNG',
    description:
      'Xây dựng mục tiêu rõ ràng, hình thành tư duy học tập đúng hướng và tạo nền móng kiến thức bền vững cho chặng đường tiếp theo.',
  },
  {
    step: 2,
    contentClass: 'content-2',
    icon: 'rocket',
    title: 'THỰC HÀNH & PHÁT TRIỂN',
    description:
      'Đẩy mạnh thực hành, hoàn thiện kỹ năng, tăng khả năng ứng dụng thực tế và không ngừng cải tiến phương pháp để đạt hiệu quả dài lâu.',
  },
];

