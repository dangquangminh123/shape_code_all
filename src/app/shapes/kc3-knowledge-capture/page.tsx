import Kc3KnowledgeCapture from '@/components/shapes/kc3-knowledge-capture/Kc3KnowledgeCapture';
import {
  KC3_ASSET_BASE,
  KC3_MASK_FILES,
} from '@/components/shapes/kc3-knowledge-capture/kc3-knowledge-capture.config';

export const metadata = {
  title: 'KC3 — 3 Diamond-Cap Chevron Banners | Shape Showcase',
  description:
    'Ba thẻ cờ mũi tên dọc viền kép có mũ kim cương nổi 3D và biểu tượng React Icons.',
};

export default function Kc3KnowledgeCapturePage() {
  const masks = {
    cap: `${KC3_ASSET_BASE}/${KC3_MASK_FILES.cap}`,
    bannerFill: `${KC3_ASSET_BASE}/${KC3_MASK_FILES.bannerFill}`,
    bannerFrame: `${KC3_ASSET_BASE}/${KC3_MASK_FILES.bannerFrame}`,
  };

  return <Kc3KnowledgeCapture masks={masks} />;
}
