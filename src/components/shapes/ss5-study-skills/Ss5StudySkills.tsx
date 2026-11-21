'use client';

import React, { useId, useState, type CSSProperties, type KeyboardEvent } from 'react';
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

function RenderBookIcon({ iconType }: { iconType: Ss5BookItem['iconType'] }) {
  switch (iconType) {
    case 'test-quiz':
      // Test paper with checklist and pencil
      return (
        <svg
          viewBox="0 0 32 32"
          width="26"
          height="26"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 4h14l6 6v18H6z" />
          <path d="M20 4v6h6" />
          <path d="M10 14h6" />
          <path d="M10 18h6" />
          <path d="M10 22h4" />
          <path d="M18 20l5 5" />
          <path d="M21 17l4 4" />
        </svg>
      );
    case 'confidence':
      // Clipboard with user badge
      return (
        <svg
          viewBox="0 0 32 32"
          width="26"
          height="26"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 4h8v4h-8z" />
          <path d="M8 8H6a2 2 0 00-2 2v18a2 2 0 002 2h14a2 2 0 002-2v-4" />
          <path d="M9 14l2 2 4-4" />
          <circle cx="23" cy="20" r="3" />
          <path d="M18 28c0-2.5 2-4 5-4s5 1.5 5 4" />
        </svg>
      );
    case 'retention':
      // Open book with info circle
      return (
        <svg
          viewBox="0 0 32 32"
          width="26"
          height="26"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4 8c4-2 8-2 12 1v17c-4-3-8-3-12-1V8z" />
          <path d="M16 9c4-3 8-3 12-1v17c-4-2-8-2-12 1V9z" />
          <circle cx="23" cy="17" r="4" />
          <path d="M23 15v.5" />
          <path d="M23 17.5v2" />
        </svg>
      );
    case 'focus':
      // Open book with focus/magnifying lens
      return (
        <svg
          viewBox="0 0 32 32"
          width="26"
          height="26"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4 7c4-2 7-2 11 1v16c-4-3-7-3-11-1V7z" />
          <path d="M15 8c4-3 7-3 11-1v16c-4-2-7-2-11 1V8z" />
          <circle cx="20" cy="15" r="4" />
          <path d="M23 18l4 4" />
        </svg>
      );
    case 'performance':
      // Head profile with checklist / achievement
      return (
        <svg
          viewBox="0 0 32 32"
          width="26"
          height="26"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 26c0-4 3-7 7-7 2 0 3 1 4 2" />
          <circle cx="13" cy="11" r="5" />
          <path d="M19 8h8v16h-8z" />
          <path d="M22 13l1 1 3-3" />
          <path d="M22 19l1 1 3-3" />
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
  const [activeId, setActiveId] = useState<string | null>(null);

  function handleKeyDown(event: KeyboardEvent<SVGGElement>, bookId: string) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setActiveId((prev) => (prev === bookId ? null : bookId));
    } else if (event.key === 'Escape') {
      setActiveId(null);
    }
  }

  return (
    <section
      className={`ss5-module ${className}`}
      aria-labelledby={`${instanceId}-heading`}
      data-ss5-root="true"
    >
      <div className="ss5-inner">
        {/* Header */}
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
              <filter id={`${instanceId}-book-shadow`} x="-5%" y="-15%" width="110%" height="140%">
                <feDropShadow dx="0" dy="6" stdDeviation="5" floodOpacity="0.14" />
              </filter>
            </defs>

            {SS5_BOOKS.map((book) => {
              const isOdd = book.index % 2 !== 0;
              const tailX = isOdd ? SS5_CANVAS_CONFIG.oddTailX : SS5_CANVAS_CONFIG.evenTailX;
              const spineX = isOdd ? SS5_CANVAS_CONFIG.oddSpineX : SS5_CANVAS_CONFIG.evenSpineX;
              const bookY = SS5_CANVAS_CONFIG.baseY + (book.index - 1) * SS5_CANVAS_CONFIG.stepY;
              const isActive = activeId === book.id;

              return (
                <g
                  key={book.id}
                  className={`ss5-book-row ${isActive ? 'is-active' : ''}`}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isActive}
                  aria-label={`Mục ${book.label}: ${book.vietnameseTitle}`}
                  onMouseEnter={() => setActiveId(book.id)}
                  onMouseLeave={() => setActiveId(null)}
                  onKeyDown={(e) => handleKeyDown(e, book.id)}
                  filter={`url(#${instanceId}-book-shadow)`}
                >
                  {/* Layer 1: Left Bookmark Ribbon Tail */}
                  <g className="ss5-tail" transform={`translate(${tailX}, ${bookY})`}>
                    <path d={SS5_TAIL_PATH} fill={book.colors.tail} />
                    {/* Centered Icon on Tail Ribbon */}
                    <g className="ss5-icon-host" transform="translate(52, 27.5)">
                      <RenderBookIcon iconType={book.iconType} />
                    </g>
                  </g>

                  {/* Layer 2: Main Book Body & Spine */}
                  <g className="ss5-book-body" transform={`translate(${spineX}, ${bookY})`}>
                    {/* Outer Border / Outline */}
                    <path d={SS5_BODY_OUTLINE_PATH} fill={book.colors.border} />
                    {/* Main Book Surface Fill */}
                    <path d={SS5_BODY_FILL_PATH} fill={book.colors.body} />
                    {/* Rounded Spine Highlight Arc */}
                    <path
                      d={SS5_SPINE_ARC_PATH}
                      fill={book.colors.spine}
                      opacity={0.88}
                    />
                    {/* Text Copy Description */}
                    <text
                      x={68}
                      y={43.5}
                      className="ss5-copy-text"
                      dominantBaseline="middle"
                    >
                      {book.text}
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Mobile Accessible Cards (Screen width <= 640px) */}
        <div className="ss5-mobile-list" role="list">
          {SS5_BOOKS.map((book) => (
            <article
              key={`m-${book.id}`}
              className="ss5-mobile-card"
              role="listitem"
              style={
                {
                  backgroundColor: book.colors.body,
                  borderLeftColor: book.colors.tail,
                } as CSSProperties
              }
            >
              <div className="ss5-mobile-card__icon-wrapper">
                <RenderBookIcon iconType={book.iconType} />
              </div>
              <div className="ss5-mobile-card__content">
                <span className="ss5-mobile-card__num">Mục {book.label}</span>
                <h3 className="ss5-mobile-card__title">{book.vietnameseTitle}</h3>
                <p className="ss5-mobile-card__desc">{book.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
