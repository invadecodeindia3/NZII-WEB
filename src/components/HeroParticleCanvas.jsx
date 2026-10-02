import React, { useEffect, useRef } from 'react';

export const HeroParticleCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes (clean energy sparks & network links)
    const particleCount = 65;
    const particles = [];
    const colors = ['#2B9D8F', '#E76F51', '#A7C957', '#F28482', '#00b4d8'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 3 + 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 1.1,
        vy: (Math.random() - 0.5) * 1.1,
        pulse: Math.random() * Math.PI,
        pulseSpeed: 0.03 + Math.random() * 0.03
      });
    }

    // Interactive mouse attractor & ripple sparks
    let mouse = { x: -1000, y: -1000, active: false };
    const ripples = [];

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;

      // Spawn energetic spark trails
      if (Math.random() > 0.45) {
        ripples.push({
          x: mouse.x,
          y: mouse.y,
          r: 5,
          maxR: 35,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 0.7
        });
      }
    };

    const onClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      // Burst 3 shockwave rings
      for (let i = 0; i < 3; i++) {
        ripples.push({
          x: clickX,
          y: clickY,
          r: 10 + i * 15,
          maxR: 90 + i * 20,
          color: colors[i % colors.length],
          alpha: 0.9
        });
      }
    };

    const onMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onClick);
    window.addEventListener('mouseleave', onMouseLeave);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Render interactive click/move ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rip = ripples[i];
        rip.r += 1.8;
        rip.alpha -= 0.025;

        if (rip.alpha <= 0 || rip.r >= rip.maxR) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.r, 0, Math.PI * 2);
        ctx.strokeStyle = rip.color;
        ctx.lineWidth = 1.8;
        ctx.globalAlpha = Math.max(0, rip.alpha);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      // Draw faint connections between proximate particles
      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(43, 157, 143, ${0.28 * (1 - dist / 140)})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }
      }

      // Update & render particles with glowing halos
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse interaction
        if (mouse.active) {
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 140) {
            const angle = Math.atan2(mdy, mdx);
            p.x += Math.cos(angle) * 2.2;
            p.y += Math.sin(angle) * 2.2;
          }
        }

        const currentRadius = p.radius + Math.sin(p.pulse) * 0.8;
        
        // Halo glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(1, currentRadius * 2.2), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.15 + Math.sin(p.pulse) * 0.08;
        ctx.fill();

        // Core particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.8, currentRadius), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.75 + Math.sin(p.pulse) * 0.2;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick);
      window.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none w-full h-full z-0 opacity-90"
    />
  );
};
