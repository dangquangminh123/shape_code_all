#!/usr/bin/env python3
"""Build WH9 masks and geometry directly from the 7 original Illustrator SVGs.

Strict 1-to-1 mapping with reference 27.jpg:
  01 <- wh9-source-sector-01.svg (shape 1.svg, top yellow)
  02 <- wh9-source-sector-02.svg (shape 2.svg, top-right orange)
  03 <- wh9-source-sector-03.svg (shape 3.svg, bottom-right red-orange)
  04 <- wh9-source-sector-04.svg (shape 4.svg, bottom blue V-cradle)
  05 <- wh9-source-sector-05.svg (shape 5.svg, bottom-left teal)
  06 <- wh9-source-sector-06.svg (shape 6.svg, top-left lime)
  07 <- wh9-source-heart-07.svg  (shape 7.svg, center heart)
"""
from __future__ import annotations

import json
import re
from pathlib import Path
from xml.etree import ElementTree as ET

ROOT = Path(__file__).resolve().parent.parent
ASSET = ROOT / 'public/assets/shapes/wh9-heart-ring'
SRC = ASSET / 'source-original'
COMP = ROOT / 'src/components/shapes/wh9-heart-ring'
CX = CY = 320.0
RADIUS = 280.0

CX_REF, CY_REF = 305.85, 284.43
G_STAGE = 281.2 / 202.04

SECTOR_REF_PARAMS = [
    ('wh9-source-sector-01.svg', 0.073798, 150.72, 61.35),
    ('wh9-source-sector-02.svg', 0.079907, 250.32, 95.41),
    ('wh9-source-sector-03.svg', 0.095389, 241.21, 233.77),
    ('wh9-source-sector-04.svg', 0.073374, 160.17, 323.04),
    ('wh9-source-sector-05.svg', 0.078679, 42.79, 278.52),
    ('wh9-source-sector-06.svg', 0.094385, -25.81, 93.43),
]

HEART_SX_REF, HEART_SY_REF = 0.08056, 0.09065
HEART_TX_REF = 305.45 - 2000.0 * HEART_SX_REF
HEART_TY_REF = 201.8 - 264.0 * HEART_SY_REF


def fmt(val: float) -> str:
    s = f'{val:.2f}'.rstrip('0').rstrip('.')
    return '0' if s in ('', '-0') else s


def extract_path_d(svg_file: Path) -> str:
    assert svg_file.exists(), f'Missing source SVG: {svg_file}'
    for el in ET.parse(svg_file).getroot().iter():
        if el.tag.endswith('path') and 'd' in el.attrib:
            return el.attrib['d']
    raise RuntimeError(f'No <path> in {svg_file}')


def transform_path(d: str, sx: float, sy: float, tx: float, ty: float) -> str:
    tokens = re.findall(r'[MmLlCcZz]|[-+]?\d*\.?\d+', d)
    out: list[str] = []
    i = 0
    cx = cy = x0 = y0 = 0.0
    cmd = ''

    def mp(x: float, y: float) -> str:
        return f'{fmt(tx + x * sx)} {fmt(ty + y * sy)}'

    while i < len(tokens):
        t = tokens[i]
        if re.match(r'^[A-Za-z]$', t):
            cmd = t
            i += 1
            if cmd in ('Z', 'z'):
                out.append('Z')
                cx, cy = x0, y0
            continue
        if cmd in ('M', 'm'):
            cx = float(tokens[i]) + (cx if cmd == 'm' else 0.0)
            cy = float(tokens[i + 1]) + (cy if cmd == 'm' else 0.0)
            x0, y0 = cx, cy
            out.append(f'M {mp(cx, cy)}')
            i += 2
            cmd = 'l' if cmd == 'm' else 'L'
        elif cmd in ('L', 'l'):
            cx = float(tokens[i]) + (cx if cmd == 'l' else 0.0)
            cy = float(tokens[i + 1]) + (cy if cmd == 'l' else 0.0)
            out.append(f'L {mp(cx, cy)}')
            i += 2
        elif cmd in ('C', 'c'):
            v = [float(tokens[i + k]) for k in range(6)]
            x1, y1 = (cx + v[0], cy + v[1]) if cmd == 'c' else (v[0], v[1])
            x2, y2 = (cx + v[2], cy + v[3]) if cmd == 'c' else (v[2], v[3])
            x3, y3 = (cx + v[4], cy + v[5]) if cmd == 'c' else (v[4], v[5])
            out.append(f'C {mp(x1, y1)} {mp(x2, y2)} {mp(x3, y3)}')
            cx, cy = x3, y3
            i += 6
        else:
            raise ValueError(f'Unsupported SVG command {cmd!r}')
    return ' '.join(out)


def to_stage(tx_ref: float, ty_ref: float) -> tuple[float, float]:
    return CX + (tx_ref - CX_REF) * G_STAGE, CY + (ty_ref - CY_REF) * G_STAGE


paths: list[str] = []
sources: list[str] = []
for name, s_ref, tx_ref, ty_ref in SECTOR_REF_PARAMS:
    s = s_ref * G_STAGE
    tx, ty = to_stage(tx_ref, ty_ref)
    paths.append(transform_path(extract_path_d(SRC / name), s, s, tx, ty))
    sources.append(name)

hsx, hsy = HEART_SX_REF * G_STAGE, HEART_SY_REF * G_STAGE
htx, hty = to_stage(HEART_TX_REF, HEART_TY_REF)
heart_path = transform_path(extract_path_d(SRC / 'wh9-source-heart-07.svg'), hsx, hsy, htx, hty)
heart_transform = 'matrix(1 0 0 1 0 0)'

geometry = {
    'viewBox': '0 0 640 640',
    'center': [CX, CY],
    'radius': RADIUS,
    'sources': sources,
    'paths': paths,
    'heart': {
        'source': 'wh9-source-heart-07.svg',
        'path': heart_path,
        'transform': heart_transform,
    },
}

COMP.mkdir(parents=True, exist_ok=True)
ASSET.mkdir(parents=True, exist_ok=True)
(COMP / 'wh9-heart-ring.geometry.json').write_text(
    json.dumps(geometry, indent=2, ensure_ascii=False) + '\n',
    encoding='utf-8',
)

for idx, d in enumerate(paths, 1):
    mask_svg = (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">'
        '<defs><clipPath id="wh9-outer-clip"><circle cx="320" cy="320" r="280"/></clipPath></defs>'
        f'<path clip-path="url(#wh9-outer-clip)" fill="#ffffff" d="{d}"/>'
        '</svg>\n'
    )
    (ASSET / f'wh9-sector-mask-{idx:02d}.svg').write_text(mask_svg, encoding='utf-8')

heart_svg = (
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">'
    f'<path d="{heart_path}" transform="{heart_transform}" fill="#f1f4f9" stroke="#ea1d63" stroke-width="10.2" stroke-linejoin="miter" stroke-miterlimit="6"/>'
    '</svg>\n'
)
(ASSET / 'wh9-heart-core.svg').write_text(heart_svg, encoding='utf-8')
print('Generated 6 authentic sector masks, 1 authentic heart core, and shared geometry JSON')
