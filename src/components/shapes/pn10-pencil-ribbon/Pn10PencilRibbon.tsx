'use client';

import { useId, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { FaMagnifyingGlass, FaMobileScreenButton, FaUsers, FaLaptop, FaBriefcase } from 'react-icons/fa6';
import type { IconType } from 'react-icons';
import { PN10_LABEL, PN10_STEPS, PN10_SILVER_RED, type Pn10IconName, type Pn10Step, type Pn10StepId, type Pn10Theme } from './pn10-pencil-ribbon.config';
import './pn10-pencil-ribbon.css';

const icons: Record<Pn10IconName, IconType> = {
  search: FaMagnifyingGlass, mobile: FaMobileScreenButton,
  people: FaUsers, laptop: FaLaptop, briefcase: FaBriefcase,
};

type Pn10Style = CSSProperties & { [key: `--pn10-${string}`]: string | number };

export interface Pn10PencilRibbonProps {
  theme?: Pn10Theme;
  className?: string;
}

export default function Pn10PencilRibbon({ theme = 'reference', className = '' }: Pn10PencilRibbonProps) {
  const uid = useId();
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const [hovered, setHovered] = useState<Pn10StepId | null>(null);
  const [focused, setFocused] = useState<Pn10StepId | null>(null);
  const [selected, setSelected] = useState<Pn10StepId | null>(null);
  const active = hovered ?? focused ?? selected;

  function rowStyle(step: Pn10Step, index: number): Pn10Style {
    const palette = theme === 'silver-red' ? PN10_SILVER_RED[step.id] : step.palette;
    return {
      '--pn10-row-index': index,
      '--pn10-light': palette.light, '--pn10-main': palette.main,
      '--pn10-dark': palette.dark, '--pn10-text': palette.text,
      '--pn10-relief-mask': `url('/assets/shapes/pn10-pencil-ribbon/pn10-relief-band-0${index + 1}.svg')`,
    };
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next = event.key === 'ArrowDown' ? (index + 1) % PN10_STEPS.length
      : event.key === 'ArrowUp' ? (index + PN10_STEPS.length - 1) % PN10_STEPS.length
      : event.key === 'Home' ? 0 : event.key === 'End' ? PN10_STEPS.length - 1 : null;
    if (next !== null) {
      event.preventDefault();
      setHovered(null);
      refs.current[next]?.focus();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setSelected(null);
      setHovered(null);
      // Clear selection without throwing keyboard users out of the control group.
    }
  }

  return (
    <section className={`pn10-module pn10-module--${theme}${className ? ` ${className}` : ''}`}
      aria-label={PN10_LABEL} data-active-step={active ?? ''} data-selected-step={selected ?? ''}>
      <div className="pn10-stage">
        <div className="pn10-rail" aria-hidden="true">
          <div className="pn10-rail__shadow"><div className="pn10-rail__surface" /></div>
        </div>
        <div className="pn10-marker" aria-hidden="true">
          <div className="pn10-marker__shadow">
            <div className="pn10-marker__body">
              <div className="pn10-marker__shoulder" />
              <div className="pn10-marker__cap-ribs" />
              {PN10_STEPS.map((step, index) => (
                <div key={step.id} className={`pn10-marker__band${active === step.id ? ' is-active' : ''}`}
                  style={rowStyle(step, index)} />
              ))}
              <div className="pn10-marker__sheen" />
              <div className="pn10-marker__foot" />
            </div>
          </div>
          {PN10_STEPS.map((step, index) => (
            <span key={step.id} className={`pn10-marker__number${active === step.id ? ' is-active' : ''}`}
              style={rowStyle(step, index)}>{step.number}</span>
          ))}
        </div>
        <div className="pn10-ribbons">
          {PN10_STEPS.map((step, index) => {
            const Icon = icons[step.icon];
            return (
              <button key={step.id} type="button" ref={node => { refs.current[index] = node; }}
                className={`pn10-ribbon pn10-ribbon--${step.number}${active === step.id ? ' is-active' : ''}`}
                style={rowStyle(step, index)}
                onPointerEnter={event => { if (event.pointerType !== 'touch') setHovered(step.id); }}
                onPointerLeave={() => setHovered(null)}
                onFocus={() => setFocused(step.id)} onBlur={() => setFocused(null)}
                onClick={() => setSelected(old => old === step.id ? null : step.id)}
                onKeyDown={event => handleKeyDown(event, index)}
                aria-labelledby={`${uid}-title-${step.id}`} aria-describedby={`${uid}-desc-${step.id}`}
                aria-pressed={selected === step.id}>
                <span className="pn10-ribbon__skin" aria-hidden="true">
                  <span className="pn10-ribbon__paint">
                    <span className="pn10-ribbon__relief" /><span className="pn10-ribbon__fold" />
                  </span>
                </span>
                <span className="pn10-ribbon__glyph" aria-hidden="true"><Icon focusable="false" /></span>
                <span className="pn10-ribbon__copy">
                  <span className="pn10-ribbon__title" id={`${uid}-title-${step.id}`}>{step.title}</span>
                  <span className="pn10-ribbon__desc" id={`${uid}-desc-${step.id}`}>{step.description}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <span className="pn10-visually-hidden" role="status" aria-live="polite" aria-atomic="true">
        {selected ? `Đã chọn bước ${PN10_STEPS.find(step => step.id === selected)?.number}: ${PN10_STEPS.find(step => step.id === selected)?.title}` : 'Chưa chọn bước.'}
      </span>
    </section>
  );
}
