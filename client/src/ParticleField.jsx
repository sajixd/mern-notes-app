import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';

// ParticleField.jsx
// Renders a performant 2D canvas particle field that reacts to mouse/touch.
// Accepts props: mouseX, mouseY (numbers in client coords), and exposes a `.burst(x,y,count)` method via ref.

const ParticleField = forwardRef(function ParticleField({ mouseX=0, mouseY=0 }, ref){
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const rafRef = useRef(null);
  const particlesRef = useRef([]);
  const lastTimeRef = useRef(0);

  // Respect reduced motion
  const reduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useImperativeHandle(ref, () => ({
    // spawn a burst at page coords x,y with `count` particles
    burst(x, y, count = 28){
      const rect = canvasRef.current.getBoundingClientRect();
      spawnBurst(x - rect.left, y - rect.top, count);
    }
  }), []);

  useEffect(()=>{
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctxRef.current = ctx;

    const DPR = Math.max(1, window.devicePixelRatio || 1);
    function resize(){
      canvas.width = canvas.clientWidth * DPR;
      canvas.height = canvas.clientHeight * DPR;
      ctx.setTransform(DPR,0,0,DPR,0,0);
    }

    resize();
    window.addEventListener('resize', resize);

    // pause when tab not visible
    function loop(t){
      if (document.hidden) { rafRef.current = requestAnimationFrame(loop); return; }
      const dt = Math.min(32, t - lastTimeRef.current);
      lastTimeRef.current = t;
      update(dt/1000);
      render();
      rafRef.current = requestAnimationFrame(loop);
    }
    rafRef.current = requestAnimationFrame(loop);

    return ()=>{
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  function spawnBurst(x,y,count){
    if (reduced) return;
    for(let i=0;i<count;i++){
      const angle = Math.random() * Math.PI * 2;
      const speed = 40 + Math.random()*140;
      particlesRef.current.push({
        x, y,
        vx: Math.cos(angle)*speed, vy: Math.sin(angle)*speed,
        life: 0.7 + Math.random()*0.9,
        t: 0,
        size: 1 + Math.random()*3,
        color: Math.random() > 0.5 ? 'cyan' : 'magenta'
      });
    }
  }

  function update(dt){
    // basic physics
    const ps = particlesRef.current;
    for(let i=ps.length-1;i>=0;i--){
      const p = ps[i];
      p.t += dt;
      p.vy += 300 * dt; // gravity
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      if (p.t > p.life) ps.splice(i,1);
    }
  }

  function render(){
    const canvas = canvasRef.current; if(!canvas) return;
    const ctx = ctxRef.current; if(!ctx) return;
    ctx.clearRect(0,0,canvas.width, canvas.height);

    // subtle background nebula (very cheap)
    ctx.save();
    const g = ctx.createRadialGradient(canvas.width/2, canvas.height/3, 10, canvas.width/2, canvas.height/3, Math.max(canvas.width, canvas.height));
    g.addColorStop(0, 'rgba(0,255,200,0.03)');
    g.addColorStop(1, 'transparent');
    ctx.fillStyle = g; ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.restore();

    // draw particles
    const ps = particlesRef.current;
    for(const p of ps){
      const alpha = 1 - (p.t / p.life);
      ctx.beginPath();
      const sz = p.size * (0.6 + 0.4*alpha);
      const hue = p.color === 'cyan' ? '180,255,210' : '320,255,200';
      ctx.fillStyle = `rgba(${hue},${alpha})`;
      ctx.arc(p.x, p.y, sz, 0, Math.PI*2);
      ctx.fill();
    }
  }

  return (
    <canvas
      ref={canvasRef}
      style={{position:'fixed',inset:0,zIndex:0,pointerEvents:'none',width:'100%',height:'100%'}}
      aria-hidden
    />
  );
});

export default ParticleField;
