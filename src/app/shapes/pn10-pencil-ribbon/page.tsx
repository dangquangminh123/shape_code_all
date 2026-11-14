import type { Metadata } from 'next';
import Pn10PencilRibbon from '@/components/shapes/pn10-pencil-ribbon/Pn10PencilRibbon';

export const metadata: Metadata = {
  title: 'PN10 — Chai bút & năm mũi tên',
  description: 'Năm bước với chai bút phân tầng màu, khớp kim loại chữ U, mũi tên SVG và React Icons.',
};

interface Pn10PageProps {
  searchParams?: Promise<{ theme?: string }>;
}

export default async function Pn10PencilRibbonPage({ searchParams }: Pn10PageProps) {
  const params = searchParams ? await searchParams : undefined;
  return <Pn10PencilRibbon theme={params?.theme === 'silver-red' ? 'silver-red' : 'reference'} />;
}
