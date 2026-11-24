'use client';

import { useId, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import {
  LB6_ASSET_BASE,
  LB6_IDEAS,
  LB6_MASK_FILES,
  type Lb6IdeaItem,
  type Lb6Masks,
} from './lb6-lightbulb-ideas.config';
import './lb6-lightbulb-ideas.css';

type Lb6Style = CSSProperties & { [key: `--lb6-${string}`]: string };

function itemStyle(item: Lb6IdeaItem): Lb6Style {
  return {
    '--lb6-light': item.colors.light,
    '--lb6-mid': item.colors.mid,
    '--lb6-dark': item.colors.dark,
    '--lb6-glow': item.colors.glow,
  };
}

export interface Lb6LightbulbIdeasProps {
  masks?: Lb6Masks;
  className?: string;
}

export default function Lb6LightbulbIdeas({ masks = {}, className = '' }: Lb6LightbulbIdeasProps) {
  const instanceId = useId();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeIndex = hoveredIndex ?? focusedIndex ?? selectedIndex;
  const activeItem = activeIndex !== null ? LB6_IDEAS[activeIndex] : null;

  const moduleStyle: Lb6Style = {
    '--lb6-mask-bulb-head': `url("${masks.bulbHead ?? `${LB6_ASSET_BASE}/${LB6_MASK_FILES.bulbHead}`}")`,
    '--lb6-mask-bulb-base': `url("${masks.bulbBase ?? `${LB6_ASSET_BASE}/${LB6_MASK_FILES.bulbBase}`}")`,
    '--lb6-mask-bolt': `url("${masks.bolt ?? `${LB6_ASSET_BASE}/${LB6_MASK_FILES.bolt}`}")`,
    '--lb6-mask-circle': `url("${masks.circle ?? `${LB6_ASSET_BASE}/${LB6_MASK_FILES.circle}`}")`,
    '--lb6-active-glow': activeItem ? activeItem.colors.glow : 'rgba(250, 204, 21, 0.24)',
  };

  const leftItems = LB6_IDEAS.filter((item) => item.side === 'left');
  const rightItems = LB6_IDEAS.filter((item) => item.side === 'right');

  function toggleSelect(index: number) {
    setSelectedIndex((prev) => (prev === index ? null : index));
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = LB6_IDEAS.length - 1;
    let next: number | null = null;

    if (event.key === 'ArrowDown') {
      next = (index + 1) % LB6_IDEAS.length;
    } else if (event.key === 'ArrowUp') {
      next = (index + last) % LB6_IDEAS.length;
    } else if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      next = (index + 3) % LB6_IDEAS.length;
    } else if (event.key === 'Home') {
      next = 0;
    } else if (event.key === 'End') {
      next = last;
    }

    if (next !== null) {
      event.preventDefault();
      itemRefs.current[next]?.focus();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setSelectedIndex(null);
      setHoveredIndex(null);
      event.currentTarget.blur();
    }
  }

  function renderPillar(item: Lb6IdeaItem) {
    const Icon = item.icon;
    const isActive = activeIndex === item.order;
    const isSelected = selectedIndex === item.order;

    return (
      <button
        key={item.id}
        ref={(el) => {
          itemRefs.current[item.order] = el;
        }}
        type="button"
        className={`lb6-item lb6-item--${item.side}${isActive ? ' is-active' : ''}${isSelected ? ' is-selected' : ''}`}
        style={itemStyle(item)}
        aria-pressed={isSelected}
        aria-label={`${item.title}: ${item.description}`}
        onClick={() => toggleSelect(item.order)}
        onPointerEnter={(e) => {
          if (e.pointerType !== 'touch') setHoveredIndex(item.order);
        }}
        onPointerLeave={() => setHoveredIndex(null)}
        onFocus={() => setFocusedIndex(item.order)}
        onBlur={() => setFocusedIndex((prev) => (prev === item.order ? null : prev))}
        onKeyDown={(e) => handleKeyDown(e, item.order)}
      >
        <div className="lb6-copy">
          <span className="lb6-title">{item.title}</span>
          <span className="lb6-desc">{item.description}</span>
        </div>

        <span className="lb6-badge" aria-hidden="true">
          <span className="lb6-badge__bg" />
          <Icon className="lb6-badge__icon" />
        </span>
      </button>
    );
  }

  return (
    <section
      className={`lb6-module ${className}`.trim()}
      aria-labelledby={`${instanceId}-heading`}
      data-lb6-root="true"
      style={moduleStyle}
    >
      <h2 id={`${instanceId}-heading`} className="lb6-visually-hidden">
        Mô hình bóng đèn 6 trụ cột ý tưởng sáng tạo
      </h2>

      <div className={`lb6-layout${activeItem ? ' has-active' : ''}`}>
        <div className="lb6-column lb6-column--left" role="group" aria-label="Nhóm trụ cột bên trái">
          {leftItems.map(renderPillar)}
        </div>

        <div className="lb6-center" aria-hidden="true">
          <div className="lb6-bulb-stage">
            <div className="lb6-bulb-aura" />
            <div className="lb6-bulb-head" />
            <div className="lb6-bulb-base" />
            <div className="lb6-bolt" />
          </div>
        </div>

        <div className="lb6-column lb6-column--right" role="group" aria-label="Nhóm trụ cột bên phải">
          {rightItems.map(renderPillar)}
        </div>
      </div>
    </section>
  );
}
