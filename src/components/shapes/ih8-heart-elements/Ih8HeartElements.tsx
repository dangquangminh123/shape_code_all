'use client';

import { useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import {
  IH8_ASSET_BASE,
  IH8_FA_ICONS,
  IH8_ITEMS,
  IH8_LEFT_ITEMS,
  IH8_MASK_FILES,
  IH8_RIGHT_ITEMS,
  IH8_STAR_ICON,
  type Ih8Item,
  type Ih8MaskRole,
  type Ih8Masks,
  type Ih8Step,
  type Ih8Theme,
} from './ih8-heart-elements.config';
import './ih8-heart-elements.css';

type Ih8Style = CSSProperties & { [key: `--ih8-${string}`]: string };

export default function Ih8HeartElements({
  masks = {},
  theme = 'colorful',
}: {
  masks?: Ih8Masks;
  theme?: Ih8Theme;
}) {
  const petalRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [pinned, setPinned] = useState<Ih8Step | null>(null);
  const [hovered, setHovered] = useState<Ih8Step | null>(null);
  const [focused, setFocused] = useState<Ih8Step | null>(null);

  const active = hovered ?? focused ?? pinned;
  const maskUrl = (role: Ih8MaskRole) =>
    `url("${masks[role] ?? `${IH8_ASSET_BASE}/${IH8_MASK_FILES[role]}`}")`;
  const toggle = (step: Ih8Step) => setPinned(cur => (cur === step ? null : step));
  const clear = () => {
    setPinned(null);
    setHovered(null);
    setFocused(null);
  };

  function onInfoKey(e: KeyboardEvent<HTMLDivElement>, step: Ih8Step) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle(step);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      clear();
    }
  }

  function onPetalKey(e: KeyboardEvent<HTMLButtonElement>, idx: number) {
    const n = IH8_ITEMS.length;
    const next =
      e.key === 'ArrowDown' || e.key === 'ArrowRight'
        ? (idx + 1) % n
        : e.key === 'ArrowUp' || e.key === 'ArrowLeft'
          ? (idx + n - 1) % n
          : e.key === 'Home'
            ? 0
            : e.key === 'End'
              ? n - 1
              : null;
    if (next !== null) {
      e.preventDefault();
      petalRefs.current[next]?.focus();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      clear();
    }
  }

  const renderCard = (item: Ih8Item) => (
    <div
      key={item.step}
      className={`ih8-info${active === item.step ? ' is-active' : ''}`}
      data-ih8-step={item.step}
      role="button"
      tabIndex={0}
      aria-pressed={pinned === item.step}
      aria-label={item.title}
      onPointerEnter={() => setHovered(item.step)}
      onPointerLeave={() => setHovered(c => (c === item.step ? null : c))}
      onFocus={() => setFocused(item.step)}
      onBlur={() => setFocused(c => (c === item.step ? null : c))}
      onClick={() => toggle(item.step)}
      onKeyDown={e => onInfoKey(e, item.step)}
    >
      <h3 className="ih8-info__title">{item.title}</h3>
      <p className="ih8-info__desc">{item.description}</p>
    </div>
  );

  const coreStyle: Ih8Style = { '--ih8-core-mask': maskUrl('coreHeart') };

  return (
    <section
      className={`ih8-module${theme === 'silver-red' ? ' ih8-module--silver-red' : ''}`}
      data-ih8-module=""
      data-ih8-ready="1"
      data-ih8-pinned={pinned ?? ''}
      data-ih8-active={active ?? ''}
      aria-label="Infographic 8 yếu tố hình trái tim"
      onKeyDown={e => {
        if (e.key === 'Escape') clear();
      }}
    >
      <div className="ih8-layout">
        <div className="ih8-side ih8-side--left" aria-label="Bốn nội dung bên trái">
          {IH8_LEFT_ITEMS.map(renderCard)}
        </div>
        <div className="ih8-wheel" role="group" aria-label="Tám phần của trái tim thông tin">
          {IH8_ITEMS.map((item, idx) => {
            const iconDef = IH8_FA_ICONS[item.icon];
            const style: Ih8Style = { '--ih8-mask': maskUrl(item.maskRole) };
            return (
              <button
                key={item.step}
                ref={el => {
                  petalRefs.current[idx] = el;
                }}
                className={`ih8-petal ih8-petal--${item.side}${active === item.step ? ' is-active' : ''}`}
                type="button"
                data-ih8-step={item.step}
                aria-label={item.title}
                aria-pressed={pinned === item.step}
                style={style}
                onPointerEnter={() => setHovered(item.step)}
                onPointerLeave={() => setHovered(c => (c === item.step ? null : c))}
                onFocus={() => setFocused(item.step)}
                onBlur={() => setFocused(c => (c === item.step ? null : c))}
                onClick={() => toggle(item.step)}
                onKeyDown={e => onPetalKey(e, idx)}
              >
                <span className="ih8-petal__stroke" aria-hidden="true" />
                <span className="ih8-petal__fill" aria-hidden="true" />
                <span className="ih8-petal__icon" aria-hidden="true">
                  <svg className="ih8-petal__svg-icon" data-ih8-icon={item.icon} viewBox={iconDef.viewBox} aria-hidden="true" focusable="false">
                    <path fill="currentColor" d={iconDef.path} />
                  </svg>
                </span>
              </button>
            );
          })}
          <div className="ih8-core" aria-label="8 yếu tố trọng tâm" style={coreStyle}>
            <span className="ih8-core__surface" aria-hidden="true" />
            <div className="ih8-core__copy">
              <strong>8 YẾU TỐ</strong>
              <span>TRỌNG TÂM</span>
              <span className="ih8-core__stars" aria-hidden="true">
                {[0, 1, 2, 3, 4].map(i => (
                  <svg key={i} className="ih8-core__star-icon" data-ih8-icon="star" viewBox={IH8_STAR_ICON.viewBox} aria-hidden="true" focusable="false">
                    <path fill="currentColor" d={IH8_STAR_ICON.path} />
                  </svg>
                ))}
              </span>
            </div>
          </div>
        </div>
        <div className="ih8-side ih8-side--right" aria-label="Bốn nội dung bên phải">
          {IH8_RIGHT_ITEMS.map(renderCard)}
        </div>
      </div>
    </section>
  );
}
