// Motion for the News & Events, Collaborate and draft pages (see usePageMotion for the kinds).
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

const DRAFT = [
  ['.hero .hero-text > :not(.rule)', 'rise'],
  ['.hero .hero-text > .rule', 'rule'],
];
export const useDraftMotion = (rootRef) => usePageMotion(rootRef, DRAFT);
