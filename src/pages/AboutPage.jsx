import React, { useState } from 'react';
import { 
  Building, 
  ShieldCheck, 
  Users, 
  Award, 
  Globe2, 
  Target, 
  CheckCircle2, 
  Cpu, 
  Layers, 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Mail, 
  GraduationCap, 
  Scale, 
  Landmark, 
  Compass, 
  FileText,
  Calendar,
  MapPin,
  Clock,
  Download,
  Check,
  Send,
  UserCheck,
  TrendingUp,
  Flame,
  Zap,
  Briefcase
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { RevealOnScroll } from '../components/RevealOnScroll';
import { FAQSection } from '../components/FAQSection';
import { PreFooterBanner } from '../components/PreFooterBanner';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';

export const AboutPage = () => {
  const { playSound, theme, ecoMode } = useGame();
  const isLight = theme === 'light';

  const [fellowshipSubmitted, setFellowshipSubmitted] = useState(false);
  const [fellowshipDomain, setFellowshipDomain] = useState('Power Systems & Grid Storage');

  // Leadership Roles (Names Removed - Purely Functional Scientific Leads with High-Quality Portraits)
  const leaders = [
    {
      role: 'Chief Scientific Architect',
      institution: 'Ex-IIT Delhi / Energy Transitions Fellow',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      bio: 'Leading integrated assessment modeling with 18+ years optimizing macro-energy systems, regional grid unit commitments, and sectoral abatement cost curves across South Asia.'
    },
    {
      role: 'Director of Industrial Decarbonization',
      institution: 'Senior Fellow, Heavy Industry Taskforce',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      bio: 'Pioneered metallurgical hydrogen DRI techno-economic frameworks and pilot LC3 cement calcination deployments with major Indian industrial conglomerates.'
    },
    {
      role: 'Lead, Just Transition & Livelihoods',
      institution: 'CEEW Senior Policy Fellow',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
      bio: 'Directs socio-economic dependency mapping across 54 coal districts in eastern India, designing regional fiscal safety nets and renewable employment pathways.'
    },
    {
      role: 'Head of Grid & Storage Architecture',
      institution: 'Power Systems & Dispatch Group',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      bio: 'Specializes in 8,760h sub-hourly grid balancing, pumped storage plant (PSP) hydro-cycling, and megawatt fast-charging transport network topology.'
    }
  ];

  // Senior Research Fellows (Names Removed)
  const seniorFellows = [
    {
      role: 'Lead, Atmospheric Modeling',
      institution: 'IISc Bangalore',
      image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=500&q=80',
      specialty: 'Aerosol feedback & regional climate sensitivity'
    },
    {
      role: 'Senior Fellow, Carbon Accounting',
      institution: 'SEBI ESG Standards Advisor',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80',
      specialty: 'Scope 1-3 audit ledgers & CEA grid factors'
    },
    {
      role: 'Director, Agroforestry Carbon Sinks',
      institution: 'TERI Natural Systems Lab',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=80',
      specialty: 'Geospatial biomass LiDAR verification'
    },
    {
      role: 'Fellow, Hydrogen Electrolysis',
      institution: 'IIT Bombay Chemical Engineering',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=80',
      specialty: 'PEM/SOEC stacks & captive renewable PPAs'
    }
  ];

  // Summit Tracks and Keynote Data for Dialogue Section (No Personal Names)
  const summitTracks = [
    {
      day: 'Day 1 • 09:30 IST',
      title: 'Synchronous Grid Stability Under 500 GW Renewables',
      keynote: 'Keynote Session: Advisor, Central Electricity Authority',
      attendees: '240 DISCOM & Grid Engineers',
      topics: ['Dynamic inertia & virtual synchronous machines', 'Pumped hydro 6h cycling curves', 'Western-Northern Green Energy Corridor wheeling'],
      badge: 'POWER & GRID'
    },
    {
      day: 'Day 2 • 11:00 IST',
      title: 'Green Hydrogen DRI Parity & Heavy Industry Retrofits',
      keynote: 'Keynote Session: Lead Scientist, Metallurgy Research Group',
      attendees: '180 Primary Steel & Cement Executives',
      topics: ['Levelized $1.10/kg H2 economics', 'LC3 composite cement bis standards', 'Captive renewable PPA packaging'],
      badge: 'HEAVY INDUSTRY'
    },
    {
      day: 'Day 3 • 14:00 IST',
      title: 'Macroeconomic Just Transition & District Royalty Substitution',
      keynote: 'Keynote Session: Principal Fellow, Socioeconomic Transitions Lab',
      attendees: '150 Policy Fellows & District Commissioners',
      topics: ['Jharkhand & Odisha mineral fund realignment', 'Mine-site solar redevelopment', 'Thermal workforce re-skilling matrices'],
      badge: 'JUST TRANSITION'
    }
  ];

  // Fellowship Tracks Data
  const fellowshipTracks = [
    {
      title: 'Doctoral & Postdoc Modeling Fellowship',
      grant: '₹1.8 Lakhs / Month + Compute Grants',
      duration: '12–24 Months Residency',
      deliverable: 'Peer-reviewed unit commitment algorithms & open data publish',
      eligibility: 'PhD candidates in Power Systems, Economics, or Chemical Eng.'
    },
    {
      title: 'Visiting Policy & Industry Fellow',
      grant: 'Grant-Funded Sabbatical Placement',
      duration: '6–12 Months',
      deliverable: 'Sectoral decarbonization blueprint & regulatory advisory notes',
      eligibility: 'DISCOM leads, steel plant directors, or think tank researchers'
    },
    {
      title: 'Open Source Climate Software Fellow',
      grant: '₹1.2 Lakhs / Month + Cloud Stipend',
      duration: '6 Months',
      deliverable: 'PyPSA / Julia mathematical solver optimizations for India grid',
      eligibility: 'Software engineers & computational data scientists'
    }
  ];

  const aboutFaqs = [
    {
      q: "What is the funding model behind the NetZero India Initiative?",
      a: "NZII is backed by philanthropic grants from global climate foundations and academic research allocations from consortium universities. We accept zero funding from fossil-fuel lobbies to maintain strict scientific independence."
    },
    {
      q: "How often are macroeconomic and emission factor baselines updated?",
      a: "Baselines are updated continuously as new Central Electricity Authority (CEA) generation reports, IPCC Sixth Assessment reports, and satellite observation data from Sentinel-5P become available."
    },
    {
      q: "Can universities or research scholars contribute to the modeling codebase?",
      a: "Yes. All PyPSA, Gurobi dispatch equations, and dataset schemas are open source under the CC-BY 4.0 license on our Open Science Portal."
    },
    {
      q: "How does NZII advise government ministries and state Nodal Agencies?",
      a: "Our fellows serve on technical working committees for NITI Aayog, Ministry of Power, and state electricity regulatory commissions (SERCs) to provide non-partisan dispatch and tariff modeling."
    }
  ];

  const handleFellowshipSubmit = (e) => {
    e.preventDefault();
    // Demonstration-only form: no recruitment backend is connected.
    setFellowshipSubmitted(true);
  };

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
          <source src="/hero-video (1).mp4" type="video/mp4" />
        </video>

        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/60 to-black/80 pointer-events-none z-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.7)_100%)] pointer-events-none z-10"></div>

        <div className="relative z-20 w-full max-w-[1280px] mx-auto text-center space-y-6">
          <RevealOnScroll direction="up" delay={60}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-xl glass-capsule border border-white/20 mx-auto">
              <Globe2 className="w-3.5 h-3.5 text-teal-light" />
              <span className="text-[11px] font-mono font-bold tracking-widest text-teal-light uppercase">
                Institutional Mission & Charter
              </span>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={80}>
            <h1 className="font-manrope text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight max-w-4xl mx-auto">
              Anchoring India’s Climate Transition in Science
            </h1>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={100}>
            <p className="text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal text-white/85">
              The NetZero India Initiative (NZII) is an open non-partisan consortium uniting premier universities, macroeconomic think tanks, and engineers to model robust, development-first net-zero pathways for India.
            </p>
          </RevealOnScroll>

          {/* Status Glass HUD (Center Aligned) */}
          <RevealOnScroll direction="up" delay={120}>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <div className="glass-panel px-6 py-4 rounded-2xl border border-white/15 text-center min-w-[170px]">
                <span className="text-[10px] font-mono uppercase text-teal-light font-bold block mb-0.5">Consortium Fellows</span>
                <span className="text-2xl font-mono font-bold text-teal-light">Unverified Team</span>
              </div>
              <div className="glass-panel px-6 py-4 rounded-2xl border border-white/15 text-center min-w-[170px]">
                <span className="text-[10px] font-mono uppercase text-white/60 font-bold block mb-0.5">Charter Baseline</span>
                <span className="text-2xl font-mono font-bold text-coral">Open Science</span>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── SECTION 2: FOUNDATIONAL MISSION TENETS (CENTER ALIGNED) ── */}
      <section className="w-full max-w-[1720px] mx-auto px-[3vw] py-20 border-b border-black/10 dark:border-white/10 space-y-12">
        <RevealOnScroll direction="up" delay={80}>
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-teal">
              CORE PILLARS
            </span>
            <h2 className={`font-manrope text-3xl sm:text-4xl font-extrabold tracking-tight ${
              isLight ? 'text-[#0F172A]' : 'text-white'
            }`}>
              Three Foundational Mission Tenets
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed ${isLight ? 'text-[#64748B]' : 'text-[#94A3B8]'}`}>
              Our modeling charter places socioeconomic development, spatial granularity, and transparent reproducibility at the center of national climate planning.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid lg:grid-cols-3 gap-8">
          {[
            {
              title: 'Development-First Decarbonization',
              desc: 'We model climate transitions strictly within India’s imperative to eliminate poverty, expand 24/7 industrial power access, and foster high-value domestic manufacturing jobs.',
              icon: Target
            },
            {
              title: 'Sub-Regional Empirical Granularity',
              desc: 'National averages obscure local realities. Our models capture district-level coal royalties in Jharkhand, western solar irradiation peaks, and peninsular monsoon wind seasonality.',
              icon: Cpu
            },
            {
              title: 'Transparent Open Science Code',
              desc: 'Every mathematical formula, unit-commitment constraint, and capital cost assumption is published under permissive licenses for public peer audit and university research.',
              icon: BookOpen
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <RevealOnScroll key={item.title} direction="up" delay={80 + idx * 60}>
                <div className={`p-8 rounded-xl border transition-all duration-300 flex flex-col justify-between h-full text-center items-center ${
                  isLight 
                    ? 'bg-white border-[#E2E8F0] shadow-sm hover:border-teal' 
                    : 'bg-[#101520] border-[#1D2636] shadow-md hover:border-teal'
                }`}>
                  <div className="space-y-4 flex flex-col items-center">
                    <div className="w-12 h-12 rounded-xl bg-teal/10 text-teal border border-teal/20 flex items-center justify-center font-bold">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className={`font-manrope font-extrabold text-xl ${
                      isLight ? 'text-[#0F172A]' : 'text-white'
                    }`}>
                      {item.title}
                    </h3>
                    <p className={`text-xs sm:text-sm leading-relaxed ${
                      isLight ? 'text-[#64748B]' : 'text-[#94A3B8]'
                    }`}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </section>

      {/* ── SECTION 3: SCIENTIFIC STEERING COMMITTEE (CENTER ALIGNED & NO NAMES) ── */}
      <section className="w-full max-w-[1720px] mx-auto px-[3vw] py-20 border-b border-black/10 dark:border-white/10 space-y-12">
        <RevealOnScroll direction="up" delay={80}>
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-teal/10 border border-teal/30 mx-auto">
              <Users className="w-3.5 h-3.5 text-teal" />
              <span className="text-[10px] font-mono font-bold tracking-widest text-teal uppercase">
                SCIENTIFIC GOVERNANCE
              </span>
            </div>
            <h2 className={`font-manrope font-extrabold text-3xl sm:text-4xl tracking-tight ${
              isLight ? 'text-[#0F172A]' : 'text-white'
            }`}>
              Scientific Leadership & Steering Committee
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed ${isLight ? 'text-[#64748B]' : 'text-[#94A3B8]'}`}>
              Leading academics and engineers directing our multi-sector computational models across power systems, heavy industry, and just transition economics.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {leaders.map((lead, i) => (
            <RevealOnScroll key={lead.role} direction="up" delay={100 + i * 60}>
              <div className={`rounded-xl border overflow-hidden transition-all duration-300 flex flex-col justify-between h-full group hover:-translate-y-1.5 text-center ${
                isLight
                  ? 'bg-white border-[#E2E8F0] hover:border-teal hover:shadow-xl'
                  : 'bg-[#101520] border-[#1D2636] hover:border-teal hover:bg-[#141A26] hover:shadow-2xl'
              }`}>
                <div>
                  {/* Portrait Image Container */}
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-black/10 dark:bg-white/5">
                    <img
                      src={lead.image}
                      alt={lead.role}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-3 left-4 right-4">
                      <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-teal text-white font-bold inline-block shadow-sm">
                        Principal Taskforce Lead
                      </span>
                    </div>
                  </div>

                  {/* Profile Details */}
                  <div className="p-6 space-y-3 flex flex-col items-center">
                    <div>
                      <h3 className={`font-manrope font-extrabold text-lg leading-snug ${
                        isLight ? 'text-[#0F172A]' : 'text-white'
                      }`}>
                        {lead.role}
                      </h3>
                      <span className={`text-[11px] font-mono block mt-1 ${isLight ? 'text-[#64748B]' : 'text-white/50'}`}>
                        {lead.institution}
                      </span>
                    </div>

                    <p className={`text-xs leading-relaxed pt-1 ${
                      isLight ? 'text-[#475569]' : 'text-[#94A3B8]'
                    }`}>
                      {lead.bio}
                    </p>
                  </div>
                </div>

                <div className={`p-6 pt-0 mt-auto border-t border-black/5 dark:border-white/5 flex items-center justify-between`}>
                  <span className={`text-[10px] font-mono ${isLight ? 'text-[#94A3B8]' : 'text-white/40'}`}>
                    Active Fellowship
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-teal/10 text-teal flex items-center justify-center">
                    <GraduationCap className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* ── SECTION 4: SENIOR RESEARCH FELLOWS & DOMAIN LEADS (CENTER ALIGNED & NO NAMES) ── */}
      <section className="w-full max-w-[1720px] mx-auto px-[3vw] py-20 border-b border-black/10 dark:border-white/10 space-y-12">
        <RevealOnScroll direction="up" delay={80}>
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-teal/10 border border-teal/30 mx-auto">
              <Sparkles className="w-3.5 h-3.5 text-teal" />
              <span className="text-[10px] font-mono font-bold tracking-widest text-teal uppercase">
                WORKING GROUP FELLOWS
              </span>
            </div>
            <h2 className={`font-manrope font-extrabold text-3xl sm:text-4xl tracking-tight ${
              isLight ? 'text-[#0F172A]' : 'text-white'
            }`}>
              Senior Modeling Fellows & Domain Leads
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed ${isLight ? 'text-[#64748B]' : 'text-[#94A3B8]'}`}>
              Domain specialists directing spatial satellite telemetry, clinker calcination chemistry, and ESG assurance protocols.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {seniorFellows.map((fellow, idx) => (
            <RevealOnScroll key={fellow.role} direction="up" delay={80 + idx * 50}>
              <div className={`p-5 rounded-xl border transition-all duration-300 flex items-center gap-4 ${
                isLight 
                  ? 'bg-white border-[#E2E8F0] shadow-sm hover:border-teal' 
                  : 'bg-[#101520] border-[#1D2636] hover:border-teal hover:bg-[#131924]'
              }`}>
                <img
                  src={fellow.image}
                  alt={fellow.role}
                  className="w-16 h-16 rounded-xl object-cover shrink-0 border border-teal/30"
                  loading="lazy"
                />
                <div className="space-y-1 overflow-hidden text-left">
                  <h3 className={`font-manrope font-extrabold text-sm truncate ${
                    isLight ? 'text-[#0F172A]' : 'text-white'
                  }`}>
                    {fellow.role}
                  </h3>
                  <span className={`text-[10px] block truncate font-mono ${isLight ? 'text-[#64748B]' : 'text-white/50'}`}>
                    {fellow.institution}
                  </span>
                  <p className={`text-[10px] leading-tight pt-0.5 line-clamp-1 ${isLight ? 'text-teal-700 font-semibold' : 'text-teal-400'}`}>
                    {fellow.specialty}
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* ── SECTION 5: INSTITUTIONAL GOVERNANCE & OVERSIGHT (CENTER ALIGNED) ── */}
      <section className="w-full max-w-[1720px] mx-auto px-[3vw] py-20 border-b border-black/10 dark:border-white/10 space-y-10">
        <RevealOnScroll direction="up" delay={80}>
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-teal">
              INDEPENDENT OVERSIGHT
            </span>
            <h2 className={`font-manrope text-3xl sm:text-4xl font-extrabold tracking-tight ${
              isLight ? 'text-[#0F172A]' : 'text-white'
            }`}>
              Scientific Peer Review & Governance Council
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed ${isLight ? 'text-[#475569]' : 'text-[#94A3B8]'}`}>
              All modeling baselines, marginal abatement cost calculations, and grid unit-commitment scenarios undergo double-blind peer reviews by external university professors and grid engineers prior to publication.
            </p>
          </div>
        </RevealOnScroll>

        <div className="max-w-4xl mx-auto">
          <div className={`p-8 rounded-xl border space-y-4 ${
            isLight ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-[#11151F] border-[#1E2738]'
          }`}>
            <span className="text-xs font-mono font-bold uppercase text-teal block text-center">Audit Tenets & Governance Rules</span>
            <div className="grid sm:grid-cols-3 gap-4 pt-2">
              <div className="flex flex-col items-center text-center gap-2 p-3 rounded-lg bg-black/5 dark:bg-white/5">
                <CheckCircle2 className="w-5 h-5 text-teal shrink-0" />
                <span className="text-xs font-manrope">Zero corporate lobbying or tied commercial grants accepted</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2 p-3 rounded-lg bg-black/5 dark:bg-white/5">
                <CheckCircle2 className="w-5 h-5 text-teal shrink-0" />
                <span className="text-xs font-manrope">Open publication of model sensitivity matrices and error margins</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2 p-3 rounded-lg bg-black/5 dark:bg-white/5">
                <CheckCircle2 className="w-5 h-5 text-teal shrink-0" />
                <span className="text-xs font-manrope">Annual public methodological hearings with energy policy stakeholders</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: MODELING TIMELINE & 2070 NDC ROADMAP (CENTER ALIGNED) ── */}
      <section className="w-full max-w-[1720px] mx-auto px-[3vw] py-20 border-b border-black/10 dark:border-white/10 space-y-12">
        <RevealOnScroll direction="up" delay={80}>
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-teal">
              DECARB CHRONOLOGY
            </span>
            <h2 className={`font-manrope text-3xl sm:text-4xl font-extrabold tracking-tight ${
              isLight ? 'text-[#0F172A]' : 'text-white'
            }`}>
              India’s Milestone Decarbonization Chronology (2025–2070)
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed ${isLight ? 'text-[#64748B]' : 'text-[#94A3B8]'}`}>
              Key technological milestones guiding our multi-decade unit commitment dispatch and capital mobilization models.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid md:grid-cols-4 gap-6 font-mono text-center">
          <div className={`p-6 rounded-xl border ${isLight ? 'bg-white border-[#E2E8F0]' : 'bg-[#10141C] border-[#1D2636]'}`}>
            <span className="text-2xl font-bold text-teal block mb-1">2030</span>
            <span className="text-xs font-manrope font-bold block mb-1">500 GW Non-Fossil Power</span>
            <span className="text-[11px] opacity-70">45% carbon intensity reduction from 2005 levels.</span>
          </div>
          <div className={`p-6 rounded-xl border ${isLight ? 'bg-white border-[#E2E8F0]' : 'bg-[#10141C] border-[#1D2636]'}`}>
            <span className="text-2xl font-bold text-teal block mb-1">2040</span>
            <span className="text-xs font-manrope font-bold block mb-1">Green H2 Steel Parity</span>
            <span className="text-[11px] opacity-70">Commercial blast furnaces transition to 100% H2-DRI.</span>
          </div>
          <div className={`p-6 rounded-xl border ${isLight ? 'bg-white border-[#E2E8F0]' : 'bg-[#10141C] border-[#1D2636]'}`}>
            <span className="text-2xl font-bold text-teal block mb-1">2050</span>
            <span className="text-xs font-manrope font-bold block mb-1">Coal Power Phasedown</span>
            <span className="text-[11px] opacity-70">Firm night baseload powered by long-duration storage & nuclear.</span>
          </div>
          <div className={`p-6 rounded-xl border ${isLight ? 'bg-white border-[#E2E8F0]' : 'bg-[#10141C] border-[#1D2636]'}`}>
            <span className="text-2xl font-bold text-coral block mb-1">2070</span>
            <span className="text-xs font-manrope font-bold block mb-1">Net-Zero GHG Achieved</span>
            <span className="text-[11px] opacity-70">Residual industrial emissions neutralized by 3.0 Gt natural sinks.</span>
          </div>
        </div>
      </section>

      {/* ── SECTION 7: OPEN CODEBASE & UNIVERSITY ALLIANCES (CENTER ALIGNED) ── */}
      <section className="w-full max-w-[1720px] mx-auto px-[3vw] py-20 border-b border-black/10 dark:border-white/10 space-y-8 text-center">
        <RevealOnScroll direction="up" delay={80}>
          <div className="max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-mono font-bold uppercase text-teal">ACADEMIC OPEN SOURCE CHARTER</span>
            <h2 className={`font-manrope font-extrabold text-3xl sm:text-4xl ${isLight ? 'text-[#0F172A]' : 'text-white'}`}>
              Permissive Licensing for University Researchers
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed ${isLight ? 'text-[#64748B]' : 'text-[#94A3B8]'}`}>
              We grant free computational access and raw hourly data streams to accredited postgraduate students and faculty members across India.
            </p>
            <div className="pt-2">
              <Link
                to="/data"
                onClick={() => playSound(500)}
                className="px-7 py-3.5 rounded-xl bg-teal text-white font-manrope font-bold text-xs hover:bg-teal-dark transition-all inline-flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>Access Open Science Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* ── SECTION 8: ANNUAL SCIENTIFIC SUMMIT (CENTER ALIGNED & NO NAMES) ── */}
      <section className="w-full max-w-[1720px] mx-auto px-[3vw] py-20 border-b border-black/10 dark:border-white/10 space-y-12">
        <RevealOnScroll direction="up" delay={80}>
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-teal/10 border border-teal/30 mx-auto">
              <Calendar className="w-3.5 h-3.5 text-teal" />
              <span className="text-[10px] font-mono font-bold tracking-widest text-teal uppercase">
                ANNUAL CONVENING • NEW DELHI
              </span>
            </div>
            <h2 className={`font-manrope font-extrabold text-3xl sm:text-4xl tracking-tight ${
              isLight ? 'text-[#0F172A]' : 'text-white'
            }`}>
              Annual India Net-Zero Pathways Dialogue
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed ${isLight ? 'text-[#64748B]' : 'text-[#94A3B8]'}`}>
              Every November, we convene DISCOM directors, steel plant managers, climate economists, and ministerial policy leads at the India Habitat Centre to stress-test the latest national dispatch simulations.
            </p>

            {/* Summit Meta Badges (Center Aligned) */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
              <div className={`p-4 rounded-xl border text-center min-w-[160px] ${isLight ? 'bg-white border-[#CBD5E1]' : 'bg-[#121824] border-[#1F293D]'}`}>
                <span className="text-[10px] font-mono uppercase text-teal font-bold block">Next Session</span>
                <span className="text-xl font-mono font-bold text-teal">Nov 18–20, 2026</span>
              </div>
              <div className={`p-4 rounded-xl border text-center min-w-[160px] ${isLight ? 'bg-white border-[#CBD5E1]' : 'bg-[#121824] border-[#1F293D]'}`}>
                <span className="text-[10px] font-mono uppercase opacity-60 block">Delegates Expected</span>
                <span className="text-xl font-mono font-bold text-coral">650+ Accredited</span>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* 3 Summit Working Tracks */}
        <div className="grid lg:grid-cols-3 gap-6 2xl:gap-8">
          {summitTracks.map((trk, i) => (
            <RevealOnScroll key={trk.title} direction="up" delay={100 + i * 60}>
              <div className={`p-7 rounded-xl border transition-all duration-300 flex flex-col justify-between h-full text-center items-center ${
                isLight 
                  ? 'bg-white border-[#E2E8F0] shadow-sm hover:border-teal' 
                  : 'bg-[#101520] border-[#1D2636] hover:border-teal hover:bg-[#141A26]'
              }`}>
                <div className="space-y-4 flex flex-col items-center w-full">
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[10px] font-mono font-bold uppercase text-teal px-2.5 py-1 rounded bg-teal/10 border border-teal/20">
                      {trk.badge}
                    </span>
                    <span className={`text-[10px] font-mono ${isLight ? 'text-[#64748B]' : 'text-white/50'}`}>
                      {trk.day}
                    </span>
                  </div>

                  <h3 className={`font-manrope font-extrabold text-xl leading-snug ${
                    isLight ? 'text-[#0F172A]' : 'text-white'
                  }`}>
                    {trk.title}
                  </h3>

                  <div className={`p-3 rounded-lg border text-xs font-mono w-full ${
                    isLight ? 'bg-teal-50/60 border-teal-200 text-teal-900' : 'bg-teal/10 border-teal/30 text-teal-light'
                  }`}>
                    {trk.keynote}
                  </div>

                  <div className="space-y-2 text-xs font-manrope text-left w-full">
                    <span className="text-[10px] font-mono font-bold uppercase text-teal block text-center">
                      Core Deliberation Points
                    </span>
                    {trk.topics.map((t, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal shrink-0 mt-0.5" />
                        <span className={isLight ? 'text-[#475569]' : 'text-[#94A3B8]'}>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`pt-5 mt-6 border-t flex items-center justify-between w-full ${
                  isLight ? 'border-[#E2E8F0]' : 'border-[#1D2636]'
                }`}>
                  <span className={`text-[11px] font-mono ${isLight ? 'text-[#64748B]' : 'text-white/50'}`}>
                    {trk.attendees}
                  </span>
                  <button
                    onClick={() => {
                      playSound(520);
                      if (!ecoMode) confetti({ particleCount: 30, spread: 50 });
                    }}
                    className="text-xs font-manrope font-bold text-teal hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Request Delegate Pass</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* ── SECTION 9: FELLOWSHIP APPLICATION & RECRUITMENT HUB (CENTER ALIGNED) ── */}
      <section className="w-full max-w-[1720px] mx-auto px-[3vw] py-20 border-b border-black/10 dark:border-white/10 space-y-12">
        <RevealOnScroll direction="up" delay={80}>
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-xl bg-teal/10 border border-teal/30 mx-auto">
              <Briefcase className="w-3.5 h-3.5 text-teal" />
              <span className="text-[11px] font-mono font-bold tracking-widest text-teal uppercase">
                RESEARCH GRANTS & RESIDENCIES
              </span>
            </div>
            <h2 className={`font-manrope text-3xl sm:text-4xl font-extrabold tracking-tight ${
              isLight ? 'text-[#0F172A]' : 'text-white'
            }`}>
              Join the Research Consortium as an Institutional Fellow
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed ${isLight ? 'text-[#64748B]' : 'text-[#94A3B8]'}`}>
              We offer funded computational fellowships, high-performance computing allocations, and policy placements for scholars in power systems engineering, atmospheric modeling, and just transition sociology.
            </p>
          </div>
        </RevealOnScroll>

        {/* 3 Structured Fellowship Grants */}
        <div className="grid md:grid-cols-3 gap-6 2xl:gap-8">
          {fellowshipTracks.map((trk, i) => (
            <RevealOnScroll key={trk.title} direction="up" delay={100 + i * 60}>
              <div className={`p-7 rounded-xl border transition-all duration-300 flex flex-col justify-between h-full text-center items-center ${
                isLight 
                  ? 'bg-white border-[#E2E8F0] shadow-sm hover:border-teal' 
                  : 'bg-[#101520] border-[#1D2636] hover:border-teal hover:bg-[#141A26]'
              }`}>
                <div className="space-y-4 flex flex-col items-center w-full">
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs font-mono font-bold text-coral">
                      {trk.duration}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-teal px-2 py-0.5 rounded bg-teal/10">
                      GRANT-FUNDED
                    </span>
                  </div>

                  <h3 className={`font-manrope font-extrabold text-xl leading-snug ${
                    isLight ? 'text-[#0F172A]' : 'text-white'
                  }`}>
                    {trk.title}
                  </h3>

                  <div className={`p-3 rounded-lg border font-mono text-xs w-full ${
                    isLight ? 'bg-[#F8FAFC] border-[#E2E8F0] text-[#0F172A]' : 'bg-[#18202E] border-[#2A364A] text-white'
                  }`}>
                    <span className="text-teal font-bold block mb-0.5">Stipend / Allocation:</span>
                    <span>{trk.grant}</span>
                  </div>

                  <div className="space-y-2 text-xs w-full text-left">
                    <div>
                      <span className="font-bold block text-teal mb-0.5">Core Deliverable:</span>
                      <span className={isLight ? 'text-[#475569]' : 'text-[#94A3B8]'}>{trk.deliverable}</span>
                    </div>
                    <div className="pt-2 border-t border-black/5 dark:border-white/5">
                      <span className="font-bold block opacity-70 mb-0.5">Eligibility:</span>
                      <span className={isLight ? 'text-[#475569]' : 'text-[#94A3B8]'}>{trk.eligibility}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-5 mt-6 border-t border-black/5 dark:border-white/5 w-full">
                  <button
                    onClick={() => {
                      setFellowshipDomain(trk.title);
                      playSound(520);
                    }}
                    className="w-full py-2.5 rounded-lg bg-teal/10 hover:bg-teal hover:text-white text-teal font-manrope font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Select Track Below</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Interactive Fellowship Application Fast-Track Form */}
        <RevealOnScroll direction="up" delay={120}>
          <div className={`p-8 sm:p-10 rounded-xl border max-w-3xl mx-auto shadow-xl ${
            isLight ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-[#101520] border-[#1D2636]'
          }`}>
            {fellowshipSubmitted ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-14 h-14 rounded-full bg-teal/20 text-teal border border-teal/40 flex items-center justify-center mx-auto">
                  <Check className="w-7 h-7" />
                </div>
                <h3 className={`font-manrope font-extrabold text-2xl ${isLight ? 'text-[#0F172A]' : 'text-white'}`}>
                  Fellowship interest preview
                </h3>
                <p className={`text-xs sm:text-sm max-w-md mx-auto ${isLight ? 'text-[#64748B]' : 'text-[#94A3B8]'}`}>
                  No application has been sent or saved. The fellowship programme and its verified submission channel require confirmation.
                </p>
                <button
                  onClick={() => setFellowshipSubmitted(false)}
                  className="px-5 py-2 rounded-lg bg-teal text-white text-xs font-manrope font-bold mt-2 cursor-pointer"
                >
                  Submit Another Profile
                </button>
              </div>
            ) : (
              <form onSubmit={handleFellowshipSubmit} className="space-y-5">
                <div className="text-center border-b pb-4 dark:border-white/10 space-y-1">
                  <h3 className={`font-manrope font-extrabold text-xl ${isLight ? 'text-[#0F172A]' : 'text-white'}`}>
                    Fast-Track Fellowship Intent
                  </h3>
                  <p className={`text-xs ${isLight ? 'text-[#64748B]' : 'text-white/50'}`}>
                    This is a demonstration form. No application will be transmitted or retained.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-xs font-mono font-semibold mb-1.5 ${isLight ? 'text-[#334155]' : 'text-white/80'}`}>
                      Academic Institution / Department *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. IIT Madras / Power Systems Lab"
                      className={`w-full px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-manrope outline-none border transition-all ${
                        isLight 
                          ? 'bg-white border-[#CBD5E1] text-[#0F172A] focus:border-teal' 
                          : 'bg-[#181F2C] border-[#2A3446] text-white focus:border-teal'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-mono font-semibold mb-1.5 ${isLight ? 'text-[#334155]' : 'text-white/80'}`}>
                      Institutional Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="scholar@university.ac.in"
                      className={`w-full px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-manrope outline-none border transition-all ${
                        isLight 
                          ? 'bg-white border-[#CBD5E1] text-[#0F172A] focus:border-teal' 
                          : 'bg-[#181F2C] border-[#2A3446] text-white focus:border-teal'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-xs font-mono font-semibold mb-1.5 ${isLight ? 'text-[#334155]' : 'text-white/80'}`}>
                    Preferred Fellowship Track *
                  </label>
                  <select
                    value={fellowshipDomain}
                    onChange={(e) => setFellowshipDomain(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-manrope outline-none border transition-all cursor-pointer ${
                      isLight 
                        ? 'bg-white border-[#CBD5E1] text-[#0F172A] focus:border-teal' 
                        : 'bg-[#181F2C] border-[#2A3446] text-white focus:border-teal'
                    }`}
                  >
                    <option value="Doctoral & Postdoc Modeling Fellowship">Doctoral & Postdoc Modeling Fellowship</option>
                    <option value="Visiting Policy & Industry Fellow">Visiting Policy & Industry Fellow</option>
                    <option value="Open Source Climate Software Fellow">Open Source Climate Software Fellow</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-teal hover:bg-teal-dark text-white font-manrope font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:scale-[1.01] transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Preview Fellowship Interest</span>
                </button>
              </form>
            )}
          </div>
        </RevealOnScroll>
      </section>

      {/* ── SECTION 10: FAQS SECTION (CENTER ALIGNED) ── */}
      <FAQSection 
        title="About the Consortium FAQs"
        subtitle="Clarifying our funding model, research independence, and scientific governance"
        faqs={aboutFaqs}
      />

      {/* ── SECTION 11: PRE-FOOTER BANNER (CENTER ALIGNED) ── */}
      <PreFooterBanner 
        tag="ACADEMIC & POLICY CONSORTIUM"
        title="Ground Your Organization’s Decarbonization Strategy in Science"
        subtitle="Explore peer-reviewed publications, inspect sub-regional dispatch models, or collaborate on custom corporate transition audits."
        primaryCtaText="Explore Publications"
        primaryCtaLink="/publications"
        secondaryCtaText="Contact Consortium Fellows"
        secondaryCtaLink="/contact"
      />

    </div>
  );
};
