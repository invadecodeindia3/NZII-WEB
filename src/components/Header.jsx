import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sun, 
  Moon, 
  Leaf, 
  ChevronDown, 
  BookOpen, 
  Layers, 
  Zap, 
  Flame, 
  ShieldCheck, 
  Car, 
  Activity, 
  FileText,
  Sliders,
  Database,
  Building,
  Target,
  Sparkles,
  Users,
  Compass,
  ArrowRight,
  TrendingDown,
  Globe2,
  Lock,
  Search,
  Info,
  X
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { ALL_ARTIFACTS } from '../data/artifactsData';
import { RESEARCH_THEMES } from '../data/researchThemes';

export const Header = () => {
  const { playSound, theme, toggleTheme, ecoMode, toggleEcoMode } = useGame();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null); // 'solutions' | 'research' | 'tools' | 'about'
  const [mobileExpandedSection, setMobileExpandedSection] = useState(null); // 'research' | 'solutions' | 'tools' | 'about'
  const [ecoTooltipOpen, setEcoTooltipOpen] = useState(false);
  const navContainerRef = useRef(null);

  // Close mega menu on outside click or route change
  useEffect(() => {
    setActiveMegaMenu(null);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navItems = [
    {path:'/',label:'Home'},
    {path:'/about',label:'About NZI'},
    {path:'/research',label:'Research'},
    {path:'/publications',label:'Publications'},
    {path:'/news-events',label:'News & Events'},
    {path:'/consortium',label:'People & Partners'},
    {path:'/contact',label:'Contact'}
  ];
  const isItemActive = item => location.pathname === item.path || (item.path === '/research' && location.pathname.startsWith('/research/'));

  return <header className="absolute top-0 z-50 w-full px-[5vw] pt-5 text-white">
    <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-5">
      <Link to="/" className="font-manrope text-2xl font-bold tracking-tight text-white">NZI<span className="text-[#a8ce4c]">.</span></Link>
      <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-5 rounded-full border border-white/20 bg-[#173448]/90 px-6 py-3 backdrop-blur-md">
        {navItems.map(item=><Link key={item.path} to={item.path} className={`whitespace-nowrap text-xs font-semibold transition-colors ${isItemActive(item)?'text-[#a8ce4c]':'text-white/85 hover:text-white'}`}>{item.label}</Link>)}
      </nav>
      <div className="flex items-center gap-3">
        <button type="button" aria-label={theme==='dark'?'Use light mode':'Use dark mode'} onClick={toggleTheme} className="rounded-full border border-white/25 p-2.5 text-white">{theme==='dark'?<Sun size={19}/>:<Moon size={19}/>}</button>
        <button type="button" className="rounded-full border border-white/25 p-2.5 text-white lg:hidden" aria-expanded={mobileMenuOpen} aria-label="Toggle navigation" onClick={()=>setMobileMenuOpen(v=>!v)}>{mobileMenuOpen?<X size={20}/>:<span className="font-bold text-xs">MENU</span>}</button>
      </div>
    </div>
    {mobileMenuOpen&&<nav aria-label="Mobile navigation" className="mx-auto mt-4 flex max-w-[1440px] flex-col gap-1 rounded-2xl border border-white/15 bg-[#173448] p-4 lg:hidden">
      {navItems.map(item=><Link key={item.path} to={item.path} className="rounded-lg px-4 py-3 text-sm text-white hover:bg-white/10" onClick={()=>setMobileMenuOpen(false)}>{item.label}</Link>)}
    </nav>}
  </header>;
};
