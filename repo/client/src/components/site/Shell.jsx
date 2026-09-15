import { Link } from 'react-router-dom'
import { Button } from './Button'
import { HalftoneBackground } from './HalftoneBackground'
import { LinkedinIcon } from './Icons'
import { company } from '../../data/site'

export function CtaBand({ title, offer }) {
  return (
    <section className="relative overflow-hidden bg-void py-28 text-white md:py-36">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <HalftoneBackground dotSize={5} spacing={26} dotColor="#ff6301" baseColor="transparent" opacity={0.35} gradient={{ type: 'radial', from: 'center' }} />
      </div>
      <div className="relative mx-auto max-w-3xl px-7 text-center">
        <h2 className="font-display text-[34px] leading-[1.08] tracking-[-0.01em] text-phos md:text-[54px]">{title}</h2>
        <p className="mx-auto mt-5 max-w-md text-[17px] leading-relaxed text-ghost">{offer}</p>
        <div className="mt-10">
          <Button to="/contact" variant="ember">
            Book a discovery session
          </Button>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-paper">
      <img
        src="/images/brand/arinox-a-orange.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -bottom-10 -right-6 h-[clamp(220px,34vw,420px)] w-auto select-none opacity-[0.08]"
      />
      <div className="relative z-10 mx-auto max-w-6xl px-7 pb-12 pt-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="col-span-2 md:col-span-1">
            <img src="/images/brand/logo-black.png" alt="Arinox" className="mb-4 h-[22px] w-auto" />
            <p className="max-w-[260px] text-sm text-ink-soft">
              Enterprise AI that runs the work, not the deck.
            </p>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.1em] text-ember-deep">
              Sovereign · on-prem · yours
            </p>
          </div>
          <div>
            <h5 className="mb-3.5 text-sm font-medium text-ink-faint">Platform</h5>
            <FooterLink to="/platform">Platform</FooterLink>
            <FooterLink to="/commandcore">CommandCore™</FooterLink>
            <FooterLink to="/case-studies">Case Studies</FooterLink>
            <FooterLink to="/partners">Partners</FooterLink>
          </div>
          <div>
            <h5 className="mb-3.5 text-sm font-medium text-ink-faint">Resources</h5>
            <FooterLink to="/blog">Blog</FooterLink>
            <FooterLink to="/careers">Careers</FooterLink>
            <FooterLink to="/partners">Partners</FooterLink>
          </div>
          <div>
            <h5 className="mb-3.5 text-sm font-medium text-ink-faint">Contact</h5>
            <FooterLink to="/contact">Book a session</FooterLink>
            <a
              href={company.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 py-1 text-sm text-ink-soft transition-colors hover:text-ink"
            >
              <LinkedinIcon size={15} className="text-ember-deep" />
              LinkedIn
            </a>
            <FooterLink to="/privacy">Privacy</FooterLink>
            <FooterLink to="/terms">Terms</FooterLink>
          </div>
        </div>
        <div className="mt-16 flex flex-wrap justify-between gap-2.5 border-t border-line pt-6 font-mono text-[11.5px] text-ink-faint">
          <span>© 2026 Adisen Tech Private Limited · Bengaluru · All rights reserved.</span>
          <span>Sovereign. Scalable. Yours.</span>
        </div>
      </div>
    </footer>
  )
}

function FooterLink({ children, to }) {
  return (
    <Link to={to} className="block py-1 text-sm text-ink-soft transition-colors hover:text-ink">
      {children}
    </Link>
  )
}
