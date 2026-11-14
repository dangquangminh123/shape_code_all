'use client';

import React, { useId, useState } from 'react';
import geometryData from './gb5-gift-boxes.geometry.json';
import {
  GB5_STEPS,
  GB5_THEME,
  type Gb5StepId,
  type Gb5StepConfig,
} from './gb5-gift-boxes.config';
import { Gb5StepIcon } from './Gb5StepIcon';
import './gb5-gift-boxes.css';

export interface Gb5GiftBoxesProps {
  initialActiveId?: Gb5StepId | null;
  className?: string;
}

const CAST_SHADOW_PATH =
  'M 56 30 L -24 110 C -34 195 -34 330 -24 418 C 35 456 168 458 242 448 L 316 386 L 316 126 L 56 30 Z';

export function Gb5GiftBoxes({
  initialActiveId = null,
  className = '',
}: Gb5GiftBoxesProps) {
  const instanceId = useId();
  const [activeId, setActiveId] = useState<Gb5StepId | null>(initialActiveId);
  const [hoveredId, setHoveredId] = useState<Gb5StepId | null>(null);
  const [focusedId, setFocusedId] = useState<Gb5StepId | null>(null);
  const previewId = hoveredId ?? focusedId ?? activeId;

  function handleSelect(id: Gb5StepId) {
    setActiveId(previous => previous === id ? null : id);
  }

  function handleKeyDown(e: React.KeyboardEvent, index: number) {
    const next = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? (index + 1) % GB5_STEPS.length
      : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? (index + GB5_STEPS.length - 1) % GB5_STEPS.length
      : e.key === 'Home' ? 0
      : e.key === 'End' ? GB5_STEPS.length - 1 : null;
    if (next !== null) {
      e.preventDefault();
      setHoveredId(null);
      const selector = e.currentTarget.hasAttribute('data-gb5-hit') ? '[data-gb5-hit]' : '[data-gb5-mini-node]';
      const targets = e.currentTarget.closest('.gb5-root')?.querySelectorAll<HTMLElement | SVGElement>(selector);
      targets?.[next]?.focus();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setActiveId(null);
      setHoveredId(null);
      // Keep keyboard focus visible; Escape only clears the persistent selection.
    } else if ((e.key === 'Enter' || e.key === ' ') && e.currentTarget.hasAttribute('data-gb5-hit')) {
      e.preventDefault();
      if (!e.repeat) handleSelect(GB5_STEPS[index].id);
    }
  }

  return (
    <section className={`gb5-root ${className}`.trim()} aria-labelledby={`${instanceId}-heading`}
      style={{
        '--gb5-ink-dark': GB5_THEME.titleColor,
        '--gb5-ink-body': GB5_THEME.bodyColor,
        '--gb5-track-main': GB5_THEME.timelineColor,
        '--gb5-track-dark': GB5_THEME.timelineShadow,
      } as React.CSSProperties}
      data-testid="gb5-gift-boxes-root" data-active-step={previewId ?? ''} data-selected-step={activeId ?? ''}>
      <h2 className="gb5-visually-hidden" id={`${instanceId}-heading`}>Năm nhóm quà tặng cho những dịp ý nghĩa</h2>
      <div className="gb5-stage" data-gb5-stage>
        <div className="gb5-boxes-layer">
          {GB5_STEPS.map((step, idx) => (
            <GiftBoxCard
              key={step.id} step={step} index={idx}
              isSelected={activeId === step.id} isActive={previewId === step.id}
              isDimmed={hoveredId !== null && hoveredId !== step.id}
              onSelect={handleSelect} onHover={setHoveredId} onFocus={setFocusedId} onKeyDown={handleKeyDown}
            />
          ))}
        </div>
        <div className="gb5-timeline-zone" data-gb5-timeline>
          <svg viewBox="0 0 1320 40" preserveAspectRatio="none" className="gb5-timeline-track-svg" aria-hidden="true">
            <rect x="16" y="17" width="1288" height="9" rx="4.5" fill="rgba(0,0,0,0.14)" />
            <rect x="14" y="13" width="1292" height="7" rx="3.5" fill="var(--gb5-track-main)" />
            <rect x="14" y="17" width="1292" height="3" rx="1.5" fill="var(--gb5-track-dark)" />
            <rect x="14" y="13" width="1292" height="1" fill="#fff" opacity="0.7" />
            <circle cx="16" cy="18.5" r="9.5" fill="rgba(0,0,0,0.14)" />
            <circle cx="16" cy="16.5" r="9" fill="var(--gb5-track-main)" />
            <circle cx="1304" cy="18.5" r="9.5" fill="rgba(0,0,0,0.14)" />
            <circle cx="1304" cy="16.5" r="9" fill="var(--gb5-track-main)" />
          </svg>
          <div className="gb5-mini-nodes-row">
            {GB5_STEPS.map((step) => {
              const isSelected = activeId === step.id;
              const relLeftPct = ((step.miniSlot.leftPct - 1.2) / 97.6) * 100;
              return (
                <button
                  key={step.id} type="button"
                  className={`gb5-mini-node ${previewId === step.id ? 'is-active' : ''}`}
                  data-gb5-mini-node={step.id}
                  aria-label={`Chọn hộp quà ${step.number}: ${step.title} (${step.categoryTag})`}
                  aria-pressed={isSelected}
                  style={{ left: `${relLeftPct.toFixed(3)}%`, '--gb5-accent': step.palette.bowMain } as React.CSSProperties}
                  onClick={() => handleSelect(step.id)}
                  onPointerEnter={e => { if (e.pointerType !== 'touch') setHoveredId(step.id); }}
                  onPointerLeave={() => setHoveredId(null)}
                  onFocus={() => setFocusedId(step.id)} onBlur={() => setFocusedId(null)}
                  onKeyDown={e => handleKeyDown(e, step.index)}
                >
                  <div className="gb5-mini-box-wrap"><MiniGiftBoxSvg step={step} /></div>
                  <div className="gb5-mini-caption">
                    <div className="gb5-mini-title-wrap">
                      <span className="gb5-mini-title" data-gb5-mini-title>{step.title}</span>
                    </div>
                    <div className="gb5-mini-detail-row">
                      <div className="gb5-mini-icon-box"><Gb5StepIcon kind={step.iconKind} accentColor={step.palette.bowMain} /></div>
                      <p className="gb5-mini-desc">{step.miniSummary}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <p className="gb5-visually-hidden" role="status">
        {activeId ? `Đã chọn hộp quà ${GB5_STEPS.find(step => step.id === activeId)?.number}: ${GB5_STEPS.find(step => step.id === activeId)?.title}` : 'Chưa chọn hộp quà.'}
      </p>
    </section>
  );
}

interface GiftBoxCardProps {
  step: Gb5StepConfig;
  index: number;
  isSelected: boolean;
  isActive: boolean;
  isDimmed: boolean;
  onSelect: (id: Gb5StepId) => void;
  onHover: (id: Gb5StepId | null) => void;
  onFocus: (id: Gb5StepId | null) => void;
  onKeyDown: (e: React.KeyboardEvent, index: number) => void;
}

function GiftBoxCard({
  step,
  index,
  isSelected,
  isActive,
  isDimmed,
  onSelect,
  onHover,
  onFocus,
  onKeyDown,
}: GiftBoxCardProps) {
  const { palette, boxSlot } = step;
  const uid = `gb5-${useId().replace(/:/g, '')}-${step.id}`;

  return (
    <div
      className={`gb5-card ${isActive ? 'is-active' : ''} ${isDimmed ? 'is-dimmed' : ''}`}
      data-gb5-card={step.id}
      style={
        {
          left: `${boxSlot.leftPct}%`,
          top: `${boxSlot.topPct}%`,
          width: `${boxSlot.widthPct}%`,
          height: `${boxSlot.heightPct}%`,
          '--gb5-accent': palette.bowMain,
          '--gb5-glow': palette.glowRgba,
        } as React.CSSProperties
      }
    >
      <div className="gb5-card-canvas">
        <div className="gb5-mask-layer gb5-box-mask-layer" data-gb5-mask="box-silhouette" />
        <div className="gb5-mask-layer gb5-lid-mask-layer" data-gb5-mask="box-lid" />
        <div className="gb5-mask-layer gb5-body-mask-layer" data-gb5-mask="box-body" />
        <div className="gb5-mask-layer gb5-bow-mask-layer" data-gb5-mask="bow-ribbon" />
        <div className="gb5-mask-layer gb5-bow-folds-mask-layer" data-gb5-mask="bow-folds" />
        <div className="gb5-mask-layer gb5-bow-knot-mask-layer" data-gb5-mask="bow-knot" />

        <svg viewBox={geometryData.viewBox} className="gb5-card-svg">
          <defs>
            <linearGradient id={`${uid}-cast`} x1="210" y1="210" x2="-15" y2="435" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#4f524f" stopOpacity="0.34" />
              <stop offset="52%" stopColor="#727572" stopOpacity="0.15" />
              <stop offset="92%" stopColor="#9b9d99" stopOpacity="0.02" />
              <stop offset="100%" stopColor="#9b9d99" stopOpacity="0" />
            </linearGradient>
            <linearGradient id={`${uid}-body`} x1="40" y1="260" x2="320" y2="260" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
            <linearGradient id={`${uid}-lid`} x1="28" y1="150" x2="332" y2="150" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
            <linearGradient id={`${uid}-bow`} x1="40" y1="100" x2="320" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={palette.bowHighlight} />
              <stop offset="36%" stopColor={palette.bowMain} />
              <stop offset="48%" stopColor={palette.bowShadow} />
              <stop offset="60%" stopColor={palette.bowMain} />
              <stop offset="100%" stopColor={palette.bowHighlight} />
            </linearGradient>
            <linearGradient id={`${uid}-knot`} x1="180" y1="55" x2="180" y2="116" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={palette.bowShadow} />
              <stop offset="100%" stopColor={palette.bowHighlight} />
            </linearGradient>
            <clipPath id={`${uid}-box-clip`}>
              <path d={geometryData.boxSilhouettePath} />
            </clipPath>
            <clipPath id={`${uid}-body-clip`}>
              <path d={geometryData.boxBodyPath} />
            </clipPath>
            <clipPath id={`${uid}-bow-clip`}>
              <path d={geometryData.bowRibbonPath} />
            </clipPath>
          </defs>

          <path className="gb5-card-cast-shadow" d={CAST_SHADOW_PATH} fill={`url(#${uid}-cast)`} />
          <path className="gb5-paper-surface" d={geometryData.boxBodyPath} fill={`url(#${uid}-body)`} stroke="#fff" strokeWidth="1.5" />

          <g clipPath={`url(#${uid}-body-clip)`}>
            <rect x="35" y="186" width="290" height="16" fill="rgba(70, 72, 82, 0.24)" />
            <rect x="35" y="198" width="290" height="8" fill="rgba(120, 123, 135, 0.10)" />
          </g>

          <path className="gb5-paper-surface" d={geometryData.boxLidPath} fill={`url(#${uid}-lid)`} stroke="#fff" strokeWidth="1.5" />

          <g clipPath={`url(#${uid}-box-clip)`}>
            <path d={geometryData.bowRibbonPath} transform="translate(0, 3)" fill="rgba(60, 64, 60, 0.18)" />
          </g>

          <path d={geometryData.bowRibbonPath} fill={`url(#${uid}-bow)`} />

          <g clipPath={`url(#${uid}-bow-clip)`}>
            <path d={geometryData.bowLeftInnerFoldPath} fill={palette.bowFold} />
            <path d={geometryData.bowRightInnerFoldPath} fill={palette.bowFold} />
            <ellipse cx="180" cy="115" rx="44" ry="8" fill={palette.bowFold} opacity="0.52" />
            <rect x="153.5" y="54" width="6.5" height="62" rx="3" fill={palette.bowFold} opacity="0.62" />
            <rect x="200" y="54" width="6.5" height="62" rx="3" fill={palette.bowFold} opacity="0.62" />
            <path d={geometryData.bowKnotPath} fill={`url(#${uid}-knot)`} />
          </g>

          <path
            d={`${geometryData.boxSilhouettePath} ${geometryData.bowRibbonPath}`}
            fill="rgba(255, 255, 255, 0.001)"
            className="gb5-hit-target"
            data-gb5-hit={step.id}
            role="button"
            tabIndex={0}
            aria-label={`Hộp quà ${step.number}: ${step.title} (${step.categoryTag})`}
            aria-pressed={isSelected}
            aria-describedby={`${uid}-description`}
            onClick={() => onSelect(step.id)}
            onPointerEnter={e => { if (e.pointerType !== 'touch') onHover(step.id); }}
            onPointerLeave={() => onHover(null)}
            onFocus={() => onFocus(step.id)}
            onBlur={() => onFocus(null)}
            onKeyDown={(e) => onKeyDown(e, index)}
          />
        </svg>
      </div>

      <div className="gb5-card-content">
        <div
          className="gb5-lid-number"
          data-gb5-number={step.id}
          style={{ color: palette.numberColor }}
        >
          {step.number}
        </div>
        <div className="gb5-body-icon-wrap" data-gb5-icon={step.id}>
          <Gb5StepIcon kind={step.iconKind} accentColor={palette.bowMain} />
        </div>
        <div className="gb5-body-copy">
          <h3 className="gb5-step-title" data-gb5-title={step.id}>
            {step.title}
          </h3>
          <p className="gb5-step-desc" id={`${uid}-description`} data-gb5-desc={step.id}>
            {step.description}
          </p>
        </div>
      </div>
    </div>
  );
}

function MiniGiftBoxSvg({ step }: { step: Gb5StepConfig }) {
  const { palette } = step;
  return (
    <svg viewBox="0 0 360 420" className="gb5-mini-box-svg" aria-hidden="true">
      <path d={CAST_SHADOW_PATH} fill="rgba(150, 153, 165, 0.28)" />
      <path d={geometryData.boxBodyPath} fill="#ffffff" />
      <rect x="42" y="188" width="276" height="14" fill="rgba(80, 82, 92, 0.22)" />
      <path d={geometryData.boxLidPath} fill="#ffffff" />
      <path d={geometryData.bowRibbonPath} fill={palette.bowMain} />
      <path d={geometryData.bowLeftInnerFoldPath} fill={palette.bowFold} />
      <path d={geometryData.bowRightInnerFoldPath} fill={palette.bowFold} />
      <path d={geometryData.bowKnotPath} fill={palette.bowHighlight} />
    </svg>
  );
}
