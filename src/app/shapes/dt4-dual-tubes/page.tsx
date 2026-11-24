import type { Metadata } from 'next';
import Dt4DualTubes from '@/components/shapes/dt4-dual-tubes/Dt4DualTubes';

export const metadata: Metadata = {
  title: 'DT4 — Dual Squeeze Tubes 4-Tier Ribbon | Code All Shape',
  description:
    'Mô hình hai trụ tuýp 3D đối xứng kẹp 4 dải ruy-băng hình thang xếp tầng từ bộ SVG gốc shape 13.',
};

export default function Dt4Page() {
  return <Dt4DualTubes />;
}
