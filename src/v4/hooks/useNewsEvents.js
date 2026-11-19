import { useEffect } from 'react';

const CHEVRON =
  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';

/** Reading panels: "Read more" opens the event's dialog; × closes it; a click outside closes it. */
export const useEventDialogs = (rootRef) => {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const outside = (e, d) => {
      const r = d.getBoundingClientRect();
      return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
    };
    const native = 'closedBy' in HTMLDialogElement.prototype;
    let down = false;

    const onClick = (e) => {
      const opener = e.target.closest('.ev-open');
      if (opener) {
        const d = document.getElementById(opener.dataset.dialog);
        if (!d) return;
        d.showModal();
        const x = d.querySelector('.evd-x');
        if (x) x.focus({ preventScroll: true });
        d.scrollTop = 0;
        return;
      }
      const x = e.target.closest('dialog.evd .evd-x');
      if (x) x.closest('dialog').close();
    };
    const onDown = (e) => {
      const d = e.target.closest('dialog.evd');
      down = !!d && e.target === d && outside(e, d);
    };
    const onUp = (e) => {
      const d = e.target.closest('dialog.evd');
      if (!native && d && down && e.target === d && outside(e, d)) d.close();
      down = false;
    };
    root.addEventListener('click', onClick);
    root.addEventListener('pointerdown', onDown);
    root.addEventListener('pointerup', onUp);
    return () => {
      root.removeEventListener('click', onClick);
      root.removeEventListener('pointerdown', onDown);
      root.removeEventListener('pointerup', onUp);
      root.querySelectorAll('dialog.evd[open]').forEach((d) => d.close());
    };
  }, [rootRef]);
};

/**
 * Keeps the timeline manageable as events are added: a year with more than 8 events shows its first 6 and a
 * "Show more" button. (Older years can also be folded into a single row: see OPEN_YEARS.)
 * A link to an event (#2026-01-…) opens its year first.
 */
export const useYearFolding = (rootRef) => {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const years = [...root.querySelectorAll('.ev-time .ev-year')];
    if (!years.length) return undefined;
    const OPEN_YEARS = Infinity; // every year is shown open; lower this to fold older years into one row
    const MAX = 8;
    const SHOW = 6;
    const undo = [];
    const hide = (el) => {
      el.setAttribute('hidden', 'until-found');
      if (!('onbeforematch' in document.body)) el.hidden = true;
    };

    years.forEach((sec, i) => {
      const h = sec.querySelector('.ev-y');
      const list = sec.querySelector('.ev-list');
      const items = [...list.children];
      const n = items.length;
      if (!list.id) list.id = 'ev-list-' + (h.id || i);

      if (i >= OPEN_YEARS) {
        // older year: one row, opens in place
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'ev-fold';
        b.setAttribute('aria-controls', list.id);
        b.setAttribute('aria-expanded', 'false');
        b.innerHTML = n + (n === 1 ? ' event ' : ' events ') + CHEVRON;
        h.appendChild(b);
        hide(list);
        sec.classList.add('folded');
        const set = (o) => {
          if (o) list.removeAttribute('hidden');
          else hide(list);
          b.setAttribute('aria-expanded', String(o));
          sec.classList.toggle('folded', !o);
        };
        const onMatch = () => set(true);
        b.addEventListener('click', () => set(list.hasAttribute('hidden')));
        list.addEventListener('beforematch', onMatch);
        sec._open = () => set(true);
        undo.push(() => {
          b.remove();
          list.removeEventListener('beforematch', onMatch);
          list.removeAttribute('hidden');
          sec.classList.remove('folded');
          delete sec._open;
        });
      } else if (n > MAX) {
        // a busy year: first 6, then "Show more"
        const rest = items.slice(SHOW);
        const wrap = document.createElement('li');
        wrap.className = 'ev-more-li';
        const m = document.createElement('button');
        m.type = 'button';
        m.className = 'ev-fold ev-more-btn';
        m.setAttribute('aria-expanded', 'false');
        m.innerHTML = 'Show ' + rest.length + ' more ' + CHEVRON;
        wrap.appendChild(m);
        list.appendChild(wrap);
        const showRest = () => {
          rest.forEach((li) => li.removeAttribute('hidden'));
          wrap.remove();
        };
        rest.forEach((li) => {
          hide(li);
          li.addEventListener('beforematch', showRest);
        });
        m.addEventListener('click', showRest);
        sec._open = showRest;
        undo.push(() => {
          rest.forEach((li) => li.removeEventListener('beforematch', showRest));
          showRest();
          delete sec._open;
        });
      }
    });

    const reveal = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      const t = document.getElementById(id);
      if (!t || !t.closest('.ev-time')) return;
      const sec = t.closest('.ev-year');
      if (sec && sec._open && t.closest('[hidden]')) sec._open();
      t.scrollIntoView({ block: 'center' });
    };
    reveal();
    window.addEventListener('hashchange', reveal);
    return () => {
      window.removeEventListener('hashchange', reveal);
      undo.forEach((fn) => fn());
    };
  }, [rootRef]);
};
