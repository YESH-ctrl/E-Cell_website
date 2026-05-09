import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { staggerContainer, fadeInUp } from '../animations/variants';
import ThreeDLogo from './ThreeDLogo';

export default function Hero() {
  const logoRef = useRef<HTMLDivElement>(null);



  useEffect(() => {
    if (logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        { x: -100, opacity: 0, rotate: -10, scale: 0.8 },
        {
          x: 0,
          opacity: 1,
          rotate: 0,
          scale: 1,
          duration: 1.4,
          delay: 2.5,
          ease: 'expo.out',
        }
      );
    }
  }, []);

  const handleScroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Soft radial glow overlays — canvas lives in GlobalBackground */}
      <div className="absolute inset-0 bg-gradient-radial from-sky-900/10 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#030712]" />

      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-sky-600/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-sky-400/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex-1 text-center lg:text-left"
            style={{ transitionDelay: '2.3s' }}
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-sky-500/20 text-sky-400 text-sm font-medium mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              Entrepreneurship Cell — EST. 2019
            </motion.div>

            <motion.div ref={logoRef} className="opacity-0 mb-6">
              <div className="text-4xl font-black tracking-wide font-poppins">
                <span className="text-white">E</span>
                <span className="gradient-text">-Cell</span>
              </div>
              <div className="text-xs text-sky-400/70 tracking-[0.3em] uppercase mt-1">
                Entrepreneurship Cell
              </div>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-4xl lg:text-5xl xl:text-6xl font-black leading-[1.05] mb-6 font-poppins"
            >
              <span className="text-white">Empowering</span>
              <br />
              <span className="gradient-text">Innovators.</span>
              <br />
              <span className="text-white/90">Building the</span>
              <br />
              <span className="gradient-text">Future.</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-white/50 max-w-xl mb-10 leading-relaxed"
            >
              A community of driven students transforming ideas into ventures.
              We fuel startups, host hackathons, and build tomorrow's leaders — today.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => handleScroll('join')}
                className="btn-primary flex items-center gap-2 justify-center"
              >
                Join Us <ArrowRight size={16} />
              </button>
              <button
                onClick={() => handleScroll('initiatives')}
                className="btn-secondary flex items-center gap-2 justify-center"
              >
                Explore Initiatives
              </button>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-12 mt-14 justify-center lg:justify-start"
            >
              {[
                { num: '200+', label: 'Members' },
                { num: '50+', label: 'Events' },
                { num: '30+', label: 'Startups' },
                { num: '5+', label: 'Years' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-black gradient-text font-poppins">{stat.num}</div>
                  <div className="text-xs text-white/40 mt-0.5 tracking-wider uppercase">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 2.8, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block flex-shrink-0 relative w-[600px] h-[600px]"
          >
            <ThreeDLogo />
          </motion.div>
        </div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 0.8 }}
        onClick={() => handleScroll('about')}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 hover:text-sky-400 transition-colors"
      >
        <span className="text-xs tracking-[0.3em] uppercase">Scroll</span>
        <ChevronDown size={16} className="animate-bounce" />
      </motion.button>
    </section>
  );
}
