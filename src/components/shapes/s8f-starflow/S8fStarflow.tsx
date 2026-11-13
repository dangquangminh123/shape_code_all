'use client';

import { useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { FaChartColumn, FaDollarSign, FaHandshake, FaLightbulb, FaUsers } from 'react-icons/fa6';
import { S8F_SECTORS, type S8fTheme } from './s8f-starflow.config';
import { S8F_SECTOR_PATHS, S8F_SEAM_PATHS, S8F_STAR_POINTS } from './s8f-starflow.geometry';
import './s8f-starflow.css';

type S8fStyle = CSSProperties & { '--s8f-mask-url'?: string };

const ICONS = {
  chart: FaChartColumn,
  handshake: FaHandshake,
  money: FaDollarSign,
  idea: FaLightbulb,
  people: FaUsers,
};

interface S8fStarflowProps {
  theme?: S8fTheme;
  coreTitle?: string;
  coreSubtitle?: string;
  coreDescription?: string;
}

export default function S8fStarflow({
  theme = 'reference',
  coreTitle = 'BUSINESS',
  coreSubtitle = 'INFOGRAPHIC',
  coreDescription = 'Năm yếu tố cốt lõi kiến tạo tăng trưởng bền vững',
}: S8fStarflowProps) {
  const target = useRef<(SVGPathElement | null)[]>([]);
  const [hovered, setHovered] = useState<number | null>(null);
  const [focused, setFocused] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const active = hovered ?? focused ?? selected;

  const onHitKeyDown = (e: KeyboardEvent<SVGPathElement>, index: number) => {
    const last = S8F_SECTORS.length - 1;
    const next =
      e.key === 'ArrowRight' || e.key === 'ArrowDown' ? (index + 1) % S8F_SECTORS.length
      : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? (index + last) % S8F_SECTORS.length
      : e.key === 'Home' ? 0 : e.key === 'End' ? last : null;
    if (next !== null) {
      e.preventDefault();
      target.current[next]?.focus();
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelected(old => (old === index ? null : index));
    } else if (e.key === 'Escape') {
      setHovered(null);
      setSelected(null);
    }
  };

  return (
    <section className={`s8f-module${theme === 'silver-red' ? ' s8f-module--silver-red' : ''}`}
      aria-label="Business Starflow – năm yếu tố phát triển">
      <div className={`s8f-wheel${active !== null ? ' s8f-wheel--has-active' : ''}`}>
        <div className="s8f-wheel__surface" aria-hidden="true">
          {S8F_SECTORS.map((item, i) => (
            <div key={item.id}
              className={`s8f-blade s8f-blade--${item.css}${active === i ? ' s8f-blade--active' : ''}`}
              data-s8f-step={item.id}
              style={{ '--s8f-mask-url': `url('/assets/shapes/s8f-starflow/${item.mask}')` } as S8fStyle}>
              <span className="s8f-blade__fill" />
              <span className="s8f-blade__sheen" />
            </div>
          ))}
          <span className="s8f-wheel__source-vane-gloss" />
        </div>

        <svg className="s8f-wheel__seams" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          {S8F_SEAM_PATHS.map((d, i) => (
            <g key={i}>
              <path d={d} className="s8f-seam__light" />
              <path d={d} className="s8f-seam__depth" />
            </g>
          ))}
        </svg>

        <div className="s8f-star" aria-hidden="true">
          <span className="s8f-star__skin"><span className="s8f-star__surface" /></span>
          <div className="s8f-star__copy">
            <strong>{coreTitle}</strong>
            <span>{coreSubtitle}</span>
            <small>{coreDescription}</small>
          </div>
        </div>

        {S8F_SECTORS.map((item, i) => {
          const Icon = ICONS[item.icon];
          return (
            <div className={`s8f-caption s8f-caption--0${item.id}${active === i ? ' s8f-caption--active' : ''}`}
              key={item.id} aria-hidden="true">
              <div className="s8f-caption__heading">
                <span className="s8f-caption__number">{item.number}</span>
                <span className="s8f-caption__title">{item.title}</span>
              </div>
              <p className="s8f-caption__description">{item.description}</p>
              <span className="s8f-caption__icon"><Icon aria-hidden={true} /></span>
            </div>
          );
        })}

        <svg className="s8f-wheel__hitmap" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid meet"
          aria-label="Chọn một trong năm lĩnh vực">
          {S8F_SECTORS.map((item, i) => (
            <path key={item.id}
              ref={node => { target.current[i] = node; }}
              d={S8F_SECTOR_PATHS[i]}
              className="s8f-wheel__hit-sector"
              role="button" tabIndex={0} focusable="true"
              aria-label={`${item.number} – ${item.title}: ${item.description}`}
              aria-pressed={selected === i}
              onPointerEnter={e => { if (e.pointerType !== 'touch') setHovered(i); }}
              onPointerLeave={() => setHovered(null)}
              onFocus={() => setFocused(i)}
              onBlur={() => setFocused(null)}
              onClick={() => setSelected(old => (old === i ? null : i))}
              onKeyDown={e => onHitKeyDown(e, i)} />
          ))}
          <polygon points={S8F_STAR_POINTS} className="s8f-wheel__star-guard" aria-hidden="true" />
        </svg>
      </div>

      <div className="s8f-mobile-cards" aria-label="Chi tiết năm yếu tố">
        {S8F_SECTORS.map((item, i) => {
          const Icon = ICONS[item.icon];
          return (
            <button key={item.id} type="button"
              className={`s8f-mobile-card s8f-mobile-card--${item.css}${active === i ? ' s8f-mobile-card--active' : ''}`}
              aria-pressed={selected === i}
              onClick={() => setSelected(old => (old === i ? null : i))}>
              <Icon aria-hidden={true} />
              <span><strong>{item.number} · {item.title}</strong><small>{item.description}</small></span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
