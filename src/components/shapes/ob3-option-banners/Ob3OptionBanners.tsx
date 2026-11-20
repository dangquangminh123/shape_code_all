'use client';

import React, { useId, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { OB3_OPTIONS, type Ob3OptionConfig } from './ob3-option-banners.config';
import {
  OB3_FOLD_POLYGON_POINTS,
  OB3_LOOP_FRONT_PATH,
  OB3_MIDDLE_BAND_PATH,
  OB3_RIGHT_RECT,
  OB3_RIGHT_TRANSFORM,
  OB3_VIEWBOX,
} from './ob3-option-banners.geometry';
import './ob3-option-banners.css';

export interface Ob3OptionBannersProps {
  headerTitle?: string;
  headerSubtitle?: string;
  className?: string;
}

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
              <div key={option.id} role="listitem" className="ob3-row-wrapper">
                <button
                  ref={(el) => {
                    rowRefs.current[idx] = el;
                  }}
                  type="button"
                  className={`ob3-row ${isActive ? 'is-active' : ''}`}
                  style={
                    {
                      '--ob3-primary': option.primaryColor,
                      '--ob3-right': option.rightFaceColor,
                      '--ob3-fold': option.foldColor,
                    } as CSSProperties
                  }
                  onClick={() => handleSelect(option.id)}
                  onMouseEnter={() => setHoveredId(option.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onFocus={() => setFocusedId(option.id)}
                  onBlur={() => setFocusedId(null)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  aria-pressed={selectedId === option.id}
                  aria-label={`${option.label}: ${option.title}`}
                >
                  {/* Desktop Vector SVG View (>= 721px) */}
                  <div className="ob3-desktop-view">
                    <svg
                      viewBox={OB3_VIEWBOX}
                      className="ob3-svg"
                      preserveAspectRatio="xMidYMid meet"
                      aria-hidden="true"
                    >
                      {/* Layer 1: MIDDLE (Path #2 of 2.svg + title/subtext) */}
                      <g className="ob3-layer--middle">
                        <path
                          className="ob3-mid__fill"
                          d={OB3_MIDDLE_BAND_PATH}
                          fill={option.primaryColor}
                        />
                        <foreignObject
                          x="82"
                          y="38"
                          width="97"
                          height="36"
                          style={{ pointerEvents: 'none' }}
                        >
                          <div className="ob3-mid__content">
                            <span className="ob3-mid__title">{option.title}</span>
                            <span className="ob3-mid__sub">{option.subtext}</span>
                          </div>
                        </foreignObject>
                      </g>

                      {/* Layer 2: RIGHT (1.svg 3D Fold Polygon + Right Rect Face + Option Label + Description) */}
                      <g className="ob3-layer--right">
                        <g transform={OB3_RIGHT_TRANSFORM}>
                          <polygon
                            points={OB3_FOLD_POLYGON_POINTS}
                            fill={option.foldColor}
                          />
                          <rect
                            x={OB3_RIGHT_RECT.x}
                            y={OB3_RIGHT_RECT.y}
                            width={OB3_RIGHT_RECT.width}
                            height={OB3_RIGHT_RECT.height}
                            fill={option.rightFaceColor}
                          />
                        </g>

                        {/* Option Label (Option 01 / 02 / 03) */}
                        <text
                          x="206"
                          y="54.5"
                          className="ob3-right__label"
                          dominantBaseline="central"
                          fill="#ffffff"
                          style={{ pointerEvents: 'none', userSelect: 'none' }}
                        >
                          {option.label}
                        </text>

                        {/* Description block */}
                        <foreignObject
                          x="264"
                          y="30"
                          width="181"
                          height="43"
                          style={{ pointerEvents: 'none' }}
                        >
                          <div className="ob3-right__desc">
                            {option.description}
                          </div>
                        </foreignObject>
                      </g>

                      {/* Layer 3: FRONT (Path #1 of 2.svg Arrow Loop + White Line Icon on Arrow) */}
                      <g className="ob3-layer--front">
                        <path
                          className="ob3-loop__arrow"
                          d={OB3_LOOP_FRONT_PATH}
                          fill={option.primaryColor}
                        />
                        <foreignObject
                          x="31"
                          y="27"
                          width="22"
                          height="22"
                          style={{ pointerEvents: 'none' }}
                        >
                          <div className="ob3-icon-host">
                            <Icon />
                          </div>
                        </foreignObject>
                      </g>
                    </svg>
                  </div>

                  {/* Mobile Card View (<= 720px) */}
                  <div className="ob3-mobile-view" aria-hidden="true">
                    <div className="ob3-mobile__icon-strip">
                      <Icon className="ob3-mobile__icon" />
                    </div>
                    <div className="ob3-mobile__body">
                      <div className="ob3-mobile__header">
                        <span className="ob3-mobile__badge">{option.label}</span>
                        <h3 className="ob3-mobile__title">{option.title}</h3>
                      </div>
                      <p className="ob3-mobile__desc">{option.description}</p>
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
