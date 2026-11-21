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
      'Huy hiệu bạc, tab số và React/Next.js Icons (Font Awesome 6 + Lucide). Ba mask SVG gốc đặt trực tiếp trong folder tài nguyên riêng của AR5.',
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
    id: 'hfr6-heartwheel',
    prefix: 'hfr6',
    name: 'HFR6 — Heartwheel',
    vietnameseTitle: 'Vòng tròn sáu cánh và trái tim trắng',
    description:
      'Sáu cánh gradient với icon Font Awesome local, hitbox SVG, bàn phím và thẻ mô tả mobile. Đã chuẩn hóa 5 SVG gốc (shape 1..5, tách 2 cặp cánh đối xứng) thành 7 mask SVG đồng bộ viewBox 0 0 640 640.',
    status: 'ready',
    route: '/shapes/hfr6-heartwheel',
    publicSvgFolder: 'public/assets/shapes/hfr6-heartwheel/',
    componentSourceFolder: 'src/components/shapes/hfr6-heartwheel/',
    assets: [
      ...['north', 'north-east', 'south-east', 'south', 'south-west', 'north-west'].map((direction, index) => ({
        role: `Cánh 0${index + 1}`, level: index + 1,
        prefixedFileName: `hfr6-sector-0${index + 1}-${direction}.svg`,
        dimensions: 'viewBox: 0 0 640 640 (canvas chung)',
        description: 'Mask SVG cánh quạt đã chuẩn hóa từ bộ 5 file SVG gốc (tách cặp cánh đối xứng và khớp viền trái tim).',
      })),
      {
        role: 'Trái tim trắng', level: 7, prefixedFileName: 'hfr6-core-heart.svg',
        dimensions: 'viewBox: 0 0 640 640 (canvas chung)',
        description: 'Mask SVG trái tim trung tâm đã chuẩn hóa từ shape 1.svg vào hệ tọa độ 640×640.',
      },
    ],
  },
  {
    id: 'vt4-tube-ribbon',
    prefix: 'vt4',
    name: 'VT4 — Tube Ribbon Variants',
    vietnameseTitle: 'Tuýp sản phẩm & 4 thanh biến thể vát cạnh 3D',
    description:
      'Tuýp sản phẩm đặt bên trái đè lên 4 thanh biến thể vát cạnh 3D bên phải, kèm icon Font Awesome 6 và tuỳ chọn bảng màu silver-red.',
    status: 'ready',
    route: '/shapes/vt4-tube-ribbon',
    publicSvgFolder: 'public/assets/shapes/vt4-tube-ribbon/',
    componentSourceFolder: 'src/components/shapes/vt4-tube-ribbon/',
    assets: [
      {
        role: 'Tuýp tổng thể',
        level: 1,
        prefixedFileName: 'vt4-tube-full-mask.svg',
        dimensions: 'viewBox: 1472 308 1056 1884',
        description: 'Mask SVG tổng thể thân tuýp sản phẩm.',
      },
      {
        role: 'Thân tuýp chính',
        level: 2,
        prefixedFileName: 'vt4-tube-body-mask.svg',
        dimensions: 'viewBox: 1472 308 1056 1352',
        description: 'Mask SVG phần thân tuýp bạc.',
      },
      {
        role: 'Đầu tuýp (foil)',
        level: 3,
        prefixedFileName: 'vt4-tube-foil-mask.svg',
        dimensions: 'viewBox: 1472 308 1056 138',
        description: 'Mask SVG dải ép đầu tuýp.',
      },
      {
        role: 'Cổ viền tuýp (rim)',
        level: 4,
        prefixedFileName: 'vt4-tube-rim-mask.svg',
        dimensions: 'viewBox: 1626 1648 748 164',
        description: 'Mask SVG cổ viền giữa thân và nắp tuýp.',
      },
      {
        role: 'Nắp tuýp (cap)',
        level: 5,
        prefixedFileName: 'vt4-tube-cap-mask.svg',
        dimensions: 'viewBox: 1682 1756 636 436',
        description: 'Mask SVG nắp tuýp dưới cùng.',
      },
      {
        role: 'Mặt chính thanh biến thể',
        level: 6,
        prefixedFileName: 'vt4-ribbon-face-mask.svg',
        dimensions: 'viewBox: 294 619 3412 1262',
        description: 'Mask SVG mặt chính của 4 thanh biến thể.',
      },
      {
        role: 'Cạnh vát 3D thanh biến thể',
        level: 7,
        prefixedFileName: 'vt4-ribbon-bevel-mask.svg',
        dimensions: 'viewBox: 1649 387 702 1726',
        description: 'Mask SVG cạnh vát 3D bên phải của thanh biến thể.',
      },
    ],
  },
  {
    id: 'ih8-heart-elements',
    prefix: 'ih8',
    name: 'IH8 — Heart Elements',
    vietnameseTitle: 'Infographic 8 mảnh ghép hình trái tim',
    description:
      'Tám mảnh ghép màu tạo hình trái tim bao quanh lõi tim trắng trung tâm, liên kết 2 chiều với 8 khối nội dung hai bên và dùng React Icons đồng bộ.',
    status: 'ready',
    route: '/shapes/ih8-heart-elements',
    publicSvgFolder: 'public/assets/shapes/ih8-heart-elements/',
    componentSourceFolder: 'src/components/shapes/ih8-heart-elements/',
    assets: [
      {
        role: 'Tầng 1 — Vòm trên trái (Crown Left)',
        level: 1,
        prefixedFileName: 'ih8-heart-crown-left.svg',
        dimensions: 'viewBox: 0 850 2000 740',
        description: 'Mask SVG mảnh số 1 (vòm tim trên bên trái) giữ nguyên path từ shape 1.svg.',
      },
      {
        role: 'Tầng 1 — Vòm trên phải (Crown Right)',
        level: 2,
        prefixedFileName: 'ih8-heart-crown-right.svg',
        dimensions: 'viewBox: 2000 850 2000 740',
        description: 'Mask SVG mảnh số 2 (vòm tim trên bên phải) giữ nguyên path từ shape 1.svg.',
      },
      {
        role: 'Tầng 2 — Vai trái (Shoulder Left)',
        level: 3,
        prefixedFileName: 'ih8-heart-shoulder-left.svg',
        dimensions: 'viewBox: 0 455 2000 1120',
        description: 'Mask SVG mảnh số 3 (bờ lõm trái quanh tâm trắng) giữ nguyên path từ shape 2.svg.',
      },
      {
        role: 'Tầng 2 — Vai phải (Shoulder Right)',
        level: 4,
        prefixedFileName: 'ih8-heart-shoulder-right.svg',
        dimensions: 'viewBox: 2000 455 2000 1120',
        description: 'Mask SVG mảnh số 4 (bờ lõm phải quanh tâm trắng) giữ nguyên path từ shape 2.svg.',
      },
      {
        role: 'Tầng 3 — Dải cong trái (Curve Left)',
        level: 5,
        prefixedFileName: 'ih8-heart-curve-left.svg',
        dimensions: 'viewBox: 0 695 2000 970',
        description: 'Mask SVG mảnh số 5 (dải xiên thu hẹp trái) giữ nguyên path từ shape 3.svg.',
      },
      {
        role: 'Tầng 3 — Dải cong phải (Curve Right)',
        level: 6,
        prefixedFileName: 'ih8-heart-curve-right.svg',
        dimensions: 'viewBox: 2000 695 2000 970',
        description: 'Mask SVG mảnh số 6 (dải xiên thu hẹp phải) giữ nguyên path từ shape 3.svg.',
      },
      {
        role: 'Tầng 4 — Mũi tim trái (Point Left)',
        level: 7,
        prefixedFileName: 'ih8-heart-point-left.svg',
        dimensions: 'viewBox: 0 408 2000 1352',
        description: 'Mask SVG mảnh số 7 (nửa mũi tim dưới trái) giữ nguyên path từ shape 4.svg.',
      },
      {
        role: 'Tầng 4 — Mũi tim phải (Point Right)',
        level: 8,
        prefixedFileName: 'ih8-heart-point-right.svg',
        dimensions: 'viewBox: 2000 408 2000 1352',
        description: 'Mask SVG mảnh số 8 (nửa mũi tim dưới phải) giữ nguyên path từ shape 4.svg.',
      },
      {
        role: 'Lõi tim trắng trung tâm (Core Heart Surface)',
        level: 9,
        prefixedFileName: 'ih8-core-heart-surface.svg',
        dimensions: 'viewBox: 0 0 600 440',
        description: 'Mask SVG mặt tim trắng ở trung tâm chứa tiêu đề 8 YẾU TỐ TRỌNG TÂM và 5 ngôi sao.',
      },
    ],
  },
  {
    id: 'wh9-heart-ring',
    prefix: 'wh9',
    name: 'WH9 — Heart Ring',
    vietnameseTitle: 'Vòng tròn thấu cảm sáu cánh quanh trái tim',
    description:
      'Sáu phân vùng cong chung ranh giới Bézier trên canvas 640×640, lõi trái tim từ path gốc có viền tách trắng + hồng, kết hợp React Icons (Font Awesome 6 + Lucide).',
    status: 'ready',
    route: '/shapes/wh9-heart-ring',
    publicSvgFolder: 'public/assets/shapes/wh9-heart-ring/',
    componentSourceFolder: 'src/components/shapes/wh9-heart-ring/',
    assets: [
      {
        role: 'Cánh 01 — Đỉnh (Lắng Nghe)',
        level: 1,
        prefixedFileName: 'wh9-sector-mask-01.svg',
        dimensions: 'viewBox: 0 0 640 640',
        description: 'Mask cánh cong số 01 trên hệ tọa độ chuẩn 640×640.',
      },
      {
        role: 'Cánh 02 — Đông Bắc (Định Hình)',
        level: 2,
        prefixedFileName: 'wh9-sector-mask-02.svg',
        dimensions: 'viewBox: 0 0 640 640',
        description: 'Mask cánh cong số 02 trên hệ tọa độ chuẩn 640×640.',
      },
      {
        role: 'Cánh 03 — Đông Nam (Phản Hồi)',
        level: 3,
        prefixedFileName: 'wh9-sector-mask-03.svg',
        dimensions: 'viewBox: 0 0 640 640',
        description: 'Mask cánh cong số 03 trên hệ tọa độ chuẩn 640×640.',
      },
      {
        role: 'Cánh 04 — Đáy (Cam Kết)',
        level: 4,
        prefixedFileName: 'wh9-sector-mask-04.svg',
        dimensions: 'viewBox: 0 0 640 640',
        description: 'Mask cánh cong số 04 trên hệ tọa độ chuẩn 640×640.',
      },
      {
        role: 'Cánh 05 — Tây Nam (Đồng Hành)',
        level: 5,
        prefixedFileName: 'wh9-sector-mask-05.svg',
        dimensions: 'viewBox: 0 0 640 640',
        description: 'Mask cánh cong số 05 trên hệ tọa độ chuẩn 640×640.',
      },
      {
        role: 'Cánh 06 — Tây Bắc (Lan Tỏa)',
        level: 6,
        prefixedFileName: 'wh9-sector-mask-06.svg',
        dimensions: 'viewBox: 0 0 640 640',
        description: 'Mask cánh cong số 06 trên hệ tọa độ chuẩn 640×640.',
      },
      {
        role: 'Lõi trái tim trung tâm (Heart Core)',
        level: 7,
        prefixedFileName: 'wh9-heart-core.svg',
        dimensions: 'viewBox: 0 0 640 640',
        description: 'Trái tim trung tâm giữ nguyên path gốc từ shape 7.svg với phép biến đổi chuẩn hóa.',
      },
    ],
  },
  {
    id: 'cb5-clipboard',
    prefix: 'cb5',
    name: 'CB5 — Clipboard',
    vietnameseTitle: 'Bảng kẹp & năm bước phát triển',
    description: 'Năm mũi tên hướng trái phía sau bảng checklist và kẹp kim loại, từ SVG gốc của shape 25. Chỉ giữ infographic chính trên nền trắng, CSS tương thích iOS 15.',
    status: 'ready',
    route: '/shapes/cb5-clipboard',
    publicSvgFolder: 'public/assets/shapes/cb5-clipboard/',
    componentSourceFolder: 'src/components/shapes/cb5-clipboard/',
    assets: [
      { role: 'Kẹp kim loại', level: 5, prefixedFileName: 'cb5-clip-mask.svg', dimensions: 'viewBox: 363.6 508 3273 1471', description: 'Path kẹp gốc, giữ nguyên lỗ treo; tô gradient kim loại bằng CSS.' },
      { role: 'Mũi tên hướng trái', level: 1, prefixedFileName: 'cb5-arrow-mask.svg', dimensions: 'viewBox: 310.1 769.4 3379.8 961.2', description: 'Mũi tên gốc dùng cho năm thanh ngang, phía sau clipboard.' },
      { role: 'Đỉnh bảng', level: 2, prefixedFileName: 'cb5-top-cap-mask.svg', dimensions: 'viewBox: 798.5 769.4 2578.9 961.2', description: 'Hai góc bo của dải màu trên cùng.' },
      { role: 'Thân bảng', level: 3, prefixedFileName: 'cb5-board-mask.svg', dimensions: 'viewBox: 863.3 252.9 2273.4 1876.3', description: 'Thân clipboard bo góc từ shape 4 gốc.' },
      { role: 'Tờ giấy', level: 4, prefixedFileName: 'cb5-paper-mask.svg', dimensions: 'viewBox: 863.3 252.9 2273.4 1876.3', description: 'Mặt giấy phía trên bảng, checklist HTML và React Icons.' },
    ],
  },
  {
    id: 'tc5-trophy-cups',
    prefix: 'tc5',
    name: 'TC5 — Trophy Cups',
    vietnameseTitle: 'Năm cúp thành tựu',
    description: 'Năm cúp nối lớp trên một hàng, bệ STEP 01–05 và chú thích bên dưới. Dùng hai SVG gốc của shape 12, chỉ giữ infographic chính trên nền trắng và CSS tương thích iOS 15.',
    status: 'ready',
    route: '/shapes/tc5-trophy-cups',
    publicSvgFolder: 'public/assets/shapes/tc5-trophy-cups/',
    componentSourceFolder: 'src/components/shapes/tc5-trophy-cups/',
    assets: [
      { role: 'Cúp đầu — hai quai', level: 1, prefixedFileName: 'tc5-first-cup-mask.svg', dimensions: 'viewBox: 1114.2 215.5 1771.6 2016.5', description: 'Giữ nguyên hai path SVG shape 1; crop artboard, không vẽ lại đường biên.' },
      { role: 'Cúp nối — khoét bên trái', level: 2, prefixedFileName: 'tc5-next-cup-mask.svg', dimensions: 'viewBox: 1534.5 198.1 1483.2 2103.8', description: 'Giữ nguyên hai path SVG shape 2; dùng cho cúp 02–05, tạo khoảng trắng quanh quai cúp trước.' },
    ],
  },
  {
    id: 'pb4-pump-bottle',
    prefix: 'pb4',
    name: 'PB4 — Pump Bottle',
    vietnameseTitle: 'Bốn bước chăm sóc làn da',
    description: 'Bình bơm tròn bốn dải màu, cung nối và bốn chú thích bên phải từ sáu SVG gốc của shape 29. Giữ bố cục ngang trên nền trắng, tương thích CSS iOS 15.',
    status: 'ready',
    route: '/shapes/pb4-pump-bottle',
    publicSvgFolder: 'public/assets/shapes/pb4-pump-bottle/',
    componentSourceFolder: 'src/components/shapes/pb4-pump-bottle/',
    assets: [
      { role: 'Nắp bơm', level: 6, prefixedFileName: 'pb4-cap-mask.svg', dimensions: 'viewBox: 843.2 188.2 2313.5 2123.5', description: 'Path nắp bơm ba tầng, giữ nguyên từ shape 1.' },
      { role: 'Thân bình', level: 1, prefixedFileName: 'pb4-body-mask.svg', dimensions: 'viewBox: 514.5 126.9 2971 2246.1', description: 'Mask chung giới hạn bốn dải màu theo thân bình gốc.' },
      { role: 'Dải 01 — vai bình', level: 2, prefixedFileName: 'pb4-band-01-mask.svg', dimensions: 'viewBox: 149.8 782.7 3700.3 934.2', description: 'Giữ path vai cong của shape 3.' },
      { role: 'Dải 02 — thân trên', level: 3, prefixedFileName: 'pb4-band-02-mask.svg', dimensions: 'viewBox: 174.5 961.9 3651.2 845.8', description: 'Giữ path dải mở rộng xuống dưới của shape 4.' },
      { role: 'Dải 03 — thân dưới', level: 4, prefixedFileName: 'pb4-band-03-mask.svg', dimensions: 'viewBox: 452.2 943.1 3095.6 710.1', description: 'Giữ path dải thu hẹp xuống dưới của shape 5.' },
      { role: 'Dải 04 — đáy bình', level: 5, prefixedFileName: 'pb4-band-04-mask.svg', dimensions: 'viewBox: 308.7 821.7 3382.5 857', description: 'Giữ path đáy cong và cạnh đáy phẳng của shape 6.' },
    ],
  },
  {
    id: 'ls4-ladder-steps',
    prefix: 'ls4',
    name: 'LS4 — Ladder Steps',
    vietnameseTitle: 'Nấc thang tăng trưởng bốn bậc 3D',
    description:
      'Bốn bậc thang 3D isometric xếp tầng (Ý tưởng, Xây dựng, Ra mắt, Mở rộng) với mặt trên dốc, mặt trước chia ô icon và nội dung, cùng mặt hông 3D phản chiếu ánh sáng từ SVG mask gốc shape 2. Bảng màu navy, xanh biển, san hô và hổ phách.',
    status: 'ready',
    route: '/shapes/ls4-ladder-steps',
    publicSvgFolder: 'public/assets/shapes/ls4-ladder-steps/',
    componentSourceFolder: 'src/components/shapes/ls4-ladder-steps/',
    assets: [
      { role: 'Mặt trên dốc toàn phần', level: 1, prefixedFileName: 'ls4-top-full-mask.svg', dimensions: 'viewBox: 0 0 15042.56 866.88', description: 'Hai đa giác mặt trên dốc từ shape 1 gốc.' },
      { role: 'Mặt trên ô icon', level: 2, prefixedFileName: 'ls4-top-icon-mask.svg', dimensions: 'viewBox: 0 0 4063.13 866.88', description: 'Mặt nghiêng phía trên ô icon bên trái.' },
      { role: 'Mặt trên ô nội dung', level: 3, prefixedFileName: 'ls4-top-text-mask.svg', dimensions: 'viewBox: 0 0 12415.91 866.88', description: 'Mặt nghiêng phía trên chứa nhãn nấc thang.' },
      { role: 'Mặt trước toàn phần', level: 4, prefixedFileName: 'ls4-front-face-mask.svg', dimensions: 'viewBox: 0 0 11894.11 2296.06', description: 'Hai hình chữ nhật ghép từ shape 2 gốc.' },
      { role: 'Mặt trước ô icon', level: 5, prefixedFileName: 'ls4-front-icon-mask.svg', dimensions: 'viewBox: 0 0 2296.06 2296.06', description: 'Ô vuông bên trái chứa icon React/Lucide.' },
      { role: 'Mặt trước ô nội dung', level: 6, prefixedFileName: 'ls4-front-text-mask.svg', dimensions: 'viewBox: 0 0 9598.04 2296.06', description: 'Ô chữ nhật bên phải chứa văn bản mô tả.' },
      { role: 'Mặt hông 3D isometric', level: 7, prefixedFileName: 'ls4-side-facet-mask.svg', dimensions: 'viewBox: 0 0 943.75 2296.06', description: 'Đa giác mặt bên tạo độ sâu không gian 3D từ shape 3 gốc.' },
    ],
  },
  {
    id: 'rt6-reverse-timeline',
    prefix: 'rt6',
    name: 'RT6 — Reverse Timeline',
    vietnameseTitle: 'Tiến trình thời gian ngược 6 giai đoạn',
    description:
      'Sáu dải băng bậc thang xếp giật cấp chéo xuống từ trái qua phải (06 đến 01). Đầu dải băng uốn vòm 3D, đáy lượn cong bán nguyệt kèm nếp gập 3D bên hông từ bộ SVG gốc shape 4.',
    status: 'ready',
    route: '/shapes/rt6-reverse-timeline',
    publicSvgFolder: 'public/assets/shapes/rt6-reverse-timeline/',
    componentSourceFolder: 'src/components/shapes/rt6-reverse-timeline/',
    assets: [
      { role: 'Mặt trước dải băng', level: 1, prefixedFileName: 'rt6-banner-face-mask.svg', dimensions: 'viewBox: 0 0 42.6 81', description: 'Mask mặt dải băng uốn cong từ 1.svg gốc.' },
      { role: 'Nếp gấp 3D cạnh hông', level: 2, prefixedFileName: 'rt6-fold-side-mask.svg', dimensions: 'viewBox: 0 0 10.61 81', description: 'Nếp gấp liên kết chéo giữa các dải từ 2.svg gốc.' },
    ],
  },
  {
    id: 'sq5-sqert-model',
    prefix: 'sq5',
    name: 'SQ5 — SQERT Model',
    vietnameseTitle: 'Mô hình quản lý dự án SQERT 5 cánh',
    description:
      'Bố cục 2 cột cân bằng: Cột trái là danh sách 5 tiêu chí dự án có icon trực quan, Cột phải là cối xay gió xoáy (Vortex) 5 cánh (S-Q-E-R-T) ôm vòng tròn trung tâm từ bộ SVG gốc shape 5.',
    status: 'ready',
    route: '/shapes/sq5-sqert-model',
    publicSvgFolder: 'public/assets/shapes/sq5-sqert-model/',
    componentSourceFolder: 'src/components/shapes/sq5-sqert-model/',
    assets: [
      { role: 'Cánh S (Scope)', level: 1, prefixedFileName: 'sq5-petal-01-scope-mask.svg', dimensions: 'viewBox: 0 0 119.94 81', description: 'Cánh giọt nước xoắn Scope từ 1.svg gốc.' },
      { role: 'Cánh Q (Quality)', level: 2, prefixedFileName: 'sq5-petal-02-quality-mask.svg', dimensions: 'viewBox: 0 0 80.52 81', description: 'Cánh giọt nước xoắn Quality từ 2.svg gốc.' },
      { role: 'Cánh E (Effort)', level: 3, prefixedFileName: 'sq5-petal-03-effort-mask.svg', dimensions: 'viewBox: 0 0 56.57 81', description: 'Cánh giọt nước xoắn Effort từ 3.svg gốc.' },
      { role: 'Cánh R (Risk)', level: 4, prefixedFileName: 'sq5-petal-04-risk-mask.svg', dimensions: 'viewBox: 0 0 127.36 81', description: 'Cánh giọt nước xoắn Risk từ 4.svg gốc.' },
      { role: 'Cánh T (Time)', level: 5, prefixedFileName: 'sq5-petal-05-time-mask.svg', dimensions: 'viewBox: 0 0 51.37 81', description: 'Cánh giọt nước xoắn Time từ 5.svg gốc.' },
      { role: 'Khối lõi SQERT', level: 6, prefixedFileName: 'sq5-core-circle-mask.svg', dimensions: 'viewBox: 0 0 81 81', description: 'Vòng tròn trung tâm từ Tròn.svg gốc.' },
    ],
  },
  {
    id: 'ob3-option-banners',
    prefix: 'ob3',
    name: 'OB3 — Option Banners',
    vietnameseTitle: '3 Dải ruy băng gấp nếp lựa chọn chiến lược',
    description:
      'Ba dải ruy băng gấp nếp nằm ngang xếp chồng đứng. Vòng cuốn mũi tên bên trái chứa icon và tiêu đề, thanh chữ nhật bên phải chứa số thứ tự Option và đoạn mô tả từ bộ SVG gốc shape 8.',
    status: 'ready',
    route: '/shapes/ob3-option-banners',
    publicSvgFolder: 'public/assets/shapes/ob3-option-banners/',
    componentSourceFolder: 'src/components/shapes/ob3-option-banners/',
    assets: [
      { role: 'Thanh chữ nhật ngang', level: 1, prefixedFileName: 'ob3-banner-bar-mask.svg', dimensions: 'viewBox: 0 0 272.89 81', description: 'Thanh chữ nhật có góc vát gập từ 1.svg gốc.' },
      { role: 'Vòng cuốn mũi tên trái', level: 2, prefixedFileName: 'ob3-arrow-loop-mask.svg', dimensions: 'viewBox: 0 0 182.2 81', description: 'Vòng cuộn gấp nếp mũi tên từ 2.svg gốc.' },
    ],
  },
  {
    id: 'ss5-study-skills',
    prefix: 'ss5',
    name: 'SS5 — Study Skills',
    vietnameseTitle: '5 Cuốn sách kỹ năng học tập xếp chồng (Study Skills)',
    description:
      'Năm khối sách nằm ngang xếp chồng so le với dải ruy-băng bookmark bên trái chứa icon và thân sách bo tròn bên phải từ bộ SVG gốc 6_tick.',
    status: 'ready',
    route: '/shapes/ss5-study-skills',
    publicSvgFolder: 'public/assets/shapes/ss5-study-skills/',
    componentSourceFolder: 'src/components/shapes/ss5-study-skills/',
    assets: [
      { role: 'Dải ruy-băng bookmark', level: 1, prefixedFileName: 'ss5-bookmark-tail-mask.svg', dimensions: 'viewBox: 0 0 131.33 81', description: 'Đuôi ruy băng có vết cắt V và uốn cong từ 1.svg gốc.' },
      { role: 'Thân sách uốn cong & gáy', level: 2, prefixedFileName: 'ss5-book-body-mask.svg', dimensions: 'viewBox: 0 0 377.99 81', description: 'Thân sách nằm ngang với gáy bo tròn và mép trang lõm từ 2.svg gốc.' },
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
