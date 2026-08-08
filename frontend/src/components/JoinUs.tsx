import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Lock, ArrowRight, Home, Compass, Instagram, Linkedin, Sparkles } from 'lucide-react';

export default function JoinUs() {
  return (
    <section id="join" className="section-padding relative overflow-hidden min-h-[75vh] flex items-center justify-center">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#060f1e]/40 to-[#030712]" />
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-radial from-sky-900/10 via-transparent to-transparent" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-12 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl p-8 sm:p-12 border border-white/10 relative overflow-hidden"
        >
          {/* Subtle glowing backdrop */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Icon Badge */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500/20 to-indigo-500/20 border border-sky-500/30 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-sky-500/10">
            <Lock className="text-sky-400 w-8 h-8" />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-sky-500/20 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles size={14} /> Applications Closed
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-poppins text-white mb-4">
            Recruitment is <span className="gradient-text">Closed</span>
          </h1>

          <p className="text-base sm:text-lg text-white/70 max-w-xl mx-auto mb-8 leading-relaxed font-sans">
            Thank you for your overwhelming response and interest in joining E-Cell BVRIT! The application forms for the current session are now officially closed.
          </p>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 max-w-lg mx-auto mb-8 text-sm text-white/50">
            Follow our social channels to get instant updates on upcoming workshops, hackathons, and future recruitment announcements.
          </div>

          {/* Navigation CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center px-6 py-3"
            >
              <Home size={16} /> Back to Home
            </Link>

            <Link
              to="/initiatives"
              className="btn-secondary flex items-center gap-2 w-full sm:w-auto justify-center px-6 py-3"
            >
              <Compass size={16} /> Explore Initiatives <ArrowRight size={16} />
            </Link>
          </div>

          {/* Social Links */}
          <div className="mt-10 pt-8 border-t border-white/10 flex items-center justify-center gap-4">
            <span className="text-xs text-white/40 font-medium">Stay connected:</span>
            <a
              href="https://www.linkedin.com/in/e-cell-bvrit-691906202/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl glass border border-white/5 text-white/60 hover:text-sky-400 hover:border-sky-500/30 transition-all duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://www.instagram.com/ecell_bvrit/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl glass border border-white/5 text-white/60 hover:text-sky-400 hover:border-sky-500/30 transition-all duration-300"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
