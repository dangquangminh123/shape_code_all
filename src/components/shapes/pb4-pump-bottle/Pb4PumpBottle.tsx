'use client';

import { useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { pb4Steps, type Pb4Step } from './pb4-pump-bottle.config';
import './pb4-pump-bottle.css';

type Pb4Style = CSSProperties & { [key: `--pb4-${string}`]: string };
function stepStyle(step: Pb4Step): Pb4Style {
  return { '--pb4-color': step.color, '--pb4-light': step.light, '--pb4-shade': step.shade, '--pb4-ink': step.ink };
}

export default function Pb4PumpBottle() {
  const [selected, setSelected] = useState<number | null>(null);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next = event.key === 'ArrowDown' ? (index + 1) % pb4Steps.length
      : event.key === 'ArrowUp' ? (index + pb4Steps.length - 1) % pb4Steps.length
      : event.key === 'Home' ? 0 : event.key === 'End' ? pb4Steps.length - 1 : null;
    if (next !== null) {
      event.preventDefault();
      refs.current[next]?.focus();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setSelected(null);
    }
  }

  return (
    <section className="pb4-module" aria-label="Bốn bước chăm sóc làn da">
      <div className="pb4-artwork">
        <span className="pb4-shadow" aria-hidden="true" />
        <div className="pb4-body" aria-hidden="true">
          {pb4Steps.map((step, index) => (
            <span key={step.title} className={`pb4-band pb4-band--${index + 1}${selected === index ? ' is-selected' : ''}`} style={stepStyle(step)} />
          ))}
        </div>
        <span className="pb4-cap" aria-hidden="true"><span /><span /></span>
        <svg className="pb4-arc" viewBox="0 0 525 350" aria-hidden="true" focusable="false">
          <path d="M244 115 C296 155 307 229 264 283" />
        </svg>
        <ol className="pb4-steps" aria-label="Quy trình chăm sóc da">
          {pb4Steps.map((step, index) => {
            const Icon = step.icon;
            const number = String(index + 1).padStart(2, '0');
            return (
              <li key={step.title} className={`pb4-step pb4-step--${index + 1}${selected === index ? ' is-selected' : ''}`} style={stepStyle(step)}>
                <button
                  type="button"
                  className="pb4-control"
                  aria-label={`Bước ${number}. ${step.title}: ${step.description}`}
                  aria-pressed={selected === index}
                  onClick={() => setSelected(current => current === index ? null : index)}
                  onKeyDown={event => handleKeyDown(event, index)}
                  ref={node => { refs.current[index] = node; }}
                >
                  <span className="pb4-label" aria-hidden="true"><strong>{number}</strong><span>{step.title}</span></span>
                  <span className="pb4-dot" aria-hidden="true" />
                  <span className="pb4-caption" aria-hidden="true">
                    <span className="pb4-caption__icon"><Icon /></span>
                    <span className="pb4-caption__description">{step.description}</span>
                    <span className="pb4-caption__summary">{step.summary}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
