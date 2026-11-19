import React, { useEffect, useRef } from 'react';
import { useGame } from '../../context/GameContext';
import { goToAnchor } from '../utils/dom';

const NS = 'http://www.w3.org/2000/svg';

// The field changes shape with the screen: as many columns and rows as fit beside the hero text on wide
// screens, a wide low band under the text on tablets, and a squarer field on phones.
const layoutFor = (svg, textEl) => {
  const wrap = svg.parentNode;
  if (!matchMedia('(max-width:900px)').matches) {
    const sw = wrap.getBoundingClientRect().width || 520;
    const cols = Math.max(16, Math.min(28, Math.floor((sw / 1.28 - 24) / 25) + 1));
    const k = sw / (24 + (cols - 1) * 25);
    const th = textEl ? textEl.getBoundingClientRect().height : 0;
    const rows = Math.max(9, Math.min(24, Math.floor((th / k - 24) / 24.5) + 1));
    return { mode: `side-${cols}x${rows}`, cols, rows };
  }
  const w = wrap.getBoundingClientRect().width || 360;
  if (w >= 520) return { mode: 'band', cols: 24, rows: 7 };
  if (w >= 400) return { mode: 'mid', cols: 18, rows: 8 };
  return { mode: 'phone', cols: 13, rows: 10 };
};

/**
 * Hero dot field in which every highlighted dot is a real team member:
 * hover or focus shows the name and role, a click scrolls to that person on the page.
 */
export const PeopleDots = ({ people, textRef }) => {
  const svgRef = useRef(null);
  const tipRef = useRef(null);
  const { displayMode } = useGame();

  useEffect(() => {
    const svg = svgRef.current;
    const tip = tipRef.current;
    if (!svg || !tip) return undefined;
    const wrap = svg.parentNode;

    const hide = () => {
      tip.hidden = true;
      tip.classList.remove('below');
    };
    const show = (circle, p) => {
      tip.firstChild.textContent = p.name;
      tip.lastChild.textContent = p.role;
      tip.classList.remove('below');
      tip.hidden = false;
      const r = circle.getBoundingClientRect();
      const w = wrap.getBoundingClientRect();
      const tw = tip.offsetWidth;
      const th = tip.offsetHeight;
      const left = Math.max(tw / 2, Math.min(w.width - tw / 2, r.left + r.width / 2 - w.left));
      const below = r.top - th - 14 < 80; // no room above (under the sticky header): show it below
      tip.classList.toggle('below', below);
      tip.style.left = left + 'px';
      tip.style.top = (below ? r.bottom : r.top) - w.top + 'px';
    };

    const draw = () => {
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      hide();
      const { mode, cols: C, rows: R } = layoutFor(svg, textRef?.current);
      svg.setAttribute('viewBox', `0 0 ${24 + (C - 1) * 25} ${24 + (R - 1) * 24.5}`);
      svg.dataset.mode = mode;

      // People sit on every third cell of the right-hand part of the field, spread evenly, in team order.
      const all = [];
      for (let x = Math.floor(C * 0.36); x < C; x++) for (let y = 0; y < R; y++) if ((x + y) % 3 === 0) all.push([x, y]);
      const cells = [];
      for (let k = 0; k < people.length && k < all.length; k++) cells.push(all[Math.floor((k * all.length) / people.length)]);
      const taken = new Set(cells.map((c) => c.join(',')));

      const base = getComputedStyle(svg).getPropertyValue('--dot-base').trim() || '#1d3658';
      const palette = [base, '#2b9d8f', '#a7c957', '#e76f51', '#f28482'];
      let seed = 7;
      const rnd = () => {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280;
      };
      for (let y = 0; y < R; y++) {
        for (let x = 0; x < C; x++) {
          const px = x / (C - 1);
          if (rnd() > 0.25 + px * 0.7) continue;
          const radius = (2 + px * 8 * rnd()).toFixed(1);
          const fill = px < 0.35 ? base : palette[Math.floor(rnd() * palette.length)];
          if (taken.has(x + ',' + y)) continue;
          const c = document.createElementNS(NS, 'circle');
          c.setAttribute('cx', 12 + x * 25);
          c.setAttribute('cy', 12 + y * 24.5);
          c.setAttribute('r', radius);
          c.setAttribute('fill', fill);
          c.setAttribute('class', 'pfield');
          svg.appendChild(c);
        }
      }

      people.forEach((p, i) => {
        if (!cells[i]) return;
        const cx = 12 + cells[i][0] * 25;
        const cy = 12 + cells[i][1] * 24.5;
        const a = document.createElementNS(NS, 'a');
        a.setAttribute('href', '#' + p.id);
        a.setAttribute('class', `pdot pd-${p.g}${p.lead ? ' lead' : ''}`);
        a.setAttribute('aria-label', p.name + (p.role ? ', ' + p.role : ''));
        const hit = document.createElementNS(NS, 'circle');
        hit.setAttribute('cx', cx);
        hit.setAttribute('cy', cy);
        hit.setAttribute('r', 16);
        hit.setAttribute('class', 'phit');
        a.appendChild(hit);
        const c = document.createElementNS(NS, 'circle');
        c.setAttribute('cx', cx);
        c.setAttribute('cy', cy);
        c.setAttribute('r', p.g === 'pi' ? 8.5 : 7);
        a.appendChild(c);
        a.addEventListener('pointerenter', (e) => {
          if (e.pointerType === 'mouse') show(c, p);
        });
        a.addEventListener('focus', () => show(c, p));
        a.addEventListener('pointerleave', hide);
        a.addEventListener('blur', hide);
        a.addEventListener('click', (e) => {
          hide();
          if (!document.getElementById(p.id)) return;
          e.preventDefault();
          goToAnchor(p.id);
          try {
            history.replaceState(null, '', '#' + p.id);
          } catch { /* ignore */ }
        });
        svg.appendChild(a);
      });
    };

    draw();
    let timer = 0;
    const check = () => {
      if (svg.dataset.mode !== layoutFor(svg, textRef?.current).mode) draw();
    };
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(check, 150);
    };
    window.addEventListener('resize', onResize);
    // the text height settles once the fonts load
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(check);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', onResize);
    };
  }, [people, textRef, displayMode]);

  return (
    <div className="pdots-wrap">
      <svg ref={svgRef} className="dots pdots" viewBox="0 0 400 220" role="group" aria-label="The NZII team, one dot per person" />
      <div ref={tipRef} className="pdot-tip" hidden><b /><span /></div>
    </div>
  );
};
