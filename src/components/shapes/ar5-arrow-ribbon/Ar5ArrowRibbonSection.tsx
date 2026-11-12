import { access } from 'node:fs/promises';
import path from 'node:path';
import { connection } from 'next/server';
import Ar5ArrowRibbon from './Ar5ArrowRibbon';
import { AR5_ASSET_BASE, AR5_MASK_FILES, type Ar5MaskRole, type Ar5Masks } from './ar5-arrow-ribbon.config';

// Server-only file check: absent user assets use CSS, never broken mask URLs.
// Request-time detection lets newly supplied assets be picked up without source edits.
export default async function Ar5ArrowRibbonSection() {
  await connection();
  const masks: Ar5Masks = {};
  await Promise.all((Object.keys(AR5_MASK_FILES) as Ar5MaskRole[]).map(async role => {
    const url = `${AR5_ASSET_BASE}/${AR5_MASK_FILES[role]}`;
    try {
      await access(path.join(process.cwd(), 'public', url));
      masks[role] = url;
    } catch {
      // Missing or unreadable assets keep this silhouette's CSS fallback.
    }
  }));
  return <Ar5ArrowRibbon masks={masks} />;
}
