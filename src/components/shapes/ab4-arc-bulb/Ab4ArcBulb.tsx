'use client';

import { useId, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import {
  AB4_ASSET_BASE,
  AB4_MASK_FILES,
  AB4_NODES,
  type Ab4Masks,
  type Ab4NodeItem,
} from './ab4-arc-bulb.config';
import './ab4-arc-bulb.css';

type Ab4Style = CSSProperties & { [key: `--ab4-${string}`]: string };

function nodeStyle(item: Ab4NodeItem): Ab4Style {
  return {
    '--ab4-light': item.colors.light,
    '--ab4-mid': item.colors.mid,
    '--ab4-dark': item.colors.dark,
    '--ab4-glow': item.colors.glow,
  };
}

export interface Ab4ArcBulbProps {
  masks?: Ab4Masks;
  className?: string;
}

export default function Ab4ArcBulb({ masks = {}, className = '' }: Ab4ArcBulbProps) {
  const instanceId = useId();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const nodeRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const mobileRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeIndex = hoveredIndex ?? focusedIndex ?? selectedIndex;
  const activeItem = activeIndex !== null ? AB4_NODES[activeIndex] : null;

  const moduleStyle: Ab4Style = {
    '--ab4-mask-arc': `url("${masks.arc ?? `${AB4_ASSET_BASE}/${AB4_MASK_FILES.arc}`}")`,
    '--ab4-mask-bulb-glass': `url("${masks.bulbGlass ?? `${AB4_ASSET_BASE}/${AB4_MASK_FILES.bulbGlass}`}")`,
    '--ab4-mask-bulb-base': `url("${masks.bulbBase ?? `${AB4_ASSET_BASE}/${AB4_MASK_FILES.bulbBase}`}")`,
    '--ab4-mask-bulb-stem': `url("${masks.bulbStem ?? `${AB4_ASSET_BASE}/${AB4_MASK_FILES.bulbStem}`}")`,
    '--ab4-mask-bulb-filament': `url("${masks.bulbFilament ?? `${AB4_ASSET_BASE}/${AB4_MASK_FILES.bulbFilament}`}")`,
    '--ab4-mask-bulb-rays': `url("${masks.bulbRays ?? `${AB4_ASSET_BASE}/${AB4_MASK_FILES.bulbRays}`}")`,
    '--ab4-mask-circle-outer': `url("${masks.circleOuter ?? `${AB4_ASSET_BASE}/${AB4_MASK_FILES.circleOuter}`}")`,
    '--ab4-mask-circle-inner': `url("${masks.circleInner ?? `${AB4_ASSET_BASE}/${AB4_MASK_FILES.circleInner}`}")`,
  };

  function toggleSelect(index: number) {
    setSelectedIndex((prev) => (prev === index ? null : index));
  }

  function handleKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
    target: 'node' | 'mobile',
  ) {
    const last = AB4_NODES.length - 1;
    const next =
      event.key === 'ArrowDown' || event.key === 'ArrowRight'
        ? (index + 1) % AB4_NODES.length
        : event.key === 'ArrowUp' || event.key === 'ArrowLeft'
          ? (index + last) % AB4_NODES.length
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? last
              : null;

    if (next !== null) {
      event.preventDefault();
      (target === 'node' ? nodeRefs.current[next] : mobileRefs.current[next])?.focus();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setSelectedIndex(null);
      setHoveredIndex(null);
      event.currentTarget.blur();
    }
  }

  return (
    <section
      className={`ab4-module ${className}`.trim()}
      aria-labelledby={`${instanceId}-heading`}
      data-ab4-root="true"
      style={moduleStyle}
    >
      <h2 id={`${instanceId}-heading`} className="ab4-visually-hidden">
        Mô hình bóng đèn tỏa sáng và vòng cung 4 ý tưởng kinh doanh
      </h2>

      {/* Desktop / Tablet Proportional Stage (1280 : 680) */}
      <div className={`ab4-stage${activeItem ? ' has-active' : ''}`} role="group" aria-label="Sơ đồ bóng đèn 4 ý tưởng">
        <div className="ab4-arc" aria-hidden="true" />

        {/* Central Radiating Lightbulb Assembly */}
        <div className="ab4-bulb" aria-hidden="true">
          <div className="ab4-bulb-rays" />
          <div className="ab4-bulb-glass" />
          <div className="ab4-bulb-stem" />
          <div className="ab4-bulb-filament" />
          <div className="ab4-bulb-base" />
        </div>

        {/* 4 Circular Nodes Seated Along the Arch + Flanking Captions */}
        {AB4_NODES.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeIndex === index;
          const isSelected = selectedIndex === index;
          return (
            <div key={item.id} className="ab4-entry" style={nodeStyle(item)}>
              <button
                ref={(el) => {
                  nodeRefs.current[index] = el;
                }}
                type="button"
                className={`ab4-node ab4-node--${item.step}${isActive ? ' is-active' : ''}${isSelected ? ' is-selected' : ''}`}
                aria-pressed={isSelected}
                aria-label={`Mục ${item.step}. ${item.title}: ${item.description}`}
                onClick={() => toggleSelect(index)}
                onPointerEnter={(e) => {
                  if (e.pointerType !== 'touch') setHoveredIndex(index);
                }}
                onPointerLeave={() => setHoveredIndex(null)}
                onFocus={() => setFocusedIndex(index)}
                onBlur={() => setFocusedIndex((prev) => (prev === index ? null : prev))}
                onKeyDown={(e) => handleKeyDown(e, index, 'node')}
              >
                <span className="ab4-node__outer" aria-hidden="true" />
                <span className="ab4-node__inner" aria-hidden="true" />
                <Icon className="ab4-node__icon" aria-hidden="true" />
              </button>

              <div
                className={`ab4-caption ab4-caption--${item.step} ab4-caption--${item.side}${isActive ? ' is-active' : ''}${isSelected ? ' is-selected' : ''}`}
                onClick={() => toggleSelect(index)}
                onPointerEnter={(e) => {
                  if (e.pointerType !== 'touch') setHoveredIndex(index);
                }}
                onPointerLeave={() => setHoveredIndex(null)}
              >
                <span className="ab4-caption__title">{item.title}</span>
                <span className="ab4-caption__desc">{item.description}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Touch Cards (<= 760px) */}
      <div className="ab4-mobile-list" role="group" aria-label="Danh sách 4 ý tưởng kinh doanh">
        {AB4_NODES.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeIndex === index;
          const isSelected = selectedIndex === index;
          return (
            <button
              key={`${item.id}-mobile`}
              ref={(el) => {
                mobileRefs.current[index] = el;
              }}
              type="button"
              className={`ab4-mobile-card${isActive ? ' is-active' : ''}${isSelected ? ' is-selected' : ''}`}
              style={nodeStyle(item)}
              aria-pressed={isSelected}
              onClick={() => toggleSelect(index)}
              onFocus={() => setFocusedIndex(index)}
              onBlur={() => setFocusedIndex((prev) => (prev === index ? null : prev))}
              onKeyDown={(e) => handleKeyDown(e, index, 'mobile')}
            >
              <span className="ab4-mobile-card__badge" aria-hidden="true">
                <Icon />
              </span>
              <span className="ab4-mobile-card__copy">
                <span className="ab4-mobile-card__title">{item.title}</span>
                <span className="ab4-mobile-card__desc">{item.description}</span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
