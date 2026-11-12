import type { Ar5IconName } from './ar5-arrow-ribbon.config';

export default function Ar5Icon({ name }: { name: Ar5IconName }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" focusable="false" data-ar5-icon={name}>
      {name === 'phone' && <>
        <rect x="17" y="5" width="30" height="54" rx="4" fill="#282b3b" />
        <rect x="20" y="12" width="24" height="39" rx="1" fill="#fafbfc" />
        <path d="M28 9h8M29 55h6" stroke="#a6afb9" strokeWidth="2" strokeLinecap="round" />
        <circle cx="32" cy="31" r="9" stroke="#c8cdd0" strokeWidth="5" />
        <path d="M23 31a9 9 0 0 1 9-9" stroke="currentColor" strokeWidth="5" />
      </>}
      {name === 'bulb' && <>
        <path d="M24 45c0-10-9-13-9-24a17 17 0 1 1 34 0c0 11-9 14-9 24Z" fill="currentColor" />
        <path d="M20 20a12 12 0 0 1 20-9M28 43l-4-21 8 5 8-5-4 21" stroke="#fff6ce" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M24 45h16v10H24z" fill="#545865" />
        <path d="M24 48h16M24 52h16" stroke="#959ca5" strokeWidth="2" />
        <path d="M28 55h8v4h-8z" fill="#343b48" />
        <path d="M6 24H2M9 10 6 7M55 10l3-3M58 24h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </>}
      {name === 'analysis' && <>
        <path d="M12 40 8 57h10l5-17" fill="#aeb7bd" />
        <path d="M17 17h12v26H17a13 13 0 0 1 0-26Z" fill="currentColor" />
        <path d="m29 17 17-9v44l-17-9Z" fill="#d6dde0" />
        <ellipse cx="46" cy="30" rx="13" ry="23" fill="#edf0f1" stroke="#253e50" strokeWidth="2.5" />
        <ellipse cx="43" cy="30" rx="6" ry="9" fill="currentColor" />
        <path d="M6 30h23" stroke="#fff" strokeOpacity=".55" strokeWidth="1.5" />
      </>}
      {name === 'search' && <>
        <path d="m27 38-15 21" stroke="#553d33" strokeWidth="8" strokeLinecap="round" />
        <path d="m27 39-13 18" stroke="#ac8063" strokeWidth="3" strokeLinecap="round" />
        <circle cx="38" cy="22" r="17" fill="currentColor" stroke="#254552" strokeWidth="2.5" />
        <circle cx="38" cy="22" r="13.5" stroke="#83e9db" strokeWidth="1.5" />
        <path d="M28 21a10 10 0 0 1 9-9" stroke="#e3fffc" strokeWidth="2.5" strokeLinecap="round" />
      </>}
      {name === 'target' && <>
        <circle cx="30" cy="34" r="23" stroke="currentColor" strokeWidth="3" />
        <circle cx="30" cy="34" r="15" stroke="currentColor" strokeWidth="3" />
        <circle cx="30" cy="34" r="7" fill="currentColor" />
        <path d="M30 5v57M2 34h56" stroke="#425569" strokeWidth="1.8" />
        <path d="m30 34 23-24" stroke="#576270" strokeWidth="3" strokeLinecap="round" />
        <path d="m45 17 1-8 9-7-1 8 8 1-9 8Z" fill="#9aa5ad" />
        <path d="m46 18 9-9" stroke="#eef2f3" strokeWidth="1.5" />
      </>}
    </svg>
  );
}
