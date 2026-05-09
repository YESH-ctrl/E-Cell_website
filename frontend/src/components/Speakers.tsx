import { motion } from 'framer-motion';
import { Linkedin, Mic2, Star } from 'lucide-react';
import CircularGallery from './CircularGallery/CircularGallery';

const SPEAKERS = [
  {
    name: 'Manasi Choudhari',
    role: 'Founder - Pink Legal',
    image: '/speakers/manasi_choudhari.jpg',
    topic: 'Legal Aspects of Startups',
    year: '2026',
    linkedin: 'https://www.linkedin.com/in/advmanasi/',
  },
  {
    name: 'Koushik Chitrapu',
    role: 'Founder - Incubez OTT ',
    image: '/speakers/koushik_chitrapu.jpg',
    topic: 'Building Sustainable Startups',
    year: '2025',
    linkedin: 'https://www.linkedin.com/in/koushik-chitrapu/',
  },
  {
    name: 'Dr. M.K. Kaushik',
    role: 'CEO - Vishnu Foundation TBI & Narico Naturals',
    image: '/speakers/dr_mk_kaushik.jpg',
    topic: 'The Journey of a Healthcare Entrepreneur',
    year: '2025',
    linkedin: 'https://www.linkedin.com/in/dr-m-k-kaushik-a6580b33/',
  },
  {
    name: 'Shivam Gupta',
    role: 'CEO - The Affordable Organic Store',
    image: '/speakers/shivam_gupta.jpg',
    topic: 'Starups and Sustainability',
    year: '2025',
    linkedin: 'https://www.linkedin.com/in/shivamgupta111/',
  },
  {
    name: 'Karthik Reddy ',
    role: 'Co-Founder, Tikaana Coliving',
    image: '/speakers/karthik_reddy.jpg',
    topic: 'Campus to Commerce',
    year: '2025',
    linkedin: 'https://www.linkedin.com/in/karthik-reddy-9056622/',
  },
  {
    name: 'Sahil Raj Suman ',
    role: 'Communications Lead - TGIC',
    image: '/speakers/sahil_raj_suman.jpg',
    topic: 'How To Build A Successful Startup',
    year: '2025',
    linkedin: 'https://www.linkedin.com/in/digitalsahilsuman/',
  },
];

export default function Speakers() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-sky-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-sky-400 font-bold tracking-widest text-xs uppercase mb-3"
            >
              <Mic2 size={14} />
              Voices of Innovation
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black text-white leading-tight font-poppins"
            >
              Our Stellar <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">Past Speakers</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/40 text-sm md:text-base max-w-sm"
          >
            Bringing industry leaders and visionary entrepreneurs to share their journey and insights with our community.
          </motion.p>
        </div>

        <div className="h-[600px] relative">
          <CircularGallery 
            items={SPEAKERS.map(s => ({ image: s.image, text: s.name }))}
            bend={3}
            textColor="#ffffff"
            borderRadius={0.05}
            scrollEase={0.02}
          />
        </div>

        {/* Bottom CTA or Metric */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-20 flex justify-center"
        >
          <div className="glass px-8 py-4 rounded-2xl border border-white/5 flex items-center gap-8">
            <div className="text-center">
              <div className="text-2xl font-black text-white">5+</div>
              <div className="text-[10px] text-white/30 uppercase tracking-widest">Industry Leaders</div>
            </div>
            <div className="w-px h-8 bg-white/5" />
            <div className="text-center">
              <div className="text-2xl font-black text-white">10+</div>
              <div className="text-[10px] text-white/30 uppercase tracking-widest">Inspirational Hours</div>
            </div>
            <div className="w-px h-8 bg-white/5" />
            <div className="text-center">
              <div className="text-2xl font-black text-white">1000+</div>
              <div className="text-[10px] text-white/30 uppercase tracking-widest">Inspired Students</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
