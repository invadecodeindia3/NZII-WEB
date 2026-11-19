// Small DOM helpers shared by the V4 pages.

/** Cards: the dot spotlight follows the cursor. */
export const spotlight = (e) => {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty('--mx', e.clientX - r.left + 'px');
  el.style.setProperty('--my', e.clientY - r.top + 'px');
};

/** Scroll to a person or section and briefly highlight a person. */
export const goToAnchor = (id, { flash = true, block = 'center' } = {}) => {
  const t = document.getElementById(id);
  if (!t) return false;
  const calm = matchMedia('(prefers-reduced-motion:reduce)').matches;
  t.scrollIntoView({ behavior: calm ? 'auto' : 'smooth', block });
  if (flash) {
    t.classList.remove('pflash');
    void t.offsetWidth;
    t.classList.add('pflash');
    setTimeout(() => t.classList.remove('pflash'), 2200);
  }
  return true;
};
