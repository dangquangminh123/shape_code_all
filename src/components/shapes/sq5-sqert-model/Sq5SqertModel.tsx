'use client';

import React, { useId, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import {
  SQ5_DIMENSIONS,
  SQ5_DIMENSIONS_MAP,
  type Sq5DimensionId,
} from './sq5-sqert-model.config';
import { SQ5_HUB_GEOMETRY, SQ5_PETALS_GEOMETRY, SQ5_VIEWBOX } from './sq5-sqert-model.geometry';
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
  const [hovered, setHovered] = useState<Sq5DimensionId | null>(null);
  const [focused, setFocused] = useState<Sq5DimensionId | null>(null);
  const [selected, setSelected] = useState<Sq5DimensionId | null>(null);
  const legendRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const petalRefs = useRef<(SVGGElement | null)[]>([]);
  const active = hovered ?? focused ?? selected;

  function select(id: Sq5DimensionId) {
    setSelected((previous) => previous === id ? null : id);
  }

  function keyNav(event: KeyboardEvent<SVGGElement | HTMLButtonElement>, index: number, target: 'legend' | 'petal') {
    if (event.key === 'Escape') {
      event.preventDefault(); setSelected(null); setHovered(null); return;
    }
    if (target === 'petal' && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault(); select(SQ5_DIMENSIONS[index].id); return;
    }
    const next = event.key === 'ArrowDown' || event.key === 'ArrowRight'
      ? (index + 1) % SQ5_DIMENSIONS.length
      : event.key === 'ArrowUp' || event.key === 'ArrowLeft'
        ? (index - 1 + SQ5_DIMENSIONS.length) % SQ5_DIMENSIONS.length
        : event.key === 'Home' ? 0 : event.key === 'End' ? SQ5_DIMENSIONS.length - 1 : null;
    if (next !== null) {
      event.preventDefault();
      (target === 'petal' ? petalRefs.current[next] : legendRefs.current[next])?.focus();
    }
  }

  return (
    <section className={`sq5-module ${className}`.trim()} aria-labelledby={`${instanceId}-heading`} data-sq5-root>
      <div className="sq5-inner">
        <header className="sq5-header">
          <h2 id={`${instanceId}-heading`} className="sq5-header__title">{headerTitle}</h2>
          <p className="sq5-header__subtitle">{headerSubtitle}</p>
        </header>
        <div className="sq5-layout">
          <div className="sq5-legend" role="list" aria-label="5 yếu tố của mô hình SQERT">
            {SQ5_DIMENSIONS.map((dim, index) => {
              const Icon = dim.icon;
              return (
                <div role="listitem" key={dim.id} className="sq5-legend-item">
                  <button
                    type="button"
                    ref={(node) => { legendRefs.current[index] = node; }}
                    className={`sq5-item${active === dim.id ? ' is-active' : ''}`}
                    style={{ '--sq5-color': dim.color } as CSSProperties}
                    aria-pressed={selected === dim.id}
                    aria-label={`${dim.name}, ${dim.vietnameseTitle}. ${dim.description}`}
                    onClick={() => select(dim.id)}
                    onMouseEnter={() => setHovered(dim.id)}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => setFocused(dim.id)}
                    onBlur={() => setFocused(null)}
                    onKeyDown={(event) => keyNav(event, index, 'legend')}
                  >
                    <span className="sq5-item__badge" aria-hidden="true"><Icon /></span>
                    <span className="sq5-item__body">
                      <span className="sq5-item__header">
                        <span className="sq5-item__title">{dim.name}</span>
                        <span className="sq5-item__vntitle">— {dim.vietnameseTitle}</span>
                      </span>
                      <span className="sq5-item__desc">{dim.description}</span>
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
          <div className="sq5-stage">
            <div className="sq5-vortex">
              <svg className="sq5-svg" viewBox={SQ5_VIEWBOX}
                preserveAspectRatio="xMidYMid meet" role="group" aria-label="Biểu đồ SQERT gồm Scope, Quality, Effort, Risk, Time">
                <defs>
                  {SQ5_DIMENSIONS.map((dim) => (
                    <linearGradient key={dim.id} id={`sq5-fill-${instanceId}-${dim.id}`}
                      x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor={dim.gradientTop} />
                      <stop offset="100%" stopColor={dim.gradientBot} />
                    </linearGradient>
                  ))}
                </defs>
                {/* Five independent, non-rotated original SVG paths; no approximated petals. */}
                {SQ5_PETALS_GEOMETRY.map((petal, index) => {
                  const dim = SQ5_DIMENSIONS_MAP[petal.id];
                  return (
                    <g
                      key={petal.id}
                      ref={(node) => { petalRefs.current[index] = node; }}
                      className={`sq5-petal${active === petal.id ? ' is-active' : ''}`}
                      data-dimension={petal.id}
                      role="button" tabIndex={0}
                      aria-label={`${dim.name}: ${dim.description}`}
                      aria-pressed={selected === petal.id}
                      onClick={() => select(petal.id)}
                      onMouseEnter={() => setHovered(petal.id)}
                      onMouseLeave={() => setHovered(null)}
                      onFocus={() => setFocused(petal.id)}
                      onBlur={() => setFocused(null)}
                      onKeyDown={(event) => keyNav(event, index, 'petal')}
                    >
                      <path className="sq5-petal__path" d={petal.d}
                        transform={`translate(${petal.x} ${petal.y}) scale(${petal.scaleX} ${petal.scaleY})`}
                        fill={`url(#sq5-fill-${instanceId}-${petal.id})`} />
                    </g>
                  );
                })}
                {/* Text and central hub stay stationary even when a petal is selected. */}
                {SQ5_PETALS_GEOMETRY.map((petal) => (
                  <text key={`letter-${petal.id}`} x={petal.letterX} y={petal.letterY}
                    className="sq5-petal__letter" textAnchor="middle" dominantBaseline="central"
                    pointerEvents="none">{petal.letter}</text>
                ))}
                <g className="sq5-hub" pointerEvents="none">
                  <circle className="sq5-hub__circle" cx={SQ5_HUB_GEOMETRY.cx}
                    cy={SQ5_HUB_GEOMETRY.cy} r={SQ5_HUB_GEOMETRY.r} />
                  <text className="sq5-hub__text" x={SQ5_HUB_GEOMETRY.cx} y={SQ5_HUB_GEOMETRY.cy}
                    textAnchor="middle" dominantBaseline="central">{SQ5_HUB_GEOMETRY.text}</text>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
