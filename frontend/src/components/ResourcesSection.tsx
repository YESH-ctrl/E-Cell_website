import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Clock, Sparkles } from 'lucide-react';
import { BLOGS_DATA } from '../data/blogsData';

export default function ResourcesSection() {
  const navigate = useNavigate();
  // Pick the top 3 featured / prominent blogs
  const previewPosts = BLOGS_DATA.slice(0, 3);

  return (
    <section id="resources" className="section-padding relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-sky-500/20 text-sky-400 text-xs font-semibold tracking-wider uppercase mb-4"
            >
              <Sparkles size={13} className="text-sky-400" />
              <span>Knowledge Hub</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-5xl font-black font-poppins text-white"
            >
              Latest from <span className="gradient-text">Our Blogs</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/60 text-sm sm:text-base mt-2 max-w-xl"
            >
              Actionable startup playbooks, fundraising guides, and technology
              insights crafted by student founders and mentors.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link
              to="/resources"
              className="btn-secondary text-sm px-5 py-2.5 inline-flex items-center gap-2 group"
            >
              <span>Explore All Resources</span>
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* 3 Featured Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {previewPosts.map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => navigate(`/resources/${post.slug}`)}
              className="glass rounded-3xl border border-white/10 overflow-hidden flex flex-col justify-between cursor-pointer group hover:border-sky-500/40 hover:shadow-[0_20px_50px_rgba(14,165,233,0.18)] transition-all duration-300"
            >
              <div>
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-75" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-[#030712]/80 backdrop-blur-md text-sky-400 border border-sky-500/30">
                    {post.category}
                  </span>
                </div>

                {/* Body */}
                <div className="p-6 sm:p-7">
                  <div className="flex items-center gap-2.5 text-xs text-white/50 mb-3">
                    <span className="flex items-center gap-1">
                      <Clock size={12} className="text-sky-400" />
                      {post.readTime}
                    </span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>

                  <h3 className="text-xl font-bold font-poppins text-white group-hover:text-sky-400 transition-colors leading-snug mb-3 line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-white/60 text-sm line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Author Footer */}
              <div className="px-6 sm:px-7 py-4 border-t border-white/5 bg-white/[0.01] flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white leading-tight">
                    {post.author.name}
                  </p>
                  {post.author.role && (
                    <p className="text-[10px] text-white/40">
                      {post.author.role}
                    </p>
                  )}
                </div>

                <span className="text-xs font-semibold text-sky-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read
                  <ArrowRight size={13} />
                </span>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}
