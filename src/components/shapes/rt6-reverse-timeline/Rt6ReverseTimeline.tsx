'use client';

import React, { useId, useRef, useState, type KeyboardEvent } from 'react';
import { RT6_STEPS, type Rt6StepConfig } from './rt6-reverse-timeline.config';
import './rt6-reverse-timeline.css';

export interface Rt6ReverseTimelineProps {
  headerTitle?: string;
  headerSubtitle?: string;
  className?: string;
}

const RAW_CARD_PATH =
  'M42.6,81c-6.33,0.07-18.63-0.71-29.51-8.02c-5.72-3.84-8.2-7.58-8.89-8.68C0.37,58.23-0.02,52.1,0,49.08V0h42.6V81z';

const RAW_FOLD_PATH =
  'M8.27,70.78V10.81h2.34C7.07,7.21,3.54,3.6,0,0c0,23.81,0,47.63,0,71.44c3.22,3.19,6.44,6.37,9.65,9.56c0,0,0,0,0,0 C8.43,76.75,8.25,73.04,8.27,70.78z';

export default function Rt6ReverseTimeline({
  headerTitle = 'Tiến Trình Thời Gian Ngược (Reverse Timeline)',
  headerSubtitle = 'Quy trình lùi 6 giai đoạn đưa mục tiêu bàn giao về kế hoạch hành động khởi đầu',
  className = '',
}: Rt6ReverseTimelineProps) {
  const instanceId = useId();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const stepRefs = useRef<(SVGGElement | null)[]>([]);

  const activeIndex = hoveredIndex ?? focusedIndex ?? selectedIndex;

  function handleSelect(index: number) {
    setSelectedIndex((prev) => (prev === index ? null : index));
  }

  function handleKeyDown(event: KeyboardEvent<SVGGElement>, index: number) {
    let nextIndex: number | null = null;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextIndex = (index + 1) % RT6_STEPS.length;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextIndex = (index - 1 + RT6_STEPS.length) % RT6_STEPS.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = RT6_STEPS.length - 1;
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setSelectedIndex(null);
      setHoveredIndex(null);
      return;
    }

    if (nextIndex !== null) {
      event.preventDefault();
      stepRefs.current[nextIndex]?.focus();
    }
  }

  const S = 3.2;
  const cardW = 42.6 * S; // 136.32
  const cardH = 81 * S;   // 259.2
  const dx = 50.87 * S;   // 162.78
  const dy = 10.81 * S;   // 34.59

  return (
    <section
      className={`rt6-module ${className}`.trim()}
      aria-labelledby={`${instanceId}-heading`}
      data-rt6-root
    >
      <div className="rt6-inner">
        <header className="rt6-header">
          <h2 className="rt6-header__title" id={`${instanceId}-heading`}>
            {headerTitle}
          </h2>
          <p className="rt6-header__subtitle">{headerSubtitle}</p>
        </header>

        <div className="rt6-stage" role="group" aria-label="6 giai đoạn tiến trình ngược">
          <svg
            className="rt6-svg"
            viewBox="0 0 1020 500"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <defs>
              {/* Gradients for each step */}
              {RT6_STEPS.map((step, idx) => (
                <linearGradient
                  key={`grad-${step.number}`}
                  id={`rt6-grad-${instanceId}-${idx}`}
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor={step.gradientTop} />
                  <stop offset="30%" stopColor={step.gradientMid} />
                  <stop offset="100%" stopColor={step.gradientBot} />
                </linearGradient>
              ))}

              {/* Fold Gradients for steps 0 to 4 (darker 3D bevel matching template) */}
              {RT6_STEPS.slice(0, 5).map((step, idx) => (
                <linearGradient
                  key={`fold-grad-${step.number}`}
                  id={`rt6-fold-grad-${instanceId}-${idx}`}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor={step.foldColor} />
                  <stop offset="100%" stopColor="#081420" stopOpacity="0.88" />
                </linearGradient>
              ))}

              {/* Ambient Drop Shadow for Cards */}
              <filter id={`rt6-card-shadow-${instanceId}`} x="-15%" y="-10%" width="130%" height="135%">
                <feDropShadow dx="-2" dy="8" stdDeviation="6" floodOpacity="0.16" />
              </filter>
            </defs>

            {/* 1. Fold connectors render first (sits behind the cards) */}
            {RT6_STEPS.slice(0, 5).map((step, idx) => {
              const x = 32 + idx * dx;
              const y = 30 + idx * dy;
              const fx = x + cardW;
              const fy = y;

              return (
                <g
                  key={`fold-${step.number}`}
                  className="rt6-fold"
                  transform={`translate(${fx}, ${fy}) scale(${S})`}
                  pointerEvents="none"
                >
                  <path d={RAW_FOLD_PATH} fill={`url(#rt6-fold-grad-${instanceId}-${idx})`} />
                </g>
              );
            })}

            {/* 2. Six Cards render side-by-side: ZERO overlap between card bodies! */}
            {RT6_STEPS.map((step, idx) => {
              const isActive = activeIndex === idx;
              const x = 32 + idx * dx;
              const y = 30 + idx * dy;
              const badgeCx = cardW / 2;
              const badgeCy = 15.29 * S;
              const badgeR = 7.35 * S;

              return (
                <g
                  key={step.number}
                  ref={(el) => {
                    stepRefs.current[idx] = el;
                  }}
                  className={`rt6-step ${isActive ? 'is-active' : ''}`}
                  transform={`translate(${x}, ${y})`}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleSelect(idx)}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onFocus={() => setFocusedIndex(idx)}
                  onBlur={() => setFocusedIndex(null)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  aria-pressed={selectedIndex === idx}
                  aria-label={`Giai đoạn ${step.number}: ${step.title}`}
                >
                  {/* Card Body from 1.svg scaled exactly */}
                  <path
                    className="rt6-step__card"
                    d={RAW_CARD_PATH}
                    transform={`scale(${S})`}
                    fill={`url(#rt6-grad-${instanceId}-${idx})`}
                    filter={`url(#rt6-card-shadow-${instanceId})`}
                  />

                  {/* Top Highlight Sheen */}
                  <path
                    className="rt6-step__top-hl"
                    d={`M0,0 h${cardW} v20 c${-cardW * 0.4},0 ${-cardW * 0.8},-8 ${-cardW},-12 z`}
                    fill="rgba(255, 255, 255, 0.26)"
                    pointerEvents="none"
                  />

                  {/* Circular Number Badge centered horizontally on card face */}
                  <g className="rt6-step__badge" pointerEvents="none">
                    <circle
                      cx={badgeCx}
                      cy={badgeCy}
                      r={badgeR}
                      fill={step.badgeBg}
                      stroke="rgba(255, 255, 255, 0.9)"
                      strokeWidth={2}
                    />
                    <text
                      x={badgeCx}
                      y={badgeCy + 6}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="17"
                      fontWeight="800"
                      fontFamily="system-ui, -apple-system, sans-serif"
                    >
                      {step.number}
                    </text>
                  </g>

                  {/* Text Content: 100% visible, centered, ample padding */}
                  <foreignObject
                    x={8}
                    y={32 * S}
                    width={cardW - 16}
                    height={cardH - 35 * S}
                    pointerEvents="none"
                  >
                    <div className="rt6-step__content">
                      <h3 className="rt6-step__title">{step.title}</h3>
                      <p className="rt6-step__desc">{step.description}</p>
                    </div>
                  </foreignObject>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </section>
  );
}
