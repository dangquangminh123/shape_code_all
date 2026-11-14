import type { Metadata } from 'next';
import StepStackDemo from '@/components/shapes/step-stack-demo/StepStackDemo';

export const metadata: Metadata = {
  title: 'Son dưỡng môi – Mềm mịn & tươi tắn | Shape Showcase',
  description: 'Nâng niu đôi môi với son dưỡng mỏng nhẹ, sắc hồng tự nhiên và lớp bóng tinh tế.',
};

export default function StepStackDemoPage() {
  return <StepStackDemo />;
}
