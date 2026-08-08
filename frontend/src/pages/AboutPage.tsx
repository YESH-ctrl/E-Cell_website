import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Target, Eye, Rocket, Globe, Code, Megaphone,
  Handshake, Calendar, DollarSign, Lightbulb,
  ArrowRight, Award, Users, ChevronRight, Zap,
  CheckCircle2, ChevronDown
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GlobalBackground from '../components/GlobalBackground';

// -- Timeline Milestones --
const timeline = [
  { year: '2019', title: 'Founded', desc: 'E-Cell established with a vision to foster entrepreneurship on campus.' },
  { year: '2020', title: 'First Hackathon', desc: 'Launched our flagship 48-hour hackathon with 300+ participants.' },
  { year: '2021', title: 'Startup Lab', desc: 'Opened a dedicated startup incubation lab supporting 10 ventures.' },
  { year: '2022', title: 'National Recognition', desc: 'Ranked among top 10 college E-Cells nationally.' },
  { year: '2023', title: 'Global Partnerships', desc: 'Partnered with international accelerators and VCs.' },
  { year: '2024', title: 'Scale Up', desc: '200+ active members, 30+ successful startup alumni.' },
  { year: '2025/2026', title: 'BEST Ecosystem', desc: 'Pioneered the Business & Entrepreneurship Student Team initiatives.' },
];

// -- Path bullet points (used inside "Our Mission" card) --
const PATH_POINTS = [
  "Planning the club's annual activities in advance with clearly defined goals, timelines, and responsibilities.",
  "Conducting entrepreneurship events that focus on practical learning and real-world problem solving.",
  "Building collaborations with startups, industries, alumni, and entrepreneurship communities to create meaningful opportunities for students.",
  "Maintaining transparency in planning, finances, sponsorships, and decision-making.",
  "Encouraging every team member to take ownership of their responsibilities and contribute towards the club's growth.",
  "Preserving documentation and institutional knowledge so that every committee builds upon the work of the previous one."
];
[[]]
// -- Promise items (used inside "Our Objective" card) --
const PROMISE_ITEMS = [
  {
    title: 'Plan Before Execution',
    desc: 'Every event should begin with a clear purpose and execution plan before registrations or promotions start.',
    implementation: [
      'Annual academic calendar released before the end of July.',
      'Event proposal prepared before every event.',
      'Budget, venue, sponsorship plan, timeline, and responsibilities finalized in advance.'
    ]
  },
  {
    title: 'Build a Culture of Accountability',
    desc: 'Every Executive Committee member should know what they are responsible for and deliver it on time.',
    implementation: [
      'Clearly defined roles and responsibilities.',
      'Weekly Executive Committee review meetings.',
      'Task tracker with deadlines.',
      'Responsibilities reassigned if commitments are repeatedly not met.'
    ]
  },
  {
    title: 'Maintain Transparency',
    desc: 'Important decisions should never depend on a single individual.',
    implementation: [
      'Meeting minutes shared with the Executive Committee.',
      'Financial records maintained after every event.',
      'Sponsorships and collaborations communicated to the team.',
      'Decisions documented for future reference.'
    ]
  },
  {
    title: 'Deliver High-Quality Events',
    desc: 'Focus on quality rather than quantity.',
    implementation: [
      'Every event should have defined learning outcomes.',
      'Post-event review after every major activity.',
      'Participant feedback collected and analysed.',
      'Event reports prepared within one week.'
    ]
  },
  {
    title: 'Strengthen Industry & Startup Connections',
    desc: 'The E-Cell should become a bridge between students and the entrepreneurial ecosystem.',
    implementation: [
      'Invite founders, entrepreneurs, and alumni regularly.',
      'Build partnerships with startups and incubators.',
      'Seek sponsorships that add value to participants.',
      'Collaborate with E-Cells from other institutions.'
    ]
  },
  {
    title: 'Promote Equal Opportunity',
    desc: 'Leadership opportunities should be based on contribution rather than personal preference.',
    implementation: [
      'No personal bias in assigning responsibilities.',
      'Transparent volunteer and coordinator selection.',
      'Recognition based on work and commitment.',
      'Encourage participation from students across all branches.'
    ]
  },
  {
    title: 'Improve Communication',
    desc: 'Information should always be shared before it becomes a problem.',
    implementation: [
      'Weekly updates from every lead.',
      'Shared documentation for ongoing work.',
      'Monthly review with faculty coordinator.'
    ]
  },
  {
    title: 'Ensure Financial Discipline',
    desc: 'Every rupee spent by the club should be accounted for.',
    implementation: [
      'Event budgets approved before execution.',
      'Expense records maintained with bills.',
      'Sponsorship income documented.',
      'Financial report submitted after every major event.'
    ]
  },
  {
    title: 'Build Future Leaders',
    desc: 'Every batch should prepare the next batch.',
    implementation: [
      'Junior team mates involved in organizing events.',
      'Internal knowledge-sharing sessions.',
      'Leadership opportunities for active members.',
      'Structured handover at the end of every tenure.'
    ]
  },
  {
    title: 'Create Sustainable Systems',
    desc: 'The club should improve every year without starting from scratch.',
    implementation: [
      'Documentation for every event.',
      'Sponsor database maintained.',
      'Event templates, budgets, and designs archived.',
      'Standard Operating Procedures (SOPs) created for recurring activities.'
    ]
  }
];

// -- Domain Data --
const DOMAINS = [
  {
    name: 'Technology',
    icon: Code,
    desc: 'Building state-of-the-art web portals, internal products, and coding platforms to power E-Cell events.',
    color: 'text-sky-400',
    bgColor: 'bg-sky-500/5',
    borderColor: 'hover:border-sky-500/30'
  },
  {
    name: 'Marketing & PR',
    icon: Megaphone,
    desc: 'Driving public relations, social media marketing campaigns, and outreach strategies to maximize visibility.',
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/5',
    borderColor: 'hover:border-pink-500/30'
  },
  {
    name: 'Partnerships & Outreach',
    icon: Handshake,
    desc: 'Connecting E-Cell with VC funds, angel networks, startup mentors, and ecosystem accelerators.',
    color: 'text-violet-400',
    bgColor: 'bg-violet-500/5',
    borderColor: 'hover:border-violet-500/30'
  },
  {
    name: 'Events & Experiences',
    icon: Calendar,
    desc: 'Planning and execution of flagship conferences, workshops, E-Summit, and national hackathons.',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/5',
    borderColor: 'hover:border-emerald-500/30'
  },
  {
    name: 'Startup Incubation',
    icon: Lightbulb,
    desc: 'Assisting student founders with startup validation, incubation, and early-stage MVP resources.',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/5',
    borderColor: 'hover:border-amber-500/30'
  },
  {
    name: 'Operations & Finance',
    icon: DollarSign,
    desc: 'Managing internal budget allocations, logistics execution, legal guidelines, and event sponsorships.',
    color: 'text-rose-400',
    bgColor: 'bg-rose-500/5',
    borderColor: 'hover:border-rose-500/30'
  }
];

// -- Incubation Steps --
const INCUBATION_STEPS = [
  {
    step: '01',
    title: 'Ideation & Refinement',
    desc: 'Brainstorming workshops and case study validation to map out real-world problems and viable solutions.'
  },
  {
    step: '02',
    title: 'Validation & Mentorship',
    desc: '1-on-1 feedback sessions with experienced industry experts, startup alumni, and academic advisors.'
  },
  {
    step: '03',
    title: 'Prototyping & MVP',
    desc: 'Providing co-working space, dev credits, design systems, and tech guidance to build your product prototype.'
  },
  {
    step: '04',
    title: 'Incubation & Funding',
    desc: 'Pitching to E-Cell seed funds, angel syndicates, and corporate venture capital groups.'
  },
  {
    step: '05',
    title: 'Scaling & Growth',
    desc: 'Marketing channels deployment, accelerator integrations, and legal support for team formation.'
  }
];

export default function AboutPage() {
  const navigate = useNavigate();
  const [openPromise, setOpenPromise] = useState<number | null>(null);

  // Section refs for scroll tracking & entrance animations
  const statsRef = useRef(null);
  const valuesRef = useRef(null);
  const domainsRef = useRef(null);
  const roadmapRef = useRef(null);
  const timelineRef = useRef(null);

  const statsInView = useInView(statsRef, { once: true, margin: '-100px' });
  const valuesInView = useInView(valuesRef, { once: true, margin: '-100px' });
  const domainsInView = useInView(domainsRef, { once: true, margin: '-100px' });
  const roadmapInView = useInView(roadmapRef, { once: true, margin: '-100px' });
  const timelineInView = useInView(timelineRef, { once: true, margin: '-100px' });

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="relative min-h-screen">
      <GlobalBackground />
      <Navbar />

      <main className="pt-20">

        {/* -- Hero Section -- */}
        <section className="relative pt-20 pb-16 px-6 overflow-hidden">
          {/* Decorative Background Accent */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-sky-500/20 text-sky-400 text-sm font-medium mb-6"
            >
              <Globe size={14} className="animate-spin-slow" /> Discover E-Cell
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="text-5xl md:text-7xl font-black font-poppins mb-6 tracking-tight"
            >
              Our Story. <br className="md:hidden" />
              <span className="gradient-text">Our Legacy.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed"
            >
              We are a passionate community of student builders, startup mentors, and industry experts.
              Together, we build the bridges that turn college projects into commercial realities.
            </motion.p>
          </div>
        </section>

        {/* -- Stats Counters Section -- */}
        <section ref={statsRef} className="py-10 px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { number: '5+', label: 'Years Legacy', icon: Award, color: 'text-sky-400', bg: 'bg-sky-500/10' },
                { number: '50+', label: 'Active Members', icon: Users, color: 'text-violet-400', bg: 'bg-violet-500/10' },
                { number: '5+', label: 'Startups Incubated', icon: Rocket, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                { number: '10+', label: 'Events Hosted', icon: Calendar, color: 'text-amber-400', bg: 'bg-amber-500/10' }
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={statsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="glass p-6 rounded-2xl border border-white/5 text-center group cursor-pointer hover:border-white/10 hover:shadow-[0_10px_30px_rgba(14,165,233,0.05)] transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 ${stat.bg} ${stat.color} transition-transform duration-300 group-hover:scale-110`}>
                    <stat.icon size={22} />
                  </div>
                  <h3 className="text-3xl font-black text-white font-poppins mb-1">{stat.number}</h3>
                  <p className="text-xs uppercase tracking-wider text-white/40 font-semibold">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* -- Our Vision (Purpose) / Our Mission (Path) / Our Objective (Promise) -- */}
        <section ref={valuesRef} className="section-padding px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black font-poppins text-white mb-4">
                Driven by <span className="gradient-text">Purpose</span>
              </h2>
              <p className="text-white/50 text-sm max-w-xl mx-auto">
                Our pillars define how we support students, handle resources, and structure ecosystem opportunities.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 items-start">

              {/* Card 1 -- Our Vision / Purpose */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="glass rounded-2xl p-8 border border-white/5 hover:border-sky-500/40 transition-all duration-500 group relative overflow-hidden h-full"
              >
                <div
                  className="absolute -right-24 -top-24 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                  style={{ backgroundColor: '#0ea5e9' }}
                />
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-sky-500/10 text-sky-400 group-hover:bg-sky-500/20 group-hover:shadow-[0_0_20px_rgba(14,165,233,0.3)] transition-all duration-500">
                    <Eye size={22} />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-sky-400/70 px-3 py-1 rounded-full bg-sky-500/10">
                    Purpose
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-poppins">
                  Our Vision
                </h3>
                <p className="text-white/50 text-sm leading-relaxed group-hover:text-white/70 transition-colors duration-300">
                  To build a transparent, student-driven entrepreneurial ecosystem that develops future
                  innovators and leaders through structured planning, practical learning, industry
                  collaboration, and responsible leadership, while ensuring equal opportunities for
                  every member to learn, contribute, and grow.
                </p>
              </motion.div>

              {/* Card 2 -- Our Mission / Path */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="glass rounded-2xl p-8 border border-white/5 hover:border-emerald-500/40 transition-all duration-500 group relative overflow-hidden h-full"
              >
                <div
                  className="absolute -right-24 -top-24 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                  style={{ backgroundColor: '#10b981' }}
                />
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-500">
                    <Target size={22} />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-emerald-400/70 px-3 py-1 rounded-full bg-emerald-500/10">
                    Path
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-poppins">
                  Our Mission
                </h3>
                <p className="text-white/50 text-sm leading-relaxed group-hover:text-white/70 transition-colors duration-300 mb-4">
                  The Entrepreneurship Cell is committed to building a culture where ideas are
                  transformed into action through disciplined planning, teamwork, and accountability.
                </p>
                <div className="space-y-2.5 max-h-52 overflow-y-auto pr-1 custom-scrollbar">
                  {PATH_POINTS.map((point, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                      <p className="text-white/50 text-xs leading-relaxed group-hover:text-white/70 transition-colors duration-300">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Card 3 -- Our Objective / Promise */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="glass rounded-2xl p-8 border border-white/5 hover:border-violet-500/40 transition-all duration-500 group relative overflow-hidden h-full"
              >
                <div
                  className="absolute -right-24 -top-24 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                  style={{ backgroundColor: '#8b5cf6' }}
                />
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-violet-500/10 text-violet-400 group-hover:bg-violet-500/20 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all duration-500">
                    <Rocket size={22} />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-violet-400/70 px-3 py-1 rounded-full bg-violet-500/10">
                    Promise
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-poppins">
                  Our Objective
                </h3>
                <p className="text-white/50 text-sm leading-relaxed group-hover:text-white/70 transition-colors duration-300 mb-4">
                  Ten commitments that keep every event, decision, and rupee accountable —
                  click any to see how we put it into practice.
                </p>

                <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1 custom-scrollbar">
                  {PROMISE_ITEMS.map((item, i) => {
                    const isOpen = openPromise === i;
                    return (
                      <div
                        key={item.title}
                        className="border border-white/5 rounded-lg overflow-hidden hover:border-violet-500/20 transition-colors duration-300"
                      >
                        <button
                          onClick={() => setOpenPromise(isOpen ? null : i)}
                          className="w-full flex items-center justify-between gap-2 px-3 py-2 text-left"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-violet-400/60 font-bold font-poppins text-[10px] flex-shrink-0">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            <span className="text-white/80 font-medium text-xs truncate">
                              {item.title}
                            </span>
                          </div>
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown size={14} className="text-white/30 flex-shrink-0" />
                          </motion.div>
                        </button>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                              className="overflow-hidden"
                            >
                              <div className="px-3 pb-3">
                                <p className="text-white/50 text-xs leading-relaxed mb-2">
                                  {item.desc}
                                </p>
                                <p className="text-white/30 text-[10px] uppercase tracking-wider font-semibold mb-1.5">
                                  Implementation
                                </p>
                                <div className="space-y-1.5">
                                  {item.implementation.map((point, j) => (
                                    <div key={j} className="flex items-start gap-1.5">
                                      <div className="w-1 h-1 rounded-full bg-violet-400 mt-1.5 flex-shrink-0" />
                                      <p className="text-white/45 text-xs leading-relaxed">{point}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* -- E-Cell Domains Breakdown -- */}
        <section ref={domainsRef} className="section-padding bg-black/20 px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black font-poppins text-white mb-4">
                Our Functional <span className="gradient-text">Domains</span>
              </h2>
              <p className="text-white/50 text-sm max-w-xl mx-auto font-medium">
                The machine behind the magic. E-Cell operates through multiple specialized departments working in synergy.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {DOMAINS.map((domain, i) => {
                const Icon = domain.icon;
                return (
                  <motion.div
                    key={domain.name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={domainsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: i * 0.08, duration: 0.6 }}
                    className={`glass rounded-2xl p-6 border border-white/5 transition-all duration-300 group cursor-pointer ${domain.borderColor} hover:bg-white/[0.02]`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${domain.bgColor} ${domain.color} group-hover:scale-110 transition-transform duration-300`}>
                        <Icon size={20} />
                      </div>
                      <h3 className="text-lg font-bold text-white font-poppins">{domain.name}</h3>
                    </div>
                    <p className="text-sm text-white/50 group-hover:text-white/70 transition-colors duration-300 leading-relaxed">
                      {domain.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* -- Incubation Journey Roadmap -- */}
        <section ref={roadmapRef} className="section-padding px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black font-poppins text-white mb-4">
                The Incubation <span className="gradient-text">Pathway</span>
              </h2>
              <p className="text-white/50 text-sm max-w-xl mx-auto">
                How we nurture raw campus student concepts into structured, scalable market ventures.
              </p>
            </div>

            <div className="relative">
              {/* Desktop Connecting Line */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-sky-500/5 via-sky-500/20 to-sky-500/5 -translate-y-1/2 hidden lg:block z-0" />

              <div className="grid lg:grid-cols-5 gap-6 relative z-10">
                {INCUBATION_STEPS.map((stepItem, i) => (
                  <motion.div
                    key={stepItem.step}
                    initial={{ opacity: 0, y: 40 }}
                    animate={roadmapInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: i * 0.12, duration: 0.7 }}
                    className="glass rounded-2xl p-6 border border-white/5 hover:border-sky-500/20 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-3xl font-black text-sky-400/20 group-hover:text-sky-400/40 transition-colors duration-300 font-poppins">
                          {stepItem.step}
                        </span>
                        <Zap size={16} className="text-sky-400/30 group-hover:text-sky-400 group-hover:animate-pulse transition-all duration-300" />
                      </div>
                      <h3 className="text-base font-bold text-white font-poppins mb-2">{stepItem.title}</h3>
                      <p className="text-xs text-white/50 leading-relaxed group-hover:text-white/70 transition-colors duration-300">
                        {stepItem.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* -- Chronological Timeline Journey -- */}
        <section ref={timelineRef} className="section-padding bg-black/10 px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-3xl md:text-5xl font-black font-poppins text-center text-white mb-16">
              Our Growth <span className="gradient-text">Journey</span>
            </h3>

            <div className="relative">
              {/* Scrolling Line */}
              <motion.div
                initial={{ height: 0 }}
                animate={timelineInView ? { height: '100%' } : {}}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
                className="absolute left-1/2 -translate-x-1/2 top-0 w-px bg-gradient-to-b from-sky-500 via-indigo-500 to-transparent hidden md:block"
              />

              <div className="space-y-12">
                {timeline.map((item, i) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
                    animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className={`flex items-center gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  >
                    <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <motion.div
                        whileHover={{ scale: 1.03, y: -4 }}
                        transition={{ duration: 0.3 }}
                        className="glass rounded-2xl p-6 inline-block border border-white/5 hover:border-sky-500/30 hover:shadow-[0_10px_30px_rgba(14,165,233,0.08)] transition-all duration-300 cursor-pointer"
                      >
                        <div className="text-sky-400 font-bold text-lg font-poppins mb-1 drop-shadow-[0_0_8px_rgba(56,189,248,0.3)]">
                          {item.year}
                        </div>
                        <div className="text-white font-bold mb-2 font-poppins">{item.title}</div>
                        <div className="text-white/50 text-sm leading-relaxed max-w-sm">{item.desc}</div>
                      </motion.div>
                    </div>

                    {/* Dot Indicator */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={timelineInView ? { scale: 1 } : {}}
                      transition={{ delay: i * 0.1 + 0.2, duration: 0.4 }}
                      className="hidden md:flex w-5 h-5 rounded-full bg-sky-500 border-4 border-[#030712] flex-shrink-0 z-10 shadow-[0_0_20px_rgba(14,165,233,0.5)]"
                    />

                    <div className="flex-1 hidden md:block" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* -- CTA Call to Action -- */}
        <section className="max-w-5xl mx-auto px-6 py-20">
          <div className="glass rounded-3xl p-10 md:p-16 text-center border border-white/5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <h2 className="text-3xl md:text-5xl font-black text-white font-poppins mb-6 relative z-10">
              Shape the <span className="gradient-text">Future</span> with Us
            </h2>
            <p className="text-white/60 text-base md:text-lg mb-8 max-w-xl mx-auto leading-relaxed relative z-10">
              Whether you are an aspiring student founder looking for incubation, or a professional looking to collaborate, E-Cell welcomes you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <button
                onClick={handleContactClick}
                className="btn-primary flex items-center gap-2 justify-center"
              >
                Get in Touch <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
