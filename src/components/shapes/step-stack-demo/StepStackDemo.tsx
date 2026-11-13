'use client';

import React, { useId, useState } from 'react';
import type { IconType } from 'react-icons';
import { LuCompass, LuLayers, LuRocket } from 'react-icons/lu';
import './step-stack-demo.css';
import {
  STEP_STACK_LEVELS,
  STEP_STACK_CONTENTS,
  type StepStackIconKey,
} from './step-stack-demo.config';

const SSD_ICONS: Record<StepStackIconKey, IconType> = {
  compass: LuCompass,
  rocket: LuRocket,
  layers: LuLayers,
};

export default function StepStackDemo() {
  const instanceId = useId();
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [focusedStep, setFocusedStep] = useState<number | null>(null);
  const activeStep = hoveredStep ?? focusedStep;

  const interactionProps = (step: number) => ({
    onMouseEnter: () => setHoveredStep(step),
    onMouseLeave: () => setHoveredStep(null),
    onFocus: () => setFocusedStep(step),
    onBlur: () => setFocusedStep(null),
  });

  return (
    <div className="ssd-wrapper">
      <div className="step-stack-demo">
        <div className="ssd-inner">
          <div className="ssd-stack" aria-label="3 tầng phát triển">
            {STEP_STACK_LEVELS.map((item) => {
              const isActive = activeStep === item.step;
              const LevelIcon = SSD_ICONS[item.icon];
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
                    <LevelIcon className="ssd-level-icon" data-ssd-icon={item.icon} aria-hidden="true" focusable="false" />
                    <span className="ssd-no">{item.numberLabel}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="ssd-content-col">
            {STEP_STACK_CONTENTS.map((box) => {
              const isActive = activeStep === box.step;
              const ContentIcon = SSD_ICONS[box.icon];
              return (
                <article
                  key={box.step}
                  className={`ssd-content-box ${box.contentClass} ${isActive ? 'is-active' : ''}`}
                  data-step={box.step}
                  tabIndex={0}
                  aria-labelledby={`${instanceId}-title-${box.step}`}
                  {...interactionProps(box.step)}
                >
                  <h3 id={`${instanceId}-title-${box.step}`}>
                    <span className="ssd-title-badge" aria-hidden="true">
                      <ContentIcon className="ssd-title-icon" data-ssd-content-icon={box.icon} aria-hidden="true" focusable="false" />
                    </span>
                    <span>{box.title}</span>
                  </h3>
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
