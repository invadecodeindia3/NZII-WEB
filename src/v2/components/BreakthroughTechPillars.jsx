import React, { useState } from 'react';
import { 
  Zap, 
  Cpu, 
  Flame, 
  Factory, 
  Sun, 
  Scale, 
  ArrowRight, 
  TrendingDown, 
  Sparkles,
  CheckCircle2,
  Atom,
  Wind
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { RevealOnScroll } from './RevealOnScroll';

// Breakthrough decarbonization technologies modeled after CURA Climate, ZeroBiz, and Greenly AI
const DEEP_TECH_BREAKTHROUGHS = [
  {
    id: 'cura-electrochemistry',
    category: 'Hard-to-Abate Industrial Tech',
    badge: 'CURA CLIMATE RETROFIT',
    title: 'Electrochemical Zero-CO2 Clinker & Lime',
    impact: '-85% Process Emissions',
    maturity: 'TRL 7 • Commercial Pilot',
    description: 'Electrochemical separation of process CO2 at the limestone calcination phase before kiln entry, creating pure zero-carbon reactive lime for cement with zero alteration to existing kilns.',
    capexPerTon: '$42 / t CO2',
    techSpecs: [
      { label: 'Feedstock Flexibility', value: '100% standard limestone' },
      { label: 'Energy Requirement', value: '1.4 MWh / ton CaO' },
      { label: 'Byproduct Value', value: '99.8% pure food-grade CO2' }
    ],
    accentColor: '#0D9488'
  },
  {
    id: 'h2-direct-reduction',
    category: 'Heavy Metallurgy',
    badge: 'STEEL DECARBONIZATION',
    title: '100% Green Hydrogen DRI Furnaces',
    impact: '-95% Metallurgical Carbon',
    maturity: 'TRL 8 • Industrial Scaling',
    description: 'Direct Reduced Iron shafts fueled entirely by pressurized electrolytic green hydrogen, eliminating coking coal blast furnaces in Odisha & Jharkhand steel clusters.',
    capexPerTon: '$58 / t CO2',
    techSpecs: [
      { label: 'H2 Consumption', value: '52 kg H2 / ton crude steel' },
      { label: 'Water Recycling', value: '94% closed loop loop' },
      { label: 'Grid Coupling', value: 'Dynamic 24/7 solar-wind PPA' }
    ],
    accentColor: '#E76F51'
  },
  {
    id: 'greenly-ai-orchestration',
    category: 'AI & Grid Orchestration',
    badge: 'AUTONOMOUS GRID DISPATCH',
    title: 'Multi-Agent 8,760h Decarbonization AI',
    impact: '32 GW Peaker Coal Avoided',
    maturity: 'TRL 9 • Deployed Live',
    description: 'Predictive neural dispatch balancing 500 GW of variable solar and wind across the National Load Despatch Centre (NLDC), optimizing battery and pumped hydro arbitrage.',
    capexPerTon: '$8 / t CO2',
    techSpecs: [
      { label: 'Forecast Horizon', value: '96-hour lookahead' },
      { label: 'Frequency Stability', value: '±0.02 Hz adherence' },
      { label: 'Curtailment Cut', value: 'Reduced by 88%' }
    ],
    accentColor: '#3B82F6'
  },
  {
    id: 'zerobiz-circularity',
    category: 'Circular Bio-Economy',
    badge: 'CARBON NEGATIVE SINKS',
    title: 'Agricultural Biochar & Bio-CNG Syngas',
    impact: '120 Mt CO2e Annual Sequestration',
    maturity: 'TRL 8 • National Scaling',
    description: 'Pyrolysis of Punjab & Haryana paddy crop residue into durable recalcitrant soil biochar (1,000-year half-life) while capturing bio-methane for compressed bio-gas (CBG) transport.',
    capexPerTon: '$24 / t CO2',
    techSpecs: [
      { label: 'Carbon Half-Life', value: '> 1,000 years in soil' },
      { label: 'Soil Moisture Gain', value: '+18% water retention' },
      { label: 'Air Quality Impact', value: 'Eliminates 92% stubble burning' }
    ],
    accentColor: '#10B981'
  }
];

export const BreakthroughTechPillars = () => {
  const { theme, playSound } = useGame();
  const isLight = theme === 'light';
  const [activeTechIndex, setActiveTechIndex] = useState(0);

  const activeTech = DEEP_TECH_BREAKTHROUGHS[activeTechIndex];

  return (
    <section className={`w-full py-20 md:py-28 px-[3vw] transition-colors duration-500 relative border-b ${
      isLight ? 'bg-[#FFFFFF] border-[#E2E8F0]' : 'bg-[#0E0E12] border-[#1C1C22]'
    }`}>
      <div className="w-full max-w-[1720px] mx-auto space-y-12">
        
        {/* Harmonized Center-Aligned Header */}
        <RevealOnScroll direction="up" delay={80}>
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal/10 border border-teal/30">
              <span className="text-[11px] font-mono font-bold tracking-widest text-teal uppercase">
                Breakthrough Engineering & Architecture
              </span>
            </div>

            <h2 className={`font-manrope text-3xl sm:text-4xl 2xl:text-5xl font-extrabold tracking-tight ${
              isLight ? 'text-[#0F172A]' : 'text-white'
            }`}>
              Deep-Tech Pathways Powering India&apos;s Transition
            </h2>

            <p className={`text-sm sm:text-base max-w-2xl leading-relaxed ${
              isLight ? 'text-[#64748B]' : 'text-[#A1A1AA]'
            }`}>
              From electrochemical clinker decarbonization to multi-agent autonomous grid dispatch, explore the engineering levers closing India’s 2070 emissions gap.
            </p>
          </div>
        </RevealOnScroll>

        {/* ── INTERACTIVE TECH SELECTOR & DEEP ARCHITECTURE CARD ── */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Navigation Pill List (Left 4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            {DEEP_TECH_BREAKTHROUGHS.map((tech, idx) => {
              const isSelected = activeTechIndex === idx;
              return (
                <div
                  key={tech.id}
                  onClick={() => {
                    setActiveTechIndex(idx);
                    playSound(480);
                  }}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? isLight
                        ? 'bg-white border-teal ring-2 ring-teal/20 shadow-md translate-x-1'
                        : 'bg-[#181820] border-teal shadow-xl translate-x-1'
                      : isLight
                        ? 'bg-[#F8FAFC] border-[#E2E8F0] hover:border-teal/40'
                        : 'bg-[#121216] border-[#222228] hover:border-teal/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono font-bold tracking-wider text-teal uppercase">
                      {tech.badge}
                    </span>
                    <span className="text-xs font-mono font-extrabold text-emerald-600 dark:text-emerald-400">
                      {tech.impact}
                    </span>
                  </div>
                  <h4 className={`font-manrope font-bold text-sm sm:text-base ${
                    isSelected ? 'text-teal' : isLight ? 'text-[#0F172A]' : 'text-white'
                  }`}>
                    {tech.title}
                  </h4>
                  <div className={`text-[11px] font-mono mt-1 ${
                    isLight ? 'text-[#64748B]' : 'text-[#71717A]'
                  }`}>
                    {tech.category}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Deep Interactive Spec Display (Right 8 cols) */}
          <div className={`lg:col-span-8 p-8 sm:p-10 rounded-3xl border ${
            isLight
              ? 'bg-[#F8FAFC] border-[#E2E8F0] shadow-sm'
              : 'bg-[#14141A] border-[#272730] shadow-2xl'
          }`}>
            
            {/* Header of selected tech */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/10 dark:border-white/10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-teal/15 text-teal border border-teal/30 uppercase">
                    {activeTech.badge}
                  </span>
                  <span className={`text-xs font-mono ${isLight ? 'text-[#64748B]' : 'text-white/50'}`}>
                    {activeTech.maturity}
                  </span>
                </div>
                <h3 className={`font-manrope text-2xl sm:text-3xl font-extrabold tracking-tight ${
                  isLight ? 'text-[#0F172A]' : 'text-white'
                }`}>
                  {activeTech.title}
                </h3>
              </div>

              <div className="text-left sm:text-right">
                <span className={`text-[11px] font-mono block ${isLight ? 'text-[#64748B]' : 'text-[#71717A]'}`}>
                  ESTIMATED ABATEMENT COST
                </span>
                <span className="text-xl font-mono font-extrabold text-teal">
                  {activeTech.capexPerTon}
                </span>
              </div>
            </div>

            {/* Description Paragraph */}
            <div className="py-6">
              <p className={`font-manrope text-sm sm:text-base leading-relaxed ${
                isLight ? 'text-[#334155]' : 'text-[#D1D5DB]'
              }`}>
                {activeTech.description}
              </p>
            </div>

            {/* 3-Column Empirical Tech Specs Grid */}
            <div className="grid sm:grid-cols-3 gap-4 pt-6 border-t border-black/10 dark:border-white/10 mb-8">
              {activeTech.techSpecs.map((spec, i) => (
                <div 
                  key={i} 
                  className={`p-4 rounded-2xl border ${
                    isLight 
                      ? 'bg-white border-[#E2E8F0]' 
                      : 'bg-[#1A1A22] border-[#2A2A34]'
                  }`}
                >
                  <span className={`text-[10px] font-mono uppercase block mb-1 ${
                    isLight ? 'text-[#64748B]' : 'text-[#71717A]'
                  }`}>
                    {spec.label}
                  </span>
                  <span className={`font-mono text-xs sm:text-sm font-bold ${
                    isLight ? 'text-[#0F172A]' : 'text-white'
                  }`}>
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Action CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-black/10 dark:border-white/10">
              <span className={`text-xs font-mono ${isLight ? 'text-[#64748B]' : 'text-[#71717A]'}`}>
                Integrated into NZII Bottom-Up Dispatch Engine
              </span>
              <a
                href="/simulator"
                onClick={() => playSound(520)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-teal hover:bg-teal-dark text-white font-manrope font-bold text-xs shadow-md hover:scale-105 transition-all cursor-pointer"
              >
                <span>Simulate Technology Adoption</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
