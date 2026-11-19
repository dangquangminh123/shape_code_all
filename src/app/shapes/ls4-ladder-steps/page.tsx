import type { Metadata } from 'next';
import Ls4LadderSteps from '@/components/shapes/ls4-ladder-steps/Ls4LadderSteps';

export const metadata: Metadata = {
  title: 'LS4 — Nấc thang tăng trưởng bốn bậc 3D',
  description:
    'Bốn bậc thang 3D isometric (Ý tưởng, Xây dựng, Ra mắt, Mở rộng) với mặt trên dốc, mặt trước chia ô icon và nội dung, mặt hông 3D từ SVG mask gốc của shape 2.',
};

export default function Ls4LadderStepsPage() {
  return <Ls4LadderSteps />;
}
