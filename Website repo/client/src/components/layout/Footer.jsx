import { Link } from 'react-router-dom';

const navLinks = [
  { label: 'About', to: '/' },
  { label: 'CommandCore', to: '/commandcore' },
  { label: 'Solutions', to: '/solutions' },
  { label: 'Partners', to: '/partners' },
  { label: 'Careers', to: '/careers' },
  { label: 'Contact', to: '/contact' },
];

const Footer = () => (
  <footer className="bg-brand-bg border-t border-brand-border/50 py-5">
    <div className="container-wide">

      {/* Main row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 pb-5 border-b border-brand-border/30">

        {/* Brand */}
        <div className="flex-shrink-0">
          <Link to="/" className="inline-block mb-1.5">
            <img src="/logo.png" alt="Arinox AI" className="h-6 w-auto object-contain opacity-90" />
          </Link>
          <p className="text-[11px] text-brand-subtle leading-snug">
            Sovereign AI infrastructure, built for operational reality.
          </p>
        </div>

        {/* Nav links */}
        <nav className="flex flex-wrap gap-x-5 gap-y-1.5">
          {navLinks.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className="text-xs text-brand-muted hover:text-brand-primary transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Connect */}
        <div className="flex flex-col items-start sm:items-end gap-1.5 flex-shrink-0">
          <a
            href="https://www.linkedin.com/company/arinox-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-brand-muted hover:text-brand-primary transition-colors duration-200"
          >
            <LinkedInIcon />
            LinkedIn
          </a>
         
        </div>
      </div>

      {/* Bottom bar */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-[11px] text-brand-subtle">
          © {new Date().getFullYear()} Adisen Tech Private Limited · Bengaluru · All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-[11px] text-brand-subtle">
          <span>India</span>
          <a href="#" className="hover:text-brand-muted transition-colors">Privacy</a>
          <a href="#" className="hover:text-brand-muted transition-colors">Terms</a>
        </div>
      </div>

    </div>
  </footer>
);

const LinkedInIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

export default Footer;
