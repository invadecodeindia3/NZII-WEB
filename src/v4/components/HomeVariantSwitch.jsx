import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const HOME_VARIANTS = [
  { to: '/v4', label: 'Original' },
  { to: '/v4/home-a', label: 'A · Colour' },
  { to: '/v4/home-soft', label: 'A · Subtle' },
];

/**
 * Floating switch between the Home page designs, shown on the Home page only while the designs are being
 * compared. Inline styles so it looks the same whichever page stylesheet is active.
 */
export const HomeVariantSwitch = () => {
  const { pathname } = useLocation();
  const path = pathname.replace(/\/+$/, '') || '/v4';
  if (!HOME_VARIANTS.some((v) => v.to === path)) return null;
  return (
    <nav
      aria-label="Home page design"
      style={{
        // on phones it sits above the site-version switcher instead of beside it
        position: 'fixed', left: 16, bottom: 'clamp(16px, calc((640px - 100vw) * 1000), 64px)', zIndex: 70, display: 'flex', alignItems: 'center', gap: 4,
        padding: 5, borderRadius: 999, background: 'rgba(255,252,246,.94)', border: '1px solid rgba(29,54,88,.14)',
        boxShadow: '0 10px 30px -14px rgba(29,54,88,.45)', backdropFilter: 'blur(8px)',
        font: '600 12px Inter, system-ui, sans-serif',
      }}
    >
      <span style={{ padding: '0 8px 0 10px', color: '#55657a', letterSpacing: '.12em', textTransform: 'uppercase', fontSize: 10 }}>Home</span>
      {HOME_VARIANTS.map((v) => {
        const on = v.to === path;
        return (
          <Link
            key={v.to}
            to={v.to}
            aria-current={on ? 'page' : undefined}
            style={{
              padding: '7px 12px', borderRadius: 999, textDecoration: 'none', whiteSpace: 'nowrap',
              background: on ? '#1d3658' : 'transparent', color: on ? '#fff' : '#1d3658',
            }}
          >
            {v.label}
          </Link>
        );
      })}
    </nav>
  );
};
