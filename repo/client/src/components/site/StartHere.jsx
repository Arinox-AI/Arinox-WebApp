import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Section } from './Section'
import { Label } from './Layout'
import { startHere } from '../../data/inquiries'

/**
 * StartHere: the Home pointer to the client intake. It does not host any part
 * of the form; everything links to /get-started. Same editorial language as
 * the rest of Home: label, display headline, hairline rules, one ember action.
 */
export function StartHere() {
  return (
    <Section border>
      <Label>{startHere.label}</Label>

      <Link
        to="/get-started"
        className="group mt-6 grid items-end gap-8 border-b border-ink/80 pb-10 md:grid-cols-[1fr_auto]"
      >
        <h2 className="max-w-3xl font-display text-[40px] leading-[1.02] tracking-[-0.02em] md:text-[64px]">
          {startHere.titleLead}{' '}
          <span className="italic text-ember">{startHere.titleAccent}</span>
        </h2>
        <span className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-ember text-white transition-transform duration-300 ease-out group-hover:translate-x-1.5 md:h-20 md:w-20">
          <ArrowRight size={28} strokeWidth={1.8} aria-hidden />
          <span className="sr-only">{startHere.cta}</span>
        </span>
      </Link>

      <div className="mt-8 grid gap-x-16 gap-y-6 md:grid-cols-[1fr_auto]">
        <p className="max-w-xl text-[17px] leading-relaxed text-ink-soft">{startHere.sub}</p>
        <ul className="flex flex-wrap gap-x-8 gap-y-2 font-mono text-[11.5px] uppercase tracking-[0.1em] text-ink-faint md:justify-end">
          {startHere.facts.map((f) => <li key={f}>{f}</li>)}
        </ul>
      </div>
    </Section>
  )
}
