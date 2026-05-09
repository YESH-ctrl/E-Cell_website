import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Zap, Users, Calendar, FileText, Bell, LogOut,
  TrendingUp, PlusCircle, Settings, ChevronRight,
  Activity, Award, BarChart2, Star, Rocket,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import GlobalBackground from '../components/GlobalBackground';
import Navbar from '../components/Navbar';

// ── Fade animation ────────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

// ── Animated counter hook ────────────────────────────────────────────────────
function useCounter(target: number, duration = 1500) {
  const [value, setValue] = useState(0);
  const raf = useRef<number>(0);
  useEffect(() => {
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [target, duration]);
  return value;
}

// ── Stats data ───────────────────────────────────────────────────────────────
const STATS = [
  { label: 'Total Members',   value: 48,  icon: Users,     color: 'sky',     suffix: '' },
  { label: 'Events Hosted',   value: 24,  icon: Calendar,  color: 'violet',  suffix: '' },
  { label: 'Applications',    value: 132, icon: FileText,  color: 'emerald', suffix: '' },
  { label: 'Events This Month', value: 3, icon: BarChart2, color: 'amber',   suffix: '' },
];

// ── Quick actions ─────────────────────────────────────────────────────────────
const ACTIONS = [
  { icon: Rocket,      label: 'BEST Platform',    color: 'sky',    desc: 'BVRIT Startup Ecosystem',  href: '/best' },
  { icon: Award,       label: 'BEST Management',  color: 'violet', desc: 'Manage Talent & Growth',   href: '/best/admin' },
  { icon: PlusCircle,  label: 'Create Event',     color: 'sky',    desc: 'Schedule a new event'      },
  { icon: Users,       label: 'Manage Members',   color: 'violet', desc: 'View the member roster'    },
  { icon: FileText,    label: 'Applications',     color: 'emerald',desc: 'Review join applications'  },
  { icon: TrendingUp,  label: 'Analytics',        color: 'amber',  desc: 'See platform insights'     },
  { icon: Award,       label: 'Achievements',     color: 'sky',    desc: 'Track milestones'          },
  { icon: Settings,    label: 'Settings',         color: 'violet', desc: 'Manage cell preferences'   },
];

// ── Recent activity feed ──────────────────────────────────────────────────────
const FEED = [
  { id: 1, text: 'New application received from Rahul Mehra',  time: '2m ago',  type: 'application' },
  { id: 2, text: 'Startup Pitch Workshop marked as confirmed', time: '1h ago',  type: 'event'       },
  { id: 3, text: 'Priya Singh joined as E-Cell Member',       time: '3h ago',  type: 'member'      },
  { id: 4, text: 'IdeaThon 2026 registration opened',         time: '1d ago',  type: 'event'       },
  { id: 5, text: '12 new students visited the portal today',  time: '1d ago',  type: 'insight'     },
];

const feedDot: Record<string, string> = {
  application: 'bg-emerald-400',
  event:       'bg-sky-400',
  member:      'bg-violet-400',
  insight:     'bg-amber-400',
};

const tagColor: Record<string, string> = {
  sky:     'bg-sky-500/15 text-sky-400 border-sky-500/25',
  violet:  'bg-violet-500/15 text-violet-400 border-violet-500/25',
  emerald: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
  amber:   'bg-amber-500/15 text-amber-400 border-amber-500/25',
};

// ── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({ stat, delay }: { stat: typeof STATS[0]; delay: number }) {
  const count = useCounter(stat.value);
  return (
    <motion.div {...fadeUp(delay)}>
      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-xl p-5 hover:border-white/20 transition-all group">
        <div className={`w-9 h-9 rounded-xl mb-3 flex items-center justify-center ${tagColor[stat.color]} border`}>
          <stat.icon size={16} />
        </div>
        <p className="text-3xl font-black text-white">{count}{stat.suffix}</p>
        <p className="text-xs text-white/40 mt-0.5">{stat.label}</p>
      </div>
    </motion.div>
  );
}

export default function EcellDashboard() {
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

  const name = currentUser?.displayName?.split(' ')[0] ?? 'Member';

  return (
    <div className="relative min-h-screen">
      <GlobalBackground />
      <Navbar />
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/70 via-transparent to-[#030712]/90 pointer-events-none" />

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-10 space-y-8">

        {/* ── Welcome Hero ─────────────────────────────────────────────────── */}
        <motion.div {...fadeUp(0.05)}>
          <div className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-900/30 via-[#030712]/40 to-indigo-900/20 p-8 backdrop-blur-xl shadow-[0_0_80px_rgba(139,92,246,0.1)]">
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-violet-500/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

            <div className="relative flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/15 border border-violet-500/25 text-violet-400 text-xs font-semibold">
                    <Zap size={12} /> E-Cell Member
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-bold">
                    <Star size={9} /> Core Team
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-white font-poppins mt-2">
                  {greeting}, <span className="text-violet-400">{name}!</span>
                </h1>
                <p className="text-white/50 mt-2 max-w-md text-sm leading-relaxed">
                  Your E-Cell command center. Manage events, track members, review applications, and drive entrepreneurship on campus.
                </p>
              </div>

              {/* Avatar with ring */}
              <div className="relative shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-black text-2xl shadow-[0_0_40px_rgba(139,92,246,0.4)]">
                  {name.charAt(0).toUpperCase()}
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-violet-500 border-2 border-[#030712] flex items-center justify-center">
                  <Zap size={10} className="text-white" />
                </div>
              </div>
            </div>

            <div className="relative flex flex-wrap gap-5 mt-6 pt-6 border-t border-white/[0.06]">
              <div className="text-sm"><span className="text-white/20 mr-2">Email</span><span className="text-white/70">{currentUser?.email}</span></div>
              <div className="text-sm"><span className="text-white/20 mr-2">Role</span><span className="text-violet-400 font-medium">E-Cell Member</span></div>
              <div className="text-sm"><span className="text-white/20 mr-2">Status</span><span className="text-emerald-400 font-medium flex items-center gap-1 inline-flex"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />Active</span></div>
            </div>
          </div>
        </motion.div>

        {/* ── Stats Row ────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} delay={0.1 + i * 0.07} />
          ))}
        </div>

        {/* ── BEST Ecosystem Section ────────────────────────────────────────── */}
        <motion.div {...fadeUp(0.15)}>
          <div className="rounded-3xl border border-sky-500/20 bg-gradient-to-br from-sky-900/20 via-[#030712]/40 to-indigo-900/20 p-8 backdrop-blur-xl shadow-[0_0_50px_rgba(14,165,233,0.1)]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl font-black text-white font-poppins flex items-center gap-2">
                  <Rocket className="text-sky-400" size={24} /> BEST <span className="text-sky-400">Ecosystem</span>
                </h2>
                <p className="text-white/50 text-sm mt-1 max-w-xl">
                  Manage the BVRIT Ecosystem for Startups & Talent. Track student growth, evaluate performance, and allocate opportunities.
                </p>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => navigate('/best')}
                  className="px-6 py-3 rounded-2xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-sm transition-all shadow-lg shadow-sky-500/20"
                >
                  Visit Landing
                </button>
                <button 
                  onClick={() => navigate('/best/admin')}
                  className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-sm transition-all"
                >
                  Talent Board
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* ── Quick Actions (2/3 width) ─────────────────────────────────── */}
          <motion.div className="lg:col-span-2" {...fadeUp(0.28)}>
            <div className="rounded-3xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-xl p-6 h-full">
              <h2 className="font-bold text-white text-base flex items-center gap-2 mb-5">
                <Activity size={16} className="text-violet-400" /> Quick Actions
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {ACTIONS.map((action) => (
                  <button
                    key={action.label}
                    onClick={() => 'href' in action && action.href && navigate(action.href)}
                    className="flex flex-col items-start gap-3 p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04] transition-all group text-left"
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${tagColor[action.color]} border`}>
                      <action.icon size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white/90 group-hover:text-white transition-colors">{action.label}</p>
                      <p className="text-[11px] text-white/35 mt-0.5 leading-tight">{action.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Activity Feed (1/3 width) ─────────────────────────────────── */}
          <motion.div {...fadeUp(0.33)}>
            <div className="rounded-3xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-xl p-6 h-full">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-white text-base flex items-center gap-2">
                  <Activity size={16} className="text-sky-400" /> Activity
                </h2>
                <button className="text-xs text-sky-400/70 hover:text-sky-400 transition-colors flex items-center gap-1">
                  All <ChevronRight size={12} />
                </button>
              </div>
              <div className="space-y-4">
                {FEED.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="mt-1.5 shrink-0">
                      <span className={`block w-2 h-2 rounded-full ${feedDot[item.type]}`} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-white/70 leading-snug">{item.text}</p>
                      <p className="text-[10px] text-white/30 mt-1">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

      </main>
    </div>
  );
}
