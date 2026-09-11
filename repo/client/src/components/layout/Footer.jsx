import { Link } from 'react-router-dom';
import arinoxLogo from '../../assets/img.png';
import { nav, company } from '../../data/site';

const Footer = () => (
  <footer className="band-ink">
    <div className="container-wide pt-14 pb-8">

      {/* Top row */}
      <div className="grid md:grid-cols-12 gap-10 pb-10 border-b border-white/10">
        <div className="md:col-span-5">
          <Link to="/" className="inline-block mb-4">
            <img src={arinoxLogo} alt="Arinox AI" className="h-7 w-auto object-contain" />
          </Link>
          <p className="text-sm text-white/70 leading-relaxed max-w-sm">
            {company.tagline} We help enterprises implement private AI on their own
            infrastructure &mdash; through CommandCore and the KOGO agentic layer.
          </p>
          <div className="flex items-center gap-2 mt-5 text-[11px] text-white/50">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-primary" />
            Recognised by Startup India (DPIIT)
          </div>
        </div>

        <div className="md:col-span-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/40 mb-4" style={{ fontFamily: 'Manrope' }}>Navigate</p>
          <nav className="grid grid-cols-2 gap-x-6 gap-y-2.5" aria-label="Footer">
            {nav.map(({ label, to }) => (
              <Link key={to} to={to} className="text-sm text-white/70 hover:text-white transition-colors">
                {label}
              </Link>
            ))}
            <Link to="/privacy" className="text-sm text-white/70 hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="text-sm text-white/70 hover:text-white transition-colors">Terms</Link>
          </nav>
        </div>

        <div className="md:col-span-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/40 mb-4" style={{ fontFamily: 'Manrope' }}>Reach us</p>
          <a href={`mailto:${company.email}`} className="block text-sm text-white/70 hover:text-white transition-colors mb-2">
            {company.email}
          </a>
          <a href={company.linkedin} target="_blank" rel="noopener noreferrer" className="block text-sm text-white/70 hover:text-white transition-colors mb-4">
            LinkedIn
          </a>
          <p className="text-sm text-white/70">Bengaluru · New Delhi</p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-white/40">
        <p>&copy; {new Date().getFullYear()} {company.entity} · All rights reserved.</p>
        <p>Built in India</p>
      </div>
    </div>
  </footer>
);

export default Footer;
