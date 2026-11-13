/** Module 06 — dữ liệu độc lập, không tái sử dụng class/asset của 5 module trước. */
export type Sr6StepId = 1 | 2 | 3 | 4 | 5 | 6;

export interface Sr6Step {
  id: Sr6StepId;
  number: string;
  title: string;
  description: string;
  icon: 'gears' | 'envelope' | 'chart' | 'globe' | 'share' | 'clock';
}

export const SR6_STEPS: readonly Sr6Step[] = [
  { id: 1, number: '01', title: 'Khởi tạo ý tưởng', description: 'Xác định vấn đề, đối tượng mục tiêu và giá trị cốt lõi của dự án.', icon: 'gears' },
  { id: 2, number: '02', title: 'Kết nối đội ngũ', description: 'Tập hợp nhân sự phù hợp, thống nhất vai trò và cơ chế phối hợp.', icon: 'envelope' },
  { id: 3, number: '03', title: 'Phân tích thị trường', description: 'Đo lường nhu cầu, tìm hiểu đối thủ và xây dựng chiến lược.', icon: 'chart' },
  { id: 4, number: '04', title: 'Phát triển sản phẩm', description: 'Hoàn thiện giải pháp mẫu, thử nghiệm và cải thiện trải nghiệm.', icon: 'globe' },
  { id: 5, number: '05', title: 'Mở rộng kết nối', description: 'Xây dựng mạng lưới đối tác, khách hàng và kênh phân phối.', icon: 'share' },
  { id: 6, number: '06', title: 'Đánh giá và bứt phá', description: 'Theo dõi chỉ số, tối ưu nguồn lực và chuẩn bị tăng trưởng.', icon: 'clock' },
] as const;
