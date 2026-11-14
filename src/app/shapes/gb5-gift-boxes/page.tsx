import type { Metadata } from 'next';
import { Gb5GiftBoxes } from '@/components/shapes/gb5-gift-boxes';

export const metadata: Metadata = {
  title: 'Năm nhóm quà tặng ý nghĩa | Shape Showcase',
  description:
    'Quà thưởng cá nhân, quà tập thể, quà tri ân, quà Giáng sinh và quà kỷ niệm — năm hộp quà tương tác trên nền trắng, cùng phần chú thích đồng bộ.',
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
