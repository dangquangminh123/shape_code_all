import React from 'react';
import { LuHeartHandshake, LuPartyPopper, LuTreePine, LuTrophy } from 'react-icons/lu';
import type { Gb5IconKind } from './gb5-gift-boxes.config';

export interface Gb5StepIconProps {
  kind: Gb5IconKind;
  accentColor: string;
  darkColor?: string;
  className?: string;
}

/** Gift-category icons are shared by the boxes and their timeline captions. */
export function Gb5StepIcon({
  kind,
  accentColor,
  darkColor = '#898d8b',
  className = 'gb5-body-icon-svg',
}: Gb5StepIconProps) {
  switch (kind) {
    case 'award':
    case 'gratitude':
    case 'christmas':
    case 'celebration': {
      const Icon = {
        award: LuTrophy,
        gratitude: LuHeartHandshake,
        christmas: LuTreePine,
        celebration: LuPartyPopper,
      }[kind];
      return <Icon className={className} color={accentColor} strokeWidth={1.8} aria-hidden="true" focusable="false" />;
    }
    case 'team':
      return (
        <svg viewBox="0 0 80 62" width="1em" height="1em" className={className} aria-hidden="true" focusable="false">
          {/* Left person (charcoal) */}
          <circle cx="19" cy="21" r="8.2" fill={darkColor} />
          <path
            d="M 5 50 C 5 39.5 11 33.5 19 33.5 C 25.5 33.5 30.5 37.5 32 45 L 32 50 Z"
            fill={darkColor}
          />
          <path d="M 19 35 L 17.3 43.5 L 19 46 L 20.7 43.5 Z" fill="#ffffff" />

          {/* Right person (charcoal) */}
          <circle cx="61" cy="21" r="8.2" fill={darkColor} />
          <path
            d="M 48 45 C 49.5 37.5 54.5 33.5 61 33.5 C 69 33.5 75 39.5 75 50 L 48 50 Z"
            fill={darkColor}
          />
          <path d="M 61 35 L 59.3 43.5 L 61 46 L 62.7 43.5 Z" fill="#ffffff" />

          {/* Center foreground person (accent color) */}
          <circle cx="40" cy="18.5" r="10.2" fill={accentColor} stroke="#f5f5f7" strokeWidth="1.6" />
          <path
            d="M 22.5 53 C 22.5 40 30 33 40 33 C 50 33 57.5 40 57.5 53 Z"
            fill={accentColor}
            stroke="#f5f5f7"
            strokeWidth="1.6"
          />
          <path d="M 40 35 L 37.8 46.2 L 40 49.5 L 42.2 46.2 Z" fill="#ffffff" />
        </svg>
      );
  }
}
