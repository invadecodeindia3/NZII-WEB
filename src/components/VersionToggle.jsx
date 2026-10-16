import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// Floating "Old / Current" site-version switcher, shared by both versions.
// Uses inline styles only so it renders identically regardless of which
// version's global stylesheet is loaded. Links are plain <a href> because
// switching versions requires a full page load (stylesheets swap).

const OLD_PREFIX = '/old';

const isOldPath = (p) => p === OLD_PREFIX || p.startsWith(`${OLD_PREFIX}/`);

const toOldHref = (p) => `${OLD_PREFIX}${p && p !== '/' ? p : '/'}`;

const toCurrentHref = (p) => {
  const stripped = p.slice(OLD_PREFIX.length);
  return stripped && stripped !== '/' ? stripped : '/';
};

const getPathname = () => (typeof window === 'undefined' ? '/' : window.location.pathname);

const useNarrow = () => {
  const query = '(max-width: 640px)';
  const [narrow, setNarrow] = useState(
    () => typeof window !== 'undefined' && window.matchMedia?.(query).matches
  );
  useEffect(() => {
    const mql = window.matchMedia?.(query);
    if (!mql) return undefined;
    const onChange = (e) => setNarrow(e.matches);
    mql.addEventListener?.('change', onChange);
    return () => mql.removeEventListener?.('change', onChange);
  }, []);
  return narrow;
};

const BLUE = '#1f5fae';

const Segment = ({ label, href, active, narrow }) => {
  const [hover, setHover] = useState(false);
  const style = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    padding: narrow ? '6px 12px' : '7px 16px',
    borderRadius: 9999,
    fontFamily: "'Manrope', 'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",
    fontSize: narrow ? 12 : 13,
    fontWeight: active ? 700 : 600,
    lineHeight: 1,
    letterSpacing: 0,
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    cursor: active ? 'default' : 'pointer',
    color: active ? '#ffffff' : '#1e2a3a',
    background: active ? BLUE : hover ? 'rgba(31, 95, 174, 0.10)' : 'transparent',
    boxShadow: active ? '0 1px 2px rgba(31, 95, 174, 0.35)' : 'none',
    transition: 'background-color 150ms ease, color 150ms ease',
    outlineOffset: 2,
  };
  if (active) {
    return (
      <a href={href} aria-current="page" style={style} onClick={(e) => e.preventDefault()}>
        {label}
      </a>
    );
  }
  return (
    <a
      href={href}
      style={style}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
    >
      {label}
    </a>
  );
};

export const VersionToggle = ({ current }) => {
  const narrow = useNarrow();
  // Must be rendered inside a <BrowserRouter>: subscribing to the router
  // location re-renders on client-side navigation; the full (un-basenamed)
  // path is read from window.location so the /old prefix is visible.
  useLocation();
  const pathname = getPathname();

  const onOld = current ? current === 'old' : isOldPath(pathname);
  const oldHref = onOld ? pathname : toOldHref(pathname);
  const currentHref = onOld ? toCurrentHref(pathname) : pathname;

  const edge = narrow ? 12 : 24;

  return (
    <div
      role="group"
      aria-label="Site version"
      data-version-toggle=""
      style={{
        position: 'fixed',
        right: edge,
        bottom: `calc(${edge}px + env(safe-area-inset-bottom, 0px))`,
        zIndex: 9999,
        display: 'inline-flex',
        alignItems: 'center',
        gap: narrow ? 2 : 4,
        boxSizing: 'border-box',
        padding: narrow ? 4 : 6,
        borderRadius: 9999,
        background: 'rgba(255, 255, 255, 0.96)',
        border: '1px solid rgba(15, 23, 42, 0.10)',
        boxShadow: '0 8px 24px rgba(15, 23, 42, 0.14), 0 1px 3px rgba(15, 23, 42, 0.10)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        maxWidth: `calc(100vw - ${edge * 2}px)`,
        colorScheme: 'light',
      }}
    >
      <span
        aria-hidden="true"
        style={{
          padding: narrow ? '0 6px 0 8px' : '0 8px 0 10px',
          fontFamily: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
          fontSize: narrow ? 9 : 10,
          fontWeight: 600,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#6b7280',
          lineHeight: 1,
          whiteSpace: 'nowrap',
          userSelect: 'none',
        }}
      >
        Version
      </span>
      <Segment label="Old" href={oldHref} active={onOld} narrow={narrow} />
      <Segment label="Current" href={currentHref} active={!onOld} narrow={narrow} />
    </div>
  );
};

export default VersionToggle;
