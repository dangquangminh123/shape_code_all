'use client';

import { useId, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import {
  KM6_ASSET_BASE,
  KM6_MASK_FILES,
  KM6_STAGES,
  type Km6Masks,
  type Km6StageItem,
} from './km6-knowledge-rings.config';
import './km6-knowledge-rings.css';

type Km6Style = CSSProperties & { [key: `--km6-${string}`]: string };

function stageStyle(item: Km6StageItem): Km6Style {
  return {
    '--km6-light': item.colors.light,
    '--km6-mid': item.colors.mid,
    '--km6-dark': item.colors.dark,
    '--km6-glow': item.colors.glow,
  };
}

export interface Km6KnowledgeRingsProps {
  masks?: Km6Masks;
  className?: string;
}

export default function Km6KnowledgeRings({ masks = {}, className = '' }: Km6KnowledgeRingsProps) {
  const instanceId = useId();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const ringRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const captionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeIndex = hoveredIndex ?? focusedIndex ?? selectedIndex;

  const moduleStyle: Km6Style = {
    '--km6-mask-body': `url("${masks.ringBody ?? `${KM6_ASSET_BASE}/${KM6_MASK_FILES.ringBody}`}")`,
    '--km6-mask-rim': `url("${masks.ringRim ?? `${KM6_ASSET_BASE}/${KM6_MASK_FILES.ringRim}`}")`,
  };

  // Left captions ordered top->bottom: 06 (Công nghệ), 05 (Quy trình), 04 (Văn hóa)
  const leftItems = KM6_STAGES.filter((item) => item.side === 'left').sort(
    (a, b) => a.sideRow - b.sideRow,
  );
  // Right captions ordered top->bottom: 01 (Thu thập), 02 (Khai thác), 03 (Chia sẻ)
  const rightItems = KM6_STAGES.filter((item) => item.side === 'right').sort(
    (a, b) => a.sideRow - b.sideRow,
  );

  function toggleSelect(index: number) {
    setSelectedIndex((prev) => (prev === index ? null : index));
  }

  function handleKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
    target: 'ring' | 'caption',
  ) {
    const last = KM6_STAGES.length - 1;
    const next =
      event.key === 'ArrowDown' || event.key === 'ArrowRight'
        ? (index + 1) % KM6_STAGES.length
        : event.key === 'ArrowUp' || event.key === 'ArrowLeft'
          ? (index + last) % KM6_STAGES.length
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? last
              : null;

    if (next !== null) {
      event.preventDefault();
      (target === 'ring' ? ringRefs.current[next] : captionRefs.current[next])?.focus();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setSelectedIndex(null);
      setHoveredIndex(null);
      event.currentTarget.blur();
    }
  }

  function renderCaption(item: Km6StageItem) {
    const Icon = item.icon;
    const isActive = activeIndex === item.index;
    const isSelected = selectedIndex === item.index;
    return (
      <button
        key={`${item.id}-caption`}
        ref={(el) => {
          captionRefs.current[item.index] = el;
        }}
        type="button"
        className={`km6-caption km6-caption--${item.side}${isActive ? ' is-active' : ''}${isSelected ? ' is-selected' : ''}`}
        style={stageStyle(item)}
        aria-pressed={isSelected}
        aria-label={`${item.num}. ${item.title}: ${item.description}`}
        onClick={() => toggleSelect(item.index)}
        onPointerEnter={(e) => {
          if (e.pointerType !== 'touch') setHoveredIndex(item.index);
        }}
        onPointerLeave={() => setHoveredIndex(null)}
        onFocus={() => setFocusedIndex(item.index)}
        onBlur={() => setFocusedIndex((prev) => (prev === item.index ? null : prev))}
        onKeyDown={(e) => handleKeyDown(e, item.index, 'caption')}
      >
        <span className="km6-caption__header">
          <span className="km6-caption__icon" aria-hidden="true">
            <Icon />
          </span>
          <span className="km6-caption__title">{item.title}</span>
        </span>
        <span className="km6-caption__desc">{item.description}</span>
      </button>
    );
  }

  return (
    <section
      className={`km6-module ${className}`.trim()}
      aria-labelledby={`${instanceId}-heading`}
      data-km6-root="true"
      style={moduleStyle}
    >
      <h2 id={`${instanceId}-heading`} className="km6-visually-hidden">
        Chu trình quản trị tri thức 6 vòng xoáy
      </h2>

      <div className="km6-layout">
        <div className="km6-side km6-side--left" role="group" aria-label="Nhóm tiêu chí bên trái">
          {leftItems.map(renderCaption)}
        </div>

        {/* Center Hexagonal Cluster of 6 Swirling 3-Arrow Rings */}
        <div className="km6-hex-stage" role="group" aria-label="Lục giác 6 vòng xoáy tri thức">
          {KM6_STAGES.map((item) => {
            const isActive = activeIndex === item.index;
            const isSelected = selectedIndex === item.index;
            return (
              <button
                key={item.id}
                ref={(el) => {
                  ringRefs.current[item.index] = el;
                }}
                type="button"
                className={`km6-ring km6-ring--${item.index + 1}${isActive ? ' is-active' : ''}${isSelected ? ' is-selected' : ''}`}
                style={stageStyle(item)}
                aria-pressed={isSelected}
                aria-label={`Bước ${item.num}. ${item.title}: ${item.description}`}
                onClick={() => toggleSelect(item.index)}
                onPointerEnter={(e) => {
                  if (e.pointerType !== 'touch') setHoveredIndex(item.index);
                }}
                onPointerLeave={() => setHoveredIndex(null)}
                onFocus={() => setFocusedIndex(item.index)}
                onBlur={() => setFocusedIndex((prev) => (prev === item.index ? null : prev))}
                onKeyDown={(e) => handleKeyDown(e, item.index, 'ring')}
              >
                <span className="km6-ring__shadow" aria-hidden="true" />
                <span className="km6-ring__body" aria-hidden="true" />
                <span className="km6-ring__rim" aria-hidden="true" />
                <span className="km6-ring__num" aria-hidden="true">
                  {item.num}
                </span>
              </button>
            );
          })}
          <div className="km6-hex-sheen" aria-hidden="true" />
        </div>

        <div className="km6-side km6-side--right" role="group" aria-label="Nhóm tiêu chí bên phải">
          {rightItems.map(renderCaption)}
        </div>
      </div>
    </section>
  );
}
