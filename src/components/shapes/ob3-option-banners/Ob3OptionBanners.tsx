'use client';

import React, { useId, useRef, useState, type KeyboardEvent } from 'react';
import { OB3_OPTIONS, type Ob3OptionConfig } from './ob3-option-banners.config';
import './ob3-option-banners.css';

export interface Ob3OptionBannersProps {
  headerTitle?: string;
  headerSubtitle?: string;
  className?: string;
}

// 2.svg: Element 1 (Left Loop & Arrowhead pointing right)
const PATH_LOOP_FRONT =
  'M51.95,73.07V56.31c-11.8,0.16-23.62,0.32-35.42,0.48c-1.56,0-5.97,0.22-10.28,3.3c-4,2.85-5.67,6.55-6.24,8.04' +
  'c0-9.97,0-19.93,0-29.9c0.17-4.27,1.13-14.96,8.5-19.4c3.02-1.82,6.02-1.97,8-1.97c11.81-0.03,23.64-0.07,35.45-0.1V0' +
  'c8.84,12.17,17.68,24.36,26.52,36.53C69.63,48.71,60.79,60.88,51.95,73.07z';

// 2.svg: Element 2 (Middle Band emerging from under arrowhead: y=35.33 to 81, x=77.59 to 182.2)
const PATH_MID_BAND =
  'M77.59,35.31c0.3,0.41,0.59,0.81,0.89,1.22c-8.84,12.18-17.68,24.36-26.52,36.54V56.31c-11.8,0.16-23.62,0.32-35.42,0.48' +
  'c-1.56,0-5.97,0.22-10.28,3.3c-4,2.85-5.67,6.55-6.24,8.04v-3.32c0,1.11,0,2.21,0,3.32c0.72,1.7,1.76,3.55,3.29,5.32' +
  'c6.5,7.52,16.68,7.58,18.97,7.54H182.2V35.33C147.33,35.32,112.46,35.32,77.59,35.31z';

export default function Ob3OptionBanners({
  headerTitle = '3 Lựa Chọn Chiến Lược (Option Banners)',
  headerSubtitle = 'Ba phương án giải pháp công nghệ bứt phá cho dự án phần mềm hiện đại',
  className = '',
}: Ob3OptionBannersProps) {
  const instanceId = useId();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const rowRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeId = hoveredId ?? focusedId ?? selectedId;

  function handleSelect(id: string) {
    setSelectedId((prev) => (prev === id ? null : id));
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | null = null;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      nextIndex = (index + 1) % OB3_OPTIONS.length;
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      nextIndex = (index - 1 + OB3_OPTIONS.length) % OB3_OPTIONS.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = OB3_OPTIONS.length - 1;
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setSelectedId(null);
      setHoveredId(null);
      return;
    }

    if (nextIndex !== null) {
      event.preventDefault();
      rowRefs.current[nextIndex]?.focus();
    }
  }

  return (
    <section
      className={`ob3-module ${className}`.trim()}
      aria-labelledby={`${instanceId}-heading`}
      data-ob3-root
    >
      <div className="ob3-inner">
        <header className="ob3-header">
          <h2 className="ob3-header__title" id={`${instanceId}-heading`}>
            {headerTitle}
          </h2>
          <p className="ob3-header__subtitle">{headerSubtitle}</p>
        </header>

        {/* 3 Horizontal Ribbon Banners (Exact Template Anatomy) */}
        <div className="ob3-stack" role="list" aria-label="3 dải băng phương án lựa chọn">
          {OB3_OPTIONS.map((option, idx) => {
            const isActive = activeId === option.id;
            const Icon = option.icon;

            return (
              <button
                key={option.id}
                ref={(el) => {
                  rowRefs.current[idx] = el;
                }}
                type="button"
                role="listitem"
                className={`ob3-row ${isActive ? 'is-active' : ''}`}
                onClick={() => handleSelect(option.id)}
                onMouseEnter={() => setHoveredId(option.id)}
                onMouseLeave={() => setHoveredId(null)}
                onFocus={() => setFocusedId(option.id)}
                onBlur={() => setFocusedId(null)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                aria-pressed={selectedId === option.id}
                aria-label={`${option.label}: ${option.title}`}
              >
                <svg
                  viewBox="0 0 460 85"
                  className="ob3-svg"
                  preserveAspectRatio="xMidYMid meet"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id={`ob3-loop-grad-${instanceId}-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={option.lightColor} />
                      <stop offset="100%" stopColor={option.primaryColor} />
                    </linearGradient>

                    <linearGradient id={`ob3-mid-grad-${instanceId}-${idx}`} x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor={option.primaryColor} />
                      <stop offset="100%" stopColor={option.darkColor} />
                    </linearGradient>

                    <linearGradient id={`ob3-fold-grad-${instanceId}-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={option.foldColor} />
                      <stop offset="100%" stopColor={option.darkColor} />
                    </linearGradient>

                    <linearGradient id={`ob3-right-grad-${instanceId}-${idx}`} x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor={option.primaryColor} />
                      <stop offset="100%" stopColor={option.darkColor} />
                    </linearGradient>

                    <filter id={`ob3-loop-shadow-${instanceId}-${idx}`} x="-20%" y="-20%" width="150%" height="150%">
                      <feDropShadow dx="2" dy="3" stdDeviation="3.5" floodOpacity="0.25" />
                    </filter>
                  </defs>

                  {/* 1. Middle Band (Original Illustrator Path 2 of 2.svg): y=35.33 to 81 */}
                  <path
                    className="ob3-bar__fill"
                    d={PATH_MID_BAND}
                    fill={`url(#ob3-mid-grad-${instanceId}-${idx})`}
                  />

                  {/* 2. Middle Text Block on Middle Band: Title + Subtext */}
                  <g className="ob3-bar__content" style={{ pointerEvents: 'none' }}>
                    <text
                      x="86"
                      y="51"
                      fill="#ffffff"
                      fontFamily="system-ui, -apple-system, sans-serif"
                      fontSize="9.2"
                      fontWeight="800"
                    >
                      {option.title}
                    </text>
                    <text
                      x="86"
                      y="63"
                      fill="rgba(255,255,255,0.92)"
                      fontFamily="system-ui, -apple-system, sans-serif"
                      fontSize="6.2"
                      fontWeight="500"
                    >
                      {option.subtext}
                    </text>
                    <text
                      x="86"
                      y="73"
                      fill="rgba(255,255,255,0.8)"
                      fontFamily="system-ui, -apple-system, sans-serif"
                      fontSize="5.8"
                      fontWeight="400"
                    >
                      {option.subtext2}
                    </text>
                  </g>

                  {/* 3. Left Ribbon Loop with Arrowhead (Path 1 of 2.svg, Layered IN FRONT) */}
                  <path
                    className="ob3-loop__arrow"
                    d={PATH_LOOP_FRONT}
                    fill={`url(#ob3-loop-grad-${instanceId}-${idx})`}
                    filter={`url(#ob3-loop-shadow-${instanceId}-${idx})`}
                  />

                  {/* 4. White Line Icon centered on curved face of Left Ribbon Loop */}
                  <g className="ob3-loop__icon-badge">
                    <circle
                      cx="25"
                      cy="45"
                      r="12.5"
                      fill="rgba(255, 255, 255, 0.2)"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                    />
                    <foreignObject x="16" y="36" width="18" height="18" style={{ pointerEvents: 'none' }}>
                      <div className="ob3-icon-host">
                        <Icon />
                      </div>
                    </foreignObject>
                  </g>

                  {/* 5. 3D Fold Connector: Steps up by 10.48px (from y=35.33..81 up to y=24.85..70.52) */}
                  <polygon
                    points="182.2,35.33 200.66,24.85 200.66,70.52 182.2,81"
                    fill={`url(#ob3-fold-grad-${instanceId}-${idx})`}
                  />

                  {/* 6. Right Banner: Exactly same height (45.67px) as middle band, stepped up seamlessly */}
                  <rect
                    x="200.66"
                    y="24.85"
                    width="253.34"
                    height="45.67"
                    fill={`url(#ob3-right-grad-${instanceId}-${idx})`}
                  />

                  {/* 7. Right Banner Option Label ("Option 01") on the left of the banner */}
                  <text
                    x="214"
                    y="52"
                    fill="#ffffff"
                    fontFamily="system-ui, -apple-system, sans-serif"
                    fontSize="13"
                    fontWeight="800"
                    letterSpacing="-0.02em"
                    style={{ pointerEvents: 'none', userSelect: 'none' }}
                  >
                    {option.label}
                  </text>

                  {/* 8. Vertical Divider Line on Right Banner */}
                  <line
                    x1="282"
                    y1="33"
                    x2="282"
                    y2="63"
                    stroke="rgba(255, 255, 255, 0.35)"
                    strokeWidth="1"
                    style={{ pointerEvents: 'none' }}
                  />

                  {/* 9. Right Banner Descriptive Paragraph (Auto-wrapped via foreignObject) */}
                  <foreignObject
                    x="292"
                    y="28"
                    width="156"
                    height="40"
                    style={{ pointerEvents: 'none' }}
                  >
                    <div className="ob3-right__desc">
                      {option.description}
                    </div>
                  </foreignObject>
                </svg>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
