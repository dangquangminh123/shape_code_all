import { FaSignal } from 'react-icons/fa6';
import { PiCrosshairLight, PiHandTapLight, PiMagnifyingGlassLight, PiTimerLight } from 'react-icons/pi';
import type { Cs5IconName } from './cs5-cylinder-steps.config';

const ICONS = {
  target: PiCrosshairLight,
  tap: PiHandTapLight,
  growth: FaSignal,
  search: PiMagnifyingGlassLight,
  timer: PiTimerLight,
} as const;

export default function Cs5StepIcon({ name }: { name: Cs5IconName }) {
  const Icon = ICONS[name];
  return <Icon className={`cs5-pictogram cs5-pictogram--${name}`} aria-hidden="true" focusable="false" />;
}
