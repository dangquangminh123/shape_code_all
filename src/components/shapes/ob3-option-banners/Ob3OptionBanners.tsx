'use client';

import React, { useId, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { OB3_OPTIONS, type Ob3OptionConfig } from './ob3-option-banners.config';
import './ob3-option-banners.css';

export interface Ob3OptionBannersProps {
  headerTitle?: string;
  headerSubtitle?: string;
  className?: string;
}

const PATH_LOOP_FRONT =
  'M51.95,73.07V56.31c-11.8,0.16-23.62,0.32-35.42,0.48c-1.56,0-5.97,0.22-10.28,3.3c-4,2.85-5.67,6.55-6.24,8.04' +
  'c0-9.97,0-19.93,0-29.9c0.17-4.27,1.13-14.96,8.5-19.4c3.02-1.82,6.02-1.97,8-1.97c11.81-0.03,23.64-0.07,35.45-0.1V0' +
  'c8.84,12.17,17.68,24.36,26.52,36.53C69.63,48.71,60.79,60.88,51.95,73.07z';

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

        {/* 3 Horizontal Ribbon Banners */}
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
                  viewBox="0 0 456 81"
                  className="ob3-svg"
                  preserveAspectRatio="xMidYMid meet"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id={`ob3-loop-grad-${instanceId}-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={option.primaryColor} />
                      <stop offset="100%" stopColor={option.darkColor} />
                    </linearGradient>

                    <linearGradient id={`ob3-mid-grad-${instanceId}-${idx}`} x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor={option.darkColor} />
                      <stop offset="100%" stopColor={option.primaryColor} />
                    </linearGradient>

                    <linearGradient id={`ob3-fold-grad-${instanceId}-${idx}`} x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#0a121e" stopOpacity="0.8" />
                      <stop offset="100%" stopColor={option.darkColor} />
                    </linearGradient>

                    <linearGradient id={`ob3-right-grad-${instanceId}-${idx}`} x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor={option.primaryColor} />
                      <stop offset="100%" stopColor={option.primaryColor} stopOpacity="0.88" />
                    </linearGradient>

                    <filter id={`ob3-loop-shadow-${instanceId}-${idx}`} x="-20%" y="-20%" width="150%" height="150%">
                      <feDropShadow dx="3" dy="4" stdDeviation="4" floodOpacity="0.28" />
                    </filter>
                  </defs>

                  {/* 1. Rear Loop Band extending into Middle Section */}
                  <path
                    className="ob3-bar__fill"
                    d={PATH_MID_BAND}
                    fill={`url(#ob3-mid-grad-${instanceId}-${idx})`}
                  />

                  {/* 2. Middle Text Block */}
                  <g className="ob3-bar__content">
                    <text
                      x="94"
                      y="52"
                      fill="#ffffff"
                      fontFamily="system-ui, -apple-system, sans-serif"
                      fontSize="9.5"
                      fontWeight="700"
                    >
                      {option.title}
                    </text>
                    <text
                      x="94"
                      y="65"
                      fill="rgba(255,255,255,0.85)"
                      fontFamily="system-ui, -apple-system, sans-serif"
                      fontSize="6.2"
                    >
                      {option.description.length > 55 ? option.description.slice(0, 52) + '...' : option.description}
                    </text>
                  </g>

                  {/* 3. Front Arrow Loop with Cylindrical curl */}
                  <path
                    className="ob3-loop__arrow"
                    d={PATH_LOOP_FRONT}
                    fill={`url(#ob3-loop-grad-${instanceId}-${idx})`}
                    filter={`url(#ob3-loop-shadow-${instanceId}-${idx})`}
                  />

                  {/* 4. Circular Icon Badge on Loop Face */}
                  <g className="ob3-loop__icon-badge">
                    <circle
                      cx="25"
                      cy="45"
                      r="13"
                      fill="rgba(255, 255, 255, 0.22)"
                      stroke="#ffffff"
                      strokeWidth="1.6"
                    />
                    <foreignObject x="17" y="37" width="16" height="16">
                      <div className="ob3-icon-host">
                        <Icon />
                      </div>
                    </foreignObject>
                  </g>

                  {/* 5. Slanted 3D Fold Connector and Right Banner */}
                  <g transform="translate(182.2, 0)">
                    {/* Slanted Fold */}
                    <polygon
                      points="18.46,0 0,10.48 0,81 18.46,70.52"
                      fill={`url(#ob3-fold-grad-${instanceId}-${idx})`}
                    />

                    {/* Right Rectangle */}
                    <rect
                      x="18.46"
                      y="0"
                      width="254.44"
                      height="70.52"
                      fill={`url(#ob3-right-grad-${instanceId}-${idx})`}
                    />

                    {/* Right Banner Content */}
                    <text
                      x="34"
                      y="40"
                      fill="#ffffff"
                      fontFamily="system-ui, -apple-system, sans-serif"
                      fontSize="14.5"
                      fontWeight="800"
                      letterSpacing="-0.02em"
                    >
                      {option.label}
                    </text>

                    <text
                      x="118"
                      y="32"
                      fill="#ffffff"
                      fontFamily="system-ui, -apple-system, sans-serif"
                      fontSize="7.8"
                      fontWeight="600"
                    >
                      {option.description.slice(0, 48)}
                    </text>

                    <text
                      x="118"
                      y="46"
                      fill="rgba(255,255,255,0.88)"
                      fontFamily="system-ui, -apple-system, sans-serif"
                      fontSize="7.5"
                    >
                      {option.description.slice(48, 105)}
                    </text>
                  </g>
                </svg>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
