import { access } from 'node:fs/promises';
import path from 'node:path';
import { connection } from 'next/server';
import Hfr6Heartwheel from './Hfr6Heartwheel';
import { HFR6_ASSET_BASE, HFR6_MASK_FILES, type Hfr6MaskRole, type Hfr6Masks, type Hfr6Theme } from './hfr6-heartwheel.config';

export default async function Hfr6HeartwheelSection({ theme = 'color' }: { theme?: Hfr6Theme }) {
  await connection();
  const masks: Hfr6Masks = {};
  await Promise.all((Object.keys(HFR6_MASK_FILES) as Hfr6MaskRole[]).map(async role => {
    const url = `${HFR6_ASSET_BASE}/${HFR6_MASK_FILES[role]}`;
    try {
      await access(path.join(process.cwd(), 'public', url));
      masks[role] = url;
    } catch {
      // No request for an absent file: render the documented inline geometry.
    }
  }));
  return <Hfr6Heartwheel masks={masks} theme={theme} />;
}
