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
    gradientTop: '#64b5f6',
    gradientMid: '#1976d2',
    gradientBot: '#0d47a1',
    foldColor: '#0a3875',
    badgeBg: '#0d47a1',
  },
  {
    number: '05',
    stepIndex: 1,
    title: 'Tối Ưu & Tinh Chỉnh',
    description: 'Đo lường các chỉ số Core Web Vitals, profiling bộ nhớ và tối ưu thời gian tải trang.',
    gradientTop: '#ffb74d',
    gradientMid: '#f57c00',
    gradientBot: '#d84315',
    foldColor: '#8c2b0e',
    badgeBg: '#bf360c',
  },
  {
    number: '04',
    stepIndex: 2,
    title: 'Kiểm Thử Hệ Thống',
    description: 'Thực thi kiểm thử tự động E2E, unit test và bảo đảm độ bao phủ mã nguồn trên 90%.',
    gradientTop: '#81c784',
    gradientMid: '#388e3c',
    gradientBot: '#1b5e20',
    foldColor: '#123e16',
    badgeBg: '#1b5e20',
  },
  {
    number: '03',
    stepIndex: 3,
    title: 'Lập Trình Tính Năng',
    description: 'Triển khai code logic nghiệp vụ, hoàn thiện UI components và kết nối API an toàn.',
    gradientTop: '#4dd0e1',
    gradientMid: '#0097a7',
    gradientBot: '#006064',
    foldColor: '#003e42',
    badgeBg: '#006064',
  },
  {
    number: '02',
    stepIndex: 4,
    title: 'Thiết Kế Kiến Trúc',
    description: 'Quy hoạch cấu trúc thư mục, chuẩn hóa hợp đồng dữ liệu DTO và mô hình hóa CSDL.',
    gradientTop: '#ba68c8',
    gradientMid: '#7b1fa2',
    gradientBot: '#4a148c',
    foldColor: '#300d5a',
    badgeBg: '#4a148c',
  },
  {
    number: '01',
    stepIndex: 5,
    title: 'Khởi Tạo Ý Tưởng',
    description: 'Phân tích yêu cầu bài toán, xác định mục tiêu cốt lõi và xây dựng lộ trình chi tiết.',
    gradientTop: '#aed581',
    gradientMid: '#689f38',
    gradientBot: '#33691e',
    foldColor: '#204313',
    badgeBg: '#33691e',
  },
];
