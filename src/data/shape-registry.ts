export interface ShapeAssetItem {
  role: string;
  level: number;
  prefixedFileName: string;
  dimensions: string;
  description: string;
}

export interface ShapeTemplateMeta {
  id: string;
  prefix: string;
  name: string;
  vietnameseTitle: string;
  description: string;
  status: 'ready' | 'upcoming';
  route: string;
  publicSvgFolder: string;
  componentSourceFolder: string;
  assets: ShapeAssetItem[];
}

export const SHAPE_TEMPLATES_REGISTRY: ShapeTemplateMeta[] = [
  {
    id: 'step-stack-demo',
    prefix: 'ssd',
    name: 'Step Stack Demo',
    vietnameseTitle: 'UI Shape 3 Tầng (Stack Trái – Nội Dung Phải)',
    description:
      'Cụm 3 khối shape xếp tầng dạng totem bên trái kết hợp 2 khối nội dung so le bên phải. Tách 3 lớp (stroke + fill + content), mask SVG, drop-shadow bám biên và liên kết hover 2 chiều.',
    status: 'ready',
    route: '/shapes/step-stack-demo',
    publicSvgFolder: 'public/assets/shapes/step-stack-demo/',
    componentSourceFolder: 'src/components/shapes/step-stack-demo/',
    assets: [
      {
        role: 'Tầng 1 (Top - Đỉnh)',
        level: 1,
        prefixedFileName: 'ssd-stack-top.svg',
        dimensions: '110 × 162,35 px (tỉ lệ cơ sở, co giãn theo viewport)',
        description: 'Khối nhỏ nhất trên cùng, nghiêng chéo lên trên, màu đỏ sáng nổi bật (01).',
      },
      {
        role: 'Tầng 2 (Mid - Giữa)',
        level: 2,
        prefixedFileName: 'ssd-stack-mid.svg',
        dimensions: '168 × 117,69 px (tỉ lệ cơ sở, co giãn theo viewport)',
        description: 'Khối trung gian ở giữa, màu đỏ mận / crimson cân bằng thị giác (02).',
      },
      {
        role: 'Tầng 3 (Base - Chân đế)',
        level: 3,
        prefixedFileName: 'ssd-stack-base.svg',
        dimensions: '216 × 214,08 px (tỉ lệ cơ sở, co giãn theo viewport)',
        description: 'Khối lớn nhất dưới cùng làm trụ đỡ cho toàn cụm, màu xanh thép (03).',
      },
    ],
  },
  {
    id: 'ar5-arrow-ribbon',
    prefix: 'ar5',
    name: 'AR5 — Arrow Ribbon',
    vietnameseTitle: '5 hàng mũi tên gradient độc lập',
    description:
      'Huy hiệu bạc, tab số và icon SVG inline. Ba mask SVG gốc đặt trực tiếp trong folder tài nguyên riêng của AR5.',
    status: 'ready',
    route: '/shapes/ar5-arrow-ribbon',
    publicSvgFolder: 'public/assets/shapes/ar5-arrow-ribbon/',
    componentSourceFolder: 'src/components/shapes/ar5-arrow-ribbon/',
    assets: [
      {
        role: 'Thanh mũi tên', level: 1,
        prefixedFileName: 'ar5-rail-arrow-mask.svg',
        dimensions: 'viewBox: 209.7 918.8 3580.39 817.8',
        description: 'SVG gốc thanh mũi tên; viewBox khớp bounds thực tế, giữ nguyên path.',
      },
      {
        role: 'Tab số', level: 2,
        prefixedFileName: 'ar5-ribbon-tab-mask.svg',
        dimensions: 'viewBox: 497.6 233.39 3005 2126.57',
        description: 'SVG gốc tab số; viewBox khớp bounds thực tế, giữ nguyên path.',
      },
      {
        role: 'Huy hiệu bạc', level: 3,
        prefixedFileName: 'ar5-medallion-notch-mask.svg',
        dimensions: 'viewBox: 1014.6 276.2 1970.6 1947.5',
        description: 'SVG gốc huy hiệu có khe; viewBox khớp bounds thực tế, giữ nguyên path.',
      },
    ],
  },
  {
    id: 'phase-shape-demo',
    prefix: 'psd',
    name: 'Phase Shape Demo',
    vietnameseTitle: 'UI Phase Shape (Chờ bổ sung)',
    description:
      'Thư mục và tiền tố file (psd-*) đã được quy hoạch tách biệt hoàn toàn để sẵn sàng khi bạn cung cấp tài liệu và SVG cho mẫu Phase Shape.',
    status: 'upcoming',
    route: '/shapes/phase-shape-demo',
    publicSvgFolder: 'public/assets/shapes/phase-shape-demo/',
    componentSourceFolder: 'src/components/shapes/phase-shape-demo/',
    assets: [],
  },
  {
    id: 'km-shape-demo',
    prefix: 'kms',
    name: 'KM Shape Demo',
    vietnameseTitle: 'UI KM Shape (Chờ bổ sung)',
    description:
      'Thư mục và tiền tố file (kms-*) đã được quy hoạch tách biệt hoàn toàn để sẵn sàng khi bạn cung cấp tài liệu và SVG cho mẫu KM Shape.',
    status: 'upcoming',
    route: '/shapes/km-shape-demo',
    publicSvgFolder: 'public/assets/shapes/km-shape-demo/',
    componentSourceFolder: 'src/components/shapes/km-shape-demo/',
    assets: [],
  },
];
