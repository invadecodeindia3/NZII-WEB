import React from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Building, 
  ShieldCheck, 
  Mail, 
  ArrowRight, 
  ExternalLink, 
  Globe2, 
  Award, 
  Users,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { RevealOnScroll } from '../components/RevealOnScroll';
import { FAQSection } from '../components/FAQSection';
import { PreFooterBanner } from '../components/PreFooterBanner';

export const ConsortiumPage = () => {
  const { playSound, theme, ecoMode } = useGame();
  const isLight = theme === 'light';

  const members = [
    { name: 'Energy Transitions Commission (ETC)', type: 'Global Industrial Decarbonization', focus: 'Hard-to-abate sector pathways, marginal abatement cost curves, and clean power capital financing.' },
    { name: 'Indian Institute of Technology (IIT) Delhi', type: 'Atmospheric & Climate Science', focus: 'Sub-hourly grid unit commitment simulations, regional air quality dispersion, and renewable variability modeling.' },
    { name: 'Council on Energy, Environment and Water (CEEW)', type: 'Policy & Livelihoods', focus: 'Socio-economic district mapping, energy-water nexus analysis, and distributed clean livelihood transitions.' },
    { name: 'NITI Aayog Pathways Secretariat', type: 'Government Decarbonization', focus: 'Federal and state-level policy harmonization, regulatory targets, and sectoral NDC execution matrices.' },
    { name: 'The Energy and Resources Institute (TERI)', type: 'Industrial Energy Efficiency', focus: 'Industrial symbiosis, circular economy models, biogenic waste-to-energy, and agroforestry carbon sinks.' },
    { name: 'Prayas (Energy Group)', type: 'Electricity Market Regulation', focus: 'Power distribution utility (DISCOM) financial viability, time-of-day tariffs, and decentralized solar equity.' },
  ];

  const consortiumFaqs = [
    {
      q: "How can academic institutions join the Research Consortium?",
      a: "Accredited universities and research institutes can apply through the Secretariat by submitting faculty modeling proposals in power systems, industrial decarbonization, or just transition economics."
    },
    {
      q: "Is consortium membership open to international climate think tanks?",
      a: "Yes. International partners providing open modeling benchmarks and climate finance mechanisms participate via specialized working group fellowships."
    }
  ];

  return (
    <div className={`w-full min-h-screen transition-colors duration-500 pb-0 ${
      isLight ? 'bg-[#FFFCF6] text-[#1D3658]' : 'bg-[#1D3658] text-[#FFFCF6]'
    }`}>
      
      {/* ── SECTION 1: CINEMATIC HERO SECTION WITH VIDEO BACKGROUND ── */}
      <section className="relative w-full min-h-[580px] lg:min-h-[640px] flex flex-col justify-end pt-36 pb-20 px-[3vw] overflow-hidden select-none border-b border-white/10 bg-[#14263D] text-white">
        
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
                  <Users className="w-3.5 h-3.5 text-teal-light" />
                  <span className="text-[11px] font-mono font-bold tracking-widest text-teal-light uppercase">
                    Institutional Scientific Alliance
                  </span>
                </div>
                <h1 className="font-manrope text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                  The NetZero India Research Consortium
                </h1>
                <p className="text-base sm:text-lg leading-relaxed max-w-2xl font-normal text-white/85">
                  An open academic and institutional alliance uniting premier universities, macroeconomic think tanks, and policy architects to anchor India&apos;s net-zero transition in rigorous empirical modeling.
                </p>
              </div>

              {/* Consortium Quick Header Counter */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="glass-panel p-5 rounded-2xl border border-white/15 text-right min-w-[170px]">
                  <span className="text-[10px] font-mono uppercase text-teal-light font-bold block mb-1">Consortium Bodies</span>
                  <span className="text-2xl font-mono font-bold text-teal-light">6 Entities</span>
                </div>
                <div className="glass-panel p-5 rounded-2xl border border-white/15 text-right min-w-[170px]">
                  <span className="text-[10px] font-mono uppercase text-white/60 font-bold block mb-1">Scope Alignment</span>
                  <span className="text-2xl font-mono font-bold text-coral">2070 NDC</span>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── SECTION 2: PRINCIPLES & MEMBERS SECTION ── */}
      <section className="w-full max-w-[1720px] mx-auto px-[3vw] py-14 space-y-12">
        
        {/* Core Principles Card */}
        <RevealOnScroll direction="up" delay={100}>
          <div className={`relative isolate overflow-hidden p-8 sm:p-10 rounded-xl border space-y-8 ${
            isLight ? 'bg-[#F4F1E8] border-[#E6E2D8] shadow-sm' : 'bg-[#162B46] border-white/10 shadow-xl'
          }`}>
            {/* Subtle watermark */}
            <div 
              aria-hidden="true" 
              className="pointer-events-none absolute -right-20 top-1/2 -translate-y-1/2 -z-10 h-[500px] w-[500px] select-none opacity-[0.035] sm:opacity-[0.045]"
              style={{
                backgroundImage: 'url(/patterns/pattern-1.png)',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
              }}
            />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal/10 text-teal flex items-center justify-center font-bold">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h2 className={`font-manrope font-extrabold text-xl sm:text-2xl ${
                  isLight ? 'text-[#1D3658]' : 'text-white'
                }`}>
                  Foundational Modeling Tenets
                </h2>
                <span className={`text-xs font-mono ${isLight ? 'text-[#4A607A]' : 'text-white/50'}`}>
                  Non-partisan scientific consensus
                </span>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              {[
                {
                  title: 'Open Source & Reproducibility',
                  desc: 'All scenario mathematical formulations, dispatch coefficients, and code repositories are published under open science licenses for third-party auditing.',
                  icon: isLight ? '/icons/rigorous-open.png' : '/icons/rigorous-open-light.png'
                },
                {
                  title: 'Development-Centric Pathways',
                  desc: 'Decarbonization trajectories are strictly modeled within the imperative of expanding energy access, eliminating poverty, and creating manufacturing jobs.',
                  icon: isLight ? '/icons/development-centred.png' : '/icons/development-centred-light.png'
                },
                {
                  title: 'Sub-Regional Granularity',
                  desc: 'Accounting for state-by-state variations in monsoon precipitation, grid transmission congestion, solar irradiation, and coal revenue dependency.',
                  icon: isLight ? '/icons/spatially.png' : '/icons/spatially-light.png'
                }
              ].map((principle, idx) => (
                <div 
                  key={idx} 
                  className={`p-6 rounded-xl border space-y-4 ${
                    isLight 
                      ? 'bg-white border-[#E6E2D8]' 
                      : 'bg-[#1A3353] border-white/10'
                  }`}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal/10 p-2">
                    <img src={principle.icon} alt="" className="h-full w-full object-contain" />
                  </div>
                  <h3 className={`font-manrope font-extrabold text-base ${
                    isLight ? 'text-[#1D3658]' : 'text-white'
                  }`}>
                    {principle.title}
                  </h3>
                  <p className={`text-xs sm:text-sm leading-relaxed ${
                    isLight ? 'text-[#4A607A]' : 'text-[#D1DBE5]'
                  }`}>
                    {principle.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* Member Organizations Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className={`font-manrope font-extrabold text-2xl ${
              isLight ? 'text-[#1D3658]' : 'text-white'
            }`}>
              Consortium Member Institutions
            </h2>
            <span className={`text-xs font-mono ${isLight ? 'text-[#64748B]' : 'text-white/50'}`}>
              6 Lead Collaborators
            </span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 2xl:gap-8">
            {members.map((member, i) => (
              <RevealOnScroll key={member.name} direction="up" delay={100 + i * 60}>
                <div 
                  className={`p-7 rounded-xl border transition-all duration-300 flex flex-col justify-between h-full group hover:-translate-y-1 ${
                    isLight
                      ? 'bg-white border-[#E6E2D8] hover:border-teal hover:shadow-xl'
                      : 'bg-[#162B46] border-white/10 hover:border-teal hover:bg-[#1A3353] hover:shadow-2xl'
                  }`}
                >
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal block">
                      {member.type}
                    </span>

                    <h3 className={`font-manrope font-extrabold text-lg leading-snug transition-colors ${
                      isLight ? 'text-[#1D3658] group-hover:text-teal' : 'text-white group-hover:text-teal'
                    }`}>
                      {member.name}
                    </h3>

                    <p className={`text-xs sm:text-sm leading-relaxed ${
                      isLight ? 'text-[#64748B]' : 'text-[#94A3B8]'
                    }`}>
                      {member.focus}
                    </p>
                  </div>

                  <div className={`pt-5 mt-5 border-t flex items-center justify-between ${
                    isLight ? 'border-[#E6E2D8]' : 'border-white/10'
                  }`}>
                    <span className={`text-xs font-mono ${isLight ? 'text-[#64748B]' : 'text-white/40'}`}>
                      Active Consortium Partner
                    </span>
                    <Building className="w-4 h-4 text-teal" />
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: FAQS SECTION ── */}
      <FAQSection 
        title="Research Consortium FAQs"
        subtitle="Addressing university alliances, peer review procedures, and global climate think tank engagement"
        faqs={consortiumFaqs}
      />

      {/* ── SECTION 4: PRE-FOOTER BANNER ── */}
      <PreFooterBanner 
        tag="CONSORTIUM SCIENTIFIC ALLIANCE"
        title="Join Leading Universities & Policy Architects"
        subtitle="Partner with the NetZero India Research Consortium to ground regional transition models in peer-reviewed science."
        primaryCtaText="Launch Decarbonization Sandbox"
        primaryCtaLink="/simulator"
        secondaryCtaText="Contact Consortium Secretariat"
        secondaryCtaLink="/contact"
      />

    </div>
  );
};
