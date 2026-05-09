import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  GraduationCap, Calendar, Rocket, Users, ArrowRight,
  LogOut, Bell, BookOpen, Lightbulb, Trophy, ChevronRight,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import GlobalBackground from '../components/GlobalBackground';
import Navbar from '../components/Navbar';

// ── Fade-up animation helper ─────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

// ── Dummy upcoming events ────────────────────────────────────────────────────
const EVENTS = [
  { id: 1, title: 'Startup Pitch Workshop',   date: 'Apr 20, 2026', tag: 'Workshop',   color: 'sky'     },
  { id: 2, title: 'Founder Talk: IIT Alumni', date: 'Apr 27, 2026', tag: 'Talk',       color: 'violet'  },
  { id: 3, title: 'IdeaThon 2026',            date: 'May 5, 2026',  tag: 'Hackathon',  color: 'emerald' },
];

// ── Quick links ──────────────────────────────────────────────────────────────
const LINKS = [
  { icon: BookOpen,  label: 'Resources',   href: '/#initiatives', color: 'sky'     },
  { icon: Trophy,    label: 'Gallery',     href: '/#gallery',     color: 'amber'   },
  { icon: Users,     label: 'About Us',    href: '/#about',       color: 'violet'  },
  { icon: Lightbulb, label: 'Join E-Cell', href: '/#join',        color: 'emerald' },
];

const tagColor: Record<string, string> = {
  sky:     'bg-sky-500/15 text-sky-400 border-sky-500/25',
  violet:  'bg-violet-500/15 text-violet-400 border-violet-500/25',
  emerald: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
  amber:   'bg-amber-500/15 text-amber-400 border-amber-500/25',
};

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
    <div className="relative min-h-screen">
      <GlobalBackground />
      <Navbar />
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/70 via-transparent to-[#030712]/90 pointer-events-none" />

      <main className="relative z-10 max-w-5xl mx-auto px-6 pt-24 pb-10 space-y-8">

        {/* ── Welcome Hero ─────────────────────────────────────────────────── */}
        <motion.div {...fadeUp(0.05)}>
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-sky-900/30 via-[#030712]/40 to-indigo-900/20 p-8 backdrop-blur-xl shadow-[0_0_60px_rgba(14,165,233,0.08)]">
            {/* Decorative glow */}
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

            <div className="relative flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/15 border border-sky-500/25 text-sky-400 text-xs font-semibold">
                    <GraduationCap size={12} /> Student
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-white font-poppins mt-2">
                  {greeting}, <span className="text-sky-400">{name}!</span>
                </h1>
                <p className="text-white/50 mt-2 max-w-md text-sm leading-relaxed">
                  Welcome to your E-Cell student portal. Explore events, resources, and opportunities to fuel your entrepreneurial journey.
                </p>
              </div>

              {/* Avatar */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white font-black text-2xl shadow-[0_0_30px_rgba(14,165,233,0.3)] shrink-0">
                {name.charAt(0).toUpperCase()}
              </div>
            </div>

            {/* Info row */}
            <div className="relative flex flex-wrap gap-4 mt-6 pt-6 border-t border-white/[0.06]">
              <div className="text-sm text-white/40">
                <span className="text-white/20 mr-2">Email</span>
                <span className="text-white/70">{currentUser?.email}</span>
              </div>
              <div className="text-sm text-white/40">
                <span className="text-white/20 mr-2">Role</span>
                <span className="text-sky-400 font-medium">Student</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Stats Row ────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Events This Month', value: '3',  icon: Calendar, color: 'sky'     },
            { label: 'Active Initiatives', value: '6', icon: Rocket,   color: 'violet'  },
            { label: 'Community Members', value: '240',icon: Users,    color: 'emerald' },
            { label: 'Workshops Done',    value: '12', icon: Trophy,   color: 'amber'   },
          ].map((stat, i) => (
            <motion.div key={stat.label} {...fadeUp(0.1 + i * 0.06)}>
              <div className={`rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-xl p-5 hover:border-white/20 transition-all group`}>
                <div className={`w-9 h-9 rounded-xl mb-3 flex items-center justify-center ${tagColor[stat.color]} border`}>
                  <stat.icon size={16} />
                </div>
                <p className="text-2xl font-black text-white">{stat.value}</p>
                <p className="text-xs text-white/40 mt-0.5">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {/* ── Upcoming Events ──────────────────────────────────────────────── */}
          <motion.div {...fadeUp(0.25)}>
            <div className="rounded-3xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-xl p-6 h-full">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-white text-base flex items-center gap-2">
                  <Calendar size={16} className="text-sky-400" /> Upcoming Events
                </h2>
                <Link to="/" className="text-xs text-sky-400/70 hover:text-sky-400 transition-colors flex items-center gap-1">
                  View all <ChevronRight size={12} />
                </Link>
              </div>
              <div className="space-y-3">
                {EVENTS.map((ev) => (
                  <div key={ev.id} className="flex items-start gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-white/10 transition-all group cursor-pointer">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${tagColor[ev.color]} border`}>
                      <Calendar size={14} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white/90 truncate">{ev.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-white/40">{ev.date}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${tagColor[ev.color]}`}>{ev.tag}</span>
                      </div>
                    </div>
                    <ChevronRight size={14} className="text-white/20 group-hover:text-white/50 transition-colors ml-auto shrink-0 mt-1" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Quick Links ──────────────────────────────────────────────────── */}
          <motion.div {...fadeUp(0.3)}>
            <div className="rounded-3xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-xl p-6 h-full">
              <h2 className="font-bold text-white text-base flex items-center gap-2 mb-5">
                <Rocket size={16} className="text-violet-400" /> Quick Access
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {LINKS.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="flex flex-col items-center gap-3 p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04] transition-all group"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tagColor[link.color]} border`}>
                      <link.icon size={18} />
                    </div>
                    <span className="text-xs font-semibold text-white/70 group-hover:text-white transition-colors">{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Join E-Cell CTA ───────────────────────────────────────────────── */}
        <motion.div {...fadeUp(0.38)}>
          <div className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-r from-violet-900/20 to-indigo-900/20 backdrop-blur-xl p-7 flex items-center justify-between gap-6 flex-wrap">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-indigo-500/5 pointer-events-none" />
            <div className="relative">
              <p className="text-xs text-violet-400 font-semibold uppercase tracking-widest mb-1">Ready to lead?</p>
              <h3 className="text-xl font-black text-white">Apply to join E-Cell</h3>
              <p className="text-white/40 text-sm mt-1 max-w-xs">Become a member and shape the entrepreneurship culture on campus.</p>
            </div>
            <Link
              to="/#join"
              className="relative flex items-center gap-2 px-6 py-3 rounded-2xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm transition-all shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] shrink-0"
            >
              Apply Now <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>

      </main>
    </div>
  );
}
