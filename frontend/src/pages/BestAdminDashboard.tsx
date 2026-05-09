import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, UserCheck, TrendingUp, Calendar, LayoutDashboard, 
  Search, Bell, Settings, Filter, Download, Plus, 
  MoreVertical, CheckCircle2, XCircle, ArrowUpRight, BarChart3,
  Rocket, Briefcase, GraduationCap, Award
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const RECRUITMENT_DATA = [
  { name: 'Trainee', count: 450 },
  { name: 'Associate', count: 180 },
  { name: 'Project Lead', count: 45 },
  { name: 'Domain Head', count: 12 },
];

const EVALUATION_DATA = [
  { name: 'Mon', score: 85 },
  { name: 'Tue', score: 72 },
  { name: 'Wed', score: 91 },
  { name: 'Thu', score: 68 },
  { name: 'Fri', score: 95 },
];

const COLORS = ['#0ea5e9', '#6366f1', '#a78bfa', '#f43f5e'];

export default function BestAdminDashboard() {
  const [activeTab, setActiveTab] = useState('recruitment');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#030712] text-white selection:bg-sky-500/30">
      <Navbar />
      
      <div className="pt-24 pb-12 flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 hidden lg:block border-r border-white/5 px-6 space-y-2 shrink-0 h-[calc(100vh-96px)] sticky top-24">
          <div className="py-4 text-xs font-bold text-white/30 uppercase tracking-widest px-4">Talent Board</div>
          {[
            { id: 'recruitment', label: 'Recruitment', icon: Users },
            { id: 'evaluations', label: 'Evaluations', icon: UserCheck },
            { id: 'internships', label: 'Internships', icon: Briefcase },
            { id: 'events', label: 'Events/Sessions', icon: Calendar },
            { id: 'leaderboard', label: 'Leaderboard', icon: Award },
            { id: 'analytics', label: 'Deep Insights', icon: BarChart3 },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === item.id 
                  ? 'bg-violet-500/10 text-violet-400 border border-violet-500/20' 
                  : 'text-white/50 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
          <div className="pt-4 mt-4 border-t border-white/5">
            <button 
              onClick={() => navigate('/ecell-dashboard')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-violet-400/70 hover:bg-violet-500/5 hover:text-violet-400 transition-all"
            >
              <LayoutDashboard size={18} /> Back to Portal
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 px-6 lg:px-10 overflow-hidden">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <h1 className="text-3xl font-black font-poppins mb-1">BEST <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-500">Board Admin</span></h1>
              <p className="text-white/40 text-sm">Managing the BVRIT Startup & Talent Ecosystem.</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 transition-colors text-sm font-bold shadow-lg shadow-violet-500/20">
                <Plus size={16} /> New Session
              </button>
              <button className="w-10 h-10 rounded-xl glass border border-white/5 flex items-center justify-center relative hover:bg-white/10 transition-all">
                <Bell size={20} className="text-white/60" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-violet-500 rounded-full border-2 border-[#030712]" />
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'recruitment' && (
              <motion.div
                key="recruitment"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: 'Total Applicants', value: '1,240', change: '+12%', icon: Users },
                    { label: 'Active Students', value: '382', change: '+5%', icon: UserCheck },
                    { label: 'Level Promotions', value: '24', change: 'This month', icon: TrendingUp },
                    { label: 'Startup Partners', value: '18', change: 'Active', icon: Rocket },
                  ].map((stat, i) => (
                    <div key={i} className="glass p-6 rounded-3xl border-white/5 relative overflow-hidden group">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400">
                          <stat.icon size={20} />
                        </div>
                        <div className="text-[10px] font-bold text-emerald-400">{stat.change}</div>
                      </div>
                      <div className="text-2xl font-black mb-1">{stat.value}</div>
                      <div className="text-xs text-white/40">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Pipeline Chart */}
                  <div className="lg:col-span-2 glass p-8 rounded-3xl border-white/5">
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-xl font-bold font-poppins">Talent Pipeline</h3>
                      <button className="text-violet-400 text-xs font-bold flex items-center gap-1">
                        <Download size={14} /> Report
                      </button>
                    </div>
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={RECRUITMENT_DATA}>
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
                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                          />
                          <Bar dataKey="count" fill="#6366f1" radius={[8, 8, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Distribution */}
                  <div className="glass p-8 rounded-3xl border-white/5">
                    <h3 className="text-xl font-bold font-poppins mb-8">Role Distribution</h3>
                    <div className="h-[240px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={RECRUITMENT_DATA}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="count"
                          >
                            {RECRUITMENT_DATA.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-4 space-y-3">
                      {RECRUITMENT_DATA.map((item, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                            <span className="text-xs text-white/60">{item.name}</span>
                          </div>
                          <span className="text-xs font-bold">{item.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Student Management Table */}
                <div className="glass rounded-3xl border-white/5 overflow-hidden">
                  <div className="p-8 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h3 className="text-xl font-bold font-poppins">Student Evaluation</h3>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                        <input 
                          type="text" 
                          placeholder="Search students..." 
                          className="bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs outline-none focus:border-violet-500/50 transition-all w-64"
                        />
                      </div>
                      <button className="p-2 rounded-xl glass border border-white/5 text-white/40 hover:text-white transition-all">
                        <Filter size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="text-[10px] font-bold text-white/30 uppercase tracking-widest border-b border-white/5">
                          <th className="px-8 py-5">Student</th>
                          <th className="px-8 py-5">Level</th>
                          <th className="px-8 py-5">Performance</th>
                          <th className="px-8 py-5">Status</th>
                          <th className="px-8 py-5">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {[
                          { name: 'Arjun Reddy', role: 'Associate', score: 88, status: 'Promotion Ready', email: 'arjun@gmail.com' },
                          { name: 'Priya Sharma', role: 'Trainee', score: 92, status: 'Active', email: 'priya@gmail.com' },
                          { name: 'Karthik V', role: 'Project Lead', score: 76, status: 'Pending Review', email: 'karthik@gmail.com' },
                          { name: 'Sneha Rao', role: 'Associate', score: 45, status: 'At Risk', email: 'sneha@gmail.com' },
                        ].map((student, i) => (
                          <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                            <td className="px-8 py-6">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center font-bold text-sm">
                                  {student.name[0]}
                                </div>
                                <div>
                                  <div className="text-sm font-bold group-hover:text-violet-400 transition-colors">{student.name}</div>
                                  <div className="text-[10px] text-white/30">{student.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-8 py-6">
                              <span className="text-xs font-medium text-white/60">{student.role}</span>
                            </td>
                            <td className="px-8 py-6">
                              <div className="flex items-center gap-3">
                                <div className="flex-1 bg-white/5 h-1 rounded-full max-w-[100px] overflow-hidden">
                                  <div 
                                    className={`h-full rounded-full ${student.score > 80 ? 'bg-emerald-500' : student.score > 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                                    style={{ width: `${student.score}%` }}
                                  />
                                </div>
                                <span className="text-xs font-bold">{student.score}%</span>
                              </div>
                            </td>
                            <td className="px-8 py-6">
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                student.status === 'Promotion Ready' 
                                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                  : student.status === 'Active'
                                    ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                                    : student.status === 'At Risk'
                                      ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                              }`}>
                                {student.status}
                              </span>
                            </td>
                            <td className="px-8 py-6">
                              <button className="p-2 rounded-xl hover:bg-white/5 text-white/20 hover:text-white transition-all">
                                <MoreVertical size={18} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab !== 'recruitment' && (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-[60vh] flex flex-col items-center justify-center text-center space-y-6"
              >
                <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-white/10">
                  <BarChart3 size={40} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Admin Module in Development</h3>
                  <p className="text-white/40 text-sm mt-2">The {activeTab} control panel is currently being finalized.</p>
                </div>
                <button 
                  onClick={() => setActiveTab('recruitment')}
                  className="btn-secondary px-6 py-2.5 text-sm border-violet-500/30 hover:bg-violet-500/10"
                >
                  Back to Overview
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
