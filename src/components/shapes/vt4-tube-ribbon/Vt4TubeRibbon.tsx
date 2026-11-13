'use client';

import { useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import type { IconType } from 'react-icons';
import {
  FaHeartPulse,
  FaPumpSoap,
  FaSeedling,
  FaUserShield,
} from 'react-icons/fa6';
import { LuChevronRight, LuSparkles } from 'react-icons/lu';
import {
  VT4_ASSET_BASE,
  VT4_MASK_FILES,
  VT4_OPTIONS,
  type Vt4IconName,
  type Vt4Index,
  type Vt4Masks,
  type Vt4Theme,
} from './vt4-tube-ribbon.config';
import './vt4-tube-ribbon.css';

type Vt4Style = CSSProperties & { [key: `--vt4-${string}`]: string };

const VT4_ICONS: Record<Vt4IconName, IconType> = {
  droplet: FaPumpSoap,
  leaf: FaSeedling,
  sparkles: FaHeartPulse,
  shield: FaUserShield,
};

interface Vt4Props {
  masks?: Vt4Masks;
  theme?: Vt4Theme;
}

export default function Vt4TubeRibbon({ masks = {}, theme = 'colorful' }: Vt4Props) {
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [selected, setSelected] = useState<Vt4Index | null>(null);
  const [statusText, setStatusText] = useState('');

  const isSilverRed = theme === 'silver-red';
  const style: Vt4Style = {
    '--vt4-mask-tube-body': `url("${masks.tubeBody ?? `${VT4_ASSET_BASE}/${VT4_MASK_FILES.tubeBody}`}")`,
    '--vt4-mask-tube-foil': `url("${masks.tubeFoil ?? `${VT4_ASSET_BASE}/${VT4_MASK_FILES.tubeFoil}`}")`,
    '--vt4-mask-tube-rim': `url("${masks.tubeRim ?? `${VT4_ASSET_BASE}/${VT4_MASK_FILES.tubeRim}`}")`,
    '--vt4-mask-tube-cap': `url("${masks.tubeCap ?? `${VT4_ASSET_BASE}/${VT4_MASK_FILES.tubeCap}`}")`,
    '--vt4-mask-ribbon-face': `url("${masks.ribbonFace ?? `${VT4_ASSET_BASE}/${VT4_MASK_FILES.ribbonFace}`}")`,
    '--vt4-mask-ribbon-bevel': `url("${masks.ribbonBevel ?? `${VT4_ASSET_BASE}/${VT4_MASK_FILES.ribbonBevel}`}")`,
  };

  function toggleOption(index: Vt4Index) {
    const next = selected === index ? null : index;
    setSelected(next);
    if (next) {
      const item = VT4_OPTIONS.find(opt => opt.index === next);
      setStatusText(item ? `Đã chọn: ${item.title}` : '');
    } else {
      setStatusText('Đã bỏ chọn phiên bản.');
    }
  }

  function clearSelection() {
    setSelected(null);
    setStatusText('Đã bỏ chọn phiên bản.');
  }

  function handleOptionKeyDown(event: KeyboardEvent<HTMLButtonElement>, idx: number) {
    const total = VT4_OPTIONS.length;
    const nextIdx =
      event.key === 'ArrowDown' || event.key === 'ArrowRight'
        ? (idx + 1) % total
        : event.key === 'ArrowUp' || event.key === 'ArrowLeft'
          ? (idx + total - 1) % total
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? total - 1
              : null;

    if (nextIdx !== null) {
      event.preventDefault();
      buttonsRef.current[nextIdx]?.focus();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      clearSelection();
      event.currentTarget.blur();
    }
  }

  return (
    <section
      className={`vt4 ${isSilverRed ? 'vt4--silver-red' : 'vt4--colorful'}`}
      data-vt4=""
      data-vt4-ready="1"
      data-vt4-selected={selected ?? ''}
      aria-label="Bốn lựa chọn sản phẩm"
      style={style}
    >
      <div className="vt4__stage">
        <div className="vt4__tube" aria-hidden="true">
          <span className="vt4__tube-silver" />
          <span className="vt4__tube-foil" />
          <span className="vt4__tube-rim" />
          <span className="vt4__tube-cap" />
          <div className="vt4__tube-label">
            <LuSparkles className="vt4__tube-emblem" aria-hidden="true" focusable="false" />
            <span className="vt4__tube-brand">BRAND</span>
            <span className="vt4__tube-caption">PRODUCT OPTIONS</span>
          </div>
        </div>

        <div className="vt4__options" role="group" aria-label="Các phiên bản sản phẩm">
          {VT4_OPTIONS.map((item, idx) => {
            const Icon = VT4_ICONS[item.icon];
            const isSelected = selected === item.index;
            return (
              <button
                key={item.index}
                ref={el => {
                  buttonsRef.current[idx] = el;
                }}
                className={`vt4__option${isSelected ? ' is-selected' : ''}`}
                type="button"
                data-vt4-index={item.index}
                aria-pressed={isSelected}
                onClick={() => toggleOption(item.index)}
                onKeyDown={event => handleOptionKeyDown(event, idx)}
              >
                <span className="vt4__option-shadow" aria-hidden="true" />
                <span className="vt4__face vt4__face--stroke" aria-hidden="true" />
                <span className="vt4__face vt4__face--fill" aria-hidden="true" />
                <span className="vt4__bevel vt4__bevel--stroke" aria-hidden="true" />
                <span className="vt4__bevel vt4__bevel--fill" aria-hidden="true" />
                <span className="vt4__option-content">
                  <span className="vt4__option-number">{item.number}</span>
                  <span className="vt4__option-copy">
                    <span className="vt4__option-title">
                      <Icon
                        className="vt4__option-icon"
                        data-vt4-icon={item.icon}
                        aria-hidden="true"
                        focusable="false"
                      />
                      <span>{item.title}</span>
                    </span>
                    <span className="vt4__option-sub">{item.subtitle}</span>
                  </span>
                  <LuChevronRight className="vt4__option-chevron" aria-hidden="true" focusable="false" />
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <span className="vt4__screenreader" data-vt4-status="" role="status" aria-live="polite">
        {statusText}
      </span>
    </section>
  );
}
