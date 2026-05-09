import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const trail = trailRef.current;
    if (!cursor || !trail) return;

    let trailX = 0;
    let trailY = 0;
    let curX = 0;
    let curY = 0;
    let animId: number;

    const onMove = (e: MouseEvent) => {
      curX = e.clientX;
      curY = e.clientY;
      cursor.style.transform = `translate(${curX - 6}px, ${curY - 6}px)`;
      setIsVisible(true);
    };

    const animate = () => {
      trailX += (curX - trailX) * 0.12;
      trailY += (curY - trailY) * 0.12;
      trail.style.transform = `translate(${trailX - 16}px, ${trailY - 16}px)`;
      animId = requestAnimationFrame(animate);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('.card-hover')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    animId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 z-[9999] pointer-events-none transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ willChange: 'transform' }}
      >
        <div
          className={`rounded-full transition-all duration-200 ${isHovering ? 'w-4 h-4 bg-sky-400' : 'w-3 h-3 bg-sky-400'}`}
        />
      </div>
      <div
        ref={trailRef}
        className={`fixed top-0 left-0 z-[9998] pointer-events-none transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ willChange: 'transform' }}
      >
        <motion.div
          className={`rounded-full border transition-all duration-300 ${isHovering ? 'w-12 h-12 border-sky-400/70 bg-sky-400/10' : 'w-8 h-8 border-sky-500/50'}`}
        />
      </div>
    </>
  );
}
