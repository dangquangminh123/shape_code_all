'use client';

import { useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { FaClipboardCheck, FaClock, FaLock, FaRegLightbulb } from 'react-icons/fa6';
import { LuChevronRight, LuTarget } from 'react-icons/lu';
import { TA4_BANNERS, type Ta4IconKey, type Ta4Theme } from './ta4-target-arrow.config';
import {
  TA4_BANNERS_GEOMETRY,
  TA4_LEFT_FEATHER_PATH,
  TA4_RIGHT_FEATHER_PATH,
  TA4_SHAFT_PATH,
  TA4_TARGET_RINGS,
  TA4_TARGET_SIDE_PATH,
} from './ta4-target-arrow.geometry';
import './ta4-target-arrow.css';

type Ta4MaskStyle = CSSProperties & { '--ta4-mask-url'?: string };
type Ta4PosStyle = CSSProperties & { '--ta4-y': string };

const ICONS: Record<Ta4IconKey, typeof FaLock> = {
  lock: FaLock,
  plan: FaClipboardCheck,
  clock: FaClock,
  idea: FaRegLightbulb,
};

interface Ta4TargetArrowProps {
  theme?: Ta4Theme;
  calloutEyebrow?: string;
  calloutTitle?: string;
  calloutSummary?: string;
}

export default function Ta4TargetArrow({
  theme = 'reference',
  calloutEyebrow = 'INFOGRAPHIC',
  calloutTitle = 'BUSINESS',
  calloutSummary = 'Đồng bộ bốn mũi nhọn chiến lược hướng thẳng vào trọng tâm mục tiêu tăng trưởng bền vững.',
}: Ta4TargetArrowProps) {
  const hitRefs = useRef<(SVGPathElement | null)[]>([]);
  const [hovered, setHovered] = useState<number | null>(null);
  const [focused, setFocused] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const active = hovered ?? focused ?? selected;

  const onHitKeyDown = (e: KeyboardEvent<SVGPathElement>, index: number) => {
    const total = TA4_BANNERS.length;
    const next =
      e.key === 'ArrowDown' || e.key === 'ArrowRight' ? (index + 1) % total
      : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? (index + total - 1) % total
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

  const activeItem = active !== null ? TA4_BANNERS[active] : null;

  return (
    <section className={`ta4-module${theme === 'modern' ? ' ta4-module--modern' : ''}`}
      aria-label="Target Arrow Infographic – bốn mũi nhọn hướng tâm mục tiêu">
      <div className={`ta4-stage${active !== null ? ' ta4-stage--has-active' : ''}`}>
        <svg className="ta4-scene-svg" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <defs>
            <radialGradient id="ta4-ground-shadow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0f172a" stopOpacity="0.28" />
              <stop offset="58%" stopColor="#0f172a" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="ta4-target-side-grad" x1="164" y1="490" x2="448" y2="490" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#590804" />
              <stop offset="22%" stopColor="#c71d12" />
              <stop offset="46%" stopColor="#e22d20" />
              <stop offset="76%" stopColor="#9e1008" />
              <stop offset="100%" stopColor="#4c0603" />
            </linearGradient>
            <linearGradient id="ta4-ring-red" x1="180" y1="425" x2="430" y2="505" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#e12b1e" />
              <stop offset="55%" stopColor="#c91c11" />
              <stop offset="100%" stopColor="#9e1108" />
            </linearGradient>
            <linearGradient id="ta4-ring-ivory" x1="200" y1="425" x2="415" y2="500" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f5f3eb" />
              <stop offset="60%" stopColor="#e8e4d8" />
              <stop offset="100%" stopColor="#d2cdc0" />
            </linearGradient>
            <linearGradient id="ta4-cast-shadow" x1="306" y1="463" x2="438" y2="424" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#140403" stopOpacity="0.46" />
              <stop offset="55%" stopColor="#140403" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#140403" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="ta4-pierce-shadow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#120302" stopOpacity="0.65" />
              <stop offset="65%" stopColor="#120302" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#120302" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="ta4-feather-left" x1="278" y1="74" x2="306" y2="165" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#2f89d6" />
              <stop offset="55%" stopColor="#185a99" />
              <stop offset="100%" stopColor="#0c3663" />
            </linearGradient>
            <linearGradient id="ta4-feather-right" x1="306" y1="74" x2="334" y2="165" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0d3a69" />
              <stop offset="48%" stopColor="#1e68ad" />
              <stop offset="100%" stopColor="#3590de" />
            </linearGradient>
            <linearGradient id="ta4-shaft-wood" x1="297" y1="260" x2="315" y2="260" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#6e4526" />
              <stop offset="28%" stopColor="#cfa26e" />
              <stop offset="54%" stopColor="#b5814f" />
              <stop offset="82%" stopColor="#7c4d29" />
              <stop offset="100%" stopColor="#563218" />
            </linearGradient>
            <linearGradient id="ta4-slit-shadow" x1="444" y1="312" x2="412" y2="312" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0f172a" stopOpacity="0.16" />
              <stop offset="45%" stopColor="#0f172a" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
            </linearGradient>
            <clipPath id="ta4-target-top-clip">
              <ellipse cx="306" cy="463" rx="142" ry="56.38" />
            </clipPath>
            <clipPath id="ta4-slit-left-clip">
              <rect x="400" y="196" width="44" height="232" />
            </clipPath>
          </defs>

          <ellipse cx="306" cy="506" rx="148" ry="37" fill="url(#ta4-ground-shadow)" />
          <path d={TA4_TARGET_SIDE_PATH} fill="url(#ta4-target-side-grad)" />

          {TA4_TARGET_RINGS.map((r, idx) => (
            <ellipse key={idx} cx={r.cx} cy={r.cy} rx={r.rx} ry={r.ry}
              fill={r.kind === 'red' ? 'url(#ta4-ring-red)' : 'url(#ta4-ring-ivory)'} />
          ))}

          <polygon points="301,461 428,412 452,442 311,468"
            fill="url(#ta4-cast-shadow)" clipPath="url(#ta4-target-top-clip)" />
          <ellipse cx="306" cy="462.2" rx="15" ry="5.8" fill="url(#ta4-pierce-shadow)" />

          <path d={TA4_LEFT_FEATHER_PATH} fill="url(#ta4-feather-left)" />
          <path d={TA4_RIGHT_FEATHER_PATH} fill="url(#ta4-feather-right)" />
          <path d="M 353.2 80 L 340.6 177.5" fill="none" stroke="rgba(175, 228, 255, 0.55)" strokeWidth="2" strokeLinecap="round" />
          <path d="M 259.2 81 L 271.4 177.5" fill="none" stroke="rgba(175, 228, 255, 0.28)" strokeWidth="1.4" strokeLinecap="round" />

          <path d={TA4_SHAFT_PATH} fill="url(#ta4-shaft-wood)" />
          <rect x="297.2" y="416" width="17.6" height="8" fill="rgba(25, 12, 4, 0.28)" />

          <ellipse cx="444" cy="312" rx="28" ry="108" fill="url(#ta4-slit-shadow)" clipPath="url(#ta4-slit-left-clip)" />
          <rect x="443.5" y="196" width="2.4" height="232" rx="1.2" fill="#ffffff" stroke="rgba(15,23,42,0.08)" strokeWidth="0.6" />
          <rect x="446" y="240" width="3.6" height="44" className={`ta4-spine-seg ta4-spine-seg--cyan${active === 0 ? ' is-active' : ''}`} />
          <rect x="446" y="284" width="3.6" height="44" className={`ta4-spine-seg ta4-spine-seg--crimson${active === 1 ? ' is-active' : ''}`} />
          <rect x="446" y="328" width="3.6" height="44" className={`ta4-spine-seg ta4-spine-seg--pearl${active === 2 ? ' is-active' : ''}`} />
          <rect x="446" y="372" width="3.6" height="44" className={`ta4-spine-seg ta4-spine-seg--amber${active === 3 ? ' is-active' : ''}`} />
        </svg>
        <div className="ta4-banners-layer" aria-hidden="true">
          {TA4_BANNERS.map((item, i) => (
            <div key={item.id}
              className={`ta4-banner ta4-banner--${item.css}${active === i ? ' ta4-banner--active' : ''}`}
              data-ta4-step={item.id}
              style={{ '--ta4-mask-url': `url('/assets/shapes/ta4-target-arrow/${item.mask}')` } as Ta4MaskStyle}>
              <span className="ta4-banner__fill" />
            </div>
          ))}
        </div>

        <svg className="ta4-creases-svg" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <defs>
            <linearGradient id="ta4-shaft-wrap-sheen" x1="297" y1="300" x2="315" y2="300" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#000000" stopOpacity="0.14" />
              <stop offset="32%" stopColor="#ffffff" stopOpacity="0.24" />
              <stop offset="72%" stopColor="#000000" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.18" />
            </linearGradient>
          </defs>
          <rect x="297" y="208" width="18" height="208" fill="url(#ta4-shaft-wrap-sheen)" />
          {[260, 312, 364].map(y => (
            <line key={y} x1="121.2" y1={y} x2="315" y2={y} stroke="rgba(15, 23, 42, 0.16)" strokeWidth="1.2" />
          ))}
          {TA4_BANNERS_GEOMETRY.map((b, i) => {
            const creaseClass = `ta4-crease ${TA4_BANNERS[i].css === 'pearl' ? 'ta4-crease--dark' : 'ta4-crease--light'}`;
            return (
              <g key={i}>
                <path d={b.crease1} className={creaseClass} />
                <path d={b.crease2} className={creaseClass} />
              </g>
            );
          })}
        </svg>

        {TA4_BANNERS.map((item, i) => {
          const Icon = ICONS[item.icon];
          const yPct = `${((TA4_BANNERS_GEOMETRY[i].yMid / 600) * 100).toFixed(3)}%`;
          return (
            <div key={item.id}
              className={`ta4-banner-item ta4-banner-item--${item.css}${active === i ? ' ta4-banner-item--active' : ''}`}
              aria-hidden="true">
              <span className="ta4-banner-item__icon" style={{ '--ta4-y': yPct } as Ta4PosStyle}>
                <Icon aria-hidden={true} />
              </span>
              <div className="ta4-banner-item__copy" style={{ '--ta4-y': yPct } as Ta4PosStyle}>
                <strong className="ta4-banner-item__label">{item.optionLabel}</strong>
                <span className="ta4-banner-item__sub">{item.subtitle}</span>
              </div>
            </div>
          );
        })}

        <div className="ta4-callout" aria-live="polite">
          <span className="ta4-callout__eyebrow">
            <LuTarget className="ta4-callout__eyebrow-icon" aria-hidden="true" focusable="false" />
            <span>{calloutEyebrow}</span>
          </span>
          <strong className="ta4-callout__title">{calloutTitle}</strong>
          {activeItem && (() => {
            const ActiveIcon = ICONS[activeItem.icon];
            return (
              <span className="ta4-callout__badge">
                <ActiveIcon className="ta4-callout__badge-icon" aria-hidden="true" focusable="false" />
                <span>{activeItem.optionLabel}</span>
                <LuChevronRight className="ta4-callout__sep" aria-hidden="true" focusable="false" />
                <span>{activeItem.subtitle}</span>
              </span>
            );
          })()}
          <p className="ta4-callout__desc">
            {activeItem ? activeItem.detail : calloutSummary}
          </p>
        </div>

        <svg className="ta4-hitmap" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid meet"
          aria-label="Chọn một trong bốn mũi nhọn mục tiêu">
          {TA4_BANNERS.map((item, i) => (
            <path key={item.id} ref={node => { hitRefs.current[i] = node; }}
              d={TA4_BANNERS_GEOMETRY[i].silhouette}
              className="ta4-hitmap__banner" role="button" tabIndex={0} focusable="true"
              aria-label={`${item.optionLabel} – ${item.subtitle}: ${item.detail}`}
              aria-pressed={selected === i}
              onPointerEnter={e => { if (e.pointerType !== 'touch') setHovered(i); }}
              onPointerLeave={() => setHovered(null)} onFocus={() => setFocused(i)} onBlur={() => setFocused(null)}
              onClick={() => setSelected(prev => (prev === i ? null : i))} onKeyDown={e => onHitKeyDown(e, i)} />
          ))}
        </svg>
      </div>

      <div className="ta4-mobile-cards" aria-label="Chi tiết bốn mũi nhọn mục tiêu">
        {TA4_BANNERS.map((item, i) => {
          const Icon = ICONS[item.icon];
          return (
            <button key={item.id} type="button"
              className={`ta4-mobile-card ta4-mobile-card--${item.css}${active === i ? ' ta4-mobile-card--active' : ''}`}
              aria-pressed={selected === i} onClick={() => setSelected(prev => (prev === i ? null : i))}>
              <span className="ta4-mobile-card__icon"><Icon aria-hidden={true} /></span>
              <span className="ta4-mobile-card__body">
                <strong className="ta4-mobile-card__heading">
                  <span>{item.optionLabel}</span>
                  <LuChevronRight className="ta4-mobile-card__sep" aria-hidden="true" focusable="false" />
                  <span>{item.subtitle}</span>
                </strong>
                <small>{item.detail}</small>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
