import type { IconType } from 'react-icons';
import { LuLightbulb, LuMegaphone, LuSearch, LuSmartphone, LuTarget } from 'react-icons/lu';
import type { Ar5IconName } from './ar5-arrow-ribbon.config';

const AR5_ICONS: Record<Ar5IconName, IconType> = {
  phone: LuSmartphone,
  bulb: LuLightbulb,
  analysis: LuMegaphone,
  search: LuSearch,
  target: LuTarget,
};

export default function Ar5Icon({ name }: { name: Ar5IconName }) {
  const Icon = AR5_ICONS[name];
  return <Icon aria-hidden="true" focusable="false" data-ar5-icon={name} />;
}
