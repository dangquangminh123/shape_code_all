'use client';

import { useId, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import Cs5StepIcon from './Cs5StepIcon';
import {
  CS5_ASSET_BASE, CS5_HEADING, CS5_MASK_FILES, CS5_STEPS,
  type Cs5Masks, type Cs5StepItem,
} from './cs5-cylinder-steps.config';
import './cs5-cylinder-steps.css';

type Cs5Style = CSSProperties & { [key: `--cs5-${string}`]: string };

function stepStyle(step: Cs5StepItem): Cs5Style {
  return {
    top: `${step.y / 612 * 100}%`,
    '--cs5-accent': step.colors.accent,
    '--cs5-top': step.colors.top,
    '--cs5-middle': step.colors.middle,
    '--cs5-bottom': step.colors.bottom,
    '--cs5-cap': step.colors.cap,
    '--cs5-number-ink': step.colors.number,
    '--cs5-sleeve-left': `${step.sleeveX / 280 * 100}%`,
    // An em is 10 reference pixels, including inside narrow embedding containers.
    '--cs5-sleeve-travel': `${step.sleeveX / 10}em`,
  };
}

export interface Cs5CylinderStepsProps {
  masks?: Cs5Masks;
  className?: string;
}

export default function Cs5CylinderSteps({ masks = {}, className = '' }: Cs5CylinderStepsProps) {
  const headingId = useId();
  const controls = useRef<(HTMLButtonElement | null)[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const maskUrl = (name: keyof typeof CS5_MASK_FILES) =>
    `url("${masks[name] ?? `${CS5_ASSET_BASE}/${CS5_MASK_FILES[name]}`}")`;
  const moduleStyle: Cs5Style = {
    '--cs5-mask-body': maskUrl('cylinderBody'),
    '--cs5-mask-cap': maskUrl('cylinderCap'),
    '--cs5-mask-cylinder': maskUrl('cylinderFull'),
    '--cs5-mask-callout': maskUrl('calloutOutline'),
    '--cs5-mask-line': maskUrl('connectorLine'),
    '--cs5-mask-dot': maskUrl('connectorDot'),
    '--cs5-mask-sleeve': maskUrl('sleeve'),
    '--cs5-mask-sleeve-rim': maskUrl('sleeveRim'),
  };

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const count = CS5_STEPS.length;
    const next = event.key === 'ArrowDown' || event.key === 'ArrowRight'
      ? (index + 1) % count
      : event.key === 'ArrowUp' || event.key === 'ArrowLeft'
        ? (index + count - 1) % count
        : event.key === 'Home' ? 0 : event.key === 'End' ? count - 1 : null;

    if (next !== null) {
      event.preventDefault();
      controls.current[next]?.focus();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setSelectedIndex(null);
    }
  }

  return (
    <section className={`cs5-module ${className}`.trim()} style={moduleStyle}
      aria-labelledby={headingId} data-cs5-root="true">
      <div className="cs5-artwork">
        <header className="cs5-heading">
          <h2 id={headingId} className="cs5-heading-title">
            <strong>{CS5_HEADING.lead}</strong>
            <span className="cs5-heading-dot" aria-hidden="true" />
            <span>{CS5_HEADING.detail}</span>
          </h2>
          <p className="cs5-heading-description">{CS5_HEADING.description}</p>
        </header>

        <ol className="cs5-steps" aria-label="Năm bước phát triển từ định hướng đến hoàn thành">
          {CS5_STEPS.map((step, index) => (
            <li className="cs5-item" key={step.id} style={stepStyle(step)}>
              <button type="button" className={`cs5-card${selectedIndex === index ? ' is-selected' : ''}`}
                ref={element => { controls.current[index] = element; }}
                aria-pressed={selectedIndex === index}
                aria-label={`Bước ${step.number}. ${step.title}: ${step.description}`}
                onClick={() => setSelectedIndex(current => current === index ? null : index)}
                onKeyDown={event => handleKeyDown(event, index)}>
                <span className="cs5-callout" aria-hidden="true">
                  <span className="cs5-callout-outline" />
                  <span className={`cs5-icon cs5-icon--${step.icon}`}><Cs5StepIcon name={step.icon} /></span>
                  <span className="cs5-copy">
                    <span className="cs5-title">{step.title}</span>
                    <span className="cs5-description">{step.description}</span>
                    <span className="cs5-summary">{step.summary}</span>
                  </span>
                </span>

                <span className="cs5-connector" aria-hidden="true">
                  <span className="cs5-connector-line" />
                  <span className="cs5-connector-dot" />
                </span>

                <span className="cs5-cylinder" aria-hidden="true">
                  <span className="cs5-cylinder-body" />
                  <span className="cs5-cylinder-cap" />
                  <span className="cs5-sleeve">
                    <span className="cs5-sleeve-paint" />
                    <span className="cs5-sleeve-rim" />
                    <span className="cs5-sleeve-glint-clip"><span className="cs5-sleeve-glint" /></span>
                    <span className="cs5-number">{step.number}</span>
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
