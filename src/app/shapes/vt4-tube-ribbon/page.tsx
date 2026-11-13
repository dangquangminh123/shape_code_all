import type { Metadata } from 'next';
import Vt4TubeRibbonSection from '@/components/shapes/vt4-tube-ribbon/Vt4TubeRibbonSection';

export const metadata: Metadata = {
  title: 'VT4 — Tube Ribbon Variants',
  description: 'Tuýp sản phẩm kết hợp 4 thanh biến thể vát cạnh 3D với icon Font Awesome.',
};

export default async function Vt4TubeRibbonPage({
  searchParams,
}: {
  searchParams: Promise<{ theme?: string; instances?: string }>;
}) {
  const params = await searchParams;
  const theme = params.theme === 'silver-red' ? 'silver-red' : 'colorful';
  return (
    <>
      <Vt4TubeRibbonSection theme={theme} />
      {params.instances === '2' && <Vt4TubeRibbonSection theme={theme} />}
    </>
  );
}
