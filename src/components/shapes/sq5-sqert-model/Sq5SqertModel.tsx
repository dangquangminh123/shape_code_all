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
                viewBox="70 60 260 260"
                className="sq5-svg"
                preserveAspectRatio="xMidYMid meet"
                aria-hidden="true"
              >
                <defs>
                  {/* Subtle 3D Drop Shadow */}
                  <filter id={`sq5-shadow-${instanceId}`} x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="3" stdDeviation="4" floodOpacity="0.2" />
                  </filter>
                  <filter id={`sq5-active-shadow-${instanceId}`} x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="6" stdDeviation="8" floodOpacity="0.4" />
                  </filter>
                  <filter id={`sq5-hub-shadow-${instanceId}`} x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="3" stdDeviation="4" floodOpacity="0.32" />
                  </filter>

                  {/* Dimension Gradients matching original palette */}
                  <linearGradient id={`sq5-grad-${instanceId}-scope`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#14b8a6" />
                    <stop offset="100%" stopColor="#0f766e" />
                  </linearGradient>
                  <linearGradient id={`sq5-grad-${instanceId}-quality`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#84cc16" />
                    <stop offset="100%" stopColor="#4d7c0f" />
                  </linearGradient>
                  <linearGradient id={`sq5-grad-${instanceId}-effort`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#c2410c" />
                  </linearGradient>
                  <linearGradient id={`sq5-grad-${instanceId}-risk`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="100%" stopColor="#b91c1c" />
                  </linearGradient>
                  <linearGradient id={`sq5-grad-${instanceId}-time`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#475569" />
                    <stop offset="100%" stopColor="#1e293b" />
                  </linearGradient>
                </defs>

                {/* 5 Petals Layer in natural swirl stacking order: T(4) -> R(3) -> E(2) -> Q(1) -> S(0) */}
                {[4, 3, 2, 1, 0].map((idx) => {
                  const dim = SQ5_DIMENSIONS[idx];
                  const isActive = activeId === dim.id;

                  return (
                    <g
                      key={dim.id}
                      transform={`translate(${dim.geometry.offsetX}, ${dim.geometry.offsetY})`}
                    >
                      <g
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
                          strokeWidth="1.2"
                          className="sq5-petal__path"
                        />
                      </g>
                    </g>
                  );
                })}

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
                      fontSize="23"
                      fontWeight="800"
                      fontFamily="system-ui, -apple-system, sans-serif"
                      style={{ pointerEvents: 'none', userSelect: 'none' }}
                    >
                      {dim.letter}
                    </text>
                  );
                })}

                {/* Center Hub: Dark Circle with "SQERT" */}
                <g className="sq5-hub" filter={`url(#sq5-hub-shadow-${instanceId})`}>
                  <circle
                    cx="200"
                    cy="200"
                    r="40.5"
                    fill="#1e293b"
                    stroke="#ffffff"
                    strokeWidth="2.5"
                  />
                  <text
                    x="200"
                    y="204.5"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="13.5"
                    fontWeight="800"
                    fontFamily="system-ui, -apple-system, sans-serif"
                    letterSpacing="0.05em"
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
