import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Code2, BookOpen, TrendingUp, Lightbulb, Users, Globe, ChevronDown, Calendar, MapPin } from 'lucide-react';
import { staggerContainer, fadeInUp } from '../animations/variants';

const initiatives = [
  {
    icon: Globe,
    title: 'E-Summit',
    category: 'Flagship Event',
    color: 'from-sky-500/20 to-sky-900/20',
    accent: '#0ea5e9',
    badge: 'Flagship',
    tagline: 'The flagship event of E-Cell',
    description:
      'The flagship event of E-Cell which is conducted every year with a lot of sub events and some panel discussions with some exciting people.',
    details: ['Annual Event', 'Multiple Sub-events', 'Panel Discussions', 'Exciting Speakers'],
    date: 'Annual',
    location: 'BVRIT Narsapur campus',
    image: '/initiatives/e_summit.jpg',
  },
  {
    icon: TrendingUp,
    title: 'Emerge',
    category: 'Pre-Summit Event',
    color: 'from-emerald-500/20 to-emerald-700/20',
    accent: '#10b981',
    badge: 'Upcoming',
    tagline: 'The prelude to E-Summit',
    description:
      'This is the event which is conducted before E-Summit with around 2 sub-events, setting the stage for the main summit.',
    details: ['Pre-Summit Event', '2 Sub-events', 'Student Focused', 'Innovation Drive'],
    date: 'Pre-Summit',
    location: 'BVRIT Narsapur campus',
    image: '/initiatives/emerge.jpg',
  },
  {
    icon: Code2,
    title: 'Pivot',
    category: 'Hackathon',
    color: 'from-sky-400/20 to-sky-600/20',
    accent: '#38bdf8',
    badge: '24-Hours',
    tagline: 'Innovate. Build. Pivot.',
    description:
      'This is the 24 hrs hackathon which is specifically designed for the 3rd year students to showcase their technical prowess.',
    details: ['24-hour Hackathon', 'For 3rd Years', 'Technical Challenge', 'Problem Solving'],
    date: 'TBA',
    location: 'BVRIT Narsapur campus',
    image: '/initiatives/pivot.jpg',
  },
  {
    icon: Lightbulb,
    title: 'BEST',
    category: 'Ecosystem',
    color: 'from-violet-500/20 to-indigo-900/20',
    accent: '#8b5cf6',
    badge: 'Coming Soon',
    tagline: 'BVRITS Ecosystem for startups and Talent',
    description:
      'BEST is a comprehensive ecosystem designed to nurture startups and talent within BVRIT, providing the resources and network needed for success.',
    details: ['Startup Support', 'Talent Discovery', 'Resource Hub', 'Networking'],
    date: 'Upcoming',
    location: 'BVRIT Narsapur campus',
    image: '/initiatives/best.jpg',
  },
];

export default function Initiatives({ hideHeader = false, limit }: { hideHeader?: boolean; limit?: number }) {
  const [expanded, setExpanded] = useState<number | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const displayInitiatives = limit ? initiatives.slice(0, limit) : initiatives;

  return (
    <section id="initiatives" ref={ref} className={`${hideHeader ? 'pb-20' : 'section-padding'} relative overflow-hidden`}>
      {!hideHeader && (
        <>
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030712] to-[#060f1e]/40" />
        </>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {!hideHeader && (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-sky-500/20 text-sky-400 text-sm font-medium mb-6">
              <TrendingUp size={14} /> What We Do
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-black font-poppins mb-6">
              <span className="text-white">Our </span>
              <span className="gradient-text">Initiatives</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-white/50 max-w-2xl mx-auto">
              From hackathons to incubation programs — everything you need to go from idea to impact.
            </motion.p>
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayInitiatives.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 50 }}
              animate={(inView || hideHeader) ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="glass rounded-2xl overflow-hidden border border-white/5 hover:border-sky-500/30 transition-all duration-500 group cursor-pointer"
              onClick={() => setExpanded(expanded === i ? null : i)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/60 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold text-white bg-sky-500/30 border border-sky-500/40">
                    {item.badge}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center border border-white/10`}>
                    <item.icon size={18} style={{ color: item.accent }} />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className="text-xs text-white/50 font-medium uppercase tracking-wider">{item.category}</div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-white font-poppins group-hover:text-sky-400 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <motion.div
                    animate={{ rotate: expanded === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={18} className="text-white/30" />
                  </motion.div>
                </div>
                <p className="text-sky-400/80 text-sm italic mb-3">{item.tagline}</p>
                <p className="text-white/50 text-sm leading-relaxed line-clamp-2">{item.description}</p>

                <AnimatePresence>
                  {expanded === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 mt-4 border-t border-white/5">
                        <p className="text-white/60 text-sm mb-4">{item.description}</p>
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          {item.details.map((d) => (
                            <div key={d} className="flex items-center gap-2 text-xs text-white/50">
                              <div className="w-1.5 h-1.5 rounded-full bg-sky-400 flex-shrink-0" />
                              {d}
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2 text-xs text-white/40">
                            <Calendar size={12} style={{ color: item.accent }} />
                            {item.date}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-white/40">
                            <MapPin size={12} style={{ color: item.accent }} />
                            {item.location}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
