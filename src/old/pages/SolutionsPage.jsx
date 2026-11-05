import React, { useState } from 'react';
import { 
  Zap, 
  Cpu, 
  Flame, 
  Layers, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  TrendingDown, 
  BarChart3, 
  Building2, 
  Atom, 
  Compass, 
  Database,
  ArrowUpRight,
  Sun,
  Activity,
  Trees,
  Scale,
  DollarSign,
  Lock,
  Workflow,
  Radio,
  FileCheck2
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { RevealOnScroll } from '../components/RevealOnScroll';
import { FAQSection } from '../components/FAQSection';
import { PreFooterBanner } from '../components/PreFooterBanner';
import { Link } from 'react-router-dom';

export const SolutionsPage = () => {
  const { playSound, theme } = useGame();
  const isLight = theme === 'light';

  const solutionsFaqs = [
    {
      q: "How does the 8,760h grid optimization account for interstate transmission bottlenecks?",
      a: "Our dispatch engine integrates inter-regional transfer capabilities (TTC) and available transfer capability (ATC) constraints across India's National Grid, factoring in transmission congestion on the Green Energy Corridors between western generation clusters and northern industrial load centers."
    },
    {
      q: "What is the expected timeline for Green Hydrogen DRI cost parity with coking coal?",
      a: "Under our base-case modeling, green hydrogen achieves parity with domestic thermal coal and imported coking coal ($1.10–$1.50/kg H2) by 2032–2035, driven by electrolyzer capital cost declines ($250/kW) and dedicated RTC renewable PPAs."
    },
    {
      q: "How does LC3 cement compare in structural performance to Ordinary Portland Cement (OPC)?",
      a: "Limestone Calcined Clay Cement (LC3) achieves 14% higher 28-day compressive strength, superior chloride resistance for coastal infrastructure, and 40% lower specific net carbon emissions compared to OPC 53 grade."
    },
    {
      q: "Is the SEBI BRSR Core reporting engine updated for 2026 ESG assurance mandates?",
      a: "Yes. The assurance engine produces immutable, cryptographic audit trails aligned with SEBI's updated BRSR Core nine ESG attributes, including Scope 1, Scope 2, and supply-chain Scope 3 carbon footprinting."
    }
  ];

  return (
    <div className={`w-full min-h-screen transition-colors duration-500 pb-0 ${
      isLight ? 'bg-[#FFFFFF] text-[#0F172A]' : 'bg-[#080808] text-white'
    }`}>
      
      {/* ── SECTION 1: CINEMATIC HERO HEADER (CENTER ALIGNED) ── */}
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

        <div className="relative z-20 w-full max-w-[1280px] mx-auto text-center space-y-6">
          <RevealOnScroll direction="up" delay={60}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-xl glass-capsule border border-white/20 mx-auto">
              <Atom className="w-3.5 h-3.5 text-teal-light" />
              <span className="text-[11px] font-mono font-bold tracking-widest text-teal-light uppercase">
                Engineered Decarbonization Solutions
              </span>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={80}>
            <h1 className="font-manrope text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight max-w-4xl mx-auto">
              Proven Technological Pathways
            </h1>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={100}>
            <p className="text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal text-white/85">
              Industrial-grade modeling architectures, dispatch optimization engines, and regulatory compliance tools engineered to solve India’s deepest transition challenges.
            </p>
          </RevealOnScroll>

          {/* Status Glass HUD (Center Aligned) */}
          <RevealOnScroll direction="up" delay={120}>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <div className="glass-panel px-6 py-4 rounded-2xl border border-white/15 text-center min-w-[170px]">
                <span className="text-[10px] font-mono uppercase text-teal-light font-bold block mb-0.5">Solutions Deployed</span>
                <span className="text-2xl font-mono font-bold text-teal-light">6 Platforms</span>
              </div>
              <div className="glass-panel px-6 py-4 rounded-2xl border border-white/15 text-center min-w-[170px]">
                <span className="text-[10px] font-mono uppercase text-white/60 font-bold block mb-0.5">Abatement Potential</span>
                <span className="text-2xl font-mono font-bold text-coral">1.8 Gt CO2e</span>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── SECTION 2: END-TO-END DECARBONIZATION ECOSYSTEM (CENTER ALIGNED) ── */}
      <section className="w-full max-w-[1720px] mx-auto px-[3vw] py-20 border-b border-black/10 dark:border-white/10 space-y-12">
        <RevealOnScroll direction="up" delay={80}>
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-teal">
              SYSTEM-LEVEL INTEGRATION
            </span>
            <h2 className={`font-manrope text-3xl sm:text-4xl font-extrabold tracking-tight ${
              isLight ? 'text-[#0F172A]' : 'text-white'
            }`}>
              From Raw Physics to Capital Allocation
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed ${isLight ? 'text-[#64748B]' : 'text-[#94A3B8]'}`}>
              Our solutions operate across three interconnected tiers: atomic techno-economic modeling, sub-regional grid simulations, and institutional finance packaging.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: '01',
              title: 'Sub-Hourly Physical Dispatch',
              desc: 'High-resolution modeling of spinning reserves, reactive power, battery cycling degradation, and hydro discharge curves.',
              icon: Zap
            },
            {
              step: '02',
              title: 'Heavy Industrial Process Chemistry',
              desc: 'Electro-chemical calcination, direct reduced iron thermal kinetics, and levelized green hydrogen optimization.',
              icon: Flame
            },
            {
              step: '03',
              title: 'Statutory Capital & ESG Assurance',
              desc: 'Automated synthesis of SEBI BRSR Core audit files, CDP disclosures, and green bond verifiable taxonomies.',
              icon: ShieldCheck
            }
          ].map((tier, i) => {
            const TierIcon = tier.icon;
            return (
              <RevealOnScroll key={tier.step} direction="up" delay={100 + i * 80}>
                <div className={`p-8 rounded-xl border h-full flex flex-col justify-between text-center items-center ${
                  isLight ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-[#10141C] border-[#1C2534]'
                }`}>
                  <div className="space-y-4 flex flex-col items-center">
                    <div className="flex items-center justify-between w-full">
                      <span className="font-mono text-2xl font-bold text-teal">{tier.step}</span>
                      <TierIcon className="w-5 h-5 text-teal" />
                    </div>
                    <h3 className={`font-manrope font-extrabold text-xl ${isLight ? 'text-[#0F172A]' : 'text-white'}`}>
                      {tier.title}
                    </h3>
                    <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-[#64748B]' : 'text-[#94A3B8]'}`}>
                      {tier.desc}
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </section>

      {/* ── SECTION 3: 8,760h GRID DISPATCH & STORAGE ENGINE (CENTER ALIGNED) ── */}
      <section className="w-full max-w-[1720px] mx-auto px-[3vw] py-20 border-b border-black/10 dark:border-white/10 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-teal/10 border border-teal/30 mx-auto">
            <Zap className="w-3.5 h-3.5 text-teal" />
            <span className="text-[10px] font-mono font-bold tracking-widest text-teal uppercase">
              SOLUTION 01 • POWER & GRID
            </span>
          </div>
          <h2 className={`font-manrope text-3xl sm:text-4xl font-extrabold tracking-tight ${
            isLight ? 'text-[#0F172A]' : 'text-white'
          }`}>
            8,760h Hourly Dispatch & Storage Co-Optimization
          </h2>
          <p className={`text-sm sm:text-base leading-relaxed ${isLight ? 'text-[#475569]' : 'text-[#94A3B8]'}`}>
            Simulates round-the-clock power dispatch across India’s 5 synchronous grids, solving extreme seasonal contingencies such as the July monsoon wind surge and December solar dips.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
          <div className="space-y-4">
            <div className={`p-5 rounded-xl border text-center ${isLight ? 'bg-white border-[#E2E8F0]' : 'bg-[#121824] border-[#1F293D]'}`}>
              <span className="text-xs font-mono text-teal font-bold block mb-1">PSP + BESS Sizing</span>
              <span className={`text-xs ${isLight ? 'text-[#64748B]' : 'text-white/70'}`}>
                Determines lowest LCOS between 6h pumped storage and 4h lithium iron phosphate batteries.
              </span>
            </div>
            <div className={`p-5 rounded-xl border text-center ${isLight ? 'bg-white border-[#E2E8F0]' : 'bg-[#121824] border-[#1F293D]'}`}>
              <span className="text-xs font-mono text-teal font-bold block mb-1">Transmission Wheeling</span>
              <span className={`text-xs ${isLight ? 'text-[#64748B]' : 'text-white/70'}`}>
                Models inter-regional congestion along the Green Energy Corridor to avoid renewable curtailment.
              </span>
            </div>
          </div>

          <div className={`p-8 rounded-xl border space-y-6 ${
            isLight ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-[#11151F] border-[#1E2738]'
          }`}>
            <span className="text-xs font-mono font-bold uppercase text-teal block text-center">Technical Performance Metrics</span>
            <div className="space-y-4 font-mono text-xs">
              <div className="flex justify-between border-b pb-2 dark:border-white/10">
                <span className="opacity-70">Grid Frequency Stability Range</span>
                <span className="font-bold text-teal">49.90 Hz – 50.05 Hz</span>
              </div>
              <div className="flex justify-between border-b pb-2 dark:border-white/10">
                <span className="opacity-70">Curtailment Rate Under 500 GW</span>
                <span className="font-bold text-emerald-500">&lt; 1.8% of Gross TWh</span>
              </div>
              <div className="flex justify-between border-b pb-2 dark:border-white/10">
                <span className="opacity-70">Avoided Baseload Coal Emissions</span>
                <span className="font-bold text-coral">480 Mt CO2e / Year</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-70">Model Solvers</span>
                <span className="font-bold text-teal">Gurobi / PyPSA Integrated</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: HARD-TO-ABATE INDUSTRIAL HYDROGEN & LC3 (CENTER ALIGNED) ── */}
      <section className="w-full max-w-[1720px] mx-auto px-[3vw] py-20 border-b border-black/10 dark:border-white/10 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-teal/10 border border-teal/30 mx-auto">
            <Flame className="w-3.5 h-3.5 text-coral" />
            <span className="text-[10px] font-mono font-bold tracking-widest text-coral uppercase">
              SOLUTION 02 • HEAVY INDUSTRY
            </span>
          </div>
          <h2 className={`font-manrope text-3xl sm:text-4xl font-extrabold tracking-tight ${
            isLight ? 'text-[#0F172A]' : 'text-white'
          }`}>
            Zero-Carbon Primary Steelmaking & Mineral Processing
          </h2>
          <p className={`text-sm sm:text-base leading-relaxed ${isLight ? 'text-[#475569]' : 'text-[#94A3B8]'}`}>
            Heavy industry contributes 24% of India’s emissions. Our techno-economic models evaluate electrolyzer scaling, captive renewable PPAs, and circular scrap blending to achieve cost parity.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className={`p-8 rounded-xl border space-y-6 ${
            isLight ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-[#11151F] border-[#1E2738]'
          }`}>
            <span className="text-xs font-mono font-bold uppercase text-teal block text-center">Process Chemistry Blueprint</span>
            <div className="grid md:grid-cols-3 gap-4 text-xs leading-relaxed text-center">
              <div className="p-4 rounded-lg bg-black/5 dark:bg-white/5 space-y-2">
                <span className="font-bold block text-teal">Hydrogen DRI Shafts</span>
                <p className={isLight ? 'text-[#475569]' : 'text-[#94A3B8]'}>Replaces coking coal reductant with 100% green H2, dropping steel carbon intensity from 2.1 t to 0.4 t CO2/t.</p>
              </div>
              <div className="p-4 rounded-lg bg-black/5 dark:bg-white/5 space-y-2">
                <span className="font-bold block text-teal">LC3 Clinker Replacement</span>
                <p className={isLight ? 'text-[#475569]' : 'text-[#94A3B8]'}>Blends calcined clay and raw limestone to displace 50% clinker, lowering kiln calcination temperatures by 300°C.</p>
              </div>
              <div className="p-4 rounded-lg bg-black/5 dark:bg-white/5 space-y-2">
                <span className="font-bold block text-teal">Electrochemical Calcination</span>
                <p className={isLight ? 'text-[#475569]' : 'text-[#94A3B8]'}>Zero-emission chemical calcium carbonate decomposition running on dedicated clean electricity.</p>
              </div>
            </div>
            <div className="text-center pt-2">
              <Link
                to="/simulator"
                onClick={() => playSound(520)}
                className="inline-flex items-center gap-2 text-xs font-mono font-bold text-teal hover:underline cursor-pointer"
              >
                <span>Run Industrial Abatement Simulation →</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: MEGAWATT HIGHWAY CHARGING (CENTER ALIGNED) ── */}
      <section className="w-full max-w-[1720px] mx-auto px-[3vw] py-20 border-b border-black/10 dark:border-white/10 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-teal/10 border border-teal/30 mx-auto">
            <Layers className="w-3.5 h-3.5 text-teal" />
            <span className="text-[10px] font-mono font-bold tracking-widest text-teal uppercase">
              SOLUTION 03 • FREIGHT & MOBILITY
            </span>
          </div>
          <h2 className={`font-manrope text-3xl sm:text-4xl font-extrabold tracking-tight ${
            isLight ? 'text-[#0F172A]' : 'text-white'
          }`}>
            1.2 MW MCS Highway Corridors & Rail Modal Shift
          </h2>
          <p className={`text-sm sm:text-base leading-relaxed ${isLight ? 'text-[#475569]' : 'text-[#94A3B8]'}`}>
            Electrifying long-haul trucking requires coordinated megawatt charging infrastructure along interstate trunks (NH44, NH48) and migrating containerized freight onto the 100% electrified Dedicated Freight Corridors (DFC).
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className={`p-8 rounded-xl border space-y-6 ${
            isLight ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-[#11151F] border-[#1E2738]'
          }`}>
            <span className="text-xs font-mono font-bold uppercase text-teal block text-center">Logistics Carbon Intensity Benchmarks</span>
            <div className="grid md:grid-cols-3 gap-4 text-center font-mono">
              <div className="p-4 rounded-lg bg-black/5 dark:bg-white/5">
                <span className="text-[10px] block opacity-60">DIESEL HEAVY TRUCKING</span>
                <span className="text-xl font-bold text-coral">112 g CO2 / ton-km</span>
              </div>
              <div className="p-4 rounded-lg bg-black/5 dark:bg-white/5">
                <span className="text-[10px] block opacity-60">MCS BATTERY ELECTRIC</span>
                <span className="text-xl font-bold text-teal">24 g CO2 / ton-km</span>
              </div>
              <div className="p-4 rounded-lg bg-black/5 dark:bg-white/5">
                <span className="text-[10px] block opacity-60">DFC ELECTRIC RAIL</span>
                <span className="text-xl font-bold text-emerald-500">8.5 g CO2 / ton-km</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: SEBI BRSR CORE ASSURANCE ENGINE (CENTER ALIGNED) ── */}
      <section className="w-full max-w-[1720px] mx-auto px-[3vw] py-20 border-b border-black/10 dark:border-white/10 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-teal/10 border border-teal/30 mx-auto">
            <ShieldCheck className="w-3.5 h-3.5 text-teal" />
            <span className="text-[10px] font-mono font-bold tracking-widest text-teal uppercase">
              SOLUTION 04 • ESG & REGULATORY ASSURANCE
            </span>
          </div>
          <h2 className={`font-manrope text-3xl sm:text-4xl font-extrabold tracking-tight ${
            isLight ? 'text-[#0F172A]' : 'text-white'
          }`}>
            Autonomous Statutory Scope 1, 2 & 3 Verification
          </h2>
          <p className={`text-sm sm:text-base leading-relaxed ${isLight ? 'text-[#475569]' : 'text-[#94A3B8]'}`}>
            Eliminate greenwashing risks and manual reporting bottlenecks. Our platform generates audit-ready disclosure dossiers for India’s top 1,000 listed entities with mathematical provenance.
          </p>
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <div className={`p-8 rounded-xl border space-y-5 ${
            isLight ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-[#11151F] border-[#1E2738]'
          }`}>
            <p className={`text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto ${isLight ? 'text-[#475569]' : 'text-[#94A3B8]'}`}>
              Continuous data pipelines pull directly from enterprise ERPs and utility smart meters, stamping each invoice with an immutable cryptographic hash linked to CEA emission factor registers.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <span className="px-3.5 py-1 rounded-lg bg-teal/10 text-teal font-mono text-xs font-bold border border-teal/20">
                ISO 14064 Compliant
              </span>
              <span className="px-3.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 font-mono text-xs font-bold border border-emerald-500/20">
                SEBI Core Certified
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 7: SOCIOECONOMIC JUST TRANSITION MATRIX (CENTER ALIGNED) ── */}
      <section className="w-full max-w-[1720px] mx-auto px-[3vw] py-20 border-b border-black/10 dark:border-white/10 space-y-12">
        <RevealOnScroll direction="up" delay={80}>
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-teal">
              SOLUTION 05 • LIVELIHOODS & EQUITY
            </span>
            <h2 className={`font-manrope text-3xl sm:text-4xl font-extrabold tracking-tight ${
              isLight ? 'text-[#0F172A]' : 'text-white'
            }`}>
              Just Transition Modeling for 54 Coal Districts
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed ${isLight ? 'text-[#64748B]' : 'text-[#94A3B8]'}`}>
              Over 3.6 million Indian workers depend directly and indirectly on fossil mining. Our models quantify royalty substitution, mine-site solar parks, and re-skilling programs in Jharkhand, Odisha, and Chhattisgarh.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid sm:grid-cols-3 gap-6 text-center">
          <div className={`p-6 rounded-xl border ${isLight ? 'bg-white border-[#E2E8F0]' : 'bg-[#121824] border-[#1F293D]'}`}>
            <span className="text-2xl font-mono font-bold text-coral block mb-1">54 Districts</span>
            <span className="text-xs font-manrope font-bold block mb-1">Granular Socioeconomic Mapping</span>
            <p className={`text-xs ${isLight ? 'text-[#64748B]' : 'text-[#94A3B8]'}`}>
              Maps district mineral foundation (DMF) revenue shifts and municipal fiscal dependency.
            </p>
          </div>
          <div className={`p-6 rounded-xl border ${isLight ? 'bg-white border-[#E2E8F0]' : 'bg-[#121824] border-[#1F293D]'}`}>
            <span className="text-2xl font-mono font-bold text-teal block mb-1">4.2x Jobs Multiplier</span>
            <span className="text-xs font-manrope font-bold block mb-1">Clean Energy Manufacturing</span>
            <p className={`text-xs ${isLight ? 'text-[#64748B]' : 'text-[#94A3B8]'}`}>
              Electrolyzer assembly, battery recycling, and solar balance-of-plant job creation models.
            </p>
          </div>
          <div className={`p-6 rounded-xl border ${isLight ? 'bg-white border-[#E2E8F0]' : 'bg-[#121824] border-[#1F293D]'}`}>
            <span className="text-2xl font-mono font-bold text-emerald-500 block mb-1">100% Redevelopment</span>
            <span className="text-xs font-manrope font-bold block mb-1">Mine-Site Solar & Biochar</span>
            <p className={`text-xs ${isLight ? 'text-[#64748B]' : 'text-[#94A3B8]'}`}>
              Converts degraded overburden dumps into utility-scale solar and soil restoration hubs.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 8: MACC MARGINAL ABATEMENT COST CURVE OPTIMIZER (CENTER ALIGNED) ── */}
      <section className="w-full max-w-[1720px] mx-auto px-[3vw] py-20 border-b border-black/10 dark:border-white/10 space-y-12">
        <RevealOnScroll direction="up" delay={80}>
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-teal">
              SOLUTION 06 • CAPITAL EFFICIENCY
            </span>
            <h2 className={`font-manrope text-3xl sm:text-4xl font-extrabold tracking-tight ${
              isLight ? 'text-[#0F172A]' : 'text-white'
            }`}>
              Marginal Abatement Cost Curve (MACC) Engine
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed ${isLight ? 'text-[#64748B]' : 'text-[#94A3B8]'}`}>
              Ranks hundreds of decarbonization interventions from negative cost (profitable efficiency) to hard-to-abate hydrogen retrofits to optimize national CAPEX allocation.
            </p>
          </div>
        </RevealOnScroll>

        <div className={`p-8 rounded-xl border ${isLight ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-[#10141C] border-[#1C2534]'}`}>
          <div className="grid md:grid-cols-4 gap-6 text-center font-mono">
            <div className="p-4 rounded-lg bg-black/5 dark:bg-white/5">
              <span className="text-[10px] block opacity-60">NEGATIVE COST</span>
              <span className="text-lg font-bold text-emerald-500">-$28 / ton CO2</span>
              <span className="text-[11px] block mt-1 font-manrope">Agricultural Solar Pumps (PM-KUSUM)</span>
            </div>
            <div className="p-4 rounded-lg bg-black/5 dark:bg-white/5">
              <span className="text-[10px] block opacity-60">LOW COST</span>
              <span className="text-lg font-bold text-teal">+$14 / ton CO2</span>
              <span className="text-[11px] block mt-1 font-manrope">Utility Solar + 6h Pumped Storage</span>
            </div>
            <div className="p-4 rounded-lg bg-black/5 dark:bg-white/5">
              <span className="text-[10px] block opacity-60">MEDIUM COST</span>
              <span className="text-lg font-bold text-amber-500">+$48 / ton CO2</span>
              <span className="text-[11px] block mt-1 font-manrope">LC3 Calcined Clay Clinker</span>
            </div>
            <div className="p-4 rounded-lg bg-black/5 dark:bg-white/5">
              <span className="text-[10px] block opacity-60">HARD-TO-ABATE</span>
              <span className="text-lg font-bold text-coral">+$92 / ton CO2</span>
              <span className="text-[11px] block mt-1 font-manrope">100% Green Hydrogen DRI Steel</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 9: FAQS SECTION (CENTER ALIGNED) ── */}
      <FAQSection 
        title="Solutions & Technology FAQs"
        subtitle="Detailed answers regarding unit commitment modeling, hydrogen economics, and SEBI compliance"
        faqs={solutionsFaqs}
      />

      {/* ── SECTION 10: PRE-FOOTER BANNER (CENTER ALIGNED) ── */}
      <PreFooterBanner 
        tag="INTERACTIVE SIMULATION ENGINE"
        title="Simulate India’s Decarbonization Pathways in Real Time"
        subtitle="Test 8,760h hourly unit commitment, adjust policy sliders, and evaluate marginal abatement cost curves on our national model."
        primaryCtaText="Launch Decarbonization Sandbox"
        primaryCtaLink="/simulator"
        secondaryCtaText="Connect with Secretariat"
        secondaryCtaLink="/contact"
      />

    </div>
  );
};
