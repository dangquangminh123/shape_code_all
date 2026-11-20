'use client';

import React, { useId, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { SQ5_DIMENSIONS, type Sq5DimensionConfig, type Sq5DimensionId } from './sq5-sqert-model.config';
import './sq5-sqert-model.css';

export interface Sq5SqertModelProps {
  headerTitle?: string;
  headerSubtitle?: string;
  className?: string;
}

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
          {/* Left Column: 5 Elegant Legend Items */}
          <div className="sq5-legend" role="list" aria-label="5 yếu tố cốt lõi của mô hình SQERT">
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
                  className={`sq5-item ${isActive ? 'is-active' : ''}`}
                  style={{ '--sq5-color': item.color } as CSSProperties}
                  onClick={() => handleSelect(item.id)}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onFocus={() => setFocusedId(item.id)}
                  onBlur={() => setFocusedId(null)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  aria-pressed={selectedId === item.id}
                  aria-label={`${item.letter} — ${item.name} (${item.vietnameseTitle})`}
                >
                  <span className="sq5-item__badge" aria-hidden="true">
                    <Icon />
                  </span>
                  <div className="sq5-item__body">
                    <div className="sq5-item__header">
                      <span className="sq5-item__title">{item.name}</span>
                      <span className="sq5-item__vntitle">— {item.vietnameseTitle}</span>
                    </div>
                    <p className="sq5-item__desc">{item.description}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Exact 1:1 Unified Pinwheel Stage */}
          <div className="sq5-stage" aria-label="Biểu đồ cánh quạt SQERT 5 góc tương tác">
            <div className="sq5-vortex">
              <svg
                viewBox="20 15 400 380"
                className="sq5-svg"
                preserveAspectRatio="xMidYMid meet"
                aria-hidden="true"
              >
                <defs>
                  {/* Subtle 3D Drop Shadow */}
                  <filter id={`sq5-shadow-${instanceId}`} x="-15%" y="-15%" width="130%" height="130%">
                    <feDropShadow dx="0" dy="4" stdDeviation="5" floodOpacity="0.20" />
                  </filter>
                  <filter id={`sq5-active-shadow-${instanceId}`} x="-25%" y="-25%" width="150%" height="150%">
                    <feDropShadow dx="0" dy="6" stdDeviation="8" floodOpacity="0.35" />
                  </filter>
                  <filter id={`sq5-hub-shadow-${instanceId}`} x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="5" floodOpacity="0.25" />
                  </filter>

                  {/* Dimension Gradients matching original palette */}
                  {SQ5_DIMENSIONS.map((dim) => (
                    <linearGradient
                      key={`grad-${dim.id}`}
                      id={`sq5-grad-${instanceId}-${dim.id}`}
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor={dim.gradientTop} />
                      <stop offset="100%" stopColor={dim.gradientBot} />
                    </linearGradient>
                  ))}
                </defs>

                {/* 5 Petals Layer in natural swirl stacking order: T(4) -> R(3) -> E(2) -> Q(1) -> S(0) */}
                {[4, 3, 2, 1, 0].map((idx) => {
                  const dim = SQ5_DIMENSIONS[idx];
                  const isActive = activeId === dim.id;

                  return (
                    <g
                      key={dim.id}
                      className={`sq5-petal ${isActive ? 'is-active' : ''}`}
                      onClick={() => handleSelect(dim.id)}
                      onMouseEnter={() => setHoveredId(dim.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      style={{ cursor: 'pointer' }}
                    >
                      <path
                        d={dim.path}
                        fill={`url(#sq5-grad-${instanceId}-${dim.id})`}
                        filter={isActive ? `url(#sq5-active-shadow-${instanceId})` : `url(#sq5-shadow-${instanceId})`}
                        stroke="#ffffff"
                        strokeWidth="3"
                        className="sq5-petal__path"
                      />
                    </g>
                  );
                })}

                {/* Center Hub: Dark Circle with "SQERT" */}
                <g className="sq5-hub" filter={`url(#sq5-hub-shadow-${instanceId})`}>
                  <circle
                    cx="221.9"
                    cy="222.6"
                    r="36"
                    fill="#1e293b"
                    stroke="#ffffff"
                    strokeWidth="3"
                  />
                  <text
                    x="221.9"
                    y="227"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="12.5"
                    fontWeight="800"
                    fontFamily="system-ui, -apple-system, sans-serif"
                    letterSpacing="0.06em"
                    style={{ pointerEvents: 'none', userSelect: 'none' }}
                  >
                    SQERT
                  </text>
                </g>

                {/* 5 Letters S, Q, E, R, T placed upright inside circular bulbs */}
                {SQ5_DIMENSIONS.map((dim) => {
                  const isActive = activeId === dim.id;

                  return (
                    <text
                      key={`label-${dim.id}`}
                      x={dim.geometry.letterX}
                      y={dim.geometry.letterY}
                      className={`sq5-petal__letter ${isActive ? 'is-active' : ''}`}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="#ffffff"
                      fontSize="26"
                      fontWeight="800"
                      fontFamily="system-ui, -apple-system, sans-serif"
                      style={{ pointerEvents: 'none', userSelect: 'none' }}
                    >
                      {dim.letter}
                    </text>
                  );
                })}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
