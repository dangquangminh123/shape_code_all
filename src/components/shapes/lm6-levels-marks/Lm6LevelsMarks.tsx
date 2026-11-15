'use client';

import { useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { FaCircle } from 'react-icons/fa6';
import { lm6Stages, type Lm6Stage } from './lm6-levels-marks.config';
import './lm6-levels-marks.css';

type Lm6Style = CSSProperties & { [key: `--lm6-${string}`]: string };
function stageStyle(stage: Lm6Stage, index: number): Lm6Style {
  return {
    '--lm6-light': stage.light, '--lm6-shade': stage.shade, '--lm6-ink': stage.ink,
    '--lm6-x': `${stage.x / 960 * 100}%`, '--lm6-caption-x': `${stage.captionX / 960 * 100}%`,
    zIndex: lm6Stages.length - index,
  };
}

export default function Lm6LevelsMarks() {
  const [selected, setSelected] = useState<number | null>(null);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next = event.key === 'ArrowRight' ? (index + 1) % lm6Stages.length
      : event.key === 'ArrowLeft' ? (index + lm6Stages.length - 1) % lm6Stages.length
      : event.key === 'Home' ? 0 : event.key === 'End' ? lm6Stages.length - 1 : null;
    if (next !== null) {
      event.preventDefault();
      refs.current[next]?.focus();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setSelected(null);
    }
  }

  return (
    <section className="lm6-module" aria-label="Cấp độ và cột mốc — sáu giai đoạn">
      <div className="lm6-artwork">
        <h2 className="lm6-heading">Cấp độ &amp; cột mốc <span>– 6 giai đoạn</span></h2>
        <ol className="lm6-stages" aria-label="Sáu giai đoạn phát triển">
          {lm6Stages.map((stage, index) => (
            <li key={stage.title} className={`lm6-stage${selected === index ? ' is-selected' : ''}`} style={stageStyle(stage, index)}>
              <div className="lm6-arrow" aria-hidden="true">
                <span className="lm6-surface lm6-surface--front" />
                <span className="lm6-surface lm6-surface--top" />
                <span className="lm6-surface lm6-surface--side" />
                <span className="lm6-surface lm6-surface--edge" />
              </div>
              <button
                type="button" className="lm6-control"
                aria-label={`Giai đoạn ${index + 1}. ${stage.title}: ${stage.points.join(' ')}`}
                aria-pressed={selected === index}
                onClick={() => setSelected(current => current === index ? null : index)}
                onKeyDown={event => handleKeyDown(event, index)}
                ref={node => { refs.current[index] = node; }}
              >
                <strong className="lm6-number" aria-hidden="true">{index + 1}</strong>
              </button>
              <div className="lm6-reflection" aria-hidden="true">
                <span className="lm6-reflection__number">{index + 1}</span>
              </div>
              <div className="lm6-caption">
                <h3>{stage.title}</h3>
                <ul>
                  {stage.points.map((point, i) => (
                    <li key={point}>
                      <FaCircle aria-hidden="true" focusable="false" />
                      <span className="lm6-caption__full">{point}</span>
                      <span className="lm6-caption__short" aria-hidden="true">{stage.summaries[i]}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
