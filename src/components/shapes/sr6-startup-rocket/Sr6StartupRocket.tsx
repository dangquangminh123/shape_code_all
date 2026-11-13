'use client';

import { useId, useRef, useState, type KeyboardEvent } from 'react';
import {
  FaLightbulb,
  FaUsersGear,
  FaMagnifyingGlassChart,
  FaLayerGroup,
  FaNetworkWired,
  FaRocket,
} from 'react-icons/fa6';
import type { IconType } from 'react-icons';
import { SR6_STEPS, type Sr6StepId } from './sr6-startup-rocket.data';
import './sr6-startup-rocket.css';

const ICONS: Record<(typeof SR6_STEPS)[number]['icon'], IconType> = {
  gears: FaLightbulb,
  envelope: FaUsersGear,
  chart: FaMagnifyingGlassChart,
  globe: FaLayerGroup,
  share: FaNetworkWired,
  clock: FaRocket,
};

export type Sr6Theme = 'reference' | 'colorful' | 'silver-red';
export interface Sr6StartupRocketProps {
  theme?: Sr6Theme;
  heading?: string;
  eyebrow?: string;
}

export default function Sr6StartupRocket({
  theme = 'reference',
}: Sr6StartupRocketProps) {
  const uid = useId();
  const pinRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [hovered, setHovered] = useState<Sr6StepId | null>(null);
  const [focused, setFocused] = useState<Sr6StepId | null>(null);
  const [selected, setSelected] = useState<Sr6StepId | null>(null);
  const active = hovered ?? focused ?? selected;

  const toggle = (step: Sr6StepId) => setSelected((prev) => (prev === step ? null : step));
  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const len = SR6_STEPS.length;
    const next = event.key === 'ArrowDown' || event.key === 'ArrowRight'
      ? (index + 1) % len
      : event.key === 'ArrowUp' || event.key === 'ArrowLeft'
        ? (index - 1 + len) % len
        : event.key === 'Home' ? 0 : event.key === 'End' ? len - 1 : null;
    if (next !== null) {
      event.preventDefault();
      pinRefs.current[next]?.focus();
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      setHovered(null);
      setSelected(null);
    }
  };

  return (
    <section
      className={`sr6-module${theme === 'silver-red' ? ' sr6-module--silver-red' : ''}`}
      aria-label="Mẫu 06 - tên lửa và sáu giai đoạn khởi nghiệp"
      data-sr6-active={active ?? ''}
      data-sr6-pinned={selected ?? ''}
    >
      <div className="sr6-module__inner">
        <div className="sr6-module__stage">
          <div className="sr6-module__rocket-column">
            <div className="sr6-rocket" aria-label="Tên lửa với sáu tầng SVG">
              <div className="sr6-rocket__assembly">
                {SR6_STEPS.map((step) => {
                  const Icon = ICONS[step.icon];
                  return (
                    <button
                      key={step.id}
                      type="button"
                      className={`sr6-rocket__piece sr6-rocket__piece--0${step.id}${active === step.id ? ' is-active' : ''}`}
                      data-sr6-step={step.id}
                      aria-label={`${step.number}. ${step.title}`}
                      aria-pressed={selected === step.id}
                      aria-describedby={`${uid}-sr6-desc-${step.id}`}
                      onPointerEnter={() => setHovered(step.id)}
                      onPointerLeave={() => setHovered(null)}
                      onFocus={() => setFocused(step.id)}
                      onBlur={() => setFocused(null)}
                      onClick={() => toggle(step.id)}
                    >
                      <span className="sr6-rocket__surface" aria-hidden="true" />
                      <span className="sr6-rocket__icon" aria-hidden="true"><Icon /></span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="sr6-timeline" aria-label="Các giai đoạn của lộ trình">
            <svg className="sr6-timeline__arc" viewBox="0 0 620 520" preserveAspectRatio="none" aria-hidden="true">
              <path
                d="M 10 60 C 36 64 56 69 76 78 C 112 96 130 119 148 142 C 183 183 201 207 205 237 C 211 273 211 296 204 329 C 194 368 174 397 148 420 C 125 445 98 465 76 476 C 52 489 34 492 10 496"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            {SR6_STEPS.map((step, index) => {
              const StepIcon = ICONS[step.icon];
              return (
                <div
                  className={`sr6-timeline__step sr6-timeline__step--0${step.id}${active === step.id ? ' is-active' : ''}`}
                  data-sr6-step={step.id}
                  key={step.id}
                >
                  <button
                    ref={(el) => { pinRefs.current[index] = el; }}
                    type="button"
                    className="sr6-timeline__pin"
                    data-sr6-step={step.id}
                    aria-label={`${step.number}. ${step.title}`}
                    aria-pressed={selected === step.id}
                    aria-describedby={`${uid}-sr6-desc-${step.id}`}
                    onPointerEnter={() => setHovered(step.id)}
                    onPointerLeave={() => setHovered(null)}
                    onFocus={() => setFocused(step.id)}
                    onBlur={() => setFocused(null)}
                    onClick={() => toggle(step.id)}
                    onKeyDown={(event) => handleKeyDown(event, index)}
                  >
                    {step.number}
                  </button>
                  <article
                    className="sr6-timeline__copy"
                    onPointerEnter={() => setHovered(step.id)}
                    onPointerLeave={() => setHovered(null)}
                  >
                    <h3>
                      <span className="sr6-timeline__title-icon" aria-hidden="true">
                        <StepIcon aria-hidden="true" focusable="false" />
                      </span>
                      <span>{step.title}</span>
                    </h3>
                    <p id={`${uid}-sr6-desc-${step.id}`}>{step.description}</p>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
