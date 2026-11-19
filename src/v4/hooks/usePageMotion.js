import { useEffect } from 'react';
import '../styles/motion.css';

const calm = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.getAttribute('data-mode') === 'eco';

/**
 * A quiet, shared motion layer for the V4 pages. Each page lists `groups` of [selector, kind]; matching elements
 * arrive as they scroll into view, one after another within their parent:
 *   rise  – fades up            pop   – a smaller, quicker rise (rows, chips, faces)
 *   wipe  – revealed left→right right – slides in from the right
 *   rule  – a short rule draws out from the left
 * `onScroll(root)` may be given for a page's own scroll-linked touch (a drifting strip, a filling timeline).
 * Nothing is added, removed or reordered, and each element is handed back to its own styles once it has arrived.
 * Skipped entirely for reduced motion and Eco mode.
 */
export const usePageMotion = (rootRef, groups, onScroll) => {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || calm() || !('IntersectionObserver' in window)) return undefined;
    const marked = [];
    const timers = [];
    groups.forEach(([selector, kind]) => {
      const byParent = new Map();
      root.querySelectorAll(selector).forEach((el) => {
        if (el.dataset.wm) return;
        const n = byParent.get(el.parentNode) || 0;
        byParent.set(el.parentNode, n + 1);
        el.dataset.wm = kind;
        el.style.setProperty('--i', Math.min(n, 9));
        marked.push(el);
      });
    });
    root.classList.add('wm');
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        io.unobserve(el);
        el.classList.add('wm-in');
        // once it has arrived, let go: the element's own hover and focus transitions take over again
        timers.push(setTimeout(() => delete el.dataset.wm, 2600));
      }),
      { rootMargin: '0px 0px -8% 0px' },
    );
    marked.forEach((el) => io.observe(el));

    let raf = 0;
    const frame = () => {
      raf = 0;
      onScroll(root);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    if (onScroll) {
      window.addEventListener('scroll', kick, { passive: true });
      window.addEventListener('resize', kick);
      kick();
    }

    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
      window.removeEventListener('scroll', kick);
      window.removeEventListener('resize', kick);
      if (raf) cancelAnimationFrame(raf);
      root.classList.remove('wm');
      marked.forEach((el) => {
        delete el.dataset.wm;
        el.classList.remove('wm-in');
        el.style.removeProperty('--i');
      });
    };
    // groups and onScroll are constants defined beside each page
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rootRef]);
};

/** How far an element has travelled up through the viewport: 0 as it enters at the bottom, 1 as it leaves at the top. */
export const through = (el, anchor = 0.6) => {
  const r = el.getBoundingClientRect();
  return Math.min(1, Math.max(0, (window.innerHeight * anchor - r.top) / Math.max(1, r.height)));
};
