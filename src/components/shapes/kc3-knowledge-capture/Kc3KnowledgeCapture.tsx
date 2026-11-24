'use client';

import { useId, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import {
  KC3_ASSET_BASE,
  KC3_MASK_FILES,
  KC3_STAGES,
  type Kc3Masks,
  type Kc3StageItem,
} from './kc3-knowledge-capture.config';
import './kc3-knowledge-capture.css';

type Kc3Style = CSSProperties & { [key: `--kc3-${string}`]: string };

function cardStyle(item: Kc3StageItem): Kc3Style {
  return {
    '--kc3-cap-light': item.colors.capLight,
    '--kc3-cap-dark': item.colors.capDark,
    '--kc3-body-light': item.colors.bodyLight,
    '--kc3-body-dark': item.colors.bodyDark,
    '--kc3-frame': item.colors.frame,
    '--kc3-glow': item.colors.glow,
  };
}

export interface Kc3KnowledgeCaptureProps {
  masks?: Kc3Masks;
  className?: string;
}

export default function Kc3KnowledgeCapture({ masks = {}, className = '' }: Kc3KnowledgeCaptureProps) {
  const instanceId = useId();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeIndex = hoveredIndex ?? focusedIndex ?? selectedIndex;

  const moduleStyle: Kc3Style = {
    '--kc3-mask-cap': `url("${masks.cap ?? `${KC3_ASSET_BASE}/${KC3_MASK_FILES.cap}`}")`,
    '--kc3-mask-fill': `url("${masks.bannerFill ?? `${KC3_ASSET_BASE}/${KC3_MASK_FILES.bannerFill}`}")`,
    '--kc3-mask-frame': `url("${masks.bannerFrame ?? `${KC3_ASSET_BASE}/${KC3_MASK_FILES.bannerFrame}`}")`,
  };

  function toggleSelect(index: number) {
    setSelectedIndex((prev) => (prev === index ? null : index));
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = KC3_STAGES.length - 1;
    const next =
      event.key === 'ArrowRight' || event.key === 'ArrowDown'
        ? (index + 1) % KC3_STAGES.length
        : event.key === 'ArrowLeft' || event.key === 'ArrowUp'
          ? (index + last) % KC3_STAGES.length
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? last
              : null;

    if (next !== null) {
      event.preventDefault();
      cardRefs.current[next]?.focus();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setSelectedIndex(null);
      setHoveredIndex(null);
      event.currentTarget.blur();
    }
  }

  return (
    <section
      className={`kc3-module ${className}`.trim()}
      aria-labelledby={`${instanceId}-heading`}
      data-kc3-root="true"
      style={moduleStyle}
    >
      <h2 id={`${instanceId}-heading`} className="kc3-visually-hidden">
        Quy trình 3 thẻ cờ mũi tên mũ kim cương
      </h2>

      <div className="kc3-grid" role="group" aria-label="Ba giai đoạn thu thập tri thức">
        {KC3_STAGES.map((item) => {
          const Icon = item.icon;
          const isActive = activeIndex === item.index;
          const isSelected = selectedIndex === item.index;
          return (
            <button
              key={item.id}
              ref={(el) => {
                cardRefs.current[item.index] = el;
              }}
              type="button"
              className={`kc3-card kc3-card--${item.index + 1}${isActive ? ' is-active' : ''}${isSelected ? ' is-selected' : ''}`}
              style={cardStyle(item)}
              aria-pressed={isSelected}
              aria-label={`Bước ${item.index + 1}. ${item.title}: ${item.description}`}
              onClick={() => toggleSelect(item.index)}
              onPointerEnter={(e) => {
                if (e.pointerType !== 'touch') setHoveredIndex(item.index);
              }}
              onPointerLeave={() => setHoveredIndex(null)}
              onFocus={() => setFocusedIndex(item.index)}
              onBlur={() => setFocusedIndex((prev) => (prev === item.index ? null : prev))}
              onKeyDown={(e) => handleKeyDown(e, item.index)}
            >
              {/* Top Diamond Cap Overhang (12/1.svg) */}
              <span className="kc3-cap">
                <span className="kc3-cap__paint" aria-hidden="true" />
                <span className="kc3-cap__icon" aria-hidden="true">
                  <Icon />
                </span>
                <span className="kc3-cap__title">{item.title}</span>
              </span>

              {/* Lower Double-Outline Vertical Chevron Body (12/2.svg) */}
              <span className="kc3-body">
                <span className="kc3-body__surface" aria-hidden="true" />
                <span className="kc3-body__frame" aria-hidden="true" />
                <span className="kc3-body__fill" aria-hidden="true" />
                <span className="kc3-body__copy">{item.description}</span>
              </span>
            </button>
          );
        })}

        <div className="kc3-grid-sheen" aria-hidden="true" />
      </div>
    </section>
  );
}
