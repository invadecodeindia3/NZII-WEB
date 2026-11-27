/**
 * V4 site header, as in the NZII Version 2 prototype: logo, pill navigation with dropdowns, display modes and
 * the mobile menu. On the Open Calls microsite the navigation becomes that site's own tabs.
 */
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useGame } from '../../context/GameContext';
import { SiteSearch } from './SiteSearch';

const SITE_NAV = [
  { to: '/v4', label: 'Home' },
  {
    to: '/v4/who-we-are', label: 'Who we are', id: 'dd-who',
    sections: [
      { to: '/v4/who-we-are#about-nzii', label: 'About NZII' },
      { to: '/v4/who-we-are#iit-delhi-team', label: 'NZII team' },
      { to: '/v4/who-we-are#partners-and-collaborators', label: 'Collaborators' },
      { to: '/v4/who-we-are#funders', label: 'Funders' },
    ],
  },
  {
    to: '/v4/research', label: 'Research', id: 'dd-research',
    sections: [
      { to: '/v4/research', label: 'Research' },
      { to: '/v4/publications', label: 'Publications' },
    ],
  },
  {
    to: '/v4/news-events', label: 'News & Events', id: 'dd-news',
    sections: [
      { to: '/v4/news-events', label: 'News & Events' },
      { to: '/v4/gallery', label: 'Gallery' },
    ],
  },
  { to: '/v4/collaborate', label: 'Collaborate with us' },
  { to: '/v4/contact', label: 'Contact' },
];

// Open Calls microsite tabs: each is a view of the same page, chosen by the address (#themes, #apply, …).
const OC_NAV = [
  { sec: 'home', label: 'Home' },
  { sec: 'themes', label: 'Themes' },
  { sec: 'apply', label: 'How to apply' },
  { sec: 'faqs', label: 'FAQs' },
  { sec: 'eoi', label: 'Express interest', cta: true },
];

const Chevron = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
);

const Dropdown = ({ item, current }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const btn = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [open]);

  return (
    <div
      className={`nav-dd${open ? ' open' : ''}`}
      ref={ref}
      onKeyDown={(e) => {
        if (e.key === 'Escape' && open) {
          setOpen(false);
          btn.current.focus();
        }
      }}
      onBlur={(e) => {
        if (e.relatedTarget && !ref.current.contains(e.relatedTarget)) setOpen(false);
      }}
    >
      <Link to={item.to} aria-current={current ? 'page' : undefined}>{item.label}</Link>
      <button type="button" className="dd-btn" ref={btn} aria-expanded={open} aria-controls={item.id} onClick={() => setOpen((o) => !o)}>
        <span className="sr-only">{item.label}: show sections</span>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
      </button>
      <div className="dd-menu" id={item.id}>
        {item.sections.map((s) => (
          <Link key={s.to} to={s.to} onClick={() => setOpen(false)}>{s.label}</Link>
        ))}
      </div>
    </div>
  );
};

const MODES = [
  { mode: 'light', label: 'Light', icon: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2m-7.07-17.07 1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /></> },
  { mode: 'dark', label: 'Dark', icon: <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" /> },
  { mode: 'eco', label: 'Eco', icon: <><path d="M11 20a10 10 0 0010-10 25.9 25.9 0 00-1.04-7.281 1 1 0 00-1.755-.325C15.833 5.5 13 5.5 9.8 6.1A7 7 0 0011 20" /><path d="M2 21a5 5 0 012.911-4.544C7.613 15.212 8.351 15.24 11 13" /></> },
];

export const SiteHeader = ({ microsite = false }) => {
  const { displayMode, changeDisplayMode } = useGame();
  const { pathname, hash } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [ocHash, setOcHash] = useState(() => window.location.hash);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sync = () => setOcHash(window.location.hash);
    window.addEventListener('hashchange', sync);
    window.addEventListener('popstate', sync);
    return () => {
      window.removeEventListener('hashchange', sync);
      window.removeEventListener('popstate', sync);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setOcHash(window.location.hash);
  }, [pathname, hash]);

  const bare = pathname.replace(/\/$/, '') || '/v4';
  const path = bare === '/v4/home-original' || bare === '/v4/home-soft' ? '/v4' : bare; // the Home design variants are Home
  const isCurrent = (item) =>
    path === item.to || (item.sections || []).some((s) => !s.to.includes('#') && s.to === path);

  // which microsite tab is current: a theme page belongs to Themes, the thank-you page to Express interest
  const ocView = (ocHash.slice(1) || 'home');
  const ocSec = ocView.startsWith('theme-') ? 'themes' : ocView === 'sent' ? 'eoi' : ocView;
  const ocKnown = OC_NAV.some((n) => n.sec === ocSec) ? ocSec : 'home';

  const logo = (
    <>
      <img className="logo-l" alt="Net Zero India Initiative" src="/assets/logos/nzii-logo-colour.svg" width="1497" height="692" />
      <img className="logo-d" alt="Net Zero India Initiative" src="/assets/logos/nzii-logo-pale-yellow.svg" width="1497" height="692" />
    </>
  );

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`} id="site-header">
      <div className="hd-row">
        {microsite ? (
          <a className="hd-logo" href="#home" aria-label="Collaborate with us: home">{logo}</a>
        ) : (
          <Link className="hd-logo" to="/v4" aria-label="Net Zero India Initiative homepage">{logo}</Link>
        )}
        <div className="pill">
          {microsite ? (
            <nav className="main-nav" aria-label="Open Calls navigation">
              {OC_NAV.map((n) => (
                <a key={n.sec} href={`#${n.sec}`} data-sec={n.sec} className={n.cta ? 'nav-cta' : undefined} aria-current={ocKnown === n.sec ? 'page' : undefined}>{n.label}</a>
              ))}
              <Link to="/v4">NZII website</Link>
            </nav>
          ) : (
            <nav className="main-nav" aria-label="Main navigation">
              {SITE_NAV.map((item) =>
                item.sections ? (
                  <Dropdown key={item.to} item={item} current={isCurrent(item)} />
                ) : (
                  <Link key={item.to} to={item.to} aria-current={isCurrent(item) ? 'page' : undefined}>{item.label}</Link>
                ),
              )}
            </nav>
          )}
          <div className="hd-tools">
            {!microsite && <SiteSearch />}
            <div className="modes" role="group" aria-label="Display mode">
              {MODES.map((m) => (
                <button key={m.mode} type="button" data-mode={m.mode} aria-pressed={displayMode === m.mode} onClick={() => changeDisplayMode(m.mode)}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{m.icon}</svg>
                  <span>{m.label}</span>
                </button>
              ))}
            </div>
            <label className="mode-select">
              <span className="sr-only">Display mode</span>
              <select id="mode-select" value={displayMode} onChange={(e) => changeDisplayMode(e.target.value)}>
                {MODES.map((m) => <option key={m.mode} value={m.mode}>{m.label}</option>)}
              </select>
            </label>
            <button
              type="button"
              className="burger"
              id="burger"
              aria-expanded={menuOpen}
              aria-controls="nzii-mobile-navigation"
              aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M4 5h16M4 12h16M4 19h16" /></svg>
            </button>
          </div>
        </div>
      </div>
      <nav
        className="mobile-nav"
        id="nzii-mobile-navigation"
        aria-label="Mobile navigation"
        hidden={!menuOpen}
        onClick={(e) => {
          if (e.target.closest('a')) setMenuOpen(false);
        }}
      >
        {microsite ? (
          <>
            {OC_NAV.map((n) => (
              <a key={n.sec} href={`#${n.sec}`} data-sec={n.sec} aria-current={ocKnown === n.sec ? 'page' : undefined}>{n.label}<Chevron /></a>
            ))}
            <Link to="/v4">NZII website<Chevron /></Link>
          </>
        ) : (
          SITE_NAV.map((item) => (
            <React.Fragment key={item.to}>
              <Link to={item.to} aria-current={isCurrent(item) ? 'page' : undefined}>{item.label}<Chevron /></Link>
              {(item.sections || []).map((s) => (
                <Link key={s.to} className="sub" to={s.to}>{s.label}</Link>
              ))}
            </React.Fragment>
          ))
        )}
      </nav>
    </header>
  );
};
