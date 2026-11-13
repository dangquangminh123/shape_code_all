'use client';

import { useId, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { LuArrowUpRight } from 'react-icons/lu';
import Ar5Icon from './Ar5Icon';
import { AR5_ROWS, type Ar5Masks } from './ar5-arrow-ribbon.config';
import './ar5-arrow-ribbon.css';

type Ar5Style = CSSProperties & { [key: `--ar5-${string}`]: string };

interface Ar5Props {
  masks?: Ar5Masks;
  theme?: 'color' | 'silver-red';
  clean?: boolean;
}

export default function Ar5ArrowRibbon({ masks = {}, theme = 'color', clean = false }: Ar5Props) {
  const instanceId = useId();
  const rows = useRef<(HTMLElement | null)[]>([]);
  const [hovered, setHovered] = useState<number | null>(null);
  const [focused, setFocused] = useState<number | null>(null);
  const [touched, setTouched] = useState<number | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const active = dismissed ? null : hovered ?? focused ?? touched;
  const style: Ar5Style = {};
  for (const [role, url] of Object.entries(masks)) style[`--ar5-mask-${role}`] = `url("${url}")`;

  function onKeyDown(event: KeyboardEvent<HTMLElement>, index: number) {
    const last = AR5_ROWS.length - 1;
    const next = event.key === 'ArrowDown' ? (index + 1) % AR5_ROWS.length
      : event.key === 'ArrowUp' ? (index + last) % AR5_ROWS.length
      : event.key === 'Home' ? 0 : event.key === 'End' ? last : null;
    if (next !== null) {
      event.preventDefault();
      setHovered(null);
      setDismissed(false);
      rows.current[next]?.focus();
    } else if (event.key === 'Escape') {
      setTouched(null);
      setHovered(null);
      setDismissed(true);
    }
  }

  return (
    <section
      className={`ar5-module${theme === 'silver-red' ? ' ar5-module--silver-red' : ''}${clean ? ' ar5-module--clean' : ''}`}
      aria-label="Arrow Ribbon — 5 bước phát triển"
      style={style}
      data-ar5-masks={Object.keys(masks).join(' ') || 'css-fallback'}
    >
      <div className="ar5-rows">
        {AR5_ROWS.map((item, index) => (
          <article
            key={item.number}
            ref={element => { rows.current[index] = element; }}
            className={`ar5-row ar5-row--${item.number}${active === index ? ' ar5-is-active' : ''}`}
            tabIndex={0}
            aria-labelledby={`${instanceId}-title-${item.number}`}
            aria-describedby={`${instanceId}-desc-${item.number}`}
            onPointerEnter={event => {
              if (event.pointerType !== 'touch') { setHovered(index); setDismissed(false); }
            }}
            onPointerLeave={() => setHovered(null)}
            onPointerUp={event => {
              if (event.pointerType === 'touch') { setTouched(index); setDismissed(false); }
            }}
            onFocus={() => { setFocused(index); setDismissed(false); }}
            onBlur={() => { setFocused(null); setTouched(null); }}
            onKeyDown={event => onKeyDown(event, index)}
          >
            <div className={`ar5-arrow${masks.arrow ? ' ar5-has-mask' : ''}`} aria-hidden="true">
              <div className="ar5-arrow-ground" />
              <div className="ar5-arrow-skin">
                <div className="ar5-arrow-stroke" />
                <div className="ar5-arrow-fill" />
              </div>
            </div>
            <div className="ar5-arrow-content">
              <div className="ar5-arrow-copy">
                <h3 className="ar5-arrow-title" id={`${instanceId}-title-${item.number}`}>
                  <span>{item.title}</span>
                  <LuArrowUpRight className="ar5-arrow-title-icon" aria-hidden="true" focusable="false" />
                </h3>
                <p className="ar5-arrow-desc" id={`${instanceId}-desc-${item.number}`}>{item.description}</p>
              </div>
              <span className="ar5-arrow-number" aria-hidden="true">{item.number}</span>
            </div>
            <div className={`ar5-medallion${masks.medallion ? ' ar5-has-mask' : ''}`} aria-hidden="true">
              <div className="ar5-medallion-skin">
                <div className="ar5-medallion-stroke" />
                <div className="ar5-medallion-fill" />
              </div>
              <div className="ar5-medallion-center" />
              <div className="ar5-medallion-icon"><Ar5Icon name={item.icon} /></div>
            </div>
            <div className={`ar5-tab${masks.tab ? ' ar5-has-mask' : ''}`} aria-hidden="true">
              <div className="ar5-tab-stroke" />
              <div className="ar5-tab-fill" />
              <span className="ar5-tab-number">{item.number}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
