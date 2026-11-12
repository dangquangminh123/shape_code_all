import assert from 'node:assert/strict';

export async function assertPresentation(evaluate, width, height) {
  const layout = await evaluate(`(() => {
    const rect = selector => document.querySelector(selector).getBoundingClientRect().toJSON();
    const stage = document.querySelector('.step-stack-demo');
    const style = getComputedStyle(stage);
    const boxes = [...document.querySelectorAll('.ssd-stack,.ssd-content-box')]
      .map(el => el.getBoundingClientRect());
    return {
      stage: rect('.step-stack-demo'), inner: rect('.ssd-inner'),
      bounds: {
        left: Math.min(...boxes.map(r => r.left)), right: Math.max(...boxes.map(r => r.right)),
        top: Math.min(...boxes.map(r => r.top)), bottom: Math.max(...boxes.map(r => r.bottom)),
      },
      chrome: document.querySelectorAll('header,nav,.guide-card,.ssd-ConfigBar,main button,main a').length,
      bodyBackground: getComputedStyle(document.body).backgroundColor,
      stageBackground: style.backgroundColor, radius: style.borderRadius,
      border: style.borderWidth, shadow: style.boxShadow,
      pageHeight: document.documentElement.scrollHeight,
      viewportHeight: innerHeight,
      hasFollowingSection: !!document.querySelector('.ar5-module'),
    };
  })()`);
  assert.equal(layout.chrome, 0, 'no header, navigation, documentation or demo controls');
  assert.equal(layout.bodyBackground, 'rgb(255, 255, 255)', 'one white edge-to-edge page');
  assert.ok(['rgba(0, 0, 0, 0)', 'rgb(255, 255, 255)'].includes(layout.stageBackground));
  assert.equal(layout.radius, '0px', 'no inset rounded card');
  assert.equal(layout.border, '0px');
  assert.equal(layout.shadow, 'none');
  assert.ok(Math.abs(layout.stage.x) < 1 && Math.abs(layout.stage.y) < 1, 'stage starts at viewport origin');
  assert.ok(Math.abs(layout.stage.width - width) < 1, 'stage spans the viewport width');
  assert.ok(layout.stage.height >= height - 1, 'stage fills the viewport height');
  assert.ok(Math.abs((layout.bounds.left + layout.bounds.right) / 2 - width / 2) < 1, 'actual shape/text bounds are horizontally centered');
  assert.ok(Math.abs((layout.bounds.top + layout.bounds.bottom) / 2 - layout.stage.height / 2) < 1, 'actual shape/text bounds are vertically centered');
  assert.ok(layout.bounds.top >= 20 && layout.bounds.bottom <= layout.stage.height - 20, 'content is never clipped');
  assert.ok(layout.bounds.left >= 20 && layout.bounds.right <= width - 20, 'content stays within screen edges');
  if (!layout.hasFollowingSection && layout.inner.height + 96 <= height) {
    assert.ok(layout.pageHeight <= layout.viewportHeight + 1, 'no unnecessary vertical scrolling when content fits');
  }
}
