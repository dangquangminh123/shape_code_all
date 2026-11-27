'use client';

import { useId, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import Hb4StepIcon from './Hb4StepIcon';
import {
  HB4_ASSET_BASE,
  HB4_BANNERS,
  HB4_HEADING,
  HB4_MASK_FILES,
  type Hb4BannerItem,
  type Hb4Masks,
} from './hb4-hanger-banners.config';
import './hb4-hanger-banners.css';

type Hb4Style = CSSProperties & { [key: `--hb4-${string}`]: string };

function itemStyle(item: Hb4BannerItem): Hb4Style {
  return {
    left: `${(item.x / 735) * 100}%`,
    top: `${(item.y / 400) * 100}%`,
    '--hb4-hanger-color': item.colors.hanger,
    '--hb4-banner-color': item.colors.banner,
    '--hb4-ink': item.colors.ink,
    '--hb4-glow': item.colors.glow,
  };
}

export interface Hb4HangerBannersProps {
  masks?: Hb4Masks;
  className?: string;
}

export default function Hb4HangerBanners({ masks = {}, className = '' }: Hb4HangerBannersProps) {
  const headingId = useId();
  const controls = useRef<(HTMLButtonElement | null)[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const moduleStyle: Hb4Style = {
    '--hb4-mask-hanger': `url("${masks.hanger ?? `${HB4_ASSET_BASE}/${HB4_MASK_FILES.hanger}`}")`,
    '--hb4-mask-banner': `url("${masks.banner ?? `${HB4_ASSET_BASE}/${HB4_MASK_FILES.banner}`}")`,
    '--hb4-mask-medallion': `url("${masks.medallion ?? `${HB4_ASSET_BASE}/${HB4_MASK_FILES.medallion}`}")`,
  };

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const count = HB4_BANNERS.length;
    const next =
      event.key === 'ArrowRight' || event.key === 'ArrowDown'
        ? (index + 1) % count
        : event.key === 'ArrowLeft' || event.key === 'ArrowUp'
          ? (index + count - 1) % count
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? count - 1
              : null;

    if (next !== null) {
      event.preventDefault();
      controls.current[next]?.focus();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setSelectedIndex(null);
      // Keep focus on its native button so the next keyboard action stays predictable.
    }
  }

  return (
    <section
      className={`hb4-module ${className}`.trim()}
      style={moduleStyle}
      aria-labelledby={headingId}
      data-hb4-root="true"
    >
      <div className="hb4-artwork">
        <span className="hb4-heading-mark" aria-hidden="true" />
        <h2 className="hb4-heading" id={headingId}>{HB4_HEADING}</h2>

        <ol className="hb4-hangers" aria-label="Bốn bước từ ý tưởng đến kết quả">
          {HB4_BANNERS.map((item, index) => (
            <li className="hb4-item" key={item.id} style={itemStyle(item)}>
              <button
                className={`hb4-card${selectedIndex === index ? ' is-selected' : ''}`}
                ref={(element) => { controls.current[index] = element; }}
                type="button"
                aria-pressed={selectedIndex === index}
                aria-label={`Bước ${item.number}. ${item.title}: ${item.description}`}
                onClick={() => setSelectedIndex(current => current === index ? null : index)}
                onKeyDown={event => handleKeyDown(event, index)}
              >
                <span className="hb4-hanger" aria-hidden="true" />
                <span className="hb4-number" aria-hidden="true">{item.number}</span>

                {/* Reveal this group in place; the banner stays attached to the hanger. */}
                <span className="hb4-banner">
                  <span className="hb4-banner__paint" aria-hidden="true" />
                  <span className="hb4-copy">
                    <span className="hb4-title">{item.title}</span>
                    <span className="hb4-description">{item.description}</span>
                    <span className="hb4-summary" aria-hidden="true">{item.summary}</span>
                  </span>
                  <span className="hb4-medallion" aria-hidden="true">
                    <span className="hb4-medallion__paint" />
                    <span className="hb4-icon"><Hb4StepIcon name={item.icon} /></span>
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
