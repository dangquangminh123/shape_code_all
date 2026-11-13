'use client';

import { useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import {
  FaBullseye, FaChartLine, FaEnvelope, FaGears,
  FaHandHoldingDollar, FaHandshake, FaPiggyBank, FaRegLightbulb, FaUserTie,
} from 'react-icons/fa6';
import { LuChevronRight } from 'react-icons/lu';
import { D8P_PETALS, type D8pIconKey, type D8pTheme } from './d8p-diamond-petals.config';
import {
  D8P_CENTER_CIRCLE_PATH, D8P_HALF_FOLD_POLYGONS, D8P_PETAL_PATHS, D8P_RADIAL_ANCHORS,
} from './d8p-diamond-petals.geometry';
import './d8p-diamond-petals.css';

type D8pMaskStyle = CSSProperties & { '--d8p-mask-url'?: string };
type D8pPosStyle = CSSProperties & { '--d8p-x': string; '--d8p-y': string };

const ICONS: Record<D8pIconKey, typeof FaBullseye> = {
  target: FaBullseye,
  gears: FaGears,
  savings: FaPiggyBank,
  idea: FaRegLightbulb,
  mail: FaEnvelope,
  handshake: FaHandshake,
  revenue: FaHandHoldingDollar,
  growth: FaChartLine,
};

interface D8pDiamondPetalsProps {
  theme?: D8pTheme;
  coreTitle?: string;
  coreSubtitle?: string;
}

export default function D8pDiamondPetals({
  theme = 'reference',
  coreTitle = 'BUSINESS',
  coreSubtitle = 'INFOGRAPHIC',
}: D8pDiamondPetalsProps) {
  const hitRefs = useRef<(SVGPathElement | null)[]>([]);
  const [hovered, setHovered] = useState<number | null>(null);
  const [focused, setFocused] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const active = hovered ?? focused ?? selected;

  const onHitKeyDown = (e: KeyboardEvent<SVGPathElement>, index: number) => {
    const total = D8P_PETALS.length;
    const next =
      e.key === 'ArrowRight' || e.key === 'ArrowDown' ? (index + 1) % total
      : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? (index + total - 1) % total
      : e.key === 'Home' ? 0 : e.key === 'End' ? total - 1 : null;
    if (next !== null) {
      e.preventDefault();
      hitRefs.current[next]?.focus();
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelected(prev => (prev === index ? null : index));
    } else if (e.key === 'Escape') {
      setHovered(null);
      setSelected(null);
    }
  };

  return (
    <section className={`d8p-module${theme === 'spectrum' ? ' d8p-module--spectrum' : ''}`}
      aria-label="Business Diamond Petals – tám trụ cột phát triển doanh nghiệp">
      <div className={`d8p-stage${active !== null ? ' d8p-stage--has-active' : ''}`}>
        <div className="d8p-petals-layer" aria-hidden="true">
          {D8P_PETALS.map((item, i) => (
            <div key={item.id}
              className={`d8p-petal d8p-petal--${item.css}${active === i ? ' d8p-petal--active' : ''}`}
              data-d8p-step={item.id}
              style={{ '--d8p-mask-url': `url('/assets/shapes/d8p-diamond-petals/${item.mask}')` } as D8pMaskStyle}>
              <span className="d8p-petal__fill" />
              <span className="d8p-petal__sheen" />
            </div>
          ))}
        </div>
        <svg className="d8p-facets" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <defs>
            <clipPath id="d8p-all-petals-clip">
              {D8P_PETAL_PATHS.map((d, i) => <path key={i} d={d} />)}
            </clipPath>
            {D8P_HALF_FOLD_POLYGONS.map((pts, i) => (
              <clipPath key={i} id={`d8p-half-fold-${i}`}><polygon points={pts} /></clipPath>
            ))}
            <radialGradient id="d8p-core-collar-shadow" cx="50%" cy="50%" r="25%">
              <stop offset="50%" stopColor="#05080f" stopOpacity="0.42" />
              <stop offset="72%" stopColor="#05080f" stopOpacity="0.18" />
              <stop offset="92%" stopColor="#05080f" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#05080f" stopOpacity="0" />
            </radialGradient>
          </defs>
          {D8P_PETAL_PATHS.map((d, i) => (
            <path key={i} d={d} clipPath={`url(#d8p-half-fold-${i})`} className="d8p-facets__half-shade" />
          ))}
          <circle cx="500" cy="500" r="250" fill="url(#d8p-core-collar-shadow)" clipPath="url(#d8p-all-petals-clip)" />
        </svg>

        {D8P_PETALS.map((item, i) => {
          const Icon = ICONS[item.icon];
          const a = D8P_RADIAL_ANCHORS[i];
          return (
            <div key={item.id}
              className={`d8p-petal-content d8p-petal-content--0${item.id}${active === i ? ' d8p-petal-content--active' : ''}`}
              aria-hidden="true">
              <span className="d8p-petal-content__number"
                style={{ '--d8p-x': `${a.numberPos.x}%`, '--d8p-y': `${a.numberPos.y}%` } as D8pPosStyle}>
                {item.number}
              </span>
              <div className="d8p-petal-content__copy"
                style={{ '--d8p-x': `${a.copyPos.x}%`, '--d8p-y': `${a.copyPos.y}%` } as D8pPosStyle}>
                <strong className="d8p-petal-content__title">{item.title}</strong>
                <p className="d8p-petal-content__desc">{item.description}</p>
              </div>
              <span className="d8p-petal-content__icon"
                style={{ '--d8p-x': `${a.iconPos.x}%`, '--d8p-y': `${a.iconPos.y}%` } as D8pPosStyle}>
                <Icon aria-hidden={true} />
              </span>
            </div>
          );
        })}

        <div className="d8p-core" aria-hidden="true">
          <span className="d8p-core__shadow">
            <span className="d8p-core__surface"
              style={{ '--d8p-mask-url': `url('/assets/shapes/d8p-diamond-petals/d8p-center-circle-mask.svg')` } as D8pMaskStyle} />
          </span>
          <div className="d8p-core__lockup">
            <div className="d8p-core__brand">
              <span className="d8p-core__avatar"><FaUserTie aria-hidden={true} /></span>
              <div className="d8p-core__titles">
                <span className="d8p-core__eyebrow">{coreTitle}</span>
                <strong className="d8p-core__headline">{coreSubtitle}</strong>
              </div>
            </div>
            <div className="d8p-core__colorbar">
              <span className="d8p-core__seg d8p-core__seg--charcoal" />
              <span className="d8p-core__seg d8p-core__seg--lime" />
              <span className="d8p-core__seg d8p-core__seg--coral" />
              <span className="d8p-core__seg d8p-core__seg--teal" />
            </div>
          </div>
        </div>

        <svg className="d8p-hitmap" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid meet"
          aria-label="Chọn một trong tám trụ cột chiến lược">
          {D8P_PETALS.map((item, i) => (
            <path key={item.id} ref={node => { hitRefs.current[i] = node; }} d={D8P_PETAL_PATHS[i]}
              className="d8p-hitmap__petal" role="button" tabIndex={0} focusable="true"
              aria-label={`${item.number} – ${item.title}: ${item.description}`} aria-pressed={selected === i}
              onPointerEnter={e => { if (e.pointerType !== 'touch') setHovered(i); }}
              onPointerLeave={() => setHovered(null)} onFocus={() => setFocused(i)} onBlur={() => setFocused(null)}
              onClick={() => setSelected(prev => (prev === i ? null : i))} onKeyDown={e => onHitKeyDown(e, i)} />
          ))}
          <path d={D8P_CENTER_CIRCLE_PATH} className="d8p-hitmap__core-guard" aria-hidden="true" />
        </svg>
      </div>

      <div className="d8p-mobile-cards" aria-label="Chi tiết tám trụ cột chiến lược">
        {D8P_PETALS.map((item, i) => {
          const Icon = ICONS[item.icon];
          return (
            <button key={item.id} type="button"
              className={`d8p-mobile-card d8p-mobile-card--${item.css}${active === i ? ' d8p-mobile-card--active' : ''}`}
              aria-pressed={selected === i} onClick={() => setSelected(prev => (prev === i ? null : i))}>
              <span className="d8p-mobile-card__icon"><Icon aria-hidden={true} /></span>
              <span className="d8p-mobile-card__body">
                <strong className="d8p-mobile-card__heading">
                  <span>{item.number}</span>
                  <LuChevronRight className="d8p-mobile-card__sep" aria-hidden="true" focusable="false" />
                  <span>{item.title}</span>
                </strong>
                <small>{item.description}</small>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
