import Ac4ArrowCycle from '@/components/shapes/ac4-arrow-cycle/Ac4ArrowCycle';
import { AC4_ASSET_BASE, AC4_MASK_FILES } from '@/components/shapes/ac4-arrow-cycle/ac4-arrow-cycle.config';

export const metadata = {
  title: 'AC4 — 4-Arrow Cyclic Folded Ribbon | Shape Showcase',
  description:
    'Chu trình 4 mũi tên gấp nếp 3D A, B, C, D đối xứng kèm 4 chú giải React Icons ở 4 góc.',
};

export default function Ac4ArrowCyclePage() {
  const masks = {
    face: `${AC4_ASSET_BASE}/${AC4_MASK_FILES.face}`,
    rim: `${AC4_ASSET_BASE}/${AC4_MASK_FILES.rim}`,
    flap: `${AC4_ASSET_BASE}/${AC4_MASK_FILES.flap}`,
  };

  return <Ac4ArrowCycle masks={masks} />;
}
