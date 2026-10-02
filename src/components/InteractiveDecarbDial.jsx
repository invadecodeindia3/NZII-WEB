import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  Globe2,
  Sparkles,
  TrendingDown,
  Sun,
  Factory,
  ArrowRight,
  HelpCircle,
  X,
  Gauge,
  SlidersHorizontal,
  BarChart3,
  Flame,
  Zap,
  Leaf,
  Layers,
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react';
import { useGame } from '../context/GameContext';

export const InteractiveDecarbDial = ({ displayEmissions }) => {
  const {
    levers,
    updateLever,
    targetYear,
    reductionPercent,
    playSound,
    theme
  } = useGame();

  const isLight = theme === 'light';
  const [activeLayout, setActiveLayout] = useState('cockpit'); // 'cockpit' | 'dial'
  const [activeTab, setActiveTab] = useState('simulation');
  const [showExplainer, setShowExplainer] = useState(false);

  // SVG Gauge Progress Calculation
  const progressRatio = Math.min(1, Math.max(0, (2070 - targetYear) / (2070 - 2046)));
  const circumference = 2 * Math.PI * 92;
  const strokeDashoffset = circumference - progressRatio * circumference * 0.75;

  const applyPreset = (presetName) => {
    if (presetName === 'aggressive') {
      updateLever('cleanGrid', 88);
      updateLever('industrialEff', 70);
      confetti({ particleCount: 45, spread: 60 });
      playSound(680);
    } else if (presetName === 'moderate') {
      updateLever('cleanGrid', 65);
      updateLever('industrialEff', 45);
      playSound(520);
    } else {
      updateLever('cleanGrid', 40);
      updateLever('industrialEff', 25);
      playSound(420);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4">
      
      {/* Layout View Switcher Pill */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <div className={`p-1 rounded-2xl border flex items-center gap-1 text-xs font-manrope font-bold ${
          isLight ? 'bg-white border-[#E2E8F0] shadow-sm text-[#0F172A]' : 'bg-[#141822] border-[#222A38] text-white'
        }`}>
          <button
            onClick={() => { setActiveLayout('cockpit'); playSound(440); }}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
              activeLayout === 'cockpit' 
                ? 'bg-teal text-white shadow-sm' 
                : isLight ? 'text-[#64748B] hover:text-[#0F172A]' : 'text-white/60 hover:text-white'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Dual-Pane Cockpit (Wide Terminal)</span>
          </button>
          <button
            onClick={() => { setActiveLayout('dial'); playSound(440); }}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
              activeLayout === 'dial' 
                ? 'bg-teal text-white shadow-sm' 
                : isLight ? 'text-[#64748B] hover:text-[#0F172A]' : 'text-white/60 hover:text-white'
            }`}
          >
            <Gauge className="w-3.5 h-3.5" />
            <span>Radial Dial Card</span>
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          LAYOUT 1: WIDE HORIZONTAL DUAL-PANE COCKPIT (Clean modern dashboard)
         ───────────────────────────────────────────────────────────── */}
      {activeLayout === 'cockpit' && (
        <div className={`w-full rounded-3xl border transition-all duration-500 overflow-hidden shadow-2xl p-6 sm:p-10 ${
          isLight 
            ? 'bg-white border-[#E2E8F0] text-[#0F172A]' 
            : 'bg-gradient-to-br from-[#121926] via-[#0E131E] to-[#0A0D15] border-[#222D3E] text-white'
        }`}>
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            {/* ── LEFT PANE: IMPACT GAUGE & ACCELERATION SPEEDOMETER (5 COLS) ── */}
            <div className={`lg:col-span-5 p-7 rounded-3xl border flex flex-col justify-between h-full text-center relative overflow-hidden ${
              isLight 
                ? 'bg-[#F8FAFC] border-[#E2E8F0]' 
                : 'bg-black/30 border-white/10 backdrop-blur-md'
            }`}>
              
              {/* Subtle Ambient Radial Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-teal/15 rounded-full blur-3xl pointer-events-none"></div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-teal uppercase">
                    Calculated Milestone
                  </span>
                  <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${
                    isLight ? 'bg-teal-50 border-teal-200 text-teal-800' : 'bg-teal/10 border-teal/30 text-teal-light'
                  }`}>
                    Live Synthesis
                  </span>
                </div>

                <span className="text-xs font-mono text-white/50 block mb-1">
                  PROJECTED NET-ZERO HORIZON
                </span>

                <div className={`text-6xl sm:text-7xl font-manrope font-black tracking-tight my-2 ${
                  isLight 
                    ? 'text-teal-900' 
                    : 'text-transparent bg-clip-text bg-gradient-to-r from-teal-light via-white to-lime'
                }`}>
                  {targetYear}
                </div>

                <div className="mb-6">
                  {2070 - targetYear > 0 ? (
                    <span className="inline-flex items-center gap-1 text-sm font-bold text-emerald-600 dark:text-emerald-400 font-manrope">
                      <Sparkles className="w-4 h-4" />
                      <span>{2070 - targetYear} years ahead of 2070 national baseline</span>
                    </span>
                  ) : (
                    <span className="text-sm font-semibold text-white/70">
                      Aligned with India&apos;s 2070 Glasgow Pledge
                    </span>
                  )}
                </div>

                {/* 2-Metric Callout Pods */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className={`p-3 rounded-2xl border ${
                    isLight ? 'bg-white border-[#E2E8F0]' : 'bg-[#161D2A] border-[#253044]'
                  }`}>
                    <span className="text-[10px] font-mono uppercase text-white/50 block">
                      Pollution Cut
                    </span>
                    <span className="text-xl font-mono font-extrabold text-teal">
                      {reductionPercent}%
                    </span>
                  </div>
                  <div className={`p-3 rounded-2xl border ${
                    isLight ? 'bg-white border-[#E2E8F0]' : 'bg-[#161D2A] border-[#253044]'
                  }`}>
                    <span className="text-[10px] font-mono uppercase text-white/50 block">
                      Annual Residual
                    </span>
                    <span className="text-sm font-mono font-bold text-coral">
                      {displayEmissions} Mt
                    </span>
                  </div>
                </div>
              </div>

              <Link
                to="/simulator"
                onClick={() => playSound(520)}
                className="w-full py-3 rounded-2xl bg-teal hover:bg-teal-dark text-white font-manrope font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] transition-all cursor-pointer"
              >
                <span>Launch Comprehensive Sandbox</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* ── RIGHT PANE: INTERACTIVE POLICY CONTROL BARS & SCENARIO BUTTONS (7 COLS) ── */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Header & Preset Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/10 dark:border-white/10">
                <div>
                  <h3 className={`font-manrope text-xl font-extrabold tracking-tight ${
                    isLight ? 'text-[#0F172A]' : 'text-white'
                  }`}>
                    Sectoral Decarbonization Levers
                  </h3>
                  <p className={`text-xs mt-0.5 ${isLight ? 'text-[#64748B]' : 'text-[#94A3B8]'}`}>
                    Drag the sliders to test accelerated policy intervention targets.
                  </p>
                </div>

                {/* Preset Chips */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => applyPreset('baseline')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                      isLight 
                        ? 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]' 
                        : 'bg-white/10 text-white/80 hover:bg-white/20'
                    }`}
                  >
                    Baseline
                  </button>
                  <button
                    onClick={() => applyPreset('moderate')}
                    className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-teal/20 text-teal dark:text-teal-light hover:bg-teal/30 transition-all cursor-pointer"
                  >
                    Accelerated
                  </button>
                  <button
                    onClick={() => applyPreset('aggressive')}
                    className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-coral/20 text-coral hover:bg-coral/30 transition-all cursor-pointer"
                  >
                    Sprint 🚀
                  </button>
                </div>
              </div>

              {/* Slider 1: Clean Power Capacity */}
              <div className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                isLight ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-[#151C28] border-[#242E40]'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
                      <Sun className="w-4 h-4" />
                    </div>
                    <div>
                      <span className={`font-manrope font-bold text-sm block ${
                        isLight ? 'text-[#0F172A]' : 'text-white'
                      }`}>
                        Renewable Power & Storage Expansion
                      </span>
                      <span className={`text-[11px] font-mono ${isLight ? 'text-[#64748B]' : 'text-[#71717A]'}`}>
                        Solar PV + Wind + Pumped Hydro BESS
                      </span>
                    </div>
                  </div>
                  <span className="font-mono font-extrabold text-base text-teal">{levers.cleanGrid}%</span>
                </div>

                <input
                  type="range"
                  min="10"
                  max="95"
                  value={levers.cleanGrid}
                  onChange={(e) => updateLever('cleanGrid', e.target.value)}
                  className="w-full h-2.5 bg-black/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-teal my-2"
                />

                <div className={`flex justify-between text-[10px] font-mono ${
                  isLight ? 'text-[#94A3B8]' : 'text-[#71717A]'
                }`}>
                  <span>10% (Coal Baseload Dominant)</span>
                  <span>95% (Fully Decarbonized Grid)</span>
                </div>
              </div>

              {/* Slider 2: Industrial Fuel Switching */}
              <div className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                isLight ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-[#151C28] border-[#242E40]'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-coral/10 text-coral border border-coral/20">
                      <Factory className="w-4 h-4" />
                    </div>
                    <div>
                      <span className={`font-manrope font-bold text-sm block ${
                        isLight ? 'text-[#0F172A]' : 'text-white'
                      }`}>
                        Green Hydrogen in Heavy Industry
                      </span>
                      <span className={`text-[11px] font-mono ${isLight ? 'text-[#64748B]' : 'text-[#71717A]'}`}>
                        DRI Primary Steel + Cement CCUS + Ammonia
                      </span>
                    </div>
                  </div>
                  <span className="font-mono font-extrabold text-base text-coral">{levers.industrialEff}%</span>
                </div>

                <input
                  type="range"
                  min="5"
                  max="90"
                  value={levers.industrialEff}
                  onChange={(e) => updateLever('industrialEff', e.target.value)}
                  className="w-full h-2.5 bg-black/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-coral my-2"
                />

                <div className={`flex justify-between text-[10px] font-mono ${
                  isLight ? 'text-[#94A3B8]' : 'text-[#71717A]'
                }`}>
                  <span>5% (Fossil Feedstock Standard)</span>
                  <span>90% (100% Green H2 at Parity)</span>
                </div>
              </div>

              {/* Micro Sector Contribution Summary Bar */}
              <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                isLight ? 'bg-teal-50/50 border-teal-200' : 'bg-[#101620] border-[#1C2636]'
              }`}>
                <div className="flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-teal" />
                  <span className={`text-xs font-manrope font-semibold ${
                    isLight ? 'text-teal-950' : 'text-white/90'
                  }`}>
                    Abatement Velocity:
                  </span>
                  <span className="font-mono text-xs font-bold text-teal">
                    {Math.round(levers.cleanGrid * 14.2 + levers.industrialEff * 10.4)} Mt CO2e / yr abated
                  </span>
                </div>
                <span className={`text-[11px] font-mono ${isLight ? 'text-[#64748B]' : 'text-white/50'}`}>
                  Real-time equilibrium simulation
                </span>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          LAYOUT 2: CLASSIC RADIAL DIAL CARD (Original compact view)
         ───────────────────────────────────────────────────────────── */}
      {activeLayout === 'dial' && (
        <div className="w-full max-w-xl mx-auto rounded-3xl bg-gradient-to-b from-[#142640] via-[#1D3658] to-[#0f1d30] p-6 sm:p-8 text-white shadow-2xl border border-teal/40 relative overflow-hidden group">
          
          <div className="relative z-10 flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-teal/15 border border-teal/30">
                <Globe2 className="w-5 h-5 text-teal animate-spin-slow" />
              </div>
              <div>
                <div className="font-manrope text-base font-bold text-white tracking-wide">
                  India Net-Zero Year
                </div>
                <div className="text-xs text-teal-light/80 font-mono mt-0.5">
                  Live Scenario Calculator
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-xl border border-white/10">
              <button
                onClick={() => { setActiveTab('simulation'); playSound(480); }}
                className={`px-3 py-1 rounded-lg text-xs font-manrope font-bold transition-all cursor-pointer ${
                  activeTab === 'simulation' ? 'bg-teal text-white shadow-sm' : 'text-white/60 hover:text-white'
                }`}
              >
                Adjust
              </button>
              <button
                onClick={() => { setActiveTab('breakdown'); playSound(480); }}
                className={`px-3 py-1 rounded-lg text-xs font-manrope font-bold transition-all cursor-pointer ${
                  activeTab === 'breakdown' ? 'bg-teal text-white shadow-sm' : 'text-white/60 hover:text-white'
                }`}
              >
                Results
              </button>
            </div>
          </div>

          {/* Central Radial Gauge Display */}
          <div className="relative z-10 py-5 flex flex-col items-center justify-center">
            <div className="relative w-64 h-64 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-135" viewBox="0 0 220 220">
                <circle
                  cx="110"
                  cy="110"
                  r="92"
                  fill="transparent"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="10"
                  strokeDasharray={circumference * 0.75 + ' ' + circumference * 0.25}
                  strokeLinecap="round"
                />
                <circle
                  cx="110"
                  cy="110"
                  r="92"
                  fill="transparent"
                  stroke="url(#dialGradient)"
                  strokeWidth="10"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-500 ease-out"
                />
                <defs>
                  <linearGradient id="dialGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2B9D8F" />
                    <stop offset="60%" stopColor="#A7C957" />
                    <stop offset="100%" stopColor="#E76F51" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none">
                <span className="text-xs font-manrope uppercase tracking-wider text-teal-light font-bold flex items-center gap-1 mb-0.5">
                  <Sparkles className="w-3.5 h-3.5 text-lime animate-pulse" />
                  Expected Year
                </span>
                
                <div className="text-6xl font-manrope font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-light via-white to-lime tracking-tight drop-shadow-md">
                  {targetYear}
                </div>

                <div className="text-xs font-medium text-white/60 mt-0.5">
                  {2070 - targetYear > 0 ? (
                    <span className="text-lime font-bold">
                      {2070 - targetYear} years ahead of 2070 target
                    </span>
                  ) : (
                    'On track with 2070 target'
                  )}
                </div>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-white backdrop-blur-md -mt-2 shadow-inner">
              <TrendingDown className="w-4 h-4 text-lime" />
              <span><strong>{reductionPercent}%</strong> total pollution cut</span>
            </div>
          </div>

          {/* Sliders in Dial View */}
          {activeTab === 'simulation' && (
            <div className="relative z-10 space-y-4 pt-3 border-t border-white/10">
              <div className="flex items-center justify-between gap-2 pb-1">
                <span className="text-xs font-manrope text-white/60 font-semibold">
                  Quick Scenarios:
                </span>
                <div className="flex items-center gap-1.5">
                  <button onClick={() => applyPreset('baseline')} className="px-2.5 py-1 rounded-lg text-xs font-manrope bg-white/5 hover:bg-white/15 text-white/80 transition-all cursor-pointer">Standard</button>
                  <button onClick={() => applyPreset('moderate')} className="px-2.5 py-1 rounded-lg text-xs font-manrope bg-teal/20 text-teal-light font-bold transition-all cursor-pointer">Fast</button>
                  <button onClick={() => applyPreset('aggressive')} className="px-2.5 py-1 rounded-lg text-xs font-manrope bg-pink/20 text-pink-light font-bold transition-all cursor-pointer">Maximum Effort 🚀</button>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex justify-between text-xs font-manrope text-white mb-1.5">
                  <span className="flex items-center gap-2 font-bold">
                    <Sun className="w-4 h-4 text-amber-400" /> Clean Electricity (Solar & Wind)
                  </span>
                  <span className="text-teal font-mono font-extrabold text-sm">{levers.cleanGrid}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="95"
                  value={levers.cleanGrid}
                  onChange={(e) => updateLever('cleanGrid', e.target.value)}
                  className="w-full h-2.5 bg-navy-light rounded-lg appearance-none cursor-pointer accent-teal"
                />
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex justify-between text-xs font-manrope text-white mb-1.5">
                  <span className="flex items-center gap-2 font-bold">
                    <Factory className="w-4 h-4 text-coral" /> Green Fuel in Steel & Factories
                  </span>
                  <span className="text-coral-light font-mono font-extrabold text-sm">{levers.industrialEff}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="90"
                  value={levers.industrialEff}
                  onChange={(e) => updateLever('industrialEff', e.target.value)}
                  className="w-full h-2.5 bg-navy-light rounded-lg appearance-none cursor-pointer accent-coral"
                />
              </div>
            </div>
          )}

          {activeTab === 'breakdown' && (
            <div className="relative z-10 space-y-3 pt-3 border-t border-white/10">
              <div className="text-xs font-manrope text-white/80 font-bold mb-1">
                Where Pollution is Being Reduced:
              </div>
              {[
                { name: 'Electricity Generation', cut: `${Math.round(levers.cleanGrid * 12.5)} Million Tons`, share: levers.cleanGrid, color: 'bg-teal' },
                { name: 'Steel & Cement Factories', cut: `${Math.round(levers.industrialEff * 9.2)} Million Tons`, share: levers.industrialEff, color: 'bg-coral' },
                { name: 'Electric Cars & Freight', cut: `${Math.round(levers.evAdoption * 6.4)} Million Tons`, share: levers.evAdoption, color: 'bg-sky-400' },
                { name: 'Forests & Soil Sinks', cut: `${Math.round(levers.afforestation * 4.8)} Million Tons`, share: levers.afforestation, color: 'bg-emerald-400' },
              ].map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <div className="flex justify-between text-xs font-manrope">
                    <span className="text-white/90">{item.name}</span>
                    <span className="text-teal font-mono font-bold">{item.cut} saved</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div style={{ width: `${item.share}%` }} className={`h-full ${item.color} rounded-full transition-all duration-300`}></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="relative z-10 mt-5 pt-3.5 border-t border-white/10 flex items-center justify-between text-xs text-white/80">
            <div>
              <span className="text-white/50 text-[10px] block font-mono">ANNUAL POLLUTION:</span>
              <strong className="text-white font-mono text-sm">{displayEmissions} Mt CO2</strong>
            </div>

            <Link 
              to="/simulator"
              onClick={() => playSound(520)}
              className="px-4 py-2 rounded-xl bg-teal/20 hover:bg-teal text-teal-light hover:text-white font-manrope font-bold text-xs flex items-center gap-1.5 transition-all border border-teal/40"
            >
              <span>Open Full Tool</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

    </div>
  );
};
