import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useGame } from '../context/GameContext';

export const Header = () => {
  const { displayMode, changeDisplayMode } = useGame();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = location.pathname === '/' || location.pathname === '/NZII_Home_Page.html';
  const isAbout = location.pathname === '/about' || location.pathname === '/NZII_About_Page.html';
  const isCollab = location.pathname === '/consortium' || location.pathname === '/NZII_People_Page.html';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`} id="site-header">
      <div className="hd-row">
        <Link to="/" className="hd-logo" aria-label="Net Zero India Initiative homepage">
          <img
            className="logo-l"
            alt="Net Zero India Initiative"
            src="/assets/logos/nzii-logo-colour.svg"
            width="1497"
            height="692"
          />
          <img
            className="logo-d"
            alt="Net Zero India Initiative"
            src="/assets/logos/nzii-logo-pale-yellow.svg"
            width="1497"
            height="692"
          />
        </Link>
        <div className="pill">
          <nav className="main-nav" aria-label="Main navigation">
            <Link to="/" aria-current={isHome ? 'page' : undefined}>
              Home
            </Link>
            <Link to="/about" aria-current={isAbout ? 'page' : undefined}>
              About NZII
            </Link>
            <Link to="/consortium" aria-current={isCollab ? 'page' : undefined}>
              Explore Our Collaborations
            </Link>
          </nav>
          <div className="hd-tools">
            <div className="modes" role="group" aria-label="Display mode">
              <button
                type="button"
                data-mode="light"
                aria-pressed={displayMode === 'light'}
                onClick={() => changeDisplayMode('light')}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="4"/>
                  <path d="M12 2v2M12 20v2m-7.07-17.07 1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
                </svg>
                <span>Light</span>
              </button>
              <button
                type="button"
                data-mode="dark"
                aria-pressed={displayMode === 'dark'}
                onClick={() => changeDisplayMode('dark')}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/>
                </svg>
                <span>Dark</span>
              </button>
              <button
                type="button"
                data-mode="eco"
                aria-pressed={displayMode === 'eco'}
                onClick={() => changeDisplayMode('eco')}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M11 20a10 10 0 0010-10 25.9 25.9 0 00-1.04-7.281 1 1 0 00-1.755-.325C15.833 5.5 13 5.5 9.8 6.1A7 7 0 0011 20"/>
                  <path d="M2 21a5 5 0 012.911-4.544C7.613 15.212 8.351 15.24 11 13"/>
                </svg>
                <span>Eco</span>
              </button>
            </div>
            <label className="mode-select">
              <span className="sr-only">Display mode</span>
              <select
                id="mode-select"
                value={displayMode}
                onChange={(e) => changeDisplayMode(e.target.value)}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="eco">Eco</option>
              </select>
            </label>
            <button
              type="button"
              className="burger"
              id="burger"
              aria-expanded={mobileMenuOpen}
              aria-controls="nzii-mobile-navigation"
              aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M4 5h16M4 12h16M4 19h16"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <nav className="mobile-nav" id="nzii-mobile-navigation" aria-label="Mobile navigation" hidden={!mobileMenuOpen}>
        <Link to="/" aria-current={isHome ? 'page' : undefined} onClick={() => setMobileMenuOpen(false)}>
          Home
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </Link>
        <Link to="/about" aria-current={isAbout ? 'page' : undefined} onClick={() => setMobileMenuOpen(false)}>
          About NZII
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </Link>
        <Link to="/consortium" aria-current={isCollab ? 'page' : undefined} onClick={() => setMobileMenuOpen(false)}>
          Explore Our Collaborations
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </Link>
      </nav>
    </header>
  );
};
