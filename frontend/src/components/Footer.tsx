import { Link } from 'react-router-dom';
import { Linkedin, Instagram } from 'lucide-react';

const navLinks = [
  { name: 'About',       href: '/about' },
  { name: 'Initiatives', href: '/initiatives' },
  { name: 'Gallery',     href: '/gallery' },
  { name: 'Team',        href: '/team' },
  { name: 'Join Us',     href: '/join' },
];

const socials = [
  { icon: Linkedin,  href: 'https://www.linkedin.com/in/e-cell-bvrit-691906202/' },
  { icon: Instagram, href: 'https://www.instagram.com/ecell_bvrit/' },
];

export default function Footer() {
  return (
    <footer className="relative py-6 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-sky-500/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#060f1e]/60 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src="/E-Cell_Logo.png" alt="E-Cell Logo" className="w-8 h-8 object-contain" />
          <span className="text-white font-bold text-lg tracking-wider font-poppins">
            E-<span className="text-sky-400">Cell</span>
          </span>
        </Link>

        {/* Nav Links */}
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-white/40 hover:text-sky-400 text-sm transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right: Socials + Copyright */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="flex gap-2">
            {socials.map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 glass rounded-xl border border-white/5 hover:border-sky-500/30 flex items-center justify-center transition-all duration-300 group hover:shadow-[0_0_15px_rgba(14,165,233,0.2)]"
              >
                <s.icon size={15} className="text-white/40 group-hover:text-sky-400 transition-colors duration-300" />
              </a>
            ))}
          </div>
          <span className="text-white/30 text-sm">
            © {new Date().getFullYear()} E-Cell
          </span>
        </div>

      </div>
    </footer>
  );
}
