import React, { useState, useEffect } from 'react';

const styleSheet = `
  .font-mono {
    font-family: 'JetBrains Mono', monospace;
  }

  .bg-dot-pattern {
    background-image: radial-gradient(rgba(43,157,143,0.15) 1px, transparent 1px);
    background-size: 24px 24px;
  }
  
  .bg-dot-pattern-dark {
    background-image: radial-gradient(rgba(43,157,143,0.25) 1px, transparent 1px);
    background-size: 24px 24px;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .animate-fade-up {
    animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  
  .delay-100 { animation-delay: 100ms; }
  .delay-200 { animation-delay: 200ms; }
  .delay-300 { animation-delay: 300ms; }

  @keyframes scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  
  .animate-marquee {
    animation: scroll 40s linear infinite;
  }
  
  .hover-pause:hover {
    animation-play-state: paused;
  }
`;

const Preloader = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 200);  // Fade in dot
    const t2 = setTimeout(() => setPhase(2), 800);  // Expand to line
    const t3 = setTimeout(() => setPhase(3), 1600); // Expand to screen
    const t4 = setTimeout(() => {
      if (onComplete) onComplete();
    }, 2400);

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white overflow-hidden">
      <div 
        className={`bg-navy transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          phase === 0 ? 'w-0 h-1 opacity-0' :
          phase === 1 ? 'w-1 h-1 opacity-100 !bg-teal' :
          phase === 2 ? 'w-48 md:w-64 h-1 opacity-100' :
          'w-[100vw] h-[100vh] opacity-100'
        }`}
        style={{ borderRadius: phase === 3 ? '0' : '4px' }}
      ></div>
    </div>
  );
};

const ScrollReveal = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = React.useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -100px 0px' });

    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${className}`}
    >
      {children}
    </div>
  );
};


const SectionInfo = ({ num, title, rationale, dark = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`flex flex-col gap-4 mb-12 md:mb-16 pt-8 border-t w-full relative z-20 ${dark ? 'border-teal/30 text-white' : 'border-navy/10 text-navy'}`}>
      <div className="flex justify-between items-start md:items-center w-full">
        <div className="flex flex-col gap-2">
          <span className={`font-mono text-xs font-bold tracking-widest uppercase ${dark ? 'text-teal' : 'text-teal'}`}>
            Section {num}
          </span>
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight font-[Manrope]">
            {title}
          </h2>
        </div>
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`px-3 py-1.5 md:px-4 md:py-2 rounded-md text-[10px] md:text-xs font-bold tracking-wider transition-all duration-300 flex items-center gap-2 flex-shrink-0 font-[Manrope] ${
            isOpen 
              ? (dark ? 'bg-cream text-navy' : 'bg-teal text-white')
              : (dark ? 'bg-navy-light text-teal hover:bg-teal/20' : 'bg-teal/10 text-teal hover:bg-teal/20')
          }`}
        >
          {isOpen ? 'Close Rationale ✕' : 'Why is this here?'}
        </button>
      </div>

      <div 
        className="transition-all duration-500 ease-in-out overflow-hidden w-full"
        style={{ 
          maxHeight: isOpen ? '500px' : '0px',
          opacity: isOpen ? 1 : 0,
          marginTop: isOpen ? '0.5rem' : '0'
        }}
      >
        <div className={`p-5 md:p-6 rounded-lg ${dark ? 'bg-navy/60 border border-teal/20' : 'bg-cream border border-teal/15 shadow-sm'}`}>
          <h4 className={`text-[10px] uppercase tracking-widest font-bold mb-2 font-[Manrope] ${dark ? 'text-teal' : 'text-teal'}`}>
            Strategic Rationale
          </h4>
          <p className={`text-sm md:text-base leading-relaxed font-medium font-[Roboto] ${dark ? 'text-cream/80' : 'text-navy/70'}`}>
            {rationale}
          </p>
        </div>
      </div>
    </div>
  );
};

const HeroSection = () => {
  const [hoverBox, setHoverBox] = useState(null);

  return (
    <section className="relative w-screen min-h-[100vh] flex items-center bg-white border-b border-navy/10 bg-dot-pattern px-[3vw] pt-32 pb-16 lg:pt-20 lg:pb-0 overflow-hidden">
      <div className="w-full h-full flex flex-col justify-start max-w-[120rem] mx-auto lg:justify-center relative z-10">
        
        <SectionInfo 
          num="01" 
          title="The Hero Framework" 
          rationale="To immediately establish the apex authority and comprehensive scope of NetZero India. In the fast-evolving climate sector, stakeholders require instant reassurance that they are accessing verified, institution-grade intelligence. This section serves as the digital front door, instantly validating the mandate to shape national frameworks."
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center h-full flex-1 pb-10">
          <div className="flex flex-col items-start w-full opacity-0 animate-fade-up">
            <div className="w-32 md:w-40 h-6 md:h-8 bg-pink/15 text-pink-dark text-[10px] md:text-xs font-bold tracking-widest uppercase flex items-center justify-center rounded-full mb-8 md:mb-10 font-[Manrope]">Climate Intelligence</div>
            
            <h1 className="font-[Manrope] text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-navy leading-[0.95] mb-4 md:mb-5">NetZero India</h1>
            <h1 className="font-[Manrope] text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-navy leading-[0.95] mb-8 md:mb-12">Initiative</h1>
            
            <p className="text-base md:text-lg text-navy/60 font-[Roboto] leading-relaxed mb-10 md:mb-12 max-w-xl">
              Envisioning net-zero pathways that balance development goals with resource constraints and socio-economic and environmental trade-offs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <div className="w-full sm:w-48 h-14 md:h-16 bg-pink hover:bg-pink-dark active:scale-[0.98] rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-card cursor-pointer flex items-center justify-center">
                <span className="text-white text-sm font-semibold font-[Manrope] tracking-wide">Explore Data</span>
              </div>
              <div className="w-full sm:w-48 h-14 md:h-16 bg-white hover:bg-cream active:scale-[0.98] border border-teal/30 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-card cursor-pointer flex items-center justify-center shadow-sm">
                <span className="text-navy text-sm font-semibold font-[Manrope] tracking-wide">Learn More</span>
              </div>
            </div>
          </div>

          <div className="w-full h-full min-h-[400px] max-h-[600px] bg-white border border-navy/10 rounded-2xl relative overflow-hidden flex items-center justify-center p-8 opacity-0 animate-fade-up delay-200 touch-none shadow-card hover:shadow-card-hover transition-shadow duration-500">
            <div className="absolute inset-0 opacity-40 bg-[linear-gradient(90deg,rgba(43,157,143,0.15)_1px,transparent_1px),linear-gradient(180deg,rgba(43,157,143,0.15)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            
            <div className="grid grid-cols-3 gap-4 w-full max-w-md relative z-10">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((box) => (
                <div 
                  key={box}
                  onMouseEnter={() => setHoverBox(box)}
                  onMouseLeave={() => setHoverBox(null)}
                  className={`aspect-square rounded-xl border-2 transition-all duration-300 cursor-crosshair flex items-end p-4 ${
                    hoverBox === box ? 'bg-navy border-navy scale-105' : 'bg-white border-teal/20 hover:border-teal/50'
                  }`}
                >
                   <div className={`${box % 2 === 0 ? 'w-2/3' : 'w-full'} h-2 rounded-full transition-colors duration-300 ${hoverBox === box ? 'bg-teal' : 'bg-navy/10'}`}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PartnersMarquee = () => (
  <section className="w-screen pt-20 pb-12 md:pb-20 border-b border-navy/10 bg-white overflow-hidden px-[3vw]">
    <div className="max-w-[120rem] mx-auto">
      <SectionInfo 
        num="02" 
        title="Trusted Partners Strip" 
        rationale="To borrow and amplify credibility through strategic association with key government bodies, industry leaders, and elite academic peers. Showing who trusts the platform validates the institution instantly before users dive into complex data."
      />
    </div>

    {/* Core Partners */}
    <div className="max-w-[120rem] mx-auto mt-10 mb-6">
      <span className="font-[Manrope] text-navy/70 text-xs md:text-sm font-bold uppercase tracking-[0.15em]">Core Partners</span>
    </div>
    <div className="flex overflow-hidden">
      <div className="flex animate-marquee hover-pause w-max">
        <div className="flex gap-8 md:gap-12 px-4 md:px-6 items-center flex-shrink-0">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={`core1-${i}`} className="w-40 md:w-56 h-20 md:h-24 bg-teal/10 backdrop-blur-md border border-teal/20 rounded-2xl shadow-sm flex items-center justify-center flex-shrink-0 hover:-translate-y-1 hover:shadow-glow-teal transition-all cursor-pointer p-4 md:p-6">
              <img src={`https://placehold.co/400x120/ffffff/1d3658?text=CORE+LOGO+${i}`} alt={`Core Partner ${i}`} className="w-full h-full object-contain mix-blend-multiply opacity-80" />
            </div>
          ))}
        </div>
        <div className="flex gap-8 md:gap-12 px-4 md:px-6 items-center flex-shrink-0">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={`core2-${i}`} className="w-40 md:w-56 h-20 md:h-24 bg-teal/10 backdrop-blur-md border border-teal/20 rounded-2xl shadow-sm flex items-center justify-center flex-shrink-0 hover:-translate-y-1 hover:shadow-glow-teal transition-all cursor-pointer p-4 md:p-6">
              <img src={`https://placehold.co/400x120/ffffff/1d3658?text=CORE+LOGO+${i}`} alt={`Core Partner ${i}`} className="w-full h-full object-contain mix-blend-multiply opacity-80" />
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Supporting Partners */}
    <div className="max-w-[120rem] mx-auto mt-12 mb-6">
      <span className="font-[Manrope] text-navy/50 text-xs md:text-sm font-bold uppercase tracking-[0.15em]">Supporting Partners</span>
    </div>
    <div className="flex overflow-hidden">
      <div className="flex animate-marquee hover-pause w-max" style={{ animationDirection: 'reverse' }}>
        <div className="flex gap-8 md:gap-12 px-4 md:px-6 items-center flex-shrink-0">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={`sup1-${i}`} className="w-32 md:w-48 h-16 md:h-20 bg-teal/10 backdrop-blur-md border border-teal/20 rounded-xl shadow-sm flex items-center justify-center flex-shrink-0 hover:-translate-y-1 hover:shadow-glow-teal transition-all cursor-pointer p-4">
              <img src={`https://placehold.co/300x100/ffffff/1d3658?text=PARTNER+${i}`} alt={`Supporting Partner ${i}`} className="w-full h-full object-contain mix-blend-multiply opacity-60" />
            </div>
          ))}
        </div>
        <div className="flex gap-8 md:gap-12 px-4 md:px-6 items-center flex-shrink-0">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={`sup2-${i}`} className="w-32 md:w-48 h-16 md:h-20 bg-teal/10 backdrop-blur-md border border-teal/20 rounded-xl shadow-sm flex items-center justify-center flex-shrink-0 hover:-translate-y-1 hover:shadow-glow-teal transition-all cursor-pointer p-4">
              <img src={`https://placehold.co/300x100/ffffff/1d3658?text=PARTNER+${i}`} alt={`Supporting Partner ${i}`} className="w-full h-full object-contain mix-blend-multiply opacity-60" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const RationaleSection = () => (
  <section className="w-screen py-16 md:py-24 lg:py-32 px-[3vw] bg-navy border-b border-navy-dark relative overflow-hidden">
    <div className="absolute inset-0 bg-dot-pattern-dark opacity-50"></div>
    <div className="max-w-[120rem] mx-auto relative z-10">
      <SectionInfo 
        num="03" 
        title="Institutional Rationale" 
        rationale="To provide the historical context, intellectual foundation, and deeper national mission driving the initiative. It shifts the narrative from 'what we do' to 'why our work is critically important for the future of India.' Placed here to bridge the gap between initial trust and hard metrics."
        dark={true}
      />
      
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-center mt-12">
        <div className="lg:col-span-5 w-full aspect-square md:aspect-[4/5] bg-navy-light rounded-2xl shadow-card border border-navy/10 relative overflow-hidden group">
           <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200" alt="Strategic Initiative" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" />
           <div className="absolute inset-0 bg-navy/40 group-hover:bg-transparent transition-colors duration-700"></div>
           <div className="absolute inset-0 bg-gradient-to-t from-navy to-transparent opacity-80"></div>
           <div className="absolute inset-0 bg-pink/20 transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-700 ease-out mix-blend-overlay"></div>
        </div>
        <div className="lg:col-span-7 flex flex-col items-start w-full">
          <ScrollReveal delay={0}>
          <p className="font-[Roboto] text-white/80 text-base md:text-lg leading-relaxed mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p className="font-[Roboto] text-white/80 text-base md:text-lg leading-relaxed mb-10 md:mb-12">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-8 w-full">
            {[1, 2].map((i, idx) => (
              <ScrollReveal key={i} delay={idx * 200}>
              <div className={`flex flex-col items-start p-6 rounded-2xl border shadow-card transition-all duration-500 hover:-translate-y-2 relative overflow-hidden group cursor-pointer ${idx === 0 ? 'bg-navy-light/40 border-teal/10 hover:shadow-glow-teal hover:border-teal/30' : 'bg-navy-light/40 border-pink/10 hover:shadow-glow-pink hover:border-pink/30'}`}>
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${idx === 0 ? 'bg-gradient-to-br from-teal/10 to-transparent' : 'bg-gradient-to-br from-pink/10 to-transparent'}`}></div>
                <div className={`relative z-10 w-12 h-12 rounded-lg mb-6 flex items-center justify-center text-white font-[Manrope] font-bold text-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-[0_4px_12px_rgba(242,132,130,0.3)] ${idx === 0 ? 'bg-teal shadow-[0_4px_12px_rgba(43,157,143,0.3)]' : 'bg-pink shadow-[0_4px_12px_rgba(242,132,130,0.3)]'}`}>{i}</div>
                <h3 className={`relative z-10 font-[Manrope] text-xl md:text-2xl font-bold mb-4 transition-colors duration-300 ${idx === 0 ? '!text-white group-hover:!text-teal' : '!text-white group-hover:!text-pink'}`}>Strategic Pillar {i}</h3>
                <p className="relative z-10 font-[Roboto] text-white/60 text-sm md:text-base leading-relaxed group-hover:text-white/80 transition-colors duration-300">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.</p>
              </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const InteractiveTimeline = () => {
  const [activeStage, setActiveStage] = useState(2);

  return (
    <section className="w-screen py-16 md:py-24 lg:py-32 px-[3vw] bg-navy border-b border-navy-dark relative bg-dot-pattern-dark">
      <div className="absolute inset-0 bg-navy/85"></div>
      <div className="max-w-[120rem] mx-auto relative z-10">
        
        <SectionInfo 
          num="04" 
          title="Project Roadmap" 
          rationale="To systematically categorize the massive, complex mandate into an actionable timeline. It ensures stakeholders immediately understand the progression from baseline setting and scenario building, all the way to policy integration and outreach."
          dark={true}
        />
        
        <div className="relative mt-16 md:mt-24">
          <div className="absolute top-8 md:top-10 left-0 w-full h-[2px] bg-navy-light hidden md:block"></div>
          
          <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-0 relative">
            {[0, 1, 2, 3, 4].map((stage) => (
              <div key={stage} className="flex-1 flex flex-row md:flex-col items-start md:items-center relative group cursor-pointer" onClick={() => setActiveStage(stage)}>
                <div className="absolute left-[31px] top-16 bottom-[-48px] w-[2px] bg-navy-light md:hidden"></div>

                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center border-4 transition-all duration-300 relative z-10 bg-navy flex-shrink-0 ${
                  activeStage === stage ? 'border-teal scale-110' : 
                  activeStage > stage ? 'border-teal/50 bg-navy-light' : 'border-navy-light hover:border-teal/40'
                }`}>
                  <span className={`font-[Manrope] font-extrabold text-xl md:text-2xl transition-colors ${activeStage === stage ? 'text-teal' : 'text-cream/30'}`}>{stage + 1}</span>
                </div>
                
                <div className={`ml-8 md:ml-0 md:mt-8 flex flex-col items-start md:items-center w-full transition-opacity duration-300 ${activeStage === stage ? 'opacity-100' : 'opacity-40 group-hover:opacity-70'}`}>
                  <h4 className="font-[Manrope] font-bold text-lg md:text-xl text-cream mb-2 md:mx-auto text-center">Phase {stage + 1}</h4>
                  <p className="font-[Roboto] text-xs md:text-sm text-cream/70 md:text-center leading-relaxed max-w-[160px] md:mx-auto">Lorem ipsum dolor sit amet elit tempor.</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 md:mt-32 p-8 md:p-12 border border-teal/20 bg-navy/60 rounded-2xl">
           <h3 className="font-[Manrope] font-bold text-2xl md:text-3xl text-cream mb-6">Phase {activeStage + 1} Deliverables</h3>
           <div className="grid md:grid-cols-2 gap-8 md:gap-16">
              <div className="flex flex-col">
                <p className="font-[Roboto] text-cream/80 text-sm md:text-base leading-relaxed mb-4">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
                </p>
                <p className="font-[Roboto] text-cream/80 text-sm md:text-base leading-relaxed">
                  Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit.
                </p>
              </div>
              <div className="flex flex-col gap-4 justify-center">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-lime rounded-full flex-shrink-0 shadow-[0_0_8px_rgba(167,201,87,0.5)]"></div>
                    <span className="font-[Roboto] text-cream/90 text-sm md:text-base">Key Milestone Outcome {i}</span>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

const SectorsGrid = () => (
  <section className="w-screen py-16 md:py-24 lg:py-32 px-[3vw] bg-white border-b border-navy/10">
    <div className="max-w-[120rem] mx-auto">
      
      <SectionInfo 
        num="05" 
        title="Core Focus Sectors" 
        rationale="To systematically break down the complex mandate into actionable and navigable domains. Policymakers and researchers arrive with specific agendas (e.g. Transport, Energy, Agriculture); this structural breakdown ensures they immediately find their relevant focus areas without cognitive overload."
      />
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12">
        {[1, 2, 3, 4, 5, 6].map((sector, idx) => (
          <ScrollReveal key={sector} delay={idx * 100}>
          <div className="group p-8 md:p-10 bg-white border border-navy/10 rounded-2xl hover:bg-navy transition-all duration-500 cursor-pointer flex flex-col h-[320px] md:h-[380px] active:scale-[0.98] shadow-card hover:shadow-glow-navy hover:-translate-y-2 relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-b from-teal/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
             <div className="relative z-10 w-16 h-16 md:w-20 md:h-20 bg-teal/10 rounded-xl mb-8 md:mb-12 group-hover:bg-teal/20 transition-transform duration-500 group-hover:scale-110 flex items-center justify-center">
               <div className="w-8 h-8 bg-teal/40 rounded-full group-hover:bg-teal transition-colors duration-300 shadow-[0_0_0_rgba(43,157,143,0)] group-hover:shadow-[0_0_15px_rgba(43,157,143,0.6)]"></div>
             </div>
             <h3 className="relative z-10 font-[Manrope] text-xl md:text-2xl font-bold text-navy mb-4 group-hover:!text-white transition-colors duration-300">Sector Domain {sector}</h3>
             <p className="relative z-10 font-[Roboto] text-navy/60 text-sm md:text-base leading-relaxed group-hover:text-white/80 transition-colors duration-300 mb-6">
               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
             </p>
             
             <div className="relative z-10 mt-auto flex items-center gap-4">
                <span className="font-[Manrope] text-teal/80 font-bold text-xs md:text-sm tracking-wide uppercase group-hover:text-teal transition-all duration-300 group-hover:translate-x-2">Explore Sector →</span>
             </div>
          </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

const DataPortalPreview = () => (
  <section className="w-screen py-16 md:py-24 lg:py-32 px-[3vw] bg-white border-b border-navy/10">
    <div className="max-w-[120rem] mx-auto">
      
      <SectionInfo 
        num="06" 
        title="Data & Analytics Preview" 
        rationale="To publicly flex the high-end computational and analytical capabilities of the platform. By previewing interactive datasets and modeling inputs, it proves the project possesses the rigorous technological infrastructure required to manage complex climate variables."
      />
      
      <div className="w-full bg-navy border border-navy/10 rounded-2xl shadow-xl overflow-hidden mt-12 flex flex-col min-h-[500px] md:min-h-[700px]">
        <div className="h-12 md:h-16 border-b border-white/5 flex items-center px-6 md:px-8 gap-4 bg-navy-dark">
          <div className="flex gap-2">
            <div className="w-3 h-3 md:w-4 md:h-4 bg-pink rounded-full"></div>
            <div className="w-3 h-3 md:w-4 md:h-4 bg-lime rounded-full"></div>
            <div className="w-3 h-3 md:w-4 md:h-4 bg-teal rounded-full"></div>
          </div>
          <div className="w-64 md:w-96 h-6 md:h-8 bg-black/20 rounded-lg mx-4 flex items-center px-3">
            <span className="font-[Roboto] text-white/30 text-xs">https://netzero.in/dashboard/interactive-model</span>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col md:flex-row p-6 md:p-8 gap-8 md:gap-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-dot-pattern-dark opacity-30"></div>
          <div className="w-full md:w-64 lg:w-80 flex flex-col gap-6 md:gap-8 flex-shrink-0 border-b md:border-b-0 md:border-r border-white/10 pb-8 md:pb-0 md:pr-8 relative z-10">
            <h4 className="font-[Manrope] font-bold text-white text-lg mb-2">Data Variables</h4>
            <div className="flex flex-col gap-4">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="flex items-center justify-between">
                  <span className="font-[Roboto] text-white/70 text-sm">Variable Input {i}</span>
                  <div className="px-2 py-1 bg-teal/10 text-teal text-xs font-bold rounded-md font-[Manrope]">{(i * 15)}%</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex-1 flex flex-col h-full min-h-[300px] md:min-h-0 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-6 md:gap-0">
               <div className="flex flex-col gap-2 w-full md:w-1/2">
                 <h2 className="font-[Manrope] font-extrabold text-white text-3xl md:text-4xl">Emissions Trajectory</h2>
                 <p className="font-[Roboto] text-white/50 text-sm md:text-base">Interactive modeling preview (2020 - 2050)</p>
               </div>
               <div className="flex flex-wrap gap-4">
                 <div className="px-4 py-2 bg-teal/10 text-teal font-[Manrope] font-bold text-xs md:text-sm rounded-lg flex items-center justify-center cursor-pointer">Baseline</div>
                 <div className="px-4 py-2 bg-pink text-white font-[Manrope] font-bold text-xs md:text-sm rounded-lg flex items-center justify-center cursor-pointer hover:bg-pink-dark transition-all hover:-translate-y-1 hover:shadow-card">NetZero</div>
               </div>
            </div>
            
            <div className="flex-1 w-full overflow-x-auto pb-4">
               <div className="min-w-[500px] h-full min-h-[200px] border-b border-l border-teal/20 flex items-end gap-2 md:gap-4 pt-12 pr-4">
                  {[40, 60, 30, 80, 50, 90, 70, 100, 85, 45].map((h, i) => (
                    <div key={i} className="flex-1 group h-full flex items-end cursor-pointer">
                       <div 
                         className="w-full bg-teal/20 group-hover:bg-teal transition-colors duration-300 rounded-t-lg"
                         style={{ height: `${h}%` }}
                       ></div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const PublicationsGrid = () => (
  <section className="w-screen py-16 md:py-24 lg:py-32 px-[3vw] bg-white border-b border-navy/10">
    <div className="max-w-[120rem] mx-auto">
      
      <SectionInfo 
        num="07" 
        title="Knowledge Hub & Publications" 
        rationale="To distribute the primary intellectual payload of the project. This acts as the central dissemination point for peer-reviewed papers, policy briefs, and working models that fundamentally influence market design and directives."
      />
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-12">
        {[1, 2, 3, 4].map((item, idx) => (
          <ScrollReveal key={item} delay={idx * 150}>
          <div className="flex flex-col group cursor-pointer bg-white p-4 md:p-5 rounded-2xl border border-navy/10 shadow-card hover:shadow-glow-navy transition-all duration-500 hover:-translate-y-2 active:scale-[0.98] relative overflow-hidden h-full">
            <div className="absolute inset-0 bg-gradient-to-t from-navy/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <div className="relative z-10 w-full aspect-[4/3] bg-navy/5 rounded-xl mb-6 md:mb-8 group-hover:bg-navy/10 transition-colors border border-navy/10 flex items-center justify-center overflow-hidden">
              <span className="text-navy/20 font-[Manrope] font-bold group-hover:scale-110 transition-transform duration-500">Image Placeholder</span>
            </div>
            <span className="relative z-10 font-[Manrope] text-lime font-bold text-[10px] md:text-xs uppercase tracking-widest mb-3 group-hover:text-teal transition-colors duration-300">Policy Brief</span>
            <h4 className="relative z-10 font-[Manrope] font-bold text-navy text-lg md:text-xl leading-tight mb-4 group-hover:text-teal-dark transition-colors duration-300">
              Lorem ipsum dolor sit amet consectetur adipiscing elit
            </h4>
            <span className="relative z-10 font-[Roboto] text-navy/50 text-xs md:text-sm mt-auto group-hover:text-navy/80 transition-colors duration-300">October 12, 2026 • 5 min read</span>
          </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

const PreFooter = () => (
  <section className="relative w-screen py-20 md:py-32 lg:py-40 px-[3vw] bg-white border-b border-navy/10 overflow-hidden">
    <div className="absolute inset-0 bg-dot-pattern opacity-20"></div>
    
    <div className="max-w-[120rem] mx-auto flex flex-col items-center text-center relative z-10">
      <SectionInfo 
        num="08" 
        title="Final Call To Action (Pre-Footer)" 
        rationale="To capture high-intent users who have completed the digital journey. Designed to turn convinced stakeholders into active subscribers, newsletter readers, or collaborative partners."
      />
      <ScrollReveal delay={100} className="w-full flex justify-center">
      <div className="mt-12 flex flex-col items-center w-full max-w-4xl bg-white p-12 md:p-20 rounded-3xl shadow-card hover:shadow-card-hover transition-shadow duration-500 border border-navy/5">
        <div className="w-20 h-20 md:w-24 md:h-24 bg-pink rounded-2xl mb-8 flex items-center justify-center shadow-[0_6px_20px_rgba(242,132,130,0.35)] animate-pulse">
          <span className="text-white font-[Manrope] font-bold text-3xl">NZI</span>
        </div>
        <h2 className="font-[Manrope] font-extrabold text-navy text-3xl md:text-5xl tracking-tight mb-6 text-center">
          Ready to explore the pathways?
        </h2>
        <p className="font-[Roboto] text-navy/70 text-base md:text-lg mb-10 max-w-xl text-center leading-relaxed">
          Join the conversation and access full datasets, methodology reports, and interactive modeling tools.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
          <button className="w-full sm:w-64 h-14 md:h-16 bg-white border border-navy/15 rounded-lg text-navy font-[Manrope] font-bold hover:bg-cream transition-all duration-300 hover:-translate-y-1 hover:shadow-card flex items-center justify-center">
            View Documentation
          </button>
          <button className="w-full sm:w-48 h-14 md:h-16 bg-pink text-white rounded-lg font-[Manrope] font-bold hover:bg-pink-dark transition-all duration-300 hover:-translate-y-1 hover:shadow-card flex items-center justify-center">
            Contact PMU
          </button>
        </div>
      </div>
      </ScrollReveal>
    </div>
  </section>
);

const AboutPage = () => (
  <div className="w-full animate-fade-up">
    <section className="w-screen py-16 md:py-24 lg:py-32 px-[3vw] bg-white border-b border-navy/10 pt-32 md:pt-40">
      <div className="max-w-[120rem] mx-auto">
        <SectionInfo num="A1" title="About: Mission & Methodology" rationale="Explains the 'why' and 'how' of NZI. Details the integrated modelling framework and the complex methodologies used to generate the scenarios." />
        
        <div className="mt-12 mb-16">
          <h2 className="font-[Manrope] font-extrabold text-navy text-3xl sm:text-4xl md:text-5xl leading-tight mb-8 max-w-3xl">Pioneering Data-Driven Climate Strategies</h2>
          <p className="font-[Roboto] text-navy/70 text-lg md:text-xl leading-relaxed mb-4 max-w-4xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
          <p className="font-[Roboto] text-navy/70 text-lg md:text-xl leading-relaxed mb-16 max-w-3xl">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        </div>
        
        <div className="w-full aspect-square md:aspect-[21/9] bg-teal/5 rounded-2xl border border-teal/10 flex items-center justify-center mb-12 shadow-sm relative overflow-hidden group">
           <div className="absolute inset-0 bg-dot-pattern opacity-50"></div>
           <div className="relative z-10 flex flex-col items-center gap-6">
             <div className="px-8 py-4 bg-navy text-cream font-[Manrope] font-bold text-lg rounded-xl shadow-lg">Integrated Model Framework</div>
             <div className="flex gap-4 md:gap-12 flex-col md:flex-row">
               <div className="px-6 py-3 bg-teal/10 text-teal font-[Manrope] font-bold text-sm rounded-lg border border-teal/20">Macro-Economic Scenarios</div>
               <div className="px-6 py-3 bg-lime/10 text-lime-dark font-[Manrope] font-bold text-sm rounded-lg border border-lime/20">Energy Systems Analysis</div>
             </div>
           </div>
        </div>
      </div>
    </section>

    <section className="w-screen py-16 md:py-24 lg:py-32 px-[3vw] bg-navy border-b border-navy-dark bg-dot-pattern-dark relative">
      <div className="absolute inset-0 bg-navy/85"></div>
      <div className="max-w-[120rem] mx-auto relative z-10">
        <SectionInfo num="A4" title="Institutional History & Vision" rationale="Provides the timeline of the project's inception and its long-term strategic vision leading up to the 2070 goals." dark={true} />
        <div className="grid lg:grid-cols-2 gap-16 mt-12">
          <div className="flex flex-col gap-6">
            <h3 className="font-[Manrope] font-bold text-cream text-2xl md:text-3xl mb-4">A Decade of Climate Action</h3>
            <p className="font-[Roboto] text-cream/70 text-sm md:text-base leading-relaxed mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.</p>
            <p className="font-[Roboto] text-cream/70 text-sm md:text-base leading-relaxed mb-8">Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa.</p>
            
            <h4 className="font-[Manrope] font-bold text-teal text-xl md:text-2xl mb-4">Looking to 2070</h4>
            <p className="font-[Roboto] text-teal/80 text-sm md:text-base leading-relaxed">Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod dui, eu pulvinar nunc sapien ornare nisl.</p>
          </div>
          <div className="flex flex-col gap-8 border-l-2 border-navy-dark pl-8 md:pl-12">
            {[1, 2, 3].map(i => (
              <div key={i} className="relative">
                <div className="absolute -left-[41px] md:-left-[57px] top-0 w-4 h-4 rounded-full bg-teal-dark border-4 border-neutral-900"></div>
                <span className="font-[Manrope] text-teal font-bold text-sm tracking-widest uppercase mb-2 block">202{i} Milestone</span>
                <h5 className="font-[Manrope] text-cream font-bold text-lg mb-2">Major Institutional Achievement {i}</h5>
                <p className="font-[Roboto] text-cream/60 text-sm">Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor.</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <InteractiveTimeline />

    <section className="w-screen py-16 md:py-24 lg:py-32 px-[3vw] bg-white border-b border-navy/10">
      <div className="max-w-[120rem] mx-auto">
        <SectionInfo num="A5" title="Partners & Funders" rationale="Highlights the consortium of academic, governmental, and financial institutions supporting the initiative." />

        {/* Core Partners */}
        <h3 className="font-[Manrope] text-navy/70 text-xs md:text-sm font-bold uppercase tracking-[0.15em] mt-12 mb-4">Core Partners</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
          {[1, 2, 3, 4, 5].map((i, idx) => (
            <ScrollReveal key={`core-${i}`} delay={idx * 100}>
            <div className="aspect-video bg-teal/10 backdrop-blur-md border border-teal/20 rounded-xl flex items-center justify-center p-6 hover:bg-teal/20 hover:border-teal/30 hover:shadow-sm transition-all duration-500 hover:-translate-y-2 cursor-pointer relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
               <span className="relative z-10 font-[Manrope] font-bold text-navy/80 text-sm uppercase tracking-widest text-center group-hover:text-teal-dark transition-colors duration-500">Core Partner {i}</span>
            </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Supporting Partners */}
        <h3 className="font-[Manrope] text-navy/50 text-xs md:text-sm font-bold uppercase tracking-[0.15em] mt-10 mb-4">Supporting Partners</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
          {[1, 2, 3, 4, 5].map((i, idx) => (
            <ScrollReveal key={`sup-${i}`} delay={idx * 100}>
            <div className="aspect-video bg-teal/10 backdrop-blur-md border border-teal/20 rounded-xl flex items-center justify-center p-6 hover:bg-teal/20 hover:border-teal/30 hover:shadow-sm transition-all duration-500 hover:-translate-y-2 cursor-pointer relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
               <span className="relative z-10 font-[Manrope] font-bold text-navy/80 text-sm uppercase tracking-widest text-center group-hover:text-teal-dark transition-colors duration-500">Supporting Partner {i}</span>
            </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    <section className="w-screen py-16 md:py-24 lg:py-32 px-[3vw] bg-white border-b border-navy/10">
      <div className="max-w-[120rem] mx-auto">
        <SectionInfo num="A6" title="Annual Compendiums & Governance" rationale="Creates extreme transparency. Allowing users to download annual impact reports shows the PMU operates with high institutional accountability." />
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white p-8 rounded-2xl border border-navy/10 flex flex-col gap-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex justify-between items-start">
                 <div className="w-16 h-20 bg-navy/5 rounded-lg border border-navy/10 flex items-center justify-center"><span className="text-[10px] text-navy/40 font-[Manrope]">PDF</span></div>
                 <div className="px-3 py-1 bg-teal/10 text-teal text-xs font-[Manrope] font-bold rounded-full">202{i}</div>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="font-[Manrope] font-bold text-navy text-lg leading-tight">Annual Impact Compendium Volume {i}</h4>
              </div>
              <div className="mt-auto w-full h-12 bg-navy hover:bg-navy-light transition-colors rounded-lg flex items-center justify-center cursor-pointer">
                 <span className="font-[Manrope] font-bold text-white text-sm">Download Report</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="w-screen py-16 md:py-24 lg:py-32 px-[3vw] bg-white border-b border-navy/10">
      <div className="max-w-[120rem] mx-auto flex flex-col md:flex-row gap-12 lg:gap-24">
        <div className="w-full md:w-1/3">
          <SectionInfo num="A7" title="Careers & Fellowships" rationale="Attracts top-tier academic and operational talent. A dedicated job board shows the institution is growing and well-funded." />
          <p className="font-[Roboto] text-navy/70 text-base leading-relaxed mb-8 mt-4">
            We are constantly looking for brilliant minds to join our research and operations teams. Explore our current open positions.
          </p>
          <button className="px-6 py-3 bg-navy text-white font-[Manrope] font-bold rounded-lg hover:bg-navy-light transition-colors">View All Openings</button>
        </div>
        <div className="w-full md:w-2/3 flex flex-col gap-4 mt-8 md:mt-0">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="p-6 border border-teal/10 rounded-xl bg-teal/5 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:bg-teal/10 hover:border-teal/30 hover:shadow-sm transition-all cursor-pointer group hover:-translate-y-1">
              <div className="flex flex-col gap-2">
                <h5 className="font-[Manrope] font-bold text-navy text-lg group-hover:text-teal-dark transition-colors">Senior Climate Modeler</h5>
                <div className="flex gap-4">
                   <span className="font-[Roboto] text-navy/50 text-xs">New Delhi, India</span>
                   <span className="font-[Roboto] text-navy/50 text-xs">Full-time</span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-teal/10 flex items-center justify-center group-hover:bg-teal transition-colors text-teal group-hover:text-white flex-shrink-0">→</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="w-screen py-16 md:py-24 lg:py-32 px-[3vw] bg-navy border-b border-navy-dark">
      <div className="max-w-[120rem] mx-auto">
        <SectionInfo num="A8" title="Fieldwork & Facility Gallery" rationale="Humanizes the data. Showing researchers in the field, state-of-the-art server rooms, or stakeholder consultations proves real-world physical activity." dark={true} />
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 mt-12 space-y-6">
           {[300, 450, 250, 400, 300, 500].map((height, i) => {
             const galleryImages = [
               'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
               'https://images.unsplash.com/photo-1472214103451-9374bd1c798e',
               'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f',
               'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09',
               'https://images.unsplash.com/photo-1470071131384-001b85755b36',
               'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1'
             ];
             return (
             <div key={i} className="w-full bg-navy-light rounded-xl border border-teal-dark/30 overflow-hidden relative group cursor-pointer shadow-sm hover:shadow-glow-teal transition-all duration-500" style={{ height: `${height}px` }}>
               <img src={`${galleryImages[i]}?auto=format&fit=crop&q=80&w=800`} alt="Gallery" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 mix-blend-overlay" />
               <div className="absolute inset-0 flex items-center justify-center bg-navy/0 group-hover:bg-navy/40 transition-colors duration-500 z-10">
                  <span className="font-[Manrope] text-white opacity-0 group-hover:opacity-100 transition-opacity font-bold drop-shadow-md">View Gallery</span>
               </div>
             </div>
           )})}
        </div>
      </div>
    </section>
  </div>
);

const KnowledgeHubPage = () => (
  <div className="w-full animate-fade-up">
    <section className="w-screen py-16 md:py-24 lg:py-32 px-[3vw] bg-white border-b border-navy/10 pt-32 md:pt-40">
      <div className="max-w-[120rem] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20">
        <div className="w-full lg:w-64 flex-shrink-0 flex flex-col gap-4">
           <h3 className="font-[Manrope] font-bold text-navy text-2xl md:text-3xl mb-6">Sectors</h3>
           {['Energy Supply', 'Transport', 'Industry', 'Agriculture', 'Forestry', 'Residential'].map((sector, i) => (
             <div key={sector} className={`w-full h-12 rounded-lg border flex items-center px-4 cursor-pointer transition-colors ${i === 0 ? 'bg-navy border-neutral-900' : 'bg-white border-navy/10 hover:bg-teal/10'}`}>
                <span className={`font-[Manrope] font-bold text-sm ${i === 0 ? 'text-white' : 'text-teal'}`}>{sector}</span>
             </div>
           ))}
        </div>
        
        <div className="flex-1">
          <SectionInfo num="K1" title="Sectoral Deep Dive" rationale="Organizes complex publications into digestible topics without overwhelming the user." />
          
          <div className="mt-12">
            <h2 className="font-[Manrope] font-extrabold text-navy text-3xl md:text-4xl leading-tight mb-6 max-w-2xl">Energy Transition Dynamics</h2>
            <p className="font-[Roboto] text-navy/70 text-base md:text-lg leading-relaxed mb-12 max-w-3xl">Comprehensive analysis of renewable integration, grid stability models, and demand-side management forecasts through 2070.</p>
            
            <div className="w-full h-64 md:h-96 bg-white rounded-2xl border border-navy/10 flex items-end gap-2 md:gap-4 p-6 md:p-8 mb-12 shadow-sm">
               {[40, 70, 50, 90, 60, 80, 100, 75, 45, 85].map((h, i) => (
                  <div key={i} className="flex-1 bg-navy/10 hover:bg-navy-light transition-colors rounded-t-lg cursor-pointer" style={{ height: `${h}%` }}></div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="w-screen py-16 md:py-24 lg:py-32 px-[3vw] bg-navy border-b border-navy-dark bg-dot-pattern-dark relative">
      <div className="absolute inset-0 bg-navy/85"></div>
      <div className="max-w-[120rem] mx-auto relative z-10">
        <SectionInfo num="K2" title="Interactive Scenario Comparison" rationale="Allows researchers to toggle between 'Baseline' and 'Net Zero 2070' scenarios side-by-side, providing immediate visual impact of policy changes." dark={true} />
        
        <div className="bg-navy-light border border-teal-dark/30 rounded-2xl p-6 md:p-10 mt-12 flex flex-col lg:flex-row gap-8">
           <div className="flex-1 flex flex-col gap-6">
             <div className="flex justify-between items-center bg-navy p-4 rounded-xl border border-teal-dark/30">
                 <span className="font-[Manrope] font-bold text-navy/40 text-sm uppercase tracking-widest">Scenario</span>
                 <div className="px-3 py-1 bg-navy-light text-cream text-sm font-[Manrope] font-bold rounded-md">Baseline</div>
             </div>
             <div className="w-full h-64 bg-navy/50 rounded-xl border border-teal-dark/30 border-dashed flex items-end p-4 gap-2">
                {[30, 40, 50, 60, 70].map((h, i) => <div key={i} className="flex-1 bg-teal-dark rounded-t-sm" style={{height: `${h}%`}}></div>)}
             </div>
           </div>
           
           <div className="hidden lg:flex flex-col items-center justify-center px-4">
             <div className="w-10 h-10 rounded-full bg-navy-light flex items-center justify-center border-4 border-navy-dark z-10 text-white font-bold text-xs">VS</div>
             <div className="w-0.5 h-full bg-navy-light absolute"></div>
           </div>

           <div className="flex-1 flex flex-col gap-6">
             <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-navy/10">
                 <span className="font-[Manrope] font-bold text-navy text-sm uppercase tracking-widest">Scenario</span>
                 <div className="px-3 py-1 bg-navy/10 text-navy text-sm font-[Manrope] font-bold rounded-md">NetZero</div>
             </div>
             <div className="w-full h-64 bg-navy/50 rounded-xl border border-teal-dark/30 border-dashed flex items-end p-4 gap-2">
                {[30, 25, 20, 15, 5].map((h, i) => <div key={i} className="flex-1 bg-white rounded-t-sm" style={{height: `${h}%`}}></div>)}
             </div>
           </div>
        </div>
      </div>
    </section>

    <section className="w-screen py-16 md:py-24 lg:py-32 px-[3vw] bg-white border-b border-navy/10">
      <div className="max-w-[120rem] mx-auto">
        <SectionInfo num="K3" title="Actionable Policy Briefs" rationale="Distills 100-page academic papers into 2-page executive summaries for government officials who need rapid, actionable insights." />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="p-6 border border-navy/10 rounded-xl bg-cream hover:bg-white hover:border-navy/30 transition-all shadow-sm group cursor-pointer flex flex-col h-full">
               <div className="w-12 h-12 bg-navy/10 rounded-lg mb-6 flex items-center justify-center group-hover:bg-navy transition-colors text-navy/40 group-hover:text-cream">
                  <span className="font-[Manrope] text-[10px] font-bold">DOC</span>
               </div>
               <h4 className="font-[Manrope] font-bold text-navy text-lg leading-tight mb-4 group-hover:text-teal transition-colors">Policy Briefing {i}: Sector Guidelines</h4>
               <p className="font-[Roboto] text-navy/60 text-xs md:text-sm mb-8 leading-relaxed">Summary of key strategic actions required for this sector.</p>
               <div className="mt-auto flex justify-between items-center border-t border-navy/10 pt-4">
                  <span className="font-[Manrope] font-bold text-navy text-xs uppercase tracking-wider">Read Brief</span>
                  <div className="w-6 h-6 rounded-full bg-navy/10 flex items-center justify-center text-[10px] text-navy font-bold">→</div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="w-screen py-16 md:py-24 lg:py-32 px-[3vw] bg-white border-b border-navy/10">
      <div className="max-w-[120rem] mx-auto flex flex-col lg:flex-row gap-16">
         <div className="w-full lg:w-1/3">
            <SectionInfo num="K4" title="Methodology & Assumptions" rationale="Provides absolute transparency to academic peers. By publishing the exact mathematical assumptions and models used, NZI defends itself against critique." />
         </div>
         <div className="w-full lg:w-2/3 flex flex-col gap-4 mt-8 lg:mt-0">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="bg-white border border-navy/10 rounded-xl p-6 flex justify-between items-center cursor-pointer hover:border-navy/30 transition-colors">
                 <div className="flex flex-col gap-2 w-3/4">
                     <h4 className="font-[Manrope] font-bold text-navy text-base md:text-lg">Methodology Document {i}</h4>
                     <span className="font-[Roboto] text-navy/50 text-xs md:text-sm">Technical Specifications & Assumptions</span>
                 </div>
                 <div className="w-8 h-8 rounded-full bg-teal/10 flex items-center justify-center text-teal text-xs">↓</div>
              </div>
            ))}
         </div>
      </div>
    </section>

    <section className="w-screen py-16 md:py-24 lg:py-32 px-[3vw] bg-white border-b border-navy/10">
      <div className="max-w-[120rem] mx-auto">
        <SectionInfo num="K5" title="Case Studies & Real-world Applications" rationale="Bridges the gap between theoretical modeling and practical implementation by showcasing specific regional or sectoral success stories." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex flex-col group cursor-pointer">
              <div className="w-full aspect-[4/3] bg-teal/10 border border-navy/10 rounded-xl mb-6 group-hover:bg-navy/10 transition-colors overflow-hidden relative shadow-sm group-hover:shadow-md">
                 <img src={`https://images.unsplash.com/photo-${i === 1 ? '1464822759023-fed622ff2c3b' : i === 2 ? '1542601906990-b4d3fb778b09' : '1518173946687-a4c8892bbd9f'}?auto=format&fit=crop&q=80&w=800`} alt="Case Study" className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" />
              </div>
              <span className="font-[Manrope] text-navy/50 font-bold text-xs tracking-widest uppercase mb-4">Case Study {i}</span>
              <h3 className="font-[Manrope] font-bold text-navy text-xl md:text-2xl leading-tight mb-4 group-hover:text-teal transition-colors">Implementation in Region {i}</h3>
              <p className="font-[Roboto] text-navy/70 text-sm md:text-base leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem. Aliquam erat volutpat.</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="w-screen py-16 md:py-24 lg:py-32 px-[3vw] bg-white border-b border-navy/10">
      <div className="max-w-[120rem] mx-auto">
        <SectionInfo num="K6" title="Working Papers & Pre-prints" rationale="The repository for all formal, peer-reviewed literature and high-level summaries generated by the project before official publication." />
        <div className="flex flex-col gap-4 mt-12">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white p-6 md:p-8 rounded-xl border border-navy/10 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-navy/30 transition-colors group cursor-pointer shadow-sm">
              <div className="flex flex-col gap-3 flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2 py-1 bg-navy/10 rounded-md font-[Roboto] text-navy/60 text-[10px] uppercase tracking-wider">Working Paper</span>
                  <span className="px-2 py-1 bg-navy/10 rounded-md font-[Roboto] text-navy/60 text-[10px] uppercase tracking-wider">Peer Review</span>
                </div>
                <h4 className="font-[Manrope] font-bold text-navy text-xl md:text-2xl leading-tight">Integrated Assessment of Carbon Pricing Mechanisms in South Asia</h4>
                <p className="font-[Roboto] text-navy/50 text-sm">Sharma, R., Gupta, A., & Patel, M. — NZI Working Paper Series WP-2024-0{i}</p>
              </div>
              <button className="w-full md:w-40 h-12 bg-teal/10 group-hover:bg-navy rounded-lg flex items-center justify-center flex-shrink-0 transition-colors">
                <span className="font-[Manrope] font-bold text-navy/60 text-xs group-hover:text-cream transition-colors">Download</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="w-screen py-16 md:py-24 lg:py-32 px-[3vw] bg-navy border-b border-navy-dark">
      <div className="max-w-[120rem] mx-auto">
        <SectionInfo num="K7" title="Training & Capacity Building" rationale="Provides educational resources, workshop recordings, and tutorials to ensure external researchers know how to utilize the platform's complex models." dark={true} />
        <div className="grid md:grid-cols-3 gap-8 mt-12">
           {[1, 2, 3].map(i => (
             <div key={i} className="flex flex-col group cursor-pointer">
               <div className="w-full aspect-video bg-navy-light rounded-xl border border-teal-dark/30 flex items-center justify-center mb-6 group-hover:border-teal transition-all duration-500 overflow-hidden relative shadow-sm">
                  <img src={`https://images.unsplash.com/photo-${i === 1 ? '1516321318423-f06f85e504b3' : i === 2 ? '1524178232363-1fb2b075b655' : '1531482615713-2afd69097998'}?auto=format&fit=crop&q=80&w=800`} alt="Training Video" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                  <div className="w-16 h-16 rounded-full bg-teal-dark/50 border border-teal/40 flex items-center justify-center relative z-10 backdrop-blur-sm group-hover:bg-teal group-hover:scale-110 transition-all duration-300 shadow-[0_0_15px_rgba(43,157,143,0.3)]">
                    <div className="w-0 h-0 border-t-8 border-t-transparent border-l-[12px] border-l-white border-b-8 border-b-transparent ml-1"></div>
                  </div>
               </div>
               <h4 className="font-[Manrope] font-bold text-white text-lg mb-2 group-hover:text-teal transition-colors">Introduction to NZI Modeling Tools</h4>
               <p className="font-[Roboto] text-cream/50 text-sm mb-4">Learn the fundamentals of scenario analysis with our integrated platform.</p>
               <span className="font-[Roboto] text-teal text-xs uppercase tracking-widest">45 min • Beginner</span>
             </div>
           ))}
        </div>
      </div>
    </section>
  </div>
);

const EngagementPage = () => (
  <div className="w-full animate-fade-up">
    {/* F1: Global Network Map */}
    <section className="w-screen py-16 md:py-24 lg:py-32 px-[3vw] bg-navy border-b border-navy-dark pt-32 md:pt-40 relative overflow-hidden bg-dot-pattern-dark">
      {/* Animated globe/network placeholder */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
        <div className="w-[800px] h-[800px] rounded-full border border-teal-dark/30 animate-[spin_60s_linear_infinite]"></div>
        <div className="absolute w-[600px] h-[600px] rounded-full border border-teal/40 border-dashed animate-[spin_40s_linear_infinite_reverse]"></div>
        <div className="absolute w-[400px] h-[400px] rounded-full border border-teal animate-[spin_20s_linear_infinite]"></div>
      </div>
      <div className="max-w-[120rem] mx-auto relative z-10">
        <SectionInfo num="F1" title="Global Frontier Network" rationale="Demonstrates NZI's international reach. Visualizing the network proves that India's net-zero pathways are being developed in collaboration with top global institutions." dark={true} />
        <div className="mt-16 w-full h-[500px] md:h-[600px] bg-navy rounded-3xl border border-navy-dark relative overflow-hidden flex items-center justify-center shadow-2xl group">
           <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600" alt="Global Network Map" className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-screen group-hover:opacity-40 group-hover:scale-105 transition-all duration-1000" />
           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-navy/50 to-navy"></div>
           {/* Nodes */}
           {[
             {t:'20%', l:'30%'}, {t:'50%', l:'20%'}, {t:'40%', l:'50%'}, {t:'70%', l:'60%'}, {t:'30%', l:'75%'}, {t:'60%', l:'80%'}
           ].map((pos, i) => (
              <div key={i} className="absolute w-4 h-4 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)] z-20 group cursor-pointer hover:scale-125 transition-transform" style={{top: pos.t, left: pos.l}}>
                <div className="absolute w-full h-full bg-white rounded-full animate-ping opacity-75"></div>
                {/* Tooltip on node */}
                 <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-navy-light border border-teal-dark/30 p-2 rounded-lg flex flex-col gap-1 min-w-24 w-max shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="font-[Manrope] text-white font-bold text-[10px]">Global Node {i+1}</span>
                    <span className="font-[Roboto] text-teal text-[8px] uppercase tracking-wider">Active Region</span>
                 </div>
              </div>
           ))}
           {/* Connecting lines */}
           <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
             <path d="M 30% 20% L 50% 40% L 75% 30%" stroke="#525252" strokeWidth="2" strokeDasharray="5,5" fill="none" className="animate-[dash_20s_linear_infinite]" />
             <path d="M 20% 50% L 50% 40% L 60% 70% L 80% 60%" stroke="#525252" strokeWidth="2" strokeDasharray="5,5" fill="none" className="animate-[dash_20s_linear_infinite]" />
           </svg>
        </div>
      </div>
    </section>
    
    {/* F2: Fellowships & Scholars Grid */}
    <section className="w-screen py-16 md:py-24 lg:py-32 px-[3vw] bg-white border-b border-navy/10">
      <div className="max-w-[120rem] mx-auto">
        <SectionInfo num="F2" title="Global Fellowships & Exchange" rationale="Showcases tangible opportunities. Attracts top-tier researchers and students globally to contribute to the NZI mandate." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
           {[1, 2, 3, 4, 5, 6].map((i, idx) => (
             <ScrollReveal key={i} delay={idx * 100}>
             <div className="group flex flex-col bg-white border border-navy/10 rounded-2xl shadow-card p-8 hover:bg-navy hover:shadow-glow-navy transition-all duration-500 hover:-translate-y-2 cursor-pointer active:scale-[0.98] relative overflow-hidden h-full">
                 <div className="absolute inset-0 bg-gradient-to-b from-teal/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                 <div className="relative z-10 w-16 h-16 rounded-full bg-navy/10 group-hover:bg-navy-light transition-colors duration-500 mb-8 border-4 border-white group-hover:border-teal-dark/30 shadow-sm flex items-center justify-center overflow-hidden">
                    <span className="font-[Manrope] text-[10px] text-navy/40 group-hover:text-cream/40 font-bold group-hover:scale-110 transition-transform duration-500">ICON</span>
                 </div>
                 <h4 className="relative z-10 font-[Manrope] font-bold text-navy text-lg md:text-xl mb-4 group-hover:!text-white transition-colors duration-300">Fellowship Program {i}</h4>
                 <p className="relative z-10 font-[Roboto] text-navy/60 text-xs md:text-sm mb-8 leading-relaxed group-hover:text-white/80 transition-colors duration-300">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.</p>
                 <div className="relative z-10 mt-auto pt-6 border-t border-navy/10 group-hover:border-navy-dark transition-colors duration-300 flex justify-between items-center">
                    <span className="font-[Manrope] font-bold text-navy text-xs uppercase tracking-widest group-hover:text-white transition-all duration-300 group-hover:translate-x-2">Apply Now</span>
                    <div className="w-8 h-8 rounded-full bg-navy/10 group-hover:bg-teal group-hover:text-white group-hover:shadow-[0_0_10px_rgba(43,157,143,0.5)] transition-all duration-300 flex items-center justify-center text-navy font-bold text-[10px]">→</div>
                 </div>
             </div>
             </ScrollReveal>
           ))}
        </div>
      </div>
    </section>

    {/* F3: Joint Sandboxes */}
    <section className="w-screen py-16 md:py-24 lg:py-32 px-[3vw] bg-teal/10 border-b border-navy/10">
      <div className="max-w-[120rem] mx-auto flex flex-col lg:flex-row gap-16 items-center">
         <div className="w-full lg:w-1/2">
            <SectionInfo num="F3" title="Cross-Border Sandboxes" rationale="Highlights joint technical projects. Proves that NZI acts as a testing ground for experimental policies in collaboration with international labs." />
            <p className="font-[Roboto] text-navy/70 text-lg md:text-xl leading-relaxed mt-8 mb-8 max-w-xl">
              Collaborative research environments where experimental policies are tested in real-time scenarios alongside international climate laboratories.
            </p>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-navy text-white font-[Manrope] font-bold rounded-lg hover:bg-navy-light transition-colors">Join Sandbox</button>
              <button className="px-6 py-3 bg-white text-navy font-[Manrope] font-bold rounded-lg border border-navy/15 hover:bg-cream transition-colors">Learn More</button>
            </div>
         </div>
         <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((box, idx) => (
              <div key={box} className={`aspect-square rounded-2xl p-6 flex flex-col justify-end ${idx === 0 || idx === 3 ? 'bg-navy text-white' : 'bg-white border border-navy/10 shadow-sm'}`}>
                 <div className={`w-10 h-10 rounded-lg mb-auto flex items-center justify-center ${idx === 0 || idx === 3 ? 'bg-navy-light' : 'bg-navy/10'}`}>
                    <span className={`font-[Manrope] font-bold text-[10px] ${idx === 0 || idx === 3 ? 'text-white/40' : 'text-navy/40'}`}>0{idx+1}</span>
                 </div>
                 <h5 className={`font-[Manrope] font-bold text-sm md:text-base mb-1 ${idx === 0 || idx === 3 ? 'text-white' : 'text-navy'}`}>Sandbox Initiative {idx+1}</h5>
                 <span className={`font-[Roboto] text-xs ${idx === 0 || idx === 3 ? 'text-teal' : 'text-navy/50'}`}>Active Project</span>
              </div>
            ))}
         </div>
      </div>
    </section>

    {/* F4: Scholar Directory Table */}
    <section className="w-screen py-16 md:py-24 lg:py-32 px-[3vw] bg-white border-b border-navy/10">
      <div className="max-w-[120rem] mx-auto">
         <SectionInfo num="F4" title="Global Scholar Directory" rationale="A functional database of all researchers involved. Builds transparency and encourages direct academic networking." />
         <div className="w-full border border-navy/10 rounded-2xl shadow-sm overflow-hidden mt-12">
           <div className="bg-cream px-6 py-4 border-b border-navy/10 flex justify-between items-center">
              <div className="flex bg-white px-3 py-1.5 border border-navy/10 rounded-lg items-center gap-2 text-navy/40 font-[Roboto] text-sm"><span className="text-xs">🔍</span> Search Scholars...</div>
              <div className="flex gap-2">
                <div className="px-3 py-1.5 bg-white border border-navy/10 rounded-lg font-[Manrope] font-bold text-navy text-xs">Filter</div>
                <div className="px-3 py-1.5 bg-white border border-navy/10 rounded-lg font-[Manrope] font-bold text-navy text-xs">Sort</div>
              </div>
           </div>
           <div className="flex flex-col divide-y divide-neutral-100">
             {[1, 2, 3, 4, 5].map(row => (
               <div key={row} className="px-6 py-5 flex items-center justify-between hover:bg-cream transition-colors cursor-pointer group">
                  <div className="flex items-center gap-6 w-1/3">
                    <div className="w-10 h-10 bg-navy/10 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden border border-navy/5">
                      <span className="font-[Manrope] text-navy/30 text-[8px] font-bold">PIC</span>
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                      <span className="font-[Manrope] font-bold text-navy text-sm md:text-base">Dr. Researcher Name {row}</span>
                      <span className="font-[Roboto] text-navy/50 text-xs">Climate Economist</span>
                    </div>
                  </div>
                  <div className="w-1/4 hidden md:flex flex-col gap-1">
                    <span className="font-[Roboto] text-teal text-xs">Energy Systems</span>
                    <span className="font-[Roboto] text-teal/70 text-xs">Macro-modeling</span>
                  </div>
                  <div className="w-1/4 hidden lg:flex items-center gap-2">
                    <div className="w-6 h-6 bg-navy/5 border border-navy/10 rounded-md flex items-center justify-center text-[10px]">🌐</div>
                    <span className="font-[Manrope] font-bold text-navy-light text-xs">Global University</span>
                  </div>
                  <div className="w-10 h-10 bg-teal/10 rounded-xl group-hover:bg-navy transition-colors flex-shrink-0 flex items-center justify-center text-teal group-hover:text-white font-bold text-sm">→</div>
               </div>
             ))}
           </div>
         </div>
      </div>
    </section>
  </div>
);

const DataPortalPage = () => (
  <div className="w-full animate-fade-up">
    <section className="w-screen py-16 md:py-24 lg:py-32 px-[3vw] bg-navy border-b border-navy-dark pt-32 md:pt-40 bg-dot-pattern-dark text-white min-h-screen">
      <div className="max-w-[120rem] mx-auto">
         <SectionInfo num="D1" title="Data Portal: Open Catalog" rationale="The core utility of the site. A highly filterable repository of all datasets, assumptions, and scenario outputs for researchers and policymakers." dark={true} />
         
         <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mt-12">
            <div className="w-full lg:w-80 flex flex-col gap-8 bg-navy-light p-6 md:p-8 rounded-xl border border-teal-dark/30 h-fit">
              <h3 className="font-[Manrope] font-bold text-teal text-xl mb-2">Filters</h3>
              {['Data Source', 'Sector', 'Scenario'].map((group, idx) => (
                <div key={group} className="flex flex-col gap-4">
                  <span className="font-[Manrope] font-bold text-teal-dark text-sm uppercase tracking-wider">{group}</span>
                  {[1,2,3,4].map(i => (
                    <div key={i} className="flex gap-3 items-center cursor-pointer group">
                       <div className="w-5 h-5 bg-navy-light border border-teal-dark/50 rounded-sm flex-shrink-0 group-hover:bg-teal transition-colors flex items-center justify-center">
                          {i === 1 && <div className="w-2.5 h-2.5 bg-navy rounded-sm"></div>}
                       </div>
                       <span className="font-[Roboto] text-navy/60 group-hover:text-cream text-sm transition-colors">Option {i}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            
            <div className="flex-1 flex flex-col gap-6">
              <div className="w-full h-14 bg-navy-light rounded-xl border border-teal-dark/30 flex items-center px-6 mb-2">
                 <span className="text-teal-dark font-bold mr-4">🔍</span>
                 <span className="font-[Roboto] text-navy/40 text-sm">Search datasets, models, or scenarios...</span>
              </div>
              
              {[1,2,3,4,5].map(i => (
                <div key={i} className="w-full bg-navy/50 hover:bg-navy-light p-6 md:p-8 rounded-xl border border-teal-dark/30 flex flex-col sm:flex-row justify-between sm:items-center gap-6 transition-colors cursor-pointer group">
                   <div className="flex flex-col gap-2 flex-1">
                     <div className="flex gap-2 mb-1">
                       <span className="px-2 py-1 bg-teal-dark/20 text-teal rounded-md text-[10px] font-[Manrope] font-bold uppercase tracking-wider">CSV</span>
                       <span className="px-2 py-1 bg-teal-dark/20 text-teal rounded-md text-[10px] font-[Manrope] font-bold uppercase tracking-wider">JSON</span>
                     </div>
                     <h4 className="font-[Manrope] font-bold text-white text-lg md:text-xl">National Grid Emission Factors {2020 + i}</h4>
                     <p className="font-[Roboto] text-navy/60 text-sm">Updated 2 days ago • CEEW Energy Modeling Team</p>
                   </div>
                   <button className="w-full sm:w-auto px-6 py-3 bg-white text-navy font-[Manrope] font-bold rounded-lg group-hover:bg-teal group-hover:text-white transition-colors text-sm">
                     Download
                   </button>
                </div>
              ))}
            </div>
         </div>
      </div>
    </section>

    <section className="w-screen py-16 md:py-24 lg:py-32 px-[3vw] bg-white border-b border-navy/10">
      <div className="max-w-[120rem] mx-auto">
        <SectionInfo num="D2" title="Live Sectoral Trackers" rationale="Provides a 'dashboard' feel. Shows real-time or frequently updated macro indicators (like current renewable capacity) to keep the portal feeling alive." />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-12">
           {[
             {val: '42.5%', label: 'Renewable Share'},
             {val: '180 GW', label: 'Solar Capacity'},
             {val: '-12%', label: 'Emission Intensity'},
             {val: '$4B', label: 'Green Investment'}
           ].map((stat, i) => (
             <div key={i} className="p-8 border border-navy/10 bg-cream rounded-2xl flex flex-col items-center justify-center text-center">
               <div className="w-24 h-24 rounded-full border-[8px] border-navy/10 border-t-teal mb-6 flex items-center justify-center">
                 <span className="font-[Manrope] font-bold text-navy text-xs">{i+1}Q</span>
               </div>
               <span className="font-[Manrope] font-extrabold text-navy text-2xl md:text-3xl mb-1">{stat.val}</span>
               <span className="font-[Roboto] text-navy/60 text-xs md:text-sm uppercase tracking-wider">{stat.label}</span>
             </div>
           ))}
        </div>
      </div>
    </section>

    <section className="w-screen py-16 md:py-24 lg:py-32 px-[3vw] bg-navy-light border-b border-teal-dark/30">
      <div className="max-w-[120rem] mx-auto">
        <SectionInfo num="D3" title="Spatial Maps & GIS Explorer" rationale="Allows users to visualize scenario outputs geographically, mapping out land-use changes, energy infrastructure grids, and regional emission intensities." dark={true} />
        <div className="w-full h-[500px] md:h-[700px] bg-navy border border-teal-dark/30 rounded-2xl mt-12 relative overflow-hidden flex">
          <div className="flex-1 relative bg-dot-pattern-dark opacity-80 flex items-center justify-center">
            <div className="w-64 h-64 md:w-96 md:h-96 bg-navy-light rounded-full blur-3xl opacity-50"></div>
          </div>
          <div className="hidden md:flex w-80 bg-navy/90 backdrop-blur border-l border-teal-dark/30 p-6 flex-col gap-6 relative z-10">
            <h4 className="font-[Manrope] font-bold text-white text-xl mb-4">Map Layers</h4>
            {['Solar Irradiance', 'Wind Density', 'Grid Capacity', 'Land Usage'].map((layer, i) => (
              <div key={layer} className="flex flex-col gap-3">
                <span className="font-[Roboto] text-white/70 text-sm">{layer}</span>
                <div className="w-full h-2 bg-gradient-to-r from-teal-dark/50 to-teal rounded-full mb-2"></div>
                <div className="flex justify-between">
                  <span className="font-[Roboto] text-teal-dark text-[10px] uppercase">Min</span>
                  <span className="font-[Roboto] text-teal text-[10px] uppercase">Max</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="w-screen py-16 md:py-24 lg:py-32 px-[3vw] bg-white border-b border-navy/10">
      <div className="max-w-[120rem] mx-auto flex flex-col md:flex-row gap-12">
        <div className="w-full md:w-1/3 flex flex-col items-start">
          <SectionInfo num="D4" title="Developer API & Integrations" rationale="Allows third-party researchers or tech companies to hook directly into NZI's datasets automatically, vastly increasing the reach and utility of the data." />
          <button className="px-6 py-3 bg-navy text-white font-[Manrope] font-bold rounded-lg mt-8 hover:bg-navy-light transition-colors">Read API Docs</button>
        </div>
        <div className="w-full md:w-2/3 bg-navy rounded-2xl p-6 md:p-8 font-mono text-sm md:text-base border border-navy-dark shadow-xl">
           <div className="flex gap-2 mb-6">
             <div className="w-3 h-3 rounded-full bg-teal"></div>
             <div className="w-3 h-3 rounded-full bg-teal-dark"></div>
             <div className="w-3 h-3 rounded-full bg-navy-light"></div>
           </div>
           <p className="text-teal mb-4">$ curl -X GET "https://api.netzero.in/v1/datasets"</p>
           <p className="text-white/40 mb-4">{`// Authenticating with Bearer Token`}</p>
           <p className="text-cream mb-4">{`-H "Authorization: Bearer YOUR_API_KEY"`}</p>
           <p className="text-teal-dark mb-8">{`> 200 OK`}</p>
           <pre className="text-white/60 overflow-x-auto">
{`{
  "dataset": "emission_factors_2030",
  "status": "published",
  "records": 1420
}`}
           </pre>
        </div>
      </div>
    </section>

    <section className="w-screen py-16 md:py-24 lg:py-32 px-[3vw] bg-white border-b border-navy/10">
      <div className="max-w-[120rem] mx-auto text-center flex flex-col items-center">
        <SectionInfo num="D5" title="Data Submission Portal" rationale="Opens the platform up to academic crowdsourcing. Other universities can submit their models for review and inclusion, making NZI a central hub." />
        <div className="w-full max-w-3xl mt-12 bg-cream border-2 border-navy/10 border-dashed rounded-2xl p-12 md:p-20 flex flex-col items-center justify-center hover:bg-teal/10 transition-colors cursor-pointer group">
           <div className="w-16 h-16 bg-navy/10 rounded-full mb-6 flex items-center justify-center text-navy/40 group-hover:bg-navy group-hover:text-cream transition-colors">
              <span className="font-[Manrope] font-bold text-xl">+</span>
           </div>
           <h4 className="font-[Manrope] font-bold text-navy text-xl mb-4 group-hover:text-teal-dark transition-colors">Submit Your Dataset</h4>
           <p className="font-[Roboto] text-navy/60 text-sm text-center max-w-md">Contribute to the National Energy Model by uploading your peer-reviewed data.</p>
        </div>
      </div>
    </section>

    <section className="w-screen py-16 md:py-24 lg:py-32 px-[3vw] bg-teal/10 border-b border-navy/10">
      <div className="max-w-[120rem] mx-auto">
        <SectionInfo num="D6" title="Citation & Usage Guidelines" rationale="Crucial for academic platforms. Provides clear, copy-pasteable text to ensure NZI gets proper attribution when its data is used in external papers." />
        <div className="bg-white p-6 md:p-8 rounded-xl border border-navy/10 mt-12 flex flex-col md:flex-row justify-between items-center gap-6 group">
           <div className="flex flex-col gap-2 flex-1 font-mono text-sm text-navy/70 p-4 bg-cream rounded-lg border border-navy/5 w-full">
              <span>National Net Zero India Research Program (2024).</span>
              <span>Open Climate Data Portal v1.0. Retrieved from https://netzero.in/data</span>
           </div>
           <button className="w-full md:w-16 h-12 md:h-16 bg-navy/10 rounded-lg flex-shrink-0 flex items-center justify-center text-navy hover:bg-navy hover:text-white transition-colors" title="Copy Citation">
             <span className="font-[Manrope] text-[10px] font-bold">COPY</span>
           </button>
        </div>
      </div>
    </section>
  </div>
);


const NewsEventsPage = () => (
  <div className="w-full animate-fade-up">
    {/* E1: Hero Event */}
    <section className="w-screen py-16 md:py-24 lg:py-32 px-[3vw] bg-white border-b border-navy/10 pt-32 md:pt-40">
      <div className="max-w-[120rem] mx-auto">
        <SectionInfo num="E1" title="Flagship Summits & Conferences" rationale="Draws immediate attention to the highest-priority upcoming event to drive registrations and awareness." />
        <div className="mt-12 w-full aspect-[21/9] md:aspect-[2.5/1] bg-navy rounded-3xl overflow-hidden relative group cursor-pointer shadow-xl flex items-center px-8 md:px-16 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=2000&q=80')" }}>
           <div className="absolute inset-0 bg-navy/80"></div>
           <div className="absolute inset-0 bg-dot-pattern-dark opacity-50"></div>
           <div className="relative z-10 w-full max-w-2xl flex flex-col gap-6">
              <div className="px-4 py-2 bg-white rounded-lg w-fit flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-pink animate-pulse"></div>
                 <span className="font-[Manrope] font-bold text-navy text-xs uppercase tracking-widest">Upcoming Summit</span>
              </div>
              <h2 className="font-[Manrope] font-extrabold text-white text-3xl sm:text-4xl md:text-5xl leading-tight">Annual NetZero Pathways Conference 2024</h2>
              <p className="font-[Roboto] text-white/70 text-lg md:text-xl mb-6">Join global experts to discuss the latest modeling outputs for the industrial sector.</p>
              <button className="px-8 h-14 bg-white text-navy font-[Manrope] font-bold rounded-xl hover:bg-cream transition-colors w-fit">Register Now</button>
           </div>
        </div>
      </div>
    </section>
    
    {/* N1: Featured Story */}
    <section className="w-screen py-16 md:py-24 lg:py-32 px-[3vw] bg-white border-b border-navy/10 pt-32 md:pt-40">
      <div className="max-w-[120rem] mx-auto">
        <SectionInfo num="N1" title="Featured Insights" rationale="Highlights the most critical, recent updates, op-eds, or major project milestones to keep returning users engaged with fresh content." />
        <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-12 mt-12 group cursor-pointer">
          <div className="w-full lg:w-2/3 aspect-video md:aspect-[21/9] lg:aspect-video bg-teal/10 border border-navy/10 rounded-2xl overflow-hidden group-hover:opacity-90 transition-opacity bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1600&q=80')" }}></div>
          <div className="w-full lg:w-1/3 flex flex-col justify-center">
            <span className="px-3 py-1 bg-navy/10 text-navy rounded-md font-[Manrope] font-bold text-xs uppercase tracking-widest w-fit mb-6">Press Release</span>
            <h2 className="font-[Manrope] font-extrabold text-navy text-3xl md:text-4xl leading-tight mb-6">National Framework for Carbon Markets Launched</h2>
            <p className="font-[Roboto] text-navy/70 text-base leading-relaxed mb-8">
              A comprehensive outline of the upcoming regulatory structures designed to facilitate trading and compliance across major industrial sectors.
            </p>
            <div className="flex items-center gap-4 mt-auto">
              <div className="w-12 h-12 bg-navy/10 rounded-full flex items-center justify-center overflow-hidden">
                 <span className="font-[Manrope] text-navy/30 text-[10px] font-bold">PR</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-[Manrope] font-bold text-navy text-sm">Media Desk</span>
                <span className="font-[Roboto] text-navy/50 text-xs">October 24, 2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    {/* E2: Calendar */}
    <section className="w-screen py-16 md:py-24 lg:py-32 px-[3vw] bg-[#fffcf6] border-b border-navy/10">
      <div className="max-w-[120rem] mx-auto">
        <SectionInfo num="E2" title="Upcoming Calendar" rationale="Provides a clear, scannable schedule of all public engagements, webinars, and closed-door workshops." />
        <div className="flex flex-col gap-6 mt-12">
           {[1, 2, 3, 4].map((i, idx) => (
             <ScrollReveal key={i} delay={idx * 150}>
             <div className="bg-white border border-navy/10 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start md:items-center transition-all duration-500 hover:-translate-y-2 hover:shadow-glow-navy cursor-pointer group active:scale-[0.99] relative overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-navy/5 to-transparent pointer-events-none"></div>
                <div className={`relative z-10 flex flex-col items-center justify-center rounded-xl p-4 min-w-[100px] transition-transform group-hover:scale-105 shadow-sm ${
                  idx === 0 ? 'bg-navy' : 
                  idx === 1 ? 'bg-teal' : 
                  idx === 2 ? 'bg-coral' : 'bg-pink'
                }`}>
                   <span className="font-[Roboto] font-bold text-white/80 text-sm uppercase tracking-wider">Nov</span>
                   <span className="font-[Manrope] font-extrabold text-white text-3xl">1{i}</span>
                </div>
                <div className="flex flex-col gap-2 flex-1">
                   <div className="flex items-center gap-3">
                     <span className="px-2 py-1 bg-navy/5 text-navy/60 rounded-md font-[Roboto] text-xs">Webinar</span>
                     <span className="font-[Roboto] text-navy/50 text-xs">10:00 AM IST</span>
                   </div>
                   <h4 className="font-[Manrope] font-bold text-navy text-xl leading-tight">Decarbonizing Heavy Industry</h4>
                   <p className="font-[Roboto] text-navy/70 text-sm">A deep dive into the cost-benefit analysis of green hydrogen integration.</p>
                </div>
                <div className="w-full md:w-auto mt-4 md:mt-0">
                   <button className="w-full md:w-auto px-6 h-12 bg-white border border-navy/10 text-navy font-[Manrope] font-bold rounded-xl group-hover:bg-navy group-hover:text-white transition-colors">RSVP</button>
                </div>
             </div>
             </ScrollReveal>
           ))}
        </div>
      </div>
    </section>
    
    {/* N2: Latest Articles Feed */}
    <section className="w-screen py-16 md:py-24 lg:py-32 px-[3vw] bg-white border-b border-navy/10">
      <div className="max-w-[120rem] mx-auto">
        <SectionInfo num="N2" title="Latest Articles & Op-Eds" rationale="A standard, scannable feed of all news, blogs, and press releases ordered chronologically." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mt-12">
          {[1, 2, 3, 4, 5, 6].map((i, idx) => (
            <ScrollReveal key={i} delay={idx * 100}>
            <div className="flex flex-col group cursor-pointer bg-white p-4 md:p-5 rounded-2xl border border-navy/10 shadow-card hover:shadow-glow-teal transition-all duration-500 hover:-translate-y-2 active:scale-[0.98] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-teal/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              <div className="relative z-10 w-full aspect-[4/3] bg-teal/10 rounded-xl mb-6 group-hover:opacity-90 transition-opacity bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-${[
                '1473341304170-971dccb5ac1e',
                '1451187580459-43490279c0fa',
                '1518173946687-a4c8892bbd9f',
                '1497435334941-8c899ee9e8e9',
                '1508514177221-188b1cf16e9d',
                '1466611653911-95081537e5b7'
              ][i-1]}?auto=format&fit=crop&w=800&q=80')` }}></div>
              <span className="px-2 py-1 bg-navy/10 text-navy rounded-md font-[Manrope] font-bold text-[10px] uppercase tracking-widest w-fit mb-4">Op-Ed</span>
              <h4 className="font-[Manrope] font-bold text-navy text-xl leading-tight mb-4 group-hover:text-teal-dark transition-colors">The Role of Green Hydrogen in India's Future</h4>
              <p className="font-[Roboto] text-navy/60 text-sm leading-relaxed mb-6">Exploring cost-reduction trajectories and scaling strategies for electrolyzer deployments.</p>
              <div className="relative z-10 mt-auto border-t border-navy/10 pt-4 flex justify-between items-center">
                <span className="font-[Roboto] text-navy/40 text-xs">Oct {20 - i}, 2024</span>
                <div className="w-8 h-8 bg-teal/10 rounded-full flex items-center justify-center text-teal group-hover:bg-teal group-hover:text-white transition-all duration-300 text-xs font-bold shadow-[0_0_0_rgba(43,157,143,0)] group-hover:shadow-[0_0_10px_rgba(43,157,143,0.5)]">→</div>
              </div>
            </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
    
    {/* N3: Guest Columns */}
    <section className="w-screen py-16 md:py-24 lg:py-32 px-[3vw] bg-white border-b border-navy/10">
      <div className="max-w-[120rem] mx-auto">
        <SectionInfo num="N3" title="Guest Voices" rationale="Highlights that NZI accepts input from a diverse range of academics and policy experts, positioning it as an inclusive hub of thought leadership." />
        <div className="flex gap-6 overflow-x-auto pb-8 mt-12 snap-x" style={{ scrollbarWidth: 'none' }}>
           {[1, 2, 3, 4, 5].map(i => (
             <div key={i} className="min-w-[280px] bg-white border border-navy/10 p-8 rounded-xl shadow-card snap-center flex flex-col items-center text-center cursor-pointer hover:border-navy/30 transition-colors">
                <div className="w-24 h-24 bg-navy/10 rounded-full mb-6 flex items-center justify-center overflow-hidden border-2 border-white shadow-sm bg-cover bg-center" style={{ backgroundImage: `url('https://i.pravatar.cc/150?img=${i * 11}')` }}>
                </div>
                <h5 className="font-[Manrope] font-bold text-navy text-lg mb-1">Author Name</h5>
                <span className="font-[Roboto] text-teal text-xs uppercase tracking-wider mb-6">Guest Contributor</span>
                <button className="w-full py-2 bg-white border border-navy/10 text-navy font-[Manrope] font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-navy/5 transition-colors">Read Column</button>
             </div>
           ))}
        </div>
      </div>
    </section>
    
    {/* E3: Past Archive */}
    <section className="w-screen py-16 md:py-24 lg:py-32 px-[3vw] bg-navy border-b border-navy-dark text-white relative">
      <div className="max-w-[120rem] mx-auto relative z-10">
        <SectionInfo num="E3" title="Event Archive & Recordings" rationale="Preserves the value of past events by providing access to recordings and transcripts for ongoing educational value." dark={true} />
        <div className="grid md:grid-cols-3 gap-8 mt-12">
           {[1, 2, 3, 4, 5, 6].map(i => (
             <div key={i} className="flex flex-col group cursor-pointer">
                <div className="w-full aspect-video bg-navy-light rounded-xl mb-6 relative flex items-center justify-center border border-teal-dark/30 group-hover:border-teal transition-colors overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80')` }}>
                   <div className="absolute inset-0 bg-navy/40 group-hover:bg-navy/20 transition-colors"></div>
                   <div className="w-16 h-16 rounded-full bg-navy/85 backdrop-blur border border-teal/40 flex items-center justify-center group-hover:scale-110 transition-transform relative z-10">
                      <div className="w-0 h-0 border-t-8 border-t-transparent border-l-[12px] border-l-white border-b-8 border-b-transparent ml-1"></div>
                   </div>
                </div>
                <span className="font-[Roboto] text-teal text-xs uppercase tracking-widest mb-2">March 15, 2024</span>
                <h4 className="font-[Manrope] font-bold text-white text-lg leading-tight group-hover:text-teal-dark transition-colors">Launch of the National Carbon Market Framework</h4>
             </div>
           ))}
        </div>
      </div>
    </section>
    
    {/* N4: Newsletter */}
    <section className="w-screen py-16 md:py-24 lg:py-32 px-[3vw] bg-navy border-b border-navy-dark text-center flex flex-col items-center">
      <div className="max-w-[120rem] mx-auto w-full">
        <SectionInfo num="N4" title="Newsletter Archive" rationale="Captures engaged readers into an owned communication channel, ensuring consistent delivery of new reports directly to their inbox." dark={true} />
        <div className="w-full max-w-2xl mx-auto mt-12 bg-navy-light rounded-3xl p-12 md:p-16 border border-teal-dark/30 shadow-2xl flex flex-col items-center">
           <h3 className="font-[Manrope] font-extrabold text-white text-3xl md:text-4xl text-center mb-4 tracking-tight">Stay Informed</h3>
           <p className="font-[Roboto] text-cream/70 text-base text-center max-w-md mb-10">Subscribe to receive monthly digests of our latest publications, data releases, and events.</p>
           <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg">
              <input type="email" placeholder="Email Address" className="flex-1 h-14 bg-navy/50 border border-teal-dark/30 rounded-xl px-6 text-white font-[Roboto] focus:outline-none focus:border-teal transition-colors placeholder-cream/30" />
              <button className="w-full sm:w-auto px-8 h-14 bg-teal hover:bg-teal-dark text-white font-[Manrope] font-bold rounded-xl transition-colors">Subscribe</button>
           </div>
        </div>
      </div>
    </section>
  </div>
);
const ContactPage = () => (
  <div className="w-full animate-fade-up">
    <section className="w-screen py-16 md:py-24 lg:py-32 px-[3vw] bg-white border-b border-navy/10 pt-32 md:pt-40">
      <div className="max-w-[120rem] mx-auto w-full">
        <SectionInfo num="C1" title="Get in Touch" rationale="Direct channel for policymakers, media, and researchers to contact the PMU, request specific data runs, or initiate collaborations." />
        
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 mt-12">
          <div className="lg:col-span-5 flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <h2 className="font-[Manrope] font-extrabold text-navy text-3xl sm:text-4xl md:text-5xl leading-tight mb-2">We are open for collaboration.</h2>
              <p className="font-[Roboto] text-navy/70 text-lg md:text-xl max-w-lg mb-8">Whether you are a researcher needing raw data or a policymaker seeking a briefing, our team is ready to assist.</p>
            </div>
            
            <div className="flex flex-col gap-8">
              {[
                { label: 'General Inquiries', email: 'contact@netzero.in', desc: 'For broad questions about our mission and scope.' },
                { label: 'Data Access', email: 'data@netzero.in', desc: 'For researchers and institutions requesting API keys or bulk downloads.' },
                { label: 'Media Relations', email: 'press@netzero.in', desc: 'For journalists, interview requests, and media assets.' }
              ].map((contact, i) => (
                <div key={i} className="flex gap-6 items-start group">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-teal/10 rounded-xl flex items-center justify-center flex-shrink-0 text-teal group-hover:bg-navy group-hover:text-cream transition-colors">
                     <span className="font-[Manrope] text-lg md:text-xl font-bold">@</span>
                  </div>
                  <div className="flex flex-col gap-1 w-full pt-1">
                    <h5 className="font-[Manrope] font-bold text-navy text-lg">{contact.label}</h5>
                    <a href={`mailto:${contact.email}`} className="font-[Roboto] text-teal font-semibold text-sm hover:text-teal-dark transition-colors">{contact.email}</a>
                    <p className="font-[Roboto] text-navy/60 text-sm mt-1">{contact.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-7 bg-cream p-8 md:p-12 rounded-2xl border border-navy/10 shadow-sm flex flex-col gap-6">
             <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="font-[Roboto] text-navy font-bold text-xs uppercase tracking-wider">Full Name</label>
                  <input type="text" className="w-full h-12 md:h-14 bg-white border border-navy/10 rounded-xl px-4 font-[Roboto] text-navy focus:outline-none focus:border-teal transition-colors" placeholder="Jane Doe" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-[Roboto] text-navy font-bold text-xs uppercase tracking-wider">Email Address</label>
                  <input type="email" className="w-full h-12 md:h-14 bg-white border border-navy/10 rounded-xl px-4 font-[Roboto] text-navy focus:outline-none focus:border-teal transition-colors" placeholder="jane@institution.edu" />
                </div>
             </div>
             <div className="flex flex-col gap-2">
                <label className="font-[Roboto] text-navy font-bold text-xs uppercase tracking-wider">Organization / Affiliation</label>
                <input type="text" className="w-full h-12 md:h-14 bg-white border border-navy/10 rounded-xl px-4 font-[Roboto] text-navy focus:outline-none focus:border-teal transition-colors" placeholder="University of..." />
             </div>
             <div className="flex flex-col gap-2">
                <label className="font-[Roboto] text-navy font-bold text-xs uppercase tracking-wider">Message</label>
                <textarea className="w-full h-32 md:h-40 bg-white border border-navy/10 rounded-xl p-4 font-[Roboto] text-navy focus:outline-none focus:border-teal transition-colors resize-none" placeholder="How can we collaborate?"></textarea>
             </div>
             <button className="mt-4 w-full sm:w-48 h-12 md:h-14 bg-navy hover:bg-navy-light text-white font-[Manrope] font-bold rounded-xl transition-colors shadow-sm">
                Send Message
             </button>
          </div>
        </div>
      </div>
    </section>

    <section className="w-screen py-16 md:py-24 lg:py-32 px-[3vw] bg-white border-b border-navy/10">
      <div className="max-w-[120rem] mx-auto w-full">
        <SectionInfo num="C2" title="PMU Headquarters & Hubs" rationale="Provides physical grounding to the institution. Official delegates, stakeholders, and institutional partners often require physical office details for formal correspondence and in-person meetings." />
        
        <div className="grid lg:grid-cols-2 gap-12 mt-12">
          <div className="w-full aspect-[4/3] md:aspect-video lg:aspect-auto lg:h-[500px] bg-navy/10 rounded-2xl relative overflow-hidden flex items-center justify-center border border-navy/15 shadow-inner bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80')" }}>
             <div className="absolute inset-0 bg-cream/40 backdrop-blur-[2px]"></div>
             <div className="absolute inset-0 bg-dot-pattern opacity-60"></div>
             <div className="w-16 h-16 bg-teal rounded-full shadow-2xl relative z-10 animate-bounce flex items-center justify-center text-white font-[Manrope] font-bold text-xl">⌂</div>
          </div>
          <div className="flex flex-col justify-center gap-8">
            <h3 className="font-[Manrope] font-extrabold text-navy text-3xl md:text-4xl mb-4">Our Offices</h3>
            
            {[
              { city: 'New Delhi', desc: 'Primary Project Management Unit', address: 'Climate Policy Hub, Sector 4, RK Puram, New Delhi, 110022', phone: '+91 11 2345 6789' },
              { city: 'Bengaluru', desc: 'Data & Analytics Node', address: 'Innovation Park, Whitefield, Bengaluru, Karnataka 560066', phone: '+91 80 9876 5432' }
            ].map((loc, idx) => (
              <div key={idx} className="bg-white p-6 md:p-8 rounded-xl border border-navy/10 shadow-sm flex flex-col gap-4 group hover:border-teal/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-navy/10 rounded-md flex items-center justify-center text-navy font-bold text-xs group-hover:bg-navy group-hover:text-white transition-colors">{idx + 1}</div>
                  <h4 className="font-[Manrope] font-bold text-navy text-xl">{loc.city}</h4>
                </div>
                <div className="pl-11">
                  <p className="font-[Roboto] text-navy/70 text-sm mb-2">{loc.desc}</p>
                  <p className="font-[Roboto] text-navy/50 text-sm mb-6">{loc.address}</p>
                  <div className="flex gap-4">
                    <span className="font-[Roboto] font-bold text-teal text-xs uppercase tracking-wider hover:text-teal-dark cursor-pointer transition-colors">Directions</span>
                    <span className="font-[Roboto] font-bold text-teal text-xs uppercase tracking-wider">{loc.phone}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="w-screen py-16 md:py-24 lg:py-32 px-[3vw] bg-navy border-b border-navy-dark bg-dot-pattern-dark relative">
      <div className="absolute inset-0 bg-navy/85"></div>
      <div className="max-w-[120rem] mx-auto w-full relative z-10">
        <SectionInfo num="C3" title="Media & Press Inquiries" rationale="A dedicated channel for journalists. Separating press from general inquiries ensures rapid response times for media coverage and provides direct access to brand assets and official statements." dark={true} />
        
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="md:col-span-1 flex flex-col gap-6 p-8 bg-navy-light rounded-2xl border border-teal-dark/30">
            <div className="w-16 h-16 bg-teal-dark rounded-full mb-4 flex items-center justify-center text-white">
               <span className="font-[Manrope] text-xl font-bold">P</span>
            </div>
            <h4 className="font-[Manrope] font-bold text-white text-2xl mb-2">Press Kit</h4>
            <p className="font-[Roboto] text-white/60 text-sm mb-8">Official branding guidelines, high-res logos, and executive headshots.</p>
            <p className="font-[Roboto] text-teal text-xs uppercase tracking-wider mb-3">ZIP Archive • 24MB</p>
            <button className="w-full h-12 bg-white text-navy font-[Manrope] font-bold rounded-xl mt-auto hover:bg-cream transition-colors">Download Assets</button>
          </div>
          
          <div className="md:col-span-2 grid sm:grid-cols-2 gap-6">
            {[
              { title: '2024 Annual Report', type: 'PDF • 5.2MB' },
              { title: 'Policy Brief Vol 12', type: 'PDF • 1.8MB' },
              { title: 'Data Methodology', type: 'PDF • 3.4MB' },
              { title: 'Director\'s Statement', type: 'DOCX • 120KB' }
            ].map((asset, idx) => (
              <div key={idx} className="bg-navy/50 hover:bg-navy-light p-6 rounded-xl border border-teal-dark/30 transition-colors flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-navy-light rounded-lg flex items-center justify-center group-hover:bg-teal-dark transition-colors text-white font-bold text-xs">DOC</div>
                  <div className="flex flex-col gap-1">
                    <span className="font-[Manrope] font-bold text-white text-sm">{asset.title}</span>
                    <span className="font-[Roboto] text-teal-dark text-xs">{asset.type}</span>
                  </div>
                </div>
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-navy font-bold group-hover:bg-teal group-hover:text-white transition-colors">↓</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="w-screen py-16 md:py-24 lg:py-32 px-[3vw] bg-white border-b border-navy/10">
      <div className="max-w-[120rem] mx-auto w-full flex flex-col md:flex-row gap-12 lg:gap-20">
        <div className="w-full md:w-1/3 flex-shrink-0">
          <SectionInfo num="C4" title="Frequently Asked Questions" rationale="Reduces friction and repetitive inquiries for the PMU by preemptively answering common questions regarding data usage, model access, and partnership criteria." />
        </div>
        
        <div className="w-full md:w-2/3 flex flex-col gap-4 pt-8 md:pt-0">
          {[
            "Who can access the raw datasets?",
            "How often is the modeling data updated?",
            "Do you provide advisory services to private companies?",
            "How can my university join the Frontier Network?",
            "What methodology do you use for emission forecasting?"
          ].map((faq, idx) => (
            <div key={idx} className="w-full border border-navy/10 rounded-xl p-6 hover:border-navy/30 transition-colors cursor-pointer group flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="font-[Manrope] font-bold text-navy text-lg group-hover:text-teal-dark transition-colors">{faq}</span>
                <div className="w-6 h-6 flex items-center justify-center relative flex-shrink-0">
                  <div className="w-4 h-0.5 bg-navy/40 absolute group-hover:bg-teal transition-colors"></div>
                  <div className="w-0.5 h-4 bg-navy/40 absolute group-hover:bg-teal transition-colors group-hover:rotate-90"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

// --- NEW SITEMAP COMPONENTS ---

const ResearchPage = () => (
  <div className="w-full animate-fade-up">
    {/* Excel: Research -> Overview, Scenarios, Models & Tools, Projections */}
    <section className="w-screen py-16 md:py-24 lg:py-32 px-[3vw] bg-white border-b border-navy/10 pt-32 md:pt-40">
      <div className="max-w-[120rem] mx-auto">
        <h2 className="font-[Manrope] font-extrabold text-navy text-4xl md:text-5xl mb-8">Research & Scenarios</h2>
        <p className="font-[Roboto] text-navy/70 text-lg md:text-xl leading-relaxed mb-12 max-w-4xl">
          Comprehensive methodologies, baseline and net-zero scenarios, and integrated modeling tools.
        </p>
      </div>
    </section>
    
    {/* Inject existing SectorsGrid for Energy Systems Projections */}
    <SectorsGrid />
    
    <section className="w-screen py-16 md:py-24 lg:py-32 px-[3vw] bg-white border-b border-navy/10">
      <div className="max-w-[120rem] mx-auto">
         <SectionInfo num="R2" title="Models & Tools" rationale="Deep dive into macro-economic and energy system models." />
         <div className="h-64 md:h-80 bg-navy/5 border border-navy/10 rounded-2xl flex items-center justify-center mt-12 overflow-hidden relative shadow-sm group cursor-pointer hover:shadow-card hover:border-teal/30 transition-all duration-500">
            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200" alt="Data Models" className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-105 group-hover:opacity-50 transition-all duration-700" />
            <span className="font-[Manrope] font-bold text-navy/90 text-xl relative z-10 bg-white/90 backdrop-blur px-8 py-4 rounded-xl border border-navy/10 shadow-sm group-hover:-translate-y-1 transition-transform duration-500">View Interactive Models</span>
         </div>
      </div>
    </section>
  </div>
);

const PublicationsOutputsPage = () => (
  <div className="w-full animate-fade-up">
    {/* Excel: Publications & Outputs -> Data & Maps, Working Papers, etc. */}
    <section className="w-screen py-16 md:py-24 lg:py-32 px-[3vw] bg-white border-b border-navy/10 pt-32 md:pt-40">
      <div className="max-w-[120rem] mx-auto">
        <h2 className="font-[Manrope] font-extrabold text-navy text-4xl md:text-5xl mb-8">Publications & Outputs</h2>
        <p className="font-[Roboto] text-navy/70 text-lg md:text-xl leading-relaxed mb-12 max-w-4xl">
          Central hub for working papers, data catalogs, interactive maps, and annual compendiums.
        </p>
      </div>
    </section>

    {/* Inject existing DataPortalPreview and PublicationsGrid */}
    <DataPortalPreview />
    <PublicationsGrid />
    
    <div className="mt-16">
      <KnowledgeHubPage />
    </div>
  </div>
);

const TeamGovernancePage = () => (
  <div className="w-full animate-fade-up">
    <section className="w-screen py-16 md:py-24 lg:py-32 px-[3vw] bg-white border-b border-navy/10 pt-32 md:pt-40">
      <div className="max-w-[120rem] mx-auto">
        <h2 className="font-[Manrope] font-extrabold text-navy text-4xl md:text-5xl mb-8">Team & Governance</h2>
        <p className="font-[Roboto] text-navy/70 text-lg md:text-xl leading-relaxed mb-12 max-w-4xl">
          The researchers, advisors, and management units driving the NetZero India initiative.
        </p>
      </div>
    </section>

    {/* Re-inserted from the old About Page */}
    <section className="w-screen py-16 md:py-24 lg:py-32 px-[3vw] bg-teal/5 border-b border-navy/10">
      <div className="max-w-[120rem] mx-auto">
        <SectionInfo num="T1" title="Core Team & Executive Board" rationale="Builds trust by associating the platform with authoritative figures, principal investigators, and researchers directly responsible for the modelling." />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 md:gap-y-16 mt-12">
          {[1,2,3,4,5,6,7,8].map(i => (
            <div key={i} className="flex flex-col items-center text-center group cursor-pointer">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-navy/10 rounded-full mb-6 group-hover:bg-navy/20 transition-all duration-300 flex items-center justify-center overflow-hidden border border-navy/5 shadow-sm group-hover:shadow-md group-hover:-translate-y-1">
                 <img src={`https://images.unsplash.com/photo-${i % 2 === 0 ? '1573496359142-b8d87734a5a2' : '1560250097-0b93528c311a'}?auto=format&fit=crop&q=80&w=400&h=400`} alt="Team Member" className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
              </div>
              <h4 className="font-[Manrope] font-bold text-navy text-base md:text-lg mb-1 group-hover:text-teal transition-colors">Dr. Jane Doe</h4>
              <span className="font-[Roboto] text-navy/60 text-xs md:text-sm">Principal Investigator</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="w-screen py-16 md:py-24 lg:py-32 px-[3vw] bg-white border-b border-navy/10">
      <div className="max-w-[120rem] mx-auto">
        <SectionInfo num="T2" title="Independent Advisory Committee" rationale="Separating the advisory board from the core team proves external validation and oversight. High-profile advisors from global institutions solidify global credibility." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="flex items-center gap-4 p-4 border border-teal/10 rounded-xl bg-teal/5 hover:bg-teal/10 hover:border-teal/30 hover:shadow-sm transition-all cursor-pointer group hover:-translate-y-1">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-navy/10 group-hover:bg-navy/20 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden transition-colors">
                 <span className="font-[Manrope] text-navy/30 text-[10px] transition-colors">Photo</span>
              </div>
              <div className="flex flex-col flex-1">
                <h5 className="font-[Manrope] font-bold text-navy text-sm md:text-base mb-1 transition-colors group-hover:text-teal-dark">Advisory Member {i}</h5>
                <span className="font-[Roboto] text-navy/60 text-xs transition-colors">Global Institution</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    
    <section className="w-screen py-16 md:py-24 lg:py-32 px-[3vw] bg-white border-b border-navy/10">
      <div className="max-w-[120rem] mx-auto">
        <SectionInfo num="T3" title="Project Management Unit & Collaborating Institutions" rationale="Coordination details and institutional partners." />
        <div className="h-64 bg-navy/5 border border-navy/10 rounded-2xl flex items-center justify-center mt-12">
            <span className="font-[Manrope] font-bold text-navy/40">PMU & Partners Placeholder</span>
        </div>
      </div>
    </section>
  </div>
);

const MediaResourcesPage = () => (
  <div className="w-full animate-fade-up">
    <section className="w-screen py-16 md:py-24 lg:py-32 px-[3vw] bg-white border-b border-navy/10 pt-32 md:pt-40">
      <div className="max-w-[120rem] mx-auto">
        <h2 className="font-[Manrope] font-extrabold text-navy text-4xl md:text-5xl mb-8">Media & Resources</h2>
        <p className="font-[Roboto] text-navy/70 text-lg md:text-xl leading-relaxed mb-12 max-w-4xl">
          Photo and video galleries, FAQs, and a comprehensive media glossary.
        </p>
      </div>
    </section>
    
    <section className="w-screen py-16 md:py-24 lg:py-32 px-[3vw] bg-white border-b border-navy/10">
      <div className="max-w-[120rem] mx-auto">
        <SectionInfo num="M1" title="Media Galleries & FAQs" rationale="Centralized resources for press and general inquiries." />
        <div className="grid md:grid-cols-2 gap-8 mt-12">
           <div className="h-64 bg-navy/5 border border-navy/10 rounded-2xl flex items-center justify-center overflow-hidden relative shadow-sm group cursor-pointer hover:shadow-card hover:border-teal/30 transition-all duration-500">
              <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200" alt="Photo/Video Gallery" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 group-hover:opacity-70 transition-all duration-700" />
              <span className="font-[Manrope] font-bold text-navy/90 text-xl relative z-10 bg-white/90 backdrop-blur px-8 py-4 rounded-xl border border-navy/10 shadow-sm group-hover:-translate-y-1 transition-transform duration-500">Photo/Video Gallery</span>
           </div>
           <div className="h-64 bg-navy/5 border border-navy/10 rounded-2xl flex items-center justify-center overflow-hidden relative shadow-sm group cursor-pointer hover:shadow-card hover:border-teal/30 transition-all duration-500">
              <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200" alt="FAQs and Glossary" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-multiply group-hover:scale-105 group-hover:opacity-60 transition-all duration-700" />
              <span className="font-[Manrope] font-bold text-navy/90 text-xl relative z-10 bg-white/90 backdrop-blur px-8 py-4 rounded-xl border border-navy/10 shadow-sm group-hover:-translate-y-1 transition-transform duration-500">FAQs & Glossary</span>
           </div>
        </div>
      </div>
    </section>
  </div>
);

const Footer = () => (
  <footer className="w-screen pt-24 md:pt-32 pb-12 px-[3vw] bg-navy text-white relative z-50">
    <div className="max-w-[120rem] mx-auto">
       
       <SectionInfo 
        num="09" 
        title="Directory & Compliance" 
        rationale="To provide the essential utilitarian architectural anchor for the entire platform. It houses critical compliance data, exhaustive directory links, and legal frameworks, ensuring the complex ecosystem remains fully navigable."
        dark={true}
      />

       <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 md:gap-16 mb-20 md:mb-24 mt-16">
          <div className="col-span-2 lg:col-span-2 flex flex-col items-start">
             <div className="flex items-center gap-3 mb-6 md:mb-8">
               <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-[Manrope] tracking-tighter text-teal">NZII</span>
             </div>
             <p className="text-cream/80 text-sm md:text-base font-[Roboto] leading-relaxed mb-8 md:mb-10 max-w-xs">
               Envisioning net-zero pathways that balance development goals with resource constraints and socio-economic and environmental trade-offs.
             </p>
             <div className="flex gap-4">
                {[1, 2, 3, 4].map(icon => (
                  <div key={icon} className="w-10 h-10 md:w-12 md:h-12 bg-navy-light rounded-full hover:bg-teal-dark transition-colors cursor-pointer flex items-center justify-center text-cream/50 hover:text-white font-[Manrope] text-xs font-bold">{['X', 'Li', 'Gh', 'Yt'][icon-1]}</div>
                ))}
             </div>
          </div>
          
          {[
            { title: 'Research & Data', links: ['Scenario Pathways', 'Interactive Models', 'Data Portal', 'Methodology', 'Publications'] },
            { title: 'About the Project', links: ['Strategic Rationale', 'Core Team', 'Frontier Network', 'Annual Reports'] },
            { title: 'Media & Resources', links: ['Press Releases', 'Brand Assets', 'Newsletter Archive', 'Contact PMU'] },
            { title: 'Legal & Policies', links: ['Terms of Use', 'Privacy Policy', 'Data Compliance', 'Citation Guidelines', 'Accessibility'] }
          ].map((col, idx) => (
            <div key={idx} className="col-span-1 flex flex-col items-start">
               <h4 className="text-cream/80 font-[Manrope] font-semibold text-sm tracking-wide mb-6 md:mb-8">{col.title}</h4>
               {col.links.map((link, linkIdx) => (
                 <a 
                   key={linkIdx} 
                   href="#"
                   className="text-cream/50 hover:text-cream text-xs md:text-sm font-[Roboto] mb-4 md:mb-5 transition-colors cursor-pointer"
                 >
                   {link}
                 </a>
               ))}
            </div>
          ))}
       </div>

       <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 p-8 md:p-10 bg-navy/80 border border-teal/20 rounded-2xl mb-16">
          <div className="flex flex-col gap-3">
            <h3 className="text-xl md:text-2xl font-[Manrope] font-bold text-white tracking-tight">Stay updated on our progress</h3>
            <p className="text-cream/60 font-[Roboto] text-sm md:text-base">Join the newsletter for the latest model releases and policy briefs.</p>
          </div>
          <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-3">
            <input type="email" placeholder="Enter your email address" className="w-full sm:w-64 md:w-80 h-12 md:h-14 bg-white/5 border border-cream/10 rounded-xl px-4 text-white placeholder-cream/30 font-[Roboto] text-sm focus:outline-none focus:border-teal transition-colors" />
            <button className="w-full sm:w-32 h-12 md:h-14 bg-pink hover:bg-pink-dark text-white rounded-xl cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-card font-[Manrope] font-semibold text-sm">Subscribe</button>
          </div>
       </div>

       <div className="border-t border-navy-dark pt-8 md:pt-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <span className="font-[Roboto] text-cream/40 text-sm">© 2024 NetZero India. All rights reserved.</span>
          <div className="flex flex-wrap gap-6 md:gap-10">
             {['Terms', 'Privacy', 'Cookies', 'Accessibility'].map((bottomLink, i) => (
               <span key={i} className="font-[Roboto] text-teal-dark text-sm hover:text-white cursor-pointer transition-colors">{bottomLink}</span>
             ))}
          </div>
       </div>
    </div>
  </footer>
);

export default function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.title = "NZI Annotated Skeleton";
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'research', label: 'Research' },
    { id: 'publications', label: 'Publications & Outputs' },
    { id: 'news', label: 'News & Events' },
    { id: 'team', label: 'Team & Governance' },
    { id: 'engagement', label: 'Engagement' },
    { id: 'media', label: 'Media & Resources' }
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: styleSheet}} />

      {/* Preloader Phase */}
      {showPreloader && (
        <div className={`fixed inset-0 z-[9999] transition-opacity duration-1000 ease-in-out ${isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <Preloader onComplete={() => {
            setIsLoaded(true);
            setTimeout(() => setShowPreloader(false), 1000);
          }} />
        </div>
      )}

      {/* Main Content Assembly */}
      <div className={`transition-opacity duration-[1200ms] ${isLoaded ? 'opacity-100' : 'opacity-0 h-screen overflow-hidden'}`}>
        
        {/* Fixed Navbar (3vw padding) */}
        <header className="fixed top-0 w-screen z-50 bg-white/95 backdrop-blur-md border-b border-navy/10 px-[3vw] shadow-[0_1px_4px_rgba(29,54,88,0.06)]">
          <div className="max-w-[120rem] mx-auto h-20 md:h-24 flex justify-between items-center">
            <button onClick={() => setCurrentPage('home')} className="hover:opacity-70 transition-opacity flex items-center gap-2">
              <span className="text-2xl md:text-3xl font-extrabold font-[Manrope] tracking-tighter text-navy">NZII</span>
            </button>
            <nav className="hidden lg:flex items-center gap-6 xl:gap-10">
              <div className="flex gap-4 xl:gap-8">
                {navLinks.map(link => (
                  <button 
                    key={link.id}
                    onClick={() => setCurrentPage(link.id)}
                    className={`relative text-[10px] xl:text-xs font-bold tracking-widest uppercase transition-all duration-300 font-[Manrope] ${
                      currentPage === link.id 
                        ? 'text-navy' 
                        : 'text-navy/60 hover:text-navy'
                    }`}
                  >
                    {link.label}
                    {currentPage === link.id && (
                      <div className="absolute -bottom-1.5 left-0 h-[2px] w-full bg-teal rounded-full"></div>
                    )}
                  </button>
                ))}
              </div>
              <button onClick={() => setCurrentPage('contact')} className="h-10 md:h-12 px-6 md:px-8 bg-pink hover:bg-pink-dark text-white rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-card flex items-center justify-center flex-shrink-0">
                <span className="font-[Manrope] text-xs md:text-sm font-semibold tracking-wide">Contact PMU</span>
              </button>
            </nav>
            <div 
              className="lg:hidden flex flex-col justify-center gap-1.5 cursor-pointer p-2 z-[60] w-12 h-12 items-center"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
               <div className={`w-8 h-1 bg-navy rounded-full transition-all duration-300 transform origin-center ${isMobileMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></div>
               <div className={`w-8 h-1 bg-navy rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
               <div className={`w-8 h-1 bg-navy rounded-full transition-all duration-300 transform origin-center ${isMobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></div>
            </div>
          </div>
        </header>

        {/* Mobile Nav Overlay */}
        <div className={`fixed inset-0 bg-white/95 backdrop-blur-xl z-[55] flex flex-col items-center justify-center transition-all duration-500 lg:hidden ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
           <nav className="flex flex-col items-center gap-8">
             {navLinks.map(link => (
               <button 
                 key={`mobile-${link.id}`}
                 onClick={() => {
                   setCurrentPage(link.id);
                   setIsMobileMenuOpen(false);
                   window.scrollTo(0,0);
                 }}
                 className={`text-2xl font-bold tracking-widest uppercase font-[Manrope] transition-colors ${
                   currentPage === link.id ? 'text-teal' : 'text-navy hover:text-teal'
                 }`}
               >
                 {link.label}
               </button>
             ))}
             <button 
               onClick={() => {
                 setCurrentPage('contact');
                 setIsMobileMenuOpen(false);
                 window.scrollTo(0,0);
               }} 
               className="mt-8 h-14 px-10 bg-pink text-white rounded-lg hover:bg-pink-dark transition-all duration-300 hover:-translate-y-1 hover:shadow-card flex items-center justify-center"
             >
               <span className="font-[Manrope] text-sm font-semibold tracking-wide">Contact PMU</span>
             </button>
           </nav>
        </div>

        {/* Stacked Sections */}
        <main>
          {currentPage === 'home' && (
            <div className="animate-fade-up">
              <HeroSection />
              <PartnersMarquee />
              <RationaleSection />
              <PreFooter />
            </div>
          )}
          {currentPage === 'about' && <AboutPage />}
          {currentPage === 'research' && <ResearchPage />}
          {currentPage === 'publications' && <PublicationsOutputsPage />}
          {currentPage === 'news' && <NewsEventsPage />}
          {currentPage === 'team' && <TeamGovernancePage />}
          {currentPage === 'engagement' && <EngagementPage />}
          {currentPage === 'media' && <MediaResourcesPage />}
          {currentPage === 'contact' && <ContactPage />}
        </main>

        <Footer />
      </div>
    </>
  );
}
