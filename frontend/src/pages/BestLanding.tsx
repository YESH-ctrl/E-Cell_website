import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Rocket, Target, Users, BookOpen, Star, TrendingUp, ChevronRight, GraduationCap, Briefcase, Award, ArrowRight, LayoutDashboard } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GlobalBackground from '../components/GlobalBackground';

const HIERARCHY = [
  { level: 'Trainee', desc: 'Entry point for aspiring talent. Focus on learning core startup fundamentals and domain basics.', color: 'from-slate-400 to-slate-600', icon: GraduationCap },
  { level: 'Associate', desc: 'Hands-on execution phase. Contributing to live projects and assisting project leads.', color: 'from-sky-400 to-sky-600', icon: Users },
  { level: 'Project Lead', desc: 'Ownership stage. Managing small teams and delivering specific startup initiatives.', color: 'from-emerald-400 to-emerald-600', icon: Briefcase },
  { level: 'Domain Head', desc: 'Strategic leadership. Overseeing entire departments like Tech, Marketing, or Finance.', color: 'from-violet-400 to-violet-600', icon: Target },
  { level: 'Talent Board', desc: 'Decision-making body. Evaluating student growth and strategic ecosystem planning.', color: 'from-indigo-400 to-indigo-600', icon: Award },
  { level: 'Leadership', desc: 'Executive visionaries. Directing the BEST ecosystem under the E-Cell umbrella.', color: 'from-amber-400 to-rose-600', icon: Star },
];

const FEATURES = [
  { icon: Users, title: 'Alumni Mentorship', desc: 'Get direct guidance from BVRIT alumni who are now successful founders and industry leaders.' },
  { icon: Rocket, title: 'Startup Projects', desc: 'Work on real-world startup problems and build products that solve actual market needs.' },
  { icon: Briefcase, title: 'Internship Opportunities', desc: 'Direct access to internships within our partner startup network and ecosystem.' },
  { icon: BookOpen, title: 'Workshops & Sessions', desc: 'Exclusive access to founder talks, technical workshops, and growth mindset sessions.' },
];

export default function BestLanding() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-[#030712] selection:bg-sky-500/30">
      <GlobalBackground />
      <Navbar />

      <main className="relative pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center pt-20 pb-32 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030712]/80 to-[#030712]" />
            <img 
              src="/images/best_hero.png" 
              alt="BEST Ecosystem" 
              className="w-full h-full object-cover opacity-40 blur-[2px]"
            />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-sky-500/20 text-sky-400 text-sm font-bold mb-8">
                <div className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                Empowering BVRIT's Talent
              </div>
              <h1 className="text-6xl md:text-8xl font-black font-poppins mb-8 leading-[0.9]">
                Welcome to <br />
                <span className="gradient-text">BEST</span>
              </h1>
              <p className="text-xl text-white/60 mb-10 leading-relaxed max-w-xl">
                BVRIT's Ecosystem for Startups & Talent — An elite, performance-driven 
                environment where your growth, leadership, and industry exposure 
                are continuously tracked and rewarded.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => navigate('/best/dashboard')}
                  className="btn-primary px-8 py-4 flex items-center gap-2 group"
                >
                  Join BEST <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => navigate('/ecell-dashboard')}
                  className="btn-secondary px-8 py-4 flex items-center gap-2"
                >
                  <LayoutDashboard size={18} /> Back to Portal
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="glass rounded-[3rem] p-8 border-white/5 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-indigo-500/10" />
                <img 
                  src="/images/best_hero.png" 
                  alt="Ecosystem Dashboard Mockup" 
                  className="rounded-[2rem] w-full shadow-2xl border border-white/10 group-hover:scale-[1.02] transition-transform duration-700"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-24 relative bg-gradient-to-b from-[#030712] to-[#060f1e]/40">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="glass p-12 rounded-3xl border-white/5 hover:border-sky-500/20 transition-colors">
                <Target className="text-sky-400 mb-6" size={40} />
                <h2 className="text-3xl font-bold text-white mb-4 font-poppins">Our Mission</h2>
                <p className="text-white/50 leading-relaxed text-lg">
                  To provide a comprehensive platform that bridges the gap between 
                  academic excellence and industry-leading performance by nurturing 
                  startup thinking and technical talent.
                </p>
              </div>
              <div className="glass p-12 rounded-3xl border-white/5 hover:border-indigo-500/20 transition-colors">
                <Star className="text-indigo-400 mb-6" size={40} />
                <h2 className="text-3xl font-bold text-white mb-4 font-poppins">Our Vision</h2>
                <p className="text-white/50 leading-relaxed text-lg">
                  Creating BVRIT's most elite cohort of student leaders, builders, 
                  and innovators who go on to launch successful startups or lead 
                  global technology companies.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 6-Level Hierarchy Visualization */}
        <section className="py-32 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-white font-poppins mb-6">
              The <span className="gradient-text">Growth Journey</span>
            </h2>
            <p className="text-white/40 max-w-2xl mx-auto">
              Track your progression through our high-performance tiers. Each level 
              unlocks new responsibilities and elite opportunities.
            </p>
          </div>

          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {HIERARCHY.map((item, i) => (
              <motion.div
                key={item.level}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-8 rounded-3xl border-white/5 relative group hover:border-sky-500/30 transition-all duration-500"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                  <item.icon size={28} className="text-white" />
                </div>
                <div className="text-sky-400 text-xs font-bold uppercase tracking-widest mb-2">Level 0{i + 1}</div>
                <h3 className="text-2xl font-black text-white font-poppins mb-4">{item.level}</h3>
                <p className="text-white/40 leading-relaxed text-sm">
                  {item.desc}
                </p>
                <div className="absolute top-8 right-8 text-white/5 text-6xl font-black font-poppins pointer-events-none group-hover:text-white/10 transition-colors">
                  {i + 1}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Features Bento Grid */}
        <section className="py-32 relative bg-[#060f1e]/40">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-black text-white font-poppins mb-6">
                Elite <span className="gradient-text">Features</span>
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {FEATURES.map((feature, i) => (
                <div key={i} className="glass p-10 rounded-3xl border-white/5 hover:bg-white/[0.05] transition-all">
                  <div className="w-12 h-12 rounded-xl bg-sky-500/10 flex items-center justify-center mb-6 text-sky-400">
                    <feature.icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 relative px-6">
          <div className="max-w-5xl mx-auto glass rounded-[3rem] p-16 text-center border-white/5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-sky-500/10 via-transparent to-indigo-500/10" />
            <h2 className="text-4xl md:text-6xl font-black text-white font-poppins mb-8 relative z-10 leading-tight">
              Ready to Accelerate Your <br />
              <span className="gradient-text">Leadership Journey?</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-6 relative z-10">
              <button 
                onClick={() => navigate('/best/dashboard')}
                className="btn-primary px-10 py-5 text-lg"
              >
                Join BEST Now
              </button>
              <button 
                onClick={() => navigate('/ecell-dashboard')}
                className="btn-secondary px-10 py-5 text-lg"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
