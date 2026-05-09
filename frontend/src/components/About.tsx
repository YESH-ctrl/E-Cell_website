import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Target, Eye, Rocket, Globe } from 'lucide-react';
import { staggerContainer, fadeInUp } from '../animations/variants';

const timeline = [
  { year: '2019', title: 'Founded', desc: 'E-Cell established with a vision to foster entrepreneurship on campus.' },
  { year: '2020', title: 'First Hackathon', desc: 'Launched our flagship 48-hour hackathon with 300+ participants.' },
  { year: '2021', title: 'Startup Lab', desc: 'Opened a dedicated startup incubation lab supporting 10 ventures.' },
  { year: '2022', title: 'National Recognition', desc: 'Ranked among top 10 college E-Cells nationally.' },
  { year: '2023', title: 'Global Partnerships', desc: 'Partnered with international accelerators and VCs.' },
  { year: '2024', title: 'Scale Up', desc: '200+ active members, 30+ successful startup alumni.' },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const timelineRef = useRef(null);
  const timelineInView = useInView(timelineRef, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#060f1e]/50 to-[#030712]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-20"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-sky-500/20 text-sky-400 text-sm font-medium mb-6">
            <Globe size={14} /> Our Story
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-black font-poppins mb-6">
            <span className="text-white">Who We </span>
            <span className="gradient-text">Are</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-white/50 max-w-2xl mx-auto">
            A passionate community of student entrepreneurs, designers, developers, and dreamers building the next generation of startups.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-24">
          {[
            { icon: Eye, title: 'Our Vision', text: 'To become the premier entrepreneurship hub that transforms every student into a problem-solver capable of creating meaningful change.' },
            { icon: Target, title: 'Our Mission', text: 'Providing resources, mentorship, and networking to help student entrepreneurs ideate, validate, and launch their ventures.' },
            { icon: Rocket, title: 'Our Goal', text: 'Launch 100 student startups by 2026, creating real-world impact across technology, sustainability, and social innovation.' },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="glass rounded-2xl p-8 card-hover border border-white/5 hover:border-sky-500/30 group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500/20 to-sky-700/20 flex items-center justify-center mb-6 group-hover:from-sky-500/40 group-hover:to-sky-700/40 transition-all duration-300">
                <item.icon size={22} className="text-sky-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 font-poppins">{item.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>

        <div ref={timelineRef} className="mb-24">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            animate={timelineInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-3xl font-bold text-center text-white font-poppins mb-16"
          >
            Our <span className="gradient-text">Journey</span>
          </motion.h3>

          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-sky-500/50 via-sky-500/20 to-transparent hidden md:block" />

            <div className="space-y-12">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
                  animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className={`flex items-center gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="glass rounded-xl p-6 inline-block border border-white/5 hover:border-sky-500/30 transition-colors duration-300">
                      <div className="text-sky-400 font-bold text-lg font-poppins mb-1">{item.year}</div>
                      <div className="text-white font-semibold mb-2">{item.title}</div>
                      <div className="text-white/50 text-sm">{item.desc}</div>
                    </div>
                  </div>

                  <div className="hidden md:flex w-5 h-5 rounded-full bg-sky-500 border-4 border-[#030712] flex-shrink-0 z-10 shadow-[0_0_20px_rgba(14,165,233,0.5)]" />

                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
