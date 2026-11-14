import type { Metadata } from 'next';
import { Gb5GiftBoxes } from '@/components/shapes/gb5-gift-boxes';

export const metadata: Metadata = {
  title: '5 Gift Boxes Infographic (gb5-gift-boxes) | Shape Showcase',
  description:
    'Interactive 5-stage gift box infographic (shape 32) featuring overhanging lids, multi-layered 3D ribbon bows, snowflake ornaments, and a synchronized bottom timeline.',
};

interface Gb5PageProps {
  searchParams?: Promise<{ instances?: string }>;
}

export default async function Gb5GiftBoxesPage({ searchParams }: Gb5PageProps) {
  const params = searchParams ? await searchParams : undefined;
  return (
    <>
      <Gb5GiftBoxes />
      {/* Bounded showcase variant for verifying independent reusable instances. */}
      {params?.instances === '2' && <Gb5GiftBoxes initialActiveId="gb5-step-03" />}
    </>
  );
}
