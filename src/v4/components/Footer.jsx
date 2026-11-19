import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#110f0c', borderTop: '1px solid rgba(255,255,255,0.08)', padding: '80px 0 40px', position: 'relative', zIndex: 2 }}>
      <div className="cura-container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '48px', marginBottom: '60px' }}>
          <div>
            <img
              src="/assets/logos/nzii-logo-pale-yellow.svg"
              alt="NZII"
              style={{ height: '44px', marginBottom: '20px' }}
            />
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '320px', lineHeight: 1.6 }}>
              The Net Zero India Initiative at IIT Delhi models granular, development-compatible decarbonization pathways to 2070.
            </p>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-orange-soft)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '18px' }}>
              Architecture
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link to="/v4" className="cura-nav-link">Overview</Link>
              <Link to="/v4/technology" className="cura-nav-link">Technology &amp; Methodology</Link>
              <Link to="/v4/scenarios" className="cura-nav-link">Reference Scenarios</Link>
              <Link to="/v4/consortium" className="cura-nav-link">Consortium Partners</Link>
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-orange-soft)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '18px' }}>
              Institutional Host
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>
              School of Public Policy<br />
              Indian Institute of Technology Delhi<br />
              Hauz Khas, New Delhi 110016
            </p>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-orange-soft)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '18px' }}>
              Get Involved
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '16px' }}>
              Open for collaboration across academic, industrial, and state policy partners.
            </p>
            <Link to="/v4/collaborate" className="cura-btn cura-btn-ghost" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
              Contact Team
            </Link>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.06)', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
          <div>© {new Date().getFullYear()} Net Zero India Initiative. Led by IIT Delhi.</div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>Designed in the CAD / Architectural climate-tech aesthetic</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

