import type { Metadata } from 'next';
import Ob3OptionBanners from '@/components/shapes/ob3-option-banners/Ob3OptionBanners';

export const metadata: Metadata = {
  title: 'OB3 — Three Options Infographic Banners | Code All Shape',
  description: 'Ba dải ruy băng gấp nếp lựa chọn giải pháp chiến lược bứt phá cho dự án phần mềm.',
};

export default function Ob3Page() {
  return <Ob3OptionBanners />;
}
