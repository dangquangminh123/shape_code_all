'use client';

import { useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { ls4Steps, type Ls4Step } from './ls4-ladder-steps.config';
import './ls4-ladder-steps.css';

export interface Ls4LadderStepsProps {
  headerTitle?: string;
  headerSubtitle?: string;
  className?: string;
  onSelectStep?: (step: Ls4Step | null) => void;
}

type Ls4StepStyle = CSSProperties & { [key: `--ls4-${string}`]: string };

function getStepStyle(step: Ls4Step): Ls4StepStyle {
  return {
    '--ls4-left': `${step.coords.leftPercent}%`,
    '--ls4-top': `${step.coords.topPercent}%`,
    '--ls4-icon-box': step.colors.iconBox,
    '--ls4-text-box': step.colors.textBox,
    '--ls4-top-icon': step.colors.topIcon,
    '--ls4-top-text': step.colors.topText,
    '--ls4-side-facet': step.colors.sideFacet,
    '--ls4-highlight': step.colors.highlight,
    '--ls4-ink': step.colors.ink,
    zIndex: 5 - step.stepNumber,
  };
}

export default function Ls4LadderSteps({
  headerTitle = 'Nấc thang tăng trưởng',
  headerSubtitle = 'Bốn chặng đưa sản phẩm từ ý tưởng đến tăng trưởng bền vững',
  className = '',
  onSelectStep,
}: Ls4LadderStepsProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function handleSelect(index: number) {
    setSelected((current) => {
      const next = current === index ? null : index;
      onSelectStep?.(next !== null ? ls4Steps[next] : null);
      return next;
    });
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | null = null;

    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      nextIndex = (index + 1) % ls4Steps.length;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      nextIndex = (index + ls4Steps.length - 1) % ls4Steps.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = ls4Steps.length - 1;
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setSelected(null);
      onSelectStep?.(null);
      return;
    }

    if (nextIndex !== null) {
      event.preventDefault();
      buttonRefs.current[nextIndex]?.focus();
    }
  }

  return (
    <section
      className={`ls4-module ${className}`.trim()}
      aria-label="Nấc thang tăng trưởng — bốn chặng phát triển sản phẩm"
    >
      <div className="ls4-artwork">
        {/* Header Title Lockup */}
        <header className="ls4-header">
          <h2 className="ls4-header__title">{headerTitle}</h2>
          <p className="ls4-header__subtitle">{headerSubtitle}</p>
        </header>

        {/* 4-Step Isometric Staircase */}
        <ol className="ls4-staircase" aria-label="Bốn chặng phát triển sản phẩm">
          {ls4Steps.map((step, index) => {
            const Icon = step.icon;
            const isSelected = selected === index;

            return (
              <li
                key={step.id}
                className={`ls4-step${isSelected ? ' is-selected' : ''}`}
                style={getStepStyle(step)}
              >
                {/* 3D Isometric Facets */}
                <div className="ls4-step__block" aria-hidden="true">
                  <span className="ls4-facet ls4-facet--top-icon" />
                  <span className="ls4-facet ls4-facet--top-text" />
                  <span className="ls4-facet ls4-facet--side" />
                  <span className="ls4-facet ls4-facet--front-icon" />
                  <span className="ls4-facet ls4-facet--front-text" />
                  <span className="ls4-step__badge">{step.label}</span>
                </div>

                {/* Accessible Interactive Control */}
                <button
                  type="button"
                  className="ls4-control"
                  aria-label={`Bậc ${step.stepNumber}. ${step.title}: ${step.description} ${step.detail}`}
                  aria-pressed={isSelected}
                  onClick={() => handleSelect(index)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                  ref={(node) => {
                    buttonRefs.current[index] = node;
                  }}
                >
                  <span className="ls4-step__icon-box" aria-hidden="true">
                    <span className="ls4-step__icon-circle">
                      <Icon />
                    </span>
                  </span>
                  <span className="ls4-step__text">
                    <span className="ls4-step__description">{step.description}</span>
                    <span className="ls4-step__detail" aria-hidden="true">
                      {step.detail}
                    </span>
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
