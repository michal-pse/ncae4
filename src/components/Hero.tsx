import React, { useEffect, useRef } from 'react';
import { ArrowRight, Sparkles, Activity } from 'lucide-react';
import { Language } from '../types';
import { DICTIONARY } from '../data';

interface HeroProps {
  lang: Language;
  onOpenExpertForm: () => void;
  onScrollToModeling: () => void;
}

export default function Hero({ lang, onOpenExpertForm, onScrollToModeling }: HeroProps) {
  const dict = DICTIONARY[lang];
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = canvas.parentElement?.clientWidth || 500;
    let height = canvas.height = canvas.parentElement?.clientHeight || 450;

    // Handle Resize
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        width = canvas.width = entry.contentRect.width;
        height = canvas.height = entry.contentRect.height;
      }
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    // Nodes array
    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      pulse: number;
    }> = [];

    const nodeCount = 18;
    const colors = ['rgba(16, 185, 129, 0.7)', 'rgba(109, 59, 215, 0.7)', 'rgba(6, 78, 59, 0.5)'];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulse: Math.random() * Math.PI,
      });
    }

    // Mouse coordinates
    let mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Animation Loop
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connection lines
      ctx.lineWidth = 1;
      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.25;
            // Gradient between nodes
            const grad = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
            grad.addColorStop(0, nodes[i].color.replace('0.7', alpha.toString()));
            grad.addColorStop(1, nodes[j].color.replace('0.7', alpha.toString()));
            ctx.strokeStyle = grad;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }

        // Mouse connection
        if (mouse.x > -500) {
          const dx = nodes[i].x - mouse.x;
          const dy = nodes[i].y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const alpha = (1 - dist / 150) * 0.4;
            ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (let i = 0; i < nodeCount; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        // Boundary bounce
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        n.pulse += 0.02;
        const currentRadius = n.radius + Math.sin(n.pulse) * 1.5;

        // Draw radial glowing node
        const glow = ctx.createRadialGradient(n.x, n.y, 1, n.x, n.y, currentRadius * 3);
        glow.addColorStop(0, n.color);
        glow.addColorStop(0.3, n.color.replace('0.7', '0.3'));
        glow.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(n.x, n.y, currentRadius * 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = n.color;
        ctx.beginPath();
        ctx.arc(n.x, n.y, currentRadius * 0.7, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="relative pt-32 pb-24 md:py-40 bg-background overflow-hidden min-h-[85vh] flex items-center">
      {/* Dynamic Background Glowing Blobs */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none select-none">
        <div className="absolute top-12 left-1/4 w-[400px] h-[400px] bg-primary-container rounded-full blur-[140px] mix-blend-multiply animate-pulse duration-10000" />
        <div className="absolute bottom-12 right-1/4 w-[500px] h-[500px] bg-tertiary-container rounded-full blur-[150px] mix-blend-multiply animate-pulse duration-8000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Text Left */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <div className="inline-flex items-center gap-2 bg-surface-container-high px-4 py-2 rounded-full w-fit border border-outline/10 text-primary hover:bg-surface-container transition-all">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              <span className="font-sans text-xs font-bold uppercase tracking-wider">{dict.energyNetwork}</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-on-background leading-tight tracking-tight">
              {lang === 'EN' ? (
                <>
                  Connecting <span className="text-gradient font-extrabold">Energy Potential</span>
                </>
              ) : (
                <>
                  Łączymy <span className="text-gradient font-extrabold">Potencjał Energetyczny</span>
                </>
              )}
            </h1>

            <p className="font-sans text-lg text-on-surface-variant max-w-2xl leading-relaxed">
              {dict.heroDesc}
            </p>

            <div className="flex flex-wrap gap-4 mt-4">
              <button
                onClick={onOpenExpertForm}
                className="bg-gradient-to-r from-primary to-tertiary text-on-primary font-bold text-sm px-6 py-4 rounded-full flex items-center justify-center gap-2.5 hover:energy-glow hover:scale-102 transition-all active:scale-95 cursor-pointer shadow-lg"
              >
                <span>{dict.ctaJoin}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onScrollToModeling}
                className="bg-surface-container-high hover:bg-surface-container border border-outline/15 text-primary font-bold text-sm px-6 py-4 rounded-full flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
              >
                <Activity className="w-4 h-4" />
                <span>{lang === 'EN' ? 'Launch Sandbox' : 'Uruchom Piaskownicę'}</span>
              </button>
            </div>

            {/* Quick Micro-Stats Grid */}
            <div className="grid grid-cols-3 gap-4 pt-8 mt-4 border-t border-outline/10">
              <div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-primary">28+</div>
                <div className="text-xs text-on-surface-variant uppercase font-semibold tracking-wider">
                  {lang === 'EN' ? 'Active Communities' : 'Społeczności'}
                </div>
              </div>
              <div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-tertiary">420 MW</div>
                <div className="text-xs text-on-surface-variant uppercase font-semibold tracking-wider">
                  {lang === 'EN' ? 'Managed Capacity' : 'Moc Zarządzana'}
                </div>
              </div>
              <div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-secondary">99.98%</div>
                <div className="text-xs text-on-surface-variant uppercase font-semibold tracking-wider">
                  {lang === 'EN' ? 'Grid Reliability' : 'Niezawodność'}
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Artwork Right */}
          <div className="lg:col-span-5 relative w-full h-[380px] sm:h-[450px] rounded-3xl overflow-hidden glass-panel energy-glow flex items-center justify-center group border border-outline/20">
            {/* The beautiful background macro image provided */}
            <img
              className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-[4000ms] ease-out pointer-events-none"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiLetTJyBlGyMp7QiFJgCMdcLwbBOzAQzLGBinXJgmXiPCJxHoMkRFgW832QW7UYxwAG3r9jffksIcVWsNQSRUV_Da1J-aEMxL0xjQBVH3BQ428ArSYqWpIvijHItO5mpPEL54JJtr9e22wOkX8LyLlhSfc3H5Zh5uUFQ-ryWvngtayN3f9JxrkOoyL-gzTCk10zln1v0fGE-2hsn3-n9_LH1hq4RhnV_iU5_L9J1Z31OZWEuRby5NG1kDPCzSM1N6gfKQu7GSVC6C"
              alt="Glowing green and violet digital organic energy network node on light background"
              referrerPolicy="no-referrer"
            />
            
            {/* Real-time floating particle canvas overlaid above the image */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 z-10 cursor-crosshair"
            />

            {/* Bottom Subtle Overlay Badge */}
            <div className="absolute bottom-4 left-4 right-4 z-20 p-3 rounded-2xl bg-background/80 backdrop-blur-md border border-outline/10 flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-2.5">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-bold text-on-background uppercase tracking-wider">
                  {lang === 'EN' ? 'Living Nodes Simulation' : 'Symulacja Żywych Węzłów'}
                </span>
              </div>
              <span className="text-[10px] font-mono text-primary font-bold">
                {lang === 'EN' ? 'REACTIVE' : 'REAKTYWNA'}
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
