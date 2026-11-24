'use client';

import { useId, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import {
  CS6_ASSET_BASE,
  CS6_MASK_FILES,
  CS6_PILLARS,
  type Cs6Masks,
  type Cs6PillarItem,
} from './cs6-slanted-pillars.config';
import './cs6-slanted-pillars.css';

type Cs6Style = CSSProperties & { [key: `--cs6-${string}`]: string };

function pillarStyle(item: Cs6PillarItem): Cs6Style {
  return {
    '--cs6-light': item.colors.light,
    '--cs6-mid': item.colors.mid,
    '--cs6-dark': item.colors.dark,
    '--cs6-wing': item.colors.wing,
    '--cs6-glow': item.colors.glow,
  };
}

export interface Cs6SlantedPillarsProps {
  masks?: Cs6Masks;
  className?: string;
}

export default function Cs6SlantedPillars({ masks = {}, className = '' }: Cs6SlantedPillarsProps) {
  const instanceId = useId();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const barRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const colRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeIndex = hoveredIndex ?? focusedIndex ?? selectedIndex;

  const moduleStyle: Cs6Style = {
    '--cs6-mask-bar': `url("${masks.bar ?? `${CS6_ASSET_BASE}/${CS6_MASK_FILES.bar}`}")`,
    '--cs6-mask-wing': `url("${masks.wing ?? `${CS6_ASSET_BASE}/${CS6_MASK_FILES.wing}`}")`,
  };

  function toggleSelect(index: number) {
    setSelectedIndex((prev) => (prev === index ? null : index));
  }

  function handleKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
    target: 'bar' | 'col',
  ) {
    const last = CS6_PILLARS.length - 1;
    const next =
      event.key === 'ArrowRight' || event.key === 'ArrowDown'
        ? (index + 1) % CS6_PILLARS.length
        : event.key === 'ArrowLeft' || event.key === 'ArrowUp'
          ? (index + last) % CS6_PILLARS.length
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? last
              : null;

    if (next !== null) {
      event.preventDefault();
      (target === 'bar' ? barRefs.current[next] : colRefs.current[next])?.focus();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setSelectedIndex(null);
      setHoveredIndex(null);
      event.currentTarget.blur();
    }
  }

  return (
    <section
      className={`cs6-module ${className}`.trim()}
      aria-labelledby={`${instanceId}-heading`}
      data-cs6-root="true"
      style={moduleStyle}
    >
      <h2 id={`${instanceId}-heading`} className="cs6-visually-hidden">
        Mô hình 6 thanh trụ nghiêng gấp nếp 3D và tiêu chí kiểm chứng
      </h2>

      <div className="cs6-layout">
        {/* Top Folded 6-Pillar 3D Accordion Ribbon Stage (251.98 : 81) */}
        <div className="cs6-ribbon-stage" role="group" aria-label="Chuỗi 6 trụ nghiêng 3D">
          {/* Layer 1: 5 Connecting Dark Shadow Return Wings Behind the 6 Front Bars */}
          <div className="cs6-wings" aria-hidden="true">
            {CS6_PILLARS.slice(0, 5).map((item) => {
              const isActive = activeIndex === item.index;
              return (
                <div
                  key={`${item.id}-wing`}
                  className={`cs6-wing cs6-wing--${item.index + 1}${isActive ? ' is-active' : ''}`}
                  style={pillarStyle(item)}
                />
              );
            })}
          </div>

          {/* Layer 2: 6 Slanted Front Bars with Rotated Labels */}
          <div className="cs6-bars">
            {CS6_PILLARS.map((item) => {
              const isActive = activeIndex === item.index;
              const isSelected = selectedIndex === item.index;
              return (
                <button
                  key={item.id}
                  ref={(el) => {
                    barRefs.current[item.index] = el;
                  }}
                  type="button"
                  className={`cs6-bar cs6-bar--${item.index + 1}${isActive ? ' is-active' : ''}${isSelected ? ' is-selected' : ''}`}
                  style={pillarStyle(item)}
                  aria-pressed={isSelected}
                  aria-label={`Trụ ${item.index + 1}. ${item.label}: ${item.description}`}
                  onClick={() => toggleSelect(item.index)}
                  onPointerEnter={(e) => {
                    if (e.pointerType !== 'touch') setHoveredIndex(item.index);
                  }}
                  onPointerLeave={() => setHoveredIndex(null)}
                  onFocus={() => setFocusedIndex(item.index)}
                  onBlur={() => setFocusedIndex((prev) => (prev === item.index ? null : prev))}
                  onKeyDown={(e) => handleKeyDown(e, item.index, 'bar')}
                >
                  <span className="cs6-bar__paint" aria-hidden="true" />
                  <span className="cs6-bar__label">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="cs6-ribbon-sheen" aria-hidden="true" />
        </div>

        {/* Bottom 6 Checkmark Columns Aligned Underneath Each Slanted Pillar */}
        <div className="cs6-details" role="group" aria-label="Chi tiết 6 trụ cột">
          {CS6_PILLARS.map((item) => {
            const Icon = item.icon;
            const isActive = activeIndex === item.index;
            const isSelected = selectedIndex === item.index;
            return (
              <button
                key={`${item.id}-detail`}
                ref={(el) => {
                  colRefs.current[item.index] = el;
                }}
                type="button"
                className={`cs6-detail${isActive ? ' is-active' : ''}${isSelected ? ' is-selected' : ''}`}
                style={pillarStyle(item)}
                aria-pressed={isSelected}
                onClick={() => toggleSelect(item.index)}
                onPointerEnter={(e) => {
                  if (e.pointerType !== 'touch') setHoveredIndex(item.index);
                }}
                onPointerLeave={() => setHoveredIndex(null)}
                onFocus={() => setFocusedIndex(item.index)}
                onBlur={() => setFocusedIndex((prev) => (prev === item.index ? null : prev))}
                onKeyDown={(e) => handleKeyDown(e, item.index, 'col')}
              >
                <span className="cs6-detail__icon" aria-hidden="true">
                  <Icon />
                </span>
                <span className="cs6-detail__title">{item.label}</span>
                <span className="cs6-detail__desc">{item.description}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
