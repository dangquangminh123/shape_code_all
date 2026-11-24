import type { Metadata } from 'next';
import Ec4EcologyPlant from '@/components/shapes/ec4-ecology-plant/Ec4EcologyPlant';

export const metadata: Metadata = {
  title: 'EC4 — Ecology Sprout Plant Infographic | Code All Shape',
  description:
    'Mô hình hệ sinh thái 4 bước với chồi cây mọc từ bán cầu đất và 4 thẻ bo góc khuyết tròn từ bộ SVG gốc shape 20.',
};

export default function Ec4Page() {
  return <Ec4EcologyPlant />;
}
