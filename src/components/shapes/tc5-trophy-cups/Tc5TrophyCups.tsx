'use client';

import { useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { tc5Steps, type Tc5Step } from './tc5-trophy-cups.config';
import './tc5-trophy-cups.css';

type Tc5Style = CSSProperties & { [key: `--tc5-${string}`]: string };
function stepStyle(step: Tc5Step): Tc5Style {
  return { '--tc5-color': step.color, '--tc5-shade': step.shade, '--tc5-light': step.light, '--tc5-ink': step.ink };
}

export default function Tc5TrophyCups() {
  const [selected, setSelected] = useState<number | null>(null);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next = event.key === 'ArrowRight' ? (index + 1) % tc5Steps.length
      : event.key === 'ArrowLeft' ? (index + tc5Steps.length - 1) % tc5Steps.length
      : event.key === 'Home' ? 0 : event.key === 'End' ? tc5Steps.length - 1 : null;
    if (next !== null) {
      event.preventDefault();
      refs.current[next]?.focus();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setSelected(null);
    }
  }

  return (
    <section className="tc5-module" aria-label="Năm cúp thành tựu">
      <div className="tc5-artwork">
        <ol className="tc5-steps" aria-label="Năm bước chinh phục mục tiêu">
          {tc5Steps.map((step, index) => {
            const Icon = step.icon;
            const number = String(index + 1).padStart(2, '0');
            return (
              <li key={step.title} className={`tc5-step${selected === index ? ' is-selected' : ''}`} style={stepStyle(step)}>
                <span className="tc5-cup" aria-hidden="true">
                  <span className="tc5-cup__facet" />
                  <span className="tc5-cup__plinth" />
                  <span className="tc5-cup__foot" />
                </span>
                <button
                  type="button"
                  className="tc5-control"
                  aria-label={`Bước ${number}. ${step.subtitle}: ${step.description}`}
                  aria-pressed={selected === index}
                  onClick={() => setSelected(current => current === index ? null : index)}
                  onKeyDown={event => handleKeyDown(event, index)}
                  ref={node => { refs.current[index] = node; }}
                >
                  <span className="tc5-cup__icon" aria-hidden="true"><Icon /></span>
                  <span className="tc5-cup__number" aria-hidden="true"><span>STEP</span><strong>{number}</strong></span>
                </button>
                <div className="tc5-caption">
                  <h3>{step.title}</h3>
                  <strong>{step.subtitle}</strong>
                  <p className="tc5-caption__description">{step.description}</p>
                  <p className="tc5-caption__summary" aria-hidden="true">{step.summary}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
