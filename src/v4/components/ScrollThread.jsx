import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * One thread through the whole site: a fine line along the top edge that fills as the page is read, in the
 * brand's coral → lime → teal (the same run of colour as the road-to-2070 line on the Home page).
 */
export const ScrollThread = () => {
  const bar = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    let raf = 0;
    const draw = () => {
      raf = 0;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      if (bar.current) bar.current.style.transform = `scaleX(${Math.min(1, Math.max(0, window.scrollY / max))})`;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(draw);
    };
    window.addEventListener('scroll', kick, { passive: true });
    window.addEventListener('resize', kick);
    kick();
    return () => {
      window.removeEventListener('scroll', kick);
      window.removeEventListener('resize', kick);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname]);

  return (
    <div aria-hidden="true" style={{ position: 'fixed', left: 0, right: 0, top: 0, height: 3, zIndex: 90, pointerEvents: 'none' }}>
      <i ref={bar} style={{ display: 'block', height: '100%', transformOrigin: 'left', transform: 'scaleX(0)', background: 'linear-gradient(90deg, #e76f51, #a7c957 55%, #2b9d8f)' }} />
    </div>
  );
};
