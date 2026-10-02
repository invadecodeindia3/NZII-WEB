import React, { useState, useEffect } from 'react';
import { Sparkles, Zap, ShieldCheck, ArrowRight } from 'lucide-react';
import { useGame } from '../context/GameContext';
import confetti from 'canvas-confetti';

export const LiveAbatementTicker = () => {
  const { levers, playSound } = useGame();
  
  // Real-time counter of modeled green jobs & carbon tons avoided every second
  const [secondsRunning, setSecondsRunning] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRunning(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Modeled calculations:
  // Tons avoided per second based on clean grid & industrial efficiency
  const tonsPerSec = ((levers.cleanGrid * 14.2 + levers.industrialEff * 10.8) / 30).toFixed(1);
  const totalAvoidedToday = Math.round(secondsRunning * parseFloat(tonsPerSec) * 28 + 142800);
  const jobsCreated = Math.round(levers.cleanGrid * 42000 + levers.industrialEff * 28000 + 450000);

  return (
    <div className="w-full flex flex-wrap items-center gap-3 pt-6 mt-6 border-t border-navy/10 text-xs">
      {/* Live Carbon Avoidance Ticker */}
      <div 
        onClick={() => { playSound(640); confetti({ particleCount: 20 }); }}
        className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-teal/10 hover:bg-teal/15 border border-teal/30 text-teal-dark font-mono font-bold transition-all cursor-pointer shadow-sm group"
        title="Simulated real-time CO2 abatement flow"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-teal"></span>
        </span>
        <span className="text-[11px] text-navy/70 group-hover:text-navy">Current Rate:</span>
        <span className="text-teal font-extrabold">{tonsPerSec} t/sec</span>
      </div>

      {/* Clean Energy Jobs Created */}
      <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-lime/15 border border-lime/30 text-navy font-mono font-bold text-xs shadow-sm">
        <Zap className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
        <span className="text-navy font-extrabold">{jobsCreated.toLocaleString()}</span>
        <span className="text-[10px] text-navy/60 font-sans">Green Jobs</span>
      </div>

      {/* Live Simulation Badge */}
      <div className="hidden sm:flex items-center gap-1 px-3 py-1 rounded-xl bg-navy/5 text-navy/60 font-mono text-[11px]">
        <ShieldCheck className="w-3.5 h-3.5 text-teal" />
        <span>Paris Agreement Aligned</span>
      </div>
    </div>
  );
};
