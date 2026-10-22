import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// Floating "V1 / V2 / V3" site-version switcher, shared by all versions.
// Uses inline styles only so it renders identically regardless of which
// version's global stylesheet is loaded. Links are plain <a href> because
// switching versions requires a full page load (stylesheets swap).

const OLD_PREFIX = '/old';
const V2_PREFIX  = '/v2';

// ── Path helpers ─────────────────────────────────────────────────────────────

const getPathname = () => (typeof window === 'undefined' ? '/' : window.location.pathname);

/** Strip a known prefix and return the bare subpath (always starts with /). */
const stripPrefix = (p, prefix) => {
  const rest = p.slice(prefix.length);
  return rest && rest !== '/' ? rest : '/';
};

/** Convert any full pathname → the equivalent OLD (V1) href. */
const toOldHref = (p) => {
  if (p === OLD_PREFIX || p.startsWith(`${OLD_PREFIX}/`)) return p;
  if (p === V2_PREFIX  || p.startsWith(`${V2_PREFIX}/`))
    return `${OLD_PREFIX}${stripPrefix(p, V2_PREFIX)}`;
  return `${OLD_PREFIX}${p && p !== '/' ? p : '/'}`;
};

/** Convert any full pathname → the equivalent V2 href. */
const toV2Href = (p) => {
  if (p === V2_PREFIX  || p.startsWith(`${V2_PREFIX}/`))  return p;
  if (p === OLD_PREFIX || p.startsWith(`${OLD_PREFIX}/`))
    return `${V2_PREFIX}${stripPrefix(p, OLD_PREFIX)}`;
  return `${V2_PREFIX}${p && p !== '/' ? p : '/'}`;
};

/** Convert any full pathname → the equivalent V3 (current) href. */
const toV3Href = (p) => {
  if (p === OLD_PREFIX || p.startsWith(`${OLD_PREFIX}/`)) return stripPrefix(p, OLD_PREFIX);
  if (p === V2_PREFIX  || p.startsWith(`${V2_PREFIX}/`))  return stripPrefix(p, V2_PREFIX);
  return p;
};

// ── Responsive hook ───────────────────────────────────────────────────────────

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

// ── Segment ───────────────────────────────────────────────────────────────────

const BLUE = '#1f5fae';

const Segment = ({ label, href, active, narrow }) => {
  const [hover, setHover] = useState(false);
  const style = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    padding: narrow ? '6px 10px' : '7px 14px',
    borderRadius: 9999,
    fontFamily: "'Manrope', 'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",
    fontSize: narrow ? 11 : 13,
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

// ── VersionToggle ─────────────────────────────────────────────────────────────

/**
 * `current` prop: 'old' | 'v1' | 'v2' | 'v3'
 *   'old' / 'v1' → the V1 (archived) site
 *   'v2'         → the V2 (archived) site
 *   'v3'         → the V3 (current/latest) site
 * When omitted the active version is inferred from window.location.pathname.
 */
export const VersionToggle = ({ current }) => {
  const narrow = useNarrow();
  // Subscribe to React Router navigation so the toggle re-renders on pushState.
  useLocation();
  const pathname = getPathname();

  // Determine active tab
  const onOld = current
    ? current === 'old' || current === 'v1'
    : pathname === OLD_PREFIX || pathname.startsWith(`${OLD_PREFIX}/`);

  const onV2 = current
    ? current === 'v2'
    : !onOld && (pathname === V2_PREFIX || pathname.startsWith(`${V2_PREFIX}/`));

  const onV3 = !onOld && !onV2;

  // Build hrefs
  const oldHref = toOldHref(pathname);
  const v2Href  = toV2Href(pathname);
  const v3Href  = toV3Href(pathname);

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
      <Segment label="V1" href={oldHref} active={onOld} narrow={narrow} />
      <Segment label="V2" href={v2Href}  active={onV2}  narrow={narrow} />
      <Segment label="V3" href={v3Href}  active={onV3}  narrow={narrow} />
    </div>
  );
};

export default VersionToggle;
