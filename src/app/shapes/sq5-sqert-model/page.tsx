import type { Metadata } from 'next';
import Sq5SqertModel from '@/components/shapes/sq5-sqert-model/Sq5SqertModel';

export const metadata: Metadata = {
  title: 'SQ5 — SQERT Project Management Model | Code All Shape',
  description: 'Mô hình quản lý dự án SQERT 5 cánh: Phạm vi, Chất lượng, Nguồn lực, Rủi ro và Thời gian.',
};

export default function Sq5Page() {
  return <Sq5SqertModel />;
}
