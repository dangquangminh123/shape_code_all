import type { Metadata } from 'next';
import Hb4HangerBanners from '@/components/shapes/hb4-hanger-banners/Hb4HangerBanners';

export const metadata: Metadata = {
  title: 'HB4 — Banners on Hangers | Shape Showcase',
  description: 'Bốn banner móc treo so le, tái sử dụng hai SVG nguồn với mask nhiều lớp và hoạt cảnh đung đưa riêng.',
};

export default function Hb4HangerBannersPage() {
  return <Hb4HangerBanners />;
}
