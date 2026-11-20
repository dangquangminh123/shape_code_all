'use client';

import React, { useId, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { RT6_STEPS, type Rt6StepConfig } from './rt6-reverse-timeline.config';
import './rt6-reverse-timeline.css';

export interface Rt6ReverseTimelineProps {
  headerTitle?: string;
  headerSubtitle?: string;
  className?: string;
}

const FACE_PATH = 'M42.6,81c-6.33,0.07-18.63-0.71-29.51-8.02c-5.72-3.84-8.2-7.58-8.89-8.68C0.37,58.23-0.02,52.1,0,49.08V0h42.6V81z';
const FOLD_PATH = 'M8.27,70.78V10.81h2.34C7.07,7.21,3.54,3.6,0,0c0,23.81,0,47.63,0,71.44c3.22,3.19,6.44,6.37,9.65,9.56c0,0,0,0,0,0 C8.43,76.75,8.25,73.04,8.27,70.78z';

export default function Rt6ReverseTimeline({
  headerTitle = 'Tiến Trình Thời Gian Ngược (Reverse Timeline)',
  headerSubtitle = 'Quy trình lùi 6 giai đoạn đưa mục tiêu bàn giao về kế hoạch hành động khởi đầu',
  className = '',
}: Rt6ReverseTimelineProps) {
  const instanceId = useId();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeIndex = hoveredIndex ?? focusedIndex ?? selectedIndex;

  function handleSelect(index: number) {
    setSelectedIndex((prev) => (prev === index ? null : index));
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
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
      buttonRefs.current[nextIndex]?.focus();
    }
  }

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

        {/* 6-step staircase ribbon stage */}
        <div className="rt6-stage" role="group" aria-label="6 giai đoạn tiến trình ngược">
          {RT6_STEPS.map((step, idx) => {
            const isActive = activeIndex === idx;
            const leftPct = (idx * 53.21 / 308.65) * 100;
            const topPct = (idx * 10.81 / 135.05) * 100;
            const widthPct = (42.6 / 308.65) * 100;
            const heightPct = (81 / 135.05) * 100;
            const foldWidthPct = (10.61 / 308.65) * 100;

            const stepStyle: CSSProperties = {
              left: `${leftPct}%`,
              top: `${topPct}%`,
              width: `${widthPct}%`,
              height: `${heightPct}%`,
              zIndex: 10 - idx,
            };

            const foldStyle: CSSProperties = {
              left: '100%',
              top: '0%',
              width: `${(foldWidthPct / widthPct) * 100}%`,
              height: '100%',
            };

            return (
              <button
                key={step.number}
                ref={(el) => {
                  buttonRefs.current[idx] = el;
                }}
                type="button"
                className={`rt6-step ${isActive ? 'is-active' : ''}`}
                style={stepStyle}
                onClick={() => handleSelect(idx)}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                onFocus={() => setFocusedIndex(idx)}
                onBlur={() => setFocusedIndex(null)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                aria-pressed={selectedIndex === idx}
                aria-label={`Giai đoạn ${step.number}: ${step.title}`}
              >
                {/* SVG Face with exact vector contour and 3D gradient */}
                <svg
                  className="rt6-step__face-svg"
                  viewBox="0 0 42.6 81"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id={`rt6-grad-${instanceId}-${idx}`} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor={step.gradientTop} />
                      <stop offset="45%" stopColor={step.gradientMid} />
                      <stop offset="100%" stopColor={step.gradientBot} />
                    </linearGradient>
                    <linearGradient id={`rt6-cyl-${instanceId}-${idx}`} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
                      <stop offset="35%" stopColor="#ffffff" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d={FACE_PATH} fill={`url(#rt6-grad-${instanceId}-${idx})`} />
                  {/* Cylindrical top curl highlight */}
                  <path d="M0,0 h42.6 v12 c-10,0 -32.6,0 -42.6,0 z" fill={`url(#rt6-cyl-${instanceId}-${idx})`} />
                </svg>

                {/* 3D Fold Connector on Right Side (for steps 0 to 4) */}
                {idx < RT6_STEPS.length - 1 && (
                  <span className="rt6-step__fold" style={foldStyle} aria-hidden="true">
                    <svg
                      viewBox="0 0 10.61 81"
                      preserveAspectRatio="none"
                      className="rt6-fold-svg"
                    >
                      <defs>
                        <linearGradient id={`rt6-fold-grad-${instanceId}-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor={step.foldColor} />
                          <stop offset="100%" stopColor="#05101a" stopOpacity="0.75" />
                        </linearGradient>
                      </defs>
                      <path d={FOLD_PATH} fill={`url(#rt6-fold-grad-${instanceId}-${idx})`} />
                    </svg>
                  </span>
                )}

                {/* Circular Number Badge */}
                <span className="rt6-step__badge" aria-hidden="true" style={{ backgroundColor: step.badgeBg }}>
                  {step.number}
                </span>

                {/* Text Content */}
                <div className="rt6-step__content">
                  <h3 className="rt6-step__title">{step.title}</h3>
                  <p className="rt6-step__desc">{step.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
