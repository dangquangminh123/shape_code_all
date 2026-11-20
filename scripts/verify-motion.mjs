#!/usr/bin/env node
/* Validate the three new motion recipes against the actual current repo source. */
import { readFileSync, existsSync } from 'node:fs';
import assert from 'node:assert/strict';
import { join } from 'node:path';
const read=p=>readFileSync(join(process.cwd(),p),'utf8');
const root='src/components/shapes/';
const source=read('public/shape-auto-animations.js');
const rt6=read(root+'rt6-reverse-timeline/Rt6ReverseTimeline.tsx');
const sq5=read(root+'sq5-sqert-model/Sq5SqertModel.tsx');
const ob3=read(root+'ob3-option-banners/Ob3OptionBanners.tsx');
const rt6css=read(root+'rt6-reverse-timeline/rt6-reverse-timeline.css');
const ob3css=read(root+'ob3-option-banners/ob3-option-banners.css');
const layout=read('src/app/layout.tsx');
const tests=[
  ['next layout loads shared animation engine',()=>assert(layout.includes('/shape-auto-animations.js'))],
  ['RT6/SQ5/OB3 recipes appear exactly once',()=>{for(const id of ['rt6-reverse-timeline','sq5-sqert-model','ob3-option-banners'])assert.equal(source.split(`recipe('${id}'`).length-1,1)}],
  ['RT6 desktop and mobile tracks exist',()=>{for(const x of ['rt6-step','rt6-step__badge','rt6-step__content','rt6-mobile-card','rt6-mobile-number'])assert(rt6.includes(x),x)}],
  ['SQ5 petals, upright letters, hub and legend exist',()=>{for(const x of ['sq5-petal','sq5-petal__letter','sq5-hub','sq5-item'])assert(sq5.includes(x),x)}],
  ['OB3 desktop/mobile icon paths exist',()=>{for(const x of ['ob3-row','ob3-icon-host','ob3-mobile__icon-strip','ob3-mid__content','ob3-right__label','ob3-right__copy'])assert(ob3.includes(x),x)}],
  ['unique effect names are defined',()=>{for(const x of ['rt6-ribbon-light','rt6-badge-pop','rt6-mobile-card-enter','sq5-petal-light','sq5-core-focus','ob3-banner-enter','ob3-icon-pop','halo-breathe'])assert(source.includes(`case '${x}':`),x)}],
  ['shared WAAPI supports filter keyframes',()=>assert(source.includes("const keys = ['transform', 'opacity', 'clipPath', 'filter']"))],
  ['missing idle config no longer aborts animation engine',()=>assert(source.includes('...(record.recipe.idle ? [record.recipe.idle] : [])'))],
  ['badge/icon scale pivots correctly',()=>{assert(rt6css.includes('transform-box: fill-box'));assert(ob3css.includes('transform-box: fill-box'))}],
  ['no old destructive rotation effects used in three recipes',()=>{
    const block=source.slice(source.indexOf("recipe('rt6-reverse-timeline'"),source.indexOf('\n  ];',source.indexOf("recipe('rt6-reverse-timeline'")));
    for(const bad of ['vortex-spin-in','accordion-fold','gear-snap','ribbon-curl'])assert(!block.includes(bad),bad);
  }],
];
let passed=0;
for(const [label,check] of tests){try{check();passed++;console.log('PASS',label)}catch(e){console.error('FAIL',label,':',e.message)}}
console.log(`Structural verification: ${passed}/${tests.length} PASS`);
if(passed!==tests.length)process.exit(1);
