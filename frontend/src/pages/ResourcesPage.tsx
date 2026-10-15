import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  BookOpen,
  Clock,
  ArrowRight,
  Sparkles,
  Download,
  FileText,
  CheckCircle2,
  Flame,
  Bookmark,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GlobalBackground from '../components/GlobalBackground';
import { BLOGS_DATA, BLOG_CATEGORIES } from '../data/blogsData';

export default function ResourcesPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [savedPosts, setSavedPosts] = useState<Record<string, boolean>>({});
  const [downloadModal, setDownloadModal] = useState<string | null>(null);

  // Filter posts based on category and search
  const filteredPosts = useMemo(() => {
    return BLOGS_DATA.filter((post) => {
      const matchesCategory =
        selectedCategory === 'All' || post.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredPost = useMemo(() => {
    return BLOGS_DATA.find((p) => p.featured) || BLOGS_DATA[0];
  }, []);

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDownload = (title: string) => {
    setDownloadModal(title);
    setTimeout(() => {
      setDownloadModal(null);
    }, 2800);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white selection:bg-sky-500/30 selection:text-sky-200 relative">
      <GlobalBackground />
      <Navbar />

      <main className="pt-28 pb-20 px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">

          {/* ── Top Header & Hero ────────────────────────────────────────────── */}
          <div className="text-center max-w-4xl mx-auto mb-14 pt-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-sky-500/30 text-sky-400 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-6 shadow-[0_0_20px_rgba(14,165,233,0.2)]"
            >
              <Sparkles size={14} className="text-sky-400 animate-pulse" />
              <span>E-Cell Knowledge Hub & Playbooks</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl md:text-7xl font-black font-poppins tracking-tight mb-6"
            >
              Founder <span className="gradient-text">Resources & Blogs</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
            >
              Curated playbooks, deep-dive articles, founder toolkits, and
              battle-tested frameworks to take your startup idea from 0 to 1.
            </motion.p>

            {/* Quick Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-white/60"
            >
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/5">
                <BookOpen size={16} className="text-sky-400" />
                <span className="font-semibold text-white">6 Deep-Dive</span> Articles
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/5">
                <Download size={16} className="text-indigo-400" />
                <span className="font-semibold text-white">12+ Free</span> Founder Toolkits
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/5">
                <Flame size={16} className="text-amber-400" />
                <span className="font-semibold text-white">100% Student</span> Centered
              </div>
            </motion.div>
          </div>

          {/* ── Featured Article Spotlight ───────────────────────────────────── */}
          {featuredPost && selectedCategory === 'All' && searchQuery === '' && (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mb-16"
            >
              <div className="relative group rounded-3xl overflow-hidden glass border border-sky-500/30 p-1 md:p-2 bg-gradient-to-r from-sky-500/10 via-transparent to-indigo-500/10">
                <div className="rounded-[22px] overflow-hidden bg-[#070e1c]/90 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center p-6 md:p-10">
                  
                  {/* Image Column */}
                  <div className="lg:col-span-7 relative overflow-hidden rounded-2xl aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10]">
                    <img
                      src={featuredPost.coverImage}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-60" />
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-500/90 text-white shadow-lg backdrop-blur-md">
                        Featured Playbook
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/60 text-white/90 border border-white/10 backdrop-blur-md">
                        {featuredPost.category}
                      </span>
                    </div>
                  </div>

                  {/* Text Column */}
                  <div className="lg:col-span-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-4 text-xs font-medium text-white/50 mb-3">
                        <span className="flex items-center gap-1.5">
                          <Clock size={13} className="text-sky-400" />
                          {featuredPost.readTime}
                        </span>
                        <span>•</span>
                        <span>{featuredPost.date}</span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-black font-poppins text-white group-hover:text-sky-400 transition-colors leading-tight mb-4">
                        {featuredPost.title}
                      </h2>

                      <p className="text-white/70 text-sm sm:text-base leading-relaxed line-clamp-3 mb-6">
                        {featuredPost.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {featuredPost.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-md text-xs font-medium bg-white/5 text-sky-300 border border-white/5"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-white">
                          {featuredPost.author.name}
                        </p>
                        {featuredPost.author.role && (
                          <p className="text-xs text-white/50">
                            {featuredPost.author.role}
                          </p>
                        )}
                      </div>

                      <button
                        onClick={() => navigate(`/resources/${featuredPost.slug}`)}
                        className="btn-primary text-xs sm:text-sm px-4 py-2 sm:px-5 sm:py-2.5 flex items-center gap-2 group-hover:shadow-[0_0_25px_rgba(14,165,233,0.5)]"
                      >
                        Read Article
                        <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Search and Filter Controls ───────────────────────────────────── */}
          <div className="mb-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {BLOG_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                      isActive
                        ? 'bg-sky-500 text-white shadow-[0_0_20px_rgba(14,165,233,0.4)]'
                        : 'glass text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[260px] sm:min-w-[320px]">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40"
              />
              <input
                type="text"
                placeholder="Search blogs, tags, authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl glass border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all bg-white/[0.02]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/40 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* ── Post Grid ────────────────────────────────────────────────────── */}
          {filteredPosts.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
            >
              <AnimatePresence>
                {filteredPosts.map((post, idx) => (
                  <motion.article
                    key={post.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    onClick={() => navigate(`/resources/${post.slug}`)}
                    className="glass rounded-2xl border border-white/10 overflow-hidden flex flex-col justify-between cursor-pointer group hover:border-sky-500/40 hover:shadow-[0_15px_40px_rgba(14,165,233,0.15)] transition-all duration-300"
                  >
                    {/* Top: Image & Badge */}
                    <div>
                      <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-80" />

                        {/* Category Tag */}
                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#030712]/80 backdrop-blur-md text-sky-400 border border-sky-500/30">
                            {post.category}
                          </span>
                        </div>

                        {/* Bookmark Button */}
                        <button
                          onClick={(e) => toggleSave(post.id, e)}
                          title="Bookmark post"
                          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#030712]/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:text-sky-400 transition-colors"
                        >
                          <Bookmark
                            size={14}
                            className={savedPosts[post.id] ? 'fill-sky-400 text-sky-400' : ''}
                          />
                        </button>
                      </div>

                      {/* Content details */}
                      <div className="p-6">
                        <div className="flex items-center gap-3 text-xs text-white/50 mb-2.5">
                          <span className="flex items-center gap-1">
                            <Clock size={12} className="text-sky-400" />
                            {post.readTime}
                          </span>
                          <span>•</span>
                          <span>{post.date}</span>
                        </div>

                        <h3 className="text-xl font-bold font-poppins text-white group-hover:text-sky-400 transition-colors leading-snug mb-2 line-clamp-2">
                          {post.title}
                        </h3>

                        <p className="text-white/60 text-sm line-clamp-2 leading-relaxed mb-4">
                          {post.excerpt}
                        </p>

                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-[11px] px-2 py-0.5 rounded bg-white/[0.04] text-white/60 border border-white/5"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom: Author & Read Link */}
                    <div className="px-6 py-4 border-t border-white/5 bg-white/[0.01] flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-white">
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
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="text-center py-20 glass rounded-3xl border border-white/5 mb-20">
              <Search size={36} className="text-white/20 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No blogs found</h3>
              <p className="text-white/50 text-sm mb-6">
                We couldn't find any articles matching "{searchQuery}" under {selectedCategory}.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="btn-secondary text-xs px-5 py-2"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* ── Founder Toolkits & Downloadable Templates ─────────────────────── */}
          <div className="mt-16 mb-20">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-indigo-500/30 text-indigo-400 text-xs font-semibold mb-3">
                <FileText size={13} />
                <span>Zero-Cost Founder Assets</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black font-poppins text-white mb-4">
                Downloadable <span className="gradient-text">Founder Toolkits</span>
              </h2>
              <p className="text-white/60 text-sm sm:text-base">
                Grab open-source pitch decks, legal contracts, and financial models
                used by venture-backed student startups.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: 'YC Seed Pitch Deck Template',
                  desc: '10 battle-tested slides formatted in Figma & PowerPoint.',
                  type: 'Template',
                  format: 'Figma / PPT',
                  size: '4.8 MB',
                },
                {
                  title: 'Co-Founder Equity & Vesting Sheet',
                  desc: 'Standardized 4-year vesting schedule with 1-year cliff.',
                  type: 'Spreadsheet',
                  format: 'Google Sheet / Excel',
                  size: '850 KB',
                },
                {
                  title: 'DPIIT Startup India Checklist',
                  desc: 'Step-by-step documentation for recognition and tax holidays.',
                  type: 'Checklist',
                  format: 'PDF Guide',
                  size: '380 KB',
                },
                {
                  title: 'Investor Cold Outreach Scripts',
                  desc: '5 high-response cold emails to connect with angel investors.',
                  type: 'Guide',
                  format: 'Markdown / PDF',
                  size: '520 KB',
                },
              ].map((toolkit, i) => (
                <div
                  key={i}
                  className="glass rounded-2xl p-6 border border-white/5 hover:border-indigo-500/30 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
                      <FileText size={20} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 mb-1 block">
                      {toolkit.format}
                    </span>
                    <h4 className="text-base font-bold text-white mb-2 leading-snug">
                      {toolkit.title}
                    </h4>
                    <p className="text-white/50 text-xs leading-relaxed mb-6">
                      {toolkit.desc}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDownload(toolkit.title)}
                    className="w-full py-2.5 px-4 rounded-xl bg-white/[0.04] hover:bg-indigo-600 hover:text-white border border-white/10 text-white/80 text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-sm"
                  >
                    <Download size={14} />
                    Download Kit ({toolkit.size})
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* ── Newsletter / Contribute CTA ──────────────────────────────────── */}
          <div className="glass rounded-3xl p-8 sm:p-14 border border-white/10 relative overflow-hidden text-center bg-gradient-to-b from-sky-500/10 via-transparent to-transparent">
            <div className="relative z-10 max-w-2xl mx-auto">
              <h3 className="text-2xl sm:text-4xl font-black font-poppins text-white mb-4">
                Want to publish your startup story?
              </h3>
              <p className="text-white/60 text-sm sm:text-base mb-8">
                Are you building something exciting at BVRIT or across campuses?
                Write for the E-Cell knowledge hub and share your journey with
                thousands of students and angel investors.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => navigate('/team')}
                  className="btn-primary text-sm px-6 py-3 flex items-center gap-2"
                >
                  Connect with Editorial Team
                  <ArrowRight size={16} />
                </button>
                <Link
                  to="/initiatives"
                  className="btn-secondary text-sm px-6 py-3"
                >
                  Explore Initiatives
                </Link>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Download Confirmation Toast */}
      <AnimatePresence>
        {downloadModal && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-8 right-8 z-50 glass bg-[#030712]/95 border border-sky-500/40 px-5 py-4 rounded-2xl shadow-2xl flex items-center gap-3"
          >
            <CheckCircle2 size={20} className="text-sky-400 shrink-0" />
            <div>
              <p className="text-xs text-white/50">Downloading toolkit:</p>
              <p className="text-sm font-bold text-white">{downloadModal}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
