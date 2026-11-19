/**
 * Home variant A · "Blueprint".
 * A drawing-board layer over the Home page: guide lines, crosshair marks and section indices, the Earth turned
 * to India inside an orbit that draws itself (in place of the hero collage), a step-through of the four research qualities, and a rail that reads
 * the scroll as the years from 2026 to 2070. Content, order, fonts and colours are the Home page's own.
 */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Globe3D } from './Globe3D';
import { useIndiaEmissions } from '../hooks/useIndiaEmissions';
import { END_YEAR, START_YEAR, el, onScrollFrame, revealOnce, still, yearAt } from './fx-utils';
import './home-fx-a.css';

const FACT_COLOURS = ['#2b9d8f', '#e76f51', '#a7c957', '#f28482'];

const RING =
  '<svg viewBox="0 0 200 200"><circle class="r1" cx="100" cy="100" r="96"/><circle class="r2" cx="100" cy="100" r="88"/>' +
  '<path class="arc" d="M100 4a96 96 0 0 1 96 96"/><path class="arc2" d="M100 196a96 96 0 0 1-83-48"/>' +
  '<g class="tk"><path d="M100 0v8M100 192v8M0 100h8M192 100h8"/></g></svg>';

/** Orbit drawn around the hero globe: two rings, quarter marks, and a dot travelling from 2026 to 2070. */
const Orbit = () => (
  <svg className="fxa-orbit" viewBox="0 0 640 640" aria-hidden="true">
    <circle className="o1" cx="320" cy="320" r="300" pathLength="1" />
    <circle className="o2" cx="320" cy="320" r="262" />
    <g className="ot">
      <path d="M320 8v24M320 608v24M8 320h24M608 320h24" />
    </g>
    <g className="spin">
      <path className="oa" d="M320 20a300 300 0 0 1 260 150" />
      <path className="ob" d="M320 620a300 300 0 0 1-212-88" />
    </g>
    <g className="trav">
      <circle r="7" cx="320" cy="20" />
    </g>
    <text className="oy" x="334" y="34">{START_YEAR}</text>
    <text className="oy end" x="334" y="618">{END_YEAR}</text>
  </svg>
);

export const HomeFxA = ({ rootRef }) => {
  const [orbitHost, setOrbitHost] = useState(null);
  const year = useRef(null);
  const dot = useRef(null);
  const fill = useRef(null);
  const data = useIndiaEmissions();
  const totalGt = data.total / 1e9;
  const share = (data.total / data.worldTotal) * 100;
  const pop = data.population;
  // The story the hero's question rests on, as four facts: many people, a large total, little per person, a date.
  const facts = useMemo(
    () => [
      { label: 'India’s people', metric: `${(pop.india / 1e9).toFixed(2)} billion`, lines: [`${((pop.india / pop.world) * 100).toFixed(0)}% of the world’s population`] },
      { label: `India’s emissions · ${data.latestYear}`, metric: `${totalGt.toFixed(2)} Gt CO₂e`, lines: [`${share.toFixed(1)}% of the world’s greenhouse gases`] },
      { label: 'Per person', metric: `${data.perPerson.india.toFixed(1)} tonnes`, lines: [`World average: ${data.perPerson.world.toFixed(1)} tonnes`] },
      { label: 'The commitment', metric: `Net zero by ${END_YEAR}`, lines: [`${END_YEAR - new Date().getFullYear()} years from now`] },
    ],
    [pop.india, pop.world, data.latestYear, totalGt, share, data.perPerson.india, data.perPerson.world],
  );
  const [fact, setFact] = useState(0);
  const scrolled = useRef(false);

  // the facts turn over on their own; once the visitor scrolls, the scroll through the hero sets the pace
  useEffect(() => {
    if (still()) return undefined;
    const timer = setInterval(() => {
      if (!scrolled.current) setFact((f) => (f + 1) % facts.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [facts.length]);
  // what the globe points out: the country's emissions today, and where the initiative lives
  const markers = useMemo(
    () => [
      // one card over the open ocean south of India, showing one fact at a time
      { id: 'india', lat: 20.5, lon: 79, pulse: true, c: FACT_COLOURS[fact % FACT_COLOURS.length], dx: 30, dy: 168, ...facts[fact], steps: facts.length, step: fact },
      { id: 'delhi', lat: 28.545, lon: 77.19, c: '#a7c957', dx: -74, dy: -44, tag: true, label: 'IIT Delhi · leads NZII' },
    ],
    [facts, fact],
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const calm = still();
    const undo = [];
    root.classList.add('fxa-ready');
    undo.push(() => root.classList.remove('fxa-ready'));
    setOrbitHost(root.querySelector('.hero-art'));

    // Section indices and crosshair marks on every section's top edge
    const sections = [...root.querySelectorAll(':scope > section')];
    sections.forEach((sec, i) => {
      const mark = el('div', 'fxa-mark', `<i class="fxa-x l"></i><i class="fxa-x r"></i><span class="fxa-idx">${String(i + 1).padStart(2, '0')} <em>/ ${String(sections.length).padStart(2, '0')}</em></span>`);
      sec.appendChild(mark);
      undo.push(() => mark.remove());
    });

    // The four qualities: a ring and a step counter for each card; on wide screens they step through one at a time
    const qual = root.querySelector('.qual');
    const cards = qual ? [...qual.querySelectorAll('.qcard')] : [];
    cards.forEach((card, i) => {
      const ring = el('span', 'fxa-ring', RING);
      const count = el('span', 'fxa-count', cards.map((_, k) => `<i${k === i ? ' class="on"' : ''}></i>`).join('') + `<b>${String(i + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}</b>`);
      card.append(ring, count);
      undo.push(() => {
        ring.remove();
        count.remove();
      });
    });
    const wide = window.matchMedia('(min-width:1000px)');
    const setSteps = () => qual && qual.classList.toggle('fxa-steps', wide.matches && !calm);
    setSteps();
    wide.addEventListener('change', setSteps);
    undo.push(() => {
      wide.removeEventListener('change', setSteps);
      if (qual) qual.classList.remove('fxa-steps');
      cards.forEach((c) => c.classList.remove('is-on'));
    });

    // The closing section: "2070" as a large outline behind the last line, and under it six rings on a hairline
    // (today and each decade), the disc inside each smaller than the last until the ring for 2070 stands empty.
    // Symbolic, not a forecast.
    const fin = root.querySelector('.final-in');
    if (fin) {
      const marks = [START_YEAR, 2030, 2040, 2050, 2060, END_YEAR];
      const fills = ['#e76f51', '#e76f51', '#f28482', '#a7c957', '#2b9d8f', 'none'];
      const R = 21;
      const rings = marks.map((y, i) => {
        const cx = 40 + i * 136;
        const left = (END_YEAR - y) / (END_YEAR - START_YEAR); // the share of the road still ahead
        const last = i === marks.length - 1;
        return `<g style="--i:${i}">${last ? `<circle class="halo" cx="${cx}" cy="30" r="${R}"/>` : ''}<circle class="rim" cx="${cx}" cy="30" r="${R}"/>${last ? '' : `<circle class="disc" cx="${cx}" cy="30" r="${(3 + (R - 6) * Math.sqrt(left)).toFixed(1)}" fill="${fills[i]}"/>`}<text x="${cx}" y="78" text-anchor="middle">${y}</text></g>`;
      }).join('');
      const line = el('div', 'fxa-rings', `<svg viewBox="0 0 760 86"><line class="thread" x1="40" x2="720" y1="30" y2="30" pathLength="1"/>${rings}</svg>`);
      const ghost = el('span', 'fxa-ghost', String(END_YEAR));
      fin.append(line);
      fin.prepend(ghost);
      undo.push(() => {
        line.remove();
        ghost.remove();
      });
    }

    // Photographs wipe in, sections draw their marks, when they scroll into view
    undo.push(revealOnce([...root.querySelectorAll('.why .photo, .led .photo, .fxa-mark, .choices')], 'fxa-in'));
    // the closing rings start early, while the section is still below the screen, so they are there when it arrives
    if (fin) undo.push(revealOnce([fin], 'fxa-in', '0px 0px 45% 0px'));
    // …and the rings form the moment their row comes on screen, so the forming is seen
    const ringRow = root.querySelector('.fxa-rings');
    if (ringRow) undo.push(revealOnce([ringRow], 'go', '0px 0px -4% 0px'));

    // The rail reads the scroll as years
    undo.push(
      onScrollFrame((p) => {
        // the last stretch of the page (the closing section and the footer) rests on the final year
        if (year.current) year.current.textContent = yearAt(Math.min(1, p / 0.9));
        if (dot.current) dot.current.style.top = p * 100 + '%';
        if (fill.current) fill.current.style.transform = `scaleY(${p})`;
        root.style.setProperty('--fxa-p', p.toFixed(4));
        // which quality is on the stage: the scroll through the block, in four equal parts
        if (qual && cards.length && qual.classList.contains('fxa-steps')) {
          const r = qual.getBoundingClientRect();
          const top = parseFloat(getComputedStyle(cards[0]).top) || 120;
          const span = Math.max(1, r.height - cards[0].offsetHeight);
          const at = Math.min(cards.length - 1, Math.max(0, Math.floor(((top - r.top) / span) * cards.length)));
          cards.forEach((c, k) => c.classList.toggle('is-on', k === at));
        }
        // how far the hero has scrolled away (0–1): eases the globe back, and steps through the facts
        const hero = root.querySelector('.hero');
        const h = hero ? Math.min(1, Math.max(0, window.scrollY / (hero.offsetHeight * 0.85))) : 0;
        // how far "Where India stands" has climbed the screen (0 as its top passes 70% of the way down, 1 at 12%):
        // the navy spreads across it over that stretch. With reduced motion it is simply navy.
        const fp = root.querySelector('section.fp');
        if (fp) {
          const vh = window.innerHeight;
          const n = still() ? 1 : Math.min(1, Math.max(0, (vh * 0.7 - fp.getBoundingClientRect().top) / (vh * 0.58)));
          root.style.setProperty('--fxa-n', n.toFixed(3));
        }
        // (with reduced motion or Eco mode the Earth stays as it is)
        root.style.setProperty('--fxa-h', still() ? '0' : h.toFixed(3));
        root.classList.toggle('fxa-past', !still() && h > 0.2); // faded: let clicks through to what is beneath
        root.classList.toggle('fxa-gone', !still() && h >= 1);
        scrolled.current = h > 0.06;
        if (scrolled.current && !still()) setFact(Math.min(facts.length - 1, Math.floor(h * facts.length)));
      }),
    );
    undo.push(() => {
      root.style.removeProperty('--fxa-p');
      root.style.removeProperty('--fxa-h');
      root.style.removeProperty('--fxa-n');
      root.classList.remove('fxa-past', 'fxa-gone');
    });

    return () => undo.reverse().forEach((fn) => fn());
  }, [rootRef, facts.length]);

  return (
    <>
      <div className="fxa-guides" aria-hidden="true"><i /><i /><i /><i /><i /></div>
      <aside className="fxa-rail" aria-hidden="true">
        <span className="fxa-rail-k">{START_YEAR}</span>
        <div className="fxa-rail-track">
          <i ref={fill} />
          <b ref={dot}><span ref={year}>{START_YEAR}</span></b>
        </div>
        <span className="fxa-rail-k">{END_YEAR}</span>
      </aside>
      {orbitHost && createPortal(
        <div className="fxa-globe">
          <Orbit />
          <Globe3D cities={markers} ariaLabel={`The Earth, turned to India. ${facts.map((f) => `${f.label}: ${f.metric}, ${f.lines[0]}`).join('. ')}.`} />
          <p className="fxa-globe-src">
            Emissions ({data.latestYear}, estimate) from <a href={data.sourceUrl} target="_blank" rel="noopener">{data.source}</a>, population from{' '}
            <a href={data.population.sourceUrl} target="_blank" rel="noopener">{data.population.source}</a> ({data.population.year}). Drag to turn the globe.
          </p>
        </div>,
        orbitHost,
      )}
    </>
  );
};
