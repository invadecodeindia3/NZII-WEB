import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { UPCOMING, upcomingActive } from '../data/upcoming';
import { OPEN_CALLS_DATA as O } from '../data/openCalls';
import '../styles/open-calls-pill.css';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const KEY = 'nzii-oc-pop-closed';

/**
 * Open calls pop-up on the Home page. It appears once the visitor scrolls past the hero; × hides it for the
 * rest of the visit. Hidden when no theme is open or the last date has passed; "Closing soon" in the last 14 days.
 *
 * With `smart` (the animated Home designs) it stays out of the way: it is a small pill above the version
 * switcher, which opens the full card only when clicked (the card folds away again when left); and it steps aside altogether while the page's own "Collaborate with us" card or the
 * footer is on screen, where it would only be repeating them.
 */
export const OpenCallsPopup = ({ heroSelector, smart = false }) => {
  const [visible, setVisible] = useState(false);
  const [on, setOn] = useState(false);
  const closed = useRef(false);
  const [expanded, setExpanded] = useState(!smart); // smart: the full card (true) or the pill (false)
  const [tucked, setTucked] = useState(false); // smart: stepped aside
  const [flyerOpen, setFlyerOpen] = useState(false);
  const flyerDlg = useRef(null);
  const ws = upcomingActive();
  const fold = useRef(0);
  const foldSoon = (ms) => {
    clearTimeout(fold.current);
    if (flyerOpen) return;
    fold.current = setTimeout(() => setExpanded(false), ms);
  };

  const open = (O.themes || []).filter((t) => t.open !== false);
  const todayIST = new Date(Date.now() + 19800000).toISOString().slice(0, 10); // calendar days in India time
  const last = O.lastDate ? new Date(O.lastDate + 'T12:00:00+05:30') : null;
  const days = O.lastDate ? Math.round((Date.parse(O.lastDate) - Date.parse(todayIST)) / 864e5) : null;
  const active = open.length > 0 && !(last && days < 0);

  useEffect(() => {
    if (!active) return undefined;
    try {
      if (sessionStorage.getItem(KEY)) return undefined;
    } catch { /* ignore */ }
    const hero = document.querySelector(heroSelector);
    if (!hero) return undefined;
    const show = () => {
      if (!closed.current) setVisible(true);
    };
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (es) => es.forEach((e) => {
          if (!e.isIntersecting && e.boundingClientRect.top < 0) show();
        }),
        { threshold: 0 },
      );
      io.observe(hero);
      return () => io.disconnect();
    }
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.8) show();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [active, heroSelector]);

  // fade in on the frame after it is shown
  useEffect(() => {
    if (!visible) return undefined;
    let b = 0;
    const a = requestAnimationFrame(() => {
      b = requestAnimationFrame(() => setOn(true));
    });
    return () => {
      cancelAnimationFrame(a);
      cancelAnimationFrame(b);
    };
  }, [visible]);

  useEffect(() => () => clearTimeout(fold.current), []);

  // smart: step aside while the page is already making the same invitation, or has reached its footer
  useEffect(() => {
    if (!smart || !('IntersectionObserver' in window)) return undefined;
    const targets = [...document.querySelectorAll('#content .work a[href$="/collaborate"], .site-footer')];
    const seen = new Set();
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)));
      setTucked(seen.size > 0);
    }, { threshold: 0.15 });
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [smart]);

  useEffect(() => {
    const d = flyerDlg.current;
    if (!d) return;
    if (flyerOpen && !d.open) d.showModal();
    if (!flyerOpen && d.open) d.close();
  }, [flyerOpen]);

  if (!active) return null;

  // the Winter School flyer, full size, over the page
  const flyer = ws && createPortal(
    <div className="v4-shell v4-p-home">
      <dialog ref={flyerDlg} className="ws-flyer" aria-label={`${UPCOMING.name} flyer`} onClose={() => setFlyerOpen(false)} onClick={(e) => { if (e.target === e.currentTarget) setFlyerOpen(false); }}>
        <div className="ws-flyer-in">
          <img src={UPCOMING.flyer} width="1400" height="2027" alt={`Flyer: ${UPCOMING.title}, ${UPCOMING.when}, ${UPCOMING.where}. Organised by the School of Public Policy, IIT Delhi, funded by Schmidt Sciences.`} />
          <div className="ws-flyer-bar">
            <span>{UPCOMING.status}</span>
            <a href={UPCOMING.pdf} target="_blank" rel="noopener" download>Download the flyer (PDF)</a>
            <button type="button" onClick={() => setFlyerOpen(false)}>Close</button>
          </div>
        </div>
      </dialog>
    </div>,
    document.body,
  );

  const close = () => {
    closed.current = true;
    setOn(false);
    setVisible(false);
    try {
      sessionStorage.setItem(KEY, '1');
    } catch { /* ignore */ }
  };

  const n = open.length;
  const closing = days !== null && days <= 14;
  const site = O.site;
  const dateText = last
    ? `Last date: ${last.getDate()} ${MONTHS[last.getMonth()]} ${last.getFullYear()}` +
      (closing ? (days === 0 ? ' (today)' : ` (${days}${days === 1 ? ' day' : ' days'} left)`) : '')
    : 'Last date to be confirmed';

  if (smart && !expanded) {
    return (
      <>
      {flyer}
      <aside className={`oc-pop oc-smart is-pill${closing ? ' closing' : ''}${on ? ' on' : ''}${tucked ? ' is-tucked' : ''}`} id="oc-pop" aria-label="Open calls" hidden={!visible}>
        <button
          type="button"
          className="oc-pill"
          aria-expanded="false"
          onClick={() => setExpanded(true)}
        >
          <span className="oc-live">{closing ? 'Closing soon' : 'Live'}</span>
          <b>{n}{n === 1 ? ' open theme' : ' open themes'}{ws && <span className="oc-pill-ws"> · {UPCOMING.name}</span>}</b>
          <span className="oc-pill-go">{ws ? 'See' : 'Collaborate'} <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg></span>
        </button>
      </aside>
      </>
    );
  }

  return (
    <>
    {flyer}
    <aside
      className={`oc-pop${smart ? ' oc-smart' : ''}${closing ? ' closing' : ''}${on ? ' on' : ''}${smart && tucked ? ' is-tucked' : ''}`}
      id="oc-pop"
      aria-label="Open calls"
      hidden={!visible}
      onKeyDown={(e) => {
        if (e.key === 'Escape') close();
      }}
      onPointerEnter={() => smart && clearTimeout(fold.current)}
      onPointerLeave={() => smart && foldSoon(1400)}
      onFocus={() => smart && clearTimeout(fold.current)}
      onBlur={(e) => smart && !e.currentTarget.contains(e.relatedTarget) && foldSoon(1400)}
    >
      <button type="button" className="oc-pop-x" aria-label="Close" onClick={close}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
      </button>
      <span className="oc-pop-top">
        <span className="oc-live">{closing ? 'Closing soon' : 'Live'}</span>
        <span>{n}{n === 1 ? ' open theme' : ' open themes'}</span>
      </span>
      <b className="oc-pop-t">Collaborate with us</b>
      <span className="oc-pop-m">Professors and research groups are invited to express interest in:</span>
      <ul className="oc-pop-list">
        {open.slice(0, 3).map((t) => (
          <li key={t.id}>
            <a href={`${site}#call-${t.id}`} target="_blank" rel="noopener">
              {t.title}<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
        ))}
        {n > 3 && <li>and {n - 3} more</li>}
      </ul>
      <span className="oc-pop-d">{dateText}</span>
      <a className="btn" href={site + (n === 1 ? `#call-${open[0].id}` : '#all-calls')} target="_blank" rel="noopener">
        Explore the themes <span className="ar" aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span>
      </a>
      {ws && (
        <div className="oc-ws">
          <button type="button" className="oc-ws-flyer" onClick={() => setFlyerOpen(true)} aria-label={`Open the ${UPCOMING.name} flyer`}>
            <img src={UPCOMING.flyerSm} width="560" height="811" alt="" />
          </button>
          <div className="oc-ws-txt">
            <span className="oc-ws-tag">Upcoming event</span>
            <b>{UPCOMING.name}</b>
            <span className="oc-ws-sub">{UPCOMING.subtitle}</span>
            <span className="oc-pop-d">{UPCOMING.when} · {UPCOMING.where}</span>
            <span className="oc-ws-links">
              <button type="button" onClick={() => setFlyerOpen(true)}>View flyer</button>
              <Link to={UPCOMING.to}>Read more <span aria-hidden="true">→</span></Link>
            </span>
          </div>
        </div>
      )}
    </aside>
    </>
  );
};
