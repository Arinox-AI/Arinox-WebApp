import { motion } from 'framer-motion';
import SEO from '../components/ui/SEO';
import { HalftoneBackground } from '../components/site/HalftoneBackground';
import { cookiesPage as copy, cookieTable } from '../data/cookies';
import { openSettings } from '../lib/consent';

const Section = ({ title, children }) => (
  <div className="mb-12">
    <h2 className="mb-4 border-b border-line pb-2.5 font-display text-[20px] tracking-[-0.015em] text-ink">{title}</h2>
    <div className="space-y-3 text-[14.5px] leading-relaxed text-ink-soft">{children}</div>
  </div>
);

const ChangeButton = () => (
  <button
    type="button"
    onClick={openSettings}
    className="chip inline-flex items-center justify-center rounded-btn border border-ink/40 bg-transparent px-5 py-3 text-[12px] font-medium leading-none text-ink transition-colors hover:border-ink hover:bg-paper-2"
  >
    {copy.change}
  </button>
);

const Cookies = () => (
  <>
    <SEO title={copy.seoTitle} description={copy.seoDescription} canonical="https://www.arinox.ai/cookies" />
    <section className="relative overflow-hidden border-b border-line px-7 pb-20 pt-20 md:pt-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 opacity-70" aria-hidden>
        <HalftoneBackground dotSize={4} spacing={20} dotColor="#ff6301" opacity={0.35} gradient={{ type: 'linear', angle: 90 }} />
      </div>
      <div className="relative mx-auto min-w-0 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="eyebrow mb-3 text-ember-deep">Legal</p>
          <h1 className="mb-3 font-display text-[40px] leading-[1.06] tracking-[-0.025em] text-ink md:text-[62px]">{copy.title}</h1>
          <p className="mb-4 font-mono text-[11.5px] uppercase tracking-[0.1em] text-ink-faint">Last updated {copy.updated}</p>
          <p className="mb-6 max-w-[68ch] text-[15.5px] leading-relaxed text-ink-soft">{copy.intro}</p>
          <div className="mb-10"><ChangeButton /></div>
        </motion.div>

        {copy.sections.map((s) => (
          <Section key={s.title} title={s.title}>
            {s.paras?.map((p) => <p key={p} className="max-w-[68ch]">{p}</p>)}
            {s.list && (
              <ul className="max-w-[68ch] list-disc list-outside space-y-1 pl-5">
                {s.list.map(([k, v]) => (
                  <li key={k}><strong className="text-ink">{k}:</strong> {v}</li>
                ))}
              </ul>
            )}
            {s.table && (
              <>
              {/* Below md the table restacks: one hairline block per row,
                  head labels as mono keys, so nothing scrolls sideways. */}
              <dl className="border-t border-ink/30 text-[13.5px] md:hidden">
                {cookieTable.rows.map((r) => (
                  <div key={r[0]} className="border-b border-line py-3.5">
                    <dt className="break-words font-mono text-[12.5px] text-ink">{r[0]}</dt>
                    {r.slice(1).map((cell, i) => (
                      <dd key={i} className="mt-1.5 grid grid-cols-[6.5rem_minmax(0,1fr)] gap-x-3">
                        <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint">{cookieTable.head[i + 1]}</span>
                        <span>{cell}</span>
                      </dd>
                    ))}
                  </div>
                ))}
              </dl>
              <div className="hidden md:block">
                <table className="w-full border-collapse text-left text-[13px]">
                  <thead>
                    <tr>
                      {cookieTable.head.map((h) => (
                        <th key={h} className="border-b border-ink/30 py-2 pr-4 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-ink-faint">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {cookieTable.rows.map((r) => (
                      <tr key={r[0]}>
                        {r.map((cell, i) => (
                          <td key={i} className={`border-b border-line py-2.5 pr-4 align-top ${i === 0 ? 'font-mono text-[12px] text-ink' : ''}`}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              </>
            )}
          </Section>
        ))}
        <ChangeButton />
      </div>
    </section>
  </>
);

export default Cookies;
