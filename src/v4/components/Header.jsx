import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location.pathname]);

  const isActive = (path) => location.pathname === path;

  return (
    <header className={`cura-nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="cura-container">
        <div className="cura-nav-inner">
          <Link to="/v4" className="cura-nav-logo">
            <img
              src="/assets/logos/nzii-logo-pale-yellow.svg"
              alt="Net Zero India Initiative"
            />
          </Link>

          <nav className="cura-nav-links">
            {[
              { to: '/v4', label: 'Overview' },
              { to: '/v4/technology', label: 'Methodology' },
              { to: '/v4/scenarios', label: 'Scenarios' },
              { to: '/v4/consortium', label: 'Consortium' },
              { to: '/v4/about', label: 'About IITD' },
            ].map(({ to, label }) => (
              <Link key={to} to={to} className={`cura-nav-link ${isActive(to) ? 'active' : ''}`}>
                {label}
              </Link>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link
              to="/v4/collaborate"
              className="cura-btn cura-btn-teal"
              style={{ padding: '9px 20px', fontSize: '0.85rem', borderRadius: '6px' }}
            >
              Collaborate →
            </Link>

            {/* Mobile burger */}
            <button
              aria-label="Toggle menu"
              onClick={() => setMenuOpen(o => !o)}
              style={{
                display: 'none',
                width: '36px', height: '36px',
                borderRadius: '8px',
                border: '1px solid rgba(43,157,143,0.3)',
                background: 'rgba(43,157,143,0.1)',
                color: 'var(--nzii-teal-light)',
                cursor: 'pointer',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              className="cura-mobile-burger"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {menuOpen
                  ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                  : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div style={{
            padding: '16px 0',
            borderTop: '1px solid var(--line-guide)',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}>
            {[
              { to: '/v4', label: 'Overview' },
              { to: '/v4/technology', label: 'Methodology' },
              { to: '/v4/scenarios', label: 'Scenarios' },
              { to: '/v4/consortium', label: 'Consortium' },
              { to: '/v4/about', label: 'About IITD' },
            ].map(({ to, label }) => (
              <Link
                key={to} to={to}
                style={{
                  color: isActive(to) ? 'var(--nzii-teal-light)' : 'var(--text-secondary)',
                  textDecoration: 'none', padding: '10px 4px',
                  fontWeight: 500, fontSize: '0.95rem',
                  borderBottom: '1px solid var(--line-guide)',
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .cura-mobile-burger { display: flex !important; }
        }
      `}</style>
    </header>
  );
};
