'use client';

import { useId, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import {
  DT4_ASSET_BASE,
  DT4_MASK_FILES,
  DT4_TIERS,
  type Dt4Masks,
  type Dt4TierItem,
} from './dt4-dual-tubes.config';
import './dt4-dual-tubes.css';

type Dt4Style = CSSProperties & { [key: `--dt4-${string}`]: string };

function tierStyle(tier: Dt4TierItem): Dt4Style {
  return {
    '--dt4-wing-left': tier.colors.wingLeft,
    '--dt4-mid': tier.colors.mid,
    '--dt4-wing-right': tier.colors.wingRight,
    '--dt4-tube-light': tier.colors.tubeLight,
    '--dt4-tube-dark': tier.colors.tubeDark,
    '--dt4-reflection': tier.colors.reflection,
  };
}

export interface Dt4DualTubesProps {
  masks?: Dt4Masks;
  className?: string;
}

export default function Dt4DualTubes({ masks = {}, className = '' }: Dt4DualTubesProps) {
  const instanceId = useId();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const rowRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const mobileRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeIndex = hoveredIndex ?? focusedIndex ?? selectedIndex;

  const moduleStyle: Dt4Style = {
    '--dt4-mask-tube-body': `url("${masks.tubeBody ?? `${DT4_ASSET_BASE}/${DT4_MASK_FILES.tubeBody}`}")`,
    '--dt4-mask-tube-cap': `url("${masks.tubeCap ?? `${DT4_ASSET_BASE}/${DT4_MASK_FILES.tubeCap}`}")`,
    '--dt4-mask-tube-cap-ribs': `url("${masks.tubeCapRibs ?? `${DT4_ASSET_BASE}/${DT4_MASK_FILES.tubeCapRibs}`}")`,
    '--dt4-mask-ribbon-bar': `url("${masks.ribbonBar ?? `${DT4_ASSET_BASE}/${DT4_MASK_FILES.ribbonBar}`}")`,
  };

  function toggleSelect(index: number) {
    setSelectedIndex((prev) => (prev === index ? null : index));
  }

  function handleKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
    target: 'desktop' | 'mobile',
  ) {
    const last = DT4_TIERS.length - 1;
    const next =
      event.key === 'ArrowDown' || event.key === 'ArrowRight'
        ? (index + 1) % DT4_TIERS.length
        : event.key === 'ArrowUp' || event.key === 'ArrowLeft'
          ? (index + last) % DT4_TIERS.length
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? last
              : null;

    if (next !== null) {
      event.preventDefault();
      (target === 'desktop' ? rowRefs.current[next] : mobileRefs.current[next])?.focus();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setSelectedIndex(null);
      setHoveredIndex(null);
      event.currentTarget.blur();
    }
  }

  function renderTube(side: 'left' | 'right') {
    return (
      <div className={`dt4-tube dt4-tube--${side}`} aria-hidden="true">
        <div className="dt4-tube__cap-wrap">
          <span className="dt4-tube__cap" />
          <span className="dt4-tube__cap-ribs" />
        </div>

        <div className="dt4-tube__body-wrap">
          <div className="dt4-tube__body">
            {DT4_TIERS.map((tier, index) => {
              const Icon = tier.icon;
              const isActive = activeIndex === index;
              return (
                <div
                  key={`${side}-${tier.number}`}
                  className={`dt4-tube__band dt4-tube__band--${index + 1}${isActive ? ' is-active' : ''}`}
                  style={tierStyle(tier)}
                >
                  {side === 'left' ? (
                    <span className="dt4-tube-num">{tier.number}</span>
                  ) : (
                    <span className="dt4-tube-icon">
                      <Icon aria-hidden="true" focusable="false" />
                    </span>
                  )}
                </div>
              );
            })}
            <div className="dt4-tube__crimp" />
            <div className="dt4-tube__gloss" />
          </div>
        </div>

        <div
          className="dt4-tube__reflection"
          style={tierStyle(DT4_TIERS[3])}
        />
      </div>
    );
  }

  return (
    <section
      className={`dt4-module ${className}`.trim()}
      aria-labelledby={`${instanceId}-heading`}
      data-dt4-root="true"
      style={moduleStyle}
    >
      <h2 id={`${instanceId}-heading`} className="dt4-visually-hidden">
        Mô hình 4 tầng kết nối giữa hai trụ tuýp 3D
      </h2>

      {/* Desktop / Tablet 3D Dual-Tube Stage */}
      <div className="dt4-stage" role="group" aria-label="Bốn tầng quy trình với hai trụ số và biểu tượng">
        <div className="dt4-rows">
          {DT4_TIERS.map((tier, index) => {
            const isActive = activeIndex === index;
            const isSelected = selectedIndex === index;
            return (
              <button
                key={tier.id}
                ref={(el) => {
                  rowRefs.current[index] = el;
                }}
                type="button"
                className={`dt4-row dt4-row--${index + 1}${isActive ? ' is-active' : ''}${isSelected ? ' is-selected' : ''}`}
                style={tierStyle(tier)}
                aria-pressed={isSelected}
                aria-label={`Bước ${tier.number}. ${tier.title}: ${tier.description}`}
                onClick={() => toggleSelect(index)}
                onPointerEnter={(e) => {
                  if (e.pointerType !== 'touch') setHoveredIndex(index);
                }}
                onPointerLeave={() => setHoveredIndex(null)}
                onFocus={() => setFocusedIndex(index)}
                onBlur={() => setFocusedIndex(null)}
                onKeyDown={(e) => handleKeyDown(e, index, 'desktop')}
              >
                <span className="dt4-row__frame" aria-hidden="true" />
                <span className="dt4-row__fill" aria-hidden="true" />
                <span className="dt4-row__copy" aria-hidden="true">
                  <strong className="dt4-row__title">{tier.title}</strong>
                  <span className="dt4-row__desc">{tier.description}</span>
                </span>
              </button>
            );
          })}
        </div>

        {renderTube('left')}
        {renderTube('right')}
      </div>

      {/* Mobile Cards Fallback (<= 640px) */}
      <div className="dt4-mobile-list" role="list" aria-label="Bốn tầng quy trình (giao diện di động)">
        {DT4_TIERS.map((tier, index) => {
          const Icon = tier.icon;
          const isSelected = selectedIndex === index;
          const isActive = activeIndex === index;
          return (
            <button
              key={`m-${tier.id}`}
              ref={(el) => {
                mobileRefs.current[index] = el;
              }}
              type="button"
              className={`dt4-mobile-card${isActive ? ' is-active' : ''}${isSelected ? ' is-selected' : ''}`}
              role="listitem"
              style={tierStyle(tier)}
              aria-pressed={isSelected}
              aria-label={`Bước ${tier.number}. ${tier.title}: ${tier.description}`}
              onClick={() => toggleSelect(index)}
              onFocus={() => setFocusedIndex(index)}
              onBlur={() => setFocusedIndex(null)}
              onKeyDown={(e) => handleKeyDown(e, index, 'mobile')}
            >
              <span className="dt4-mobile-card__num" aria-hidden="true">
                {tier.number}
              </span>
              <span className="dt4-mobile-card__body" aria-hidden="true">
                <strong className="dt4-mobile-card__title">{tier.title}</strong>
                <span className="dt4-mobile-card__desc">{tier.description}</span>
              </span>
              <span className="dt4-mobile-card__icon" aria-hidden="true">
                <Icon aria-hidden="true" focusable="false" />
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
