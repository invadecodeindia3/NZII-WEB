/**
 * Timeline navigator for News & Events. It reads the events already on the page and shows one dot for each,
 * grouped by year, in a bar that stays under the header: the dot for the event being read is highlighted, the
 * bar names that event, and any dot jumps to its event (opening an older, folded year first).
 * It also adds visual touches to the timeline itself: the date beside each event, the year as a large outline
 * behind each year's block, and a `lit` state on each event once it has been reached (see news-extras.css,
 * where wide screens set the events either side of a central spine).
 */
import React, { useEffect, useRef, useState } from 'react';

const calm = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.getAttribute('data-mode') === 'eco';

export const NewsRail = ({ rootRef }) => {
  const [events, setEvents] = useState([]);
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState(-1);
  const list = useRef([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const added = [];
    const found = [];
    root.querySelectorAll('.ev-time .ev-year').forEach((sec) => {
      const year = (sec.querySelector('.ev-y')?.id || '').replace(/^y-/, '');
      sec.dataset.year = year;
      sec.querySelectorAll('.ev-list > .ev').forEach((el) => {
        const meta = el.querySelector('.ev-meta')?.textContent.trim() || '';
        const month = meta.split(/\s+/)[0] || '';
        // the month, set beside the spine like a calendar tab
        const chip = document.createElement('span');
        chip.className = 'nv-month';
        chip.setAttribute('aria-hidden', 'true');
        // short for the tab beside a left-hand spine; in full for the chip across a central spine
        chip.innerHTML = '<i></i><b></b>';
        chip.firstChild.textContent = month.slice(0, 3);
        chip.lastChild.textContent = meta.split('·')[0].trim();
        el.prepend(chip);
        added.push(chip);
        found.push({ el, id: el.id, year, month, when: meta.split('·')[0].trim(), title: el.querySelector('h4')?.textContent.trim() || '' });
      });
    });
    // Sides for the wide, two-column layout: events pair up left and right of the spine. When a year has an odd
    // number, its last event closes the year on the spine itself instead of leaving half a row empty.
    const sided = [];
    root.querySelectorAll('.ev-time .ev-list').forEach((ul) => {
      const items = [...ul.querySelectorAll(':scope > .ev:not(.ev-feature)')];
      // Which one closes the year when the number is odd: the last of whichever kind (with a picture, or without)
      // is itself odd in number, so that pictures pair with pictures and text with text, and a pair is level.
      let mid = -1;
      if (items.length % 2 === 1) {
        const pictured = items.map((el) => !!el.querySelector('.has-media'));
        const kind = pictured.filter(Boolean).length % 2 === 1;
        mid = pictured.lastIndexOf(kind);
      }
      let n = 0;
      items.forEach((el, i) => {
        el.classList.add(i === mid ? 'nv-mid' : n++ % 2 ? 'nv-r' : 'nv-l');
        sided.push(el);
      });
    });
    list.current = found;
    setEvents(found);

    // which event is being read: the last one whose top has passed the middle of the screen
    let raf = 0;
    const still = calm();
    const read = () => {
      raf = 0;
      const mid = window.innerHeight * 0.5;
      let at = 0;
      found.forEach((e, i) => {
        if (e.el.offsetParent !== null && e.el.getBoundingClientRect().top < mid) at = i;
      });
      setActive(at);
      // an event lights up once it is properly on screen (everything is lit when motion is reduced)
      const reach = window.innerHeight * 0.78;
      found.forEach((e) => {
        if (still || (e.el.offsetParent !== null && e.el.getBoundingClientRect().top < reach)) e.el.classList.add('lit');
      });
      if (!still) {
        // the outlined years drift a little against the scroll
        root.querySelectorAll('.ev-time .ev-year').forEach((sec) => {
          const r = sec.getBoundingClientRect();
          if (r.bottom < -200 || r.top > window.innerHeight + 200) return;
          sec.style.setProperty('--nv-y', ((r.top - window.innerHeight * 0.3) * -0.08).toFixed(1));
        });
      }
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(read);
    };
    window.addEventListener('scroll', kick, { passive: true });
    window.addEventListener('resize', kick);
    kick();
    return () => {
      window.removeEventListener('scroll', kick);
      window.removeEventListener('resize', kick);
      if (raf) cancelAnimationFrame(raf);
      added.forEach((n) => n.remove());
      found.forEach((e) => e.el.classList.remove('lit'));
      sided.forEach((el) => el.classList.remove('nv-l', 'nv-r', 'nv-mid'));
      root.querySelectorAll('.ev-time .ev-year').forEach((sec) => {
        delete sec.dataset.year;
        sec.style.removeProperty('--nv-y');
      });
    };
  }, [rootRef]);

  const go = (i) => {
    const e = list.current[i];
    if (!e) return;
    const sec = e.el.closest('.ev-year');
    if (sec && sec._open && e.el.closest('[hidden]')) sec._open(); // an older, folded year opens first
    e.el.scrollIntoView({ behavior: calm() ? 'auto' : 'smooth', block: 'center' });
    e.el.classList.add('flash');
    setTimeout(() => e.el.classList.remove('flash'), 1800);
  };

  if (!events.length) return null;
  const shown = events[hover >= 0 ? hover : active];
  const years = [...new Set(events.map((e) => e.year))];

  return (
    <nav className="nv-rail" aria-label="Jump to an event">
      <div className="nv-years">
        {years.map((y) => (
          <div key={y} className={`nv-year${shown.year === y ? ' on' : ''}`}>
            <span className="nv-y">{y}</span>
            <span className="nv-dots">
              {events.map((e, i) =>
                e.year === y ? (
                  <button
                    key={e.id}
                    type="button"
                    className={`nv-dot${i === active ? ' on' : ''}${i < active ? ' read' : ''}`}
                    aria-label={`${e.when}: ${e.title}`}
                    aria-current={i === active ? 'true' : undefined}
                    onClick={() => go(i)}
                    onPointerEnter={() => setHover(i)}
                    onPointerLeave={() => setHover(-1)}
                    onFocus={() => setHover(i)}
                    onBlur={() => setHover(-1)}
                  />
                ) : null,
              )}
            </span>
          </div>
        ))}
      </div>
      <p className="nv-now" aria-hidden="true">
        <b key={shown.id + 'w'}>{shown.when}</b>
        <span key={shown.id}>{shown.title}</span>
      </p>
      <span className="nv-count" aria-hidden="true">{String((hover >= 0 ? hover : active) + 1).padStart(2, '0')} / {String(events.length).padStart(2, '0')}</span>
    </nav>
  );
};
