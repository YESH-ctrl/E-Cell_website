import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Images } from 'lucide-react';
import { staggerContainer, fadeInUp } from '../animations/variants';

const images = [
  { src: '/gallery/hacksprint_2024.JPG', caption: 'HackSprint 2024', span: 'col-span-2 row-span-2' },
  { src: '/gallery/founderclass_workshop.JPG', caption: 'FounderClass Workshop', span: '' },
  { src: '/gallery/team_collaboration.JPG', caption: 'Team Collaboration', span: '' },
  { src: '/gallery/e_summit_2024.JPG', caption: 'E-Summit 2024', span: '' },
  { src: '/gallery/launchpad_demo_day.JPG', caption: 'LaunchPad Demo Day', span: 'col-span-2' },
  { src: '/gallery/ideation_session.JPG', caption: 'Ideation Session', span: '' },
  { src: '/gallery/coding_marathon.JPG', caption: 'Coding Marathon', span: '' },
  { src: '/gallery/startup_pitch_night.JPG', caption: 'Startup Pitch Night', span: '' },
  { src: '/gallery/networking_event.JPG', caption: 'Networking Event', span: 'col-span-2' },
  { src: '/gallery/mentorconnect_session.JPG', caption: 'MentorConnect Session', span: '' },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setLightbox(null);
    if (e.key === 'ArrowRight' && lightbox !== null) setLightbox((lightbox + 1) % images.length);
    if (e.key === 'ArrowLeft' && lightbox !== null) setLightbox((lightbox - 1 + images.length) % images.length);
  };

  return (
    <section id="gallery" className="section-padding relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#060f1e]/40 to-[#030712]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-sky-500/20 text-sky-400 text-sm font-medium mb-6">
            <Images size={14} /> Memories
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-black font-poppins mb-6">
            <span className="text-white">Our </span>
            <span className="gradient-text">Gallery</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-white/50 max-w-2xl mx-auto">
            Moments of innovation, collaboration, and breakthrough that define our journey.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-3">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={`relative overflow-hidden rounded-xl group cursor-pointer ${img.span}`}
              onClick={() => setLightbox(i)}
            >
              <img
                src={img.src}
                alt={img.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="absolute inset-0 bg-sky-500/0 group-hover:bg-sky-500/10 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <div className="text-white text-sm font-medium">{img.caption}</div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100">
                <div className="w-12 h-12 rounded-full bg-sky-500/30 backdrop-blur-sm flex items-center justify-center border border-sky-400/40">
                  <ZoomIn size={20} className="text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9990] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
            onKeyDown={handleKey}
            tabIndex={0}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[lightbox].src}
                alt={images[lightbox].caption}
                className="w-full max-h-[80vh] object-contain rounded-2xl"
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 glass px-4 py-2 rounded-full text-white/80 text-sm">
                {images[lightbox].caption}
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-4 -right-4 w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-sky-400 transition-colors border border-white/10"
              >
                <X size={18} />
              </button>
              {lightbox > 0 && (
                <button
                  onClick={() => setLightbox(lightbox - 1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-sky-400 transition-colors border border-white/10"
                >
                  ‹
                </button>
              )}
              {lightbox < images.length - 1 && (
                <button
                  onClick={() => setLightbox(lightbox + 1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-sky-400 transition-colors border border-white/10"
                >
                  ›
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
