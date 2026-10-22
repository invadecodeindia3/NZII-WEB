import React, { useEffect, useRef, useState } from 'react';

/**
 * Modern, performant Scroll Reveal Wrapper using IntersectionObserver
 * Supports subtle spring-like entrance, staggered delays, directional fades, and respects ECO mode.
 */
export const RevealOnScroll = ({
  children,
  className = '',
  delay = 0,
  direction = 'up', // 'up' | 'down' | 'left' | 'right' | 'none'
  threshold = 0.15,
  once = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If browser doesn't support IntersectionObserver or in ECO mode / reduced motion
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  const getDirectionClasses = () => {
    if (isVisible) return 'opacity-100 translate-x-0 translate-y-0 scale-100';
    switch (direction) {
      case 'up':
        return 'opacity-0 translate-y-10 scale-[0.99]';
      case 'down':
        return 'opacity-0 -translate-y-10 scale-[0.99]';
      case 'left':
        return 'opacity-0 translate-x-10';
      case 'right':
        return 'opacity-0 -translate-x-10';
      case 'none':
      default:
        return 'opacity-0 scale-95';
    }
  };

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: '750ms',
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={`transition-all will-change-transform ${getDirectionClasses()} ${className}`}
    >
      {children}
    </div>
  );
};
