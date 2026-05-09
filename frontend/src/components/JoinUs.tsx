import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Code2, Palette, Megaphone, Brain, Camera, BookOpen, ChevronRight, CheckCircle, UserPlus } from 'lucide-react';
import { staggerContainer, fadeInUp } from '../animations/variants';

const roles = [
  { id: 'tech', icon: Code2, title: 'Tech & Dev', desc: 'Build products, manage platforms, and lead technical initiatives.', color: '#0ea5e9' },
  { id: 'design', icon: Palette, title: 'Design', desc: 'Create stunning visuals, UI/UX, and brand identity.', color: '#f59e0b' },
  { id: 'marketing', icon: Megaphone, title: 'Marketing', desc: 'Drive outreach, manage social media, and grow our brand.', color: '#10b981' },
  { id: 'content', icon: BookOpen, title: 'Content', desc: 'Write blogs, create videos, and tell our story.', color: '#8b5cf6' },
  { id: 'media', icon: Camera, title: 'Media', desc: 'Photography, videography, and event documentation.', color: '#ef4444' },
  { id: 'ops', icon: Brain, title: 'Operations', desc: 'Event management, logistics, and strategic planning.', color: '#06b6d4' },
];

export default function JoinUs() {
  const [selected, setSelected] = useState<string[]>([]);
  const [form, setForm] = useState({ name: '', email: '', rollNumber: '', year: '', college: '', why: '' });
  const [resume, setResume] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const toggleRole = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selected.length === 0) return;
    setLoading(true);
    setError('');

    try {
      // Map frontend fields to backend model
      const applicationData = {
        fullName: form.name,
        email: form.email,
        rollNumber: form.rollNumber,
        department: form.college,
        year: form.year,
        reason: `${form.why}\n\nSelected Domains: ${selected.join(', ')}`,
      };

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:5000'}/api/applications`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(applicationData),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to submit application');
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="join" className="section-padding relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#060f1e]/40 to-[#030712]" />
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-radial from-sky-900/10 via-transparent to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-sky-500/20 text-sky-400 text-sm font-medium mb-6">
            <UserPlus size={14} /> Applications Open
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-black font-poppins mb-6">
            <span className="text-white">Join the </span>
            <span className="gradient-text">Movement</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-white/50 max-w-2xl mx-auto">
            Be part of a community that's redefining what's possible for student entrepreneurs. Applications are open for the 2025 cohort.
          </motion.p>
        </motion.div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="glass rounded-3xl p-12 text-center border border-sky-500/20 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-transparent" />
              <div className="relative z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.6, type: 'spring', stiffness: 200 }}
                  className="w-24 h-24 rounded-full bg-gradient-to-br from-sky-500/20 to-sky-700/20 border border-sky-500/30 flex items-center justify-center mx-auto mb-8 animate-pulse-glow"
                >
                  <CheckCircle size={44} className="text-sky-400" />
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-3xl font-black text-white font-poppins mb-4"
                >
                  Application Submitted!
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-white/50 text-lg mb-6 max-w-lg mx-auto"
                >
                  Welcome to the E-Cell community, <span className="text-sky-400 font-semibold">{form.name}</span>! Our team will review your application and reach out within 5-7 business days.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-wrap gap-2 justify-center mb-8"
                >
                  {selected.map((id) => {
                    const role = roles.find((r) => r.id === id);
                    return role ? (
                      <span key={id} className="px-3 py-1.5 rounded-full glass border border-sky-500/30 text-sky-400 text-sm flex items-center gap-1.5">
                        <role.icon size={13} />
                        {role.title}
                      </span>
                    ) : null;
                  })}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="flex gap-2 justify-center flex-wrap"
                >
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + i * 0.05, type: 'spring' }}
                      className="text-xl"
                    >
                      {['🎉', '🚀', '💡', '⚡', '🌟', '🔥'][i]}
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="glass rounded-3xl p-8 md:p-10 border border-white/5 space-y-8"
            >
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl">
                  {error}
                </div>
              )}
              <div>
                <h3 className="text-lg font-bold text-white font-poppins mb-6 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400 text-sm font-bold">1</span>
                  Choose Your Domain
                  {selected.length === 0 && <span className="text-xs text-red-400/70 font-normal ml-2">(Select at least one)</span>}
                </h3>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {roles.map((role) => (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => toggleRole(role.id)}
                      className={`relative p-4 rounded-xl text-left transition-all duration-300 border group ${
                        selected.includes(role.id)
                          ? 'border-sky-500/50 bg-sky-500/10'
                          : 'border-white/5 hover:border-white/20 bg-white/3 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <role.icon size={20} style={{ color: selected.includes(role.id) ? role.color : 'rgba(255,255,255,0.4)' }} />
                        {selected.includes(role.id) && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300 }}>
                            <CheckCircle size={16} className="text-sky-400" />
                          </motion.div>
                        )}
                      </div>
                      <div className={`font-semibold text-sm mb-1 transition-colors duration-300 ${selected.includes(role.id) ? 'text-white' : 'text-white/70'}`}>
                        {role.title}
                      </div>
                      <div className="text-white/40 text-xs leading-relaxed">{role.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white font-poppins mb-6 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400 text-sm font-bold">2</span>
                  Your Details
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-white/40 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Jane Smith"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-sky-500/50 transition-all duration-300 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/40 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="jane@college.edu"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-sky-500/50 transition-all duration-300 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/40 mb-2">Roll Number *</label>
                    <input
                      type="text"
                      name="rollNumber"
                      value={form.rollNumber}
                      onChange={handleChange}
                      required
                      placeholder="e.g. 21211A05XX"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-sky-500/50 transition-all duration-300 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/40 mb-2">Year of Study *</label>
                    <select
                      name="year"
                      value={form.year}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-sky-500/50 transition-all duration-300 text-sm appearance-none"
                      style={{ background: 'rgba(255,255,255,0.05)', color: form.year ? 'white' : 'rgba(255,255,255,0.2)' }}
                    >
                      <option value="" disabled style={{ background: '#030712' }}>Select year</option>
                      {['1st Year', '2nd Year', '3rd Year', '4th Year', 'Post Graduate'].map((y) => (
                        <option key={y} value={y} style={{ background: '#030712' }}>{y}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-white/40 mb-2">Branch / Department</label>
                    <input
                      type="text"
                      name="college"
                      value={form.college}
                      onChange={handleChange}
                      placeholder="Computer Science, MBA, etc."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-sky-500/50 transition-all duration-300 text-sm"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm text-white/40 mb-2">Upload Resume (PDF/DOC) *</label>
                  <div className="relative group">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      required
                      onChange={(e) => setResume(e.target.files?.[0] || null)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 flex items-center justify-between group-hover:border-sky-500/30 transition-all duration-300">
                      <span className="text-sm text-white/30 truncate max-w-[80%]">
                        {resume ? resume.name : 'Drag & drop or click to upload...'}
                      </span>
                      <div className="px-3 py-1.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold uppercase tracking-wider">
                        Browse
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm text-white/40 mb-2">Why do you want to join E-Cell? *</label>
                  <textarea
                    name="why"
                    value={form.why}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Tell us about your entrepreneurial spirit, ideas, and what you bring to the table..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-sky-500/50 transition-all duration-300 text-sm resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || selected.length === 0 || !resume}
                className={`btn-primary w-full flex items-center justify-center gap-2 py-4 ${selected.length === 0 || !resume ? 'opacity-50' : ''}`}
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Submitting Application...
                  </>
                ) : (
                  <>
                    Submit Application <ChevronRight size={18} />
                  </>
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
