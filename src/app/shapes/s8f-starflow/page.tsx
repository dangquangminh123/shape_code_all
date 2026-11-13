import type { Metadata } from 'next';
import S8fStarflow from '@/components/shapes/s8f-starflow/S8fStarflow';

export const metadata: Metadata = {
  title: 'S8F — Starflow',
  description: 'Vòng xoáy 5 cánh bao quanh ngôi sao trung tâm với biểu tượng Font Awesome 6.',
};

export default async function S8fStarflowPage({
  searchParams,
}: {
  searchParams?: Promise<{ theme?: string; instances?: string }>;
}) {
  const params = searchParams ? await searchParams : {};
  const theme = params.theme === 'silver-red' ? 'silver-red' : 'reference';
  return (
    <>
      <S8fStarflow theme={theme} />
      {params.instances === '2' && <S8fStarflow theme={theme} />}
    </>
  );
}
