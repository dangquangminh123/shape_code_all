import type { Metadata } from 'next';
import Wh9HeartRing from '@/components/shapes/wh9-heart-ring/Wh9HeartRing';
import type { Wh9Theme } from '@/components/shapes/wh9-heart-ring/wh9-heart-ring.config';

export const metadata: Metadata = {
  title: 'WH9 — Vòng Tròn Thấu Cảm',
  description: 'Vòng tròn sáu cánh cong bao quanh trái tim trung tâm sử dụng SVG mask đồng nhất và React Icons.',
};

interface Wh9PageProps {
  searchParams?: Promise<{ theme?: string }>;
}

export default async function Wh9HeartRingPage({ searchParams }: Wh9PageProps) {
  const params = searchParams ? await searchParams : undefined;
  const theme: Wh9Theme = params?.theme === 'silver-red' ? 'silver-red' : 'reference';

  return <Wh9HeartRing theme={theme} />;
}
