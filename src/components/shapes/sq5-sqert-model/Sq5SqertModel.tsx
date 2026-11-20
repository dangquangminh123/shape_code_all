'use client';

import React, { useId, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import {
  SQ5_DIMENSIONS,
  SQ5_DIMENSIONS_MAP,
  type Sq5DimensionConfig,
  type Sq5DimensionId,
} from './sq5-sqert-model.config';
import {
  SQ5_HUB_GEOMETRY,
  SQ5_PETALS_GEOMETRY,
  SQ5_VIEWBOX,
} from './sq5-sqert-model.geometry';
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
          {/* Left Column: 5 Elegant Legend Items matching original template */}
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
                viewBox={SQ5_VIEWBOX}
                className="sq5-svg"
                preserveAspectRatio="xMidYMid meet"
                role="img"
                aria-label="Mô hình SQERT ngũ giác"
              >
                <defs>
                  {/* Petal subtle gradients matching slide colors */}
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

                {/* 5 Distinct Petals using their own original SVG paths & exact bounding boxes */}
                {SQ5_PETALS_GEOMETRY.map((p) => {
                  const dim = SQ5_DIMENSIONS_MAP[p.id];
                  const isActive = activeId === p.id;

                  return (
                    <g
                      key={p.id}
                      className={`sq5-petal ${isActive ? 'is-active' : ''}`}
                      onClick={() => handleSelect(p.id)}
                      onMouseEnter={() => setHoveredId(p.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Yếu tố ${p.letter}: ${dim.name}`}
                    >
                      <path
                        className="sq5-petal__path"
                        d={p.d}
                        transform={`translate(${p.x} ${p.y}) scale(${p.scaleX} ${p.scaleY})`}
                        fill={`url(#sq5-grad-${instanceId}-${p.id})`}
                      />
                    </g>
                  );
                })}

                {/* 5 Letters S, Q, E, R, T placed upright at optical centers of bulbs */}
                {SQ5_PETALS_GEOMETRY.map((p) => {
                  const isActive = activeId === p.id;

                  return (
                    <text
                      key={`letter-${p.id}`}
                      x={p.letterX}
                      y={p.letterY}
                      textAnchor="middle"
                      dominantBaseline="central"
                      className={`sq5-petal__letter ${isActive ? 'is-active' : ''}`}
                      fontSize={28}
                    >
                      {p.letter}
                    </text>
                  );
                })}

                {/* Center Hub: Dark Circle with "SQERT" from Tròn.svg */}
                <g className="sq5-hub" pointerEvents="none">
                  <circle
                    cx={SQ5_HUB_GEOMETRY.cx}
                    cy={SQ5_HUB_GEOMETRY.cy}
                    r={SQ5_HUB_GEOMETRY.r}
                    fill="#283542"
                    className="sq5-hub__circle"
                  />
                  <text
                    x={SQ5_HUB_GEOMETRY.cx}
                    y={SQ5_HUB_GEOMETRY.cy}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="sq5-hub__text"
                  >
                    {SQ5_HUB_GEOMETRY.text}
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
