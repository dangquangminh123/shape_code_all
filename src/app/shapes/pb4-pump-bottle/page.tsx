import type { Metadata } from 'next';
import Pb4PumpBottle from '@/components/shapes/pb4-pump-bottle/Pb4PumpBottle';

export const metadata: Metadata = {
  title: 'PB4 — Bốn bước chăm sóc làn da',
  description: 'Bình dưỡng da bốn dải màu, nắp bơm và chú thích theo cung tròn từ sáu SVG gốc của shape 29. Bố cục ngang trên nền trắng.',
};

export default function Pb4PumpBottlePage() {
  return <Pb4PumpBottle />;
}
