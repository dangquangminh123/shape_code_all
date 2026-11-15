import type { IconType } from 'react-icons';
import { FaPerson, FaTrophy } from 'react-icons/fa6';
import { LuMedal, LuNotebookText, LuRocket } from 'react-icons/lu';

export interface Tc5Step {
  title: string;
  subtitle: string;
  description: string;
  summary: string;
  icon: IconType;
  color: string;
  shade: string;
  light: string;
  ink: string;
}

export const tc5Steps: Tc5Step[] = [
  { title: 'Title A', subtitle: 'Khởi đầu', description: 'Xác định mục tiêu, sẵn sàng cho hành trình mới.', summary: 'Chọn mục tiêu.', icon: FaPerson, color: '#383464', shade: '#10102d', light: '#6865b0', ink: '#383464' },
  { title: 'Title B', subtitle: 'Học hỏi', description: 'Tích lũy kiến thức, nuôi dưỡng những ý tưởng.', summary: 'Thêm kiến thức.', icon: LuNotebookText, color: '#2ca6d7', shade: '#008bc2', light: '#00b5e4', ink: '#1789b8' },
  { title: 'Title C', subtitle: 'Bứt phá', description: 'Biến ý tưởng thành hành động và tiến về phía trước.', summary: 'Bắt tay làm.', icon: LuRocket, color: '#57bed0', shade: '#299bb3', light: '#6bd1e2', ink: '#238b9f' },
  { title: 'Title D', subtitle: 'Tỏa sáng', description: 'Bền bỉ từng bước, ghi dấu những thành tựu mới.', summary: 'Ghi dấu mới.', icon: LuMedal, color: '#ffb900', shade: '#ff9f00', light: '#ffce46', ink: '#a16a00' },
  { title: 'Title E', subtitle: 'Vươn xa', description: 'Chia sẻ thành công và cùng chinh phục đỉnh cao.', summary: 'Cùng tiến xa.', icon: FaTrophy, color: '#ff6978', shade: '#ff435b', light: '#ff929d', ink: '#c84054' },
];
