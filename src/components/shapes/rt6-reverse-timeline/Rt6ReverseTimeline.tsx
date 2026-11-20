'use client';

import React, { useId, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { RT6_STEPS, type Rt6StepConfig } from './rt6-reverse-timeline.config';
import './rt6-reverse-timeline.css';

export interface Rt6ReverseTimelineProps {
  headerTitle?: string;
  headerSubtitle?: string;
  className?: string;
}

type Rt6StepStyle = CSSProperties & {
  '--rt6-left': number;
  '--rt6-top': number;
  '--rt6-index': number;
  '--rt6-gradient': string;
  '--rt6-fold': string;
  '--rt6-badge-bg': string;
};

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

        <div className="rt6-stage" role="group" aria-label="6 giai đoạn tiến trình ngược">
          {RT6_STEPS.map((step, idx) => {
            const isActive = activeIndex === idx;
            // 179px horizontal advance, 38px vertical drop per step
            const style: Rt6StepStyle = {
              '--rt6-left': idx * 179,
              '--rt6-top': idx * 38,
              '--rt6-index': idx,
              '--rt6-gradient': `linear-gradient(180deg, ${step.gradientTop} 0%, ${step.gradientMid} 45%, ${step.gradientBot} 100%)`,
              '--rt6-fold': step.foldColor,
              '--rt6-badge-bg': step.badgeBg,
            };

            return (
              <div key={step.number} className="rt6-step-wrap" style={style}>
                <button
                  ref={(el) => {
                    buttonRefs.current[idx] = el;
                  }}
                  type="button"
                  className={`rt6-step ${isActive ? 'is-active' : ''}`}
                  onClick={() => handleSelect(idx)}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onFocus={() => setFocusedIndex(idx)}
                  onBlur={() => setFocusedIndex(null)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  aria-pressed={selectedIndex === idx}
                  aria-label={`Giai đoạn ${step.number}: ${step.title}`}
                >
                  <span className="rt6-step__face" aria-hidden="true" />
                  <span className="rt6-step__badge" aria-hidden="true">
                    {step.number}
                  </span>
                  <div className="rt6-step__content">
                    <h3 className="rt6-step__title">{step.title}</h3>
                    <p className="rt6-step__desc">{step.description}</p>
                  </div>
                </button>
                {/* 3D Fold Connector on right, connecting this step to the next */}
                {idx < RT6_STEPS.length - 1 && <span className="rt6-fold" aria-hidden="true" />}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
