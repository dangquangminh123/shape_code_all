'use client';

import { useId, useRef, useState, type KeyboardEvent } from 'react';
import { FaFlask, FaShieldHalved, FaDroplet } from 'react-icons/fa6';
import { ST7_ROWS, type St7Theme } from './st7-squeeze-tubes.config';
import './st7-squeeze-tubes.css';

const ROW_ICONS = [FaFlask, FaShieldHalved, FaDroplet] as const;

export default function St7SqueezeTubes({
  theme = 'reference',
}: {
  theme?: St7Theme;
}) {
  const instanceId = useId();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [focused, setFocused] = useState<number | null>(null);
  const active = hovered ?? focused ?? selected;

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = ST7_ROWS.length - 1;
    const next = event.key === 'ArrowDown' ? (index + 1) % ST7_ROWS.length
      : event.key === 'ArrowUp' ? (index + last) % ST7_ROWS.length
      : event.key === 'Home' ? 0
      : event.key === 'End' ? last
      : null;
    if (next !== null) {
      event.preventDefault();
      buttons.current[next]?.focus();
      return;
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      setSelected(null);
      setHovered(null);
      setFocused(null);
      event.currentTarget.blur();
    }
  }

  return (
    <section
      className={`st7-module ${theme === 'silver-red' ? 'st7-module--silver-red' : 'st7-module--reference'}`}
      aria-labelledby={`${instanceId}-heading`}
    >
      <h2 className="st7-visually-hidden" id={`${instanceId}-heading`}>
        Mẫu infographic ba tuýp sản phẩm so le
      </h2>
      <div className="st7-stage">
        {ST7_ROWS.map((row, index) => {
          const Icon = ROW_ICONS[index];
          return (
            <button
              key={row.number}
              type="button"
              ref={element => { buttons.current[index] = element; }}
              className={`st7-piece st7-piece--${row.number}${active === index ? ' st7-piece--active' : ''}`}
              aria-pressed={selected === index}
              aria-label={`Mục ${row.number}: ${row.description}`}
              onPointerEnter={event => { if (event.pointerType !== 'touch') setHovered(index); }}
              onPointerLeave={() => setHovered(null)}
              onFocus={() => setFocused(index)}
              onBlur={() => setFocused(null)}
              onClick={() => setSelected(previous => previous === index ? null : index)}
              onKeyDown={event => onKeyDown(event, index)}
            >
              <span className="st7-tube" aria-hidden="true">
                <span className="st7-tube-visual">
                  <span className="st7-tube-shell">
                    <span className="st7-tube-band">
                      <span className="st7-tube-band-gloss" />
                    </span>
                    <span className="st7-tube-crimp" />
                    <span className="st7-tube-ribbing" />
                    <span className="st7-tube-nozzle" />
                    <span className="st7-tube-sheen" />
                  </span>
                </span>
                <span className="st7-tube-caption">
                  <Icon aria-hidden="true" className="st7-tube-icon" />
                  <span className="st7-tube-label">
                    <strong>{row.eyebrow}</strong>
                    <span className="st7-tube-label-last"><strong>{row.title}</strong><small>{row.suffix}</small></span>
                  </span>
                </span>
              </span>

              <span className="st7-marker" aria-hidden="true">
                <span className="st7-marker-splash" />
                <span className="st7-marker-orbit" />
                <span className="st7-marker-ring" />
                <span className="st7-marker-number">{row.number.replace(/^0/, '')}</span>
              </span>
            </button>
          );
        })}
      </div>
      <div className="st7-mobile-details" aria-hidden="true">
        {ST7_ROWS.map(row => <span key={row.number}>{row.number} · {row.description}</span>)}
      </div>
    </section>
  );
}
