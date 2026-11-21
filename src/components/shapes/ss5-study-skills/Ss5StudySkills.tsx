'use client';

import React, { useId, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import {
  SS5_BOOKS,
  SS5_CANVAS_CONFIG,
  SS5_TAIL_PATH,
  SS5_BODY_OUTLINE_PATH,
  SS5_BODY_FILL_PATH,
  SS5_SPINE_ARC_PATH,
  type Ss5BookItem,
} from './ss5-study-skills.config';
import './ss5-study-skills.css';

export interface Ss5StudySkillsProps {
  headerTitle?: string;
  headerSubtitle?: string;
  className?: string;
}

/** Deterministic word wrapping for native SVG text (avoids Safari foreignObject clipping). */
function wrapWords(value: string, maxChars: number): string[] {
  const words = value.trim().split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = '';
  for (const word of words) {
    if (current && `${current} ${word}`.length > maxChars) {
      lines.push(current);
      current = word;
    } else {
      current = current ? `${current} ${word}` : word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function RenderBookIcon({
  iconType,
  tailColor,
}: {
  iconType: Ss5BookItem['iconType'];
  tailColor: string;
}) {
  switch (iconType) {
    case 'test-quiz':
      return (
        <svg
          x="0"
          y="0"
          width="52"
          height="52"
          viewBox="0 0 36 36"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M7 5h15l5 5v21H7z" />
          <path d="M22 5v5h5" />
          <rect x="10.5" y="13" width="3.5" height="3.5" />
          <path d="M16 14.8h7.5" />
          <rect x="10.5" y="19" width="3.5" height="3.5" />
          <path d="M16 20.8h5" />
          <rect x="10.5" y="25" width="3.5" height="3.5" />
          <path d="M16 26.8h4" />
          <path d="M21 25.5l7.5-7.5 2.5 2.5-7.5 7.5-3 .5z" fill={tailColor} />
        </svg>
      );
    case 'confidence':
      return (
        <svg
          x="0"
          y="0"
          width="52"
          height="52"
          viewBox="0 0 36 36"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="10" y="4" width="9" height="3.5" rx="1" />
          <path d="M10 6H7a2 2 0 0 0-2 2v21a2 2 0 0 0 2 2h12" />
          <path d="M19 6h3a2 2 0 0 1 2 2v9" />
          <path d="M9 13l9 7" />
          <rect x="15" y="12" width="4" height="4" rx="0.5" />
          <path d="M9 22h7M9 26h6" />
          <circle cx="26.5" cy="22" r="3.2" fill={tailColor} />
          <path d="M21.5 31c0-2.6 2.2-4.3 5-4.3s5 1.7 5 4.3" fill={tailColor} />
        </svg>
      );
    case 'retention':
      return (
        <svg
          x="0"
          y="0"
          width="52"
          height="52"
          viewBox="0 0 36 36"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4 9c4.5-2.5 9-2.2 13 1v16c-4-2.8-8.5-3-13-1V9z" />
          <path d="M17 10c4-3.2 8.5-3.5 13-1v16c-4.5-2-9-1.8-13 1V10z" />
          <circle cx="25" cy="24.5" r="6.2" fill={tailColor} />
          <circle cx="25" cy="21.5" r="0.8" fill="#ffffff" stroke="none" />
          <path d="M25 24v4" />
        </svg>
      );
    case 'focus':
      return (
        <svg
          x="0"
          y="0"
          width="52"
          height="52"
          viewBox="0 0 36 36"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 7h26v21H5z" />
          <path d="M18 7v21" />
          <path d="M8 12h7M8 16h6M8 20h6M8 24h7" />
          <path d="M21 12h7M21 16h7M21 20h7M21 24h7" />
          <circle cx="15" cy="17" r="4.8" fill={tailColor} />
          <path d="M18.6 20.6l5.2 5.2" strokeWidth="2.1" />
        </svg>
      );
    case 'performance':
      return (
        <svg
          x="0"
          y="0"
          width="52"
          height="52"
          viewBox="0 0 36 36"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M13 30v-3.5c-2.8 0-4.8-1.4-5.2-3.8l-1.8-.5 1.8-3.4c-.3-4.6 2.8-9.8 8.4-10.2" />
          <path d="M17.5 10.5v12.5l-1 2.2-1-2.2V10.5a1 1 0 0 1 2 0z" />
          <rect x="21" y="7" width="9.5" height="15" rx="1.2" fill={tailColor} />
          <path d="M24 6h3.5v2H24z" fill={tailColor} />
          <path d="M23.2 12l1 1 2-2M23.2 16l1 1 2-2M23.2 19.5h4.8" />
        </svg>
      );
  }
}

export default function Ss5StudySkills({
  headerTitle = 'STUDY SKILLS',
  headerSubtitle = 'How to Improve your Study Skills!',
  className = '',
}: Ss5StudySkillsProps) {
  const instanceId = useId();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const svgRowRefs = useRef<(SVGGElement | null)[]>([]);
  const mobileCardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const activeId = hoveredId ?? focusedId ?? selectedId;

  function toggleSelect(bookId: string) {
    setSelectedId((prev) => (prev === bookId ? null : bookId));
  }

  function handleKeyDown(
    event: KeyboardEvent<SVGGElement | HTMLButtonElement>,
    index: number,
    bookId: string,
    target: 'svg' | 'card',
  ) {
    if (event.key === 'Escape') {
      event.preventDefault();
      setSelectedId(null);
      setHoveredId(null);
      return;
    }
    if (target === 'svg' && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      toggleSelect(bookId);
      return;
    }
    const nextIndex =
      event.key === 'ArrowDown' || event.key === 'ArrowRight'
        ? (index + 1) % SS5_BOOKS.length
        : event.key === 'ArrowUp' || event.key === 'ArrowLeft'
          ? (index - 1 + SS5_BOOKS.length) % SS5_BOOKS.length
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? SS5_BOOKS.length - 1
              : null;
    if (nextIndex !== null) {
      event.preventDefault();
      (target === 'svg' ? svgRowRefs.current[nextIndex] : mobileCardRefs.current[nextIndex])?.focus();
    }
  }

  return (
    <section
      className={`ss5-module ${className}`.trim()}
      aria-labelledby={`${instanceId}-heading`}
      data-ss5-root="true"
    >
      <div className="ss5-inner">
        <header className="ss5-header">
          <h2 className="ss5-header__title" id={`${instanceId}-heading`}>
            {headerTitle}
          </h2>
          <p className="ss5-header__subtitle">{headerSubtitle}</p>
        </header>

        {/* Desktop Interactive SVG Stage */}
        <div
          className="ss5-stage"
          role="group"
          aria-label="5 Kỹ năng học tập xếp chồng dạng sách"
        >
          <svg
            className="ss5-svg"
            viewBox={SS5_CANVAS_CONFIG.viewBox}
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <defs>
              <filter
                id={`${instanceId}-book-shadow`}
                x="-12%"
                y="-25%"
                width="124%"
                height="160%"
              >
                <feDropShadow dx="0" dy="3" stdDeviation="3.5" floodColor="#0f172a" floodOpacity="0.18" />
              </filter>
            </defs>

            {SS5_BOOKS.map((book, index) => {
              const isOdd = book.index % 2 !== 0;
              const tailX = isOdd ? SS5_CANVAS_CONFIG.oddTailX : SS5_CANVAS_CONFIG.evenTailX;
              const spineX = isOdd ? SS5_CANVAS_CONFIG.oddSpineX : SS5_CANVAS_CONFIG.evenSpineX;
              const bookY = SS5_CANVAS_CONFIG.baseY + index * SS5_CANVAS_CONFIG.stepY;
              const tailY = bookY + SS5_CANVAS_CONFIG.tailOffsetY;
              const isActive = activeId === book.id;

              const lines = wrapWords(book.text, 39);
              const fontSize =
                lines.length <= 2
                  ? 12
                  : Math.max(8.5, Math.min(11.4, 52 / (lines.length * 1.28)));
              const lineHeight = fontSize * 1.3;
              const blockHeight = (lines.length - 1) * lineHeight;
              const firstBaselineY = 40.5 - blockHeight / 2 + fontSize * 0.35;

              return (
                <g
                  key={book.id}
                  ref={(node) => {
                    svgRowRefs.current[index] = node;
                  }}
                  className={`ss5-book-row${isActive ? ' is-active' : ''}`}
                  tabIndex={0}
                  role="button"
                  aria-pressed={selectedId === book.id}
                  aria-label={`Mục ${book.label}: ${book.vietnameseTitle}. ${book.text}`}
                  onClick={() => toggleSelect(book.id)}
                  onMouseEnter={() => setHoveredId(book.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onFocus={() => setFocusedId(book.id)}
                  onBlur={() => setFocusedId(null)}
                  onKeyDown={(e) => handleKeyDown(e, index, book.id, 'svg')}
                >
                  <g
                    className="ss5-book-layers"
                    filter={`url(#${instanceId}-book-shadow)`}
                  >
                    {/* Layer 1: Left Bookmark Ribbon Tail (scaled 57.5/81, centered vertically) */}
                    <g
                      className="ss5-tail"
                      transform={`translate(${tailX}, ${tailY}) scale(${SS5_CANVAS_CONFIG.tailScale})`}
                    >
                      <path d={SS5_TAIL_PATH} fill={book.colors.tail} />
                      <g className="ss5-icon-host" transform="translate(40, 14.5)">
                        <RenderBookIcon
                          iconType={book.iconType}
                          tailColor={book.colors.tail}
                        />
                      </g>
                    </g>

                    {/* Layer 2: Main Book Body & Spine (scaled 86.5/81) */}
                    <g
                      className="ss5-book-body"
                      transform={`translate(${spineX}, ${bookY}) scale(${SS5_CANVAS_CONFIG.bodyScale})`}
                    >
                      <path d={SS5_BODY_OUTLINE_PATH} fill={book.colors.border} />
                      <path d={SS5_BODY_FILL_PATH} fill={book.colors.body} />
                      <path
                        d={SS5_SPINE_ARC_PATH}
                        fill={book.colors.spine}
                        opacity={0.9}
                      />
                      <text
                        className="ss5-copy-text"
                        fontSize={fontSize}
                        pointerEvents="none"
                      >
                        {lines.map((line, lineIdx) => (
                          <tspan
                            key={`${book.id}-line-${lineIdx}`}
                            x={SS5_CANVAS_CONFIG.textX}
                            y={firstBaselineY + lineIdx * lineHeight}
                          >
                            {line}
                          </tspan>
                        ))}
                      </text>
                    </g>
                  </g>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Mobile Responsive Cards (Viewport <= 600px) */}
        <div className="ss5-mobile-list" role="list">
          {SS5_BOOKS.map((book, index) => {
            const isActive = activeId === book.id;
            return (
              <button
                key={`m-${book.id}`}
                type="button"
                ref={(node) => {
                  mobileCardRefs.current[index] = node;
                }}
                className={`ss5-mobile-card${isActive ? ' is-active' : ''}`}
                role="listitem"
                aria-pressed={selectedId === book.id}
                aria-label={`Mục ${book.label}: ${book.vietnameseTitle}. ${book.text}`}
                style={
                  {
                    '--ss5-tail': book.colors.tail,
                    '--ss5-body': book.colors.body,
                    '--ss5-spine': book.colors.spine,
                  } as CSSProperties
                }
                onClick={() => toggleSelect(book.id)}
                onMouseEnter={() => setHoveredId(book.id)}
                onMouseLeave={() => setHoveredId(null)}
                onFocus={() => setFocusedId(book.id)}
                onBlur={() => setFocusedId(null)}
                onKeyDown={(e) => handleKeyDown(e, index, book.id, 'card')}
              >
                <span className="ss5-mobile-card__tail" aria-hidden="true">
                  <RenderBookIcon
                    iconType={book.iconType}
                    tailColor={book.colors.tail}
                  />
                </span>
                <span className="ss5-mobile-card__body">
                  <span className="ss5-mobile-card__num">Mục {book.label}</span>
                  <span className="ss5-mobile-card__title">{book.vietnameseTitle}</span>
                  <span className="ss5-mobile-card__desc">{book.text}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
