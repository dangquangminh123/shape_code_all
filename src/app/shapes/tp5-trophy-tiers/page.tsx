import type { Metadata } from 'next';
import Tp5TrophyTiers from '@/components/shapes/tp5-trophy-tiers/Tp5TrophyTiers';

export const metadata: Metadata = {
  title: 'TP5 — 5-Tier Trophy Cup Infographic | Code All Shape',
  description:
    'Mô hình cúp thành tựu 5 tầng phân cấp (Ý tưởng đến Lợi nhuận) kết hợp danh sách icon React Icons đồng bộ từ bộ SVG gốc shape 34.',
};

export default function Tp5Page() {
  return <Tp5TrophyTiers />;
}
