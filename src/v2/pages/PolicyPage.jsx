import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowUpRight, 
  CheckCircle2, 
  Shield, 
  Landmark, 
  FileText, 
  Scale, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Award,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { RevealOnScroll } from '../components/RevealOnScroll';
import { FAQSection } from '../components/FAQSection';
import { PreFooterBanner } from '../components/PreFooterBanner';

export const PolicyPage = () => {
  const { playSound, theme } = useGame();
  const isLight = theme === 'light';

  const pillars = [
    {
      id: '01',
      title: 'Capital Mobilization & Macroeconomic Transition',
      stat: '$10.1 Trillion',
      sub: 'Cumulative Clean Capex Required (2025–2070)',
      summary: 'Bridging the capital gap demands blending domestic banking reforms with multilateral concessional de-risking mechanisms.',
      icon: DollarSign,
      points: [
        'Establish Sovereign Green Credit Guarantee funds to lower borrowing costs for sub-100MW decentralized solar.',
        'Harmonize India Green Taxonomy with European and ASEAN sustainable finance standards to unlock cross-border capital.',
        'Mandate priority sector lending (PSL) quotas specifically earmarked for energy storage and electric bus fleet financing.'
      ]
    },
    {
      id: '02',
      title: 'Just Transition & Regional Energy Livelihoods',
      stat: '3.6 Million Workers',
      sub: 'Direct and indirect coal-dependent workforce across 54 districts',
      summary: 'Phasing down fossil fuels without socio-economic protection will inflict severe regional economic distress in eastern mining districts.',
      icon: Users,
      points: [
        'Seed dedicated District Mineral Just Transition Trust Funds with royalty revenues from remaining operating mines.',
        'Fund community-owned renewable energy cooperatives across abandoned open-cast mine sites in Jharkhand and Odisha.',
        'Institute comprehensive pension guarantees and certified re-skilling programs in electrical and hydrogen infrastructure.'
      ]
    },
    {
      id: '03',
      title: 'Critical Mineral Security & Circularity Standards',
      stat: '5.2x Demand Surge',
      sub: 'Lithium, Cobalt, Nickel, and Rare Earth Elements by 2040',
      summary: 'Clean technology manufacturing sovereignty hinges on secure, diversified mineral processing and recycling supply chains.',
      icon: Scale,
      points: [
        'Secure sovereign equity stakes in South American lithium and African copper processing ventures via KABIL.',
        'Pass strict Extended Producer Responsibility (EPR) laws mandating 95% battery-grade cobalt and nickel recycling by 2030.',
        'Accelerate domestic geological surveys in Jammu & Kashmir, Rajasthan, and Karnataka with transparent mining concession leases.'
      ]
    },
    {
      id: '04',
      title: 'Grid Architecture & Dispatchable Storage Capacity',
      stat: '160 GWh Storage',
      sub: 'Night-time firm clean capacity needed by 2035',
      summary: 'Integrating 500 GW of variable solar and wind requires round-the-clock storage and inter-regional transmission corridors.',
      icon: TrendingUp,
      points: [
        'Fast-track environmental clearances and Viability Gap Funding (VGF) for off-river closed-loop pumped storage plants.',
        'Standardize capacity market contracts to compensate battery providers for frequency regulation and reactive power support.',
        'Complete the Green Energy Corridor Phase-II linking high-wind Gujarat and Tamil Nadu coasts to northern industrial clusters.'
      ]
    }
  ];

  const policyFaqs = [
    {
      q: "How does the policy framework interface with the national budget?",
      a: "The framework recommends allocations for Viability Gap Funding (VGF) in battery storage and capital subsidies for green hydrogen electrolyzers."
    },
    {
      q: "What role does the India Green Taxonomy play in international capital flows?",
      a: "Harmonizing taxonomy definitions with EU standards unlocks lower-cost cross-border green bonds and sovereign climate debt issuance."
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
          <source src="/hero-video (1).mp4" type="video/mp4" />
        </video>

        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/60 to-black/80 pointer-events-none z-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.7)_100%)] pointer-events-none z-10"></div>

        <div className="relative z-20 w-full max-w-[1720px] mx-auto">
          <RevealOnScroll direction="up" delay={60}>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div className="max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-xl glass-capsule border border-white/20">
                  <Landmark className="w-3.5 h-3.5 text-teal-light" />
                  <span className="text-[11px] font-mono font-bold tracking-widest text-teal-light uppercase">
                    Institutional Policy Architecture
                  </span>
                </div>
                <h1 className="font-manrope text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                  Decarbonization Policy Framework
                </h1>
                <p className="text-base sm:text-lg leading-relaxed max-w-2xl font-normal text-white/85">
                  Actionable policy blueprints harmonizing green industrial growth, fiscal incentives, just transition safety nets, and grid regulatory reforms.
                </p>
              </div>

              {/* Policy Header Quick Badges */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="glass-panel p-5 rounded-2xl border border-white/15 text-right min-w-[170px]">
                  <span className="text-[10px] font-mono uppercase text-teal-light font-bold block mb-1">Pillars Codified</span>
                  <span className="text-2xl font-mono font-bold text-teal-light">4 Core</span>
                </div>
                <div className="glass-panel p-5 rounded-2xl border border-white/15 text-right min-w-[170px]">
                  <span className="text-[10px] font-mono uppercase text-white/60 font-bold block mb-1">Capex Required</span>
                  <span className="text-2xl font-mono font-bold text-coral">$10.1T</span>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── SECTION 2: POLICY PILLARS SECTION ── */}
      <section className="w-full max-w-[1720px] mx-auto px-[3vw] py-14 space-y-12">
        <div className="grid md:grid-cols-2 gap-8">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <RevealOnScroll key={pillar.id} direction="up" delay={100 + i * 80}>
                <div 
                  className={`p-8 sm:p-10 rounded-xl border transition-all duration-300 flex flex-col justify-between h-full ${
                    isLight 
                      ? 'bg-white border-[#E2E8F0] shadow-sm hover:border-teal hover:shadow-xl' 
                      : 'bg-[#101520] border-[#1D2636] shadow-md hover:border-teal hover:bg-[#141A26] hover:shadow-2xl'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-teal/10 text-teal border border-teal/20 flex items-center justify-center font-bold">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="font-mono text-xs font-bold text-teal uppercase tracking-wider">
                          PILLAR {pillar.id}
                        </span>
                      </div>
                      <span className={`text-xs font-mono font-bold px-3 py-1 rounded-lg ${
                        isLight ? 'bg-teal-50 text-teal-800 border border-teal-200' : 'bg-teal/15 text-teal border border-teal/30'
                      }`}>
                        {pillar.stat}
                      </span>
                    </div>

                    <h2 className={`font-manrope font-extrabold text-2xl tracking-tight ${
                      isLight ? 'text-[#0F172A]' : 'text-white'
                    }`}>
                      {pillar.title}
                    </h2>

                    <p className={`text-xs font-mono ${
                      isLight ? 'text-teal-700 font-semibold' : 'text-teal-400'
                    }`}>
                      {pillar.sub}
                    </p>

                    <p className={`text-xs sm:text-sm leading-relaxed ${
                      isLight ? 'text-[#475569]' : 'text-[#94A3B8]'
                    }`}>
                      {pillar.summary}
                    </p>

                    <div className={`pt-4 border-t space-y-3 ${
                      isLight ? 'border-[#E2E8F0]' : 'border-[#1D2636]'
                    }`}>
                      {pillar.points.map((pt, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-[13.5px] font-manrope">
                          <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                          <span className={isLight ? 'text-[#334155]' : 'text-white/85'}>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={`pt-6 mt-6 border-t flex items-center justify-between ${
                    isLight ? 'border-[#E2E8F0]' : 'border-[#1D2636]'
                  }`}>
                    <span className={`text-xs font-mono ${isLight ? 'text-[#64748B]' : 'text-white/40'}`}>
                      Audited by Pathways Secretariat
                    </span>
                    <Link
                      to="/publications"
                      onClick={() => playSound(520)}
                      className="text-xs font-manrope font-bold text-teal hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Read Policy Brief</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </section>

      {/* ── SECTION 3: FAQS SECTION ── */}
      <FAQSection 
        title="Policy & Regulation FAQs"
        subtitle="Addressing priority sector lending, cross-border carbon taxonomies, and storage mandates"
        faqs={policyFaqs}
      />

      {/* ── SECTION 4: PRE-FOOTER BANNER ── */}
      <PreFooterBanner 
        tag="STATUTORY FRAMEWORK"
        title="Harmonize Corporate Strategy with National Policy"
        subtitle="Simulate policy boosts across 6 key economic sectors on the interactive decarbonization sandbox."
        primaryCtaText="Launch Decarbonization Sandbox"
        primaryCtaLink="/simulator"
        secondaryCtaText="Explore Research Portal"
        secondaryCtaLink="/research"
      />

    </div>
  );
};
