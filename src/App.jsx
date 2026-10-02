import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';

// ─── GLOBAL STYLES ───────────────────────────────────────────────────────────
const styleSheet = `
  @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800;900&family=Roboto:wght@300;400;500;700&family=JetBrains+Mono:wght@400;500;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; }

  :root {
    --color-navy:        #1d3658;
    --color-navy-dark:   #0f2040;
    --color-teal:        #2b9d8f;
    --color-teal-dark:   #1d7a6d;
    --color-lime:        #a7c957;
    --color-coral:       #e76f51;
    --color-pink:        #f28482;
    --color-cream:       #f8f5f0;
    --color-white:       #ffffff;
  }

  body { margin: 0; padding: 0; background: var(--color-cream); }

  .font-manrope { font-family: 'Manrope', sans-serif; }
  .font-roboto  { font-family: 'Roboto', sans-serif; }
  .font-mono    { font-family: 'JetBrains Mono', monospace; }

  /* ─── Dot grid ─── */
  .dot-grid-light {
    background-image: radial-gradient(rgba(29,54,88,0.12) 1px, transparent 1px);
    background-size: 28px 28px;
  }
  .dot-grid-dark {
    background-image: radial-gradient(rgba(43,157,143,0.25) 1px, transparent 1px);
    background-size: 28px 28px;
  }

  /* ─── Animations ─── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .anim-fade-up { animation: fadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  .delay-1 { animation-delay: 100ms; }
  .delay-2 { animation-delay: 220ms; }
  .delay-3 { animation-delay: 340ms; }

  @keyframes marqueeScroll {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .marquee { animation: marqueeScroll 40s linear infinite; }
  .marquee:hover { animation-play-state: paused; }

  @keyframes spinSlow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  .spin-slow { animation: spinSlow 14s linear infinite; }

  @keyframes pulseRing {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50%       { opacity: 0.7; transform: scale(1.04); }
  }
  .pulse-ring { animation: pulseRing 3s ease-in-out infinite; }

  @keyframes trailFade {
    0%   { transform: scale(1); opacity: 0.6; }
    100% { transform: scale(0); opacity: 0; }
  }

  /* ─── Scrollbar ─── */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--color-teal); border-radius: 3px; }

  /* ─── Range input theming ─── */
  input[type=range] { -webkit-appearance: none; appearance: none; height: 6px; border-radius: 4px; outline: none; cursor: pointer; }
  input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none; appearance: none;
    width: 18px; height: 18px; border-radius: 50%;
    background: var(--color-teal); border: 3px solid white;
    box-shadow: 0 2px 8px rgba(43,157,143,0.35); cursor: pointer;
  }
  input[type=range]::-moz-range-thumb {
    width: 18px; height: 18px; border-radius: 50%;
    background: var(--color-teal); border: 3px solid white;
    box-shadow: 0 2px 8px rgba(43,157,143,0.35); cursor: pointer;
  }

  /* ─── Glassmorphism ─── */
  .glass {
    background: rgba(255,255,255,0.6);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255,255,255,0.3);
  }
  .glass-dark {
    background: rgba(15,32,64,0.65);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border: 1px solid rgba(43,157,143,0.25);
  }

  /* ─── HUD line animation ─── */
  @keyframes drawLine {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }
  .hud-line { animation: drawLine 0.6s ease-out forwards; transform-origin: left; }
`;

// ─── SCROLL REVEAL ────────────────────────────────────────────────────────────
const ScrollReveal = ({ children, delay = 0, className = '' }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => setVisible(true), delay); obs.disconnect(); } },
      { rootMargin: '0px 0px -80px 0px' }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}>
      {children}
    </div>
  );
};

// ─── PRELOADER ────────────────────────────────────────────────────────────────
const Preloader = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 200);
    const t2 = setTimeout(() => setPhase(2), 900);
    const t3 = setTimeout(() => setPhase(3), 1700);
    const t4 = setTimeout(() => { if (onComplete) onComplete(); }, 2500);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, []);
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-cream overflow-hidden">
      <div
        className="bg-navy transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
        style={{
          width:  phase === 0 ? 0 : phase === 1 ? 4 : phase === 2 ? '14rem' : '100vw',
          height: phase < 3 ? 3 : '100vh',
          borderRadius: phase === 3 ? 0 : 4,
          opacity: phase === 0 ? 0 : 1,
        }}
      />
    </div>
  );
};

// ─── NZII GLOBE (Three.js, scroll-driven rotate → zoom into India) ─────────────
const NZIIGlobe = ({ progress }) => {
  const mountRef = useRef(null);
  const frameRef = useRef(null);
  const earthGroupRef = useRef(null);
  const earthRef = useRef(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const W = el.clientWidth || 560;
    const H = el.clientHeight || 560;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 1000);
    camera.position.set(0, 0, 3.0);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambient);
    const sun = new THREE.DirectionalLight(0xffffff, 1.4);
    sun.position.set(5, 3, 5);
    scene.add(sun);

    const group = new THREE.Group();
    scene.add(group);
    earthGroupRef.current = group;

    const geo = new THREE.SphereGeometry(1, 64, 64);
    const loader = new THREE.TextureLoader();
    const earthTex = loader.load('https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg');
    const bumpTex  = loader.load('https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png');
    const mat = new THREE.MeshPhongMaterial({
      map: earthTex, bumpMap: bumpTex, bumpScale: 0.05,
      specular: new THREE.Color(0x2b9d8f), shininess: 20,
    });
    const earth = new THREE.Mesh(geo, mat);
    group.add(earth);
    earthRef.current = earth;

    // Atmosphere glow
    const atmosMat = new THREE.MeshPhongMaterial({ color: 0x2b9d8f, transparent: true, opacity: 0.08, side: THREE.FrontSide });
    group.add(new THREE.Mesh(new THREE.SphereGeometry(1.04, 64, 64), atmosMat));

    // Multiple real data markers across India
    const MARKERS = [
      { id: 'delhi',     lat: 28.7,  lon: 77.1,  label: 'Delhi',     metric: '302 Mt', color: '#e76f51' },
      { id: 'mumbai',   lat: 19.1,  lon: 72.9,  label: 'Mumbai',    metric: '184 Mt', color: '#f4a261' },
      { id: 'kolkata',  lat: 22.6,  lon: 88.4,  label: 'Kolkata',   metric: '143 Mt', color: '#a7c957' },
      { id: 'chennai',  lat: 13.1,  lon: 80.3,  label: 'Chennai',   metric: '118 Mt', color: '#2b9d8f' },
      { id: 'bengaluru',lat: 12.97, lon: 77.6,  label: 'Bengaluru', metric: '96 Mt',  color: '#e9c46a' },
    ];

    const pins = MARKERS.map(m => {
      const phi   = (90 - m.lat) * (Math.PI / 180);
      const theta = (m.lon + 180) * (Math.PI / 180);
      const px = -(Math.sin(phi) * Math.cos(theta));
      const pz =   Math.sin(phi) * Math.sin(theta);
      const py =   Math.cos(phi);
      const pin = new THREE.Mesh(
        new THREE.SphereGeometry(0.005, 6, 6),
        new THREE.MeshBasicMaterial({ color: parseInt(m.color.replace('#',''), 16), transparent: true, opacity: 0 })
      );
      pin.position.set(px * 1.01, py * 1.01, pz * 1.01);
      earth.add(pin);
      return { ...m, pin };
    });

    const vec = new THREE.Vector3();
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      renderer.render(scene, camera);

      // Project each marker pin to screen space
      pins.forEach(m => {
        vec.setFromMatrixPosition(m.pin.matrixWorld);
        const isVisible = vec.z > 0.05;
        vec.project(camera);
        const sx = (vec.x * 0.5 + 0.5) * el.clientWidth;
        const sy = (vec.y * -0.5 + 0.5) * el.clientHeight;
        const labelEl = document.getElementById(`globe-label-${m.id}`);
        if (labelEl) {
          labelEl.style.transform = `translate(-50%, -100%) translate(${sx}px, ${sy}px)`;
          labelEl.style.opacity = isVisible ? '1' : '0';
        }
      });
    };
    animate();

    const onResize = () => {
      const w = el.clientWidth, h = el.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  // Scroll-driven animation: Phase 1 rotate → Phase 2 zoom
  useEffect(() => {
    const earth = earthRef.current;
    const group = earthGroupRef.current;
    const camera = cameraRef.current;
    if (!earth || !group || !camera) return;

    // Based on India being on the right in the screenshot, it needed ~ +1.57 rot
    // Let's calculate exactly. Texture longitude mapping:
    // Usually, 0 lon is at -Z (if mapping is inverted) or +X. 
    // Through trial and error from the previous state, India was facing +X (right side)
    // To face +Z (camera), we subtract Math.PI / 2.
    const INDIA_LON = 78.96;
    const INDIA_ROT_Y = -Math.PI * (INDIA_LON / 180) - Math.PI / 2;
    
    // We want India to face +Z. Let's set it as target.
    const targetRotY = INDIA_ROT_Y;
    const startRotY = targetRotY + Math.PI; // Start from opposite side (Americas)

    // To center India vertically, tilt the whole group down by India's latitude
    const INDIA_LAT = 20.59;
    const targetRotX = (INDIA_LAT * Math.PI) / 180; // Tilt forward by ~20 degrees

    const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
    const ease = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    if (progress < 0.45) {
      // Phase 1: Rotate from Americas to India (0 → 45% scroll)
      const t = clamp(progress / 0.45, 0, 1);
      const e = ease(t);
      earth.rotation.y = startRotY - Math.PI * e; // sweep 180°
      
      // Gradually tilt X to bring India to vertical center
      group.rotation.x = targetRotX * e; 
      
      camera.position.set(0, 0, 3.0);
    } else {
      // Phase 2: Zoom to a comfortable India view (45% → 90% scroll)
      const t = clamp((progress - 0.45) / 0.45, 0, 1);
      const e = ease(t);
      earth.rotation.y = targetRotY;
      group.rotation.x = targetRotX;
      
      // Ends at z=1.75 — close enough to fill globe with India but not too vague
      const z = 3.0 - e * 1.25;
      camera.position.set(0, 0, z);
      camera.updateProjectionMatrix();
    }
  }, [progress]);

  const globeOp = progress < 0.05 ? 0 : progress < 0.14 ? (progress - 0.05) / 0.09 : 1;

  return (
    <div className="relative pointer-events-none flex items-center justify-center"
      style={{ width: 'min(700px, 62vw)', aspectRatio: '1', opacity: globeOp }}>
      <div ref={mountRef} className="w-full h-full rounded-full overflow-hidden" />

      {/* Multi-city data markers */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { id: 'delhi',      label: 'Delhi',     metric: '302 Mt', unit: 'CO₂/yr', sub: 'Energy & Industry',  c: '#ff6b6b' },
          { id: 'mumbai',    label: 'Mumbai',    metric: '184 Mt', unit: 'CO₂/yr', sub: 'Transport Hub',       c: '#ffa94d' },
          { id: 'kolkata',   label: 'Kolkata',   metric: '143 Mt', unit: 'CO₂/yr', sub: 'Industrial Zone',     c: '#a9e34b' },
          { id: 'chennai',   label: 'Chennai',   metric: '118 Mt', unit: 'CO₂/yr', sub: 'Port & Logistics',    c: '#38d9a9' },
          { id: 'bengaluru', label: 'Bengaluru', metric: '96 Mt',  unit: 'CO₂/yr', sub: 'Tech Transition',     c: '#ffd43b' },
        ].map(m => (
          <div key={m.id} id={`globe-label-${m.id}`}
               className="absolute top-0 left-0 flex flex-col items-center"
               style={{ opacity: 0, transition: 'opacity 0.4s ease' }}>
            
            {/* Rich Data Card */}
            <div className="relative rounded-xl backdrop-blur-lg flex flex-col items-center overflow-hidden"
                 style={{
                   background: 'linear-gradient(160deg, rgba(5,12,30,0.92) 0%, rgba(10,22,50,0.96) 100%)',
                   border: `1px solid ${m.c}45`,
                   boxShadow: `0 8px 32px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 ${m.c}20`,
                   minWidth: 110,
                   padding: '10px 14px 8px',
                 }}>
              
              {/* Colored top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-xl"
                   style={{ background: `linear-gradient(to right, transparent, ${m.c}, transparent)`,
                            boxShadow: `0 0 10px 1px ${m.c}` }} />

              {/* City name */}
              <span className="text-[8px] font-bold tracking-[0.3em] uppercase mb-1.5"
                    style={{ color: `${m.c}` }}>{m.label}</span>
              
              {/* Big metric */}
              <div className="flex items-baseline gap-1.5">
                <span className="text-[18px] font-black leading-none"
                      style={{ color: '#ffffff', textShadow: `0 0 20px ${m.c}50` }}>{m.metric}</span>
              </div>
              <span className="text-[8px] font-mono mt-0.5" style={{ color: `${m.c}90` }}>{m.unit}</span>

              {/* Divider */}
              <div className="w-full my-1.5" style={{ height: 1, background: `linear-gradient(to right, transparent, ${m.c}30, transparent)` }} />
              
              {/* Sub label */}
              <span className="text-[7.5px] font-mono text-white/40 tracking-wide">{m.sub}</span>
            </div>

            {/* Stem */}
            <div className="flex flex-col items-center">
              <div className="w-px h-7" style={{ background: `linear-gradient(to bottom, ${m.c}80, ${m.c}10)` }} />
              {/* Anchor pulse */}
              <div className="relative flex items-center justify-center w-5 h-5">
                <div className="absolute inset-0 rounded-full animate-ping" style={{ background: `${m.c}25` }} />
                <div className="absolute w-2.5 h-2.5 rounded-full" style={{ background: `${m.c}40`, border: `1px solid ${m.c}80` }} />
                <div className="absolute w-1.5 h-1.5 rounded-full" style={{ background: m.c, boxShadow: `0 0 10px 3px ${m.c}` }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Atmosphere ring */}
      <div className="absolute inset-0 rounded-full pointer-events-none"
        style={{ boxShadow: '0 0 60px 10px rgba(43,157,143,0.3), inset 0 0 50px rgba(0,0,0,0.55)' }} />
    </div>
  );
};


const PolicyScenarioDashboard = ({ scrollProgress }) => {
  const ACTIONS = [
    { id: 'solar', label: 'Energy Sector Shift', desc: 'Achieve 500 GW non-fossil capacity by 2030 and phase out coal.', impact: 38 },
    { id: 'industry', label: 'Industrial Decarbonisation', desc: 'National Green Hydrogen Mission for steel and cement sectors.', impact: 26 },
    { id: 'ev', label: 'Transport Electrification', desc: 'EV30@30 campaign: 30% electric vehicle penetration by 2030.', impact: 13 },
    { id: 'trees', label: 'Agriculture & LULUCF', desc: 'Increase forest cover to create a 2.5–3 GtCO₂e carbon sink.', impact: 15 },
  ];

  const activeActions = {
    solar: scrollProgress > 0.15,
    ev: scrollProgress > 0.40,
    industry: scrollProgress > 0.65,
    trees: scrollProgress > 0.90,
  };

  // Base progress is 8%. Max is 100%.
  const currentProgress = 8 + ACTIONS.reduce((acc, a) => acc + (activeActions[a.id] ? a.impact : 0), 0);
  const progressColor = currentProgress > 80 ? '#a7c957' : currentProgress > 40 ? '#f28482' : '#e76f51';

  const renderIcon = (id, active) => {
    const color = active ? '#a7c957' : 'rgba(255,255,255,0.2)';
    const strokeWidth = active ? '2' : '1.5';
    switch (id) {
      case 'solar': return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>;
      case 'ev': return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth}><rect x="4" y="6" width="16" height="12" rx="2"/><path d="M20 10v4M8 12h8M12 8v8"/></svg>;
      case 'industry': return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth}><path d="M12 20v-6l-4 3V8l4 3V5h6v15M4 20V12l4 3v5"/></svg>;
      case 'trees': return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth}><path d="M12 22V13M12 13C8 13 6 9 6 6c0-2 2-4 6-4s6 2 6 4c0 3-2 7-6 7zM12 13c3 3 6 4 6 9M12 13c-3 3-6 4-6 9"/></svg>;
      default: return null;
    }
  };

  return (
    <div className="w-full max-w-5xl flex flex-col items-center pb-4">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-1">
          <div className="w-2 h-2 rounded-full bg-teal shadow-[0_0_8px_var(--color-teal)] animate-pulse"></div>
          <h2 className="font-mono text-xs tracking-[0.2em] uppercase font-bold text-teal">Carbon Transition Sequence</h2>
        </div>
        <p className="text-xl font-manrope font-bold text-white mb-5">Scroll to initiate 2070 climate trajectory protocols</p>
        
        <div className="flex items-end justify-center gap-4 bg-[rgba(10,20,40,0.85)] border border-teal/20 px-8 py-3 rounded-full backdrop-blur-md">
          <span className="text-[10px] text-white/50 uppercase tracking-widest font-mono mb-1">Net-Zero Progress</span>
          <span className="text-3xl font-black font-mono tracking-tighter drop-shadow-md" style={{ color: progressColor }}>{currentProgress}%</span>
        </div>
      </div>

      {/* TIMELINE CONTAINER */}
      <div className="relative w-full max-w-4xl flex justify-between h-[420px]">
        {/* The DNA / Carbon Thread */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[50px] -translate-x-1/2 overflow-hidden pointer-events-none">
          <svg width="50" height="100%" preserveAspectRatio="none" viewBox="0 0 50 400" className="opacity-30">
            <path d="M25 0 Q50 50 25 100 T25 200 T25 300 T25 400" fill="none" stroke="#2b9d8f" strokeWidth="2" strokeDasharray="4 4" />
            <path d="M25 0 Q0 50 25 100 T25 200 T25 300 T25 400" fill="none" stroke="#a7c957" strokeWidth="2" strokeDasharray="4 4" />
          </svg>
          <div className="absolute top-0 left-1/2 w-0.5 bg-gradient-to-b from-teal to-lime shadow-[0_0_15px_#2b9d8f] transition-all duration-75" 
               style={{ height: `${scrollProgress * 100}%`, transform: 'translateX(-50%)' }} />
        </div>

        {/* Checkpoints */}
        <div className="w-full flex flex-col justify-between h-full relative z-10 py-1">
          {ACTIONS.map((a, idx) => {
            const active = activeActions[a.id];
            const isLeft = idx % 2 === 0;
            return (
              <div key={a.id} className={`flex items-center w-full ${isLeft ? 'flex-row' : 'flex-row-reverse'}`} style={{ opacity: active ? 1 : 0.4, transition: 'all 0.5s ease', transform: `scale(${active ? 1 : 0.95})` }}>
                
                {/* Content Card */}
                <div className={`w-[45%] ${isLeft ? 'text-right' : 'text-left'}`}>
                  <div className={`p-4 rounded-xl border backdrop-blur-md transition-all duration-500 ${active ? 'bg-teal/10 border-teal/50 shadow-[0_0_20px_rgba(43,157,143,0.15)]' : 'bg-white/5 border-white/10'}`}>
                    <div className={`flex items-center gap-2 mb-1.5 ${isLeft ? 'justify-end' : 'justify-start'}`}>
                      {isLeft ? null : <div className="p-1 rounded bg-white/5 border border-white/10">{renderIcon(a.id, active)}</div>}
                      <span className={`font-mono text-[8px] tracking-widest font-bold ${active ? 'text-lime' : 'text-white/30'}`}>PHASE 0{idx + 1}</span>
                      {isLeft ? <div className="p-1 rounded bg-white/5 border border-white/10">{renderIcon(a.id, active)}</div> : null}
                    </div>
                    <div className={`text-[14px] md:text-base font-bold font-manrope leading-tight mb-1 ${active ? 'text-white' : 'text-white/70'}`}>{a.label}</div>
                    <div className="text-[10px] md:text-[11px] font-mono text-white/40 leading-snug">{a.desc}</div>
                  </div>
                </div>

                {/* Node */}
                <div className="w-[10%] flex justify-center items-center">
                  <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${active ? 'border-lime bg-navy shadow-[0_0_12px_#a7c957]' : 'border-white/20 bg-navy'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${active ? 'bg-lime' : 'bg-transparent'}`} />
                  </div>
                </div>

                <div className="w-[45%] flex items-center" style={{ justifyContent: isLeft ? 'flex-start' : 'flex-end' }}>
                  <div className={`inline-block px-2.5 py-1 rounded bg-black/40 border border-white/5 text-[8.5px] font-mono tracking-widest font-bold transition-all duration-500 ${active ? 'text-lime scale-100 opacity-100' : 'text-white/20 scale-90 opacity-0 -translate-x-4'}`}>
                    +{a.impact}% Progress
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};



// ─── CINEMATIC HOME SECTION ───────────────────────────────────────────────────
const CinematicHomeSection = ({ navigate }) => {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (!containerRef.current) return;
      const { top, height } = containerRef.current.getBoundingClientRect();
      const wh = window.innerHeight;
      const scrollPx = -top;
      const scrollable = height - wh;
      if (scrollPx < 0) setProgress(0);
      else if (scrollPx > scrollable) setProgress(1);
      else setProgress(scrollPx / scrollable);
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    setTimeout(() => setIsLoaded(true), 200);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const fade = (p, from, to) => clamp((p - from) / (to - from), 0, 1);

  // Expanded Scroll Timings for 600vh
  const titleOp = isLoaded ? (1 - fade(progress, 0.08, 0.15)) : 0;
  const splitOp = fade(progress, 0.15, 0.22) * (1 - fade(progress, 0.45, 0.52));
  const policyOp = fade(progress, 0.52, 0.60);
  const policyScroll = fade(progress, 0.60, 0.95);

  // Globe is visible from 0.15 to 0.50. Map this to 0-1 so it can complete its rotate+zoom
  const globeProgress = fade(progress, 0.15, 0.50);

  const navyBgOp = fade(progress, 0.08, 0.15);

  const INDIA_DATA = [
    { s: 'Energy',      v: '1.08 Gt', pct: 38, c: '#e76f51' },
    { s: 'Industry',    v: '0.74 Gt', pct: 26, c: '#f28482' },
    { s: 'Transport',   v: '0.37 Gt', pct: 13, c: '#f28482' },
    { s: 'Agriculture', v: '0.40 Gt', pct: 14, c: '#2b9d8f' },
    { s: 'Buildings',   v: '0.18 Gt', pct: 6,  c: '#f28482' },
    { s: 'LULUCF',      v: '0.11 Gt', pct: 4,  c: '#a7c957' },
  ];

  return (
    <div ref={containerRef} className="relative w-full h-[600vh] bg-cream">
      <div className="sticky top-[56px] w-full h-[calc(100vh-56px)] overflow-hidden bg-cream">

        {/* ── Background layers ── */}
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: 'radial-gradient(circle, #1d3658 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }} />
        <div className="absolute inset-0 transition-opacity duration-300" style={{
          background: '#0f2040', opacity: navyBgOp,
        }} />

        {/* ── PHASE 1: Title on cream ── */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6"
             style={{ opacity: titleOp, transition: 'opacity 0.6s ease', pointerEvents: titleOp > 0.5 ? 'auto' : 'none' }}>
          <div className="text-[11px] font-mono tracking-[0.35em] uppercase mb-5 font-semibold"
               style={{ color: '#2b9d8f' }}>
            NetZero India Initiative
          </div>
          <h1 className="font-manrope font-black leading-none mb-5 tracking-tight text-navy"
              style={{ fontSize: 'clamp(3.5rem, 9vw, 7rem)' }}>
            Net<span style={{ color: '#2b9d8f' }}>Zero</span><br />India
          </h1>
          <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-navy/50 mb-10">
            Mapping India's path to net-zero by 2070
          </p>
          <div className="flex items-center gap-2 text-navy/40 text-[10px] font-mono tracking-widest"
               style={{ animation: 'bounce 2s infinite' }}>
            <span>↓</span><span>Scroll to explore</span>
          </div>
        </div>

        {/* ── PHASE 2: Split layout on navy ── */}
        <div className="absolute inset-0 z-20 flex items-center"
             style={{ opacity: splitOp, transition: 'opacity 0.5s ease', pointerEvents: splitOp > 0.2 ? 'auto' : 'none' }}>

          {/* Left panel — India data */}
          <div className="w-[42%] pl-[5vw] pr-8 flex flex-col justify-center gap-6">
            <div>
              <div className="text-[10px] font-mono tracking-[0.3em] uppercase mb-2" style={{ color: '#2b9d8f' }}>
                India Carbon Footprint
              </div>
              <div className="font-manrope font-black text-white leading-tight"
                   style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}>
                2.88 Gt CO₂<br />
                <span className="text-[40%] font-light text-white/50 tracking-widest uppercase">Gigatonnes per year · 2023</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {INDIA_DATA.map(d => (
                <div key={d.s}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider font-mono"
                          style={{ color: 'rgba(255,255,255,0.6)' }}>{d.s}</span>
                    <span className="text-[11px] font-black font-mono" style={{ color: d.c }}>{d.v}</span>
                  </div>
                  <div className="h-[3px] rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
                    <div className="h-full rounded-full transition-all duration-700"
                         style={{ width: `${d.pct * splitOp}%`, background: d.c }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-2 pt-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              <div className="text-[9px] font-mono tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>
                Source: Climate TRACE 2024 · NDC Target: Net Zero 2070
              </div>
            </div>
          </div>

          {/* Right panel — Globe */}
          <div className="flex-1 flex items-center justify-center pr-4">
            <NZIIGlobe progress={globeProgress} />
          </div>
        </div>

        {/* ── PHASE 3: Policy Modeler (Scroll-driven) ── */}
        <div className="absolute inset-0 z-30 flex items-center justify-center px-6"
             style={{ opacity: policyOp, transition: 'opacity 0.5s ease', pointerEvents: policyOp > 0.5 ? 'auto' : 'none' }}>
          <div className="scale-75 sm:scale-90 lg:scale-100 origin-center w-full max-w-5xl flex justify-center">
            <PolicyScenarioDashboard scrollProgress={policyScroll} />
          </div>
        </div>

      </div>
    </div>
  );
};

// ─── PARTNERS MARQUEE ─────────────────────────────────────────────────────────
const PartnersMarquee = () => (
  <section className="w-full py-16 bg-white border-b border-navy/10 overflow-hidden">
    <div className="max-w-7xl mx-auto px-[3vw] mb-8">
      <span className="font-mono text-xs text-navy/40 tracking-widest uppercase">Institutional Partners & Collaborators</span>
    </div>
    <div className="flex">
      <div className="flex marquee w-max gap-10">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="flex-shrink-0 w-44 h-16 bg-cream border border-navy/8 rounded-xl flex items-center justify-center hover:-translate-y-1 transition-transform duration-300">
            <img src={`https://placehold.co/220x60/f8f5f0/1d3658?text=Partner+${(i % 6) + 1}`} alt="" className="w-full h-full object-contain px-4 opacity-60 mix-blend-multiply" />
          </div>
        ))}
        {[...Array(12)].map((_, i) => (
          <div key={`b-${i}`} className="flex-shrink-0 w-44 h-16 bg-cream border border-navy/8 rounded-xl flex items-center justify-center hover:-translate-y-1 transition-transform duration-300">
            <img src={`https://placehold.co/220x60/f8f5f0/1d3658?text=Partner+${(i % 6) + 1}`} alt="" className="w-full h-full object-contain px-4 opacity-60 mix-blend-multiply" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── PRE-FOOTER CTA ───────────────────────────────────────────────────────────
const PreFooter = () => (
  <section className="w-full py-32 px-[3vw] bg-navy" style={{ background: '#0d1e35' }}>
    <div className="max-w-4xl mx-auto text-center">
      <ScrollReveal>
        <span className="font-mono text-xs text-teal tracking-[0.25em] uppercase mb-6 block">Get Involved</span>
        <h2 className="font-manrope text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
          Shape India's<br /><span style={{ color: 'var(--color-lime)' }}>Net Zero Trajectory</span>
        </h2>
        <p className="font-roboto text-white/50 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
          Access the full methodology, interact with our modelling team, and integrate your organisation's data into the NZII framework.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-10 py-4 bg-teal text-white font-manrope font-bold rounded-xl hover:bg-teal-dark transition-all duration-300 hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(43,157,143,0.35)]">
            Explore the Dataset
          </button>
          <button className="px-10 py-4 bg-white/8 text-white border border-white/15 font-manrope font-bold rounded-xl hover:bg-white/12 transition-all duration-300">
            Contact the PMU
          </button>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

// ─── AI ASSISTANT BOT ─────────────────────────────────────────────────────────
const AIAssistantBot = () => {
  const [open, setOpen]       = useState(false);
  const [input, setInput]     = useState('');
  const [messages, setMessages] = useState([{
    from: 'bot',
    text: 'Hello — I\'m the NZII Intelligence Assistant. Ask me about India\'s sectoral emissions, net-zero pathways, or how to interpret the Blueprint Simulator.',
  }]);
  const endRef = useRef();

  const quickQuestions = [
    'What is India\'s 2030 emissions target?',
    'Explain Scope 1 vs Scope 3',
    'How does the NZII model differ from IEA?',
  ];

  const RESPONSES = {
    default: 'That\'s a great question. The NZII models 9 distinct emission sectors using integrated energy-economy-environment (3E) modelling. Please explore the Blueprint Simulator for facility-level decarbonisation pathways.',
    'scope': 'Scope 1 covers direct emissions from owned sources. Scope 2 covers purchased energy. Scope 3 covers value-chain emissions — these often represent 70–90% of a facility\'s total footprint.',
    'target': 'India has committed to achieving net-zero emissions by 2070 under the Paris Agreement, with a 45% reduction in emissions intensity by 2030 from 2005 levels.',
    'iea': 'The NZII model uses India-specific socioeconomic data, state-level grid emission factors, and sector-disaggregated energy demand modelling — offering higher spatial resolution than IEA\'s global scenarios.',
  };

  const getBotResponse = (q) => {
    const lower = q.toLowerCase();
    if (lower.includes('scope')) return RESPONSES['scope'];
    if (lower.includes('target') || lower.includes('2030') || lower.includes('2070')) return RESPONSES['target'];
    if (lower.includes('iea') || lower.includes('differ') || lower.includes('model')) return RESPONSES['iea'];
    return RESPONSES['default'];
  };

  const send = (text) => {
    const msg = text || input.trim();
    if (!msg) return;
    const updated = [...messages, { from: 'user', text: msg }, { from: 'bot', text: getBotResponse(msg) }];
    setMessages(updated);
    setInput('');
    setTimeout(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3">
      {open && (
        <div className="w-[340px] bg-white rounded-2xl shadow-[0_8px_40px_rgba(29,54,88,0.18)] border border-navy/10 overflow-hidden flex flex-col" style={{ maxHeight: '480px' }}>
          {/* Header */}
          <div className="bg-navy px-5 py-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-lime animate-pulse" />
              <span className="font-manrope font-bold text-white text-sm">NZII Intelligence</span>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/50 hover:text-white transition-colors text-lg leading-none">✕</button>
          </div>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-cream/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`px-4 py-2.5 rounded-2xl text-sm font-roboto max-w-[85%] leading-relaxed ${m.from === 'user' ? 'bg-navy text-white' : 'bg-white border border-navy/8 text-navy shadow-sm'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>
          {/* Quick questions */}
          <div className="px-4 pt-3 pb-1 flex flex-col gap-2 bg-white border-t border-navy/5">
            {quickQuestions.slice(0, 2).map(q => (
              <button key={q} onClick={() => send(q)} className="text-left font-mono text-[10px] text-teal tracking-wide border border-teal/20 rounded-lg px-3 py-2 hover:bg-teal/5 transition-colors">
                {q}
              </button>
            ))}
          </div>
          {/* Input */}
          <div className="p-3 bg-white border-t border-navy/8 flex gap-2">
            <input
              type="text" value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Ask about NZII data..."
              className="flex-1 bg-cream rounded-lg px-3 py-2 text-sm font-roboto outline-none border border-transparent focus:border-teal/40 transition-colors"
            />
            <button onClick={() => send()} className="w-9 h-9 rounded-lg bg-navy flex items-center justify-center hover:bg-teal transition-colors duration-300">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </button>
          </div>
        </div>
      )}

      {/* FAB */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-navy shadow-[0_4px_20px_rgba(29,54,88,0.3)] flex items-center justify-center hover:bg-teal transition-colors duration-300 hover:scale-105 transition-transform"
      >
        {open
          ? <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
          : <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
        }
      </button>
    </div>
  );
};

// ─── CURSOR TRAIL ─────────────────────────────────────────────────────────────
const CursorTrail = () => {
  const [trail, setTrail] = useState([]);
  useEffect(() => {
    const move = (e) => setTrail(prev => [...prev.slice(-10), { x: e.clientX, y: e.clientY, id: Date.now() + Math.random() }]);
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, []);
  useEffect(() => {
    if (trail.length > 0) {
      const t = setTimeout(() => setTrail(prev => prev.slice(1)), 350);
      return () => clearTimeout(t);
    }
  }, [trail]);
  return (
    <div className="fixed inset-0 pointer-events-none z-[9998]">
      {trail.map(p => (
        <div key={p.id} className="absolute w-3 h-3 rounded-full" style={{ left: p.x - 6, top: p.y - 6, background: 'var(--color-teal)', opacity: 0.4, animation: 'trailFade 0.35s ease-out forwards' }} />
      ))}
    </div>
  );
};

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
const HomePage = ({ navigate }) => (
  <div>
    <CinematicHomeSection navigate={navigate} />
    <PartnersMarquee />
    <PreFooter />
  </div>
);

// ─── INNER PAGE LAYOUT (for About, Research, etc.) ───────────────────────────
const InnerPageLayout = ({ badge, title, subtitle, children }) => (
  <div className="pt-28 min-h-screen bg-cream">
    <div className="max-w-7xl mx-auto px-[3vw] py-16">
      <ScrollReveal>
        <span className="font-mono text-xs text-teal tracking-[0.25em] uppercase mb-4 block">{badge}</span>
        <h1 className="font-manrope text-4xl md:text-6xl font-extrabold text-navy mb-4 leading-tight">{title}</h1>
        <p className="font-roboto text-navy/60 text-lg md:text-xl leading-relaxed max-w-3xl mb-16">{subtitle}</p>
      </ScrollReveal>
      {children}
    </div>
  </div>
);

// ─── STATIC INNER PAGES ───────────────────────────────────────────────────────
const AboutPage = () => (
  <InnerPageLayout badge="About NZII" title="Mission & Methodology" subtitle="Envisioning net-zero pathways that balance India's development goals with resource constraints, socio-economic trade-offs, and environmental imperatives.">
    <div className="grid md:grid-cols-2 gap-8">
      {[
        { title: 'Integrated Modelling', body: 'Our framework integrates energy, economic, and environmental models to produce high-resolution scenario analysis across all nine major emission sectors.', color: 'teal' },
        { title: 'Data Sovereignty', body: 'NZII maintains sovereign, auditable datasets aligned with India\'s Statistical Commission standards, ensuring defensible closure for policy submissions.', color: 'lime' },
        { title: 'Stakeholder Collaboration', body: 'We work with 200+ institutions across government, industry, and academia to co-develop pathways that are technically feasible and politically achievable.', color: 'coral' },
        { title: 'Open Science Mandate', body: 'All primary datasets, scenario assumptions, and methodology documentation are published under a Creative Commons licence for peer scrutiny.', color: 'pink' },
      ].map(card => (
        <ScrollReveal key={card.title}>
          <div className="bg-white rounded-2xl p-8 border border-navy/8 shadow-[0_4px_24px_rgba(29,54,88,0.05)] hover:-translate-y-1 transition-all duration-300">
            <div className="w-2 h-8 rounded-full mb-5" style={{ backgroundColor: `var(--color-${card.color})` }} />
            <h3 className="font-manrope font-bold text-navy text-xl mb-3">{card.title}</h3>
            <p className="font-roboto text-navy/60 leading-relaxed">{card.body}</p>
          </div>
        </ScrollReveal>
      ))}
    </div>
  </InnerPageLayout>
);

// ─── NET ZERO MODELLER ────────────────────────────────────────────────────────
const NetZeroModeller = () => {
  const presets = {
    'Integrated Steel Plant (Odisha)': {
      sector: 'Heavy Industry (Hard-to-abate)',
      baseline: 4500000, // 4.5 Mt CO2e
      levers: [
        { id: 'hydrogen',  label: 'Green Hydrogen DRI', unit: '% Blend', min: 0, max: 100, default: 10, impact: -0.35, scope: 'Scope 1', description: 'Substituting coking coal with Green Hydrogen in Direct Reduced Iron (DRI) kilns.' },
        { id: 'renewable', label: 'RTC Renewable Power (Solar+BESS)', unit: '% Grid', min: 0, max: 100, default: 25, impact: -0.22, scope: 'Scope 2', description: 'Round-the-clock (RTC) renewable energy procurement via interstate transmission system (ISTS).' },
        { id: 'scrap',     label: 'EAF Scrap Utilization', unit: '% Scrap', min: 0, max: 100, default: 15, impact: -0.18, scope: 'Scope 3', description: 'Increasing steel scrap ratio in Electric Arc Furnaces to reduce virgin iron ore mining emissions.' },
        { id: 'ccus',      label: 'Carbon Capture (CCUS)', unit: 'On/Off', min: 0, max: 1, default: 0, impact: -0.15, scope: 'Residual', description: 'Pilot carbon capture unit attached to blast furnace off-gas streams.', toggle: true },
      ]
    },
    'Textile Manufacturing (Tiruppur)': {
      sector: 'MSME Manufacturing',
      baseline: 125000, // 125k t CO2e
      levers: [
        { id: 'biomass',   label: 'Agri-Residue Biomass Boilers', unit: '% Steam', min: 0, max: 100, default: 40, impact: -0.45, scope: 'Scope 1', description: 'Replacing coal-fired boilers with briquettes made from agricultural waste (mustard husk/bagasse).' },
        { id: 'solar',     label: 'Rooftop Solar PV', unit: '% Load', min: 0, max: 100, default: 30, impact: -0.20, scope: 'Scope 2', description: 'On-site rooftop solar installations with net-metering for spinning and weaving loads.' },
        { id: 'water',     label: 'ZLD Energy Recovery', unit: 'On/Off', min: 0, max: 1, default: 0, impact: -0.08, scope: 'Scope 1', description: 'Heat recovery from Zero Liquid Discharge (ZLD) effluent treatment plants.', toggle: true },
        { id: 'materials', label: 'Recycled PET/Cotton', unit: '% Feed', min: 0, max: 100, default: 20, impact: -0.18, scope: 'Scope 3', description: 'Sourcing rPET and recycled cotton yarns to lower Scope 3 embodied emissions.' },
      ]
    },
    'Cement Plant (Rajasthan)': {
      sector: 'Heavy Industry (Process Emissions)',
      baseline: 2800000, // 2.8 Mt CO2e
      levers: [
        { id: 'clinker',   label: 'Clinker Substitution (Fly Ash/Slag)', unit: '% Sub', min: 0, max: 100, default: 35, impact: -0.40, scope: 'Scope 1', description: 'Using thermal power plant fly ash and steel slag to reduce energy-intensive clinker production.' },
        { id: 'afr',       label: 'Alternative Fuels (AFR)', unit: '% Fuel', min: 0, max: 100, default: 15, impact: -0.25, scope: 'Scope 1', description: 'Co-processing municipal solid waste (MSW) and industrial waste in cement kilns.' },
        { id: 'whrs',      label: 'Waste Heat Recovery (WHRS)', unit: 'On/Off', min: 0, max: 1, default: 0, impact: -0.12, scope: 'Scope 2', description: 'Generating captive electricity using waste heat from the pre-heater and cooler.', toggle: true },
        { id: 'ev',        label: 'Electric Mining Fleet', unit: '% Fleet', min: 0, max: 100, default: 10, impact: -0.08, scope: 'Scope 1', description: 'Electrifying heavy earth-moving machinery (HEMM) in captive limestone mines.' },
      ]
    }
  };

  const [activePreset, setActivePreset] = useState('Integrated Steel Plant (Odisha)');
  const preset = presets[activePreset];

  const initVals = () => preset.levers.reduce((acc, l) => ({ ...acc, [l.id]: l.default }), {});
  const [vals, setVals] = useState(initVals());
  useEffect(() => { setVals(initVals()); }, [activePreset]);

  const totalReduction = preset.levers.reduce((sum, l) => {
    const v = vals[l.id] || 0;
    if (l.toggle) return sum + (v ? l.impact * preset.baseline : 0);
    return sum + (v / 100) * l.impact * preset.baseline;
  }, 0);
  const remaining = Math.max(0, preset.baseline + totalReduction);
  const pct = Math.round(((preset.baseline - remaining) / preset.baseline) * 100);

  const scopeColors = { 'Scope 1': '#e76f51', 'Scope 2': '#2b9d8f', 'Scope 3 Cat.1': '#a7c957', 'Scope 3 Cat.4': '#a7c957', 'Residual': '#f28482' };

  return (
    <section className="w-full py-24 px-[3vw] bg-cream border-b border-navy/10 dot-grid-light">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10 border-t border-navy/10 pt-8">
          <span className="font-mono text-xs text-navy/40 tracking-widest uppercase">Section 03</span>
          <h2 className="font-manrope text-3xl md:text-4xl font-extrabold text-navy mt-2 mb-2">Decarbonisation Blueprint</h2>
          <p className="font-roboto text-navy/60 text-base max-w-2xl">Select an Indian industrial facility profile, adjust the strategic intervention levers (like Green Hydrogen or Biomass), and watch the Scope 1, 2, and 3 emissions respond in real-time.</p>
        </div>

        {/* Preset Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          <span className="font-mono text-xs text-navy/40 tracking-widest uppercase self-center mr-2">FACILITY PRESETS:</span>
          {Object.keys(presets).map(p => (
            <button
              key={p}
              onClick={() => setActivePreset(p)}
              className={`px-5 py-2.5 rounded-full font-manrope font-bold text-sm transition-all duration-300 border ${activePreset === p ? 'bg-navy text-white border-navy shadow-[0_4px_16px_rgba(29,54,88,0.25)]' : 'bg-white text-navy border-navy/20 hover:border-navy/50'}`}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left: Levers Panel */}
          <div className="bg-white rounded-2xl border border-navy/10 shadow-[0_4px_24px_rgba(29,54,88,0.06)] overflow-hidden">
            <div className="p-6 border-b border-navy/10">
              <span className="font-mono text-xs text-teal tracking-widest uppercase">SELECTED FACILITY PROFILE</span>
              <h3 className="font-manrope font-bold text-navy text-xl mt-1">{activePreset}</h3>
              <p className="font-roboto text-navy/50 text-sm">{preset.sector}</p>
            </div>

            <div className="divide-y divide-navy/5">
              {preset.levers.map(lever => (
                <div key={lever.id} className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-manrope font-semibold text-navy">{lever.label}</span>
                    </div>
                    {lever.toggle ? (
                      <button
                        onClick={() => setVals(v => ({ ...v, [lever.id]: v[lever.id] ? 0 : 1 }))}
                        className={`w-12 h-6 rounded-full transition-all duration-300 relative flex-shrink-0 ml-4 ${vals[lever.id] ? 'bg-teal' : 'bg-navy/10'}`}
                      >
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${vals[lever.id] ? 'left-7' : 'left-1'}`} />
                      </button>
                    ) : (
                      <span className={`font-mono text-xs font-bold px-3 py-1.5 rounded-full flex-shrink-0 ml-4 text-white`}
                        style={{ backgroundColor: scopeColors[lever.scope] || '#1d3658' }}>
                        {vals[lever.id]}{lever.unit === '% Cleansed' ? '% Cleansed' : lever.unit === '% Recycled' ? '% Recycled' : '% Neutralised'}
                      </span>
                    )}
                  </div>

                  {!lever.toggle && (
                    <div className="mb-3">
                      <div className="flex justify-between font-mono text-xs text-navy/30 mb-1.5">
                        <span>0</span><span>50</span><span>100</span>
                      </div>
                      <input
                        type="range" min={lever.min} max={lever.max} value={vals[lever.id]}
                        onChange={e => setVals(v => ({ ...v, [lever.id]: Number(e.target.value) }))}
                        className="w-full"
                        style={{ background: `linear-gradient(to right, var(--color-teal) ${vals[lever.id]}%, rgba(29,54,88,0.08) ${vals[lever.id]}%)` }}
                      />
                    </div>
                  )}

                  <p className="font-roboto text-navy/50 text-xs leading-relaxed">{lever.description}</p>
                  <span className="inline-block mt-2 font-mono text-[10px] px-2 py-0.5 rounded" style={{ backgroundColor: `${scopeColors[lever.scope]}18`, color: scopeColors[lever.scope] }}>{lever.scope}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Live Dashboard */}
          <div className="flex flex-col gap-6">
            {/* Big number */}
            <div className="bg-navy rounded-2xl p-8 text-white relative overflow-hidden">
              <div className="absolute inset-0 dot-grid-dark opacity-50" />
              <div className="relative z-10">
                <span className="font-mono text-xs text-teal tracking-widest uppercase">Projected Annual Emissions</span>
                <div className="mt-4 mb-2 flex items-end gap-3">
                  <span className="font-manrope font-extrabold text-6xl">{Math.round(remaining).toLocaleString()}</span>
                  <span className="font-mono text-teal text-xl mb-2">tCO₂e</span>
                </div>
                <p className="font-mono text-xs text-white/40">vs baseline {preset.baseline.toLocaleString()} tCO₂e/yr</p>

                {/* Progress bar */}
                <div className="mt-8">
                  <div className="flex justify-between font-mono text-xs text-white/50 mb-2">
                    <span>Reduction</span>
                    <span className="text-lime font-bold">{pct}%</span>
                  </div>
                  <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${pct}%`, background: pct >= 50 ? 'var(--color-lime)' : pct >= 25 ? 'var(--color-teal)' : 'var(--color-coral)' }}
                    />
                  </div>
                  <div className="flex justify-between font-mono text-xs text-white/30 mt-1.5">
                    <span>0%</span><span>2030 Target: 50%</span><span>100%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Scope breakdown */}
            <div className="bg-white rounded-2xl border border-navy/10 p-6 shadow-[0_4px_24px_rgba(29,54,88,0.05)]">
              <span className="font-mono text-xs text-navy/40 tracking-widest uppercase">Scope Breakdown</span>
              <div className="mt-4 space-y-4">
                {preset.levers.map(lever => {
                  const reduction = lever.toggle
                    ? (vals[lever.id] ? Math.abs(lever.impact) * preset.baseline : 0)
                    : (vals[lever.id] / 100) * Math.abs(lever.impact) * preset.baseline;
                  const pctReduction = Math.round((reduction / preset.baseline) * 100);
                  return (
                    <div key={lever.id}>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="font-roboto text-sm text-navy/70">{lever.scope}</span>
                        <span className="font-mono text-xs font-bold" style={{ color: scopeColors[lever.scope] }}>−{Math.round(reduction).toLocaleString()} t</span>
                      </div>
                      <div className="w-full h-1.5 bg-navy/5 rounded-full">
                        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pctReduction}%`, backgroundColor: scopeColors[lever.scope] }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Net Zero badge */}
            <div className={`rounded-2xl p-6 border-2 transition-all duration-700 ${pct >= 100 ? 'border-lime bg-lime/10' : pct >= 50 ? 'border-teal/40 bg-teal/5' : 'border-navy/10 bg-white'}`}>
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${pct >= 100 ? 'bg-lime' : pct >= 50 ? 'bg-teal' : 'bg-coral'}`} style={{ boxShadow: pct >= 50 ? '0 0 12px currentColor' : 'none' }} />
                <span className="font-manrope font-bold text-navy text-sm">
                  {pct >= 100 ? '🌿 Net Zero Achieved — ready for validation' : pct >= 50 ? 'On track — 2030 target within reach' : 'Below target — increase intervention levers'}
                </span>
              </div>
              {pct >= 100 && <p className="mt-3 font-roboto text-xs text-navy/60">This facility profile meets the requirements for submission under the NZII 2030 Compliance Framework. Export to PDF for audit trail.</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── CINEMATIC SCROLL EXPERIENCE (Home) ──────────────────────────────────────

// ─── RESEARCH PAGE (Net Zero Modeller) ───────────────────────────────────────
const ResearchPage = () => (
  <div className="pt-28 min-h-screen bg-cream">
    <div className="max-w-[120rem] mx-auto px-[3vw] py-16">
      <div className="mb-12">
        <span className="font-mono text-xs tracking-[0.2em] uppercase text-teal font-bold border border-teal/30 px-3 py-1 rounded-full">Research Tool</span>
        <h1 className="font-manrope text-5xl md:text-6xl font-black text-navy mt-4 mb-4">Net-Zero Modeller</h1>
        <p className="font-roboto text-navy/60 text-lg max-w-2xl">India-specific industrial decarbonisation scenario modelling. Select a facility, adjust levers, and see real-time Scope 1, 2 &amp; 3 impact.</p>
      </div>
      <NetZeroModeller />
    </div>
  </div>
);


const PublicationsOutputsPage = () => (
  <InnerPageLayout badge="Publications" title="Knowledge Hub" subtitle="Peer-reviewed papers, policy briefs, working models, and technical notes from the NZII research programme.">
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        { type: 'Policy Brief', title: 'Carbon Pricing Mechanisms for Indian Power Markets', date: 'Sep 2026' },
        { type: 'Working Paper', title: 'State-Level Renewable Penetration and Grid Stability Scenarios', date: 'Aug 2026' },
        { type: 'Technical Note', title: 'CBAM Border Adjustment & Indian Export Competitiveness', date: 'Jul 2026' },
        { type: 'Dataset', title: 'India Sector-Level Emission Factors Registry 2025', date: 'Jun 2026' },
        { type: 'Policy Brief', title: 'Financing Mechanisms for Industrial Decarbonisation', date: 'May 2026' },
        { type: 'Working Paper', title: 'Net Zero in Steel: Scrap Availability and DRI Pathways', date: 'Apr 2026' },
      ].map((pub, i) => (
        <ScrollReveal key={i} delay={i * 80}>
          <div className="bg-white rounded-2xl border border-navy/8 overflow-hidden hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(29,54,88,0.1)] transition-all duration-300 cursor-pointer group h-full flex flex-col">
            <div className="h-2" style={{ backgroundColor: ['var(--color-teal)', 'var(--color-lime)', 'var(--color-coral)', 'var(--color-pink)', 'var(--color-teal)', 'var(--color-lime)'][i] }} />
            <div className="p-6 flex flex-col flex-1">
              <span className="font-mono text-[10px] tracking-widest text-navy/40 uppercase mb-3">{pub.type}</span>
              <h3 className="font-manrope font-bold text-navy text-base leading-snug mb-4 flex-1 group-hover:text-teal transition-colors duration-300">{pub.title}</h3>
              <div className="flex items-center justify-between mt-4">
                <span className="font-mono text-xs text-navy/30">{pub.date}</span>
                <span className="font-manrope text-xs font-bold text-teal opacity-0 group-hover:opacity-100 transition-opacity">Download →</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  </InnerPageLayout>
);

const NewsEventsPage = () => (
  <InnerPageLayout badge="News & Events" title="Latest Updates" subtitle="Coverage, announcements, and upcoming events from the NZII programme.">
    <div className="space-y-4">
      {[
        { date: 'Oct 2026', tag: 'Event', title: 'NZII at COP31 — Side Event: India\'s Long-Term Strategy Modelling', location: 'Dubai, UAE' },
        { date: 'Sep 2026', tag: 'Press', title: 'NZII Dataset Featured in Nature Climate Change Editorial', location: '' },
        { date: 'Sep 2026', tag: 'Launch', title: 'Blueprint Simulator v2.0 Public Beta — Now Live', location: '' },
        { date: 'Aug 2026', tag: 'Event', title: 'Workshop: Net-Zero Procurement Standards for PSUs', location: 'New Delhi, India' },
      ].map((item, i) => (
        <ScrollReveal key={i} delay={i * 60}>
          <div className="bg-white rounded-2xl border border-navy/8 p-6 flex items-center gap-6 hover:shadow-[0_4px_20px_rgba(29,54,88,0.08)] hover:border-teal/20 transition-all duration-300 cursor-pointer group">
            <span className="font-mono text-xs text-navy/30 w-16 flex-shrink-0">{item.date}</span>
            <span className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-teal/10 text-teal tracking-widest flex-shrink-0">{item.tag}</span>
            <div className="flex-1">
              <h3 className="font-manrope font-bold text-navy group-hover:text-teal transition-colors duration-300">{item.title}</h3>
              {item.location && <p className="font-roboto text-xs text-navy/40 mt-1">{item.location}</p>}
            </div>
            <span className="text-teal opacity-0 group-hover:opacity-100 transition-opacity font-bold">→</span>
          </div>
        </ScrollReveal>
      ))}
    </div>
  </InnerPageLayout>
);

const TeamGovernancePage = () => (
  <InnerPageLayout badge="Team & Governance" title="The Expert Network" subtitle="The NZII is governed by a multidisciplinary board of climate scientists, economists, and policy practitioners.">
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        { name: 'Dr. Ananya Krishnan', role: 'Lead Modeller, Energy Systems', org: 'IISc Bangalore' },
        { name: 'Prof. Rajesh Nair',   role: 'Director, Climate Policy',      org: 'TERI School' },
        { name: 'Priya Menon',         role: 'Senior Economist',              org: 'CEEW Delhi' },
        { name: 'Dr. Siddharth Rao',   role: 'Transport & Logistics Lead',    org: 'IIT Bombay' },
        { name: 'Kavya Iyer',          role: 'Data Engineering Lead',         org: 'NZII PMU' },
        { name: 'Dr. Arjun Sharma',    role: 'Agriculture & Land Use',        org: 'ICAR' },
      ].map((m, i) => (
        <ScrollReveal key={i} delay={i * 80}>
          <div className="bg-white rounded-2xl border border-navy/8 p-6 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(29,54,88,0.1)] transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center mb-5">
              <span className="font-manrope font-extrabold text-teal text-lg">{m.name.split(' ').map(n => n[0]).join('').slice(0,2)}</span>
            </div>
            <h3 className="font-manrope font-bold text-navy text-base mb-1">{m.name}</h3>
            <p className="font-roboto text-navy/60 text-sm mb-1">{m.role}</p>
            <span className="font-mono text-[10px] text-teal tracking-widest">{m.org}</span>
          </div>
        </ScrollReveal>
      ))}
    </div>
  </InnerPageLayout>
);

const EngagementPage = () => (
  <InnerPageLayout badge="Engagement" title="Partner With NZII" subtitle="Integrate your organisation's operational data into the NZII framework for real-time compliance reporting and scenario co-modelling.">
    <div className="grid md:grid-cols-3 gap-6">
      {[
        { icon: '🏛️', title: 'Government Bodies', body: 'Collaborate with NZII modellers to align state-level climate action plans with the national NDC trajectory.' },
        { icon: '🏭', title: 'Industry & PSUs',   body: 'Use the Blueprint Simulator to build facility-specific decarbonisation roadmaps for regulatory submissions.' },
        { icon: '🎓', title: 'Academic Partners', body: 'Access raw datasets, API feeds, and co-authorship opportunities across our active research programme.' },
      ].map(card => (
        <ScrollReveal key={card.title}>
          <div className="bg-white rounded-2xl border border-navy/8 p-8 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(29,54,88,0.1)] transition-all duration-300 text-center">
            <span className="text-4xl block mb-5">{card.icon}</span>
            <h3 className="font-manrope font-bold text-navy text-xl mb-3">{card.title}</h3>
            <p className="font-roboto text-navy/60 leading-relaxed">{card.body}</p>
            <button className="mt-6 px-6 py-2.5 rounded-xl border border-teal text-teal font-manrope font-bold text-sm hover:bg-teal hover:text-white transition-all duration-300">Enquire →</button>
          </div>
        </ScrollReveal>
      ))}
    </div>
  </InnerPageLayout>
);

const MediaResourcesPage = () => (
  <InnerPageLayout badge="Media & Resources" title="Press Kit & Assets" subtitle="Brand assets, architectural diagrams, approved press releases, and spokesperson contacts for media enquiries.">
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {[
        { title: 'Brand Style Guide',       size: '2.4 MB PDF', tag: 'Brand' },
        { title: 'Architecture Diagrams',   size: '8.1 MB ZIP', tag: 'Technical' },
        { title: 'Approved Press Releases', size: '1.2 MB PDF', tag: 'Press' },
        { title: 'High-Res Logo Pack',      size: '5.6 MB ZIP', tag: 'Brand' },
      ].map((asset, i) => (
        <ScrollReveal key={i} delay={i * 60}>
          <div className="bg-white rounded-2xl border border-navy/8 p-6 hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(29,54,88,0.08)] transition-all duration-300 cursor-pointer group">
            <div className="w-10 h-10 rounded-xl bg-navy/5 flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-navy/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </div>
            <span className="font-mono text-[10px] text-teal tracking-widest uppercase">{asset.tag}</span>
            <h3 className="font-manrope font-bold text-navy text-sm mt-1 mb-3 group-hover:text-teal transition-colors">{asset.title}</h3>
            <p className="font-mono text-[10px] text-navy/30">{asset.size}</p>
          </div>
        </ScrollReveal>
      ))}
    </div>
  </InnerPageLayout>
);

const ContactPage = () => (
  <InnerPageLayout badge="Contact" title="Project Management Unit" subtitle="Reach the NZII Programme Management Unit for partnerships, press enquiries, data access, and collaboration proposals.">
    <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
      <div className="bg-white rounded-2xl border border-navy/8 p-8 shadow-[0_4px_24px_rgba(29,54,88,0.05)]">
        <h3 className="font-manrope font-bold text-navy text-xl mb-6">Send an Enquiry</h3>
        <div className="flex flex-col gap-4">
          {['Full Name', 'Organisation', 'Email Address'].map(label => (
            <div key={label}>
              <label className="font-mono text-[10px] text-navy/40 tracking-widest uppercase block mb-1.5">{label}</label>
              <input type="text" className="w-full bg-cream border border-navy/10 rounded-xl px-4 py-3 font-roboto text-sm text-navy outline-none focus:border-teal/50 transition-colors" />
            </div>
          ))}
          <div>
            <label className="font-mono text-[10px] text-navy/40 tracking-widest uppercase block mb-1.5">Message</label>
            <textarea rows="4" className="w-full bg-cream border border-navy/10 rounded-xl px-4 py-3 font-roboto text-sm text-navy outline-none focus:border-teal/50 transition-colors resize-none" />
          </div>
          <button className="w-full py-3.5 bg-navy text-white font-manrope font-bold rounded-xl hover:bg-teal transition-colors duration-300">Submit Enquiry</button>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        {[
          { label: 'PMU Office', value: 'TERI University Campus, New Delhi — 110 003' },
          { label: 'General Enquiries', value: 'pmu@nzii.org.in' },
          { label: 'Media & Press', value: 'media@nzii.org.in' },
          { label: 'Data Access', value: 'data@nzii.org.in' },
        ].map(c => (
          <div key={c.label} className="bg-white rounded-2xl border border-navy/8 p-6">
            <span className="font-mono text-[10px] text-teal tracking-widest uppercase block mb-2">{c.label}</span>
            <p className="font-roboto text-navy font-medium">{c.value}</p>
          </div>
        ))}
      </div>
    </div>
  </InnerPageLayout>
);

// ─── FOOTER ───────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer className="w-full bg-navy border-t border-teal/15 py-12 px-[3vw]" style={{ background: '#0d1e35' }}>
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
      <div>
        <span className="font-manrope font-extrabold text-white text-xl tracking-tight">NZII</span>
        <p className="font-mono text-xs text-white/30 tracking-widest mt-1">NetZero India Initiative</p>
      </div>
      <div className="font-mono text-xs text-white/30 tracking-widest">© 2026 NZII — All Rights Reserved</div>
      <div className="flex gap-6">
        {['Privacy', 'Terms', 'Sitemap'].map(l => (
          <span key={l} className="font-roboto text-sm text-white/40 hover:text-white cursor-pointer transition-colors">{l}</span>
        ))}
      </div>
    </div>
  </footer>
);

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [isLoaded, setIsLoaded]           = useState(false);
  const [currentPage, setCurrentPage]     = useState('home');
  const [mobileOpen, setMobileOpen]       = useState(false);

  useEffect(() => { document.title = 'NetZero India Initiative'; }, []);

  const navLinks = [
    { id: 'home',         label: 'Home' },
    { id: 'about',        label: 'About' },
    { id: 'research',     label: 'Net-Zero Modeller' },
    { id: 'publications', label: 'Publications' },
    { id: 'team',         label: 'Team' },
  ];

  const navigate = (id) => { setCurrentPage(id); setMobileOpen(false); window.scrollTo({ top: 0, behavior: 'instant' }); };

  const pageMap = { home: HomePage, about: AboutPage, research: ResearchPage, publications: PublicationsOutputsPage, news: NewsEventsPage, team: TeamGovernancePage, engagement: EngagementPage, media: MediaResourcesPage, contact: ContactPage };
  const PageComponent = pageMap[currentPage] || HomePage;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styleSheet }} />

      {/* Preloader */}
      {showPreloader && (
        <div className={`fixed inset-0 z-[9999] transition-opacity duration-1000 ${isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <Preloader onComplete={() => { setIsLoaded(true); setTimeout(() => setShowPreloader(false), 1000); }} />
        </div>
      )}

      {/* Main */}
      <div className={`transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0 h-screen overflow-hidden'}`}>

        {/* NAVBAR */}
        <header className="fixed top-0 w-full z-50 bg-white/96 backdrop-blur-md border-b border-navy/8 px-[3vw] shadow-[0_1px_8px_rgba(29,54,88,0.06)]">
          <div className="max-w-7xl mx-auto h-14 flex justify-between items-center">
            <button onClick={() => navigate('home')} className="font-manrope font-extrabold text-xl text-navy tracking-tight hover:text-teal transition-colors">NZII</button>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6">
              <div className="flex items-center gap-4">
                {navLinks.map(l => (
                  <button key={l.id} onClick={() => navigate(l.id)}
                    className={`relative font-manrope font-semibold text-[11px] tracking-widest uppercase transition-colors duration-200 ${currentPage === l.id ? 'text-navy' : 'text-navy/50 hover:text-navy'}`}>
                    {l.label}
                    {currentPage === l.id && <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-teal rounded-full" />}
                  </button>
                ))}
              </div>
              <button onClick={() => navigate('contact')} className="px-5 py-2 bg-navy text-white font-manrope font-bold text-xs tracking-wide rounded-xl hover:bg-teal transition-colors duration-300">
                Contact PMU
              </button>
            </nav>

            {/* Mobile hamburger */}
            <button className="lg:hidden flex flex-col gap-1.5 p-2" onClick={() => setMobileOpen(!mobileOpen)}>
              <div className={`w-7 h-0.5 bg-navy rounded transition-all ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <div className={`w-7 h-0.5 bg-navy rounded transition-all ${mobileOpen ? 'opacity-0' : ''}`} />
              <div className={`w-7 h-0.5 bg-navy rounded transition-all ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </header>

        {/* Mobile Nav */}
        <div className={`fixed inset-0 bg-white z-[55] flex flex-col items-center justify-center transition-all duration-500 lg:hidden ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <nav className="flex flex-col items-center gap-6">
            {navLinks.map(l => (
              <button key={l.id} onClick={() => navigate(l.id)} className={`font-manrope text-2xl font-bold tracking-widest uppercase ${currentPage === l.id ? 'text-teal' : 'text-navy hover:text-teal'} transition-colors`}>{l.label}</button>
            ))}
            <button onClick={() => navigate('contact')} className="mt-4 px-10 py-4 bg-navy text-white font-manrope font-bold rounded-xl hover:bg-teal transition-colors">Contact PMU</button>
          </nav>
        </div>

        {/* Page Content */}
        <main>
          <PageComponent key={currentPage} />
        </main>

        <Footer />
        <AIAssistantBot />
        <CursorTrail />
      </div>
    </>
  );
}
