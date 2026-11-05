import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { 
  Sliders, 
  RotateCcw, 
  Share2, 
  Award, 
  Zap, 
  TrendingDown, 
  Layers, 
  ShieldCheck, 
  Activity, 
  BarChart3, 
  ArrowRight,
  Sparkles,
  Gauge,
  Compass,
  Cpu
} from 'lucide-react';
import { useGame, ACHIEVEMENTS } from '../context/GameContext';
import { InteractiveDecarbDial } from '../components/InteractiveDecarbDial';
import { RevealOnScroll } from '../components/RevealOnScroll';
import { FAQSection } from '../components/FAQSection';
import { PreFooterBanner } from '../components/PreFooterBanner';
import { downloadJSON } from '../utils/download';

export const SimulatorPage = () => {
  const {
    levers,
    updateLever,
    resetLevers,
    calculatedEmissions,
    targetYear,
    reductionPercent,
    unlockedBadges,
    impactScore,
    playSound,
    theme,
    ecoMode
  } = useGame();

  const isLight = theme === 'light';

  const leverControls = [
    {
      key: 'cleanGrid',
      title: 'Clean Energy & Grid Storage',
      desc: 'Solar, wind, hydro, and pumped-hydro storage displacing coal baseload generation.',
      stat: '500 GW by 2030 Target',
      icon: Zap
    },
    {
      key: 'industrialEff',
      title: 'Heavy Industry & Green Hydrogen DRI',
      desc: 'Green hydrogen retrofits for steel blast furnaces, CCUS in cement, and secondary scrap.',
      stat: '$1/kg H2 Cost Parity',
      icon: Cpu
    },
    {
      key: 'evAdoption',
      title: 'Commercial EV & Rail Freight',
      desc: '100% railway electrification and megawatt-charging highway corridors.',
      stat: '70% Commercial EV Fleet',
      icon: Activity
    },
    {
      key: 'afforestation',
      title: 'Terrestrial Sinks & Agroforestry',
      desc: 'Agroforestry boundaries, coastal mangrove restoration, and soil carbon preservation.',
      stat: '3.0 Gt CO2e Carbon Sink',
      icon: Layers
    },
    {
      key: 'greenH2',
      title: 'National Green Hydrogen Mission',
      desc: 'Electrolyzer deployment replacing gray hydrogen in fertilizers and refineries.',
      stat: '5 MMT Annual Production',
      icon: Sparkles
    },
    {
      key: 'gridModernization',
      title: 'AI Smart Grid & Demand Response',
      desc: 'Dynamic time-of-day load shifting, industrial symbiosis, and scrap recycling.',
      stat: '35% Material Circularity',
      icon: Compass
    }
  ];

  const simulatorFaqs = [
    {
      q: "How does the simulation model calculate national emissions abatement in real time?",
      a: "This prototype uses synthetic values and weights, not a calibrated national inventory or hourly dispatch simulation."
    },
    {
      q: "Can I export my simulated policy run for further academic analysis?",
      a: "Export Run downloads a JSON file containing your current demonstration inputs and outputs, marked unvalidated."
    }
  ];

  return (
    <div className={`w-full min-h-screen transition-colors duration-500 pb-0 ${
      isLight ? 'bg-[#FFFFFF] text-[#0F172A]' : 'bg-[#080808] text-white'
    }`}>
      
      {/* ── 1. CINEMATIC HERO SECTION WITH VIDEO BACKGROUND ── */}
      <section className="relative w-full min-h-[580px] lg:min-h-[640px] flex flex-col justify-end pt-36 pb-20 px-[3vw] overflow-hidden select-none border-b border-white/10 bg-[#050B14] text-white">
        
        {/* Background Video Layer */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-45 scale-105"
        >
          
        </video>

        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/60 to-black/80 pointer-events-none z-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.7)_100%)] pointer-events-none z-10"></div>

        <div className="relative z-20 w-full max-w-[1720px] mx-auto">
          <RevealOnScroll direction="up" delay={60}>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div className="max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-xl glass-capsule border border-white/20">
                  <Sliders className="w-3.5 h-3.5 text-teal-light" />
                  <span className="text-[11px] font-mono font-bold tracking-widest text-teal-light uppercase">
                    Interactive Macro-Simulation Engine
                  </span>
                </div>
                <h1 className="font-manrope text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                  National Decarbonization Sandbox (Illustrative)
                </h1>
                <p className="text-base sm:text-lg leading-relaxed max-w-2xl font-normal text-white/85">
                  Stress-test policy levers, adjust sectoral deployment rates, and simulate India’s carbon trajectory from 2025 to 2070 in real time.
                </p>
              </div>

              {/* Action Buttons & Top Status Glass HUD */}
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <div className="glass-panel p-5 rounded-2xl border border-white/15 text-right min-w-[160px]">
                  <span className="text-[10px] font-mono uppercase text-teal-light font-bold block mb-1">Current Abatement</span>
                  <span className="text-2xl font-mono font-bold text-teal-light">{reductionPercent}% Cut</span>
                </div>

                <div className="glass-panel p-5 rounded-2xl border border-white/15 text-right min-w-[160px]">
                  <span className="text-[10px] font-mono uppercase text-white/60 font-bold block mb-1">Run Rate</span>
                  <span className="text-2xl font-mono font-bold text-coral">{calculatedEmissions} INDEX</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => { resetLevers(); playSound(420); }}
                    className="px-4 py-3.5 rounded-xl text-xs font-manrope font-bold transition-all flex items-center justify-center gap-2 glass-capsule text-white border-white/20 hover:bg-white/15 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset All</span>
                  </button>

                  <button
                    onClick={() => {
                      downloadJSON('nzii-scenario.json', {
                        status: 'illustrative_unvalidated', generatedAt: new Date().toISOString(),
                        methodology: 'Synthetic baseline 3000; simplified weighted levers; not actual emissions',
                        levers, impactScore, calculatedEmissions, reductionPercent, targetYear
                      });
                      playSound(680);
                    }}
                    className="px-5 py-3.5 rounded-xl bg-teal text-white text-xs font-manrope font-bold hover:bg-teal-dark transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Export Run</span>
                  </button>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── 2. MAIN SIMULATION INTERFACE (2-COLUMN SPLIT) ── */}
      <section className="w-full max-w-[1720px] mx-auto px-[3vw] py-14 space-y-12">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: 6 Lever Sliders */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className={`font-manrope font-extrabold text-2xl tracking-tight ${
                isLight ? 'text-[#0F172A]' : 'text-white'
              }`}>
                Policy & Technology Levers
              </h2>
              <span className={`text-xs font-mono ${isLight ? 'text-[#64748B]' : 'text-white/50'}`}>
                Adjust sliders to simulate
              </span>
            </div>

            <div className="space-y-4">
              {leverControls.map((ctrl, i) => {
                const val = levers[ctrl.key] || 0;
                const CtrlIcon = ctrl.icon;
                return (
                  <RevealOnScroll key={ctrl.key} direction="up" delay={80 + i * 40}>
                    <div className={`p-6 rounded-xl border transition-all ${
                      isLight 
                        ? 'bg-white border-[#E2E8F0] shadow-sm hover:border-teal/50' 
                        : 'bg-[#101520] border-[#1D2636] hover:border-teal/40'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-teal/10 text-teal flex items-center justify-center">
                            <CtrlIcon className="w-4 h-4" />
                          </div>
                          <h3 className={`font-manrope font-extrabold text-base ${
                            isLight ? 'text-[#0F172A]' : 'text-white'
                          }`}>
                            {ctrl.title}
                          </h3>
                        </div>
                        <span className="font-mono font-bold text-teal text-base">
                          {val}%
                        </span>
                      </div>

                      <p className={`text-xs mb-4 leading-relaxed ${isLight ? 'text-[#64748B]' : 'text-[#94A3B8]'}`}>
                        {ctrl.desc}
                      </p>

                      {/* Slider Track */}
                      <div className="flex items-center gap-4">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={val}
                          onChange={(e) => {
                            updateLever(ctrl.key, Number(e.target.value));
                            playSound(300 + val * 4);
                          }}
                          className="w-full accent-teal h-2 bg-black/10 dark:bg-white/10 rounded-lg cursor-pointer"
                        />
                        <span className={`text-[10px] font-mono whitespace-nowrap px-2 py-0.5 rounded ${
                          isLight ? 'bg-[#F1F5F9] text-[#475569]' : 'bg-[#18202E] text-white/60'
                        }`}>
                          {ctrl.stat}
                        </span>
                      </div>
                    </div>
                  </RevealOnScroll>
                );
              })}
            </div>
          </div>

          {/* Right Column: Embedded Interactive Decarb Dial & Milestones */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center sticky top-24 space-y-6">
            <div className="w-full">
              <InteractiveDecarbDial displayEmissions={calculatedEmissions} />
            </div>

            {/* Unlocked Scientific Milestones */}
            <div className={`w-full p-6 rounded-xl border ${
              isLight ? 'bg-[#F8FAFC] border-[#E2E8F0] shadow-sm' : 'bg-[#101520] border-[#1D2636]'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-teal" />
                  <span className={`text-xs font-mono font-bold uppercase ${
                    isLight ? 'text-[#0F172A]' : 'text-white'
                  }`}>
                    Milestones Achieved
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-teal">
                  {unlockedBadges.length} of {ACHIEVEMENTS.length} Unlocked
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {ACHIEVEMENTS.map((ach) => {
                  const isUnlocked = unlockedBadges.includes(ach.id);
                  const AchIcon = ach.icon;
                  return (
                    <div
                      key={ach.id}
                      className={`p-3 rounded-lg border text-xs font-manrope flex items-center gap-2.5 transition-all ${
                        isUnlocked
                          ? isLight 
                            ? 'bg-teal-50 border-teal-300 text-teal-900 font-bold' 
                            : 'bg-teal/15 border-teal/40 text-teal-light font-bold'
                          : isLight
                            ? 'bg-white/50 border-[#E2E8F0] text-[#94A3B8] opacity-50'
                            : 'bg-[#161D29] border-[#222E40] text-white/30 opacity-50'
                      }`}
                    >
                      <AchIcon className="w-4 h-4 shrink-0 text-teal" />
                      <span className="truncate">{ach.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 3. FAQS SECTION ── */}
      <FAQSection 
        title="Simulation Sandbox FAQs"
        subtitle="Addressing real-time model resolution, MACC calculations, and data export"
        faqs={simulatorFaqs}
      />

      {/* ── 4. PRE-FOOTER BANNER ── */}
      <PreFooterBanner 
        tag="MACRO DECARBONIZATION SANDBOX"
        title="Explore India’s Decarbonization Policy Framework"
        subtitle="Review the 4 core policy pillars supporting $10.1 trillion in clean capital allocation."
        primaryCtaText="Explore Policy Framework"
        primaryCtaLink="/policy"
        secondaryCtaText="Explore Interactive Tools"
        secondaryCtaLink="/tools"
      />

    </div>
  );
};
