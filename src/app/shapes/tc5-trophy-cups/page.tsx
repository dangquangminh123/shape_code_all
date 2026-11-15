import type { Metadata } from 'next';
import Tc5TrophyCups from '@/components/shapes/tc5-trophy-cups/Tc5TrophyCups';

export const metadata: Metadata = {
  title: 'TC5 — Năm cúp thành tựu',
  description: 'Năm chiếc cúp nối lớp, bệ STEP 01–05 và bục vinh danh từ SVG gốc của shape 12. Giữ bố cục ngang trên nền trắng.',
};

export default function Tc5TrophyCupsPage() {
  return <Tc5TrophyCups />;
}
