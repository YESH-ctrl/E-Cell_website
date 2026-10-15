import { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  Calendar,
  Share2,
  Bookmark,
  Check,
  Download,
  Sparkles,
  ArrowRight,
  ThumbsUp,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GlobalBackground from '../components/GlobalBackground';
import { BLOGS_DATA } from '../data/blogsData';

function formatMarkdownText(text: string) {
  const parts: (string | JSX.Element)[] = [];
  const regex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const [_, linkText, url] = match;
    parts.push(
      <a
        key={match.index}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sky-400 font-semibold underline underline-offset-4 hover:text-sky-300 transition-colors inline-flex items-center gap-1"
      >
        {linkText}
      </a>
    );
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likes, setLikes] = useState(42);
  const [hasLiked, setHasLiked] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Find post by slug or id
  const post = useMemo(() => {
    return BLOGS_DATA.find((p) => p.slug === slug || p.id === slug);
  }, [slug]);

  // Related posts
  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return BLOGS_DATA.filter((p) => p.id !== post.id).slice(0, 3);
  }, [post]);

  // Reading progress tracker
  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [slug]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleLike = () => {
    if (!hasLiked) {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
    } else {
      setLikes((prev) => prev - 1);
      setHasLiked(false);
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-[#030712] text-white flex flex-col justify-between">
        <GlobalBackground />
        <Navbar />
        <div className="py-40 text-center px-6 relative z-10">
          <h2 className="text-3xl font-black mb-4">Article Not Found</h2>
          <p className="text-white/60 mb-6">
            The resource you are looking for doesn't exist or has moved.
          </p>
          <Link to="/resources" className="btn-primary text-sm px-6 py-3">
            Back to All Resources
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] text-white selection:bg-sky-500/30 selection:text-sky-200 relative">
      <GlobalBackground />
      <Navbar />

      {/* Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-sky-400 via-indigo-500 to-sky-400 z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      <main className="pt-28 pb-20 px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">

          {/* Navigation Bar / Breadcrumb */}
          <div className="flex items-center justify-between gap-4 mb-8 pt-4">
            <Link
              to="/resources"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/60 hover:text-sky-400 transition-colors group"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              Back to Resources
            </Link>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="glass px-3 py-1.5 rounded-lg border border-white/10 text-xs font-medium text-white/70 hover:text-white flex items-center gap-1.5 transition-colors"
                title="Share link"
              >
                {copied ? (
                  <>
                    <Check size={13} className="text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 size={13} />
                    <span>Share</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setBookmarked(!bookmarked)}
                className={`glass w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center transition-colors ${
                  bookmarked ? 'text-sky-400' : 'text-white/70 hover:text-white'
                }`}
                title="Bookmark article"
              >
                <Bookmark size={14} className={bookmarked ? 'fill-sky-400' : ''} />
              </button>
            </div>
          </div>

          {/* Article Header */}
          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-500/20 text-sky-400 border border-sky-500/30">
                {post.category}
              </span>
              <div className="flex items-center gap-2 text-xs text-white/50">
                <span className="flex items-center gap-1">
                  <Clock size={13} className="text-sky-400" />
                  {post.readTime}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar size={13} />
                  {post.date}
                </span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-poppins text-white leading-tight mb-6">
              {post.title}
            </h1>

            <p className="text-lg sm:text-xl text-white/70 leading-relaxed font-normal mb-8">
              {post.subtitle}
            </p>

            {/* Author info pill */}
            <div className="flex items-center gap-4 py-4 px-5 rounded-2xl glass border border-white/5">
              <div className="flex-1">
                <p className="text-sm font-bold text-white">{post.author.name}</p>
                {post.author.role && (
                  <p className="text-xs text-white/50">{post.author.role}</p>
                )}
              </div>
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                  hasLiked
                    ? 'bg-sky-500/20 border-sky-500/40 text-sky-400 shadow-[0_0_15px_rgba(14,165,233,0.3)]'
                    : 'bg-white/5 border-white/10 text-white/70 hover:text-white'
                }`}
              >
                <ThumbsUp size={14} className={hasLiked ? 'fill-sky-400' : ''} />
                <span>{likes}</span>
              </button>
            </div>
          </header>

          {/* Article Cover Image */}
          <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-12 glass border border-white/10 shadow-2xl">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/50 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Key Takeaways Box */}
          {post.takeaways && post.takeaways.length > 0 && (
            <div className="glass rounded-2xl p-6 sm:p-8 border border-sky-500/30 bg-sky-500/[0.04] mb-12 relative overflow-hidden">
              <div className="flex items-center gap-2 text-sky-400 font-bold text-sm tracking-wide uppercase mb-4">
                <Sparkles size={16} />
                <span>Executive Summary & Key Takeaways</span>
              </div>
              <ul className="space-y-3">
                {post.takeaways.map((takeaway, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-white/80 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2.5 shrink-0 shadow-[0_0_8px_#38bdf8]" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Main Article Body */}
          <article className="space-y-12 text-white/80 text-base sm:text-lg leading-relaxed mb-16">
            {post.content.map((sec, i) => (
              <section key={i} className="space-y-5">
                <h2 className="text-2xl sm:text-3xl font-bold font-poppins text-white tracking-tight border-b border-white/5 pb-3">
                  {sec.heading}
                </h2>

                {sec.body.map((para, pIdx) => (
                  <p key={pIdx} className="text-white/75 leading-relaxed">
                    {formatMarkdownText(para)}
                  </p>
                ))}

                {sec.quote && (
                  <blockquote className="my-6 p-6 rounded-2xl glass border-l-4 border-sky-400 bg-white/[0.02] text-white/90 italic font-medium text-base sm:text-lg">
                    "{formatMarkdownText(sec.quote)}"
                  </blockquote>
                )}

                {sec.bulletPoints && (
                  <div className="my-4 pl-2 space-y-2.5">
                    {sec.bulletPoints.map((bp, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-3 text-sm sm:text-base text-white/75">
                        <span className="text-sky-400 font-bold">•</span>
                        <span>{formatMarkdownText(bp)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </article>

          {/* Downloadable Toolkits for this article */}
          {post.toolkitResources && post.toolkitResources.length > 0 && (
            <div className="glass rounded-3xl p-6 sm:p-8 border border-indigo-500/30 mb-16 bg-gradient-to-br from-indigo-500/[0.07] to-transparent">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm uppercase mb-3">
                <Download size={16} />
                <span>Companion Founder Downloads</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-poppins text-white mb-6">
                Templates Mentioned in This Playbook
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {post.toolkitResources.map((res, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl glass border border-white/10 flex items-center justify-between gap-4"
                  >
                    <div>
                      <p className="text-sm font-semibold text-white leading-snug">{res.title}</p>
                      <p className="text-xs text-white/40">{res.type} • {res.size}</p>
                    </div>
                    <button
                      onClick={() => alert(`Downloaded: ${res.title}`)}
                      className="p-2.5 rounded-lg bg-indigo-500/20 hover:bg-indigo-600 text-indigo-300 hover:text-white transition-colors"
                      title="Download resource"
                    >
                      <Download size={15} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 pb-12 mb-12 border-b border-white/10">
            <span className="text-xs font-semibold text-white/40 uppercase mr-2">Tags:</span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-medium glass border border-white/10 text-white/70"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold font-poppins text-white">
                  Continue Reading
                </h3>
                <Link
                  to="/resources"
                  className="text-xs sm:text-sm font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1"
                >
                  View all resources
                  <ArrowRight size={14} />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedPosts.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => navigate(`/resources/${rel.slug}`)}
                    className="glass rounded-2xl border border-white/5 overflow-hidden cursor-pointer group hover:border-sky-500/30 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="aspect-[16/10] overflow-hidden bg-black/50">
                        <img
                          src={rel.coverImage}
                          alt={rel.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4">
                        <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider block mb-1">
                          {rel.category}
                        </span>
                        <h4 className="text-sm font-bold text-white group-hover:text-sky-400 transition-colors line-clamp-2 leading-snug">
                          {rel.title}
                        </h4>
                      </div>
                    </div>
                    <div className="p-4 pt-0 text-[11px] text-white/40 flex items-center gap-2">
                      <Clock size={11} className="text-sky-400" />
                      <span>{rel.readTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
