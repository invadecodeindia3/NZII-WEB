import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { 
  Sun, 
  Factory, 
  Car, 
  Trees, 
  Layers, 
  Cpu, 
  Zap, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Sliders,
  TrendingDown,
  Sparkles,
  BarChart3
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { RevealOnScroll } from '../components/RevealOnScroll';
import { FAQSection } from '../components/FAQSection';
import { PreFooterBanner } from '../components/PreFooterBanner';

export const SectorsPage = () => {
  const { levers, updateLever, playSound, theme, ecoMode } = useGame();
  const isLight = theme === 'light';
  const [selectedSectorId, setSelectedSectorId] = useState('power');

  const sectors = [
    {
      id: 'power',
      title: 'Power & Grid Infrastructure',
      icon: Sun,
      share: '68% of Total GHG',
      target: '500 GW Non-Fossil by 2030',
      keyLever: 'cleanGrid',
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/30',
      description: 'Decarbonizing power baseload is the single highest-leverage intervention. Achieving round-the-clock clean power requires combining utility-scale solar and wind with pumped storage plants (PSP), battery energy storage systems (BESS), and digital smart grids.',
      actions: [
        'Phase down unabated coal generation capacity with planned retirement dates.',
        'Accelerate 160 GWh daily energy storage deployment for night-time dispatch.',
        'Modernize inter-regional Green Energy Corridors to wheel power seamlessly from western states.'
      ]
    },
    {
      id: 'industry',
      title: 'Heavy Industry & Primary Steel',
      icon: Factory,
      share: '24% of Hard-To-Abate GHG',
      target: 'Green H2 Cost Parity by 2035',
      keyLever: 'industrialEff',
      color: 'text-coral bg-coral/10 border-coral/30',
      description: 'India is projected to double its crude steel output. Decarbonizing heavy industry without slowing industrial growth necessitates scaling green hydrogen for Direct Reduced Iron (DRI) alongside carbon capture, utilization, and storage (CCUS).',
      actions: [
        'Mandate green hydrogen procurement quotas for primary blast furnace operators.',
        'Subsidize pilot kilns for zero-clinker and low-carbon composite cement (LC3).',
        'Establish national scrap steel recycling collection hubs to foster scrap-EAF production.'
      ]
    },
    {
      id: 'mobility',
      title: 'Clean Mobility & Freight Rail',
      icon: Car,
      share: 'Fastest-Growing Sector 14%',
      target: '60% Freight on Electrified Rail',
      keyLever: 'evAdoption',
      color: 'text-teal bg-teal/10 border-teal/30',
      description: 'Transport emissions can be dramatically curbed through a twin approach: rapid electrification of urban light vehicles and shifting heavy commercial freight from diesel trucking onto dedicated electric railway freight corridors.',
      actions: [
        'Complete 100% railway electrification across core freight trunk lines.',
        'Expand public charging infrastructure with megawatt charging system (MCS) highways.',
        'Deploy commercial hydrogen fuel cell and long-range battery electric heavy trucks.'
      ]
    },
    {
      id: 'nature',
      title: 'Natural Sinks & Agroforestry',
      icon: Trees,
      share: '2.5 to 3.0 Gt CO2 Sink Target',
      target: '33% Forest Canopy Cover',
      keyLever: 'afforestation',
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30',
      description: 'Expanding natural terrestrial sinks serves as the ultimate hedge for residual emissions. Precision agroforestry, coastal mangrove restoration, and soil carbon preservation simultaneously secure rural livelihoods and enhance biodiversity.',
      actions: [
        'Incentivize commercial farmers to plant high-density timber and fruit tree boundaries.',
        'Protect degraded natural wetlands and coastal mangroves with community carbon credit revenue sharing.',
        'Implement regenerative agriculture protocols to augment soil organic carbon content.'
      ]
    },
    {
      id: 'hydrogen',
      title: 'Green Hydrogen & Clean Derivatives',
      icon: Layers,
      share: 'Cross-Sector Energy Vector',
      target: '5 MMT Annual Production by 2030',
      keyLever: 'greenH2',
      color: 'text-indigo-400 bg-indigo-400/10 border-indigo-400/30',
      description: 'Under the National Green Hydrogen Mission, renewable electricity is converted via electrolyzers into zero-emission fuels, replacing gray hydrogen in fertilizer manufacturing, refineries, and clean maritime shipping.',
      actions: [
        'Scale domestic electrolyzer manufacturing capacity under PLI scheme incentives.',
        'Establish dedicated green ammonia export terminals along western and eastern ports.',
        'Provide viability gap funding for heavy industrial hydrogen pipeline networks.'
      ]
    },
    {
      id: 'circular',
      title: 'Smart Circular Economy & Waste',
      icon: Cpu,
      share: 'Urban & Industrial Efficiency',
      target: '35% Primary Material Replacement',
      keyLever: 'gridModernization',
      color: 'text-pink-400 bg-pink-400/10 border-pink-400/30',
      description: 'Maximizing secondary material recycling and waste-to-energy reduces upstream processing emissions, minimizes landfill methane, and accelerates regional industrial symbiosis.',
      actions: [
        'Enforce strict extended producer responsibility (EPR) recycling quotas.',
        'Scale municipal compressed bio-gas (CBG) plants under the SATAT initiative.',
        'Deploy AI-optimized demand response systems across industrial microgrids.'
      ]
    }
  ];

  const sectorFaqs = [
    {
      q: "How are sectoral emissions shares computed?",
      a: "Shares are normalized against India's national greenhouse gas inventory submitted to the UNFCCC, calibrated with annual CEA and MoEFCC reports."
    },
    {
      q: "Can users adjust sectoral levers simultaneously in the simulation?",
      a: "Sector controls currently share a synthetic client-side score. A physically coupled backend has not yet been integrated."
    }
  ];

  return (
    <div className={`w-full min-h-screen transition-colors duration-500 pb-0 ${
      isLight ? 'bg-[#FFFFFF] text-[#0F172A]' : 'bg-[#080808] text-white'
    }`}>
      
      {/* ── SECTION 1: CINEMATIC HERO SECTION WITH VIDEO BACKGROUND ── */}
      <section className="relative w-full min-h-[580px] lg:min-h-[640px] flex flex-col justify-end pt-36 pb-20 px-[3vw] overflow-hidden select-none border-b border-white/10 bg-[#050B14] text-white">
        
        {/* Background Video Layer */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-45 scale-105"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/60 to-black/80 pointer-events-none z-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.7)_100%)] pointer-events-none z-10"></div>

        <div className="relative z-20 w-full max-w-[1720px] mx-auto">
          <RevealOnScroll direction="up" delay={60}>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div className="max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-xl glass-capsule border border-white/20">
                  <BarChart3 className="w-3.5 h-3.5 text-teal-light" />
                  <span className="text-[11px] font-mono font-bold tracking-widest text-teal-light uppercase">
                    Sectoral Transformation Matrix
                  </span>
                </div>
                <h1 className="font-manrope text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                  Six Decarbonization Frontlines
                </h1>
                <p className="text-base sm:text-lg leading-relaxed max-w-2xl font-normal text-white/85">
                  Explore granular techno-economic levers, sectoral emissions profiles, and actionable abatement strategies across the Indian economy.
                </p>
              </div>

              {/* Sector Quick Counter Stats */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="glass-panel p-5 rounded-2xl border border-white/15 text-right min-w-[170px]">
                  <span className="text-[10px] font-mono uppercase text-teal-light font-bold block mb-1">Frontlines In Scope</span>
                  <span className="text-2xl font-mono font-bold text-teal-light">6 Sectors</span>
                </div>
                <div className="glass-panel p-5 rounded-2xl border border-white/15 text-right min-w-[170px]">
                  <span className="text-[10px] font-mono uppercase text-white/60 font-bold block mb-1">Scope Coverage</span>
                  <span className="text-2xl font-mono font-bold text-coral">100% GHG</span>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── SECTION 2: SECTORS GRID SECTION ── */}
      <section className="w-full max-w-[1720px] mx-auto px-[3vw] py-14 space-y-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 2xl:gap-8">
          {sectors.map((sec, i) => {
            const Icon = sec.icon;
            const currentVal = levers[sec.keyLever] || 0;
            const isSelected = selectedSectorId === sec.id;

            return (
              <RevealOnScroll key={sec.id} direction="up" delay={100 + i * 60}>
                <div
                  onClick={() => {
                    setSelectedSectorId(sec.id);
                    playSound(480 + i * 30);
                  }}
                  className={`p-7 rounded-xl border transition-all duration-300 flex flex-col justify-between h-full cursor-pointer group hover:-translate-y-1 ${
                    isSelected
                      ? isLight 
                        ? 'bg-[#F8FAFC] border-teal ring-2 ring-teal/20 shadow-xl' 
                        : 'bg-[#141A26] border-teal ring-2 ring-teal/30 shadow-2xl'
                      : isLight
                        ? 'bg-white border-[#E2E8F0] hover:border-teal/50'
                        : 'bg-[#101520] border-[#1D2636] hover:border-teal/30'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-xl ${sec.color} border transition-transform group-hover:scale-110`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-md ${
                        isLight ? 'bg-[#F1F5F9] text-[#334155]' : 'bg-[#18202E] text-white/70'
                      }`}>
                        {sec.share}
                      </span>
                    </div>

                    <div>
                      <h3 className={`font-manrope font-extrabold text-xl transition-colors ${
                        isSelected ? 'text-teal' : isLight ? 'text-[#0F172A]' : 'text-white'
                      }`}>
                        {sec.title}
                      </h3>
                      <p className={`text-xs sm:text-sm mt-2 leading-relaxed ${
                        isLight ? 'text-[#64748B]' : 'text-[#94A3B8]'
                      }`}>
                        {sec.description}
                      </p>
                    </div>

                    {/* Sector Key Actions */}
                    <div className={`pt-4 border-t space-y-2.5 ${
                      isLight ? 'border-[#E2E8F0]' : 'border-[#1D2636]'
                    }`}>
                      {sec.actions.map((act, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs font-manrope">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal shrink-0 mt-0.5" />
                          <span className={isLight ? 'text-[#334155]' : 'text-white/80'}>{act}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={`pt-5 mt-6 border-t space-y-2.5 ${
                    isLight ? 'border-[#E2E8F0]' : 'border-[#1D2636]'
                  }`}>
                    <div className="flex justify-between text-xs font-mono">
                      <span className={isLight ? 'text-[#64748B]' : 'text-white/50'}>Policy Lever</span>
                      <span className="font-bold text-teal">{currentVal}%</span>
                    </div>
                    <div className={`h-1.5 w-full rounded-full overflow-hidden ${
                      isLight ? 'bg-[#E2E8F0]' : 'bg-[#1E2738]'
                    }`}>
                      <div
                        className="h-full bg-teal transition-all duration-500 rounded-full"
                        style={{ width: `${currentVal}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center pt-1 text-[11px] font-mono">
                      <span className={isLight ? 'text-[#94A3B8]' : 'text-white/40'}>Target: {sec.target}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateLever(sec.keyLever, Math.min(100, currentVal + 10));
                          playSound(580);
                          if (!ecoMode) {
                            confetti({ particleCount: 25, spread: 50 });
                          }
                        }}
                        className="text-teal font-bold hover:underline cursor-pointer"
                      >
                        +10% Boost
                      </button>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </section>

      {/* ── SECTION 3: FAQS SECTION ── */}
      <FAQSection 
        title="Sectoral Transformation FAQs"
        subtitle="Addressing modeling assumptions, sectoral coupling, and technology readiness levels"
        faqs={sectorFaqs}
      />

      {/* ── SECTION 4: PRE-FOOTER BANNER ── */}
      <PreFooterBanner 
        tag="INTERACTIVE SIMULATION"
        title="Test National Levers Across All Six Sectors"
        subtitle="Simulate 8,760h unit commitment, industrial green hydrogen conversion, and agroforestry carbon sinks."
        primaryCtaText="Launch Decarbonization Sandbox"
        primaryCtaLink="/simulator"
        secondaryCtaText="Explore Case Studies"
        secondaryCtaLink="/case-studies"
      />

    </div>
  );
};
