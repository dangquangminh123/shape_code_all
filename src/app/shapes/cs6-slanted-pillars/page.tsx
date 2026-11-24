import Cs6SlantedPillars from '@/components/shapes/cs6-slanted-pillars/Cs6SlantedPillars';
import {
  CS6_ASSET_BASE,
  CS6_MASK_FILES,
} from '@/components/shapes/cs6-slanted-pillars/cs6-slanted-pillars.config';

export const metadata = {
  title: 'CS6 — 6 Slanted Accordion Pillars | Shape Showcase',
  description:
    'Chuỗi 6 thanh trụ nghiêng gấp nếp 3D nối nếp bóng tối màu cùng 6 cột tiêu chí đồng bộ biểu tượng React Icons.',
};

export default function Cs6SlantedPillarsPage() {
  const masks = {
    bar: `${CS6_ASSET_BASE}/${CS6_MASK_FILES.bar}`,
    wing: `${CS6_ASSET_BASE}/${CS6_MASK_FILES.wing}`,
  };

  return <Cs6SlantedPillars masks={masks} />;
}
