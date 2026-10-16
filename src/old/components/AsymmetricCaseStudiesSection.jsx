import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  BookOpen, 
  MapPin, 
  TrendingUp, 
  Flame, 
  CheckCircle2, 
  FileText, 
  Sparkles, 
  Layers,
  Building2,
  Calendar,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { RevealOnScroll } from './RevealOnScroll';

const CASE_STUDIES = [
  {
    id: 'kutch-hybrid',
    category: 'Field Case Study',
    sector: 'Renewable Hybrid Park',
    title: '30 GW Khavda Mega Solar-Wind Park: Overcoming Seasonal Monsoon Dips',
    state: 'Gujarat',
    date: 'March 2026',
    readTime: '6 min read',
    headlineStat: '30 GW',
    statLabel: 'Installed Hybrid Capacity',
    summary: 'How co-locating 30GW solar PV with high-rotor wind turbines in the Rann of Kutch smoothed seasonal variability and achieved a 46% Plant Load Factor (PLF) without baseload coal backup.',
    tags: ['Solar-Wind Hybrid', 'Grid Integration', 'Land Neutrality'],
    featured: true,
    impact: 'Avoids 58 Mt CO2e / yr'
  },
  {
    id: 'tata-angul-h2',
    category: 'Industrial Transition',
    sector: 'Primary Steelmaking',
    title: 'Angul Hydrogen DRI Pilot: Commercial Viability at $2.20/kg H2',
    state: 'Odisha',
    date: 'February 2026',
    readTime: '8 min read',
    headlineStat: '92%',
    statLabel: 'Emissions Cut per Ton Steel',
    summary: 'Empirical results from Eastern India’s first 1.2 MTPA Direct Reduced Iron plant powered by high-temperature electrolyzers coupled with captive round-the-clock wind-solar PPAs.',
    tags: ['Green Steel', 'Electrolyzers', 'Odisha Cluster'],
    featured: false,
    impact: 'Reduces 2.1 Mt CO2e / yr'
  },
  {
    id: 'jharkhand-coal-transition',
    category: 'Socioeconomic Dispatch',
    sector: 'Just Transition',
    title: 'Transitioning 42,000 Coal Miners in Dhanbad: Regional Revenue Models',
    state: 'Jharkhand',
    date: 'January 2026',
    readTime: '5 min read',
    headlineStat: '$4.2B',
    statLabel: 'Transition Fund Mobilized',
    summary: 'A district-level mapping of royalty replacement mechanisms, battery manufacturing re-skilling hubs, and renewable energy land restoration across the Damodar Valley.',
    tags: ['Just Transition', 'Workforce Re-skilling', 'Mineral Surcharge'],
    featured: false,
    impact: 'Protects 180k Livelihoods'
  },
  {
    id: 'delhi-bengaluru-ev-corridor',
    category: 'Policy & Logistics',
    sector: 'Electric Freight',
    title: 'Electrifying the Golden Quadrilateral: Megawatt Highway Fast-Charging',
    state: 'Interstate',
    date: 'December 2025',
    readTime: '4 min read',
    headlineStat: '1,800 km',
    statLabel: 'Zero-Emission Freight Corridor',
    summary: 'Evaluating 1.2 MW MCS fast-chargers every 80 km along National Highway 44 for 55-ton Class 8 battery electric heavy-duty trucks.',
    tags: ['Heavy EV Trucking', 'MCS 1MW Charging', 'Freight Corridors'],
    featured: false,
    impact: 'Cuts 4.8 Mt Freight GHG'
  }
];

export const AsymmetricCaseStudiesSection = () => {
  const { theme, playSound } = useGame();
  const isLight = theme === 'light';

  const featuredStory = CASE_STUDIES[0];
  const sideStories = CASE_STUDIES.slice(1);

  return (
    <section 
      className={`w-full py-24 md:py-32 px-[3vw] transition-colors duration-500 relative overflow-hidden border-y ${
        isLight 
          ? 'bg-[#121B28] text-white border-teal/20' 
          : 'bg-[#050608] text-white border-white/10'
      }`}
    >
      {/* Dynamic Background Ambient Gradients */}
      <div className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-teal/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute -bottom-[20%] -right-[10%] w-[40vw] h-[40vw] rounded-full bg-coral/10 blur-[130px] pointer-events-none"></div>

      <div className="w-full max-w-[1720px] mx-auto relative z-10 space-y-12">
        
        {/* Harmonized Center-Aligned Section Header */}
        <RevealOnScroll direction="up" delay={80}>
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-3 pb-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-coral/20 border border-coral/30">
              <span className="text-[11px] font-mono font-bold tracking-widest text-coral uppercase">
                Empirical Field Dispatches
              </span>
            </div>

            <h2 className="font-manrope text-3xl sm:text-4xl 2xl:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Decarbonization In Practice: <br className="hidden sm:inline" />
              <span className="text-teal-light">Sectoral Case Studies & Field Pilots</span>
            </h2>

            <p className="text-sm sm:text-base text-white/70 max-w-2xl leading-relaxed">
              Peer-reviewed engineering analyses, techno-economic models, and empirical ground pilots deployed across India&apos;s clean transition clusters.
            </p>

            <div className="pt-2">
              <Link
                to="/publications"
                onClick={() => playSound(480)}
                className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-manrope font-semibold text-xs border border-white/20 transition-all inline-flex items-center gap-2 cursor-pointer shadow-sm hover:border-teal"
              >
                <span>Browse All 24+ Field Reports</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </RevealOnScroll>

        {/* ── ASYMMETRIC GRID (7 cols Featured Hero Card + 5 cols Stacked Stream) ── */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* ── LEFT: LARGE HERO ASYMMETRIC CARD (7 COLS) ── */}
          <div className="lg:col-span-7 flex flex-col">
            <RevealOnScroll direction="up" delay={140} className="h-full">
              <div className="h-full rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-[#1A2638] via-[#131D2C] to-[#0D1420] border border-teal/40 hover:border-teal transition-all flex flex-col justify-between shadow-2xl relative overflow-hidden group">
                
                {/* Visual Glow Ornament */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-teal/20 rounded-full blur-[70px] pointer-events-none group-hover:scale-125 transition-transform duration-700"></div>

                <div>
                  {/* Category & Date Metadata */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6 relative z-10">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-teal text-navy uppercase">
                        {featuredStory.category}
                      </span>
                      <span className="text-xs font-mono text-teal-light flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {featuredStory.state}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-mono text-white/60">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {featuredStory.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {featuredStory.readTime}
                      </span>
                    </div>
                  </div>

                  {/* Headline */}
                  <h3 className="font-manrope font-extrabold text-2xl sm:text-3xl text-white leading-tight mb-4 relative z-10 group-hover:text-teal-light transition-colors">
                    {featuredStory.title}
                  </h3>

                  {/* Summary */}
                  <p className="font-manrope text-sm sm:text-base text-white/80 leading-relaxed mb-8 relative z-10">
                    {featuredStory.summary}
                  </p>

                  {/* High-Impact Numerical Callout Podium */}
                  <div className="grid grid-cols-2 gap-4 p-6 rounded-2xl bg-black/40 border border-white/10 relative z-10 mb-8 backdrop-blur-md">
                    <div>
                      <span className="text-3xl sm:text-4xl font-mono font-extrabold text-teal-light block">
                        {featuredStory.headlineStat}
                      </span>
                      <span className="text-[11px] font-mono text-white/60 uppercase">
                        {featuredStory.statLabel}
                      </span>
                    </div>
                    <div className="border-l border-white/10 pl-4">
                      <span className="text-2xl sm:text-3xl font-mono font-extrabold text-emerald-400 block">
                        {featuredStory.impact}
                      </span>
                      <span className="text-[11px] font-mono text-white/60 uppercase">
                        Empirically Validated
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer of card */}
                <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 relative z-10">
                  <div className="flex flex-wrap gap-2">
                    {featuredStory.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white/70">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    to="/publications"
                    onClick={() => playSound(520)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-navy font-manrope font-bold text-xs hover:bg-teal hover:text-white transition-all shadow-lg"
                  >
                    <span>Read Full Whitepaper</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* ── RIGHT: 3-TIER STACKED STREAM (5 COLS) ── */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            {sideStories.map((story, i) => (
              <RevealOnScroll key={story.id} direction="up" delay={200 + i * 100}>
                <div className="p-6 rounded-3xl bg-[#151C26] hover:bg-[#1A2433] border border-white/10 hover:border-teal/50 transition-all group flex flex-col justify-between shadow-lg">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-mono font-bold uppercase text-teal-light">
                        {story.sector} • {story.state}
                      </span>
                      <span className="text-[10px] font-mono text-white/40">
                        {story.readTime}
                      </span>
                    </div>

                    <h4 className="font-manrope font-bold text-base text-white group-hover:text-teal-light transition-colors line-clamp-2 mb-2">
                      {story.title}
                    </h4>

                    <p className="text-xs font-manrope text-white/70 line-clamp-2 leading-relaxed mb-4">
                      {story.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                    <span className="text-emerald-400 font-bold">
                      {story.impact}
                    </span>
                    <Link
                      to="/publications"
                      onClick={() => playSound(440)}
                      className="text-white/60 group-hover:text-white flex items-center gap-1 font-semibold"
                    >
                      <span>Read Report</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
