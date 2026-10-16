import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Globe2, 
  ArrowRight, 
  Mail, 
  FileText, 
  Database, 
  Cpu, 
  ShieldCheck, 
  Layers, 
  ExternalLink,
  CheckCircle2,
  Send,
  Zap,
  Leaf,
  Wrench,
  BookOpen
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { ALL_ARTIFACTS } from '../data/artifactsData';

export const Footer = () => {
  const { theme, ecoMode, playSound } = useGame();
  const location = useLocation();
  const isLight = theme === 'light';
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [subscribeBusy, setSubscribeBusy] = useState(false);
  const [subscribeError, setSubscribeError] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!emailInput.trim() || subscribeBusy) return;
    setSubscribeBusy(true);
    setSubscribeError('');
    try {
      const response = await fetch(`${import.meta.env.VITE_NZII_API_BASE || ''}/api/v1/newsletter`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailInput.trim(), consent: true }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.status !== 'confirmation_pending') {
        throw new Error(typeof result.detail === 'string' ? result.detail : 'Newsletter registration is currently unavailable.');
      }
      setEmailSubscribed(true);
      setEmailInput('');
    } catch (error) {
      setSubscribeError(error.message || 'Newsletter registration failed.');
    } finally {
      setSubscribeBusy(false);
    }
  };

  return (
    <footer 
      className={`w-full pt-20 pb-12 px-[3vw] transition-colors duration-500 border-t ${
        isLight 
          ? 'bg-[#EAEFE6] text-[#334155] border-[#CBD5E1]' 
          : 'bg-[#08080A] text-[#94A3B8] border-[#1C1C22]'
      }`}
    >
      <div className="w-full max-w-[1720px] mx-auto">
        
        {/* ── TOP TIER: CONSORTIUM MISSION & NEWSLETTER DISPATCH ── */}
        <div className="grid lg:grid-cols-12 gap-12 pb-16 border-b border-black/10 dark:border-white/10">
          
          {/* Brand & Manifesto (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <span className={`font-manrope font-extrabold text-2xl tracking-wider uppercase ${
                isLight ? 'text-[#0F172A]' : 'text-white'
              }`}>
                NZII
              </span>
              <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-teal/15 text-teal font-bold border border-teal/30">
                RESEARCH PROTOTYPE
              </span>
            </div>

            <p className={`font-manrope text-sm leading-relaxed max-w-md ${
              isLight ? 'text-[#475569]' : 'text-[#94A3B8]'
            }`}>
              The <strong>NetZero India Initiative (NZII)</strong> is an open-access national energy modeling consortium bridging empirical academic climate science, macro-economic equilibrium frameworks, and 8,760-hour hourly grid dispatch simulations to chart India&apos;s Paris-aligned 2070 decarbonization pathway.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
              <div className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 ${
                isLight ? 'bg-white border-[#CBD5E1] text-[#0F172A]' : 'bg-[#121216] border-[#24242C] text-white'
              }`}>
                <ShieldCheck className="w-3.5 h-3.5 text-teal" />
                <span>Open Science License (CC-BY 4.0)</span>
              </div>
              <div className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 ${
                isLight ? 'bg-white border-[#CBD5E1] text-[#0F172A]' : 'bg-[#121216] border-[#24242C] text-white'
              }`}>
                <Database className="w-3.5 h-3.5 text-emerald-500" />
                <span>1.4k+ Mapped Assets</span>
              </div>
            </div>
          </div>

          {/* Research Newsletter Sign-up (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className={`p-8 rounded-3xl border ${
              isLight ? 'bg-white border-[#E2E8F0] shadow-sm' : 'bg-[#121216] border-[#222228]'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-teal block mb-1">
                    Consortium Intelligence Dispatch
                  </span>
                  <h3 className={`font-manrope font-bold text-lg sm:text-xl ${
                    isLight ? 'text-[#0F172A]' : 'text-white'
                  }`}>
                    Receive Quarterly National Energy Transition Models
                  </h3>
                </div>
                <Mail className="w-6 h-6 text-teal shrink-0 hidden sm:block" />
              </div>

              {emailSubscribed ? (
                <div className="p-4 rounded-xl bg-teal/15 border border-teal/30 text-teal text-xs font-mono flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Check your email for a confirmation link. Subscription activates only after confirmation.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    required
                    placeholder="Enter academic / institutional email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className={`flex-grow px-4 py-3 rounded-xl text-xs sm:text-sm font-manrope outline-none border transition-all ${
                      isLight 
                        ? 'bg-[#F8FAFC] border-[#CBD5E1] text-[#0F172A] focus:border-teal' 
                        : 'bg-[#181820] border-[#2E2E38] text-white focus:border-teal'
                    }`}
                  />
                  <button
                    type="submit"
                    disabled={subscribeBusy}
                    className="px-6 py-3 rounded-xl bg-teal hover:bg-teal-dark text-white font-manrope font-bold text-xs flex items-center justify-center gap-2 transition-all shrink-0 cursor-pointer shadow-md"
                  >
                    <span>{subscribeBusy ? 'Submitting…' : 'Subscribe'}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
              {subscribeError && <p role="alert" className="text-xs text-red-500 mt-2">{subscribeError}</p>}
            </div>
          </div>
        </div>

        {/* ── MIDDLE TIER: 4 NAVIGATION COLUMNS INCLUDING RESEARCH & TOOLS ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 py-16 border-b border-black/10 dark:border-white/10 text-xs font-manrope">
          
          {/* Col 1: Core Navigation */}
          <div className="space-y-4">
            <span className={`font-mono text-xs font-bold uppercase tracking-wider block ${
              isLight ? 'text-[#0F172A]' : 'text-white'
            }`}>
              Platform Navigation
            </span>
            <ul className="space-y-2.5">
              <li>
                <Link to="/" className={`transition-colors ${location.pathname === '/' ? 'text-teal font-bold' : 'hover:text-teal'}`}>
                  Home Overview
                </Link>
              </li>
              <li>
                <Link to="/about" className={`transition-colors ${location.pathname === '/about' ? 'text-teal font-bold' : 'hover:text-teal'}`}>
                  About Us & Governance
                </Link>
              </li>
              <li>
                <Link to="/solutions" className={`transition-colors ${location.pathname === '/solutions' ? 'text-teal font-bold' : 'hover:text-teal'}`}>
                  Engineered Solutions
                </Link>
              </li>
              <li>
                <Link to="/research" className={`transition-colors ${location.pathname === '/research' ? 'text-teal font-bold' : 'hover:text-teal'}`}>
                  Research & Field Pilots
                </Link>
              </li>
              <li>
                <Link to="/tools" className={`transition-colors ${location.pathname === '/tools' ? 'text-teal font-bold' : 'hover:text-teal'}`}>
                  Interactive Tool Suite (16)
                </Link>
              </li>
              <li>
                <Link to="/contact" className={`transition-colors ${location.pathname === '/contact' ? 'text-teal font-bold' : 'hover:text-teal'}`}>
                  Contact Secretariat
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Individual Research & Case Studies */}
          <div className="space-y-4">
            <span className={`font-mono text-xs font-bold uppercase tracking-wider block ${
              isLight ? 'text-[#0F172A]' : 'text-white'
            }`}>
              Featured Research & Pilots
            </span>
            <ul className="space-y-2.5">
              {ALL_ARTIFACTS.map(art => {
                const isActive = location.pathname === `/case-studies/${art.id}`;
                return (
                  <li key={art.id}>
                    <Link 
                      to={`/case-studies/${art.id}`} 
                      className={`transition-colors block truncate max-w-[260px] ${
                        isActive ? 'text-teal font-bold' : 'hover:text-teal'
                      }`}
                      title={art.title}
                    >
                      • {art.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Col 3: Policy & National Framework */}
          <div className="space-y-4">
            <span className={`font-mono text-xs font-bold uppercase tracking-wider block ${
              isLight ? 'text-[#0F172A]' : 'text-white'
            }`}>
              Policy & Finance
            </span>
            <ul className="space-y-2.5">
              <li>
                <Link to="/policy" className="hover:text-teal transition-colors">
                  $10.1T Capital Allocation Architecture
                </Link>
              </li>
              <li>
                <Link to="/policy" className="hover:text-teal transition-colors">
                  Just Transition in Coal Belts (54 Districts)
                </Link>
              </li>
              <li>
                <Link to="/policy" className="hover:text-teal transition-colors">
                  National Green Hydrogen Mission
                </Link>
              </li>
              <li>
                <Link to="/policy" className="hover:text-teal transition-colors">
                  Carbon Credit Trading Scheme (CCTS)
                </Link>
              </li>
              <li>
                <Link to="/simulator" className="hover:text-teal transition-colors">
                  Macro Decarbonization Sandbox
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Consortium & Governance */}
          <div className="space-y-4">
            <span className={`font-mono text-xs font-bold uppercase tracking-wider block ${
              isLight ? 'text-[#0F172A]' : 'text-white'
            }`}>
              Consortium & Data
            </span>
            <ul className="space-y-2.5">
              <li>
                <Link to="/data" className="hover:text-teal transition-colors">
                  Open Science Emissions Database
                </Link>
              </li>
              <li>
                <Link to="/consortium" className="hover:text-teal transition-colors">
                  Academic & Think-Tank Partners
                </Link>
              </li>
              <li>
                <Link to="/consortium" className="hover:text-teal transition-colors">
                  Scientific Steering Committee
                </Link>
              </li>
              <li>
                <Link to="/publications" className="hover:text-teal transition-colors">
                  Peer-Reviewed Working Papers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-teal transition-colors">
                  Fellowship & Data Inquiries
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* ── BOTTOM TIER: COMPLIANCE, COPYRIGHT & STATUS ── */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-6">
            <span className={isLight ? 'text-[#64748B]' : 'text-[#64748B]'}>
              © 2026 NetZero India Initiative (NZII). Open Science Consortium.
            </span>
            <Link to="/policy" className="hover:text-teal transition-colors">
              Terms & Licensing
            </Link>
            <Link to="/data" className="hover:text-teal transition-colors">
              Data Governance
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-emerald-500 font-bold">National Baseline: Active</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
