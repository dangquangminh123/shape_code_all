'use client';

import { useId, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import {
  CO3_ASSET_BASE,
  CO3_MASK_FILES,
  CO3_OPTIONS,
  type Co3Masks,
  type Co3OptionItem,
} from './co3-cube-options.config';
import './co3-cube-options.css';

type Co3Style = CSSProperties & { [key: `--co3-${string}`]: string };

function rowStyle(item: Co3OptionItem): Co3Style {
  return {
    '--co3-width': `${item.widthPercent}%`,
    '--co3-cube-top': item.colors.cubeTop,
    '--co3-cube-left': item.colors.cubeLeft,
    '--co3-cube-front-light': item.colors.cubeFrontLight,
    '--co3-cube-front-dark': item.colors.cubeFrontDark,
    '--co3-banner-start': item.colors.bannerStart,
    '--co3-banner-end': item.colors.bannerEnd,
    '--co3-glow': item.colors.glow,
  };
}

export interface Co3CubeOptionsProps {
  masks?: Co3Masks;
  className?: string;
}

export default function Co3CubeOptions({ masks = {}, className = '' }: Co3CubeOptionsProps) {
  const instanceId = useId();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const rowRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeIndex = hoveredIndex ?? focusedIndex ?? selectedIndex;

  const moduleStyle: Co3Style = {
    '--co3-mask-banner': `url("${masks.banner ?? `${CO3_ASSET_BASE}/${CO3_MASK_FILES.banner}`}")`,
    '--co3-mask-cube-left': `url("${masks.cubeLeft ?? `${CO3_ASSET_BASE}/${CO3_MASK_FILES.cubeLeft}`}")`,
    '--co3-mask-cube-front': `url("${masks.cubeFront ?? `${CO3_ASSET_BASE}/${CO3_MASK_FILES.cubeFront}`}")`,
    '--co3-mask-cube-top': `url("${masks.cubeTop ?? `${CO3_ASSET_BASE}/${CO3_MASK_FILES.cubeTop}`}")`,
  };

  function toggleSelect(index: number) {
    setSelectedIndex((prev) => (prev === index ? null : index));
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = CO3_OPTIONS.length - 1;
    const next =
      event.key === 'ArrowDown' || event.key === 'ArrowRight'
        ? (index + 1) % CO3_OPTIONS.length
        : event.key === 'ArrowUp' || event.key === 'ArrowLeft'
          ? (index + last) % CO3_OPTIONS.length
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? last
              : null;

    if (next !== null) {
      event.preventDefault();
      rowRefs.current[next]?.focus();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setSelectedIndex(null);
      setHoveredIndex(null);
      event.currentTarget.blur();
    }
  }

  return (
    <section
      className={`co3-module ${className}`.trim()}
      aria-labelledby={`${instanceId}-heading`}
      data-co3-root="true"
      style={moduleStyle}
    >
      <h2 id={`${instanceId}-heading`} className="co3-visually-hidden">
        3 bước khối lập phương và mũi tên ngang phân tầng
      </h2>

      <div className="co3-stack" role="group" aria-label="Danh sách 3 bước khối hộp mũi tên">
        {CO3_OPTIONS.map((item) => {
          const Icon = item.icon;
          const isActive = activeIndex === item.index;
          const isSelected = selectedIndex === item.index;
          return (
            <button
              key={item.id}
              ref={(el) => {
                rowRefs.current[item.index] = el;
              }}
              type="button"
              className={`co3-row co3-row--${item.index + 1}${isActive ? ' is-active' : ''}${isSelected ? ' is-selected' : ''}`}
              style={rowStyle(item)}
              aria-pressed={isSelected}
              aria-label={`Bước ${item.step}. ${item.title}: ${item.description}`}
              onClick={() => toggleSelect(item.index)}
              onPointerEnter={(e) => {
                if (e.pointerType !== 'touch') setHoveredIndex(item.index);
              }}
              onPointerLeave={() => setHoveredIndex(null)}
              onFocus={() => setFocusedIndex(item.index)}
              onBlur={() => setFocusedIndex((prev) => (prev === item.index ? null : prev))}
              onKeyDown={(e) => handleKeyDown(e, item.index)}
            >
              {/* Left 3D Cube Badge */}
              <span className="co3-cube" aria-hidden="true">
                <span className="co3-cube__left" />
                <span className="co3-cube__top" />
                <span className="co3-cube__front" />
                <span className="co3-cube__step">
                  <small>step</small>
                  <strong>{item.step}</strong>
                </span>
              </span>

              {/* Right Horizontal Arrow Banner */}
              <span className="co3-banner">
                <span className="co3-banner__paint" aria-hidden="true" />
                <span className="co3-banner__copy">
                  <span className="co3-banner__title">{item.title}</span>
                  <span className="co3-banner__desc">{item.description}</span>
                </span>
                <span className="co3-banner__icon" aria-hidden="true">
                  <Icon />
                </span>
              </span>
            </button>
          );
        })}

        <div className="co3-stack-sheen" aria-hidden="true" />
      </div>
    </section>
  );
}
