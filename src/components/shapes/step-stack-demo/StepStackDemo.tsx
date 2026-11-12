'use client';

import React, { useId, useState } from 'react';
import './step-stack-demo.css';
import {
  STEP_STACK_LEVELS,
  STEP_STACK_CONTENTS,
  type BaseColorVariant,
} from './step-stack-demo.config';

export interface StepStackDemoProps {
  showControls?: boolean;
  initialBaseVariant?: BaseColorVariant;
}

export default function StepStackDemo({
  showControls = true,
  initialBaseVariant = 'steel-blue',
}: StepStackDemoProps) {
  const instanceId = useId();
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [focusedStep, setFocusedStep] = useState<number | null>(null);
  const [baseVariant, setBaseVariant] = useState<BaseColorVariant>(initialBaseVariant);
  const activeStep = hoveredStep ?? focusedStep;

  const interactionProps = (step: number) => ({
    onMouseEnter: () => setHoveredStep(step),
    onMouseLeave: () => setHoveredStep(null),
    onFocus: () => setFocusedStep(step),
    onBlur: () => setFocusedStep(null),
  });

  return (
    <div className="ssd-wrapper">
      {showControls && (
        <div className="ssd-ConfigBar">
          <div className="ssd-ConfigGroup">
            <span className="ssd-ConfigLabel">Màu tầng 3 (Base):</span>
            <div className="ssd-BtnGroup">
              <button
                type="button"
                onClick={() => setBaseVariant('steel-blue')}
                aria-pressed={baseVariant === 'steel-blue'}
                className={`ssd-ConfigBtn ${baseVariant === 'steel-blue' ? 'is-selected' : ''}`}
              >
                Điểm Xanh Dương (Steel Blue)
              </button>
              <button
                type="button"
                onClick={() => setBaseVariant('silver')}
                aria-pressed={baseVariant === 'silver'}
                className={`ssd-ConfigBtn ${baseVariant === 'silver' ? 'is-selected' : ''}`}
              >
                Trắng Bạc (Silver)
              </button>
            </div>
          </div>

          <p className="ssd-AssetNote">Dùng 3 SVG mới: ssd-stack-top / mid / base.</p>
        </div>
      )}

      <div
        className={`step-stack-demo ${baseVariant === 'silver' ? 'ssd-base-silver' : ''}`}
      >
        <div className="ssd-inner">
          <div className="ssd-stack" aria-label="3 tầng phát triển">
            {STEP_STACK_LEVELS.map((item) => {
              const isActive = activeStep === item.step;
              return (
                <div
                  key={item.step}
                  className={`ssd-level ${item.levelClass} ${isActive ? 'is-active' : ''}`}
                  data-step={item.step}
                  role="img"
                  tabIndex={0}
                  aria-label={item.ariaLabel}
                  aria-describedby={STEP_STACK_CONTENTS.some((box) => box.step === item.step)
                    ? `${instanceId}-content-${item.step}`
                    : undefined}
                  {...interactionProps(item.step)}
                >
                  <span className="ssd-shape-stroke" aria-hidden="true" />
                  <span className="ssd-shape-fill" aria-hidden="true" />
                  <div className="ssd-shape-content" aria-hidden="true">
                    <span className="ssd-no">{item.numberLabel}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="ssd-content-col">
            {STEP_STACK_CONTENTS.map((box) => {
              const isActive = activeStep === box.step;
              return (
                <article
                  key={box.step}
                  className={`ssd-content-box ${box.contentClass} ${isActive ? 'is-active' : ''}`}
                  data-step={box.step}
                  tabIndex={0}
                  aria-labelledby={`${instanceId}-title-${box.step}`}
                  {...interactionProps(box.step)}
                >
                  <h3 id={`${instanceId}-title-${box.step}`}>{box.title}</h3>
                  <p id={`${instanceId}-content-${box.step}`}>{box.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
