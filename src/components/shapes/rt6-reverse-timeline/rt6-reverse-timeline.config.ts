export interface Rt6StepConfig {
  number: string;
  stepIndex: number;
  title: string;
  description: string;
  gradientTop: string;
  gradientMid: string;
  gradientBot: string;
  foldColor: string;
  badgeBg: string;
}

export const RT6_STEPS: Rt6StepConfig[] = [
  {
    number: '06',
    stepIndex: 0,
    title: 'Nghiệm Thu Bàn Giao',
    description: 'Nghiệm thu toàn diện tính năng, kiểm thử người dùng và bàn giao sản phẩm sẵn sàng.',
    gradientTop: '#90caf9',
    gradientMid: '#1e88e5',
    gradientBot: '#0d47a1',
    foldColor: '#0a3675',
    badgeBg: '#0d47a1',
  },
  {
    number: '05',
    stepIndex: 1,
    title: 'Tối Ưu & Tinh Chỉnh',
    description: 'Đo lường các chỉ số Core Web Vitals, profiling bộ nhớ và tối ưu thời gian tải trang.',
    gradientTop: '#ffccbc',
    gradientMid: '#f4511e',
    gradientBot: '#b72a08',
    foldColor: '#7c1d06',
    badgeBg: '#b72a08',
  },
  {
    number: '04',
    stepIndex: 2,
    title: 'Kiểm Thử Hệ Thống',
    description: 'Thực thi kiểm thử tự động E2E, unit test và bảo đảm độ bao phủ mã nguồn trên 90%.',
    gradientTop: '#a5d6a7',
    gradientMid: '#43a047',
    gradientBot: '#1b5e20',
    foldColor: '#103d14',
    badgeBg: '#1b5e20',
  },
  {
    number: '03',
    stepIndex: 3,
    title: 'Lập Trình Tính Năng',
    description: 'Triển khai code logic nghiệp vụ, hoàn thiện UI components và kết nối API an toàn.',
    gradientTop: '#80deea',
    gradientMid: '#00acc1',
    gradientBot: '#006064',
    foldColor: '#003b3d',
    badgeBg: '#006064',
  },
  {
    number: '02',
    stepIndex: 4,
    title: 'Thiết Kế Kiến Trúc',
    description: 'Quy hoạch cấu trúc thư mục, chuẩn hóa hợp đồng dữ liệu DTO và mô hình hóa CSDL.',
    gradientTop: '#ce93d8',
    gradientMid: '#8e24aa',
    gradientBot: '#4a148c',
    foldColor: '#2e0b57',
    badgeBg: '#4a148c',
  },
  {
    number: '01',
    stepIndex: 5,
    title: 'Khởi Tạo Ý Tưởng',
    description: 'Phân tích yêu cầu bài toán, xác định mục tiêu cốt lõi và xây dựng lộ trình chi tiết.',
    gradientTop: '#c5e1a5',
    gradientMid: '#7cb342',
    gradientBot: '#33691e',
    foldColor: '#1f4211',
    badgeBg: '#33691e',
  },
];
