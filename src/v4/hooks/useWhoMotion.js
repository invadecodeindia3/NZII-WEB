import { usePageMotion } from './usePageMotion';

// What arrives on the 'Who we are' page, and how (see usePageMotion for the kinds).
const GROUPS = [
  ['.hero:not(.ww-sub) .hero-text > *', 'rise'],
  ['#principles > h2', 'rise'],
  ['#principles .p2 li', 'wipe'],
  ['.ww-sub .hero-text > :not(.rule)', 'rise'],
  ['.ww-sub .hero-text > .rule', 'rule'],
  ['.ww-subh', 'rise'],
  ['.ww-pis > li', 'rise'],
  ['.team-col > h4, .team-col > h3, .team-col > .cp-logo, .team-col > .cp-desc', 'rise'],
  ['.team-list > li', 'pop'],
  ['.ww-strip .ww-photo', 'rise'],
  ['.collab-cards > li', 'rise'],
  ['#advisory > *', 'rise'],
  ['.ww-feature', 'rise'],
  ['.sup-tiles > li', 'rise'],
  ['#involved > h2, #involved > .rule, #involved .btns > *', 'rise'],
];

// the strip of photographs drifts sideways a little as it passes
const drift = (root) => {
  const strip = root.querySelector('.ww-strip');
  if (!strip) return;
  const r = strip.getBoundingClientRect();
  const vh = window.innerHeight;
  if (r.bottom < -80 || r.top > vh + 80) return;
  strip.style.setProperty('--drift', (((r.top + r.height / 2 - vh / 2) / vh) * -28).toFixed(1));
};

export const useWhoMotion = (rootRef) => usePageMotion(rootRef, GROUPS, drift);
