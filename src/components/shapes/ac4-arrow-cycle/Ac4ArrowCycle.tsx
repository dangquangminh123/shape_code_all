'use client';

import { useId, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import {
  AC4_ASSET_BASE,
  AC4_MASK_FILES,
  AC4_STEPS,
  type Ac4CycleStep,
  type Ac4Masks,
} from './ac4-arrow-cycle.config';
import './ac4-arrow-cycle.css';

type Ac4Style = CSSProperties & { [key: `--ac4-${string}`]: string };

function stepStyle(step: Ac4CycleStep): Ac4Style {
  return {
    '--ac4-face-light': step.colors.faceLight,
    '--ac4-face-dark': step.colors.faceDark,
    '--ac4-rim': step.colors.rim,
    '--ac4-flap': step.colors.flap,
    '--ac4-glow': step.colors.glow,
  };
}

export interface Ac4ArrowCycleProps {
  masks?: Ac4Masks;
  className?: string;
}

export default function Ac4ArrowCycle({ masks = {}, className = '' }: Ac4ArrowCycleProps) {
  const instanceId = useId();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const arrowRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const captionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeIndex = hoveredIndex ?? focusedIndex ?? selectedIndex;

  const moduleStyle: Ac4Style = {
    '--ac4-mask-face': `url("${masks.face ?? `${AC4_ASSET_BASE}/${AC4_MASK_FILES.face}`}")`,
    '--ac4-mask-rim': `url("${masks.rim ?? `${AC4_ASSET_BASE}/${AC4_MASK_FILES.rim}`}")`,
    '--ac4-mask-flap': `url("${masks.flap ?? `${AC4_ASSET_BASE}/${AC4_MASK_FILES.flap}`}")`,
  };

  function toggleSelect(index: number) {
    setSelectedIndex((prev) => (prev === index ? null : index));
  }

  function handleKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
    target: 'arrow' | 'caption',
  ) {
    const last = AC4_STEPS.length - 1;
    const next =
      event.key === 'ArrowDown' || event.key === 'ArrowRight'
        ? (index + 1) % AC4_STEPS.length
        : event.key === 'ArrowUp' || event.key === 'ArrowLeft'
          ? (index + last) % AC4_STEPS.length
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? last
              : null;

    if (next !== null) {
      event.preventDefault();
      (target === 'arrow' ? arrowRefs.current[next] : captionRefs.current[next])?.focus();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setSelectedIndex(null);
      setHoveredIndex(null);
      event.currentTarget.blur();
    }
  }

  return (
    <section
      className={`ac4-module ${className}`.trim()}
      aria-labelledby={`${instanceId}-heading`}
      data-ac4-root="true"
      style={moduleStyle}
    >
      <h2 id={`${instanceId}-heading`} className="ac4-visually-hidden">
        Chu trình 4 mũi tên gấp nếp 3D A, B, C, D
      </h2>

      <div className="ac4-layout">
        {/* Center Cyclic 4-Arrow Folded Ring (122.84 x 122.84 exact geometry) */}
        <div className="ac4-ring" role="group" aria-label="Vòng lặp 4 mũi tên A, B, C, D">
          {/* Layer 1: Dark Folded Corner Tabs (z-index 1 behind all arrow faces) */}
          <div className="ac4-flaps" aria-hidden="true">
            {AC4_STEPS.map((step) => {
              const isActive = activeIndex === step.index;
              return (
                <div
                  key={`${step.id}-flap`}
                  className={`ac4-flap ac4-flap--${step.letter.toLowerCase()}${isActive ? ' is-active' : ''}`}
                  style={stepStyle(step)}
                >
                  <span className="ac4-flap__paint" />
                </div>
              );
            })}
          </div>

          {/* Layer 2: 4 Arrow Faces, Bevel Rims & A-D Labels */}
          <div className="ac4-arrows">
            {AC4_STEPS.map((step) => {
              const isActive = activeIndex === step.index;
              const isSelected = selectedIndex === step.index;
              return (
                <button
                  key={step.id}
                  ref={(el) => {
                    arrowRefs.current[step.index] = el;
                  }}
                  type="button"
                  className={`ac4-arrow ac4-arrow--${step.letter.toLowerCase()}${isActive ? ' is-active' : ''}${isSelected ? ' is-selected' : ''}`}
                  style={stepStyle(step)}
                  aria-pressed={isSelected}
                  aria-label={`Bước ${step.letter}. ${step.title}: ${step.description}`}
                  onClick={() => toggleSelect(step.index)}
                  onPointerEnter={(e) => {
                    if (e.pointerType !== 'touch') setHoveredIndex(step.index);
                  }}
                  onPointerLeave={() => setHoveredIndex(null)}
                  onFocus={() => setFocusedIndex(step.index)}
                  onBlur={() => setFocusedIndex((prev) => (prev === step.index ? null : prev))}
                  onKeyDown={(e) => handleKeyDown(e, step.index, 'arrow')}
                >
                  <span className="ac4-arrow__tile">
                    <span className="ac4-arrow__rim" aria-hidden="true" />
                    <span className="ac4-arrow__face" aria-hidden="true" />
                  </span>
                  <span className="ac4-arrow__letter" aria-hidden="true">
                    {step.letter}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="ac4-ring-sheen" aria-hidden="true" />
        </div>

        {/* 4 Corner Captions (Top-Left A, Top-Right B, Bottom-Right C, Bottom-Left D) */}
        <div className="ac4-captions" role="group" aria-label="Chú giải 4 giai đoạn">
          {AC4_STEPS.map((step) => {
            const Icon = step.icon;
            const isActive = activeIndex === step.index;
            const isSelected = selectedIndex === step.index;
            return (
              <button
                key={`${step.id}-caption`}
                ref={(el) => {
                  captionRefs.current[step.index] = el;
                }}
                type="button"
                className={`ac4-caption ac4-caption--${step.corner}${isActive ? ' is-active' : ''}${isSelected ? ' is-selected' : ''}`}
                style={stepStyle(step)}
                aria-pressed={isSelected}
                onClick={() => toggleSelect(step.index)}
                onPointerEnter={(e) => {
                  if (e.pointerType !== 'touch') setHoveredIndex(step.index);
                }}
                onPointerLeave={() => setHoveredIndex(null)}
                onFocus={() => setFocusedIndex(step.index)}
                onBlur={() => setFocusedIndex((prev) => (prev === step.index ? null : prev))}
                onKeyDown={(e) => handleKeyDown(e, step.index, 'caption')}
              >
                <span className="ac4-caption__header">
                  <span className="ac4-caption__icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <span className="ac4-caption__title">{step.title}</span>
                </span>
                <span className="ac4-caption__desc">{step.description}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
