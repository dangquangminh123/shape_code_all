import type { Metadata } from 'next';
import Cb5Clipboard from '@/components/shapes/cb5-clipboard/Cb5Clipboard';

export const metadata: Metadata = {
  title: 'CB5 — Bảng kẹp & năm bước phát triển',
  description: 'Năm dải mũi tên hướng trái, bảng checklist và kẹp kim loại từ SVG gốc của shape 25, trên nền trắng.',
};

export default function Cb5ClipboardPage() {
  return <Cb5Clipboard />;
}
