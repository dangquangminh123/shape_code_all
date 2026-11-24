'use client';

import { useId, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import {
  EC4_ASSET_BASE,
  EC4_MASK_FILES,
  EC4_STEPS,
  type Ec4Masks,
  type Ec4StepItem,
} from './ec4-ecology-plant.config';
import './ec4-ecology-plant.css';

type Ec4Style = CSSProperties & { [key: `--ec4-${string}`]: string };

function stepStyle(step: Ec4StepItem): Ec4Style {
  return {
    '--ec4-start': step.colors.start,
    '--ec4-end': step.colors.end,
    '--ec4-pocket': step.colors.pocket,
    '--ec4-ring': step.colors.ring,
    '--ec4-leaf-light': step.colors.leafLight,
    '--ec4-leaf-dark': step.colors.leafDark,
  };
}

export interface Ec4EcologyPlantProps {
  masks?: Ec4Masks;
  className?: string;
}

export default function Ec4EcologyPlant({ masks = {}, className = '' }: Ec4EcologyPlantProps) {
  const instanceId = useId();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const mobileRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeIndex = hoveredIndex ?? focusedIndex ?? selectedIndex;

  const moduleStyle: Ec4Style = {
    '--ec4-mask-card': `url("${masks.card ?? `${EC4_ASSET_BASE}/${EC4_MASK_FILES.card}`}")`,
    '--ec4-mask-badge': `url("${masks.badge ?? `${EC4_ASSET_BASE}/${EC4_MASK_FILES.badge}`}")`,
    '--ec4-mask-leaf': `url("${masks.leafCluster ?? `${EC4_ASSET_BASE}/${EC4_MASK_FILES.leafCluster}`}")`,
    '--ec4-mask-bowl-body': `url("${masks.bowlBody ?? `${EC4_ASSET_BASE}/${EC4_MASK_FILES.bowlBody}`}")`,
    '--ec4-mask-bowl-rim': `url("${masks.bowlRim ?? `${EC4_ASSET_BASE}/${EC4_MASK_FILES.bowlRim}`}")`,
    '--ec4-mask-stem': `url("${masks.stem ?? `${EC4_ASSET_BASE}/${EC4_MASK_FILES.stem}`}")`,
  };

  function toggleSelect(index: number) {
    setSelectedIndex((prev) => (prev === index ? null : index));
  }

  function handleKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
    target: 'desktop' | 'mobile',
  ) {
    const last = EC4_STEPS.length - 1;
    const next =
      event.key === 'ArrowDown' || event.key === 'ArrowRight'
        ? (index + 1) % EC4_STEPS.length
        : event.key === 'ArrowUp' || event.key === 'ArrowLeft'
          ? (index + last) % EC4_STEPS.length
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? last
              : null;

    if (next !== null) {
      event.preventDefault();
      (target === 'desktop' ? cardRefs.current[next] : mobileRefs.current[next])?.focus();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setSelectedIndex(null);
      setHoveredIndex(null);
      event.currentTarget.blur();
    }
  }

  return (
    <section
      className={`ec4-module ${className}`.trim()}
      aria-labelledby={`${instanceId}-heading`}
      data-ec4-root="true"
      style={moduleStyle}
    >
      <h2 id={`${instanceId}-heading`} className="ec4-visually-hidden">
        Mô hình hệ sinh thái tăng trưởng 4 bước
      </h2>

      {/* Desktop / Tablet Botanical Stage */}
      <div className="ec4-stage" role="group" aria-label="Bốn bước phát triển bền vững quanh chồi cây trung tâm">
        {/* Subtle decorative world-map vector silhouette */}
        <svg className="ec4-worldmap" viewBox="0 0 1000 500" aria-hidden="true" focusable="false">
          <g fill="#a7f3d0" opacity="0.42">
            {/* North America */}
            <path d="M95,78 Q145,52 215,64 L268,95 Q285,132 245,165 L205,198 Q182,226 168,242 L152,216 Q128,176 105,148 Z" />
            {/* South America */}
            <path d="M212,258 Q255,248 286,288 L302,348 Q284,412 248,452 L228,432 Q216,368 205,312 Z" />
            {/* Europe */}
            <path d="M446,68 Q505,54 558,72 L572,115 Q535,142 478,136 L444,110 Z" />
            {/* Africa */}
            <path d="M448,162 Q522,148 574,195 L588,268 Q565,352 518,386 L486,356 Q462,286 436,218 Z" />
            {/* Asia */}
            <path d="M582,66 Q712,48 848,88 L882,158 Q842,218 765,242 L678,225 Q615,198 584,142 Z" />
            {/* Southeast Asia / Islands */}
            <path d="M775,264 Q818,258 846,284 L832,306 Q792,296 768,282 Z" />
            {/* Australia */}
            <path d="M782,334 Q848,324 888,362 L878,412 Q824,424 776,396 Z" />
          </g>
        </svg>

        {/* Central Half-Globe Earth Bowl (shape 4.svg) */}
        <div className="ec4-bowl" aria-hidden="true">
          <div className="ec4-bowl__body">
            {/* Subtle white continents inside the hemisphere bowl */}
            <svg className="ec4-bowl__continents" viewBox="0 0 360 170" aria-hidden="true">
              <path
                d="M12,35 Q45,52 38,98 L18,125 Q4,82 12,35 Z M115,38 Q168,36 188,68 L172,126 Q142,154 126,144 L132,96 Q104,68 115,38 Z M285,36 Q336,42 350,86 L325,134 Q295,112 285,36 Z"
                fill="#ffffff"
                opacity="0.92"
              />
            </svg>
          </div>
          <div className="ec4-bowl__rim" />
        </div>

        {/* Central Plant Stem with Two Bud Nodes (shape 5.svg) */}
        <div className="ec4-stem" aria-hidden="true" />

        {/* 4 Leaf Clusters Sprouting Around the Stem (shape 3.svg) */}
        {EC4_STEPS.map((step, index) => {
          const isActive = activeIndex === index;
          return (
            <div
              key={`leaf-${step.id}`}
              className={`ec4-leaf ec4-leaf--${step.number} ec4-leaf--${step.side}${isActive ? ' is-active' : ''}`}
              style={stepStyle(step)}
              aria-hidden="true"
            >
              <span className="ec4-leaf__paint" />
            </div>
          );
        })}

        {/* 4 Interactive Step Cards + STEP Badges (shape 1.svg + shape 2.svg) */}
        <div className="ec4-cards">
          {EC4_STEPS.map((step, index) => {
            const Icon = step.icon;
            const isActive = activeIndex === index;
            const isSelected = selectedIndex === index;
            return (
              <button
                key={step.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                type="button"
                className={`ec4-card ec4-card--${step.number} ec4-card--${step.side}${isActive ? ' is-active' : ''}${isSelected ? ' is-selected' : ''}`}
                style={stepStyle(step)}
                aria-pressed={isSelected}
                aria-label={`Bước ${step.number}. ${step.title}: ${step.description}`}
                onClick={() => toggleSelect(index)}
                onPointerEnter={(e) => {
                  if (e.pointerType !== 'touch') setHoveredIndex(index);
                }}
                onPointerLeave={() => setHoveredIndex(null)}
                onFocus={() => setFocusedIndex(index)}
                onBlur={() => setFocusedIndex(null)}
                onKeyDown={(e) => handleKeyDown(e, index, 'desktop')}
              >
                <span className="ec4-card__shell" aria-hidden="true">
                  <span className="ec4-card__fill" />
                  <span className="ec4-card__pocket" />
                </span>

                <span className="ec4-card__icon" aria-hidden="true">
                  <Icon aria-hidden="true" focusable="false" />
                </span>

                <span className="ec4-card__copy" aria-hidden="true">
                  <strong className="ec4-card__title">{step.title}</strong>
                  <span className="ec4-card__desc">{step.description}</span>
                </span>

                <span className="ec4-badge" aria-hidden="true">
                  <span className="ec4-badge__ring" />
                  <span className="ec4-badge__disc" />
                  <span className="ec4-badge__label">
                    <small>STEP</small>
                    <strong>{step.number}</strong>
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Accessible Fallback (<= 680px) */}
      <div className="ec4-mobile-list" role="list" aria-label="Bốn bước phát triển bền vững (di động)">
        {EC4_STEPS.map((step, index) => {
          const Icon = step.icon;
          const isActive = activeIndex === index;
          const isSelected = selectedIndex === index;
          return (
            <button
              key={`m-${step.id}`}
              ref={(el) => {
                mobileRefs.current[index] = el;
              }}
              type="button"
              className={`ec4-mobile-card${isActive ? ' is-active' : ''}${isSelected ? ' is-selected' : ''}`}
              role="listitem"
              style={stepStyle(step)}
              aria-pressed={isSelected}
              aria-label={`Bước ${step.number}. ${step.title}: ${step.description}`}
              onClick={() => toggleSelect(index)}
              onFocus={() => setFocusedIndex(index)}
              onBlur={() => setFocusedIndex(null)}
              onKeyDown={(e) => handleKeyDown(e, index, 'mobile')}
            >
              <span className="ec4-mobile-card__step" aria-hidden="true">
                <small>STEP</small>
                <strong>{step.number}</strong>
              </span>
              <span className="ec4-mobile-card__body" aria-hidden="true">
                <strong className="ec4-mobile-card__title">{step.title}</strong>
                <span className="ec4-mobile-card__desc">{step.description}</span>
              </span>
              <span className="ec4-mobile-card__icon" aria-hidden="true">
                <Icon aria-hidden="true" focusable="false" />
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
