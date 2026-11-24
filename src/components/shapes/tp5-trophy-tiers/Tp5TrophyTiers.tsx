'use client';

import { useId, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import {
  TP5_ASSET_BASE,
  TP5_MASK_FILES,
  TP5_TIERS,
  type Tp5Masks,
  type Tp5TierItem,
} from './tp5-trophy-tiers.config';
import './tp5-trophy-tiers.css';

type Tp5Style = CSSProperties & { [key: `--tp5-${string}`]: string };

function tierStyle(tier: Tp5TierItem, maskOverride?: string): Tp5Style {
  return {
    '--tp5-light': tier.colors.light,
    '--tp5-mid': tier.colors.mid,
    '--tp5-dark': tier.colors.dark,
    '--tp5-band-mask': `url("${maskOverride ?? `${TP5_ASSET_BASE}/${tier.maskFile}`}")`,
  };
}

export interface Tp5TrophyTiersProps {
  masks?: Tp5Masks;
  className?: string;
}

export default function Tp5TrophyTiers({ masks = {}, className = '' }: Tp5TrophyTiersProps) {
  const instanceId = useId();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const bandRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const legendRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeIndex = hoveredIndex ?? focusedIndex ?? selectedIndex;

  const moduleStyle: Tp5Style = {
    '--tp5-mask-handles': `url("${masks.handles ?? `${TP5_ASSET_BASE}/${TP5_MASK_FILES.handles}`}")`,
    '--tp5-mask-pedestal': `url("${masks.pedestal ?? `${TP5_ASSET_BASE}/${TP5_MASK_FILES.pedestal}`}")`,
  };

  const maskOverrides: Record<number, string | undefined> = {
    1: masks.band01,
    2: masks.band02,
    3: masks.band03,
    4: masks.band04,
    5: masks.band05,
  };

  function toggleSelect(index: number) {
    setSelectedIndex((prev) => (prev === index ? null : index));
  }

  function handleKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
    target: 'band' | 'legend',
  ) {
    const last = TP5_TIERS.length - 1;
    const next =
      event.key === 'ArrowDown' || event.key === 'ArrowRight'
        ? (index + 1) % TP5_TIERS.length
        : event.key === 'ArrowUp' || event.key === 'ArrowLeft'
          ? (index + last) % TP5_TIERS.length
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? last
              : null;

    if (next !== null) {
      event.preventDefault();
      (target === 'band' ? bandRefs.current[next] : legendRefs.current[next])?.focus();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setSelectedIndex(null);
      setHoveredIndex(null);
      event.currentTarget.blur();
    }
  }

  return (
    <section
      className={`tp5-module ${className}`.trim()}
      aria-labelledby={`${instanceId}-heading`}
      data-tp5-root="true"
      style={moduleStyle}
    >
      <h2 id={`${instanceId}-heading`} className="tp5-visually-hidden">
        Cúp thành tựu 5 tầng từ Ý tưởng đến Lợi nhuận
      </h2>

      <div className="tp5-layout">
        {/* Left Column: 5-Tier Layered Trophy Cup */}
        <div className="tp5-trophy-stage" role="group" aria-label="Tháp cúp 5 tầng">
          <div className="tp5-handles" aria-hidden="true" />
          <div className="tp5-pedestal" aria-hidden="true" />

          <div className="tp5-cup">
            {TP5_TIERS.map((tier, index) => {
              const isActive = activeIndex === index;
              const isSelected = selectedIndex === index;
              return (
                <button
                  key={tier.id}
                  ref={(el) => {
                    bandRefs.current[index] = el;
                  }}
                  type="button"
                  className={`tp5-band tp5-band--${tier.tier}${isActive ? ' is-active' : ''}${isSelected ? ' is-selected' : ''}`}
                  style={tierStyle(tier, maskOverrides[tier.tier])}
                  aria-pressed={isSelected}
                  aria-label={`Tầng ${tier.tier}. ${tier.label}: ${tier.description}`}
                  onClick={() => toggleSelect(index)}
                  onPointerEnter={(e) => {
                    if (e.pointerType !== 'touch') setHoveredIndex(index);
                  }}
                  onPointerLeave={() => setHoveredIndex(null)}
                  onFocus={() => setFocusedIndex(index)}
                  onBlur={() => setFocusedIndex(null)}
                  onKeyDown={(e) => handleKeyDown(e, index, 'band')}
                >
                  <span className="tp5-band__paint" aria-hidden="true" />
                  <span className="tp5-band__label" aria-hidden="true">
                    {tier.label}
                  </span>
                </button>
              );
            })}
            <div className="tp5-cup-sheen" aria-hidden="true" />
          </div>
        </div>

        {/* Right Column: 5-Row Synchronized Legend */}
        <div className="tp5-legend" role="list" aria-label="Chú giải 5 tầng phát triển">
          {TP5_TIERS.map((tier, index) => {
            const Icon = tier.icon;
            const isActive = activeIndex === index;
            const isSelected = selectedIndex === index;
            return (
              <button
                key={`legend-${tier.id}`}
                ref={(el) => {
                  legendRefs.current[index] = el;
                }}
                type="button"
                role="listitem"
                className={`tp5-legend-item${isActive ? ' is-active' : ''}${isSelected ? ' is-selected' : ''}`}
                style={tierStyle(tier)}
                aria-pressed={isSelected}
                aria-label={`${tier.label}: ${tier.description}`}
                onClick={() => toggleSelect(index)}
                onPointerEnter={(e) => {
                  if (e.pointerType !== 'touch') setHoveredIndex(index);
                }}
                onPointerLeave={() => setHoveredIndex(null)}
                onFocus={() => setFocusedIndex(index)}
                onBlur={() => setFocusedIndex(null)}
                onKeyDown={(e) => handleKeyDown(e, index, 'legend')}
              >
                <span className="tp5-legend-icon" aria-hidden="true">
                  <Icon aria-hidden="true" focusable="false" />
                </span>
                <span className="tp5-legend-copy" aria-hidden="true">
                  <strong className="tp5-legend-title">{tier.label}</strong>
                  <span className="tp5-legend-desc">{tier.description}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
