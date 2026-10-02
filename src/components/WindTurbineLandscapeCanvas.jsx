import React from 'react';

export const WindTurbineLandscapeCanvas = () => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none">
      
      {/* ── 1. REALISTIC SKY GRADIENT (Rich emerald-teal to blue sky) ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2E8B99] via-[#48A3A8] to-[#60AF9E]"></div>

      {/* ── 2. REALISTIC CLOUD DRIFT MESHES ── */}
      <div className="absolute top-[8%] -left-[10%] w-[55vw] h-[35vh] bg-white/35 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute top-[18%] right-[5%] w-[45vw] h-[30vh] bg-white/30 rounded-full blur-[90px] pointer-events-none"></div>
      <div className="absolute top-[28%] left-[20%] w-[35vw] h-[25vh] bg-white/25 rounded-full blur-[70px] pointer-events-none"></div>

      {/* ── 3. DISTANT MOUNTAIN RANGES (Multi-layered depths) ── */}
      {/* Far mountains (soft blue-slate silhouette) */}
      <svg
        viewBox="0 0 1440 380"
        preserveAspectRatio="none"
        className="absolute bottom-[22%] left-0 w-full h-[32vh] opacity-60 pointer-events-none"
      >
        <path
          d="M0,280 L110,210 L240,240 L380,170 L520,230 L660,150 L820,220 L960,160 L1120,240 L1280,180 L1440,220 L1440,380 L0,380 Z"
          fill="#3B636B"
        />
      </svg>

      {/* Mid mountain ridge (warm earth-slate tones) */}
      <svg
        viewBox="0 0 1440 360"
        preserveAspectRatio="none"
        className="absolute bottom-[16%] left-0 w-full h-[28vh] opacity-85 pointer-events-none"
      >
        <path
          d="M0,240 L160,180 L320,210 L480,140 L640,190 L800,130 L980,195 L1140,150 L1300,205 L1440,170 L1440,360 L0,360 Z"
          fill="#2C4D4A"
        />
      </svg>

      {/* ── 4. FOREGROUND VAST GREEN ENERGY PLAINS ── */}
      <div className="absolute bottom-0 left-0 right-0 h-[30vh] bg-gradient-to-b from-[#1E4334] via-[#163829] to-[#0E281C]">
        {/* Subtle grid texture of solar arrays across landscape */}
        <div className="absolute inset-0 bg-dot-pattern opacity-25"></div>
        {/* Shrub & texture overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
      </div>

      {/* ── 5. CINEMATIC WIND TURBINES WITH DYNAMIC ROTATING BLADES ── */}
      
      {/* Turbine 1: Large Center Foreground Turbine */}
      <div className="absolute bottom-[20%] left-[48%] -translate-x-1/2 flex flex-col items-center pointer-events-none z-10 scale-95 md:scale-105">
        {/* Rotor Blade Assembly */}
        <div className="relative w-36 h-36 flex items-center justify-center -mb-3 z-20">
          <div className="w-full h-full animate-spin-slow origin-center flex items-center justify-center">
            {/* Blade 1 (up) */}
            <div className="absolute top-0 w-2.5 h-18 bg-gradient-to-t from-white via-white to-slate-200 rounded-full origin-bottom shadow-sm"></div>
            {/* Blade 2 (bottom-right 120deg) */}
            <div className="absolute top-0 w-2.5 h-18 bg-gradient-to-t from-white via-white to-slate-200 rounded-full origin-bottom rotate-120 shadow-sm"></div>
            {/* Blade 3 (bottom-left 240deg) */}
            <div className="absolute top-0 w-2.5 h-18 bg-gradient-to-t from-white via-white to-slate-200 rounded-full origin-bottom rotate-240 shadow-sm"></div>
          </div>
          {/* Nacelle hub hubcap */}
          <div className="w-5 h-5 rounded-full bg-white shadow-md z-30 border border-slate-300"></div>
        </div>
        {/* Tower Pole */}
        <div className="w-3 md:w-3.5 h-44 md:h-56 bg-gradient-to-b from-white via-slate-100 to-slate-300 rounded-t-sm shadow-xl"></div>
      </div>

      {/* Turbine 2: Prominent Right Foreground Turbine */}
      <div className="absolute bottom-[18%] right-[16%] flex flex-col items-center pointer-events-none z-10 scale-90 md:scale-100">
        <div className="relative w-32 h-32 flex items-center justify-center -mb-3 z-20">
          <div 
            className="w-full h-full origin-center flex items-center justify-center"
            style={{ animation: 'spinSlow 24s linear infinite' }}
          >
            <div className="absolute top-0 w-2 h-16 bg-white rounded-full origin-bottom shadow-sm"></div>
            <div className="absolute top-0 w-2 h-16 bg-white rounded-full origin-bottom rotate-120 shadow-sm"></div>
            <div className="absolute top-0 w-2 h-16 bg-white rounded-full origin-bottom rotate-240 shadow-sm"></div>
          </div>
          <div className="w-4 h-4 rounded-full bg-white shadow-md z-30"></div>
        </div>
        <div className="w-2.5 md:w-3 h-40 md:h-52 bg-gradient-to-b from-white to-slate-300 rounded-t-sm shadow-xl"></div>
      </div>

      {/* Turbine 3: Medium Left Foreground Turbine */}
      <div className="absolute bottom-[20%] left-[28%] flex flex-col items-center pointer-events-none z-10 scale-75 md:scale-85">
        <div className="relative w-28 h-28 flex items-center justify-center -mb-2.5 z-20">
          <div 
            className="w-full h-full origin-center flex items-center justify-center"
            style={{ animation: 'spinSlow 26s linear infinite' }}
          >
            <div className="absolute top-0 w-2 h-14 bg-white rounded-full origin-bottom shadow-sm"></div>
            <div className="absolute top-0 w-2 h-14 bg-white rounded-full origin-bottom rotate-120 shadow-sm"></div>
            <div className="absolute top-0 w-2 h-14 bg-white rounded-full origin-bottom rotate-240 shadow-sm"></div>
          </div>
          <div className="w-3.5 h-3.5 rounded-full bg-white shadow-md z-30"></div>
        </div>
        <div className="w-2 md:w-2.5 h-36 md:h-44 bg-gradient-to-b from-white to-slate-300 rounded-t-sm shadow-lg"></div>
      </div>

      {/* Turbine 4: Far-Left Turbine (Horizon depth) */}
      <div className="absolute bottom-[23%] left-[8%] flex flex-col items-center pointer-events-none z-10 scale-60 md:scale-70 opacity-90">
        <div className="relative w-24 h-24 flex items-center justify-center -mb-2 z-20">
          <div 
            className="w-full h-full origin-center flex items-center justify-center"
            style={{ animation: 'spinSlow 20s linear infinite' }}
          >
            <div className="absolute top-0 w-1.5 h-12 bg-white rounded-full origin-bottom shadow-sm"></div>
            <div className="absolute top-0 w-1.5 h-12 bg-white rounded-full origin-bottom rotate-120 shadow-sm"></div>
            <div className="absolute top-0 w-1.5 h-12 bg-white rounded-full origin-bottom rotate-240 shadow-sm"></div>
          </div>
          <div className="w-3 h-3 rounded-full bg-white shadow-md z-30"></div>
        </div>
        <div className="w-2 h-28 md:h-36 bg-gradient-to-b from-white to-slate-300 rounded-t-sm shadow-md"></div>
      </div>

      {/* Turbine 5: Far-Right Turbine (Edge) */}
      <div className="absolute bottom-[24%] right-[3%] flex flex-col items-center pointer-events-none z-10 scale-70 md:scale-80 opacity-95">
        <div className="relative w-26 h-26 flex items-center justify-center -mb-2 z-20">
          <div 
            className="w-full h-full origin-center flex items-center justify-center"
            style={{ animation: 'spinSlow 22s linear infinite' }}
          >
            <div className="absolute top-0 w-2 h-13 bg-white rounded-full origin-bottom shadow-sm"></div>
            <div className="absolute top-0 w-2 h-13 bg-white rounded-full origin-bottom rotate-120 shadow-sm"></div>
            <div className="absolute top-0 w-2 h-13 bg-white rounded-full origin-bottom rotate-240 shadow-sm"></div>
          </div>
          <div className="w-3.5 h-3.5 rounded-full bg-white shadow-md z-30"></div>
        </div>
        <div className="w-2 md:w-2.5 h-32 md:h-40 bg-gradient-to-b from-white to-slate-300 rounded-t-sm shadow-md"></div>
      </div>

      {/* Multiple Distant Micro Turbines on mountain ridgelines */}
      <div className="absolute bottom-[28%] left-[40%] flex flex-col items-center pointer-events-none scale-30 opacity-70">
        <div className="w-16 h-16 flex items-center justify-center animate-spin-slow">
          <div className="absolute top-0 w-1 h-8 bg-white/80 rounded-full origin-bottom"></div>
          <div className="absolute top-0 w-1 h-8 bg-white/80 rounded-full origin-bottom rotate-120"></div>
          <div className="absolute top-0 w-1 h-8 bg-white/80 rounded-full origin-bottom rotate-240"></div>
        </div>
        <div className="w-1 h-16 bg-white/80"></div>
      </div>

      <div className="absolute bottom-[27%] left-[64%] flex flex-col items-center pointer-events-none scale-35 opacity-75">
        <div className="w-16 h-16 flex items-center justify-center animate-spin-reverse-slow">
          <div className="absolute top-0 w-1 h-8 bg-white/80 rounded-full origin-bottom"></div>
          <div className="absolute top-0 w-1 h-8 bg-white/80 rounded-full origin-bottom rotate-120"></div>
          <div className="absolute top-0 w-1 h-8 bg-white/80 rounded-full origin-bottom rotate-240"></div>
        </div>
        <div className="w-1 h-18 bg-white/80"></div>
      </div>

      {/* Atmospheric sunlight lens glow */}
      <div className="absolute -top-20 left-1/3 w-[500px] h-[500px] bg-amber-100/20 rounded-full blur-[140px] pointer-events-none"></div>
    </div>
  );
};
