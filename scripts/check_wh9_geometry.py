#!/usr/bin/env python3
"""WH9 structural & clockwise-order validation using the Python standard library."""
import json
import math
import re
from pathlib import Path
from xml.etree import ElementTree as ET

R = Path(__file__).resolve().parent.parent
A = R / 'public/assets/shapes/wh9-heart-ring'
C = R / 'src/components/shapes/wh9-heart-ring'

g = json.loads((C / 'wh9-heart-ring.geometry.json').read_text(encoding='utf-8'))
assert g['viewBox'] == '0 0 640 640'
assert len(g['paths']) == 6
assert g['radius'] == 280
assert g['sources'] == [f'wh9-source-sector-0{i}.svg' for i in range(1, 7)]
assert g['heart']['source'] == 'wh9-source-heart-07.svg'


def path_centroid(d: str) -> tuple[float, float]:
    nums = [float(v) for v in re.findall(r'[-+]?\d*\.?\d+', d)]
    xs, ys = nums[0::2], nums[1::2]
    return sum(xs) / len(xs), sum(ys) / len(ys)


expected_quadrants = [
    (-115, -65),
    (-55, -5),
    (5, 55),
    (65, 115),
    (125, 175),
    (-175, -125),
]

for i, p in enumerate(g['paths'], 1):
    f = A / f'wh9-sector-mask-{i:02d}.svg'
    root = ET.parse(f).getroot()
    assert root.attrib['viewBox'] == g['viewBox']
    path = next((el for el in root.iter() if el.tag.endswith('path')), None)
    assert path is not None and path.attrib['d'] == p, f
    cx, cy = path_centroid(p)
    deg = math.degrees(math.atan2(cy - 320.0, cx - 320.0))
    lo, hi = expected_quadrants[i - 1]
    assert lo <= deg <= hi, f'Sector {i:02d} angle {deg:.1f} outside [{lo}, {hi}]'
    print(f'PASS: {f.name} matches geometry.json and sits at {deg:.1f} deg ({g["sources"][i - 1]})')

heart = ET.parse(A / 'wh9-heart-core.svg').getroot()
assert heart.attrib['viewBox'] == g['viewBox']
heart_paths = [el for el in heart.iter() if el.tag.endswith('path')]
assert len(heart_paths) >= 1
for hp in heart_paths:
    assert hp.attrib['d'] == g['heart']['path']
    assert hp.attrib['transform'] == g['heart']['transform']

assert len(list((A / 'source-original').glob('*.svg'))) == 7
print('PASS: 6 authentic sector masks + center heart in exact 01..06 clockwise order verified')
