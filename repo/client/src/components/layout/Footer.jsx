import { Link } from 'react-router-dom';
import arinoxLogo from '../../assets/img.png';
import { company } from '../../data/site';

const explore = [
  { label: 'Solutions', to: '/solutions' },
  { label: 'Platform',  to: '/commandcore' },
  { label: 'Partners',  to: '/partners' },
];

const companyLinks = [
  { label: 'Company',   to: '/about' },
  { label: 'Insights',  to: '/blog' },
  { label: 'Careers',   to: '/careers' },
  { label: 'Contact',   to: '/contact' },
];

const Footer = () => (
  <footer className="bg-brand-surface border-t border-brand-border">
    <div className="container-wide pt-16 pb-8">

      <div className="grid md:grid-cols-12 gap-10 pb-14">
        <div className="md:col-span-5">
          <Link to="/" className="inline-block mb-5">
            <img src={arinoxLogo} alt="Arinox AI" className="h-5 w-auto object-contain" />
          </Link>
          <p className="text-[13.5px] text-brand-muted leading-relaxed max-w-sm">
            AI transformation, implemented end to end. We help enterprises put private AI to work inside
            their own environment — strategy, deployment, integration, and operations.
          </p>
          <p className="mono text-brand-subtle mt-6 text-[10.5px]">
            RECOGNISED BY STARTUP INDIA (DPIIT)
          </p>
        </div>

        <div className="md:col-span-2">
          <p className="mono text-[10.5px] tracking-[0.16em] text-brand-subtle mb-4">EXPLORE</p>
          <nav className="flex flex-col gap-2.5" aria-label="Explore">
            {explore.map(({ label, to }) => (
              <Link key={to} to={to} className="text-[13.5px] text-brand-muted hover:text-brand-text transition-colors">
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="md:col-span-2">
          <p className="mono text-[10.5px] tracking-[0.16em] text-brand-subtle mb-4">COMPANY</p>
          <nav className="flex flex-col gap-2.5" aria-label="Company">
            {companyLinks.map(({ label, to }) => (
              <Link key={to} to={to} className="text-[13.5px] text-brand-muted hover:text-brand-text transition-colors">
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="md:col-span-3">
          <p className="mono text-[10.5px] tracking-[0.16em] text-brand-subtle mb-4">CONTACT</p>
          <a href={`mailto:${company.email}`} className="block text-[13.5px] text-brand-muted hover:text-brand-text transition-colors mb-2.5">
            {company.email}
          </a>
          <a href={`tel:${company.phone.replace(/\s/g, '')}`} className="block text-[13.5px] text-brand-muted hover:text-brand-text transition-colors mb-2.5">
            {company.phone}
          </a>
          <a href={company.linkedin} target="_blank" rel="noopener noreferrer" className="block text-[13.5px] text-brand-muted hover:text-brand-text transition-colors mb-2.5">
            LinkedIn
          </a>
          <p className="text-[13.5px] text-brand-muted">Bengaluru · New Delhi</p>
        </div>
      </div>

      <div className="pt-6 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="mono text-[10.5px] text-brand-subtle">
          © {new Date().getFullYear()} {company.entity} · ALL RIGHTS RESERVED
        </p>
        <div className="flex items-center gap-5 mono text-[10.5px] text-brand-subtle">
          <Link to="/privacy" className="hover:text-brand-muted transition-colors">PRIVACY</Link>
          <Link to="/terms" className="hover:text-brand-muted transition-colors">TERMS</Link>
          <span>BUILT IN INDIA</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
