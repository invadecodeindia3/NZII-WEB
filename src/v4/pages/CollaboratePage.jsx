/**
 * V4 'Collaborate with us' — the open calls for collaboration, then an introduction to the collaborators.
 * Built from the NZII Version 2 prototype (NZII_People_Page.html). Calls and dates live in ../data/people.js.
 */
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGame } from '../../context/GameContext';
import { COLLABORATORS, OPEN_CALLS, OPEN_CALLS_SITE } from '../data/people';
import { usePageTitle } from '../hooks/usePrototypeBehaviours';
import { useCollabMotion } from '../hooks/pageMotions';
import { CollabNetwork } from '../components/CollabNetwork';
import '../styles/collaborate.css';
import '../styles/collab-extras.css';

// An icon and a brand colour for each call's theme
const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.9, strokeLinecap: 'round', strokeLinejoin: 'round' };
const THEME_LOOK = {
  employment: { c: 'var(--coral)', icon: <><circle cx="9" cy="8" r="3.2" /><path d="M2.8 20c.4-3.6 2.9-5.6 6.2-5.6s5.8 2 6.2 5.6" /><circle cx="17.2" cy="9.2" r="2.4" /><path d="M17.4 14.2c2.2.3 3.6 1.9 3.9 4.3" /></> },
  biodiversity: { c: 'var(--lime)', icon: <><path d="M5 19c0-8 5-13 14-14 0 9-5 14-14 14z" /><path d="M5 19c3-4.5 6-7.5 10-10" /></> },
  capital: { c: 'var(--teal)', icon: <><path d="M3 20h18" /><path d="M6 20v-5M11 20v-9M16 20v-6" /><path d="M5 9l5-4 4 3 6-5" /><path d="M16.5 3H20v3.5" /></> },
  'agent-based': { c: 'var(--pink)', icon: <><circle cx="12" cy="5" r="2.3" /><circle cx="5" cy="18" r="2.3" /><circle cx="19" cy="18" r="2.3" /><circle cx="12" cy="13" r="1.7" /><path d="M12 7.3v4M10.6 14.1 6.5 16.5M13.4 14.1l4.1 2.4" /></> },
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Live until a deadline is set; then "Closing soon" in the last 14 days and "Closed" after it.
const roundStatus = (deadline) => {
  if (!deadline) return { cls: 's-open', label: 'Live', due: 'To be confirmed', tbc: true };
  const [y, m, d] = deadline.slice(0, 10).split('-').map(Number);
  const date = `${d} ${MONTHS[m - 1]} ${y}`;
  const days = Math.ceil((new Date(deadline) - new Date()) / 86400000);
  if (days < 0) return { cls: 's-closed', label: 'Closed', due: date };
  return { cls: days <= 14 ? 's-closing' : 's-open', label: days <= 14 ? 'Closing soon' : 'Live', due: `${date} · ${days} days left` };
};

// Small cluster of brand dots in the corner of the photograph, denser towards the corner.
const drawCluster = (svg) => {
  const ns = 'http://www.w3.org/2000/svg';
  const palette = ['#2b9d8f', '#a7c957', '#e76f51', '#f28482'];
  const bg = getComputedStyle(svg).getPropertyValue('--bg').trim() || '#fffcf6';
  while (svg.firstChild) svg.removeChild(svg.firstChild);
  let seed = 11;
  const rnd = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 7; x++) {
      const d = (x + y) / 10;
      if (rnd() > d) continue;
      const c = document.createElementNS(ns, 'circle');
      c.setAttribute('cx', 8 + x * 17);
      c.setAttribute('cy', 8 + y * 18);
      c.setAttribute('r', (1.5 + d * 5 * rnd()).toFixed(1));
      c.setAttribute('fill', d > 0.75 ? bg : palette[Math.floor(rnd() * palette.length)]);
      if (d <= 0.75) {
        c.setAttribute('class', 'pl');
        c.style.setProperty('--dl', (6 - x + (4 - y)) * 0.22 + 's');
      }
      svg.appendChild(c);
    }
  }
};

export const CollaboratePage = () => {
  const cluster = useRef(null);
  const root = useRef(null);
  useCollabMotion(root);
  usePageTitle('Collaborate with us | Net Zero India Initiative');
  const { displayMode } = useGame();
  const status = roundStatus(OPEN_CALLS.deadline);

  useEffect(() => {
    if (cluster.current) drawCluster(cluster.current);
  }, [displayMode]);

  return (
    <main id="content" ref={root}>
        <div className="container page">
          <section className="oc-start" id="open-calls">
            <div className="oc-head">
              <h1>IIT Delhi’s Open Calls for Collaboration under&nbsp;<abbr title="Research Frontier Networks">RFNs</abbr></h1>
              <hr className="rule" />
              <p className="lead">Through the open calls for collaboration, funded by Schmidt Sciences, the IIT Delhi NZII team aims to identify and address emergent capacity deficits across several thematic areas of the Net Zero India Initiative (NZII). In this round, we release four calls for collaboration along the following themes; each theme is described in detail in the corresponding links&nbsp;below.</p>
              <div className="oc-by">
                <span className="ww-chip"><img src="/assets/logos/spp-iit-delhi.png" alt="School of Public Policy, IIT Delhi" width="455" height="120" /></span>
                <span className="ww-chip"><img src="/assets/logos/schmidt-sciences.svg" alt="Schmidt Sciences" width="160" height="50" /></span>
              </div>
            </div>

            <aside className="home-side oc-side" aria-label="Current round">
              <div className="panel feature" id="feature">
                <div className="call-top">
                  <span className={`st ${status.cls}`}>{status.label}</span>
                  <b className="round">{OPEN_CALLS.round}</b>
                </div>
                <dl className="facts-mini">
                  <div><dt>Deadline</dt><dd className={status.tbc ? 'tbc' : undefined}>{status.due}</dd></div>
                  <div><dt>Honorarium</dt><dd className={OPEN_CALLS.honorarium ? undefined : 'tbc'}>{OPEN_CALLS.honorarium || 'To be confirmed'}</dd></div>
                </dl>
                <a className="btn" href={OPEN_CALLS_SITE} target="_blank" rel="noopener">
                  Explore Open Calls <span className="ar" aria-hidden="true">↗</span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                <a className="go" href={`${OPEN_CALLS_SITE}#how-it-works`} target="_blank" rel="noopener">
                  How to apply <span className="ar" aria-hidden="true">→</span>
                </a>
              </div>
              <CollabNetwork people={COLLABORATORS} />
            </aside>

            <ul className="tiles" id="theme-list">
              {OPEN_CALLS.calls.map((c) => (
                <li key={c.id} className="tile" style={{ '--tc': (THEME_LOOK[c.id] || THEME_LOOK.capital).c }}>
                  <a href={`${OPEN_CALLS_SITE}#call-${c.id}`} target="_blank" rel="noopener">
                    <span className="tile-top">
                      <span className="tile-ic" aria-hidden="true"><svg viewBox="0 0 24 24" {...stroke}>{(THEME_LOOK[c.id] || THEME_LOOK.capital).icon}</svg></span>
                      <span className="call-no">Call {c.no} · {c.theme}</span>
                    </span>
                    <b>{c.title}</b>
                    <span className="tile-meta">Stay: {c.stay}</span>
                    <span className="tile-go" aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section className="ww-meet" aria-labelledby="h-meet">
            {/* Placeholder photograph (to be reviewed with the imagery guidelines) */}
            <figure className="ww-photo">
              <img
                src="/assets/photos/who/collab-agri-speaker.jpg"
                srcSet="/assets/photos/who/collab-agri-speaker-sm.jpg 500w, /assets/photos/who/collab-agri-speaker.jpg 1000w"
                sizes="(max-width:900px) 92vw, 45vw"
                width="1000"
                height="1000"
                alt="A researcher speaks at an NZII workshop on agriculture, IIT Delhi, December 2024"
                loading="lazy"
              />
              <svg ref={cluster} className="cluster" viewBox="0 0 120 90" aria-hidden="true" />
            </figure>
            <div className="ww-meet-txt">
              <h2 id="h-meet">Meet the collaborators</h2>
              <p className="lead ww-meet-p">The Net Zero India Initiative brings together researchers and institutions across energy systems, public policy, land, development, and related fields to build a rigorous, India-specific understanding of the&nbsp;transition.</p>
              <span className="ww-faces">
                {COLLABORATORS.map((p) => <img key={p.key} src={p.photo} alt={p.name} loading="lazy" />)}
              </span>
              <Link className="btn line" to="/v4/who-we-are#partners-and-collaborators">Collaborators <span className="ar" aria-hidden="true">→</span></Link>
            </div>
          </section>
        </div>
    </main>
  );
};
