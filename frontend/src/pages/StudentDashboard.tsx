import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import GlobalBackground from '../components/GlobalBackground';
import Navbar from '../components/Navbar';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function StudentDashboard() {
  const { currentUser, logOut } = useAuth();
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const h = new Date().getHours();
    if (h < 12) setGreeting('Good morning');
    else if (h < 17) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  const handleLogout = async () => {
    await logOut();
    navigate('/login');
  };

  const name = currentUser?.displayName?.split(' ')[0] ?? 'there';

  return (
    <div className="relative min-h-screen flex flex-col">
      <GlobalBackground />
      <Navbar />
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/80 via-transparent to-[#030712] pointer-events-none" />

      <main className="relative z-10 flex-1 flex flex-col max-w-4xl mx-auto w-full px-6 pt-28 pb-16">

        {/* ── Top: User greeting strip ────────────────────────────────────── */}
        <motion.div {...fadeUp(0.05)} className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-[0_0_24px_rgba(14,165,233,0.35)] shrink-0">
              {name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-white/40 text-xs font-medium tracking-wide uppercase mb-0.5">{greeting}</p>
              <h1 className="text-white font-bold text-lg leading-tight font-poppins">
                {name} <span className="text-white/30 font-normal text-sm">· {currentUser?.email}</span>
              </h1>
            </div>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold">
            <GraduationCap size={11} /> Student
          </span>
        </motion.div>

        {/* ── Middle: Coming Soon — typographic, no card ───────────────────── */}
        <motion.div {...fadeUp(0.18)} className="flex-1 flex flex-col items-center justify-center text-center py-12">

          {/* Thin decorative line */}
          <div className="flex items-center gap-4 mb-10 w-full max-w-xs">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/10" />
            <Sparkles size={14} className="text-sky-400/60 shrink-0" />
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/10" />
          </div>

          {/* Large typographic "Coming Soon" */}
          <p className="text-xs tracking-[0.3em] text-white/30 uppercase font-medium mb-5">
            More features on the way
          </p>
          <h2
            className="font-black font-poppins leading-none mb-6 text-white"
            style={{ fontSize: 'clamp(3rem, 10vw, 6rem)' }}
          >
            Coming<br />Soon.
          </h2>
          <p className="text-white/35 text-sm max-w-sm leading-relaxed">
            Event registrations, the resource library, achievement badges, and community features are all in the works.
          </p>

          {/* Animated progress bar */}
          <div className="mt-10 w-40 h-px bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full"
              initial={{ x: '-100%' }}
              animate={{ x: '200%' }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.6 }}
            />
          </div>

          {/* Thin decorative line */}
          <div className="flex items-center gap-4 mt-10 w-full max-w-xs">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/10" />
            <Sparkles size={14} className="text-violet-400/60 shrink-0" />
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/10" />
          </div>
        </motion.div>

        {/* ── Bottom: Apply CTA — clean, full-width ───────────────────────── */}
        <motion.div {...fadeUp(0.35)} className="mt-12">
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-r from-violet-900/25 via-indigo-900/15 to-sky-900/15 px-8 py-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            {/* Subtle glow */}
            <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-violet-500/10 blur-3xl pointer-events-none" />

            <div className="relative">
              <p className="text-[10px] tracking-[0.25em] uppercase text-violet-400/80 font-semibold mb-1">Ready to lead?</p>
              <h3 className="text-white font-bold text-lg font-poppins">Apply to join E-Cell</h3>
              <p className="text-white/35 text-sm mt-1">Become a member and shape the entrepreneurship culture on campus.</p>
            </div>

            <Link
              to="/join"
              className="relative flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#030712] font-bold text-sm transition-all hover:bg-white/90 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] shrink-0"
            >
              Apply Now <ArrowRight size={15} />
            </Link>
          </div>
        </motion.div>

      </main>
    </div>
  );
}
