import type { Metadata } from 'next';
import Lm6LevelsMarks from '@/components/shapes/lm6-levels-marks/Lm6LevelsMarks';

export const metadata: Metadata = {
  title: 'LM6 — Cấp độ và cột mốc',
  description: 'Sáu mũi tên nổi nối ngang, phản chiếu và chú thích xen kẽ trên dưới, dựng từ SVG gốc của shape 1 trên nền trắng.',
};

export default function Lm6LevelsMarksPage() {
  return <Lm6LevelsMarks />;
}
