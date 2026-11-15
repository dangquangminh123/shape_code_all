export interface Lm6Stage {
  title: string;
  points: [string, string];
  summaries: [string, string];
  light: string;
  shade: string;
  ink: string;
  x: number;
  captionX: number;
}

// Coordinates measured on the supplied 960 × 720 reference, not a reflowed grid.
export const lm6Stages: Lm6Stage[] = [
  { title: 'Khởi đầu', points: ['Khơi nguồn ý tưởng cho hành trình mới.', 'Xác định mục tiêu cho từng chặng đường.'], summaries: ['Ý tưởng', 'Mục tiêu'], light: '#5ad2f2', shade: '#1774b2', ink: '#087f9c', x: 19, captionX: 9 },
  { title: 'Khám phá', points: ['Tìm hiểu nhu cầu và những cơ hội mới.', 'Lắng nghe để chọn hướng đi phù hợp.'], summaries: ['Cơ hội', 'Lắng nghe'], light: '#a6d957', shade: '#4e6e0e', ink: '#557f14', x: 167, captionX: 171 },
  { title: 'Lập kế hoạch', points: ['Chia mục tiêu lớn thành từng bước nhỏ.', 'Chuẩn bị nguồn lực cho chặng tiếp theo.'], summaries: ['Chia việc', 'Nguồn lực'], light: '#ffe444', shade: '#efab00', ink: '#957000', x: 315, captionX: 326 },
  { title: 'Hành động', points: ['Biến những ý tưởng thành việc làm cụ thể.', 'Kiên trì thực hiện và theo dõi tiến độ.'], summaries: ['Thực hiện', 'Tiến độ'], light: '#ff6931', shade: '#d90c17', ink: '#b24808', x: 464, captionX: 470 },
  { title: 'Hoàn thiện', points: ['Đánh giá kết quả qua từng cột mốc nhỏ.', 'Điều chỉnh cách làm để tiến xa hơn.'], summaries: ['Đánh giá', 'Cải tiến'], light: '#ae66d8', shade: '#3c0865', ink: '#753b98', x: 613, captionX: 618 },
  { title: 'Vươn xa', points: ['Ghi nhận thành quả từ những nỗ lực.', 'Mở ra hành trình với mục tiêu lớn hơn.'], summaries: ['Thành quả', 'Vươn xa'], light: '#ef429c', shade: '#72003c', ink: '#ad2374', x: 762, captionX: 763 },
];
