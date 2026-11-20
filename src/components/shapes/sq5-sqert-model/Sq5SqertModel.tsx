'use client';

import React, { useId, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { SQ5_DIMENSIONS, type Sq5DimensionConfig, type Sq5DimensionId } from './sq5-sqert-model.config';
import './sq5-sqert-model.css';

export interface Sq5SqertModelProps {
  headerTitle?: string;
  headerSubtitle?: string;
  className?: string;
}

const PETAL_PATH =
  'M51.37,23.62c-0.32,0.18-0.65,0.36-0.96,0.55c-0.32,0.18-0.63,0.37-0.94,0.58c-0.93,0.58-1.84,1.2-2.73,1.86' +
  'c-0.3,0.22-0.59,0.44-0.88,0.67c-0.29,0.22-0.58,0.45-0.86,0.68c-0.02,0.02-0.04,0.03-0.05,0.04c-0.55,0.45-1.08,0.92-1.61,1.4' +
  'c-0.27,0.24-0.54,0.5-0.8,0.75c-0.26,0.25-0.52,0.51-0.78,0.77c-0.26,0.26-0.52,0.52-0.76,0.79c-0.26,0.26-0.51,0.53-0.74,0.81' +
  'c-0.25,0.27-0.5,0.55-0.72,0.83c-0.25,0.28-0.48,0.56-0.7,0.85c-0.24,0.29-0.46,0.57-0.68,0.86c-0.23,0.29-0.45,0.59-0.66,0.88' +
  'c-0.22,0.3-0.44,0.59-0.64,0.9c-1.87,2.72-3.44,5.67-4.64,8.79c-0.14,0.35-0.27,0.7-0.39,1.05c-0.13,0.35-0.25,0.71-0.36,1.06' +
  'c-0.12,0.36-0.24,0.71-0.34,1.07c-0.11,0.36-0.22,0.72-0.31,1.08c-0.1,0.36-0.19,0.73-0.28,1.1c-0.79,3.24-1.21,6.64-1.21,10.12' +
  'c0,7.18,1.76,13.94,4.87,19.88c-8.86-7.37-14.69-18.24-15.39-30.48C7.96,47.49,0,37.54,0,25.73C0,11.52,11.52,0,25.73,0' +
  'c7.59,0,14.41,3.28,19.11,8.51C48.51,12.58,50.9,17.83,51.37,23.62z';

export default function Sq5SqertModel({
  headerTitle = 'Mô Hình Quản Lý Dự Án SQERT',
  headerSubtitle = 'Cân bằng ngũ giác chiến lược giữa Phạm vi, Chất lượng, Nguồn lực, Rủi ro và Thời gian',
  className = '',
}: Sq5SqertModelProps) {
  const instanceId = useId();
  const [hoveredId, setHoveredId] = useState<Sq5DimensionId | null>(null);
  const [focusedId, setFocusedId] = useState<Sq5DimensionId | null>(null);
  const [selectedId, setSelectedId] = useState<Sq5DimensionId | null>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeId = hoveredId ?? focusedId ?? selectedId;

  function handleSelect(id: Sq5DimensionId) {
    setSelectedId((prev) => (prev === id ? null : id));
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | null = null;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextIndex = (index + 1) % SQ5_DIMENSIONS.length;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextIndex = (index - 1 + SQ5_DIMENSIONS.length) % SQ5_DIMENSIONS.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = SQ5_DIMENSIONS.length - 1;
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setSelectedId(null);
      setHoveredId(null);
      return;
    }

    if (nextIndex !== null) {
      event.preventDefault();
      cardRefs.current[nextIndex]?.focus();
    }
  }

  return (
    <section
      className={`sq5-module ${className}`.trim()}
      aria-labelledby={`${instanceId}-heading`}
      data-sq5-root
    >
      <div className="sq5-inner">
        <header className="sq5-header">
          <h2 className="sq5-header__title" id={`${instanceId}-heading`}>
            {headerTitle}
          </h2>
          <p className="sq5-header__subtitle">{headerSubtitle}</p>
        </header>

        <div className="sq5-layout">
          {/* Left Column: 5 Legend Cards */}
          <div className="sq5-legend" role="list" aria-label="5 yếu tố cốt lõi của SQERT">
            {SQ5_DIMENSIONS.map((item, idx) => {
              const isActive = activeId === item.id;
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  type="button"
                  role="listitem"
                  className={`sq5-card ${isActive ? 'is-active' : ''}`}
                  style={{ '--sq5-accent': item.color } as CSSProperties}
                  onClick={() => handleSelect(item.id)}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onFocus={() => setFocusedId(item.id)}
                  onBlur={() => setFocusedId(null)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  aria-pressed={selectedId === item.id}
                  aria-label={`${item.name}: ${item.vietnameseTitle}`}
                >
                  <div className="sq5-card__badge" style={{ backgroundColor: item.color }} aria-hidden="true">
                    <Icon />
                  </div>
                  <div className="sq5-card__content">
                    <h3 className="sq5-card__title" style={{ color: item.color }}>
                      <span>{item.name}</span>
                    </h3>
                    <p className="sq5-card__desc">{item.description}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Mathematical Symmetrical Pinwheel Vortex */}
          <div className="sq5-stage" aria-label="Biểu đồ cối xay gió SQERT 5 cánh">
            <div className="sq5-vortex">
              <svg
                viewBox="-160 -160 320 320"
                className="sq5-svg"
                aria-hidden="true"
              >
                <defs>
                  {/* Master Petal Shape */}
                  <path id={`sq5-petal-shape-${instanceId}`} d={PETAL_PATH} transform="translate(-25.73, -110)" />

                  {/* Drop Shadow Filter */}
                  <filter id={`sq5-shadow-${instanceId}`} x="-20%" y="-20%" width="150%" height="150%">
                    <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.22" />
                  </filter>
                  <filter id={`sq5-hub-shadow-${instanceId}`} x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="3" stdDeviation="5" floodOpacity="0.35" />
                  </filter>

                  {/* Per-petal Gradients */}
                  {SQ5_DIMENSIONS.map((dim) => (
                    <linearGradient
                      key={dim.id}
                      id={`sq5-grad-${instanceId}-${dim.id}`}
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor={dim.gradientTop} />
                      <stop offset="100%" stopColor={dim.gradientBot} />
                    </linearGradient>
                  ))}
                </defs>

                {/* 5 Rotating Petals */}
                {SQ5_DIMENSIONS.map((dim) => {
                  const isActive = activeId === dim.id;
                  const rad = (dim.angle * Math.PI) / 180;
                  const letterX = 84.27 * Math.sin(rad);
                  const letterY = -84.27 * Math.cos(rad);

                  return (
                    <g
                      key={dim.id}
                      className={`sq5-petal ${isActive ? 'is-active' : ''}`}
                      onClick={() => handleSelect(dim.id)}
                      onMouseEnter={() => setHoveredId(dim.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      style={{ cursor: 'pointer' }}
                    >
                      {/* Swirling Teardrop Petal rotated around center (0,0) */}
                      <g transform={`rotate(${dim.angle})`}>
                        <use
                          href={`#sq5-petal-shape-${instanceId}`}
                          fill={`url(#sq5-grad-${instanceId}-${dim.id})`}
                          filter={`url(#sq5-shadow-${instanceId})`}
                        />
                      </g>

                      {/* Upright Letter Centered in Bulb */}
                      <text
                        x={letterX}
                        y={letterY}
                        className="sq5-petal__letter"
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill="#ffffff"
                        fontSize="26"
                        fontWeight="800"
                        fontFamily="system-ui, -apple-system, sans-serif"
                        letterSpacing="0"
                        style={{ pointerEvents: 'none', userSelect: 'none' }}
                      >
                        {dim.letter}
                      </text>
                    </g>
                  );
                })}

                {/* Central Dark Circular Hub */}
                <g className="sq5-hub" filter={`url(#sq5-hub-shadow-${instanceId})`}>
                  <circle cx="0" cy="0" r="35" fill="#2d3436" />
                  <text
                    x="0"
                    y="1"
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="#ffffff"
                    fontSize="13.5"
                    fontWeight="800"
                    fontFamily="system-ui, -apple-system, sans-serif"
                    letterSpacing="0.04em"
                    style={{ pointerEvents: 'none', userSelect: 'none' }}
                  >
                    SQERT
                  </text>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
