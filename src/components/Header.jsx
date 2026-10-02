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
  Info
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { ALL_ARTIFACTS } from '../data/artifactsData';

export const Header = () => {
  const { playSound, theme, toggleTheme, ecoMode, toggleEcoMode } = useGame();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null); // 'solutions' | 'research' | 'tools' | 'about'
  const [ecoTooltipOpen, setEcoTooltipOpen] = useState(false);
  const navContainerRef = useRef(null);

  // Close mega menu on outside click or route change
  useEffect(() => {
    setActiveMegaMenu(null);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Main navigation items
  const navItems = [
    { id: 'home', path: '/', label: 'Home' },
    { id: 'about', path: '/about', label: 'About Us', hasMegaMenu: true },
    { id: 'solutions', path: '/solutions', label: 'Solutions', hasMegaMenu: true },
    { id: 'research', path: '/research', label: 'Research', hasMegaMenu: true },
    { id: 'tools', path: '/tools', label: 'Tools', hasMegaMenu: true },
    { id: 'contact', path: '/contact', label: 'Contact' },
  ];

  // Helper to check active state
  const isItemActive = (item) => {
    if (item.path === '/' && location.pathname === '/') return true;
    if (item.path !== '/' && location.pathname === item.path) return true;
    if (item.id === 'research' && (location.pathname === '/case-studies' || location.pathname === '/projects' || location.pathname === '/publications' || location.pathname.startsWith('/case-studies/'))) return true;
    if (item.id === 'about' && location.pathname === '/consortium') return true;
    if (item.id === 'solutions' && (location.pathname === '/sectors' || location.pathname === '/simulator' || location.pathname === '/policy')) return true;
    if (item.id === 'tools' && location.pathname === '/data') return true;
    return false;
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-50 w-full px-[2vw] pt-7 pb-4 flex items-center justify-between pointer-events-auto select-none">
      
      {/* ── 1. LOGO (Left side) ── */}
      <div className="flex items-center min-w-[140px]">
        <Link 
          to="/"
          onClick={() => playSound(520)}
          className="text-white hover:opacity-95 transition-opacity cursor-pointer flex items-center"
        >
          <span className="font-manrope font-extrabold text-[22px] tracking-wider text-white uppercase">
            NZII
          </span>
        </Link>
      </div>

      {/* ── 2. CENTER PILL NAVIGATION WITH TRANSLUCENT SMOKED GLASS ── */}
      <div 
        ref={navContainerRef}
        className="hidden md:block absolute left-1/2 -translate-x-1/2 z-50"
        onMouseLeave={() => setActiveMegaMenu(null)}
      >
        {/* The compact, translucent Pill Navbar */}
        <nav className="flex items-center gap-1 px-2 py-1.5 rounded-full glass-capsule shadow-lg">
          {navItems.map(item => {
            const active = isItemActive(item);
            const isMenuOpen = activeMegaMenu === item.id;

            if (item.hasMegaMenu) {
              return (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => {
                    setActiveMegaMenu(item.id);
                    playSound(460);
                  }}
                >
                  <Link
                    to={item.path}
                    onClick={() => {
                      playSound(480);
                      setActiveMegaMenu(null);
                    }}
                    className={`px-4 py-2 rounded-full text-[13px] font-manrope transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                      active
                        ? 'bg-white text-black font-bold shadow-sm'
                        : isMenuOpen
                          ? 'bg-white/20 text-white font-semibold'
                          : 'text-white/95 font-medium hover:text-white hover:bg-white/15'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isMenuOpen ? 'rotate-180 text-teal-light' : 'opacity-70'}`} />
                  </Link>
                </div>
              );
            }

            return (
              <Link
                key={item.id}
                to={item.path}
                onMouseEnter={() => setActiveMegaMenu(null)}
                onClick={() => {
                  playSound(480);
                  setActiveMegaMenu(null);
                }}
                className={`px-4 py-2 rounded-full text-[13px] font-manrope transition-all cursor-pointer whitespace-nowrap ${
                  active
                    ? 'bg-white text-black font-bold shadow-sm'
                    : 'text-white/95 font-medium hover:text-white hover:bg-white/15'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* ── MEGA DROPDOWN CONTAINER (SPRINGY SMOOTH DROP-DOWN ENTRANCE ANIMATION) ── */}
        {activeMegaMenu && (
          <div 
            key={activeMegaMenu}
            className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50 w-[780px] max-w-[90vw] animate-mega-menu pointer-events-auto"
            onMouseEnter={() => setActiveMegaMenu(activeMegaMenu)}
            onMouseLeave={() => setActiveMegaMenu(null)}
          >
            <div className="p-6 rounded-3xl glass-dropdown border border-white/15 shadow-2xl text-white">
              
              {/* ── MEGA MENU: RESEARCH & PUBLICATIONS ── */}
              {activeMegaMenu === 'research' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-teal-light" />
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-light">
                        Research Intelligence, Working Papers & Field Pilots
                      </span>
                    </div>
                    <Link
                      to="/research"
                      onClick={() => setActiveMegaMenu(null)}
                      className="text-xs font-mono text-teal-light hover:underline flex items-center gap-1"
                    >
                      <span>Explore All Research (7)</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {/* Left col: Working Papers & Publications */}
                    <div className="space-y-2 p-3.5 rounded-2xl bg-black/40 border border-white/10">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono font-bold text-coral uppercase">
                          Working Papers & Publications
                        </span>
                        <Link 
                          to="/publications" 
                          onClick={() => setActiveMegaMenu(null)}
                          className="text-[10px] text-white/60 hover:text-white underline font-mono"
                        >
                          View Hub
                        </Link>
                      </div>
                      <div className="space-y-1.5">
                        <Link
                          to="/publications"
                          onClick={() => setActiveMegaMenu(null)}
                          className="block p-2 rounded-xl hover:bg-white/10 transition-colors"
                        >
                          <span className="font-bold text-xs block text-white">Macro Finance Working Paper #14</span>
                          <span className="text-[10px] text-white/60 block truncate">$10.1T WACC Reduction & Sovereign Guarantees</span>
                        </Link>
                        <Link
                          to="/case-studies/blog-monsoon-wind"
                          onClick={() => setActiveMegaMenu(null)}
                          className="block p-2 rounded-xl hover:bg-white/10 transition-colors"
                        >
                          <span className="font-bold text-xs block text-white">8,760h Grid Dispatch & Monsoon Slump</span>
                          <span className="text-[10px] text-white/60 block truncate">PyPSA 500 GW Unit Commitment Solver</span>
                        </Link>
                        <Link
                          to="/case-studies/blog-sebi-brsr"
                          onClick={() => setActiveMegaMenu(null)}
                          className="block p-2 rounded-xl hover:bg-white/10 transition-colors"
                        >
                          <span className="font-bold text-xs block text-white">SEBI BRSR Core Statutory Assurance</span>
                          <span className="text-[10px] text-white/60 block truncate">Automated Scope 1-3 Cryptographic Telemetry</span>
                        </Link>
                      </div>
                    </div>

                    {/* Right col: Field Pilots */}
                    <div className="space-y-2 p-3.5 rounded-2xl bg-black/40 border border-white/10">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono font-bold text-teal-light uppercase">
                          Empirical Field Mega-Pilots
                        </span>
                        <Link 
                          to="/research" 
                          onClick={() => setActiveMegaMenu(null)}
                          className="text-[10px] text-white/60 hover:text-white underline font-mono"
                        >
                          All Pilots
                        </Link>
                      </div>
                      <div className="space-y-1.5">
                        <Link
                          to="/case-studies/vindhyachal-retrofit"
                          onClick={() => setActiveMegaMenu(null)}
                          className="block p-2 rounded-xl hover:bg-white/10 transition-colors"
                        >
                          <span className="font-bold text-xs block text-white">Vindhyachal 4.7 GW Thermal Retrofit</span>
                          <span className="text-[10px] text-white/60 block truncate">10% Agro-Biomass + 1.2 GW Solar • 3.4 Mt CO2/yr</span>
                        </Link>
                        <Link
                          to="/case-studies/tata-steel-h2"
                          onClick={() => setActiveMegaMenu(null)}
                          className="block p-2 rounded-xl hover:bg-white/10 transition-colors"
                        >
                          <span className="font-bold text-xs block text-white">Tata Steel Green H2-DRI Pilot</span>
                          <span className="text-[10px] text-white/60 block truncate">120 MW PEM Electrolyzer • 1.8 Mt CO2/yr</span>
                        </Link>
                        <Link
                          to="/case-studies/wadi-lc3-cement"
                          onClick={() => setActiveMegaMenu(null)}
                          className="block p-2 rounded-xl hover:bg-white/10 transition-colors"
                        >
                          <span className="font-bold text-xs block text-white">Wadi LC3 Calcined Clay Cement</span>
                          <span className="text-[10px] text-white/60 block truncate">50% Clinker Displacement • 960k t CO2/yr</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── MEGA MENU: SOLUTIONS ── */}
              {activeMegaMenu === 'solutions' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-teal-light" />
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-light">
                        Sectoral Decarbonization Pathways & Frameworks
                      </span>
                    </div>
                    <Link
                      to="/solutions"
                      onClick={() => setActiveMegaMenu(null)}
                      className="text-xs font-mono text-teal-light hover:underline flex items-center gap-1"
                    >
                      <span>All Solutions</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <Link
                      to="/sectors"
                      onClick={() => setActiveMegaMenu(null)}
                      className="p-3.5 rounded-2xl bg-black/40 hover:bg-black/60 border border-white/10 transition-all space-y-1 block"
                    >
                      <Zap className="w-5 h-5 text-amber-400 mb-1" />
                      <span className="font-bold text-sm block text-white">6 Sector Deep-Dives</span>
                      <p className="text-[11px] text-white/60 leading-snug">Power, steel, cement, heavy trucking, agroforestry, and buildings.</p>
                    </Link>

                    <Link
                      to="/simulator"
                      onClick={() => setActiveMegaMenu(null)}
                      className="p-3.5 rounded-2xl bg-black/40 hover:bg-black/60 border border-white/10 transition-all space-y-1 block"
                    >
                      <Sliders className="w-5 h-5 text-teal-light mb-1" />
                      <span className="font-bold text-sm block text-white">Decarbonization Sandbox</span>
                      <p className="text-[11px] text-white/60 leading-snug">Real-time macro simulation of India’s 2025–2070 NDC trajectory.</p>
                    </Link>

                    <Link
                      to="/policy"
                      onClick={() => setActiveMegaMenu(null)}
                      className="p-3.5 rounded-2xl bg-black/40 hover:bg-black/60 border border-white/10 transition-all space-y-1 block"
                    >
                      <ShieldCheck className="w-5 h-5 text-coral mb-1" />
                      <span className="font-bold text-sm block text-white">Policy Framework</span>
                      <p className="text-[11px] text-white/60 leading-snug">4 core statutory pillars supporting $10.1T in capital mobilization.</p>
                    </Link>
                  </div>
                </div>
              )}

              {/* ── MEGA MENU: TOOLS ── */}
              {activeMegaMenu === 'tools' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-teal-light" />
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-light">
                        Interactive Micro-Simulators & Open Science Datasets
                      </span>
                    </div>
                    <Link
                      to="/tools"
                      onClick={() => setActiveMegaMenu(null)}
                      className="text-xs font-mono text-teal-light hover:underline flex items-center gap-1"
                    >
                      <span>Explore 16 Tools</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                      <span className="text-[11px] font-mono font-bold text-teal-light uppercase block">
                        Featured Engineering Tools
                      </span>
                      <div className="space-y-1 text-xs">
                        <Link to="/tools" onClick={() => setActiveMegaMenu(null)} className="block p-1.5 rounded-lg hover:bg-white/10 text-white/90 truncate">
                          • Levelized Cost of Hydrogen (LCOH) Solver
                        </Link>
                        <Link to="/tools" onClick={() => setActiveMegaMenu(null)} className="block p-1.5 rounded-lg hover:bg-white/10 text-white/90 truncate">
                          • 8,760h Solar-Wind-Storage Co-Optimizer
                        </Link>
                        <Link to="/tools" onClick={() => setActiveMegaMenu(null)} className="block p-1.5 rounded-lg hover:bg-white/10 text-white/90 truncate">
                          • SEBI BRSR Core Carbon Intensity Auditor
                        </Link>
                        <Link to="/tools" onClick={() => setActiveMegaMenu(null)} className="block p-1.5 rounded-lg hover:bg-white/10 text-white/90 truncate">
                          • Pumped Hydro vs Lithium-Ion LCOS Comparator
                        </Link>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                      <span className="text-[11px] font-mono font-bold text-amber-400 uppercase block">
                        Open Science Data Repository
                      </span>
                      <p className="text-xs text-white/70 leading-relaxed">
                        Access raw CEA hourly dispatch profiles, 1,400+ point-source emissions logs, and district transition matrices.
                      </p>
                      <Link
                        to="/data"
                        onClick={() => setActiveMegaMenu(null)}
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-teal-light font-bold hover:underline pt-1"
                      >
                        <span>Access Data Repository (4.8M Records)</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* ── MEGA MENU: ABOUT US & CONSORTIUM ── */}
              {activeMegaMenu === 'about' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-teal-light" />
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-light">
                        Institutional Governance & Consortium Members
                      </span>
                    </div>
                    <Link
                      to="/about"
                      onClick={() => setActiveMegaMenu(null)}
                      className="text-xs font-mono text-teal-light hover:underline flex items-center gap-1"
                    >
                      <span>About Us Overview</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      to="/about"
                      onClick={() => setActiveMegaMenu(null)}
                      className="p-3.5 rounded-2xl bg-black/40 hover:bg-black/60 border border-white/10 transition-all space-y-1 block"
                    >
                      <span className="font-bold text-sm block text-white">Scientific Leadership & Fellows</span>
                      <p className="text-[11px] text-white/60 leading-snug">Review our academic steering committee and annual pathways summit schedule.</p>
                    </Link>

                    <Link
                      to="/consortium"
                      onClick={() => setActiveMegaMenu(null)}
                      className="p-3.5 rounded-2xl bg-black/40 hover:bg-black/60 border border-white/10 transition-all space-y-1 block"
                    >
                      <span className="font-bold text-sm block text-white">Consortium Partners</span>
                      <p className="text-[11px] text-white/60 leading-snug">IIT Delhi, IISc, TERI, CEEW, and multilateral transition research labs.</p>
                    </Link>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}
      </div>

      {/* ── 3. RIGHT SIDE: THEME TOGGLE + INTERACTIVE ECO TOOLTIP + MODERN MINIMALIST FLAG ── */}
      <div className="flex items-center gap-2.5 min-w-[140px] justify-end">
        
        {/* Dark / Light Toggle Segmented Capsule (DISABLED / LOCKED TO DARK IN ECO MODE) */}
        <div className={`flex items-center p-1 rounded-full glass-capsule border border-white/20 ${ecoMode ? 'opacity-40 cursor-not-allowed' : ''}`}>
          <button
            onClick={() => {
              if (!ecoMode && theme === 'light') toggleTheme('dark');
            }}
            aria-label="Switch to Dark mode"
            title={ecoMode ? "Light mode disabled in ECO Power Save mode" : "Dark Mode"}
            disabled={ecoMode}
            className={`p-1.5 rounded-full transition-all flex items-center justify-center ${
              ecoMode || theme === 'dark'
                ? 'bg-white text-black shadow-sm'
                : 'text-white/70 hover:text-white'
            } ${ecoMode ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <Moon className="w-3.5 h-3.5" />
          </button>
          
          <button
            onClick={() => {
              if (!ecoMode && theme === 'dark') toggleTheme('light');
            }}
            aria-label="Switch to Light mode"
            title={ecoMode ? "Light mode disabled in ECO Power Save mode" : "Light Mode"}
            disabled={ecoMode}
            className={`p-1.5 rounded-full transition-all flex items-center justify-center ${
              !ecoMode && theme === 'light'
                ? 'bg-white text-black shadow-sm'
                : 'text-white/70 hover:text-white'
            } ${ecoMode ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <Sun className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Compact ECO Mode Pill Toggle with Explanatory Hover Tooltip */}
        <div 
          className="relative"
          onMouseEnter={() => setEcoTooltipOpen(true)}
          onMouseLeave={() => setEcoTooltipOpen(false)}
        >
          <button
            onClick={toggleEcoMode}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer border ${
              ecoMode
                ? 'bg-teal-light text-black border-teal-light shadow-sm'
                : 'glass-capsule text-white/90 border-white/20 hover:bg-white/15'
            }`}
          >
            <Leaf className={`w-3.5 h-3.5 ${ecoMode ? 'text-black' : 'text-teal-light'}`} />
            <span>ECO</span>
          </button>

          {/* Eco Mode Hover Tooltip */}
          {ecoTooltipOpen && (
            <div className="absolute right-0 top-full mt-2 w-72 p-3 rounded-2xl bg-[#0F0F0F]/95 border border-white/20 shadow-2xl backdrop-blur-2xl text-left z-50 animate-fadeIn pointer-events-none">
              <div className="flex items-start gap-2 mb-1.5">
                <Leaf className="w-4 h-4 text-teal-light shrink-0 mt-0.5" />
                <span className="text-[11px] font-mono font-bold text-white uppercase tracking-wider">
                  {ecoMode ? "Eco Power Save Active" : "Low-Carbon Eco Mode"}
                </span>
              </div>
              <p className="text-[11px] text-white/80 leading-relaxed font-manrope">
                Saving CO2 by turning off all interactive features like animations, motion, canvas GPU rendering, and locking to OLED-efficient dark mode (no light mode transition allowed).
              </p>
            </div>
          )}
        </div>

        {/* Modern Minimalist Glass Flag of India (Precision Geometric Capsule) */}
        <div 
          className="hidden sm:flex items-center justify-center p-1 rounded-full glass-capsule border border-white/20 h-8 w-8 shrink-0 hover:scale-105 transition-transform" 
          title="Republic of India • Decarbonization Pathways"
        >
          <div className="w-5 h-5 rounded-full overflow-hidden flex flex-col border border-white/20 shadow-inner">
            <div className="w-full h-1/3 bg-[#FF9933]"></div>
            <div className="w-full h-1/3 bg-white flex items-center justify-center relative">
              <div className="w-1.5 h-1.5 rounded-full border-[0.75px] border-[#000080] flex items-center justify-center">
                <div className="w-0.5 h-0.5 rounded-full bg-[#000080]"></div>
              </div>
            </div>
            <div className="w-full h-1/3 bg-[#138808]"></div>
          </div>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl glass-capsule text-white border-white/20 cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* ── 4. MOBILE DRAWER MENU (PURE NEUTRAL BLACK & DARK GREY) ── */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-4 right-4 mt-2 p-5 rounded-3xl bg-[#0F0F0F]/95 border border-white/20 shadow-2xl backdrop-blur-2xl flex flex-col gap-2.5 z-50 text-white max-h-[80vh] overflow-y-auto">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`px-4 py-2 rounded-xl text-sm font-manrope ${location.pathname === '/' ? 'bg-white text-black font-bold' : 'hover:bg-white/10'}`}
          >
            Home Overview
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className={`px-4 py-2 rounded-xl text-sm font-manrope ${location.pathname === '/about' ? 'bg-white text-black font-bold' : 'hover:bg-white/10'}`}
          >
            About Us & Leadership
          </Link>
          <Link
            to="/solutions"
            onClick={() => setMobileMenuOpen(false)}
            className={`px-4 py-2 rounded-xl text-sm font-manrope ${location.pathname === '/solutions' ? 'bg-white text-black font-bold' : 'hover:bg-white/10'}`}
          >
            Solutions & Sector Pathways
          </Link>
          <Link
            to="/research"
            onClick={() => setMobileMenuOpen(false)}
            className={`px-4 py-2 rounded-xl text-sm font-manrope ${location.pathname === '/research' ? 'bg-white text-black font-bold' : 'hover:bg-white/10'}`}
          >
            Research & Field Pilots
          </Link>
          <Link
            to="/publications"
            onClick={() => setMobileMenuOpen(false)}
            className={`px-4 py-2 rounded-xl text-sm font-manrope ${location.pathname === '/publications' ? 'bg-white text-black font-bold' : 'hover:bg-white/10'}`}
          >
            Working Papers & Publications
          </Link>
          <Link
            to="/tools"
            onClick={() => setMobileMenuOpen(false)}
            className={`px-4 py-2 rounded-xl text-sm font-manrope ${location.pathname === '/tools' ? 'bg-white text-black font-bold' : 'hover:bg-white/10'}`}
          >
            Interactive Tool Suite (16)
          </Link>
          <Link
            to="/data"
            onClick={() => setMobileMenuOpen(false)}
            className={`px-4 py-2 rounded-xl text-sm font-manrope ${location.pathname === '/data' ? 'bg-white text-black font-bold' : 'hover:bg-white/10'}`}
          >
            Open Data Repository (4.8M)
          </Link>
          <Link
            to="/simulator"
            onClick={() => setMobileMenuOpen(false)}
            className={`px-4 py-2 rounded-xl text-sm font-manrope ${location.pathname === '/simulator' ? 'bg-white text-black font-bold' : 'hover:bg-white/10'}`}
          >
            Decarbonization Sandbox
          </Link>
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className={`px-4 py-2 rounded-xl text-sm font-manrope ${location.pathname === '/contact' ? 'bg-white text-black font-bold' : 'hover:bg-white/10'}`}
          >
            Contact Secretariat
          </Link>
        </div>
      )}

    </header>
  );
};
