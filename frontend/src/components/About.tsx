import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Target, Eye, Rocket, Globe, ArrowRight, CheckCircle2,
  Sparkles, ShieldCheck, Layers, ChevronRight
} from 'lucide-react';
import { staggerContainer } from '../animations/variants';

const OBJECTIVE_HIGHLIGHTS = [
  { title: 'Plan Before Execution', desc: 'Every event has a clear proposal, budget, and timeline before launching.' },
  { title: 'Culture of Accountability', desc: 'Defined executive roles, weekly review meetings, and deadline trackers.' },
  { title: 'Complete Transparency', desc: 'Documented meeting minutes, financial logs, and sponsorship records.' },
  { title: 'Quality over Quantity', desc: 'Events with clear learning outcomes, review reports, and attendee feedback.' },
  { title: 'Industry & Alumni Bridge', desc: 'Regular founder sessions, incubator ties, and inter-college networking.' },
  { title: 'Equal Opportunity Leadership', desc: 'Merit-based responsibilities with zero personal bias across all branches.' }
];

export default function About() {
  const navigate = useNavigate();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [activeTab, setActiveTab] = useState<'vision' | 'mission' | 'objective'>('vision');

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#060f1e]/40 to-[#030712]" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-sky-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* -- Section Header -- */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-sky-500/20 text-sky-400 text-sm font-medium mb-6"
          >
            <Sparkles size={14} className="animate-pulse" /> What We Stand For
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black font-poppins mb-6 tracking-tight"
          >
            Building the <span className="gradient-text">Entrepreneurial Mindset</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg text-white/60 max-w-3xl mx-auto leading-relaxed"
          >
            E-Cell is a student-driven ecosystem that transforms campus innovation into real-world ventures through disciplined execution, industry mentorship, and equal opportunities.
          </motion.p>
        </motion.div>

        {/* -- 3 Clean Feature Cards Grid -- */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 items-stretch">
          
          {/* Card 1: Our Vision */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="glass rounded-3xl p-8 border border-white/10 hover:border-sky-500/40 transition-all duration-500 flex flex-col justify-between group relative overflow-hidden shadow-lg hover:shadow-[0_15px_35px_rgba(14,165,233,0.1)]"
          >
            <div className="absolute -right-20 -top-20 w-40 h-40 bg-sky-500/10 rounded-full blur-2xl group-hover:bg-sky-500/20 transition-all duration-500 pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center border border-sky-500/20 group-hover:scale-110 group-hover:bg-sky-500 group-hover:text-black transition-all duration-500">
                  <Eye size={26} />
                </div>
                <span className="text-xs uppercase font-bold tracking-widest text-sky-400/80 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20">
                  01 . Purpose
                </span>
              </div>

              <h3 className="text-2xl font-black text-white font-poppins mb-3">
                Our Vision
              </h3>

              <p className="text-white/60 text-sm leading-relaxed mb-6">
                To build a transparent, student-led ecosystem that develops future founders and leaders through structured planning, practical learning, and responsible leadership.
              </p>
            </div>

            <div className="space-y-2.5 pt-4 border-t border-white/5">
              <div className="flex items-center gap-2.5 text-xs text-white/80 font-medium">
                <CheckCircle2 size={15} className="text-sky-400 flex-shrink-0" />
                <span>Equal opportunities across all branches</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-white/80 font-medium">
                <CheckCircle2 size={15} className="text-sky-400 flex-shrink-0" />
                <span>Practical learning over theoretical concepts</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-white/80 font-medium">
                <CheckCircle2 size={15} className="text-sky-400 flex-shrink-0" />
                <span>Student empowerment & venture growth</span>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Our Mission */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="glass rounded-3xl p-8 border border-white/10 hover:border-emerald-500/40 transition-all duration-500 flex flex-col justify-between group relative overflow-hidden shadow-lg hover:shadow-[0_15px_35px_rgba(16,185,129,0.1)]"
          >
            <div className="absolute -right-20 -top-20 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all duration-500 pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-black transition-all duration-500">
                  <Target size={26} />
                </div>
                <span className="text-xs uppercase font-bold tracking-widest text-emerald-400/80 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  02 . Action
                </span>
              </div>

              <h3 className="text-2xl font-black text-white font-poppins mb-3">
                Our Mission
              </h3>

              <p className="text-white/60 text-sm leading-relaxed mb-6">
                Transforming raw ideas into actionable, market-ready startups through disciplined execution, team accountability, and strategic industry partnerships.
              </p>
            </div>

            <div className="space-y-2.5 pt-4 border-t border-white/5">
              <div className="flex items-center gap-2.5 text-xs text-white/80 font-medium">
                <CheckCircle2 size={15} className="text-emerald-400 flex-shrink-0" />
                <span>Goal-driven annual activity planning</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-white/80 font-medium">
                <CheckCircle2 size={15} className="text-emerald-400 flex-shrink-0" />
                <span>Industry, VC, and incubator networks</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-white/80 font-medium">
                <CheckCircle2 size={15} className="text-emerald-400 flex-shrink-0" />
                <span>Institutional documentation & legacy SOPs</span>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Our Objective */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="glass rounded-3xl p-8 border border-white/10 hover:border-violet-500/40 transition-all duration-500 flex flex-col justify-between group relative overflow-hidden shadow-lg hover:shadow-[0_15px_35px_rgba(139,92,246,0.1)]"
          >
            <div className="absolute -right-20 -top-20 w-40 h-40 bg-violet-500/10 rounded-full blur-2xl group-hover:bg-violet-500/20 transition-all duration-500 pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-violet-500/10 text-violet-400 flex items-center justify-center border border-violet-500/20 group-hover:scale-110 group-hover:bg-violet-500 group-hover:text-black transition-all duration-500">
                  <Rocket size={26} />
                </div>
                <span className="text-xs uppercase font-bold tracking-widest text-violet-400/80 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20">
                  03 . Commitment
                </span>
              </div>

              <h3 className="text-2xl font-black text-white font-poppins mb-3">
                Our Objective
              </h3>

              <p className="text-white/60 text-sm leading-relaxed mb-6">
                Operating under 10 strict core commitments that guarantee financial discipline, measurable learning outcomes, and transparent decision-making.
              </p>
            </div>

            <div className="space-y-2.5 pt-4 border-t border-white/5">
              <div className="flex items-center gap-2.5 text-xs text-white/80 font-medium">
                <CheckCircle2 size={15} className="text-violet-400 flex-shrink-0" />
                <span>Financial discipline & event budgets</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-white/80 font-medium">
                <CheckCircle2 size={15} className="text-violet-400 flex-shrink-0" />
                <span>Structured batch-to-batch leadership handover</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-white/80 font-medium">
                <CheckCircle2 size={15} className="text-violet-400 flex-shrink-0" />
                <span>Sustainable systems & transparent reviews</span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* -- Bottom Interactive Feature Showcase -- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="glass rounded-3xl p-8 md:p-10 border border-white/10 relative overflow-hidden"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center md:text-left">
              <h4 className="text-xl md:text-2xl font-bold text-white font-poppins">
                Want to see our 10 Core Commitments & Incubation Journey?
              </h4>
              <p className="text-white/50 text-sm max-w-xl">
                Explore our full constitution, detailed domain breakdowns, incubation roadmap, and growth history.
              </p>
            </div>

            <button
              onClick={() => navigate('/about')}
              className="btn-primary flex items-center gap-2 px-6 py-3.5 whitespace-nowrap text-sm font-semibold group flex-shrink-0"
            >
              <span>Explore Full Story</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}



