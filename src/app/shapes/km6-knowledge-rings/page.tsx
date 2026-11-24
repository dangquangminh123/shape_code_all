import Km6KnowledgeRings from '@/components/shapes/km6-knowledge-rings/Km6KnowledgeRings';
import {
  KM6_ASSET_BASE,
  KM6_MASK_FILES,
} from '@/components/shapes/km6-knowledge-rings/km6-knowledge-rings.config';

export const metadata = {
  title: 'KM6 — Knowledge Management 6 Swirling Rings | Shape Showcase',
  description:
    'Mô hình lục giác 6 vòng xoáy mũi tên 3D (01–06) đồng bộ với 6 trụ cột quản trị tri thức hai bên.',
};

export default function Km6KnowledgeRingsPage() {
  const masks = {
    ringBody: `${KM6_ASSET_BASE}/${KM6_MASK_FILES.ringBody}`,
    ringRim: `${KM6_ASSET_BASE}/${KM6_MASK_FILES.ringRim}`,
  };

  return <Km6KnowledgeRings masks={masks} />;
}
