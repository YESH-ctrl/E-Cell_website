import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap, Twitter, Linkedin, Instagram, Github, Heart } from 'lucide-react';

const links = [
  {
    category: 'Explore',
    items: [
      { name: 'About Us', href: '/#about' },
      { name: 'Initiatives', href: '/initiatives' },
      { name: 'Gallery', href: '/gallery' },
      { name: 'Team', href: '/team' },
    ]
  },
  {
    category: 'Events',
    items: [
      { name: 'E-Summit', href: '/initiatives' },
      { name: 'Emerge', href: '/initiatives' },
      { name: 'Pivot', href: '/initiatives' },
    ]
  },
  {
    category: 'Connect',
    items: [
      { name: 'Join Us', href: '/join' },
      { name: 'Contact', href: '/#contact' },
    ]
  },
];

const socials = [
  { icon: Linkedin, href: 'https://www.linkedin.com/in/e-cell-bvrit-691906202/' },
  { icon: Instagram, href: 'https://www.instagram.com/ecell_bvrit/' },
];

export default function Footer() {
  const handleScroll = (id: string) => {
    if (window.location.pathname === '/') {
      document.getElementById(id.toLowerCase().replace(/\s+/g, '-'))?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative pt-20 pb-8 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-sky-500/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#060f1e]/60 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <img src="/E-Cell_Logo.png" alt="E-Cell Logo" className="w-12 h-12 object-contain" />
              <span className="text-white font-bold text-xl tracking-wider font-poppins">
                E-<span className="text-sky-400">Cell</span>
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-sm">
              Empowering the next generation of entrepreneurs through innovation, mentorship, and community.
            </p>
            <div className="flex gap-3">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 glass rounded-xl border border-white/5 hover:border-sky-500/30 flex items-center justify-center transition-all duration-300 group hover:shadow-[0_0_15px_rgba(14,165,233,0.2)]"
                >
                  <s.icon size={16} className="text-white/40 group-hover:text-sky-400 transition-colors duration-300" />
                </a>
              ))}
            </div>
          </div>

          {links.map((group) => (
            <div key={group.category}>
              <div className="text-white font-semibold mb-5 text-sm tracking-wider">{group.category}</div>
              <ul className="space-y-3">
                {group.items.map((item) => (
                  <li key={item.name}>
                    {item.href.startsWith('/#') ? (
                      <a
                        href={item.href}
                        onClick={(e) => {
                          if (window.location.pathname === '/') {
                            e.preventDefault();
                            handleScroll(item.href.substring(2));
                          }
                        }}
                        className="text-white/40 hover:text-sky-400 text-sm transition-colors duration-300"
                      >
                        {item.name}
                      </a>
                    ) : (
                      <Link
                        to={item.href}
                        className="text-white/40 hover:text-sky-400 text-sm transition-colors duration-300"
                      >
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-white/30 text-sm">
            © {new Date().getFullYear()} E-Cell. All rights reserved.
          </div>
          <div className="flex items-center gap-1.5 text-white/30 text-sm">
            Built with <Heart size={12} className="text-sky-400 fill-sky-400" /> by E-Cell Tech Team
          </div>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Use'].map((item) => (
              <a key={item} href="#" className="text-white/30 hover:text-white/60 text-xs transition-colors duration-300">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
