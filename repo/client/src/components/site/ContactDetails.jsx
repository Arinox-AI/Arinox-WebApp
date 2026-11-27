import { Fragment } from 'react'
import { company } from '../../data/site'
import { reachUs } from '../../data/inquiries'

/* The quiet footnote under the /get-started flow: direct contact on one ruled
   line, the offices on the next. Not a section of its own - it belongs to the
   form above it. Everything comes from data/site.js. */
const linkCls = 'text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-ember'

export function ContactDetails() {
  const cities = company.offices.flatMap(({ cities: c }) => c)
  return (
    <div id="reach-us" className="mx-auto max-w-6xl px-7 pb-16 md:pb-24">
      <div className="border-t border-ink/80 pt-5">
        <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-8">
          <p className="shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint md:w-[220px]">{reachUs.eyebrow}</p>
          <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[15px]">
            <a href={`mailto:${company.email}`} className={linkCls}>{company.email}</a>
            <span className="text-ink-faint" aria-hidden>·</span>
            <a href={`tel:${company.phone.replace(/\s/g, '')}`} className={linkCls}>{company.phone}</a>
            <span className="text-ink-faint" aria-hidden>·</span>
            <a href={company.linkedin} target="_blank" rel="noopener noreferrer" className={linkCls}>
              {reachUs.linkedin}
            </a>
          </p>
        </div>
        <div className="mt-3 flex flex-col gap-1 border-t border-line pt-3 md:flex-row md:items-baseline md:gap-8">
          <p className="shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint md:w-[220px]">{reachUs.offices}</p>
          <p className="text-[13.5px] leading-relaxed text-ink-soft">
            {cities.map(({ city, note }, i) => (
              <Fragment key={city}>
                {i > 0 ? ' ' : null}
                <span className="whitespace-nowrap">
                  {i > 0 ? <span className="mr-3 text-ink-faint" aria-hidden>·</span> : null}
                  <span>{city}</span>
                  {note === 'Headquarters' ? <span className="text-ink-faint"> (HQ)</span> : null}
                </span>
              </Fragment>
            ))}
          </p>
        </div>
      </div>
    </div>
  )
}
