import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
            <Link to="/v4" className={`cura-nav-link ${location.pathname === '/v4' ? 'active' : ''}`}>
              Overview
            </Link>
            <Link to="/v4/technology" className={`cura-nav-link ${location.pathname.includes('/technology') ? 'active' : ''}`}>
              Technology &amp; Methodology
            </Link>
            <Link to="/v4/scenarios" className="cura-nav-link">
              Reference Scenarios
            </Link>
            <Link to="/v4/consortium" className="cura-nav-link">
              Consortium
            </Link>
            <Link to="/v4/about" className="cura-nav-link">
              About IITD
            </Link>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link to="/v4/collaborate" className="cura-btn cura-btn-orange" style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
              Speak with us →
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
