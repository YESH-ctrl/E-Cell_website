import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  isLoading: boolean;
}

interface Star {
  x: number;
  y: number;
  angle: number;
  speed: number;
  radius: number;
  hue: number;
  saturation: number;
  alpha: number;
}

export default function LoadingScreen({ isLoading }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isLoading) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const setSize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener('resize', setSize);

    const ctx = canvas.getContext('2d')!;
    let cx = canvas.width / 2;
    let cy = canvas.height / 2;

    // ── Star pool ─────────────────────────────────────────────────────────
    const STAR_COUNT = 500;
    const stars: Star[] = Array.from({ length: STAR_COUNT }, () => ({
      x:          cx + (Math.random() - 0.5) * 120,
      y:          cy + (Math.random() - 0.5) * 120,
      angle:      Math.random() * Math.PI * 2,
      speed:      0.4 + Math.random() * 2.5,
      radius:     0.4 + Math.random() * 1.4,
      hue:        170 + Math.random() * 100,   // cyan → blue → indigo
      saturation: 70  + Math.random() * 30,
      alpha:      0.4 + Math.random() * 0.6,
    }));

    const resetStar = (s: Star) => {
      cx = canvas.width  / 2;
      cy = canvas.height / 2;
      s.x     = cx + (Math.random() - 0.5) * 60;
      s.y     = cy + (Math.random() - 0.5) * 60;
      s.angle = Math.random() * Math.PI * 2;
      s.speed = 0.4 + Math.random() * 2.5;
    };

    // ── Nebula blobs ──────────────────────────────────────────────────────
    const nebulae = [
      { x: cx - 180, y: cy + 120, r: 260, h: 240, a: 0.04 },
      { x: cx + 200, y: cy - 140, r: 200, h: 280, a: 0.03 },
      { x: cx,       y: cy,       r: 180, h: 200, a: 0.05 },
    ];

    // ── Animation loop ────────────────────────────────────────────────────
    let animId: number;
    const start = performance.now();
    const TOTAL  = 2100; // ms — matches the 2200ms loading timer

    const draw = () => {
      const elapsed = performance.now() - start;
      const progress = Math.min(elapsed / TOTAL, 1);

      cx = canvas.width  / 2;
      cy = canvas.height / 2;

      // Warp curve: ramp up then ease back to stillness
      let warp: number;
      if (progress < 0.25) {
        warp = (progress / 0.25) * 0.4;
      } else if (progress < 0.75) {
        warp = 0.4 + ((progress - 0.25) / 0.5) * 0.6;
      } else {
        warp = 1 - ((progress - 0.75) / 0.25) * 0.85;
      }
      warp = Math.max(0, warp);

      // ── Background ────────────────────────────────────────────────────
      // Trail fade — slower fade keeps streak history visible during warp
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = `rgba(3,7,18,${0.12 + (1 - warp) * 0.40})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // ── Nebula glows ──────────────────────────────────────────────────
      ctx.globalCompositeOperation = 'screen';
      nebulae.forEach(n => {
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
        grd.addColorStop(0,   `hsla(${n.h},80%,60%,${n.a * (0.5 + warp * 0.5)})`);
        grd.addColorStop(0.6, `hsla(${n.h},70%,40%,${n.a * 0.3})`);
        grd.addColorStop(1,   'hsla(0,0%,0%,0)');
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });
      ctx.globalCompositeOperation = 'source-over';

      // ── Stars / warp streaks ──────────────────────────────────────────
      stars.forEach(s => {
        const speedMult = 1 + warp * 35;
        const dx = Math.cos(s.angle) * s.speed * speedMult;
        const dy = Math.sin(s.angle) * s.speed * speedMult;

        const tailLen = warp * s.speed * 70;
        const alpha   = s.alpha * (0.25 + warp * 0.75);
        const lw      = s.radius * (0.6 + warp * 2.2);

        if (tailLen > 1) {
          const grd = ctx.createLinearGradient(
            s.x, s.y,
            s.x - Math.cos(s.angle) * tailLen,
            s.y - Math.sin(s.angle) * tailLen,
          );
          grd.addColorStop(0, `hsla(${s.hue},${s.saturation}%,80%,${alpha})`);
          grd.addColorStop(1, `hsla(${s.hue},${s.saturation}%,80%,0)`);
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(s.x - Math.cos(s.angle) * tailLen, s.y - Math.sin(s.angle) * tailLen);
          ctx.strokeStyle = grd;
          ctx.lineWidth   = lw;
          ctx.lineCap     = 'round';
          ctx.globalAlpha = 1;
          ctx.stroke();
        }

        // Star head dot
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius * (1 + warp * 1.5), 0, Math.PI * 2);
        ctx.fillStyle  = `hsl(${s.hue},100%,92%)`;
        ctx.globalAlpha = alpha;
        ctx.fill();
        ctx.globalAlpha = 1;

        s.x += dx;
        s.y += dy;

        if (s.x < -60 || s.x > canvas.width + 60 || s.y < -60 || s.y > canvas.height + 60) {
          resetStar(s);
        }
      });

      // ── Central warp vortex glow ──────────────────────────────────────
      if (warp > 0.05) {
        ctx.globalCompositeOperation = 'screen';
        const vortex = ctx.createRadialGradient(cx, cy, 0, cx, cy, 140 * warp);
        vortex.addColorStop(0,   `rgba(14,165,233,${warp * 0.35})`);
        vortex.addColorStop(0.4, `rgba(99,102,241,${warp * 0.15})`);
        vortex.addColorStop(1,   'rgba(0,0,0,0)');
        ctx.fillStyle = vortex;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'source-over';
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', setSize);
    };
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.06 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] bg-[#030712]"
        >
          {/* Warp-speed canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

          {/* ── Centred logo + text ── */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 pointer-events-none">

            {/* Logo with orbiting rings */}
            <motion.div
              initial={{ opacity: 0, scale: 0.2, rotate: -30 }}
              animate={{ opacity: 1, scale: 1,   rotate: 0   }}
              transition={{ duration: 1.1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex items-center justify-center"
            >
              {/* Outer slow-spinning ring */}
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                className="absolute w-44 h-44 rounded-full border border-sky-500/25"
              />
              {/* Middle ring */}
              <motion.span
                animate={{ rotate: -360 }}
                transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
                className="absolute w-36 h-36 rounded-full border border-indigo-400/20"
              />
              {/* Pulse glow */}
              <motion.span
                animate={{ scale: [1, 1.25, 1], opacity: [0.25, 0.55, 0.25] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute w-32 h-32 rounded-full bg-sky-500/20 blur-2xl"
              />

              {/* Logo image */}
              <div className="relative w-28 h-28 flex items-center justify-center drop-shadow-[0_0_30px_rgba(14,165,233,0.75)]">
                <img
                  src="/E-Cell_Logo.png"
                  alt="E-Cell Logo"
                  className="w-28 h-28 object-contain"
                  onError={(e) => {
                    const t = e.currentTarget;
                    t.style.display = 'none';
                    const fb = t.nextElementSibling as HTMLElement | null;
                    if (fb) fb.style.display = 'flex';
                  }}
                />
                {/* Fallback */}
                <div
                  style={{ display: 'none' }}
                  className="w-24 h-24 rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-700 flex items-center justify-center shadow-[0_0_40px_rgba(14,165,233,0.6)]"
                >
                  <span className="text-white font-black text-3xl font-poppins tracking-wide">E-C</span>
                </div>
              </div>
            </motion.div>

            {/* Name + subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0  }}
              transition={{ duration: 0.8, delay: 1.3, ease: 'easeOut' }}
              className="text-center"
            >
              <p className="text-2xl font-black tracking-[0.35em] text-white font-poppins uppercase">
                E-Cell
              </p>
              <p className="text-[11px] tracking-[0.55em] text-sky-400/65 mt-1.5 uppercase">
                Entrepreneurship Cell
              </p>
            </motion.div>

            {/* Gradient progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="w-64 h-[2px] bg-white/5 rounded-full overflow-hidden"
            >
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.9, ease: [0.6, 0, 0.4, 1] }}
                className="h-full bg-gradient-to-r from-sky-600 via-indigo-500 to-sky-400 rounded-full origin-left"
              />
            </motion.div>

            {/* Tagline that fades in late */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.6 }}
              className="text-xs text-white/25 tracking-[0.25em] uppercase"
            >
              Entering the cosmos…
            </motion.p>
          </div>

          {/* Pulsing dots at bottom */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 items-center">
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-sky-500"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.2, delay: i * 0.2, repeat: Infinity }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
