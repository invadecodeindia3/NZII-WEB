// Motion for the News & Events, Collaborate, Open Calls and draft pages (see usePageMotion for the kinds).
import { through, usePageMotion } from './usePageMotion';

const NEWS = [
  ['.hero .hero-text > :not(.rule)', 'rise'],
  ['.hero .hero-text > .rule', 'rule'],
  ['.ev-y', 'rise'],
  ['.ev-list > .ev', 'rise'],
];
// the timeline's spine fills in teal as far as the visitor has read
const fillTimeline = (root) => {
  const line = root.querySelector('.ev-time');
  if (line) line.style.setProperty('--wm-line', through(line, 0.62).toFixed(4));
};
export const useNewsMotion = (rootRef) => usePageMotion(rootRef, NEWS, fillTimeline);

const COLLAB = [
  ['.oc-head > :not(.rule)', 'rise'],
  ['.oc-head > .rule', 'rule'],
  ['.oc-side', 'right'],
  ['.tiles > li', 'rise'],
  ['.ww-meet .ww-photo', 'wipe'],
  ['.ww-meet-txt > :not(.ww-faces)', 'rise'],
  ['.ww-faces > img', 'pop'],
];
export const useCollabMotion = (rootRef) => usePageMotion(rootRef, COLLAB);

const OPEN_CALLS = [
  ['.hero .hero-text > :not(.rule)', 'rise'],
  ['.hero .hero-text > .rule', 'rule'],
  ['.hero-art', 'right'],
  ['.hl', 'rise'],
  ['.mc-obj-grid > *', 'rise'],
  ['.mc-look > li', 'wipe'],
  ['.tcards > li', 'rise'],
  ['.docs > li', 'rise'],
  ['.mc-out > li', 'rise'],
  ['.mc-note', 'rise'],
  ['.mc-steps > li', 'rise'],
  ['.mc-scope > li', 'rise'],
  ['.mc-ticks > li, .mc-tags > li, .mc-crit > li', 'pop'],
  ['.mc-faq details', 'rise'],
  ['.mc-leadcard, .mc-side-card', 'right'],
  ['.mc-form fieldset', 'rise'],
  ['.mc-cta', 'rise'],
];
export const useOpenCallsMotion = (rootRef) => usePageMotion(rootRef, OPEN_CALLS);

const DRAFT = [
  ['.hero .hero-text > :not(.rule)', 'rise'],
  ['.hero .hero-text > .rule', 'rule'],
];
export const useDraftMotion = (rootRef) => usePageMotion(rootRef, DRAFT);
