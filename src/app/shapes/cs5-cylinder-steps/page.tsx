import type { Metadata } from 'next';
import Cs5CylinderSteps from '@/components/shapes/cs5-cylinder-steps/Cs5CylinderSteps';

export const metadata: Metadata = {
  title: 'CS5 — Cylinder Steps | Shape Showcase',
  description: 'Năm thanh trụ ngang, khung chú thích lõm và dải số trong suốt trượt so le; tái sử dụng hai SVG nguồn với mask nhiều lớp.',
};

export default function Cs5CylinderStepsPage() {
  return <Cs5CylinderSteps />;
}
