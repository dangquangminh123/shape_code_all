import type { Metadata } from 'next';
import Ih8HeartElementsSection from '@/components/shapes/ih8-heart-elements/Ih8HeartElementsSection';

export const metadata: Metadata = {
  title: 'IH8 — Heart Elements',
  description: 'Infographic 8 mảnh ghép hình trái tim kết hợp lõi tim trắng và React/Next.js Icons.',
};

export default async function Ih8HeartElementsPage({
  searchParams,
}: {
  searchParams: Promise<{ theme?: string; instances?: string }>;
}) {
  const params = await searchParams;
  const theme = params.theme === 'silver-red' ? 'silver-red' : 'colorful';
  return (
    <>
      <Ih8HeartElementsSection theme={theme} />
      {params.instances === '2' && <Ih8HeartElementsSection theme={theme} />}
    </>
  );
}
