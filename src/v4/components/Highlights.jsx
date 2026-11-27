import React from 'react';
import { Link } from 'react-router-dom';
import { OPEN_CALLS, OPEN_CALLS_SITE } from '../data/people';
import { UPCOMING, upcomingActive } from '../data/upcoming';
import '../styles/highlights.css';

const Arrow = () => (
  <svg className="hl-ar" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

/** The upcoming event and the open calls, side by side, on the pages people land on. */
export const Highlights = () => (
  <aside className={`hl-band${upcomingActive() ? '' : ' one'}`} aria-label="Upcoming event and open calls">
    {upcomingActive() && (
      <Link className="hl-item up" to={UPCOMING.to}>
        <span className="hl-tag">Upcoming event</span>
        <b>{UPCOMING.title}</b>
        <span className="hl-when">{UPCOMING.when} · {UPCOMING.where}</span>
        <Arrow />
      </Link>
    )}
    <a className="hl-item live" href={OPEN_CALLS_SITE} target="_blank" rel="noopener">
      <span className="hl-tag"><i aria-hidden="true" />Open calls · Live</span>
      <b>{OPEN_CALLS.round}: {OPEN_CALLS.calls.length} calls for research collaboration at IIT&nbsp;Delhi</b>
      <span className="hl-when">IIT Delhi – Schmidt Sciences Open Calls</span>
      <Arrow />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  </aside>
);
