import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Quote, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { staggerContainer, fadeInUp } from '../animations/variants';

const testimonials = [
  {
    name: 'Sri K.V. Vishnu Raju',
    role: 'Chairman',
    message: 'Innovation and entrepreneurship are the cornerstones of progress. At BVRIT, we empower students to transform their ideas into impactful ventures.',
    img: '/faculty/chairman.jpg'
  },
  {
    name: 'Sri Ravichandran Rajagopal',
    role: 'Vice Chairman',
    message: 'Our goal is to create an ecosystem where creativity meets strategy, enabling our students to lead the startups of tomorrow.',
    img: '/faculty/vice_chairman.jpg'
  },
  {
    name: 'Sri Aditya Vissam',
    role: 'Secretary',
    message: 'E-Cell is not just a club; it is a movement. We are dedicated to providing the mentorship and resources needed for student success.',
    img: '/faculty/secretary.jpg'
  },
  {
    name: 'Sri K. Sai Sumant',
    role: 'Joint Secretary',
    message: 'Encouraging the spirit of enterprise among our youth is vital for a robust economy and a brighter future.',
    img: '/faculty/joint_secretary.jpg'
  },
  {
    name: 'Dr. K. Lakshmi Prasad',
    role: 'Director',
    message: 'Technical excellence combined with entrepreneurial thinking creates leaders who can solve global challenges.',
    img: '/faculty/director.jpg'
  },
  {
    name: 'Dr. Sanjay Dubey',
    role: 'Principal',
    message: 'BVRIT fosters an environment of curiosity and innovation. The E-Cell is a testament to our commitment to holistic development.',
    img: '/faculty/principal.jpg'
  },
  {
    name: 'A.L. Kishore',
    role: 'Faculty Lead',
    message: 'Guiding the young minds of E-Cell is a privilege. Their passion and drive for innovation are truly inspiring.',
    img: '/faculty/faculty_lead.jpg'
  }
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for right, -1 for left
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    const timer = setInterval(() => {
      nextTestimonial();
    }, 6000);
    return () => clearInterval(timer);
  }, [index]);

  const nextTestimonial = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[index];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95
    })
  };

  return (
    <section id="testimonials" className="section-padding relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#060f1e]/40 to-[#030712]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-sky-500/20 text-sky-400 text-sm font-medium mb-6">
            <MessageCircle size={14} /> Leadership Speak
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-black font-poppins mb-6">
            <span className="text-white">Our </span>
            <span className="gradient-text">Mentors & Visionaries</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-white/50 max-w-2xl mx-auto">
            Insights and encouragement from the leadership that shapes the E-Cell ecosystem.
          </motion.p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Main Slider Card */}
          <div className="relative h-[500px] md:h-[450px] lg:h-[400px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.4 },
                  scale: { duration: 0.4 }
                }}
                className="absolute inset-0"
              >
                <div className="glass rounded-[2rem] overflow-hidden border border-white/5 h-full flex flex-col md:flex-row group shadow-2xl">
                  {/* Left: Image */}
                  <div className="w-full md:w-2/5 h-48 md:h-full relative overflow-hidden shrink-0">
                    <img
                      src={current.img}
                      alt={current.name}
                      className="w-full h-full object-cover object-[center_20%] transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#030712]/40 hidden md:block" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/60 via-transparent to-transparent md:hidden" />
                  </div>

                  {/* Right: Content */}
                  <div className="flex-1 p-8 md:p-12 flex flex-col justify-center relative">
                    <div className="absolute top-8 right-8 text-sky-500/5 group-hover:text-sky-500/10 transition-colors pointer-events-none">
                      <Quote size={120} strokeWidth={1.5} />
                    </div>

                    <div className="relative z-10">
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-white/80 text-xl md:text-2xl italic leading-relaxed mb-8 font-poppins"
                      >
                        "{current.message}"
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <h4 className="text-white text-2xl font-bold font-poppins mb-1">{current.name}</h4>
                        <p className="text-sky-400 font-medium tracking-wide uppercase text-sm">{current.role}</p>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-12 px-4">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  className={`h-1.5 transition-all duration-500 rounded-full ${i === index ? 'w-8 bg-sky-500' : 'w-2 bg-white/10 hover:bg-white/20'
                    }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full glass border border-white/5 hover:border-sky-500/30 flex items-center justify-center text-white/50 hover:text-sky-400 transition-all duration-300"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full glass border border-white/5 hover:border-sky-500/30 flex items-center justify-center text-white/50 hover:text-sky-400 transition-all duration-300"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
