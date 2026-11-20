'use client';

import React, { useId, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { OB3_OPTIONS } from './ob3-option-banners.config';
import {
  OB3_FOLD_POLYGON_POINTS,
  OB3_LOOP_FRONT_PATH,
  OB3_MIDDLE_BAND_PATH,
  OB3_RIGHT_RECT,
  OB3_RIGHT_TRANSFORM,
  OB3_VIEWBOX,
} from './ob3-option-banners.geometry';
import './ob3-option-banners.css';

export interface Ob3OptionBannersProps {
  headerTitle?: string;
  headerSubtitle?: string;
  className?: string;
}

// Deterministic word wrapping for native SVG text: no SVG foreignObject clipping on Safari.
function wrapWords(value: string, limit: number): string[] {
  const words = value.trim().split(/\s+/).filter(Boolean);
  const output: string[] = [];
  let current = '';
  for (const word of words) {
    if (current && `${current} ${word}`.length > limit) {
      output.push(current);
      current = word;
    } else {
      current = current ? `${current} ${word}` : word;
    }
  }
  if (current) output.push(current);
  return output;
}

export default function Ob3OptionBanners({
  headerTitle = '3 Lựa Chọn Chiến Lược (Option Banners)',
  headerSubtitle = 'Ba phương án giải pháp công nghệ bứt phá cho dự án phần mềm hiện đại',
  className = '',
}: Ob3OptionBannersProps) {
  const instanceId = useId();
  const [hovered, setHovered] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const rowRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = hovered ?? focused ?? selected;

  function toggle(id: string) { setSelected((previous) => previous === id ? null : id); }
  function keyNav(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key === 'Escape') { event.preventDefault(); setSelected(null); setHovered(null); return; }
    const next = event.key === 'ArrowRight' || event.key === 'ArrowDown'
      ? (index + 1) % OB3_OPTIONS.length
      : event.key === 'ArrowLeft' || event.key === 'ArrowUp'
        ? (index - 1 + OB3_OPTIONS.length) % OB3_OPTIONS.length
        : event.key === 'Home' ? 0 : event.key === 'End' ? OB3_OPTIONS.length - 1 : null;
    if (next !== null) { event.preventDefault(); rowRefs.current[next]?.focus(); }
  }

  return (
    <section className={`ob3-module ${className}`.trim()} aria-labelledby={`${instanceId}-heading`} data-ob3-root>
      <div className="ob3-inner">
        <header className="ob3-header">
          <h2 id={`${instanceId}-heading`} className="ob3-header__title">{headerTitle}</h2>
          <p className="ob3-header__subtitle">{headerSubtitle}</p>
        </header>
        <div className="ob3-stack" role="list" aria-label="3 phương án trong các dải băng">
          {OB3_OPTIONS.map((option, index) => {
            const Icon = option.icon;
            const titleLines = wrapWords(option.title, 22);
            const descriptionLines = wrapWords(option.description, 43);
            // Long copy is kept in the source but never painted outside the right face.
            const textSize = Math.max(6.1, Math.min(7.8, 39 / (descriptionLines.length * 1.18)));
            const lineHeight = textSize * 1.2;
            const textStartY = 30 + Math.max(0, (43 - descriptionLines.length * lineHeight) / 2) + textSize;
            return (
              <div key={option.id} role="listitem" className="ob3-row-wrapper">
                <button
                  type="button" ref={(node) => { rowRefs.current[index] = node; }}
                  className={`ob3-row${active === option.id ? ' is-active' : ''}`}
                  style={{ '--ob3-primary': option.primaryColor } as CSSProperties}
                  aria-pressed={selected === option.id}
                  aria-label={`${option.label}: ${option.title}. ${option.description}`}
                  onClick={() => toggle(option.id)}
                  onMouseEnter={() => setHovered(option.id)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setFocused(option.id)}
                  onBlur={() => setFocused(null)}
                  onKeyDown={(event) => keyNav(event, index)}
                >
                  <div className="ob3-desktop-view">
                    <svg viewBox={OB3_VIEWBOX} className="ob3-svg" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
                      {/* A. Original path #2 in 2.svg (back/middle ribbon) and its own copy. */}
                      <g className="ob3-layer--middle">
                        <path className="ob3-mid__fill" d={OB3_MIDDLE_BAND_PATH} fill={option.primaryColor} />
                        <g className="ob3-mid__content" pointerEvents="none">
                          {titleLines.map((line, lineIndex) => (
                            <text className="ob3-mid__title" key={`title-${lineIndex}`}
                              x="83" y={titleLines.length === 1 ? 51 : 47 + lineIndex * 8}>
                              {line}
                            </text>
                          ))}
                          <text className="ob3-mid__sub" x="83" y={titleLines.length === 1 ? 62 : 65}>
                            {option.subtext}
                          </text>
                          <text className="ob3-mid__sub" x="83" y={titleLines.length === 1 ? 71 : 74}>
                            {option.subtext2}
                          </text>
                        </g>
                      </g>
                      {/* B. The polygon AND the face share the exact same transform from 1.svg. */}
                      <g className="ob3-layer--right">
                        <g transform={OB3_RIGHT_TRANSFORM}>
                          <polygon points={OB3_FOLD_POLYGON_POINTS} fill={option.foldColor} />
                          <rect x={OB3_RIGHT_RECT.x} y={OB3_RIGHT_RECT.y}
                            width={OB3_RIGHT_RECT.width} height={OB3_RIGHT_RECT.height}
                            fill={option.rightFaceColor} />
                        </g>
                        <text className="ob3-right__label" x="206" y="56" pointerEvents="none">
                          {option.label}
                        </text>
                        <g className="ob3-right__copy" pointerEvents="none">
                          {descriptionLines.map((line, lineIndex) => (
                            <text key={`desc-${lineIndex}`} x="446" y={textStartY + lineIndex * lineHeight}
                              textAnchor="end" fontSize={textSize}>{line}</text>
                          ))}
                        </g>
                      </g>
                      {/* C. Original path #1 in 2.svg sits above the band on the left. */}
                      <g className="ob3-layer--front">
                        <path className="ob3-loop__arrow" d={OB3_LOOP_FRONT_PATH} fill={option.primaryColor} />
                        <foreignObject x="31" y="27" width="22" height="22" pointerEvents="none">
                          <div className="ob3-icon-host"><Icon /></div>
                        </foreignObject>
                      </g>
                    </svg>
                  </div>
                  {/* Responsive alternative: readable copy, no horizontal cropping. */}
                  <div className="ob3-mobile-view" aria-hidden="true">
                    <span className="ob3-mobile__icon-strip"><Icon /></span>
                    <span className="ob3-mobile__body">
                      <span className="ob3-mobile__header">
                        <span className="ob3-mobile__badge">{option.label}</span>
                        <span className="ob3-mobile__title">{option.title}</span>
                      </span>
                      <span className="ob3-mobile__sub">{option.subtext} · {option.subtext2}</span>
                      <span className="ob3-mobile__desc">{option.description}</span>
                    </span>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
