import type { IconType } from 'react-icons';
import { LuDroplets, LuFlower2, LuShieldCheck, LuSparkles } from 'react-icons/lu';

export interface Pb4Step {
  title: string;
  description: string;
  summary: string;
  icon: IconType;
  color: string;
  light: string;
  shade: string;
  ink: string;
}

export const pb4Steps: Pb4Step[] = [
  { title: 'Làm sạch', description: 'Nhẹ nhàng làm sạch bụi bẩn, giữ làn da thông thoáng và sẵn sàng đón dưỡng chất.', summary: 'Làm sạch dịu nhẹ, cho làn da thông thoáng.', icon: LuDroplets, color: '#087ca4', light: '#168eb4', shade: '#005775', ink: '#fff' },
  { title: 'Cấp ẩm', description: 'Bổ sung độ ẩm cần thiết, giúp làn da luôn mềm mại và căng mịn mỗi ngày.', summary: 'Bổ sung độ ẩm, giữ da mềm mại mỗi ngày.', icon: LuFlower2, color: '#ac0b73', light: '#bd1684', shade: '#89005c', ink: '#fff' },
  { title: 'Nuôi dưỡng', description: 'Nâng niu làn da bằng dưỡng chất, duy trì vẻ tươi sáng và sức sống tự nhiên.', summary: 'Dưỡng chất cho làn da tươi sáng, rạng rỡ.', icon: LuSparkles, color: '#e52840', light: '#f23851', shade: '#d51b32', ink: '#fff' },
  { title: 'Bảo vệ', description: 'Chăm sóc đều đặn và bảo vệ da, để bạn luôn tự tin trong từng khoảnh khắc.', summary: 'Chăm sóc đều đặn, tự tin trong mỗi ngày.', icon: LuShieldCheck, color: '#ffca35', light: '#ffde66', shade: '#ffb420', ink: '#684300' },
];
