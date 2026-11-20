import type { Metadata } from 'next';
import Rt6ReverseTimeline from '@/components/shapes/rt6-reverse-timeline/Rt6ReverseTimeline';

export const metadata: Metadata = {
  title: 'RT6 — Reverse Timeline Infographic | Code All Shape',
  description: 'Tiến trình thời gian ngược 6 giai đoạn đưa mục tiêu bàn giao về kế hoạch hành động khởi đầu.',
};

export default function Rt6Page() {
  return <Rt6ReverseTimeline />;
}
