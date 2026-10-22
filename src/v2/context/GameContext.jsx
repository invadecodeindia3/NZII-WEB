import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Zap, Factory, Trophy } from 'lucide-react';

export const ACHIEVEMENTS = [
  { id: 'first_action', title: 'Carbon Scout', desc: 'Explored your first net-zero lever', icon: Sparkles, color: 'from-amber-400 to-orange-500' },
  { id: 'deep_decarb', title: 'Grid Overhauler', desc: 'Pushed Clean Energy past 80%', icon: Zap, color: 'from-teal to-emerald-400' },
  { id: 'industrial_pioneer', title: 'Circular Alchemist', desc: 'Cut Heavy Industry carbon by 50%', icon: Factory, color: 'from-sky-400 to-indigo-500' },
  { id: 'netzero_champion', title: 'National Pathfinder', desc: 'Achieved net-zero trajectory before 2070', icon: Trophy, color: 'from-purple-500 to-pink' },
];

const GameContext = createContext(null);

export const GameProvider = ({ children }) => {
  const [impactScore, setImpactScore] = useState(140);
  const [unlockedBadges, setUnlockedBadges] = useState(['first_action']);
  const [showBadgeToast, setShowBadgeToast] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(false);

  // One persisted display setting; public site offers three real, independently
  // selectable modes. Eco is a darker, reduced-motion profile, not a broken toggle.
  const [displayMode, setDisplayMode] = useState(() => {
    try {
      const saved = localStorage.getItem('nzii_display_mode');
      if (['light', 'dark', 'eco'].includes(saved)) return saved;
      if (localStorage.getItem('nzii_eco_mode') === 'true') return 'eco';
      return localStorage.getItem('nzii_theme') === 'light' ? 'light' : 'dark';
    } catch (_) { return 'dark'; }
  });
  const [lastRegularMode, setLastRegularMode] = useState('dark');
  const theme = displayMode === 'light' ? 'light' : 'dark';
  const ecoMode = displayMode === 'eco';
  useEffect(() => {
    document.documentElement.dataset.displayMode = displayMode;
    document.documentElement.classList.toggle('eco-power-save', ecoMode);
    document.documentElement.style.colorScheme = displayMode === 'light' ? 'light' : 'dark';
    try {
      localStorage.setItem('nzii_display_mode', displayMode);
      localStorage.setItem('nzii_theme', theme);
      localStorage.setItem('nzii_eco_mode', String(ecoMode));
    } catch (_) { /* Storage may be disabled in private browsing. */ }
  }, [displayMode, theme, ecoMode]);

  const changeDisplayMode = (mode) => {
    if (!['light', 'dark', 'eco'].includes(mode)) return;
    if (mode !== 'eco') setLastRegularMode(mode);
    setDisplayMode(mode);
  };
  // Compatibility for existing private prototype components.
  const toggleTheme = (val) => changeDisplayMode(
    val === 'light' || val === 'dark' ? val : theme === 'light' ? 'dark' : 'light'
  );
  const toggleEcoMode = () => changeDisplayMode(ecoMode ? lastRegularMode : 'eco');

  // Policy levers shared across pages
  // These are synthetic scenario controls, not measured inventory values.
  const DEFAULT_LEVERS = {
    cleanGrid: 48, industrialEff: 32, evAdoption: 28, afforestation: 36,
    carbonPrice: 42, justTransition: 50, greenH2: 30, gridModernization: 25,
  };
  const [levers, setLevers] = useState({ ...DEFAULT_LEVERS });
  const resetLevers = () => {
    setLevers({ ...DEFAULT_LEVERS });
    calculateImpact(DEFAULT_LEVERS);
  };
  // Synthetic, unvalidated demonstration index (3000 is NOT actual MtCO2e).
  const calculatedEmissions = Math.round(3000 * (1 - Math.min(0.9, impactScore / 440)));
  const reductionPercent = Math.round((1 - calculatedEmissions / 3000) * 100);
  const targetYear = 2070 - Math.round(reductionPercent * 0.2);

  const updateLever = (key, value) => {
    setLevers(prev => {
      const updated = { ...prev, [key]: Math.max(0, Math.min(100, Number(value) || 0)) };
      calculateImpact(updated);
      return updated;
    });
  };

  const calculateImpact = (currentLevers) => {
    const total = Math.round(
      currentLevers.cleanGrid * 1.2 +
      currentLevers.industrialEff * 0.9 +
      currentLevers.evAdoption * 0.8 +
      currentLevers.afforestation * 0.6 +
      currentLevers.carbonPrice * 0.5 +
      currentLevers.justTransition * 0.4 +
      (currentLevers.greenH2 || 0) * 0.25 +
      (currentLevers.gridModernization || 0) * 0.25
    );
    setImpactScore(total);

    if (currentLevers.cleanGrid >= 80 && !unlockedBadges.includes('deep_decarb')) {
      unlockBadge('deep_decarb');
    }
    if (currentLevers.industrialEff >= 50 && !unlockedBadges.includes('industrial_pioneer')) {
      unlockBadge('industrial_pioneer');
    }
    if (total >= 250 && !unlockedBadges.includes('netzero_champion')) {
      unlockBadge('netzero_champion');
    }
  };

  const unlockBadge = (badgeId) => {
    if (!unlockedBadges.includes(badgeId)) {
      const badge = ACHIEVEMENTS.find(b => b.id === badgeId);
      setUnlockedBadges(prev => [...prev, badgeId]);
      setShowBadgeToast(badge);
      if (!ecoMode) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 }
        });
      }
      setTimeout(() => setShowBadgeToast(null), 4000);
    }
  };

  const playSound = (freq = 440) => {
    if (soundEnabled && typeof window !== 'undefined') {
      try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.15);
      } catch (e) {
        // AudioContext not allowed without interaction
      }
    }
  };

  return (
    <GameContext.Provider value={{
      impactScore,
      calculatedEmissions,
      targetYear,
      reductionPercent,
      resetLevers,
      unlockedBadges,
      showBadgeToast,
      levers,
      updateLever,
      theme,
      displayMode,
      changeDisplayMode,
      toggleTheme,
      ecoMode,
      toggleEcoMode,
      playSound,
      soundEnabled,
      setSoundEnabled
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
