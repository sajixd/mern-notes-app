import React, { useRef, useEffect } from 'react';

// ParticleBackground: Subtle floating particles with theme support
const ParticleBackground = ({ isDark }) => {
      const canvasRef = useRef(null);
      const particlesRef = useRef([]);
      const rafRef = useRef(null);

      useEffect(() => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const ctx = canvas.getContext('2d');

            // Set canvas size
            const resize = () => {
                  canvas.width = window.innerWidth;
                  canvas.height = window.innerHeight;
            };
            resize();
            window.addEventListener('resize', resize);

            // Create particles
            const createParticles = () => {
                  const particles = [];
                  const count = 25;

                  for (let i = 0; i < count; i++) {
                        particles.push({
                              x: Math.random() * canvas.width,
                              y: Math.random() * canvas.height,
                              size: Math.random() * 3 + 1,
                              speedX: (Math.random() - 0.5) * 0.3,
                              speedY: (Math.random() - 0.5) * 0.3,
                              opacity: Math.random() * 0.2 + 0.1,
                        });
                  }

                  return particles;
            };

            particlesRef.current = createParticles();

            // Animation loop
            const animate = () => {
                  if (document.hidden) {
                        rafRef.current = requestAnimationFrame(animate);
                        return;
                  }

                  ctx.clearRect(0, 0, canvas.width, canvas.height);

                  particlesRef.current.forEach((particle) => {
                        // Update position
                        particle.x += particle.speedX;
                        particle.y += particle.speedY;

                        // Wrap around edges
                        if (particle.x < 0) particle.x = canvas.width;
                        if (particle.x > canvas.width) particle.x = 0;
                        if (particle.y < 0) particle.y = canvas.height;
                        if (particle.y > canvas.height) particle.y = 0;

                        // Draw particle with theme-aware color
                        ctx.beginPath();
                        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                        ctx.fillStyle = isDark
                              ? `rgba(147, 197, 253, ${particle.opacity})` // Light blue for dark mode
                              : `rgba(99, 102, 241, ${particle.opacity})`; // Indigo for light mode
                        ctx.fill();
                  });

                  rafRef.current = requestAnimationFrame(animate);
            };

            animate();

            return () => {
                  cancelAnimationFrame(rafRef.current);
                  window.removeEventListener('resize', resize);
            };
      }, [isDark]);

      return (
            <canvas
                  ref={canvasRef}
                  style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 0,
                        pointerEvents: 'none',
                  }}
            />
      );
};

export default ParticleBackground;
