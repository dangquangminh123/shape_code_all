'use client';

import React, { useId, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { RT6_STEPS } from './rt6-reverse-timeline.config';
import './rt6-reverse-timeline.css';

export interface Rt6ReverseTimelineProps {
  headerTitle?: string;
  headerSubtitle?: string;
  className?: string;
}

// Master coordinate system from the 1280 x 720 reference slide.
// Both paths are taken from the original 1.svg and 2.svg without redrawing.
const SCALE = 3.81;
const X0 = 68;
const Y0 = 166;
const STEP_X = 186.8;
const STEP_Y = 33.5;
const FACE_WIDTH = 42.6 * SCALE;
// The reference fold is as wide as its source but visually shorter than
// the face. Preserve the SVG path and scale only its vertical dimension.
const FOLD_SCALE_X = SCALE;
const FOLD_SCALE_Y = 3.12;
const FACE_D =
  'M42.6,81c-6.33,0.07-18.63-0.71-29.51-8.02c-5.72-3.84-8.2-7.58-8.89-8.68C0.37,58.23-0.02,52.1,0,49.08V0h42.6V81z';
const FOLD_D =
  'M8.27,70.78V10.81h2.34C7.07,7.21,3.54,3.6,0,0c0,23.81,0,47.63,0,71.44c3.22,3.19,6.44,6.37,9.65,9.56c0,0,0,0,0,0C8.43,76.75,8.25,73.04,8.27,70.78z';

export default function Rt6ReverseTimeline({
  headerTitle = 'Tiến Trình Thời Gian Ngược (Reverse Timeline)',
  headerSubtitle = 'Quy trình lùi 6 giai đoạn đưa mục tiêu bàn giao về kế hoạch hành động khởi đầu',
  className = '',
}: Rt6ReverseTimelineProps) {
  const instanceId = useId();
  const [hovered, setHovered] = useState<number | null>(null);
  const [focused, setFocused] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const svgRefs = useRef<(SVGGElement | null)[]>([]);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = hovered ?? focused ?? selected;

  function select(index: number) {
    setSelected((previous) => previous === index ? null : index);
  }

  function handleKey(
    event: KeyboardEvent<SVGGElement | HTMLButtonElement>,
    index: number,
    target: 'svg' | 'card',
  ) {
    if (event.key === 'Escape') {
      event.preventDefault();
      setHovered(null);
      setSelected(null);
      return;
    }
    if (target === 'svg' && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      select(index);
      return;
    }
    const next = event.key === 'ArrowRight' || event.key === 'ArrowDown'
      ? (index + 1) % RT6_STEPS.length
      : event.key === 'ArrowLeft' || event.key === 'ArrowUp'
        ? (index - 1 + RT6_STEPS.length) % RT6_STEPS.length
        : event.key === 'Home' ? 0 : event.key === 'End' ? RT6_STEPS.length - 1 : null;
    if (next !== null) {
      event.preventDefault();
      (target === 'svg' ? svgRefs.current[next] : cardRefs.current[next])?.focus();
    }
  }

  return (
    <section className={`rt6-module ${className}`.trim()} aria-labelledby={`${instanceId}-heading`} data-rt6-root>
      <header className="rt6-accessible-header">
        <h2 id={`${instanceId}-heading`}>{headerTitle}</h2>
        <p>{headerSubtitle}</p>
      </header>
      <div className="rt6-inner">
        <div className="rt6-stage" role="group" aria-label="6 giai đoạn theo thứ tự 06 đến 01">
          <svg className="rt6-svg" viewBox="0 0 1280 720" preserveAspectRatio="xMidYMid meet">
            <defs>
              {RT6_STEPS.map((step, index) => (
                <React.Fragment key={step.number}>
                  <linearGradient id={`rt6-face-${instanceId}-${index}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={step.gradientTop} />
                    <stop offset="35%" stopColor={step.gradientMid} />
                    <stop offset="100%" stopColor={step.gradientBot} />
                  </linearGradient>
                  <linearGradient id={`rt6-side-${instanceId}-${index}`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={step.gradientMid} />
                    <stop offset="100%" stopColor={step.foldColor} />
                  </linearGradient>
                </React.Fragment>
              ))}
            </defs>
            <text x="640" y="78" textAnchor="middle" className="rt6-canvas__title">{headerTitle}</text>
            <text x="640" y="110" textAnchor="middle" className="rt6-canvas__subtitle">{headerSubtitle}</text>
            {RT6_STEPS.map((step, index) => {
              const x = X0 + index * STEP_X;
              const y = Y0 + index * STEP_Y;
              const badgeX = x + 21.58 * SCALE;
              const badgeY = y + 15.29 * SCALE;
              const isActive = index === active;
              return (
                <g
                  key={step.number}
                  ref={(node) => { svgRefs.current[index] = node; }}
                  className={`rt6-step${isActive ? ' is-active' : ''}`}
                  data-step={step.number}
                  role="button"
                  tabIndex={0}
                  aria-pressed={selected === index}
                  aria-label={`Giai đoạn ${step.number}: ${step.title}. ${step.description}`}
                  onClick={() => select(index)}
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setFocused(index)}
                  onBlur={() => setFocused(null)}
                  onKeyDown={(event) => handleKey(event, index, 'svg')}
                >
                  {/* The fold belongs to the current step, but is covered by the next face in DOM order. */}
                  {index < RT6_STEPS.length - 1 && (
                    <path className="rt6-fold" d={FOLD_D}
                      transform={`translate(${x + FACE_WIDTH} ${y}) scale(${FOLD_SCALE_X} ${FOLD_SCALE_Y})`}
                      fill={`url(#rt6-side-${instanceId}-${index})`} pointerEvents="none" />
                  )}
                  <path className="rt6-step__face" d={FACE_D}
                    transform={`translate(${x} ${y}) scale(${SCALE})`}
                    fill={`url(#rt6-face-${instanceId}-${index})`} />
                  <g className="rt6-step__badge" pointerEvents="none">
                    <circle cx={badgeX} cy={badgeY} r={7.35 * SCALE} fill={step.badgeBg}
                      stroke="rgba(255,255,255,.95)" strokeWidth="2" />
                    <text x={badgeX} y={badgeY + 6} textAnchor="middle" className="rt6-badge__text">
                      {step.number}
                    </text>
                  </g>
                  <foreignObject x={x + 9} y={y + 102} width={FACE_WIDTH - 18} height="166"
                    pointerEvents="none">
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
        {/* A readable representation on tablets and phones: no 1100px horizontal-scroll trap. */}
        <div className="rt6-mobile-list" role="list" aria-label="6 giai đoạn của tiến trình ngược">
          {RT6_STEPS.map((step, index) => (
            <div className="rt6-mobile-item" role="listitem" key={step.number}>
              <button
                type="button" ref={(node) => { cardRefs.current[index] = node; }}
                className={`rt6-mobile-card${active === index ? ' is-active' : ''}`}
                style={{ '--rt6-top': step.gradientTop, '--rt6-mid': step.gradientMid,
                  '--rt6-bottom': step.gradientBot, '--rt6-badge': step.badgeBg } as CSSProperties}
                aria-pressed={selected === index}
                onClick={() => select(index)}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setFocused(index)}
                onBlur={() => setFocused(null)}
                onKeyDown={(event) => handleKey(event, index, 'card')}
              >
                <span className="rt6-mobile-number">{step.number}</span>
                <span className="rt6-mobile-title">{step.title}</span>
                <span className="rt6-mobile-description">{step.description}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
