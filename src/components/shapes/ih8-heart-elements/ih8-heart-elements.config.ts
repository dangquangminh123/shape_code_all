export const IH8_ASSET_BASE = '/assets/shapes/ih8-heart-elements';

export type Ih8Step = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';
export type Ih8Side = 'left' | 'right';
export type Ih8Theme = 'colorful' | 'color' | 'silver-red';
export type Ih8IconName =
  | 'chart-pie'
  | 'book-open'
  | 'lightbulb'
  | 'users'
  | 'droplet'
  | 'comments'
  | 'atom'
  | 'database';

export type Ih8MaskRole =
  | 'crownLeft'
  | 'crownRight'
  | 'shoulderLeft'
  | 'shoulderRight'
  | 'curveLeft'
  | 'curveRight'
  | 'pointLeft'
  | 'pointRight'
  | 'coreHeart';

export type Ih8Masks = Partial<Record<Ih8MaskRole, string>>;

export const IH8_MASK_FILES: Record<Ih8MaskRole, string> = {
  crownLeft: 'ih8-heart-crown-left.svg',
  crownRight: 'ih8-heart-crown-right.svg',
  shoulderLeft: 'ih8-heart-shoulder-left.svg',
  shoulderRight: 'ih8-heart-shoulder-right.svg',
  curveLeft: 'ih8-heart-curve-left.svg',
  curveRight: 'ih8-heart-curve-right.svg',
  pointLeft: 'ih8-heart-point-left.svg',
  pointRight: 'ih8-heart-point-right.svg',
  coreHeart: 'ih8-core-heart-surface.svg',
};

export interface Ih8VectorIcon {
  viewBox: string;
  path: string;
}

/** Font Awesome Free 6.7.2 SVG vectors (CC BY 4.0, Copyright 2024 Fonticons, Inc.) */
export const IH8_FA_ICONS: Record<Ih8IconName, Ih8VectorIcon> = {
  'chart-pie': {
    viewBox: '0 0 576 512',
    path: 'M304 240l0-223.4c0-9 7-16.6 16-16.6C443.7 0 544 100.3 544 224c0 9-7.6 16-16.6 16L304 240zM32 272C32 150.7 122.1 50.3 239 34.3c9.2-1.3 17 6.1 17 15.4L256 288 412.5 444.5c6.7 6.7 6.2 17.7-1.5 23.1C371.8 495.6 323.8 512 272 512C139.5 512 32 404.6 32 272zm526.4 16c9.3 0 16.6 7.8 15.4 17c-7.7 55.9-34.6 105.6-73.9 142.3c-6 5.6-15.4 5.2-21.2-.7L320 288l238.4 0z',
  },
  'book-open': {
    viewBox: '0 0 576 512',
    path: 'M249.6 471.5c10.8 3.8 22.4-4.1 22.4-15.5l0-377.4c0-4.2-1.6-8.4-5-11C247.4 52 202.4 32 144 32C93.5 32 46.3 45.3 18.1 56.1C6.8 60.5 0 71.7 0 83.8L0 454.1c0 11.9 12.8 20.2 24.1 16.5C55.6 460.1 105.5 448 144 448c33.9 0 79 14 105.6 23.5zm76.8 0C353 462 398.1 448 432 448c38.5 0 88.4 12.1 119.9 22.6c11.3 3.8 24.1-4.6 24.1-16.5l0-370.3c0-12.1-6.8-23.3-18.1-27.6C529.7 45.3 482.5 32 432 32c-58.4 0-103.4 20-123 35.6c-3.3 2.6-5 6.8-5 11L304 456c0 11.4 11.7 19.3 22.4 15.5z',
  },
  lightbulb: {
    viewBox: '0 0 384 512',
    path: 'M272 384c9.6-31.9 29.5-59.1 49.2-86.2c0 0 0 0 0 0c5.2-7.1 10.4-14.2 15.4-21.4c19.8-28.5 31.4-63 31.4-100.3C368 78.8 289.2 0 192 0S16 78.8 16 176c0 37.3 11.6 71.9 31.4 100.3c5 7.2 10.2 14.3 15.4 21.4c0 0 0 0 0 0c19.8 27.1 39.7 54.4 49.2 86.2l160 0zM192 512c44.2 0 80-35.8 80-80l0-16-160 0 0 16c0 44.2 35.8 80 80 80zM112 176c0 8.8-7.2 16-16 16s-16-7.2-16-16c0-61.9 50.1-112 112-112c8.8 0 16 7.2 16 16s-7.2 16-16 16c-44.2 0-80 35.8-80 80z',
  },
  users: {
    viewBox: '0 0 640 512',
    path: 'M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192l42.7 0c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0L21.3 320C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7l42.7 0C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3l-213.3 0zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352l117.3 0C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7l-330.7 0c-14.7 0-26.7-11.9-26.7-26.7z',
  },
  droplet: {
    viewBox: '0 0 384 512',
    path: 'M192 512C86 512 0 426 0 320C0 228.8 130.2 57.7 166.6 11.7C172.6 4.2 181.5 0 191.1 0l1.8 0c9.6 0 18.5 4.2 24.5 11.7C253.8 57.7 384 228.8 384 320c0 106-86 192-192 192zM96 336c0-8.8-7.2-16-16-16s-16 7.2-16 16c0 61.9 50.1 112 112 112c8.8 0 16-7.2 16-16s-7.2-16-16-16c-44.2 0-80-35.8-80-80z',
  },
  comments: {
    viewBox: '0 0 640 512',
    path: 'M208 352c114.9 0 208-78.8 208-176S322.9 0 208 0S0 78.8 0 176c0 38.6 14.7 74.3 39.6 103.4c-3.5 9.4-8.7 17.7-14.2 24.7c-4.8 6.2-9.7 11-13.3 14.3c-1.8 1.6-3.3 2.9-4.3 3.7c-.5 .4-.9 .7-1.1 .8l-.2 .2s0 0 0 0s0 0 0 0C1 327.2-1.4 334.4 .8 340.9S9.1 352 16 352c21.8 0 43.8-5.6 62.1-12.5c9.2-3.5 17.8-7.4 25.2-11.4C134.1 343.3 169.8 352 208 352zM448 176c0 112.3-99.1 196.9-216.5 207C255.8 457.4 336.4 512 432 512c38.2 0 73.9-8.7 104.7-23.9c7.5 4 16 7.9 25.2 11.4c18.3 6.9 40.3 12.5 62.1 12.5c6.9 0 13.1-4.5 15.2-11.1c2.1-6.6-.2-13.8-5.8-17.9c0 0 0 0 0 0s0 0 0 0l-.2-.2c-.2-.2-.6-.4-1.1-.8c-1-.8-2.5-2-4.3-3.7c-3.6-3.3-8.5-8.1-13.3-14.3c-5.5-7-10.7-15.4-14.2-24.7c24.9-29 39.6-64.7 39.6-103.4c0-92.8-84.9-168.9-192.6-175.5c.4 5.1 .6 10.3 .6 15.5z',
  },
  atom: {
    viewBox: '0 0 512 512',
    path: 'M256 398.8c-11.8 5.1-23.4 9.7-34.9 13.5c16.7 33.8 31 35.7 34.9 35.7s18.1-1.9 34.9-35.7c-11.4-3.9-23.1-8.4-34.9-13.5zM446 256c33 45.2 44.3 90.9 23.6 128c-20.2 36.3-62.5 49.3-115.2 43.2c-22 52.1-55.6 84.8-98.4 84.8s-76.4-32.7-98.4-84.8c-52.7 6.1-95-6.8-115.2-43.2C21.7 346.9 33 301.2 66 256c-33-45.2-44.3-90.9-23.6-128c20.2-36.3 62.5-49.3 115.2-43.2C179.6 32.7 213.2 0 256 0s76.4 32.7 98.4 84.8c52.7-6.1 95 6.8 115.2 43.2c20.7 37.1 9.4 82.8-23.6 128zm-65.8 67.4c-1.7 14.2-3.9 28-6.7 41.2c31.8 1.4 38.6-8.7 40.2-11.7c2.3-4.2 7-17.9-11.9-48.1c-6.8 6.3-14 12.5-21.6 18.6zm-6.7-175.9c2.8 13.1 5 26.9 6.7 41.2c7.6 6.1 14.8 12.3 21.6 18.6c18.9-30.2 14.2-44 11.9-48.1c-1.6-2.9-8.4-13-40.2-11.7zM290.9 99.7C274.1 65.9 259.9 64 256 64s-18.1 1.9-34.9 35.7c11.4 3.9 23.1 8.4 34.9 13.5c11.8-5.1 23.4-9.7 34.9-13.5zm-159 88.9c1.7-14.3 3.9-28 6.7-41.2c-31.8-1.4-38.6 8.7-40.2 11.7c-2.3 4.2-7 17.9 11.9 48.1c6.8-6.3 14-12.5 21.6-18.6zM110.2 304.8C91.4 335 96 348.7 98.3 352.9c1.6 2.9 8.4 13 40.2 11.7c-2.8-13.1-5-26.9-6.7-41.2c-7.6-6.1-14.8-12.3-21.6-18.6zM336 256a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zm-80-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z',
  },
  database: {
    viewBox: '0 0 448 512',
    path: 'M448 80l0 48c0 44.2-100.3 80-224 80S0 172.2 0 128L0 80C0 35.8 100.3 0 224 0S448 35.8 448 80zM393.2 214.7c20.8-7.4 39.9-16.9 54.8-28.6L448 288c0 44.2-100.3 80-224 80S0 332.2 0 288L0 186.1c14.9 11.8 34 21.2 54.8 28.6C99.7 230.7 159.5 240 224 240s124.3-9.3 169.2-25.3zM0 346.1c14.9 11.8 34 21.2 54.8 28.6C99.7 390.7 159.5 400 224 400s124.3-9.3 169.2-25.3c20.8-7.4 39.9-16.9 54.8-28.6l0 85.9c0 44.2-100.3 80-224 80S0 476.2 0 432l0-85.9z',
  },
};

export const IH8_STAR_ICON: Ih8VectorIcon = {
  viewBox: '0 0 576 512',
  path: 'M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z',
};

export interface Ih8Item {
  step: Ih8Step;
  side: Ih8Side;
  maskRole: Ih8MaskRole;
  icon: Ih8IconName;
  title: string;
  description: string;
}

export const IH8_ITEMS: Ih8Item[] = [
  { step: '1', side: 'left', maskRole: 'crownLeft', icon: 'chart-pie', title: 'TƯ DUY NỀN TẢNG', description: 'Xác định mục tiêu, nắm bắt dữ liệu và nhận diện vấn đề trọng tâm.' },
  { step: '2', side: 'right', maskRole: 'crownRight', icon: 'book-open', title: 'KHÁM PHÁ KIẾN THỨC', description: 'Chọn lọc tài liệu, hệ thống hóa những điều thực sự quan trọng.' },
  { step: '3', side: 'left', maskRole: 'shoulderLeft', icon: 'lightbulb', title: 'KHƠI NGUỒN Ý TƯỞNG', description: 'Mở rộng góc nhìn, thử những cách tiếp cận mới và sáng tạo.' },
  { step: '4', side: 'right', maskRole: 'shoulderRight', icon: 'users', title: 'KẾT NỐI ĐỘI NHÓM', description: 'Trao đổi rõ ràng, phối hợp linh hoạt và cùng chia sẻ trách nhiệm.' },
  { step: '5', side: 'left', maskRole: 'curveLeft', icon: 'droplet', title: 'THỬ NGHIỆM THỰC TẾ', description: 'Chuyển ý tưởng thành hành động và kiểm chứng từng giả thuyết.' },
  { step: '6', side: 'right', maskRole: 'curveRight', icon: 'comments', title: 'PHẢN HỒI NHANH', description: 'Tiếp nhận nhận xét, điều chỉnh và liên tục cải thiện chất lượng.' },
  { step: '7', side: 'left', maskRole: 'pointLeft', icon: 'atom', title: 'TỐI UY QUY TRÌNH'.replace('TỐI UY', 'TỐI ƯU'), description: 'Tinh gọn từng bước, giảm thao tác thừa và tăng tính nhất quán.' },
  { step: '8', side: 'right', maskRole: 'pointRight', icon: 'database', title: 'LƯU TRỮ KẾT QUẢ', description: 'Tổng hợp dữ liệu, chuẩn hóa và sẵn sàng tái sử dụng sau này.' },
];

export const IH8_LEFT_ITEMS = IH8_ITEMS.filter(item => item.side === 'left');
export const IH8_RIGHT_ITEMS = IH8_ITEMS.filter(item => item.side === 'right');
