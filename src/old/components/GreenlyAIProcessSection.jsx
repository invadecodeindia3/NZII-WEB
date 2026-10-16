import React, { useState, useEffect, useRef } from 'react';
import { 
  Zap, 
  Droplets, 
  FlaskConical, 
  Flame,
  CheckCircle2,
  Database,
  Network,
  Activity,
  FileCheck2
} from 'lucide-react';
import { useGame } from '../context/GameContext';

const AI_NETZERO_STEPS = [
  {
    id: 'ingestion',
    name: 'Activity Data Ingestion',
    description: 'Autonomous ingestion of smart meter logs, enterprise ERP Scope 1 & 2 ledgers, and supply chain bills of lading across India’s industrial corridors.',
    icon: Zap,
    timecode: '00:01',
    progressArc: 0.25, // 90 deg
    innerVisual: (
      <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0A0F1D] p-6 text-white text-center">
        <div className="relative flex items-center justify-center mb-3">
          <div className="w-16 h-16 rounded-xl bg-teal/20 border border-teal/40 flex items-center justify-center text-teal shadow-lg animate-pulse">
            <Zap className="w-8 h-8" />
          </div>
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 animate-ping"></span>
        </div>
        <span className="text-[11px] font-mono uppercase tracking-widest text-teal font-bold block mb-1">
          ERP & Smart Meters
        </span>
        <span className="text-xs font-manrope font-semibold text-white/90">
          Continuous Scope 1, 2 & 3 Stream
        </span>
        <div className="mt-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 border border-white/10 font-mono text-[10px] text-emerald-400">
          <CheckCircle2 className="w-3 h-3" />
          <span>ISO 14064 Standardized</span>
        </div>
      </div>
    )
  },
  {
    id: 'matching',
    name: 'Dynamic Factor Matching',
    description: 'Activity data is matched against 100,000+ verified LCA factors and regional Indian CEA grid emissions (0.713 kg/kWh).',
    icon: Droplets,
    timecode: '00:02',
    progressArc: 0.5, // 180 deg
    innerVisual: (
      <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0C1E30] via-[#112A45] to-[#071320] p-6 text-white text-center">
        <div className="relative flex items-center justify-center mb-3">
          <div className="w-16 h-16 rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-400 shadow-lg">
            <Droplets className="w-8 h-8" />
          </div>
        </div>
        <span className="text-[11px] font-mono uppercase tracking-widest text-blue-400 font-bold block mb-1">
          CEA Grid & IPCC Engine
        </span>
        <span className="text-xs font-manrope font-semibold text-white/90">
          5 Regional Indian Grids
        </span>
        <div className="mt-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 border border-white/10 font-mono text-[10px] text-blue-300">
          <CheckCircle2 className="w-3 h-3" />
          <span>Real-Time Factor Attribution</span>
        </div>
      </div>
    )
  },
  {
    id: 'simulation',
    name: 'Abatement Optimization',
    description: '8,760h hourly unit commitment generates lowest-cost MACC marginal abatement pathways for solar RTC and hydrogen DRI.',
    icon: FlaskConical,
    timecode: '00:03',
    progressArc: 0.75, // 270 deg
    innerVisual: (
      <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#1E1308] via-[#331E0A] to-[#120B04] p-6 text-white text-center">
        <div className="relative flex items-center justify-center mb-3">
          <div className="w-16 h-16 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shadow-lg">
            <FlaskConical className="w-8 h-8" />
          </div>
        </div>
        <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-bold block mb-1">
          MACC Decarbonization Curves
        </span>
        <span className="text-xs font-manrope font-semibold text-white/90">
          Lowest $/Ton CO2 Abatement
        </span>
        <div className="mt-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 border border-white/10 font-mono text-[10px] text-amber-300">
          <CheckCircle2 className="w-3 h-3" />
          <span>2030–2070 Trajectory</span>
        </div>
      </div>
    )
  },
  {
    id: 'assurance',
    name: 'SEBI BRSR Core Assurance',
    description: 'Instant generation of SEBI BRSR Core and CDP compliant disclosures with immutable data provenance for third-party assurance.',
    icon: Flame,
    timecode: '00:04',
    progressArc: 1.0, // 360 deg
    innerVisual: (
      <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#1E0E18] via-[#331428] to-[#12070E] p-6 text-white text-center">
        <div className="relative flex items-center justify-center mb-3">
          <div className="w-16 h-16 rounded-xl bg-coral/20 border border-coral/40 flex items-center justify-center text-coral shadow-lg">
            <Flame className="w-8 h-8" />
          </div>
        </div>
        <span className="text-[11px] font-mono uppercase tracking-widest text-coral font-bold block mb-1">
          SEBI BRSR & CDP Dossier
        </span>
        <span className="text-xs font-manrope font-semibold text-white/90">
          Immutable Audit Provenance
        </span>
        <div className="mt-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 border border-white/10 font-mono text-[10px] text-coral">
          <CheckCircle2 className="w-3 h-3" />
          <span>Third-Party Verification</span>
        </div>
      </div>
    )
  }
];

export const GreenlyAIProcessSection = () => {
  const { theme } = useGame();
  const isLight = theme === 'light';

  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Direct, rock-solid scroll calculation based on the section's position relative to the viewport
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const totalScrollableDistance = rect.height - window.innerHeight;
      
      if (totalScrollableDistance <= 0) return;

      // When the top of section reaches 0 (or goes negative), calculate progress through the section
      const progress = Math.min(
        1,
        Math.max(0, -rect.top / totalScrollableDistance)
      );

      // Divide into 4 clean stages
      const newIndex = Math.min(
        AI_NETZERO_STEPS.length - 1,
        Math.floor(progress * AI_NETZERO_STEPS.length)
      );

      setActiveIndex(newIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeStep = AI_NETZERO_STEPS[activeIndex];

  // SVG parameters matching exact video geometry
  const radius = 170;
  const circumference = 2 * Math.PI * radius;
  const strokeOffset = circumference - (activeStep.progressArc * circumference);
  const arrowAngleDeg = activeStep.progressArc * 360 - 90;

  return (
    <section 
      ref={sectionRef}
      className={`relative w-full transition-colors duration-500 border-b ${
        isLight ? 'bg-[#FCFDFB] text-[#0F172A] border-[#E2E8F0]' : 'bg-[#060709] text-white border-[#181F2C]'
      }`}
      style={{ height: '360vh' }} // Generous height guarantees smooth scroll through all 4 containers
    >
      {/* ── STICKY VIEWPORT CONTAINER (Locks into viewport top:0 for entire 360vh duration) ── */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between py-10 sm:py-12 px-[4vw] max-w-[1720px] mx-auto overflow-hidden">
        
        {/* Sticky Header Top Center */}
        <div className="text-center space-y-2 pt-2">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">
              HOW IT WORKS
            </span>
          </div>
          <h2 className={`font-manrope text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight ${
            isLight ? 'text-[#0F172A]' : 'text-white'
          }`}>
            Addressing emissions at the source
          </h2>
        </div>

        {/* ── CENTER 2-COLUMN DISPLAY ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto w-full">
          
          {/* ── LEFT COLUMN (6 COLS): CURRENT ACTIVE TYPOGRAPHY STEP ── */}
          <div className="lg:col-span-6 space-y-6 pl-2 sm:pl-8">
            
            {/* Minimalist Square Icon Box (max 12px rounded) */}
            <div className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-300 ${
              isLight 
                ? 'bg-white border-[#E2E8F0] text-coral shadow-sm' 
                : 'bg-[#121620] border-[#222A38] text-coral shadow-md'
            }`}>
              {React.createElement(activeStep.icon, { className: 'w-6 h-6 stroke-[1.5]' })}
            </div>

            {/* Step Headline */}
            <h3 className={`font-manrope text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight transition-all duration-300 ${
              isLight ? 'text-[#0F172A]' : 'text-white'
            }`}>
              {activeStep.name}
            </h3>

            {/* Description */}
            <p className={`font-manrope text-base sm:text-lg leading-relaxed max-w-md transition-all duration-300 ${
              isLight ? 'text-[#475569]' : 'text-[#94A3B8]'
            }`}>
              {activeStep.description}
            </p>

            {/* Micro Step Navigation Dots */}
            <div className="flex items-center gap-2 pt-2">
              {AI_NETZERO_STEPS.map((step, idx) => (
                <span
                  key={step.id}
                  className={`transition-all duration-300 ${
                    idx === activeIndex 
                      ? 'w-8 h-1.5 rounded-full bg-teal' 
                      : 'w-1.5 h-1.5 rounded-full bg-black/20 dark:bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* ── RIGHT COLUMN (6 COLS): FIXED CIRCULAR ORBITAL VESSEL & ROTATING PROGRESS ARC ── */}
          <div className="lg:col-span-6 flex items-center justify-center relative">
            <div className="relative w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] flex items-center justify-center">
              
              {/* Outer Thin Reference Ring */}
              <div className="absolute inset-4 rounded-full border border-black/10 dark:border-white/10"></div>
              
              {/* Secondary Faded Concentric Track */}
              <div className="absolute inset-12 rounded-full border border-teal/5"></div>

              {/* 4 Precision Cardinal Crosshairs (+) */}
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 text-black/30 dark:text-white/30 font-mono text-xs">+</div>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-black/30 dark:text-white/30 font-mono text-xs">+</div>
              <div className="absolute -left-1 top-1/2 -translate-y-1/2 text-black/30 dark:text-white/30 font-mono text-xs">+</div>
              <div className="absolute -right-1 top-1/2 -translate-y-1/2 text-black/30 dark:text-white/30 font-mono text-xs">+</div>

              {/* Animated Progress Arc */}
              <svg className="absolute inset-0 w-full h-full transform -rotate-90 pointer-events-none" viewBox="0 0 440 440">
                <circle
                  cx="220"
                  cy="220"
                  r={radius}
                  fill="none"
                  stroke={isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)"}
                  strokeWidth="1"
                />
                <circle
                  cx="220"
                  cy="220"
                  r={radius}
                  fill="none"
                  stroke="#E76F51"
                  strokeWidth="1.25"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeOffset}
                  strokeLinecap="round"
                  className="transition-all duration-500 ease-out"
                />
              </svg>

              {/* Micro Crisp Chevron Arrow on Arc Tip */}
              <div 
                className="absolute w-full h-full transition-transform duration-500 ease-out pointer-events-none"
                style={{ transform: `rotate(${arrowAngleDeg}deg)` }}
              >
                <div 
                  className="absolute"
                  style={{
                    top: '50px', // 220 - 170 = 50px
                    left: '50%',
                    transform: 'translateX(-50%) rotate(90deg)'
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path 
                      d="M 3 2 L 9 6 L 3 10" 
                      stroke="#E76F51" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                    />
                  </svg>
                </div>
              </div>

              {/* Inner Circular Media Vessel */}
              <div className={`relative w-56 h-56 sm:w-64 sm:h-64 rounded-full overflow-hidden shadow-2xl border-2 transition-all duration-500 ${
                isLight ? 'border-[#CBD5E1]' : 'border-white/10'
              }`}>
                {activeStep.innerVisual}
              </div>

              {/* Monospace Timecode at Bottom Right */}
              <div className="absolute bottom-2 right-4 font-mono text-xs text-coral font-bold tracking-widest">
                {activeStep.timecode}
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Status Marker */}
        <div className="w-full flex items-center justify-between text-[11px] font-mono opacity-40 px-4 pt-2">
          <span>NZII Autonomous Decarbonization Pipeline</span>
          <span>Scroll to cycle stages ↓</span>
        </div>

      </div>
    </section>
  );
};
