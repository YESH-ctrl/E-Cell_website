import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, GraduationCap, Github, Linkedin, Mail } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const currentTeam = [
  { name: 'Rishi Srii Reddy. D', role: 'President', dept: 'CS Engineering', img: '/team/rishi_srii_reddy.jpg', linkedin: 'https://linkedin.com', email: 'rishi@gmail.com' },
  { name: 'Sathya', role: 'Vice President', dept: 'CS Engineering(Business Systems)', img: '/team/sathya.jpg', linkedin: 'https://linkedin.com', email: 'sathya@gmail.com' },
  { name: 'Varshith Vuppala', role: 'Documentation Head', dept: 'CS Engineering(AI/ML)', img: '/team/varshith_vuppala.jpg', linkedin: 'https://linkedin.com', email: 'varshith@gmail.com' },
  { name: 'Vahini Bolloji ', role: 'Design Head', dept: 'CS Engineering(AI/ML)', img: '/team/vahini_bolloji.jpg', linkedin: 'https://linkedin.com', email: 'vahini@gmail.com' },
  { name: 'Siddhartha Vasireddy', role: 'Events Head', dept: 'Electronics & Communication Engineering', img: '/team/s_vasireddy.JPG', linkedin: 'https://linkedin.com', email: 'siddhartha@gmail.com' },
  { name: 'G.Rukmangdhar', role: 'Logistics Head', dept: 'Electronics & Communication Engineering', img: '/team/g_rukmangdhar.jpg', linkedin: 'https://linkedin.com', email: 'rukmangdhar@gmail.com' },
  { name: 'Dasari Yeswanth ', role: 'Public Relations Head', dept: 'AI & DS ', img: '/team/dasari_yeswanth.jpg', linkedin: 'https://linkedin.com', email: 'yeswanth@gmail.com' },
  { name: 'Shritha Reddy', role: 'Graphic Designer', dept: 'CS Engineering(AI/ML)', img: '/team/shritha_reddy.jpg', linkedin: 'https://linkedin.com', email: 'shritha@gmail.com' },
  { name: 'Hemanth Reddy Solipeta', role: 'Logistics Team', dept: 'CS Engineering', img: '/team/h_reddy_solipeta.jpg', linkedin: 'https://linkedin.com', email: 'hemanth@gmail.com' },
  { name: 'Bathini Hemasree', role: 'Design Team', dept: 'AI & DS ', img: '/team/b_hemasree.jpg', linkedin: 'https://linkedin.com', email: 'hemasree@gmail.com' },
  { name: 'M.Achsah Gideon ', role: 'Design Team ', dept: 'CS Engineering(Business Systems)', img: '/team/m_achsah_gideon.jpg', linkedin: 'https://linkedin.com', email: 'achsah@gmail.com' },
  { name: 'N. Sri Nikhitha', role: 'Documentation Team', dept: 'CS Engineering(AI/ML)', img: '/team/n_sri_nikhitha.jpg', linkedin: 'https://linkedin.com', email: 'nikhitha@gmail.com' },
  { name: 'Gnana Keerthana', role: 'Design Team', dept: 'Biomedical Engineering', img: '/team/gnana_keerthana.jpg', linkedin: 'https://linkedin.com', email: 'keerthana@gmail.com' },
  { name: 'Mavuduru Venkata Bhargavi ', role: 'Documentation Team', dept: 'Electronics & Communication Engineering', img: '/team/m_venkata_bhargavi.jpg', linkedin: 'https://linkedin.com', email: 'bhargavi@gmail.com' },
  { name: 'Sumedh', role: 'Logistics Team ', dept: 'Mechanical Engineering', img: '/team/sumedh.jpg', linkedin: 'https://linkedin.com', email: 'sumedh@gmail.com' },
  { name: 'Pochigani Shyamsujith', role: 'Video Editor', dept: 'MBA', img: '/team/pochigani_shyamsujith.jpg', linkedin: 'https://linkedin.com', email: 'shyamsujith@gmail.com' },
  { name: 'Gadde Akshita', role: 'Documentation Team', dept: 'CS Engineering(Business Systems)', img: '/team/g_akshita.jpg', linkedin: 'https://linkedin.com', email: 'akshita@gmail.com' },
  { name: 'Lasya Katla', role: 'Tech Team ', dept: 'Biomedical Engineering', img: '/team/l_katla.jpg', linkedin: 'https://linkedin.com', email: 'lasya@gmail.com' },
  { name: 'Patlolla Bhavya Sri ', role: 'Design Team', dept: 'CS Engineering(Business Systems)', img: '/team/p_bhavya_sri.jpg', linkedin: 'https://linkedin.com', email: 'bhavya@gmail.com' },
  { name: 'Nissi Priya P', role: 'Marketing Team', dept: 'CS Engineering(Business Systems)', img: '/team/n_priya_p.JPG', linkedin: 'https://linkedin.com', email: 'nissi@gmail.com' },
  { name: 'Nikita Katroju', role: 'Design Team', dept: 'CS Engineering(AI/ML)', img: '/team/n_katroju.jpg', linkedin: 'https://linkedin.com', email: 'nikita@gmail.com' },
  { name: 'Gowtham ', role: 'Design Team', dept: 'MBA', img: '/team/g_gowtham.jpg', linkedin: 'https://linkedin.com', email: 'gowtham@gmail.com' },
  { name: 'Lahari Raaparthi ', role: 'Tech Team', dept: 'CS Engineering(AI/ML)', img: '/team/l_raaparthi.jpg', linkedin: 'https://linkedin.com', email: 'lahari@gmail.com' },
  { name: 'Sharan gaddam ', role: 'Video Editor', dept: 'CS Engineering(Business Systems)', img: '/team/s_gaddam.jpg', linkedin: 'https://linkedin.com', email: 'sharan@gmail.com' },
  { name: 'Hiranmayi Kasturi', role: 'Video Editor', dept: 'CS Engineering(Business Systems)', img: '/team/h_kasturi.jpg', linkedin: 'https://linkedin.com', email: 'hiranmayi@gmail.com' },
];

const alumni = [
  { name: 'Chennapragada Sathvik', role: 'Founder, OLynk-AI', batch: '2026', img: '/alumni/chennapragada_sathvik.jpg', linkedin: 'https://www.linkedin.com/in/chennapragada-sathvik/', email: 'sameer@gmail.com' },
  { name: 'Gowtham Varma', role: 'Former Neemans Intern', batch: '2026', img: '/alumni/goutham_varma.jpg', linkedin: 'https://www.linkedin.com/in/gowtham-varma-28b5b7334/', email: 'Varmagowtham2004@gmail.com' },
  { name: 'Marrapu Sri Priya', role: 'Former AlignX AI Intern', batch: '2026', img: '/alumni/marrapu_sripriya.jpg', linkedin: 'https://www.linkedin.com/in/marrapu-mohana-sripriya/', email: 'marrapusripriya3@gmail.com' },
  { name: 'Kachireddy Pavitranath Reddy', role: 'Founding President', batch: '2026', img: '/alumni/kachireddy_pavitranath_reddy.jpg', linkedin: 'https://www.linkedin.com/in/kachi-reddy-pavitranath-reddy-0ab56429b/', email: 'pavitranath@gmail.com' },
];

export default function TeamPage() {
  const [tab, setTab] = useState<'current' | 'alumni'>('current');

  return (
    <div className="min-h-screen bg-[#030712]">
      <Navbar />

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-sky-500/20 text-sky-400 text-sm font-medium mb-6"
            >
              <Users size={14} /> Our Community
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-black font-poppins text-white mb-6"
            >
              The <span className="gradient-text">Dream Team</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-white/50 max-w-2xl mx-auto"
            >
              Meet the passionate individuals who make E-Cell a thriving ecosystem for innovation.
            </motion.p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-16">
            <div className="glass p-1.5 rounded-2xl border border-white/5 flex gap-1">
              <button
                onClick={() => setTab('current')}
                className={`px-8 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${tab === 'current'
                  ? 'bg-sky-500 text-white shadow-[0_0_20px_rgba(14,165,233,0.4)]'
                  : 'text-white/40 hover:text-white/70'
                  }`}
              >
                <Users size={16} /> Current Team
              </button>
              <button
                onClick={() => setTab('alumni')}
                className={`px-8 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${tab === 'alumni'
                  ? 'bg-sky-500 text-white shadow-[0_0_20px_rgba(14,165,233,0.4)]'
                  : 'text-white/40 hover:text-white/70'
                  }`}
              >
                <GraduationCap size={16} /> Alumni
              </button>
            </div>
          </div>

          {/* Team Grid */}
          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="wait">
              {(tab === 'current' ? currentTeam : alumni).map((member, i) => (
                <motion.div
                  key={member.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="glass rounded-3xl overflow-hidden border border-white/5 group hover:border-sky-500/30 transition-all duration-500"
                >
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-80" />

                    {/* Socials Overlay */}
                    <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="flex gap-2">
                        <a
                          href={(member as any).linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center text-white/70 hover:text-sky-400 hover:border-sky-400/50 transition-all"
                        >
                          <Linkedin size={18} />
                        </a>
                        <a
                          href={`mailto:${(member as any).email}`}
                          className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center text-white/70 hover:text-sky-400 hover:border-sky-400/50 transition-all"
                        >
                          <Mail size={18} />
                        </a>
                      </div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-sky-400/60 bg-sky-400/10 px-2 py-1 rounded border border-sky-400/20 backdrop-blur-md">
                        {tab === 'current' ? (member as any).dept : `Batch ${(member as any).batch}`}
                      </div>
                    </div>
                  </div>

                  <div className="p-8">
                    <h3 className="text-xl font-bold text-white font-poppins mb-1 group-hover:text-sky-400 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-white/40 text-sm font-medium">
                      {member.role}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
