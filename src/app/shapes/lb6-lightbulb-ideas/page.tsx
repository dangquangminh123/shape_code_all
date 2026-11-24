import Lb6LightbulbIdeas from '@/components/shapes/lb6-lightbulb-ideas/Lb6LightbulbIdeas';
import { LB6_ASSET_BASE, LB6_MASK_FILES } from '@/components/shapes/lb6-lightbulb-ideas/lb6-lightbulb-ideas.config';

export const metadata = {
  title: 'LB6 — Lightbulb 6-Pillar Ideas | Shape Showcase',
  description:
    'Mô hình bóng đèn trung tâm kèm tia sét năng lượng và 6 trụ cột ý tưởng đối xứng hai bên.',
};

export default function Lb6LightbulbIdeasPage() {
  const masks = {
    bulbHead: `${LB6_ASSET_BASE}/${LB6_MASK_FILES.bulbHead}`,
    bulbBase: `${LB6_ASSET_BASE}/${LB6_MASK_FILES.bulbBase}`,
    bolt: `${LB6_ASSET_BASE}/${LB6_MASK_FILES.bolt}`,
    circle: `${LB6_ASSET_BASE}/${LB6_MASK_FILES.circle}`,
  };

  return <Lb6LightbulbIdeas masks={masks} />;
}
