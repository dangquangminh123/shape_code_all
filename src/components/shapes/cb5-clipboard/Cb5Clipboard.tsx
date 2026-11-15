'use client';

import { useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import type { IconType } from 'react-icons';
import {
  FaCheck, FaHandPointer, FaHouse, FaLocationDot, FaMagnifyingGlass, FaUser,
} from 'react-icons/fa6';
import './cb5-clipboard.css';

const steps: { title: string; label: string; description: string; icon: IconType; color: string; light: string; dark: string; ink: string }[] = [
  { title: 'ĐỊNH HƯỚNG', label: 'Đồng đội', description: 'Cùng xác định mục tiêu và xây dựng định hướng chung cho hành trình.', icon: FaLocationDot, color: '#e93222', light: '#ff5140', dark: '#ae1b17', ink: '#cf291e' },
  { title: 'KẾT NỐI', label: 'Thành công', description: 'Kết nối ý tưởng, sẻ chia và cùng nhau tạo nên những bước tiến.', icon: FaHouse, color: '#06bbcf', light: '#26d5df', dark: '#00899d', ink: '#007e8f' },
  { title: 'KHÁM PHÁ', label: 'Đổi mới', description: 'Khám phá cơ hội mới và biến những ý tưởng sáng tạo thành hiện thực.', icon: FaMagnifyingGlass, color: '#c8c8be', light: '#e2e1d9', dark: '#a8aa9f', ink: '#686c65' },
  { title: 'SÁNG TẠO', label: 'Sáng tạo', description: 'Chủ động hành động để mỗi ý tưởng trở thành một giải pháp hữu ích.', icon: FaHandPointer, color: '#ffad00', light: '#ffc629', dark: '#df8100', ink: '#9b5900' },
  { title: 'PHÁT TRIỂN', label: 'Phát triển', description: 'Đồng hành và phát triển bền vững bằng những giá trị khác biệt.', icon: FaUser, color: '#3d575a', light: '#5d797b', dark: '#293e41', ink: '#354e50' },
];

const summaries = [
  'Cùng xây dựng định hướng chung.',
  'Kết nối ý tưởng và cùng tiến bước.',
  'Khám phá những cơ hội mới.',
  'Biến ý tưởng thành giải pháp.',
  'Đồng hành, phát triển bền vững.',
];

type Cb5Style = CSSProperties & { [key: `--cb5-${string}`]: string };

function stepStyle(step: typeof steps[number]): Cb5Style {
  return { '--cb5-color': step.color, '--cb5-light': step.light, '--cb5-dark': step.dark, '--cb5-ink': step.ink };
}

export default function Cb5Clipboard() {
  const [selected, setSelected] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [focused, setFocused] = useState<number | null>(null);
  const active = hovered ?? focused ?? selected;
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next = event.key === 'ArrowDown' ? (index + 1) % steps.length
      : event.key === 'ArrowUp' ? (index + steps.length - 1) % steps.length
      : event.key === 'Home' ? 0 : event.key === 'End' ? steps.length - 1 : null;
    if (next !== null) {
      event.preventDefault();
      setHovered(null);
      refs.current[next]?.focus();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setSelected(null);
      setHovered(null);
    }
  }

  return (
    <section className="cb5-module" aria-label="Bảng kẹp & năm bước phát triển">
      <div className="cb5-artwork">
        <div className="cb5-stage">
          <div className="cb5-rails" role="group" aria-label="Năm bước phát triển">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <button
                  key={step.title}
                  type="button"
                  className={`cb5-row${active === index ? ' is-active' : ''}`}
                  style={stepStyle(step)}
                  aria-label={`${String(index + 1).padStart(2, '0')}. ${step.title}: ${step.description}`}
                  aria-pressed={selected === index}
                  onClick={() => setSelected(current => current === index ? null : index)}
                  onPointerEnter={event => { if (event.pointerType !== 'touch') setHovered(index); }}
                  onPointerLeave={() => setHovered(null)}
                  onFocus={() => setFocused(index)}
                  onBlur={() => setFocused(null)}
                  ref={node => { refs.current[index] = node; }}
                  onKeyDown={event => handleKeyDown(event, index)}
                >
                  <span className="cb5-row__shape" aria-hidden="true" />
                  <span className="cb5-row__icon" aria-hidden="true"><Icon /></span>
                  <span className="cb5-row__copy" aria-hidden="true">
                    <strong>{step.title}</strong>
                    <span className="cb5-row__description">{step.description}</span>
                    <span className="cb5-row__summary">{summaries[index]}</span>
                  </span>
                  <span className="cb5-row__number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                </button>
              );
            })}
          </div>
          <div className="cb5-board" aria-label="Danh sách giá trị">
            <div className="cb5-board__surface" aria-hidden="true" />
            <div className="cb5-board__bands" aria-hidden="true">
              {steps.map(step => <span key={step.title} style={stepStyle(step)} />)}
            </div>
            <div className="cb5-paper" aria-hidden="true" />
            <div className="cb5-clip" aria-hidden="true"><div className="cb5-clip__metal" /><div className="cb5-clip__hole" /></div>
            <ul className="cb5-checklist">
              {steps.map((step, index) => (
                <li key={step.label} className={active === index ? 'is-active' : ''} style={stepStyle(step)}>
                  <span className="cb5-checklist__box" aria-hidden="true"><FaCheck /></span>
                  <span>{step.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
