'use client';

import React, { useId, useRef, useState, type KeyboardEvent } from 'react';
import { RT6_STEPS, type Rt6StepConfig } from './rt6-reverse-timeline.config';
import './rt6-reverse-timeline.css';

export interface Rt6ReverseTimelineProps {
  headerTitle?: string;
  headerSubtitle?: string;
  className?: string;
}

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

  const CARD_W = 154;
  const CARD_H = 265;
  const STEP_DX = 146;
  const STEP_DY = 34;

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
            viewBox="0 0 960 475"
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

              {/* Fold Gradients for steps 0 to 4 (darker 3D bevel) */}
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
                  <stop offset="100%" stopColor="#05101a" stopOpacity="0.85" />
                </linearGradient>
              ))}

              {/* Ambient Drop Shadow for Cards */}
              <filter id={`rt6-card-shadow-${instanceId}`} x="-20%" y="-10%" width="140%" height="135%">
                <feDropShadow dx="-4" dy="8" stdDeviation="6" floodOpacity="0.18" />
              </filter>
            </defs>

            {/* Stacking: Step 0 (06) is on top, Step 5 (01) is at back */}
            {/* Render in reverse order [5, 4, 3, 2, 1, 0] so Step 0 naturally layers on top */}
            {[5, 4, 3, 2, 1, 0].map((idx) => {
              const step = RT6_STEPS[idx];
              const isActive = activeIndex === idx;
              const x = idx * STEP_DX + 30;
              const y = idx * STEP_DY + 25;
              const badgeCx = x + 77;
              const badgeCy = y + 42;

              // Card contour: rounded top-left, straight top/right, sweeping bottom-left curve
              const cardPath = `M${x + 14},${y} H${x + CARD_W} V${y + CARD_H} C${x + CARD_W * 0.6},${y + CARD_H} ${x + CARD_W * 0.18},${y + CARD_H - 30} ${x},${y + CARD_H - 75} V${y + 14} Q${x},${y} ${x + 14},${y} Z`;
              const topHighlight = `M${x + 14},${y} H${x + CARD_W} V${y + 18} C${x + CARD_W * 0.6},${y + 18} ${x + CARD_W * 0.18},${y + 18} ${x},${y + 18} V${y + 14} Q${x},${y} ${x + 14},${y} Z`;

              return (
                <g
                  key={step.number}
                  ref={(el) => {
                    stepRefs.current[idx] = el;
                  }}
                  className={`rt6-step ${isActive ? 'is-active' : ''}`}
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
                  {/* Card Body */}
                  <path
                    className="rt6-step__card"
                    d={cardPath}
                    fill={`url(#rt6-grad-${instanceId}-${idx})`}
                    filter={`url(#rt6-card-shadow-${instanceId})`}
                  />

                  {/* Top Highlight band */}
                  <path
                    className="rt6-step__top-hl"
                    d={topHighlight}
                    fill="rgba(255, 255, 255, 0.32)"
                    pointerEvents="none"
                  />

                  {/* 3D Ribbon Fold Connector (Steps 0 to 4 only):
                      Sits strictly at the top transition (height ~78px, NOT full height) */}
                  {idx < RT6_STEPS.length - 1 && (
                    <g className="rt6-fold" pointerEvents="none">
                      <polygon
                        points={`${x + CARD_W},${y} ${x + CARD_W + 14},${y + 34} ${x + CARD_W + 14},${y + 78} ${x + CARD_W},${y + 48}`}
                        fill={`url(#rt6-fold-grad-${instanceId}-${idx})`}
                        opacity={0.96}
                      />
                      <line
                        x1={x + CARD_W}
                        y1={y}
                        x2={x + CARD_W + 14}
                        y2={y + 34}
                        stroke="rgba(255, 255, 255, 0.45)"
                        strokeWidth={1.5}
                      />
                    </g>
                  )}

                  {/* Circular Number Badge */}
                  <g className="rt6-step__badge" pointerEvents="none">
                    <circle
                      cx={badgeCx}
                      cy={badgeCy}
                      r={21}
                      fill={step.badgeBg}
                      stroke="rgba(255, 255, 255, 0.85)"
                      strokeWidth={2.2}
                    />
                    <text
                      x={badgeCx}
                      y={badgeCy + 5.5}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="15"
                      fontWeight="800"
                      fontFamily="system-ui, -apple-system, sans-serif"
                    >
                      {step.number}
                    </text>
                  </g>

                  {/* ForeignObject with HTML content for responsive multiline text */}
                  <foreignObject
                    x={x + 12}
                    y={y + 78}
                    width={CARD_W - 24}
                    height={170}
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
