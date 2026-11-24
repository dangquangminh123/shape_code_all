import Co3CubeOptions from '@/components/shapes/co3-cube-options/Co3CubeOptions';
import {
  CO3_ASSET_BASE,
  CO3_MASK_FILES,
} from '@/components/shapes/co3-cube-options/co3-cube-options.config';

export const metadata = {
  title: 'CO3 — 3 Cube Options & Arrow Banners | Shape Showcase',
  description:
    'Ba thanh khối lập phương 3D ghép mũi tên ngang phân tầng step 01–03 với biểu tượng React Icons.',
};

export default function Co3CubeOptionsPage() {
  const masks = {
    banner: `${CO3_ASSET_BASE}/${CO3_MASK_FILES.banner}`,
    cubeLeft: `${CO3_ASSET_BASE}/${CO3_MASK_FILES.cubeLeft}`,
    cubeFront: `${CO3_ASSET_BASE}/${CO3_MASK_FILES.cubeFront}`,
    cubeTop: `${CO3_ASSET_BASE}/${CO3_MASK_FILES.cubeTop}`,
  };

  return <Co3CubeOptions masks={masks} />;
}
