/** SHAPE AUTO MOTION v1.0.0 — native WAAPI, no geometry/CSS/React mutations. */
(function () {
  'use strict';
  if (typeof window === 'undefined' || window.__shapeAutoMotion) return;

  const track = (selector, count, effect, delay = 0, stagger = 100, duration = 750, reverse = false) =>
    ({ selector, count, effect, delay, stagger, duration, reverse });
  const idle = (selector, count, effect, duration = 4200) => ({ selector, count, effect, duration });
  const recipe = (id, root, name, tracks, rest) => ({ id, root, name, tracks, idle: rest });
  // Radial fills reveal in-place: art never separates from its independent SVG hitmap.
  const RECIPES = [
    recipe('step-stack-demo', '.ssd-wrapper', 'Bottom-up stack, overshoot, trailing copy', [
      track('.ssd-level', 3, 'stack', 0, 150, 850, true),
      track('.ssd-shape-content', 3, 'pop', 300, 150, 500, true),
      track('.ssd-content-box', 2, 'right', 550, 180, 700),
    ], idle('.ssd-level-icon', 3, 'float')),
    recipe('ar5-arrow-ribbon', '.ar5-module', 'Arrow flight, medallion stamp, numbered tabs', [
      track('.ar5-row', 5, 'shoot', 0, 130, 780),
      track('.ar5-medallion', 5, 'pop', 330, 130, 580),
      track('.ar5-tab', 5, 'unfold', 500, 130, 600),
    ], idle('.ar5-medallion-icon', 5, 'sway')),
    recipe('hfr6-heartwheel', '.hfr6', 'Clockwise sector reveal and double heartbeat', [
      track('.hfr6-sector__surface', 6, 'sector', 0, 130, 850),
      track('.hfr6-sector__content', 6, 'fade', 280, 130, 650),
      track('.hfr6-heart', 1, 'heart', 900, 0, 900),
    ], idle('.hfr6-heart__emblem', 1, 'beat', 3200)),
    recipe('vt4-tube-ribbon', '.vt4', 'Tube lands, ribbons extend, foil catches light', [
      track('.vt4__tube', 1, 'tilt', 0, 0, 950),
      track('.vt4__option', 4, 'right', 300, 170, 800),
      track('.vt4__option-icon', 4, 'pop', 650, 170, 550),
    ], idle('.vt4__tube-foil', 1, 'light', 4800)),
    recipe('ih8-heart-elements', '.ih8-module', 'Heart pieces converge, badges echo, core settles', [
      track('.ih8-petal', 8, 'converge', 0, 100, 850),
      track('.ih8-info__icon-badge', 8, 'pop', 350, 100, 600),
      track('.ih8-core', 1, 'heart', 900, 0, 800),
    ], idle('.ih8-core__stars', 1, 'light')),
    recipe('sr6-startup-rocket', '.sr6-module', 'Six-stage assembly, launch, route and hover', [
      track('.sr6-rocket__piece', 6, 'launch', 0, 130, 850, true),
      track('.sr6-rocket', 1, 'lift', 1100, 0, 850),
      track('.sr6-timeline__arc', 1, 'wipe', 550, 0, 1200),
      track('.sr6-timeline__step', 6, 'right', 650, 150, 700),
    ], idle('.sr6-rocket', 1, 'hover', 4200)),
    recipe('st7-squeeze-tubes', '.st7-module', 'Three squeeze releases and marker stamps', [
      track('.st7-piece', 3, 'squeeze', 0, 240, 1000),
      track('.st7-marker', 3, 'pop', 480, 240, 700),
      track('.st7-tube-caption', 3, 'fade', 500, 240, 650),
    ], idle('.st7-tube-sheen', 3, 'light', 4600)),
    recipe('s8f-starflow', '.s8f-module', 'Five blades bloom in place, captions, star glint', [
      track('.s8f-blade__fill', 5, 'bloom', 0, 170, 900),
      track('.s8f-caption', 5, 'fade', 350, 170, 700),
      track('.s8f-star', 1, 'heart', 900, 0, 850),
    ], idle('.s8f-star__emblem', 1, 'sway', 5000)),
    recipe('d8p-diamond-petals', '.d8p-module', 'Eight faceted reveals, copy, central lockup', [
      track('.d8p-petal__fill', 8, 'diamond', 0, 115, 850),
      track('.d8p-petal-content', 8, 'fade', 350, 115, 650),
      track('.d8p-core__lockup', 1, 'pop', 1050, 0, 800),
    ], idle('.d8p-core__avatar', 1, 'float')),
    recipe('ta4-target-arrow', '.ta4-module', 'Target materializes, banners aim, callout follows', [
      track('.ta4-scene-svg', 1, 'fade', 0, 0, 750),
      track('.ta4-banner__fill', 4, 'wipe', 300, 180, 950),
      track('.ta4-banner-item', 4, 'fade', 650, 180, 650),
      track('.ta4-callout', 1, 'right', 1100, 0, 800),
    ], idle('.ta4-callout__eyebrow-icon', 1, 'float')),
    recipe('wh9-heart-ring', '.wh9-module', 'Six-sector color wave, numbers and heart light', [
      track('.wh9-sector-paint > rect:first-child', 6, 'glow', 0, 180, 1000),
      track('.wh9-number', 6, 'pop', 350, 180, 600),
      track('.wh9-copy', 6, 'fade', 500, 180, 700),
      track('.wh9-art__heart-core', 1, 'fade', 1000, 0, 800),
    ], idle('.wh9-art__heart', 1, 'light', 3800)),
    recipe('gb5-gift-boxes', '.gb5-root', 'Gift drop and bounce, bow gleam, miniature echo', [
      track('.gb5-card', 5, 'gift', 0, 170, 1000),
      track('.gb5-lid-number', 5, 'pop', 450, 170, 600),
      track('.gb5-mini-node', 5, 'pop', 850, 170, 650),
    ], idle('.gb5-body-icon-wrap', 5, 'float', 4600)),
    recipe('pn10-pencil-ribbon', '.pn10-module', 'Pen lands, bands fill, ribbons unfold', [
      track('.pn10-marker', 1, 'pen', 0, 0, 900),
      track('.pn10-marker__band', 5, 'liquid', 250, 120, 650),
      track('.pn10-ribbon', 5, 'unfold', 400, 180, 900),
    ], idle('.pn10-marker__sheen', 1, 'light', 5000)),
    recipe('cb5-clipboard', '.cb5-module', 'Paper settles, rows slide, checklist stamps', [
      track('.cb5-board', 1, 'tilt', 0, 0, 800),
      track('.cb5-row', 5, 'shoot', 250, 170, 750),
      track('.cb5-checklist__box svg', 5, 'check', 650, 170, 600),
    ], idle('.cb5-clip__metal', 1, 'light', 4800)),
    recipe('tc5-trophy-cups', '.tc5-module', 'Victory rise, emblem stamps and silver gleam', [
      track('.tc5-step', 5, 'victory', 0, 180, 950),
      track('.tc5-cup__icon', 5, 'pop', 400, 180, 600),
      track('.tc5-caption', 5, 'fade', 650, 180, 650),
    ], idle('.tc5-cup__facet', 5, 'light', 4400)),
    recipe('pb4-pump-bottle', '.pb4-module', 'Bottom-up bottle fill, cap press, label sequence', [
      track('.pb4-band', 4, 'liquid', 0, 180, 950, true),
      track('.pb4-cap', 1, 'press', 850, 0, 750),
      track('.pb4-step', 4, 'right', 450, 180, 750),
    ], idle('.pb4-cap', 1, 'pump', 5200)),
    recipe('lm6-levels-marks', '.lm6-module', 'Six domino milestones, number stamps, reflections', [
      track('.lm6-stage', 6, 'domino', 0, 150, 900),
      track('.lm6-number', 6, 'pop', 350, 150, 600),
      track('.lm6-reflection', 6, 'fade', 650, 150, 700),
    ], idle('.lm6-surface--edge', 6, 'light', 4800)),
    recipe('ls4-ladder-steps', '.ls4-module', 'Four-step isometric staircase ascent, icon pop and ambient 3D sheen', [
      track('.ls4-step', 4, 'stair', 0, 160, 850),
      track('.ls4-step__icon-circle', 4, 'pop', 350, 160, 600),
      track('.ls4-step__text', 4, 'right', 480, 160, 650),
      track('.ls4-step__badge', 4, 'fade', 600, 160, 550),
    ], idle('.ls4-facet--side', 4, 'light', 4600)),
    // THREE_SHAPES_MOTION_V2: structured motion without breaking SVG geometry
    recipe('rt6-reverse-timeline', '.rt6-module', 'Staircase light cascade + soft number stamps', [
      track('.rt6-step', 6, 'rt6-ribbon-light', 0, 150, 660),
      track('.rt6-step__badge', 6, 'rt6-badge-pop', 260, 150, 560),
      track('.rt6-step__content', 6, 'fade', 350, 150, 480),
      // Mobile has a separate card layout. Animate each complete card as one unit.
      track('.rt6-mobile-card', 6, 'rt6-mobile-card-enter', 0, 110, 640),
      track('.rt6-mobile-number', 6, 'rt6-badge-pop', 260, 110, 560),
    ], idle('.rt6-step__badge, .rt6-mobile-number', 12, 'halo-breathe', 4800)),
    recipe('sq5-sqert-model', '.sq5-module', 'Five-petal clockwise illumination, central focus, legend sweep', [
      track('.sq5-petal', 5, 'sq5-petal-light', 0, 140, 690),
      track('.sq5-petal__letter', 5, 'fade', 250, 140, 400),
      track('.sq5-hub', 1, 'sq5-core-focus', 650, 0, 620),
      track('.sq5-item', 5, 'legend-cascade', 180, 100, 600),
    ], idle('.sq5-hub', 1, 'halo-breathe', 5600)),
    recipe('ob3-option-banners', '.ob3-module', 'Three rigid banners slide in, icons pop, text revealed', [
      track('.ob3-row', 3, 'ob3-banner-enter', 0, 280, 760),
      track('.ob3-icon-host svg', 3, 'ob3-icon-pop', 320, 280, 510),
      track('.ob3-mobile__icon-strip svg', 3, 'ob3-icon-pop', 320, 280, 510),
      track('.ob3-mid__content', 3, 'fade', 360, 280, 460),
      track('.ob3-right__label', 3, 'fade', 405, 280, 430),
      track('.ob3-right__copy', 3, 'fade', 455, 280, 440),
    ], idle('.ob3-icon-host svg, .ob3-mobile__icon-strip svg', 6, 'halo-breathe', 5200)),
    recipe('ss5-study-skills', '.ss5-module', 'Five stacked books slide in, icons pop, copy revealed', [
      track('.ss5-book-row', 5, 'ss5-book-enter', 0, 135, 720),
      track('.ss5-icon-host svg', 5, 'ss5-icon-pop', 250, 135, 480),
      track('.ss5-copy-text', 5, 'fade', 320, 135, 420),
      track('.ss5-mobile-card', 5, 'ss5-mobile-card-enter', 0, 115, 600),
    ], idle('.ss5-icon-host svg', 5, 'halo-breathe', 5000)),
    recipe('dt4-dual-tubes', '.dt4-module', 'Dual tubes settle, trapezoid ribbons spread, numbers and icons pop', [
      track('.dt4-tube--left', 1, 'dt4-tube-drop', 0, 0, 820),
      track('.dt4-tube--right', 1, 'dt4-tube-drop', 110, 0, 820),
      track('.dt4-row', 4, 'dt4-ribbon-spread', 220, 130, 760),
      track('.dt4-tube-num', 4, 'pop', 420, 130, 540),
      track('.dt4-tube-icon', 4, 'pop', 490, 130, 540),
      track('.dt4-row__copy', 4, 'fade', 550, 130, 480),
      track('.dt4-mobile-card', 4, 'dt4-mobile-enter', 0, 110, 560),
    ], idle('.dt4-tube__gloss', 2, 'halo-breathe', 4800)),
    recipe('ec4-ecology-plant', '.ec4-module', 'Earth bowl settles, stem sprouts upward, leaves unfurl, step banners branch outward', [
      track('.ec4-bowl', 1, 'ec4-bowl-settle', 0, 0, 700),
      track('.ec4-stem', 1, 'liquid', 180, 0, 820),
      track('.ec4-leaf', 4, 'pop', 420, 130, 620),
      track('.ec4-card', 4, 'ec4-card-branch', 520, 140, 760),
      track('.ec4-badge', 4, 'pop', 720, 140, 520),
      track('.ec4-card__icon', 4, 'pop', 800, 140, 480),
      track('.ec4-mobile-card', 4, 'dt4-mobile-enter', 0, 110, 560),
    ], idle('.ec4-leaf', 4, 'sway', 5200)),
    recipe('tp5-trophy-tiers', '.tp5-module', 'Trophy pedestal rises, 5 tiers stack bottom-up, handles open, legend slides in', [
      track('.tp5-pedestal', 1, 'tp5-pedestal-rise', 0, 0, 650),
      track('.tp5-band', 5, 'tp5-band-stack', 160, 120, 620, true),
      track('.tp5-handles', 1, 'tp5-handles-open', 580, 0, 700),
      track('.tp5-legend-item', 5, 'right', 380, 110, 580),
      track('.tp5-legend-icon', 5, 'pop', 520, 110, 480),
    ], idle('.tp5-cup-sheen', 1, 'light', 4600)),
    recipe('lb6-lightbulb-ideas', '.lb6-module', 'Bulb base anchors, glass blooms, bolt sparks, 6 flanking pillars unfold', [
      track('.lb6-bulb-base', 1, 'lb6-base-anchor', 0, 0, 560),
      track('.lb6-bulb-head', 1, 'lb6-bulb-bloom', 110, 0, 680),
      track('.lb6-bolt', 1, 'lb6-bolt-spark', 320, 0, 620),
      track('.lb6-item--left', 3, 'left', 260, 120, 580),
      track('.lb6-item--right', 3, 'right', 260, 120, 580),
      track('.lb6-badge', 6, 'pop', 400, 80, 480),
    ], idle('.lb6-bolt', 1, 'light', 3400)),
    recipe('ab4-arc-bulb', '.ab4-module', 'Bulb ignites with 9 radiating rays, arch sweeps overhead, 4 milestones pop outward', [
      track('.ab4-bulb-base', 1, 'ab4-base-lock', 0, 0, 540),
      track('.ab4-bulb-glass', 1, 'ab4-bulb-ignite', 90, 0, 640),
      track('.ab4-bulb-filament', 1, 'pop', 220, 0, 520),
      track('.ab4-bulb-rays', 1, 'ab4-rays-burst', 300, 0, 660),
      track('.ab4-arc', 1, 'ab4-arc-sweep', 360, 0, 760),
      track('.ab4-node', 4, 'pop', 480, 110, 520),
      track('.ab4-caption', 4, 'ab4-caption-fan', 580, 110, 540),
      track('.ab4-mobile-card', 4, 'dt4-mobile-enter', 0, 110, 560),
    ], idle('.ab4-bulb-rays', 1, 'ab4-rays-pulse', 4200)),
    recipe('ac4-arrow-cycle', '.ac4-module', 'Folded tabs tuck in, 4 cyclic arrows glide clockwise A-B-C-D, corner captions appear', [
      track('.ac4-flap', 4, 'ac4-flap-tuck', 0, 110, 520),
      track('.ac4-arrow', 4, 'ac4-arrow-glide', 120, 130, 620),
      track('.ac4-arrow__letter', 4, 'pop', 320, 130, 460),
      track('.ac4-caption', 4, 'ac4-corner-enter', 360, 110, 560),
    ], idle('.ac4-ring-sheen', 1, 'light', 4400)),
    recipe('km6-knowledge-rings', '.km6-module', 'Six 3-arrow rings swirl clockwise around hexagon, numbers stamp upright, 6 pillars reveal', [
      track('.km6-ring', 6, 'km6-ring-bloom', 0, 95, 620),
      track('.km6-ring__body', 6, 'km6-ring-swirl', 40, 95, 680),
      track('.km6-ring__rim', 6, 'km6-ring-swirl', 40, 95, 680),
      track('.km6-ring__num', 6, 'pop', 260, 95, 460),
      track('.km6-caption--right', 3, 'right', 300, 110, 560),
      track('.km6-caption--left', 3, 'left', 300, 110, 560),
      track('.km6-caption__icon', 6, 'pop', 440, 75, 460),
    ], idle('.km6-hex-sheen', 1, 'light', 4600)),
    recipe('cs6-slanted-pillars', '.cs6-module', 'Six slanted 3D pillars glide into accordion alignment with dark fold wings and checkmark columns', [
      track('.cs6-bar', 6, 'cs6-bar-unfurl', 0, 95, 620),
      track('.cs6-wing', 5, 'cs6-wing-fold', 140, 95, 560),
      track('.cs6-detail', 6, 'up', 280, 85, 540),
      track('.cs6-detail__icon', 6, 'pop', 420, 85, 460),
    ], idle('.cs6-ribbon-sheen', 1, 'light', 4500)),
    recipe('co3-cube-options', '.co3-module', 'Bottom-up 3D cubes land in place, stepped arrow banners shoot right, icons pop', [
      track('.co3-cube', 3, 'co3-cube-drop', 0, 140, 560, true),
      track('.co3-banner', 3, 'co3-banner-shoot', 160, 140, 620, true),
      track('.co3-banner__icon', 3, 'pop', 380, 140, 460, true),
    ], idle('.co3-stack-sheen', 1, 'light', 4500)),
    recipe('kc3-knowledge-capture', '.kc3-module', 'Diamond caps crown each column, double-rimmed chevron banners unfurl downward', [
      track('.kc3-cap', 3, 'kc3-cap-drop', 0, 130, 580),
      track('.kc3-body', 3, 'kc3-chevron-unfold', 160, 130, 680),
      track('.kc3-cap__icon', 3, 'pop', 220, 130, 460),
      track('.kc3-body__copy', 3, 'fade', 380, 130, 500),
    ], idle('.kc3-grid-sheen', 1, 'light', 4600)),
    recipe('hb4-hanger-banners', '.hb4-module', 'Hook-anchored pendulum arrival, banners unroll downward, pictograms settle', [
      // The complete button moves with its hanger, banner and hit area as one unit.
      track('.hb4-card', 4, 'hb4-hanger-settle', 0, 165, 1000),
      track('.hb4-banner', 4, 'hb4-banner-unroll', 180, 165, 820),
      track('.hb4-copy', 4, 'fade', 500, 165, 420),
      track('.hb4-icon', 4, 'hb4-icon-arrive', 650, 165, 550),
    ], idle('.hb4-card', 4, 'hb4-pendulum', 5600)),
  ];

  // Transform keyframes ADD to the live CSS/attribute transform, not a cached matrix.
  // Opacity is relative to its original value. Completion cancels each effect.
  const identity = 'translate(0px, 0px) rotate(0deg) scale(1, 1)';
  const move = (from, overshoot) => overshoot
    ? [{ transform: from, opacity: 0 }, { transform: overshoot, opacity: 1, offset: .72 }, { transform: identity, opacity: 1 }]
    : [{ transform: from, opacity: 0 }, { transform: identity, opacity: 1 }];
  const reveal = from => [{ clipPath: from, opacity: .15 }, { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }];
  function frames(effect, index) {
    switch (effect) {
      case 'stack': return move('translateY(32px) scale(.96)', 'translateY(-3px) scale(1.01)');
      case 'shoot': return move('translateX(-36px)', 'translateX(3px)');
      case 'right': return move('translateX(24px)');
      case 'pop': return move('scale(.72)', 'scale(1.055)');
      case 'heart': return move('scale(.8)', 'scale(1.045)');
      case 'tilt': return move('translateY(22px) rotate(-3deg)');
      case 'converge': return move(`translate(${index < 4 ? -12 : 12}px, ${index % 2 ? 8 : -8}px) scale(.97)`);
      case 'launch': return move('translateY(26px)', 'translateY(-3px)');
      case 'lift': return [{ transform: 'translateY(0)' }, { transform: 'translateY(-9px)', offset: .55 }, { transform: identity }];
      case 'squeeze': return move('translateY(20px) scale(.98, 1.025)', 'translateY(-2px) scale(1.02, .975)');
      case 'gift': return move('translateY(-30px) rotate(-2deg)', 'translateY(4px) rotate(.4deg)');
      case 'pen': return move('translateY(-28px) rotate(2deg)', 'translateY(2px)');
      case 'unfold': return move('translateX(18px) scaleX(.94)');
      case 'check': return move('scale(.35) rotate(-12deg)', 'scale(1.12) rotate(2deg)');
      case 'victory': return move('translateY(30px) scale(.96)', 'translateY(-4px) scale(1.01)');
      case 'stair': return move('translate(-22px, 22px) scale(.95)', 'translate(2px, -2px) scale(1.01)');
      case 'domino': return move('translateY(18px) rotate(-4deg)', 'translateY(-2px) rotate(.5deg)');
      case 'press': return [{ transform: identity }, { transform: 'translateY(3px)', offset: .35 }, { transform: 'translateY(-1px)', offset: .7 }, { transform: identity }];
      case 'sector': return reveal('inset(0% 0% 100% 0%)');
      case 'bloom': return [{ clipPath: 'circle(0% at 50% 50%)', opacity: .2 }, { clipPath: 'circle(75% at 50% 50%)', opacity: 1 }];
      case 'diamond': return reveal('inset(48% 48% 48% 48%)');
      case 'wipe': return reveal('inset(0% 100% 0% 0%)');
      case 'liquid': return reveal('inset(100% 0% 0% 0%)');
      case 'glow': return [{ opacity: .12 }, { opacity: 1, offset: .6 }, { opacity: .8, offset: .8 }, { opacity: 1 }];
      case 'cascade-drop': return move('translateY(-55px) scaleY(.88)', 'translateY(6px) scaleY(1.03)');
      case 'stamp-3d': return [{ transform: 'perspective(500px) rotateX(75deg) scale(.6)', opacity: 0 }, { transform: 'perspective(500px) rotateX(-12deg) scale(1.08)', opacity: 1, offset: .72 }, { transform: identity, opacity: 1 }];
      case 'accordion-fold': return move('scaleX(.2) skewY(-8deg)', 'scaleX(1.05) skewY(1deg)');
      case 'vortex-spin-in': return [{ transform: 'scale(.18) rotate(-110deg)', opacity: 0 }, { transform: 'scale(1.06) rotate(6deg)', opacity: 1, offset: .78 }, { transform: identity, opacity: 1 }];
      case 'core-impact': return [{ transform: 'scale(.3)', opacity: 0 }, { transform: 'scale(1.15)', opacity: 1, offset: .65 }, { transform: 'scale(.96)', offset: .85 }, { transform: 'scale(1)', opacity: 1 }];
      case 'legend-cascade': return move('translateX(-42px) scale(.96)', 'translateX(3px) scale(1.01)');
      case 'ribbon-curl': return [{ transform: 'perspective(600px) rotateY(-65deg) translateX(-30px)', opacity: 0 }, { transform: 'perspective(600px) rotateY(8deg) translateX(2px)', opacity: 1, offset: .76 }, { transform: identity, opacity: 1 }];
      case 'gear-snap': return [{ transform: 'scale(.3) rotate(-120deg)', opacity: 0 }, { transform: 'scale(1.15) rotate(15deg)', opacity: 1, offset: .75 }, { transform: identity, opacity: 1 }];
      case 'bar-unroll': return [{ clipPath: 'inset(0% 100% 0% 0%)', opacity: .3 }, { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }];
      // THREE_SHAPES_MOTION_V2 BEGIN: geometry-safe shape-specific effects.
      // Structural SVG pieces remain at their authored coordinates.
      case 'rt6-ribbon-light': return [
        { opacity: 0, filter: 'brightness(1.42)' },
        { opacity: 1, filter: 'brightness(1.12)', offset: .70 },
        { opacity: 1, filter: 'brightness(1)' },
      ];
      case 'rt6-badge-pop': return move('scale(.68)', 'scale(1.12)');
      // Mobile cards keep their contents attached while entering as a unit.
      case 'rt6-mobile-card-enter': return move('translateY(15px)', 'translateY(-2px)');
      case 'sq5-petal-light': return [
        { opacity: 0, filter: 'brightness(1.70) saturate(1.15)' },
        { opacity: 1, filter: 'brightness(1.18) saturate(1)', offset: .74 },
        { opacity: 1, filter: 'brightness(1) saturate(1)' },
      ];
      case 'sq5-core-focus': return [
        { opacity: 0, filter: 'brightness(1.55)' },
        { opacity: 1, filter: 'brightness(1.12)', offset: .72 },
        { opacity: 1, filter: 'brightness(1)' },
      ];
      // The entire OB3 button moves as ONE unit: no separated fold, face or text.
      case 'ob3-banner-enter': return move('translateX(-16px) scale(.99)', 'translateX(2px) scale(1.005)');
      // Only the decoration moves independently; never the two joined SVG masks.
      case 'ob3-icon-pop': return move('scale(.68)', 'scale(1.1)');
      // SS5 Study Skills
      case 'ss5-book-enter': return move('translateX(-20px) scale(.99)', 'translateX(2px) scale(1.005)');
      case 'ss5-icon-pop': return move('scale(.7)', 'scale(1.12)');
      case 'ss5-mobile-card-enter': return move('translateY(16px)', 'translateY(-2px)');
      // DT4 Dual Squeeze Tubes (Shape 13)
      case 'dt4-tube-drop': return move('translateY(-24px) scale(.97)', 'translateY(3px) scale(1.008)');
      case 'dt4-ribbon-spread': return move('scaleX(.72)', 'scaleX(1.02)');
      case 'dt4-mobile-enter': return move('translateY(16px)', 'translateY(-2px)');
      // EC4 Ecology Plant (Shape 20)
      case 'ec4-bowl-settle': return move('translateY(22px) scale(.95)', 'translateY(-2px) scale(1.01)');
      case 'ec4-card-branch': return move(`translateX(${index % 2 === 0 ? 20 : -20}px) scale(.96)`, `translateX(${index % 2 === 0 ? -3 : 3}px) scale(1.008)`);
      // TP5 Trophy Tiers (Shape 34)
      case 'tp5-pedestal-rise': return move('translateY(18px) scaleY(.92)', 'translateY(-2px) scaleY(1.015)');
      case 'tp5-band-stack': return move('translateY(-18px) scaleX(.94)', 'translateY(2px) scaleX(1.015)');
      case 'tp5-handles-open': return move('scaleX(.84) scaleY(.96)', 'scaleX(1.025) scaleY(1.005)');
      // LB6 Lightbulb 6-Pillar Ideas (Shape 1)
      case 'lb6-base-anchor': return move('translateY(18px) scaleY(.92)', 'translateY(-2px) scaleY(1.015)');
      case 'lb6-bulb-bloom': return move('translateY(14px) scale(.92)', 'translateY(-2px) scale(1.02)');
      case 'lb6-bolt-spark': return move('translateY(-16px) scale(.72)', 'scale(1.12)');
      // AB4 Arc & Lightbulb Business Ideas (Shape 2)
      case 'ab4-base-lock': return move('translateY(16px) scaleY(.92)', 'translateY(-2px) scaleY(1.015)');
      case 'ab4-bulb-ignite': return move('scale(.88)', 'scale(1.03)');
      case 'ab4-rays-burst': return move('scale(.76)', 'scale(1.06)');
      case 'ab4-arc-sweep': return reveal('inset(0% 50% 0% 50%)');
      case 'ab4-caption-fan': return move(`translateX(${index < 2 ? 14 : -14}px)`);
      // AC4 4-Arrow Folded Cyclic Ribbon (Shape 5)
      case 'ac4-flap-tuck': return move('scale(.82)');
      case 'ac4-arrow-glide': {
        const dirs = ['translate(-16px, 16px)', 'translate(-16px, -16px)', 'translate(16px, -16px)', 'translate(16px, 16px)'];
        return move(`${dirs[index % 4]} scale(.92)`, 'scale(1.02)');
      }
      case 'ac4-corner-enter': {
        const dx = index === 0 || index === 3 ? 16 : -16;
        return move(`translateX(${dx}px)`);
      }
      // KM6 Knowledge Management 6 Rings (Shape 8)
      case 'km6-ring-bloom': {
        const dirs = ['translateY(16px)', 'translate(-14px, 10px)', 'translate(-14px, -10px)', 'translateY(-16px)', 'translate(14px, -10px)', 'translate(14px, 10px)'];
        return move(`${dirs[index % 6]} scale(.88)`, 'scale(1.03)');
      }
      case 'km6-ring-swirl': return move('rotate(-36deg) scale(.9)', 'rotate(3deg) scale(1.015)');
      // CS6 6 Slanted Accordion Pillars (Shape 10)
      case 'cs6-bar-unfurl': return move('translate(16px, -22px) scale(.94)', 'translate(-2px, 3px) scale(1.015)');
      case 'cs6-wing-fold': return move('scaleX(.72)', 'scaleX(1.02)');
      // CO3 3 Cube Options (Shape 11)
      case 'co3-cube-drop': return move('translateY(-18px) scale(.92)', 'translateY(3px) scale(1.015)');
      case 'co3-banner-shoot': return reveal('inset(0% 100% 0% 0%)');
      // KC3 3 Diamond-Cap Chevron Banners (Shape 12)
      case 'kc3-cap-drop': return move('translateY(-22px) scale(.92)', 'translateY(3px) scale(1.015)');
      case 'kc3-chevron-unfold': return reveal('inset(0% 0% 100% 0%)');
      // HB4: swing around the hook without separating the attached SVG layers.
      case 'hb4-hanger-settle': {
        const direction = index % 2 === 0 ? -1 : 1;
        return [
          { transform: `translateY(-14px) rotate(${direction * 5}deg)`, opacity: 0 },
          { transform: `translateY(1px) rotate(${direction * -1.8}deg)`, opacity: 1, offset: .5 },
          { transform: `rotate(${direction * .7}deg)`, opacity: 1, offset: .76 },
          { transform: identity, opacity: 1 },
        ];
      }
      case 'hb4-banner-unroll': return reveal('inset(0% 0% 100% 0%)');
      case 'hb4-icon-arrive': return move('translateY(5px) scale(.8)', 'translateY(-1px) scale(1.035)');
      // THREE_SHAPES_MOTION_V2 END.
      default: return [{ opacity: 0 }, { opacity: 1 }];
    }
  }
  function restFrames(effect) {
    switch (effect) {
      case 'hb4-pendulum': return [
        { transform: 'rotate(0deg)' },
        { transform: 'rotate(.55deg)', offset: .25 },
        { transform: 'rotate(-.4deg)', offset: .65 },
        { transform: 'rotate(0deg)' },
      ];
      case 'quiet-opacity': return [
        { opacity: 1 },
        { opacity: .96, offset: .5 },
        { opacity: 1 }
      ];
      case 'beat': return [1, 1.045, 1, 1.025, 1].map((s, i) => ({ transform: `scale(${s})`, offset: [0, .18, .35, .48, 1][i] }));
      case 'hover': return [{ transform: identity }, { transform: 'translateY(-3px)', offset: .5 }, { transform: identity }];
      case 'float': return [{ transform: identity }, { transform: 'translateY(-1.5px)', offset: .5 }, { transform: identity }];
      case 'sway': return [{ transform: 'rotate(0deg)' }, { transform: 'rotate(1.5deg)', offset: .3 }, { transform: 'rotate(-1deg)', offset: .65 }, { transform: 'rotate(0deg)' }];
      case 'pump': return [{ transform: identity }, { transform: 'translateY(1.5px)', offset: .2 }, { transform: identity, offset: .4 }, { transform: identity }];
      case 'ribbon-wave': return [{ transform: identity }, { transform: 'translateY(-2.5px) scale(1.03)', offset: .4 }, { transform: identity }];
      case 'turbine-breathe': return [{ transform: 'scale(1)', opacity: .9 }, { transform: 'scale(1.08)', opacity: 1, offset: .5 }, { transform: 'scale(1)', opacity: .9 }];
      case 'seam-gleam': return [{ transform: 'rotate(0deg)' }, { transform: 'rotate(10deg)', offset: .25 }, { transform: 'rotate(-10deg)', offset: .75 }, { transform: 'rotate(0deg)' }];
      case 'ab4-rays-pulse': return [{ transform: identity, opacity: 1 }, { transform: 'scale(1.045)', opacity: .82, offset: .5 }, { transform: identity, opacity: 1 }];
      // THREE_SHAPES_MOTION_V2: very gentle highlight, no permanent movement.
      case 'halo-breathe': return [
        { filter: 'brightness(1)', offset: 0 },
        { filter: 'brightness(1.16)', offset: .32 },
        { filter: 'brightness(1)', offset: .55 },
        { filter: 'brightness(1)', offset: 1 },
      ];
      default: return [{ opacity: .84 }, { opacity: 1, offset: .4 }, { opacity: .84 }];
    }
  }

  const records = new Map();
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  const supported = typeof Element.prototype.animate === 'function' && typeof IntersectionObserver === 'function';
  let paused = false;
  let instance = 0;
  const allowed = record => supported && !paused && !media.matches && !document.hidden && record.visible && record.root.isConnected;
  function cancel(record) {
    record.generation++;
    record.animations.forEach(animation => animation.cancel());
    record.animations.clear();
    record.phase = 'waiting';
  }
  function targets(record, spec) {
    return Array.from(record.root.querySelectorAll(spec.selector));
  }
  function validate(record) {
    return [...record.recipe.tracks, ...(record.recipe.idle ? [record.recipe.idle] : [])].map(spec => ({
      selector: spec.selector, expected: spec.count, matched: targets(record, spec).length,
    })).filter(result => result.matched !== result.expected);
  }
  function animate(record, node, keyframes, timing) {
    const style = getComputedStyle(node);
    // Hidden responsive layers do not need an animation allocation.
    if (!node.getClientRects().length || style.display === 'none') return null;
    try {
      const animations = [];
      const keys = ['transform', 'opacity', 'clipPath', 'filter'];
      keys.forEach(property => {
        if (!keyframes.some(frame => property in frame)) return;
        // Do not replace a pre-existing clip-path. Fading still reveals these layers safely.
        if (property === 'clipPath' && style.clipPath !== 'none') return;
        const values = keyframes.map(frame => ({
          [property]: property === 'opacity' ? Number(style.opacity) * frame[property] : frame[property],
          ...(frame.offset === undefined ? {} : { offset: frame.offset }),
        }));
        const animation = node.animate(values, {
          ...timing, composite: property === 'transform' ? 'add' : 'replace',
        });
        animation.id = `shape-auto:${record.recipe.id}:${record.instance}:${record.phase}`;
        record.animations.add(animation);
        animations.push(animation);
        if (timing.iterations !== Infinity) animation.onfinish = () => {
          record.animations.delete(animation);
          animation.cancel(); // No frozen transform/clip/opacity after entrance.
        };
      });
      return animations;
    } catch (error) {
      record.errors.push(`${node.className?.baseVal || node.className}: ${error.message}`);
      console.warn('[ShapeAutoMotion]', record.recipe.id, error);
      return null;
    }
  }
  function startIdle(record) {
    record.phase = 'idle';
    const spec = record.recipe.idle;
    // No idle track is valid: all other shape recipes continue to work.
    // Exactly one small accent per shape, never all repeated surfaces.
    const node = spec ? targets(record, spec).find(element => element.getClientRects().length) : null;
    if (node) animate(record, node, restFrames(spec.effect), {
      duration: spec.duration, iterations: Infinity, easing: 'ease-in-out', fill: 'none',
    });
    sync(record);
  }
  function start(record) {
    cancel(record);
    record.errors = [];
    record.mismatches = validate(record);
    record.phase = 'entrance';
    record.plays++;
    const generation = record.generation;
    const pending = [];
    record.recipe.tracks.forEach(spec => {
      const nodes = targets(record, spec);
      if (spec.reverse) nodes.reverse();
      nodes.forEach((node, index) => {
        const animations = animate(record, node, frames(spec.effect, index), {
          duration: spec.duration, delay: spec.delay + index * spec.stagger,
          easing: 'cubic-bezier(.22,.61,.36,1)', fill: 'backwards',
        });
        if (animations) animations.forEach(animation => pending.push(animation.finished));
      });
    });
    Promise.all(pending).then(() => {
      if (record.generation !== generation || !record.root.isConnected) return;
      // Finish callbacks can run in a later task. Retire all entrance effects now.
      record.animations.forEach(animation => animation.cancel());
      record.animations.clear();
      startIdle(record);
    }).catch(() => {}); // Cancellation during unmount/replay is expected.
  }
  function sync(record) {
    if (media.matches || !supported) { cancel(record); return; }
    if (!allowed(record)) {
      record.animations.forEach(animation => {
        if (animation.playState === 'running') {
          // Resolve a pending play synchronously, otherwise pause settles on a later frame.
          const time = animation.currentTime ?? 0;
          animation.pause();
          animation.currentTime = time;
        }
      });
      return;
    }
    if (record.phase === 'waiting') start(record);
    else record.animations.forEach(animation => { if (animation.playState === 'paused') animation.play(); });
  }
  const observer = supported ? new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const record = records.get(entry.target);
      if (!record) return;
      const visible = entry.isIntersecting && entry.intersectionRect.width > 0 && entry.intersectionRect.height > 0;
      if (record.visible && !visible) cancel(record); // Offscreen is static; re-entry replays.
      record.visible = visible;
      sync(record);
    });
  }, { threshold: [0, .01], rootMargin: '0px' }) : null;

  function scan() {
    records.forEach((record, root) => {
      if (root.isConnected) return;
      cancel(record);
      observer?.unobserve(root);
      records.delete(root);
    });
    RECIPES.forEach(recipe => document.querySelectorAll(recipe.root).forEach(root => {
      if (records.has(root)) return;
      const record = { root, recipe, instance: ++instance, generation: 0, visible: false,
        phase: 'waiting', plays: 0, animations: new Set(), errors: [], mismatches: [] };
      records.set(root, record);
      record.mismatches = validate(record);
      if (record.mismatches.length) console.warn('[ShapeAutoMotion] Selector mismatch', recipe.id, record.mismatches);
      observer?.observe(root);
    }));
  }
  let scheduled = false;
  const mutations = new MutationObserver(() => {
    if (scheduled) return;
    scheduled = true;
    queueMicrotask(() => { scheduled = false; scan(); });
  });
  function mount() {
    scan();
    mutations.observe(document.body, { childList: true, subtree: true });
  }
  media.addEventListener('change', () => records.forEach(sync));
  document.addEventListener('visibilitychange', () => records.forEach(sync));
  window.addEventListener('pagehide', () => records.forEach(cancel));
  window.addEventListener('pageshow', () => { scan(); records.forEach(sync); });

  window.__shapeAutoMotion = {
    version: '1.0.0',
    list: () => RECIPES.map(recipe => ({
      id: recipe.id, root: recipe.root, name: recipe.name,
      tracks: recipe.tracks.map(spec => ({ ...spec })), idle: { ...recipe.idle },
    })),
    status: () => {
      scan();
      return RECIPES.map(recipe => {
        const instances = Array.from(records.values()).filter(record => record.recipe === recipe).map(record => ({
          instance: record.instance, visible: record.visible, phase: record.phase, plays: record.plays,
          running: Array.from(record.animations).some(animation => animation.playState === 'running'),
          animations: record.animations.size, mismatches: validate(record), errors: [...record.errors],
        }));
        return { id: recipe.id, root: recipe.root, mounted: instances.length > 0,
          visible: instances.some(record => record.visible), running: instances.some(record => record.running),
          paused, reducedMotion: media.matches, supported, instances };
      });
    },
    replay: id => {
      scan();
      const matching = Array.from(records.values()).filter(record => record.recipe.id === id);
      matching.forEach(record => { cancel(record); sync(record); });
      // Offscreen, paused and reduced-motion instances remain queued, not force-started.
      return matching.length > 0;
    },
    pause: () => { paused = true; records.forEach(sync); },
    resume: () => { paused = false; records.forEach(sync); },
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, { once: true });
  else mount();
})();

