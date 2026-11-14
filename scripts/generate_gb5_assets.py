#!/usr/bin/env python3
"""Build GB5 Gift Boxes SVG assets and shared geometry from Illustrator SVGs."""
from __future__ import annotations
import json, math, re
from pathlib import Path
from xml.etree import ElementTree as ET

ROOT = Path(__file__).resolve().parent.parent
ASSET = ROOT / 'public/assets/shapes/gb5-gift-boxes'
SRC = ASSET / 'source-original'
COMP = ROOT / 'src/components/shapes/gb5-gift-boxes'

VIEWBOX = '0 0 360 420'
SX_BOX, SY_BOX = 302.0 / 2040.24, 279.0 / 1933.30
TX_BOX, TY_BOX = 180.0 - 2072.68 * SX_BOX, 113.0 - 283.40 * SY_BOX
SX_BOW, SY_BOW = 281.0 / 2536.30, 213.0 / 1914.20
TX_BOW, TY_BOW = 180.0 - 2072.95 * SX_BOW, 20.0 - 457.90 * SY_BOW

def fmt(val: float) -> str:
    s = f'{val:.2f}'.rstrip('0').rstrip('.')
    return '0' if s in ('', '-0') else s

def extract_paths(svg_file: Path) -> list[str]:
    return [el.attrib['d'] for el in ET.parse(svg_file).getroot().iter() if el.tag.endswith('path') and 'd' in el.attrib and el.attrib.get('class') != 'st0']

def parse_segs(d: str, sx: float, sy: float, tx: float, ty: float):
    # These Illustrator sources use move/cubic/close only. Fail explicitly if
    # the inputs change rather than skipping commands or looping forever.
    unsupported = set(re.findall(r'[A-Za-z]', d)) - set('MmCcZz')
    if unsupported:
        raise ValueError(f'Unsupported source path commands: {sorted(unsupported)}')
    tokens = re.findall(r'[MmCcZz]|[-+]?\d*\.?\d+', d)
    i = 0; cx = cy = 0.0; cmd = ''; segs = []
    tr = lambda x, y: (tx + x * sx, ty + y * sy)
    while i < len(tokens):
        t = tokens[i]
        if re.match(r'^[A-Za-z]$', t):
            cmd = t; i += 1; continue
        if cmd in ('M', 'm'):
            cx = float(tokens[i]) + (cx if cmd == 'm' else 0.0)
            cy = float(tokens[i + 1]) + (cy if cmd == 'm' else 0.0)
            i += 2; cmd = 'l' if cmd == 'm' else 'L'
        elif cmd in ('C', 'c'):
            v = [float(tokens[i + k]) for k in range(6)]
            x1, y1 = (cx + v[0], cy + v[1]) if cmd == 'c' else (v[0], v[1])
            x2, y2 = (cx + v[2], cy + v[3]) if cmd == 'c' else (v[2], v[3])
            x3, y3 = (cx + v[4], cy + v[5]) if cmd == 'c' else (v[4], v[5])
            segs.append((tr(cx, cy), tr(x1, y1), tr(x2, y2), tr(x3, y3)))
            cx, cy = x3, y3; i += 6
        else:
            raise ValueError(f'Unexpected coordinate after source command {cmd!r}')
    return segs

def segs_to_d(segs, close: bool = True) -> str:
    x0, y0 = segs[0][0]
    out = [f'M {fmt(x0)} {fmt(y0)}']
    for _, (x1, y1), (x2, y2), (x3, y3) in segs:
        out.append(f'C {fmt(x1)} {fmt(y1)} {fmt(x2)} {fmt(y2)} {fmt(x3)} {fmt(y3)}')
    if close:
        out.append('Z')
    return ' '.join(out)

box_segs = parse_segs(extract_paths(SRC / 'gb5-source-box-01.svg')[0], SX_BOX, SY_BOX, TX_BOX, TY_BOX)
bow_segs = parse_segs(extract_paths(SRC / 'gb5-source-bow-02.svg')[-1], SX_BOW, SY_BOW, TX_BOW, TY_BOW)

box_silhouette_path = segs_to_d(box_segs)
bow_ribbon_path = segs_to_d(bow_segs)
lid_left_up = ' '.join(f'C {fmt(x1)} {fmt(y1)} {fmt(x2)} {fmt(y2)} {fmt(x3)} {fmt(y3)}' for _, (x1, y1), (x2, y2), (x3, y3) in box_segs[21:27])
box_lid_path = f'{segs_to_d(box_segs[0:9], False)} C 320.8 190.2 316.5 190.48 308 190.48 L 40.29 190.48 {lid_left_up} Z'
box_body_path = f'{segs_to_d(box_segs[10:20], False)} L 42.11 186 L 320.34 186 L 320.34 192.11 Z'
bow_left_fold = 'M 49.5 117.5 C 55.5 98.5 72.5 88.2 93.5 88.6 C 116.5 89 139.5 96.5 158.5 109.5 L 158.5 125 L 48 125 Z'
bow_right_fold = 'M 310.5 117.5 C 304.5 98.5 287.5 88.2 266.5 88.6 C 243.5 89 220.5 96.5 201.5 109.5 L 201.5 125 L 312 125 Z'
bow_knot_path = 'M 157.2 55.2 C 162.5 58.6 168 59.1 175.8 58.9 C 183.6 58.9 191.5 59.5 201.8 55.2 C 205.2 72 205.6 96 202 114.8 C 193 113.2 185 114.9 177.8 114.9 C 170 114.9 163.5 113.2 157.2 114.4 C 153.6 96 154 72 157.2 55.2 Z'

arms = []
for k in range(8):
    ang = k * math.pi / 4.0
    ca, sa = math.cos(ang), math.sin(ang)
    rot = lambda px, py: f'{fmt(100.0 + px * ca - py * sa)} {fmt(100.0 + px * sa + py * ca)}'
    arms.extend([
        f'M {rot(0, 0)} L {rot(0, -86)}',
        f'M {rot(-14, -46)} L {rot(0, -32)} L {rot(14, -46)}',
        f'M {rot(-18, -68)} L {rot(0, -52)} L {rot(18, -68)}',
    ])
    # Rounded branch tips echo the soft, ornamental snowflakes in the reference.
    for px, py in [(0, -86), (-14, -46), (14, -46), (-18, -68), (18, -68)]:
        arms.append(f'M {rot(px, py)} m -2.5 0 a 2.5 2.5 0 1 0 5 0 a 2.5 2.5 0 1 0 -5 0')
snowflake_path = ' '.join(arms)

ASSET.mkdir(parents=True, exist_ok=True)
COMP.mkdir(parents=True, exist_ok=True)

for fname, d_val in [
    ('gb5-box-silhouette-mask.svg', box_silhouette_path),
    ('gb5-box-lid-mask.svg', box_lid_path),
    ('gb5-box-body-mask.svg', box_body_path),
    ('gb5-bow-ribbon-mask.svg', bow_ribbon_path),
]:
    (ASSET / fname).write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{VIEWBOX}"><path fill="#ffffff" d="{d_val}"/></svg>\n', encoding='utf-8')

(ASSET / 'gb5-bow-inner-folds.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{VIEWBOX}"><defs><clipPath id="gb5-bow-clip"><path d="{bow_ribbon_path}"/></clipPath></defs><g clip-path="url(#gb5-bow-clip)" fill="#ffffff"><path d="{bow_left_fold}"/><path d="{bow_right_fold}"/></g></svg>\n', encoding='utf-8')
(ASSET / 'gb5-bow-knot-mask.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{VIEWBOX}"><defs><clipPath id="gb5-knot-clip"><path d="{bow_ribbon_path}"/></clipPath></defs><path clip-path="url(#gb5-knot-clip)" fill="#ffffff" d="{bow_knot_path}"/></svg>\n', encoding='utf-8')
(ASSET / 'gb5-snowflake-ornament.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><path d="{snowflake_path}" fill="none" stroke="#ffffff" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="100" cy="100" r="18" fill="#ffffff"/></svg>\n', encoding='utf-8')
(COMP / 'gb5-gift-boxes.geometry.json').write_text(json.dumps({
    'viewBox': VIEWBOX,
    'sources': ['gb5-source-box-01.svg', 'gb5-source-bow-02.svg'],
    'boxSilhouettePath': box_silhouette_path,
    'boxLidPath': box_lid_path,
    'boxBodyPath': box_body_path,
    'bowRibbonPath': bow_ribbon_path,
    'bowLeftInnerFoldPath': bow_left_fold,
    'bowRightInnerFoldPath': bow_right_fold,
    'bowKnotPath': bow_knot_path,
    'snowflakePath': snowflake_path,
}, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')
print('Generated 7 GB5 SVG assets + shared geometry JSON')
