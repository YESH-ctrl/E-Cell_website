import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, User, Rocket, Briefcase, Award, BookOpen, 
  Settings, Bell, Search, TrendingUp, CheckCircle2, Clock, 
  ChevronRight, Star, Zap, MessageSquare, GraduationCap,
  Calendar, ArrowUpRight, BarChart3, Users
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, AreaChart, Area, BarChart, Bar 
} from 'recharts';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PERFORMANCE_DATA = [
  { name: 'Month 1', score: 45, xp: 120 },
  { name: 'Month 2', score: 52, xp: 250 },
  { name: 'Month 3', score: 48, xp: 380 },
  { name: 'Month 4', score: 61, xp: 510 },
  { name: 'Month 5', score: 75, xp: 750 },
  { name: 'Month 6', score: 85, xp: 920 },
];

const SKILLS = [
  { name: 'Technical', level: 85 },
  { name: 'Leadership', level: 65 },
  { name: 'Marketing', level: 40 },
  { name: 'Operations', level: 70 },
];

const LEVELS = [
  { id: 1, name: 'Trainee', status: 'completed' },
  { id: 2, name: 'Associate', status: 'current' },
  { id: 3, name: 'Project Lead', status: 'locked' },
  { id: 4, name: 'Domain Head', status: 'locked' },
  { id: 5, name: 'Talent Board', status: 'locked' },
  { id: 6, name: 'Leadership', status: 'locked' },
];

export default function BestStudentDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#030712] text-white selection:bg-sky-500/30">
      <Navbar />
      
      <div className="pt-24 pb-12 flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 hidden lg:block border-r border-white/5 px-6 space-y-2 shrink-0 h-[calc(100vh-96px)] sticky top-24">
          <div className="py-4 text-xs font-bold text-white/30 uppercase tracking-widest px-4">Menu</div>
          {[
            { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'growth', label: 'Growth Path', icon: TrendingUp },
            { id: 'projects', label: 'Projects', icon: Rocket },
            { id: 'opportunities', label: 'Opportunities', icon: Briefcase },
            { id: 'learning', label: 'Resource Hub', icon: BookOpen },
            { id: 'mentorship', label: 'Mentorship', icon: Users },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === item.id 
                  ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' 
                  : 'text-white/50 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
          
          <div className="pt-8 py-4 text-xs font-bold text-white/30 uppercase tracking-widest px-4">Account</div>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/50 hover:bg-white/5 hover:text-white transition-all">
            <User size={18} /> Profile
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/50 hover:bg-white/5 hover:text-white transition-all">
            <Settings size={18} /> Settings
          </button>
          <div className="pt-4 mt-4 border-t border-white/5">
            <button 
              onClick={() => navigate('/ecell-dashboard')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-sky-400/70 hover:bg-sky-500/5 hover:text-sky-400 transition-all"
            >
              <ChevronRight size={18} className="rotate-180" /> Back to Portal
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 px-6 lg:px-10 overflow-hidden">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <h1 className="text-3xl font-black font-poppins mb-1">BEST <span className="gradient-text">Dashboard</span></h1>
              <p className="text-white/40 text-sm">Welcome back, Yeshwanth! Track your growth and opportunities.</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="w-10 h-10 rounded-xl glass border border-white/5 flex items-center justify-center relative hover:bg-white/10 transition-all">
                <Bell size={20} className="text-white/60" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-sky-500 rounded-full border-2 border-[#030712]" />
              </button>
              <div className="h-10 px-4 rounded-xl glass border border-white/5 flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-sky-400 to-indigo-600 flex items-center justify-center text-[10px] font-bold">Y</div>
                <div className="text-xs font-bold">Yeshwanth <span className="text-white/30">/ Associate</span></div>
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: 'Talent Score', value: '842', icon: Star, color: 'text-amber-400', bg: 'bg-amber-400/10' },
                    { label: 'Growth XP', value: '1,250', icon: Zap, color: 'text-sky-400', bg: 'bg-sky-400/10' },
                    { label: 'Level', value: 'Associate', icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
                    { label: 'Active Projects', value: '3', icon: Rocket, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
                  ].map((stat) => (
                    <div key={stat.label} className="glass p-6 rounded-3xl border-white/5 hover:border-white/10 transition-all">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center ${stat.color}`}>
                          <stat.icon size={20} />
                        </div>
                        <div className="text-[10px] font-bold text-white/30 tracking-widest uppercase">Live</div>
                      </div>
                      <div className="text-2xl font-black mb-1">{stat.value}</div>
                      <div className="text-xs text-white/40">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Growth Chart */}
                  <div className="lg:col-span-2 glass p-8 rounded-3xl border-white/5">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h3 className="text-xl font-bold font-poppins">Growth Performance</h3>
                        <p className="text-white/40 text-xs mt-1">Analytics for your BEST talent score progression</p>
                      </div>
                      <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs outline-none text-white/60">
                        <option>Last 6 Months</option>
                        <option>Last Year</option>
                      </select>
                    </div>
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={PERFORMANCE_DATA}>
                          <defs>
                            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                          <XAxis 
                            dataKey="name" 
                            stroke="rgba(255,255,255,0.3)" 
                            fontSize={10} 
                            tickLine={false} 
                            axisLine={false}
                          />
                          <YAxis 
                            stroke="rgba(255,255,255,0.3)" 
                            fontSize={10} 
                            tickLine={false} 
                            axisLine={false}
                          />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                            itemStyle={{ color: '#fff', fontSize: '12px' }}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="score" 
                            stroke="#0ea5e9" 
                            strokeWidth={3}
                            fillOpacity={1} 
                            fill="url(#colorScore)" 
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Level Progression */}
                  <div className="glass p-8 rounded-3xl border-white/5">
                    <h3 className="text-xl font-bold font-poppins mb-8">Growth Path</h3>
                    <div className="space-y-6 relative">
                      <div className="absolute left-[15px] top-4 bottom-4 w-px bg-white/5" />
                      {LEVELS.map((level) => (
                        <div key={level.id} className="flex items-center gap-4 relative z-10">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 ${
                            level.status === 'completed' 
                              ? 'bg-sky-500 border-sky-500 text-white' 
                              : level.status === 'current'
                                ? 'bg-[#030712] border-sky-500 text-sky-400'
                                : 'bg-[#030712] border-white/10 text-white/20'
                          }`}>
                            {level.status === 'completed' ? <CheckCircle2 size={16} /> : <div className="text-[10px] font-bold">{level.id}</div>}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className={`text-sm font-bold ${level.status === 'locked' ? 'text-white/20' : 'text-white'}`}>{level.name}</span>
                              {level.status === 'current' && <span className="text-[10px] bg-sky-500/20 text-sky-400 px-2 py-0.5 rounded-full font-bold">Active</span>}
                            </div>
                            {level.status === 'current' && (
                              <div className="mt-2 w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: '65%' }}
                                  className="h-full bg-sky-500 rounded-full"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <button className="btn-secondary w-full mt-10 text-xs py-3">View Full Requirements</button>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Current Projects */}
                  <div className="glass p-8 rounded-3xl border-white/5">
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-xl font-bold font-poppins">Active Projects</h3>
                      <button className="text-sky-400 text-xs font-bold hover:underline">View All</button>
                    </div>
                    <div className="space-y-4">
                      {[
                        { title: 'EcoTrack Platform', type: 'Tech Stack Dev', deadline: 'Dec 15', status: 'In Progress' },
                        { title: 'BEST Website Revamp', type: 'UI/UX Design', deadline: 'Dec 20', status: 'In Progress' },
                      ].map((project) => (
                        <div key={project.title} className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between hover:bg-white/[0.06] transition-all group">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-400">
                              <Rocket size={20} />
                            </div>
                            <div>
                              <h4 className="text-sm font-bold group-hover:text-sky-400 transition-colors">{project.title}</h4>
                              <p className="text-white/30 text-[10px] font-medium uppercase tracking-wider mt-1">{project.type}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-[10px] font-bold text-white/60 mb-1 flex items-center gap-1.5 justify-end">
                              <Clock size={10} /> {project.deadline}
                            </div>
                            <div className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full font-bold">
                              {project.status}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mentorship / Networking */}
                  <div className="glass p-8 rounded-3xl border-white/5">
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-xl font-bold font-poppins">My Mentors</h3>
                      <button className="text-sky-400 text-xs font-bold hover:underline">Connect</button>
                    </div>
                    <div className="space-y-4">
                      {[
                        { name: 'Dr. Anish Kumar', role: 'Tech Evangelist', sessions: 4 },
                        { name: 'Sarah Chen', role: 'Startup Founder', sessions: 2 },
                      ].map((mentor) => (
                        <div key={mentor.name} className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between hover:bg-white/[0.06] transition-all">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-sky-500 flex items-center justify-center font-bold text-lg">
                              {mentor.name[0]}
                            </div>
                            <div>
                              <h4 className="text-sm font-bold">{mentor.name}</h4>
                              <p className="text-white/30 text-[10px] font-medium uppercase tracking-wider mt-1">{mentor.role}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-black text-white">{mentor.sessions}</div>
                            <div className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Sessions</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 p-4 rounded-2xl bg-sky-500/5 border border-sky-500/10 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <MessageSquare size={16} className="text-sky-400" />
                        <span className="text-xs font-medium text-white/60">Next Session: Tomorrow, 4 PM</span>
                      </div>
                      <ChevronRight size={14} className="text-white/20" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Other tabs would go here */}
            {activeTab !== 'overview' && (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-[60vh] flex flex-col items-center justify-center text-center space-y-6"
              >
                <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-white/10">
                  <Award size={40} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Component in Development</h3>
                  <p className="text-white/40 text-sm mt-2">The {activeTab} module is currently being finalized.</p>
                </div>
                <button 
                  onClick={() => setActiveTab('overview')}
                  className="btn-secondary px-6 py-2.5 text-sm"
                >
                  Back to Dashboard
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      <Footer />
    </div>
  );
}
