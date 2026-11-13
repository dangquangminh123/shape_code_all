import type { IconType } from 'react-icons';
import {
  FaChartLine,
  FaMicroscope,
  FaTowerBroadcast,
  FaTrophy,
  FaWandMagicSparkles,
} from 'react-icons/fa6';
import type { Ar5IconName } from './ar5-arrow-ribbon.config';

const AR5_ICONS: Record<Ar5IconName, IconType> = {
  phone: FaTowerBroadcast,
  bulb: FaWandMagicSparkles,
  analysis: FaChartLine,
  search: FaMicroscope,
  target: FaTrophy,
};

export default function Ar5Icon({ name }: { name: Ar5IconName }) {
  const Icon = AR5_ICONS[name];
  return <Icon className="ar5-medallion-svg-icon" aria-hidden="true" focusable="false" data-ar5-icon={name} />;
}

