/** PN10 only: editable content and matching pencil/ribbon palettes. */
export type Pn10IconName = 'search' | 'mobile' | 'people' | 'laptop' | 'briefcase';
export type Pn10Theme = 'reference' | 'silver-red';
export type Pn10StepId = 1 | 2 | 3 | 4 | 5;

export interface Pn10Palette {
  light: string;
  main: string;
  dark: string;
  text: string;
}

export interface Pn10Step {
  id: Pn10StepId;
  number: string;
  title: string;
  description: string;
  icon: Pn10IconName;
  palette: Pn10Palette;
}

export const PN10_LABEL = 'Quy trình phát triển năm bước';

// Keep five rows. The color order follows the supplied reference.
export const PN10_STEPS: readonly Pn10Step[] = [
  { id: 1, number: '01', title: 'Khám phá', description: 'Tìm hiểu nhu cầu và cơ hội phát triển.', icon: 'search', palette: { light: '#f778aa', main: '#e63777', dark: '#9b184a', text: '#ffffff' } },
  { id: 2, number: '02', title: 'Lập kế hoạch', description: 'Xây dựng lộ trình và phương án thực hiện.', icon: 'mobile', palette: { light: '#ffd577', main: '#ffad2e', dark: '#b56b0e', text: '#ffffff' } },
  { id: 3, number: '03', title: 'Kết nối', description: 'Liên kết đội ngũ, chia sẻ kiến thức.', icon: 'people', palette: { light: '#78d5ee', main: '#32aeda', dark: '#126f94', text: '#ffffff' } },
  { id: 4, number: '04', title: 'Thực hành', description: 'Ứng dụng công cụ và tối ưu hiệu quả.', icon: 'laptop', palette: { light: '#7be999', main: '#2ec65b', dark: '#13843c', text: '#ffffff' } },
  { id: 5, number: '05', title: 'Thành tựu', description: 'Hoàn thành công việc, đánh giá kết quả.', icon: 'briefcase', palette: { light: '#f78c78', main: '#d93f32', dark: '#8d251c', text: '#ffffff' } },
];

export const PN10_SILVER_RED: Readonly<Record<Pn10StepId, Pn10Palette>> = {
  1: { light: '#f2899b', main: '#da4764', dark: '#9c294a', text: '#ffffff' },
  2: { light: '#f1f4f6', main: '#c6cdd7', dark: '#8999a7', text: '#73253e' },
  3: { light: '#d74768', main: '#ae2445', dark: '#852039', text: '#ffffff' },
  4: { light: '#eef2f6', main: '#d0d9df', dark: '#9ba9b3', text: '#73253e' },
  5: { light: '#da6071', main: '#bd304b', dark: '#912139', text: '#ffffff' },
};
