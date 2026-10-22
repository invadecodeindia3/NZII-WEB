import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Leaf, Menu, X, ArrowUpRight } from 'lucide-react';
import { useGame } from '../context/GameContext';

const LINKS = [
  {path: '/', label:'Home'},
  {path: '/about', label:'About NZI'},
  {path: '/research', label:'Research'},
  {path: '/publications', label:'Publications'},
  {path: '/news-events', label:'News & Events'},
  {path: '/consortium', label:'People & Partners'},
  {path: '/contact', label:'Contact'}
];
const MODES = [
  { value: 'light', label: 'Light', Icon: Sun },
  { value: 'dark', label: 'Dark', Icon: Moon },
  { value: 'eco', label: 'Eco', Icon: Leaf }
];

export const Header = () => {
  const { displayMode, changeDisplayMode } = useGame();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const light = displayMode === 'light';
  const isActive = path => path === '/' ? location.pathname === '/' : (location.pathname === path || (path === '/research' && location.pathname.startsWith('/research/')));

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setMobileMenuOpen(false), [location.pathname]);
  useEffect(() => {
    if (!mobileMenuOpen) return undefined;
    const keyHandler = e => { if (e.key === 'Escape') setMobileMenuOpen(false); };
    window.addEventListener('keydown', keyHandler);
    return () => window.removeEventListener('keydown', keyHandler);
  }, [mobileMenuOpen]);

  return (
    <header className={`site-header fixed top-0 inset-x-0 z-50 w-full px-4 sm:px-8 py-2.5 sm:py-3 transition-all duration-300 ${
      scrolled
        ? light
          ? 'bg-[#FFFCF6]/90 backdrop-blur-md shadow-xs'
          : 'bg-[#1D3658]/90 backdrop-blur-md shadow-md border-b border-white/10'
        : 'bg-transparent'
    }`}>
      <div className="flex w-full items-center justify-between gap-4">
        {/* ── Standalone Large Logo (NOT inside the nav pill, no background behind it) ── */}
        <Link
          to="/"
          aria-label="Net Zero India homepage"
          className="flex shrink-0 items-center transition-transform hover:scale-[1.02]"
        >
          <img
            src={light ? '/nzii-logo.png' : '/nzii-logo-dark.png'}
            alt="Net Zero India Initiative"
            className={`w-auto object-contain block drop-shadow-xs transition-all duration-300 ${
              scrolled ? 'h-11 sm:h-13 md:h-14' : 'h-14 sm:h-18 md:h-20 lg:h-22'
            }`}
          />
        </Link>

        {/* ── Separate Floating Navigation Bar Capsule ── */}
        <div
          className={`flex items-center gap-2 sm:gap-3 rounded-full border px-3 py-2 sm:px-4 sm:py-2.5 ${
            light
              ? 'border-[#1D3658]/12 bg-[#FFFCF6]/92 text-[#1D3658] shadow-sm'
              : 'border-white/20 bg-[#1D3658]/88 text-white'
          } backdrop-blur-xl`}
        >
          {/* Desktop Nav Links */}
          <nav className="hidden min-w-0 items-center justify-center gap-0.5 xl:flex" aria-label="Main navigation">
            {LINKS.map(link => (
              <Link
                key={link.path}
                to={link.path}
                aria-current={isActive(link.path) ? 'page' : undefined}
                className={`rounded-full px-2.5 py-2 text-[11px] font-semibold whitespace-nowrap transition-colors 2xl:px-3.5 2xl:text-xs ${
                  isActive(link.path)
                    ? light
                      ? 'bg-[#E2F2EE] text-[#207D72]'
                      : 'bg-[#2B9D8F]/25 text-[#A7C957]'
                    : light
                    ? 'text-[#4A607A] hover:bg-[#F4F1E8]'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mode Switch & Mobile Toggle */}
          <div className="flex shrink-0 items-center gap-2">
            <div
              className={`hidden items-center rounded-full p-1 sm:flex ${
                light ? 'bg-[#F4F1E8]' : 'bg-white/10'
              }`}
              role="group"
              aria-label="Display mode"
            >
              {MODES.map(({ value, label, Icon }) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={displayMode === value}
                  onClick={() => changeDisplayMode(value)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[11px] font-semibold transition-colors ${
                    displayMode === value
                      ? 'bg-[#2B9D8F] text-white shadow-sm'
                      : light
                      ? 'text-[#4A607A] hover:bg-white/60'
                      : 'text-white/80 hover:bg-white/15'
                  }`}
                >
                  <Icon size={13} strokeWidth={2} />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            <label className="sm:hidden">
              <span className="sr-only">Display mode</span>
              <select
                value={displayMode}
                onChange={e => changeDisplayMode(e.target.value)}
                className={`max-w-[84px] rounded-full border px-2 py-1.5 text-xs font-bold ${
                  light ? 'border-[#E6E2D8] bg-[#FFFCF6] text-[#1D3658]' : 'border-white/20 bg-[#1D3658] text-white'
                }`}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="eco">Eco</option>
              </select>
            </label>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(v => !v)}
              aria-expanded={mobileMenuOpen}
              aria-controls="nzii-mobile-navigation"
              aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'}
              className={`inline-flex h-8 w-8 items-center justify-center rounded-full border xl:hidden ${
                light ? 'border-[#E6E2D8]' : 'border-white/25'
              }`}
            >
              {mobileMenuOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <nav
          id="nzii-mobile-navigation"
          aria-label="Mobile navigation"
          className={`mt-2 grid gap-1 rounded-2xl border p-3 shadow-xl xl:hidden ${
            light ? 'border-[#E6E2D8] bg-[#FFFCF6] text-[#1D3658]' : 'border-white/15 bg-[#1D3658] text-white'
          }`}
        >
          {LINKS.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex min-h-11 items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold ${
                isActive(link.path)
                  ? 'bg-[#2B9D8F]/20 text-[#2B9D8F]'
                  : light
                  ? 'hover:bg-[#F4F1E8]'
                  : 'hover:bg-white/10'
              }`}
            >
              {link.label}
              <ArrowUpRight size={16} />
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};
