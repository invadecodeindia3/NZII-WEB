import { useEffect } from 'react';
import { useGame } from '../../context/GameContext';

const NS = 'http://www.w3.org/2000/svg';
const PALETTE = ['#2b9d8f', '#a7c957', '#e76f51', '#f28482'];
const rng = (seed) => () => {
  seed = (seed * 9301 + 49297) % 233280;
  return seed / 233280;
};
const cssVar = (el, name, fallback) => getComputedStyle(el).getPropertyValue(name).trim() || fallback;

/** Small cluster of brand dots on a photo corner, denser towards the corner. */
const drawCluster = (svg, index) => {
  while (svg.firstChild) svg.removeChild(svg.firstChild);
  const r = rng(11 + index * 5);
  const bg = cssVar(svg, '--bg', '#fffcf6');
  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 7; x++) {
      const d = (x + y) / 10;
      if (r() > d) continue;
      const c = document.createElementNS(NS, 'circle');
      c.setAttribute('cx', 8 + x * 17);
      c.setAttribute('cy', 8 + y * 18);
      c.setAttribute('r', (1.5 + d * 5 * r()).toFixed(1));
      c.setAttribute('fill', d > 0.75 ? bg : PALETTE[Math.floor(r() * PALETTE.length)]);
      if (d <= 0.75) {
        c.setAttribute('class', 'pl');
        c.style.setProperty('--dl', (6 - x + (4 - y)) * 0.22 + 's');
      }
      svg.appendChild(c);
    }
  }
};

/** The 16 × 9 brand dot field used beside page headlines. */
const drawDots = (svg) => {
  while (svg.firstChild) svg.removeChild(svg.firstChild);
  const base = cssVar(svg, '--dot-base', '#1d3658');
  const cols = [base, ...PALETTE];
  const r = rng(7);
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 16; x++) {
      const px = x / 15;
      if (r() > 0.25 + px * 0.7) continue;
      const c = document.createElementNS(NS, 'circle');
      c.setAttribute('cx', 12 + x * 25);
      c.setAttribute('cy', 12 + y * 24.5);
      c.setAttribute('r', (2 + px * 8 * r()).toFixed(1));
      c.setAttribute('fill', px < 0.35 ? base : cols[Math.floor(r() * cols.length)]);
      svg.appendChild(c);
    }
  }
};

/**
 * Behaviours every prototype page shares: dot clusters and dot fields (redrawn when the display mode
 * changes), the card spotlight that follows the cursor, and the reveal-on-scroll of `.rv` / `.track`.
 */
export const usePrototypeBehaviours = (rootRef) => {
  const { displayMode } = useGame();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    root.querySelectorAll('svg[data-cluster]').forEach(drawCluster);
    root.querySelectorAll('svg.dots:not(.pdots)').forEach(drawDots);
  }, [rootRef, displayMode]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    document.documentElement.classList.add('js');

    const onMove = (e) => {
      const card = e.target.closest && e.target.closest('.card');
      if (!card || !root.contains(card)) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', e.clientX - r.left + 'px');
      card.style.setProperty('--my', e.clientY - r.top + 'px');
    };
    root.addEventListener('pointermove', onMove);

    const items = [...root.querySelectorAll('.rv, .track')];
    let io = null;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        }),
        { rootMargin: '0px 0px -10% 0px' },
      );
      items.forEach((el, i) => {
        el.style.transitionDelay = el.classList.contains('rv') ? (i % 4) * 70 + 'ms' : '';
        io.observe(el);
      });
    } else {
      items.forEach((el) => el.classList.add('in'));
    }

    return () => {
      root.removeEventListener('pointermove', onMove);
      if (io) io.disconnect();
    };
  }, [rootRef]);
};

/** Sets the browser tab title while a page is open. */
export const usePageTitle = (title) => {
  useEffect(() => {
    const previous = document.title;
    document.title = title;
    return () => {
      document.title = previous;
    };
  }, [title]);
};
