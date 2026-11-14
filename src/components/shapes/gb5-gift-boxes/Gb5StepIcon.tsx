import React from 'react';
import type { Gb5IconKind } from './gb5-gift-boxes.config';

export interface Gb5StepIconProps {
  kind: Gb5IconKind;
  accentColor: string;
  darkColor?: string;
  className?: string;
}

/**
 * Renders the 5 two-tone business icons inside each Gift Box (and mini timeline caption)
 * matching reference 32.jpg:
 *  - team  (01): 3 business people (center in emerald, flanking two in charcoal)
 *  - money (02): Tied money bag in charcoal with azure '$' emblem
 *  - gears (03): 3 interlocking gears (two charcoal, right gear in gold)
 *  - cycle (04): Two people linked by opposing charcoal/magenta feedback arrows
 *  - chart (05): 4-column segmented bar chart on L-axis (col 2 in coral-red)
 */
export function Gb5StepIcon({
  kind,
  accentColor,
  darkColor = '#898d8b',
  className = 'gb5-body-icon-svg',
}: Gb5StepIconProps) {
  switch (kind) {
    case 'team':
      return (
        <svg viewBox="0 0 80 62" className={className} aria-hidden="true">
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

    case 'money':
      return (
        <svg viewBox="0 0 80 62" className={className} aria-hidden="true">
          {/* Bag top ruffle & neck knot */}
          <path
            d="M 23 2 C 30 -2 33 8 40 7 C 47 6 49 -1 57 3 C 56 10 48 11 46 17 L 34 17 C 32 11 25 9 23 2 Z"
            fill={darkColor}
          />
          <rect x="33" y="15.5" width="14" height="3.6" rx="1.8" fill="#f3f4f6" />
          {/* Money sack body */}
          <path
            d="M 33.5 18.5 C 22 23.5 16.5 34 17.5 45 C 18.3 52.5 25 56.5 40 56.5 C 55 56.5 61.7 52.5 62.5 45 C 63.5 34 58 23.5 46.5 18.5 Z"
            fill={darkColor}
          />
          {/* Dollar emblem in step accent color */}
          <text
            x="40"
            y="46.5"
            textAnchor="middle"
            fill={accentColor}
            fontSize="26"
            fontWeight="900"
            fontFamily="Arial, sans-serif"
          >
            $
          </text>
        </svg>
      );

    case 'gears':
      return (
        <svg viewBox="0 0 80 62" className={className} aria-hidden="true">
          {/* Top-left large gear (charcoal) */}
          <g transform="translate(27, 23)">
            <circle r="11.5" fill="none" stroke={darkColor} strokeWidth="6.2" />
            <circle r="15.2" fill="none" stroke={darkColor} strokeWidth="3.8" strokeDasharray="4.2 3.7" />
          </g>
          {/* Bottom-center small gear (charcoal) */}
          <g transform="translate(36, 47.5)">
            <circle r="6.6" fill="none" stroke={darkColor} strokeWidth="4.4" />
            <circle r="9.4" fill="none" stroke={darkColor} strokeWidth="2.8" strokeDasharray="3.2 2.9" />
          </g>
          {/* Right medium gear (accent color) */}
          <g transform="translate(55.5, 33.5)">
            <circle r="9.4" fill="none" stroke={accentColor} strokeWidth="5.4" />
            <circle r="12.8" fill="none" stroke={accentColor} strokeWidth="3.4" strokeDasharray="3.8 3.3" />
          </g>
        </svg>
      );

    case 'cycle':
      return (
        <svg viewBox="0 0 80 84" className={className} aria-hidden="true">
          {/* Two opposing arrows connect people, as in the reference artwork. */}
          <path d="M 39 70 A 28 28 0 0 1 15 39" fill="none" stroke={darkColor} strokeWidth="9" />
          <polygon points="16,30 5,44 26,43" fill={darkColor} />
          <path d="M 40 18 A 28 28 0 0 1 65 49" fill="none" stroke={accentColor} strokeWidth="9" />
          <polygon points="64,58 74,44 54,45" fill={accentColor} />
          <g data-gb5-cycle-person="start" fill={darkColor}>
            <ellipse cx="27" cy="10" rx="7" ry="8.5" />
            <path d="M 15 32 C 15 23 20 20 27 20 C 34 20 39 23 39 32 Q 27 38 15 32 Z" />
            <path d="M 27 21 L 25.5 30 L 27 33 L 28.5 30 Z" fill="#fff" />
          </g>
          <g data-gb5-cycle-person="end" fill={accentColor}>
            <ellipse cx="53" cy="60" rx="7" ry="8.5" />
            <path d="M 41 82 C 41 73 46 70 53 70 C 60 70 65 73 65 82 Q 53 86 41 82 Z" />
            <path d="M 53 71 L 51.5 80 L 53 83 L 54.5 80 Z" fill="#fff" />
          </g>
        </svg>
      );

    case 'chart': {
      const cols = [
        { x: 18, count: 5, color: darkColor },
        { x: 32, count: 7, color: accentColor },
        { x: 46, count: 3, color: darkColor },
        { x: 60, count: 8, color: darkColor },
      ];
      return (
        <svg viewBox="0 0 80 62" className={className} aria-hidden="true">
          {/* L-shaped chart axis */}
          <path
            d="M 12 8 L 12 53 L 73 53"
            fill="none"
            stroke={darkColor}
            strokeWidth="2.6"
            strokeLinecap="square"
          />
          {cols.map((col, cIdx) =>
            Array.from({ length: col.count }).map((_, rIdx) => {
              const segY = 46.5 - rIdx * 5.1;
              return (
                <rect
                  key={`${cIdx}-${rIdx}`}
                  x={col.x}
                  y={segY}
                  width="9.6"
                  height="3.3"
                  rx="0.6"
                  fill={col.color}
                />
              );
            }),
          )}
        </svg>
      );
    }
  }
}
