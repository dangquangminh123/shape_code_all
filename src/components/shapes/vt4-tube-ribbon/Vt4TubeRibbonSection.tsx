import { access } from 'node:fs/promises';
import path from 'node:path';
import { connection } from 'next/server';
import Vt4TubeRibbon from './Vt4TubeRibbon';
import {
  VT4_ASSET_BASE,
  VT4_MASK_FILES,
  type Vt4MaskRole,
  type Vt4Masks,
  type Vt4Theme,
} from './vt4-tube-ribbon.config';

export default async function Vt4TubeRibbonSection({ theme = 'colorful' }: { theme?: Vt4Theme }) {
  await connection();
  const masks: Vt4Masks = {};
  await Promise.all(
    (Object.keys(VT4_MASK_FILES) as Vt4MaskRole[]).map(async role => {
      const url = `${VT4_ASSET_BASE}/${VT4_MASK_FILES[role]}`;
      try {
        await access(path.join(process.cwd(), 'public', url));
        masks[role] = url;
      } catch {
        // Fallback to default configured mask URL if custom check fails.
      }
    }),
  );
  return <Vt4TubeRibbon masks={masks} theme={theme} />;
}
