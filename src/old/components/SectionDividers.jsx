import React from 'react';

// Kinetic animated wave divider with layered parallax paths
export const KineticWaveDivider = ({ 
  topColor = "fill-white", 
  bottomBg = "bg-[#F9F8F3]", 
  reverse = false 
}) => {
  return (
    <div className={`relative w-full overflow-hidden leading-none z-20 pointer-events-none select-none ${bottomBg}`}>
      
      {/* Animated Light Energy Beam traversing the seam */}
      <div className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden z-30 pointer-events-none">
        <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-teal to-transparent animate-laser-line opacity-75"></div>
      </div>

      <div className={`relative w-[200%] h-12 md:h-16 ${reverse ? 'animate-wave-drift-reverse' : 'animate-wave-drift'}`}>
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className={`w-full h-full block ${topColor}`}
        >
          {/* Background gentle wave layer */}
          <path 
            d="M0,0 C150,90 350,-40 500,50 C650,140 900,10 1200,60 L1200,0 L0,0 Z" 
            className="opacity-25"
          ></path>
          {/* Foreground defined wave crest */}
          <path 
            d="M0,0 C200,60 400,20 600,70 C800,120 1000,40 1200,80 L1200,0 L0,0 Z" 
            className="opacity-100"
          ></path>
        </svg>
      </div>
    </div>
  );
};

// Sleek kinetic seam divider with floating metric pill and glowing light sweep
export const KineticSeamDivider = ({ label = "CONTINUOUS PATHWAY STREAM", tag = "2026 AUDITED" }) => {
  return (
    <div className="relative w-full h-8 flex items-center justify-center pointer-events-none z-20 select-none">
      {/* Horizontal Seam Line */}
      <div className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-navy/15 to-transparent"></div>
      
      {/* Moving kinetic laser ping */}
      <div className="absolute inset-x-0 h-[1.5px] overflow-hidden pointer-events-none">
        <div className="w-1/4 h-full bg-gradient-to-r from-transparent via-teal to-transparent animate-laser-line"></div>
      </div>

      {/* Floating Center Badge Seam Overlap */}
      <div className="relative z-10 px-4 py-1 rounded-full bg-white/95 border border-navy/15 shadow-sm text-[10px] font-mono font-bold tracking-widest text-navy/60 uppercase flex items-center gap-2 backdrop-blur-md">
        <span className="w-1.5 h-1.5 rounded-full bg-teal animate-ping"></span>
        <span>{label}</span>
        {tag && (
          <>
            <span className="w-1 h-1 rounded-full bg-navy/20"></span>
            <span className="text-teal-dark font-extrabold">{tag}</span>
          </>
        )}
      </div>
    </div>
  );
};
