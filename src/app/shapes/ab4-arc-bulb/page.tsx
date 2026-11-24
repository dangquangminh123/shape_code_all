import Ab4ArcBulb from '@/components/shapes/ab4-arc-bulb/Ab4ArcBulb';
import { AB4_ASSET_BASE, AB4_MASK_FILES } from '@/components/shapes/ab4-arc-bulb/ab4-arc-bulb.config';

export const metadata = {
  title: 'AB4 — Arc & Lightbulb Business Ideas | Shape Showcase',
  description:
    'Mô hình bóng đèn tỏa tia sáng ở trung tâm kết nối vòng cung 4 cột mốc ý tưởng kinh doanh.',
};

export default function Ab4ArcBulbPage() {
  const masks = {
    arc: `${AB4_ASSET_BASE}/${AB4_MASK_FILES.arc}`,
    bulbGlass: `${AB4_ASSET_BASE}/${AB4_MASK_FILES.bulbGlass}`,
    bulbBase: `${AB4_ASSET_BASE}/${AB4_MASK_FILES.bulbBase}`,
    bulbStem: `${AB4_ASSET_BASE}/${AB4_MASK_FILES.bulbStem}`,
    bulbFilament: `${AB4_ASSET_BASE}/${AB4_MASK_FILES.bulbFilament}`,
    bulbRays: `${AB4_ASSET_BASE}/${AB4_MASK_FILES.bulbRays}`,
    circleOuter: `${AB4_ASSET_BASE}/${AB4_MASK_FILES.circleOuter}`,
    circleInner: `${AB4_ASSET_BASE}/${AB4_MASK_FILES.circleInner}`,
  };

  return <Ab4ArcBulb masks={masks} />;
}
