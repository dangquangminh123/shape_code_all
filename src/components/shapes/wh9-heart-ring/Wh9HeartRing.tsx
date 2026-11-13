'use client';

import { useId, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { LuChevronRight } from 'react-icons/lu';
import {
  WH9_CENTER,
  WH9_STEPS,
  type Wh9Step,
  type Wh9Theme,
} from './wh9-heart-ring.config';
import geometry from './wh9-heart-ring.geometry.json';
import './wh9-heart-ring.css';

export interface Wh9HeartRingProps {
  theme?: Wh9Theme;
  title?: string;
}

const SVG_SIZE = 640;

function SectorCopy({ step, active }: { step: Wh9Step; active: boolean }) {
  const titleStyle: CSSProperties = {
    left: `${(step.titlePos[0] / SVG_SIZE) * 100}%`,
    top: `${(step.titlePos[1] / SVG_SIZE) * 100}%`,
  };
  const descStyle: CSSProperties = {
    left: `${(step.descPos[0] / SVG_SIZE) * 100}%`,
    top: `${(step.descPos[1] / SVG_SIZE) * 100}%`,
    width: `${(step.descWidth / SVG_SIZE) * 100}%`,
  };
  return (
    <div className={`wh9-copy${active ? ' is-active' : ''}`} data-index={step.index} aria-hidden="true">
      <strong className="wh9-copy__heading" style={titleStyle}>
        {step.title}
      </strong>
      <span className="wh9-copy__description" style={descStyle}>
        {step.description}
      </span>
    </div>
  );
}

function renderTwoToneTitle(title: string) {
  const words = title.trim().split(/\s+/);
  if (words.length <= 1) {
    return <span className="wh9-module__title-accent">{title}</span>;
  }
  const mid = Math.ceil(words.length / 2);
  return (
    <>
      <span className="wh9-module__title-accent">{words.slice(0, mid).join(' ')}</span>{' '}
      <span className="wh9-module__title-neutral">{words.slice(mid).join(' ')}</span>
    </>
  );
}

export default function Wh9HeartRing({
  theme = 'reference',
  title = 'VÒNG TRÒN THẤU CẢM',
}: Wh9HeartRingProps) {
  const instanceId = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const hitRefs = useRef<(SVGPathElement | null)[]>([]);
  const [hovered, setHovered] = useState<number | null>(null);
  const [focused, setFocused] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const active = hovered ?? focused ?? selected;
  const heart = geometry.heart;

  function handleKeyDown(event: KeyboardEvent<SVGPathElement>, index: number) {
    let next: number | null = null;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % WH9_STEPS.length;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index + WH9_STEPS.length - 1) % WH9_STEPS.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = WH9_STEPS.length - 1;
    if (next !== null) {
      event.preventDefault();
      hitRefs.current[next]?.focus();
      return;
    }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setSelected((prev) => (prev === index ? null : index));
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      setHovered(null);
      setFocused(null);
      setSelected(null);
    }
  }

  return (
    <section
      className={`wh9-module${theme === 'silver-red' ? ' wh9-module--silver-red' : ''}`}
      aria-label="Vòng tròn thấu cảm sáu mắt xích quanh trái tim trung tâm"
    >
      {title ? <h2 className="wh9-module__title">{renderTwoToneTitle(title)}</h2> : null}

      <div className="wh9-stage">
        <svg
          className="wh9-art"
          viewBox={geometry.viewBox}
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Sáu phân vùng của vòng tròn thấu cảm"
          role="group"
        >
          <defs>
            <filter id={`${instanceId}-shadow`} x="-14%" y="-14%" width="128%" height="128%">
              <feDropShadow dx="0" dy="3" stdDeviation="7" floodColor="#1e293b" floodOpacity="0.11" />
            </filter>
            <clipPath id={`${instanceId}-outer-clip`}>
              <circle cx="320" cy="320" r={geometry.radius} />
            </clipPath>
            <linearGradient id={`${instanceId}-sheen`} x1="12%" y1="6%" x2="88%" y2="94%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
              <stop offset="55%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.03" />
            </linearGradient>
            <linearGradient id={`${instanceId}-heart-surface`} x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#f4f6fa" />
              <stop offset="100%" stopColor="#edf1f7" />
            </linearGradient>
            {geometry.paths.map((path, index) => (
              <mask key={`m${index}`} id={`${instanceId}-sector-${index}`} maskUnits="userSpaceOnUse" x="0" y="0" width="640" height="640">
                <path d={path} fill="white" />
              </mask>
            ))}
            {WH9_STEPS.map((step) => (
              <linearGradient
                key={`g${step.index}`}
                className={`wh9-gradient wh9-gradient--${step.index}`}
                id={`${instanceId}-grad-${step.index}`}
                x1="15%"
                y1="10%"
                x2="85%"
                y2="90%"
              >
                <stop offset="0%" stopColor={step.start} />
                <stop offset="100%" stopColor={step.end} />
              </linearGradient>
            ))}
          </defs>

          <circle className="wh9-art__foundation" cx="320" cy="320" r={geometry.radius + 9} filter={`url(#${instanceId}-shadow)`} />

          <g clipPath={`url(#${instanceId}-outer-clip)`}>
            {geometry.paths.map((_, index) => (
              <g key={index} className={`wh9-sector-paint${active === index ? ' is-active' : ''}`} mask={`url(#${instanceId}-sector-${index})`}>
                <rect x="0" y="0" width="640" height="640" fill={`url(#${instanceId}-grad-${index})`} />
                <rect className="wh9-sector-paint__shine" x="0" y="0" width="640" height="640" fill={`url(#${instanceId}-sheen)`} />
              </g>
            ))}
          </g>

          <path
            className="wh9-art__heart"
            d={heart.path}
            transform={heart.transform}
            style={theme === 'reference' ? { fill: `url(#${instanceId}-heart-surface)` } : undefined}
          />

          <g className="wh9-hitmap" clipPath={`url(#${instanceId}-outer-clip)`}>
            {geometry.paths.map((path, index) => (
              <path
                key={index}
                ref={(el) => { hitRefs.current[index] = el; }}
                className="wh9-hitmap__sector"
                d={path}
                fill="transparent"
                role="button"
                tabIndex={0}
                aria-label={`${WH9_STEPS[index].number}. ${WH9_STEPS[index].title}. ${WH9_STEPS[index].description}`}
                aria-pressed={selected === index}
                onPointerEnter={(e) => { if (e.pointerType !== 'touch') setHovered(index); }}
                onPointerLeave={() => setHovered(null)}
                onClick={() => setSelected((prev) => (prev === index ? null : index))}
                onFocus={() => setFocused(index)}
                onBlur={() => setFocused(null)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
            <path className="wh9-hitmap__heart-guard" d={heart.path} transform={heart.transform} fill="transparent" aria-hidden="true" />
          </g>
        </svg>

        {WH9_STEPS.map((step) => (
          <div
            key={step.index}
            className={`wh9-number${active === step.index ? ' is-active' : ''}`}
            data-index={step.index}
            style={{ left: `${(step.num[0] / SVG_SIZE) * 100}%`, top: `${(step.num[1] / SVG_SIZE) * 100}%` }}
            aria-hidden="true"
          >
            {step.number}
          </div>
        ))}

        {WH9_STEPS.map((step) => (
          <SectorCopy key={step.index} step={step} active={active === step.index} />
        ))}

        <div className="wh9-core-copy" aria-hidden="true">
          <strong>{WH9_CENTER.heading}</strong>
          <span>{WH9_CENTER.description}</span>
        </div>
      </div>

      <div className="wh9-mobile-list" aria-label="Chi tiết sáu mắt xích">
        {WH9_STEPS.map((step) => {
          const Icon = step.icon;
          const isItemActive = active === step.index;
          return (
            <button
              type="button"
              className={`wh9-mobile-item${isItemActive ? ' is-active' : ''}`}
              key={step.index}
              aria-pressed={selected === step.index}
              onClick={() => setSelected((prev) => (prev === step.index ? null : step.index))}
            >
              <span
                className="wh9-mobile-item__badge"
                style={theme === 'reference' ? { background: `linear-gradient(135deg, ${step.start}, ${step.end})` } : undefined}
              >
                {step.number}
              </span>
              <span className="wh9-mobile-item__body">
                <span className="wh9-mobile-item__title-row">
                  <strong>{step.title}</strong>
                  <LuChevronRight className="wh9-mobile-item__chevron" aria-hidden="true" />
                </span>
                <small>{step.description}</small>
              </span>
              <span className="wh9-mobile-item__icon-wrap" data-wh9-mobile-icon={step.number}>
                <Icon className="wh9-mobile-item__icon" aria-hidden="true" />
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

