'use client';

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import type { IconType } from 'react-icons';
import {
  FaBinoculars,
  FaCoins,
  FaDiagramProject,
  FaFlagCheckered,
  FaLocationArrow,
  FaMicrochip,
} from 'react-icons/fa6';
import { LuHeartHandshake } from 'react-icons/lu';
import { HFR6_HEART_PATH, HFR6_ITEMS, hfr6FallbackMask, type Hfr6IconName, type Hfr6Masks, type Hfr6Step, type Hfr6Theme } from './hfr6-heartwheel.config';
import './hfr6-heartwheel.css';

type Hfr6Style = CSSProperties & { [key: `--hfr6-${string}`]: string };
const EMPTY_MASKS: Hfr6Masks = {};

const HFR6_ICONS: Record<Hfr6IconName, IconType> = {
  compass: FaLocationArrow,
  search: FaBinoculars,
  dollar: FaCoins,
  laptop: FaMicrochip,
  target: FaFlagCheckered,
  briefcase: FaDiagramProject,
};

export default function Hfr6Heartwheel({ masks = EMPTY_MASKS, theme = 'color' }: { masks?: Hfr6Masks; theme?: Hfr6Theme }) {
  const [loaded, setLoaded] = useState<Hfr6Masks>({});
  const [selected, setSelected] = useState<Hfr6Step | null>(null);
  const [hovered, setHovered] = useState<Hfr6Step | null>(null);
  const [focused, setFocused] = useState<Hfr6Step | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const controls = useRef<(SVGPathElement | null)[]>([]);
  const cards = useRef<(HTMLButtonElement | null)[]>([]);
  const active = dismissed ? null : hovered ?? focused ?? selected;
  const selectedItem = HFR6_ITEMS.find(item => item.number === selected);

  useEffect(() => {
    let cancelled = false;
    setLoaded({});
    void Promise.all(Object.entries(masks).map(async ([role, url]) => {
      const image = new Image();
      image.src = url;
      try { await image.decode(); return [role, url] as const; }
      catch { return null; }
    })).then(entries => {
      if (!cancelled) setLoaded(Object.fromEntries(entries.filter(entry => entry !== null)));
    });
    return () => { cancelled = true; };
  }, [masks]);

  function toggle(step: Hfr6Step) {
    setSelected(current => current === step ? null : step);
    setHovered(null);
    setFocused(null);
    setDismissed(false);
  }

  function keyDown(event: KeyboardEvent, index: number, mobile = false) {
    const next = ['ArrowRight', 'ArrowDown'].includes(event.key) ? (index + 1) % 6
      : ['ArrowLeft', 'ArrowUp'].includes(event.key) ? (index + 5) % 6
      : event.key === 'Home' ? 0 : event.key === 'End' ? 5 : null;
    if (next !== null) {
      event.preventDefault();
      setHovered(null);
      setDismissed(false);
      (mobile ? cards : controls).current[next]?.focus();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setSelected(null);
      setHovered(null);
      setFocused(null);
      setDismissed(true);
    } else if (!mobile && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      if (!event.repeat) toggle(HFR6_ITEMS[index].number);
    }
  }

  function preview(step: Hfr6Step) { setHovered(step); setDismissed(false); }
  function focus(step: Hfr6Step) { setFocused(step); setDismissed(false); }
  const heartStyle: Hfr6Style = { '--hfr6-heart-mask': loaded.heart ? `url("${loaded.heart}")` : hfr6FallbackMask(HFR6_HEART_PATH) };

  return (
    <section
      className={`hfr6${theme === 'silver-red' ? ' hfr6--silver-red' : ''}${active ? ' hfr6--has-active' : ''}`}
      data-hfr6-root
      data-hfr6-masks={Object.keys(loaded).join(' ') || 'inline-fallback'}
      aria-label="Vòng tròn sáu yếu tố phát triển"
    >
      <div className="hfr6__wheel">
        <span className="hfr6__ambient" aria-hidden="true" />
        <div className="hfr6__art" aria-hidden="true">
          {HFR6_ITEMS.map(item => {
            const Icon = HFR6_ICONS[item.icon];
            const style: Hfr6Style = {
              '--hfr6-sector-mask': loaded[item.number] ? `url("${loaded[item.number]}")` : hfr6FallbackMask(item.path),
            };
            return (
              <div key={item.number} className={`hfr6-sector hfr6-sector--${item.number}${active === item.number ? ' hfr6-is-active' : ''}`} data-hfr6-sector={item.number} style={style}>
                <div className="hfr6-sector__surface"><span className="hfr6-sector__stroke" /><span className="hfr6-sector__fill" /></div>
                <div className="hfr6-sector__content">
                  <span className="hfr6-sector__number">{item.number}</span>
                  <div className="hfr6-sector__copy"><strong className="hfr6-sector__title">{item.title}</strong><span className="hfr6-sector__summary">{item.description}</span></div>
                  <span className="hfr6-sector__icon"><Icon className="hfr6-sector__svg-icon" data-hfr6-icon={item.icon} aria-hidden="true" focusable="false" /></span>
                </div>
              </div>
            );
          })}
        </div>
        <svg className="hfr6-hitmap" viewBox="0 0 640 640" role="group" aria-label="Chọn một trong sáu thành phần">
          {HFR6_ITEMS.map((item, index) => (
            <path key={item.number} ref={element => { controls.current[index] = element; }} className="hfr6-hitmap__sector" data-hfr6-control={item.number}
              d={item.path} tabIndex={0} role="button" aria-pressed={selected === item.number} aria-label={`${item.number}. ${item.title}. ${item.description}`}
              onPointerEnter={event => { if (event.pointerType !== 'touch') preview(item.number); }} onPointerLeave={() => setHovered(null)}
              onFocus={() => focus(item.number)} onBlur={() => setFocused(null)} onClick={() => toggle(item.number)} onKeyDown={event => keyDown(event, index)} />
          ))}
          <path className="hfr6-hitmap__heart-guard" d={HFR6_HEART_PATH} aria-hidden="true" onPointerEnter={() => setHovered(null)} />
        </svg>
        <div className="hfr6-heart" style={heartStyle} aria-hidden="true">
          <span className="hfr6-heart__shape" />
          <LuHeartHandshake className="hfr6-heart__emblem" aria-hidden="true" focusable="false" />
        </div>
      </div>
      <div className="hfr6-mobile" role="group" aria-label="Danh sách sáu nội dung">
        {HFR6_ITEMS.map((item, index) => {
          const Icon = HFR6_ICONS[item.icon];
          return (
            <button key={item.number} ref={element => { cards.current[index] = element; }} type="button"
              className={`hfr6-mobile__item hfr6-sector--${item.number}${active === item.number ? ' hfr6-is-active' : ''}`} data-hfr6-mobile={item.number}
              aria-pressed={selected === item.number}
              onPointerEnter={event => { if (event.pointerType !== 'touch') preview(item.number); }} onPointerLeave={() => setHovered(null)}
              onFocus={() => focus(item.number)} onBlur={() => setFocused(null)} onClick={() => toggle(item.number)} onKeyDown={event => keyDown(event, index, true)}>
              <span className="hfr6-mobile__badge">{item.number}</span>
              <span className="hfr6-mobile__info"><strong>{item.title}</strong><small>{item.description}</small></span>
              <Icon className="hfr6-mobile__svg-icon" data-hfr6-mobile-icon={item.icon} aria-hidden="true" focusable="false" />
            </button>
          );
        })}
      </div>
      <span className="hfr6-sr-only" aria-live="polite" aria-atomic="true">{selectedItem ? `Đã chọn: ${selectedItem.number}. ${selectedItem.title}. ${selectedItem.description}` : ''}</span>
    </section>
  );
}
