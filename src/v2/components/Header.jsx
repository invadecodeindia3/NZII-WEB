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
  const light = displayMode === 'light';
  const isActive = path => path === '/' ? location.pathname === '/' : (location.pathname === path || (path === '/research' && location.pathname.startsWith('/research/')));

  useEffect(() => setMobileMenuOpen(false), [location.pathname]);
  useEffect(() => {
    if (!mobileMenuOpen) return undefined;
    const keyHandler = e => { if (e.key === 'Escape') setMobileMenuOpen(false); };
    window.addEventListener('keydown', keyHandler);
    return () => window.removeEventListener('keydown', keyHandler);
  }, [mobileMenuOpen]);

  return <header className="site-header absolute inset-x-0 top-0 z-50 w-full pt-4 sm:pt-5" style={{paddingInline:'1.5%'}}>
    <div className={`flex w-full items-center justify-between gap-3 rounded-2xl border px-3 py-2.5 sm:px-4 ${light?'border-[#153852]/12 bg-[#f9fbf8]/95 text-[#173650] shadow-sm':'border-white/20 bg-[#10283b]/88 text-white'} backdrop-blur-xl`}>
      <Link to="/" aria-label="Net Zero India homepage" className="flex shrink-0 items-center gap-2">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#32aaa0] text-[11px] font-extrabold text-[#32aaa0]">N</span>
        <span className="hidden text-sm font-extrabold tracking-[-0.025em] sm:inline lg:text-base">Net Zero India</span>
        <span className="text-sm font-extrabold sm:hidden">NZI</span>
      </Link>
      <nav className="hidden min-w-0 items-center justify-center gap-0.5 xl:flex" aria-label="Main navigation">
        {LINKS.map(link => <Link key={link.path} to={link.path} aria-current={isActive(link.path)?'page':undefined}
          className={`rounded-full px-2.5 py-2 text-[11px] font-semibold whitespace-nowrap transition-colors 2xl:px-3.5 2xl:text-xs ${isActive(link.path)?light?'bg-[#d8eee7] text-[#176a68]':'bg-[#2ba99b]/20 text-[#90e4d6]':light?'text-[#35556a] hover:bg-[#e6efec]':'text-white/80 hover:bg-white/10 hover:text-white'}`}>
          {link.label}
        </Link>)}
      </nav>
      <div className="flex shrink-0 items-center gap-2">
        <div className={`hidden items-center rounded-full p-1 sm:flex ${light?'bg-[#e5eeeb]':'bg-white/10'}`} role="group" aria-label="Display mode">
          {MODES.map(({value,label,Icon}) => <button key={value} type="button" aria-pressed={displayMode===value}
            onClick={()=>changeDisplayMode(value)}
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-2 text-[11px] font-semibold transition-colors ${displayMode===value?'bg-[#2a9f97] text-white shadow-sm':light?'text-[#3c5967] hover:bg-white/60':'text-white/80 hover:bg-white/15'}`}>
            <Icon size={13} strokeWidth={2}/><span>{label}</span>
          </button>)}
        </div>
        <label className="sm:hidden">
          <span className="sr-only">Display mode</span>
          <select value={displayMode} onChange={e=>changeDisplayMode(e.target.value)}
            className={`max-w-[84px] rounded-full border px-2 py-2 text-xs font-bold ${light?'border-[#cedcd9] bg-[#edf3f0] text-[#173650]':'border-white/20 bg-[#1a3548] text-white'}`}>
            <option value="light">Light</option><option value="dark">Dark</option><option value="eco">Eco</option>
          </select>
        </label>
        <button type="button" onClick={()=>setMobileMenuOpen(v=>!v)} aria-expanded={mobileMenuOpen} aria-controls="nzii-mobile-navigation"
          aria-label={mobileMenuOpen?'Close navigation':'Open navigation'} className={`inline-flex h-9 w-9 items-center justify-center rounded-full border xl:hidden ${light?'border-[#cbdad5]':'border-white/25'}`}>
          {mobileMenuOpen?<X size={19}/>:<Menu size={19}/>}
        </button>
      </div>
    </div>
    {mobileMenuOpen && <nav id="nzii-mobile-navigation" aria-label="Mobile navigation"
      className={`mt-2 grid gap-1 rounded-2xl border p-3 shadow-xl xl:hidden ${light?'border-[#d6e2df] bg-[#f8fbf9] text-[#173650]':'border-white/15 bg-[#18364a] text-white'}`}>
      {LINKS.map(link => <Link key={link.path} to={link.path} onClick={()=>setMobileMenuOpen(false)}
        className={`flex min-h-11 items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold ${isActive(link.path)?'bg-[#2ba99b]/20 text-[#40b4ab]':light?'hover:bg-[#edf3ef]':'hover:bg-white/10'}`}>{link.label}<ArrowUpRight size={16}/></Link>)}
    </nav>}
  </header>;
};
