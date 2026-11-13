import { access } from 'node:fs/promises';
import path from 'node:path';
import { connection } from 'next/server';
import Ih8HeartElements from './Ih8HeartElements';
import {
  IH8_ASSET_BASE,
  IH8_MASK_FILES,
  type Ih8MaskRole,
  type Ih8Masks,
  type Ih8Theme,
} from './ih8-heart-elements.config';

export default async function Ih8HeartElementsSection({
  theme = 'colorful',
}: {
  theme?: Ih8Theme;
}) {
  await connection();
  const masks: Ih8Masks = {};
  await Promise.all(
    (Object.keys(IH8_MASK_FILES) as Ih8MaskRole[]).map(async role => {
      const url = `${IH8_ASSET_BASE}/${IH8_MASK_FILES[role]}`;
      try {
        await access(path.join(process.cwd(), 'public', url));
        masks[role] = url;
      } catch {
        // Fallback to default CSS mask URL if needed.
      }
    }),
  );
  return <Ih8HeartElements masks={masks} theme={theme} />;
}
