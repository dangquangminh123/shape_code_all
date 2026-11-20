'use client';

import React, { useId, useRef, useState, type KeyboardEvent } from 'react';
import { RT6_STEPS, type Rt6StepConfig } from './rt6-reverse-timeline.config';
import './rt6-reverse-timeline.css';

export interface Rt6ReverseTimelineProps {
  headerTitle?: string;
  headerSubtitle?: string;
  className?: string;
}

const RT6_SCALE = 3.81;
const RT6_X0 = 68;
const RT6_Y0 = 166;
const RT6_DX = 186.8;
const RT6_DY = 33.5;
const RT6_FACE_W = 42.6 * RT6_SCALE; // 162.306 px

// Exact vector geometry from 1.svg and 2.svg
const RT6_FACE_D =
  'M42.6,81c-6.33,0.07-18.63-0.71-29.51-8.02c-5.72-3.84-8.2-7.58-8.89-8.68C0.37,58.23-0.02,52.1,0,49.08V0h42.6V81z';

const RT6_FOLD_D =
  'M8.27,70.78V10.81h2.34C7.07,7.21,3.54,3.6,0,0c0,23.81,0,47.63,0,71.44c3.22,3.19,6.44,6.37,9.65,9.56c0,0,0,0,0,0C8.43,76.75,8.25,73.04,8.27,70.78z';

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
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleSelect(index);
      return;
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

  return (
    <section
      className={`rt6-module ${className}`.trim()}
      aria-labelledby={`${instanceId}-heading`}
      data-rt6-root
    >
      <header className="sr-only">
        <h2 id={`${instanceId}-heading`}>{headerTitle}</h2>
        <p>{headerSubtitle}</p>
      </header>

      <div className="rt6-inner">
        <div className="rt6-stage" role="group" aria-label="6 giai đoạn tiến trình ngược">
          <svg
            className="rt6-svg"
            viewBox="0 0 1280 720"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {/* Gradients for each step face */}
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
                  <stop offset="35%" stopColor={step.gradientMid} />
                  <stop offset="100%" stopColor={step.gradientBot} />
                </linearGradient>
              ))}

              {/* Fold 3D gradients for steps 0 to 4 */}
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
                  <stop offset="100%" stopColor="#050d18" stopOpacity="0.92" />
                </linearGradient>
              ))}
            </defs>

            {/* Header rendered inside 1280x720 canvas matching template */}
            <text x={640} y={75} textAnchor="middle" className="rt6-canvas__title">
              {headerTitle}
            </text>
            <text x={640} y={112} textAnchor="middle" className="rt6-canvas__subtitle">
              {headerSubtitle}
            </text>

            {/* Render 6 steps in forward DOM order [06, 05, 04, 03, 02, 01] */}
            {RT6_STEPS.map((step, idx) => {
              const isActive = activeIndex === idx;
              const x = RT6_X0 + idx * RT6_DX;
              const y = RT6_Y0 + idx * RT6_DY;
              const badgeX = x + 21.58 * RT6_SCALE;
              const badgeY = y + 15.29 * RT6_SCALE;

              return (
                <g
                  key={step.number}
                  ref={(el) => {
                    stepRefs.current[idx] = el;
                  }}
                  className={`rt6-step ${isActive ? 'is-active' : ''}`}
                  data-step={step.number}
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
                  {/* L1: Fold of current step (sits behind next step's face) */}
                  {idx < 5 && (
                    <path
                      className="rt6-fold"
                      d={RT6_FOLD_D}
                      transform={`translate(${x + RT6_FACE_W} ${y}) scale(${RT6_SCALE})`}
                      fill={`url(#rt6-fold-grad-${instanceId}-${idx})`}
                      pointerEvents="none"
                    />
                  )}

                  {/* L2: Main Face of current step from 1.svg */}
                  <path
                    className="rt6-step__face"
                    d={RT6_FACE_D}
                    transform={`translate(${x} ${y}) scale(${RT6_SCALE})`}
                    fill={`url(#rt6-grad-${instanceId}-${idx})`}
                  />

                  {/* L3: Badge circle & number matching 1.svg coordinates */}
                  <g className="rt6-step__badge" pointerEvents="none">
                    <circle
                      cx={badgeX}
                      cy={badgeY}
                      r={7.35 * RT6_SCALE}
                      fill={step.badgeBg}
                      stroke="rgba(255, 255, 255, 0.9)"
                      strokeWidth={2.3}
                    />
                    <text
                      x={badgeX}
                      y={badgeY + 6.5}
                      textAnchor="middle"
                      className="rt6-badge__text"
                    >
                      {step.number}
                    </text>
                  </g>

                  {/* L4: Title and description inside front face */}
                  <foreignObject
                    x={x + 11}
                    y={y + 102}
                    width={RT6_FACE_W - 22}
                    height={160}
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
