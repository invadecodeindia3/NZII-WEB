// Shared helpers for the two animated Home variants (A · Blueprint, B · Living map).

/** True when motion should be skipped: the visitor prefers reduced motion, or Eco mode is on. */
export const still = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
  document.documentElement.getAttribute('data-mode') === 'eco';

/** Calls `fn(progress 0–1, scrollY)` once per frame while the page scrolls or resizes. Returns a cleanup. */
export const onScrollFrame = (fn) => {
  let raf = 0;
  const run = () => {
    raf = 0;
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    fn(Math.min(1, Math.max(0, window.scrollY / max)), window.scrollY);
  };
  const kick = () => {
    if (!raf) raf = requestAnimationFrame(run);
  };
  window.addEventListener('scroll', kick, { passive: true });
  window.addEventListener('resize', kick);
  kick();
  return () => {
    window.removeEventListener('scroll', kick);
    window.removeEventListener('resize', kick);
    if (raf) cancelAnimationFrame(raf);
  };
};

/** The page's story runs from today to India's net-zero year. */
export const START_YEAR = 2026;
export const END_YEAR = 2070;
export const yearAt = (p) => Math.round(START_YEAR + p * (END_YEAR - START_YEAR));

/** Create an element with a class (and optional HTML), for decorative nodes added around existing markup. */
export const el = (tag, className, html) => {
  const n = document.createElement(tag);
  n.className = className;
  n.setAttribute('aria-hidden', 'true');
  if (html) n.innerHTML = html;
  return n;
};

/** Adds `cls` to each element the first time it scrolls into view. Returns a cleanup. */
export const revealOnce = (elements, cls, rootMargin = '0px 0px -12% 0px') => {
  if (!('IntersectionObserver' in window)) {
    elements.forEach((e) => e.classList.add(cls));
    return () => {};
  }
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add(cls);
        io.unobserve(e.target);
      }
    }),
    { rootMargin },
  );
  elements.forEach((e) => io.observe(e));
  return () => {
    io.disconnect();
    elements.forEach((e) => e.classList.remove(cls));
  };
};
