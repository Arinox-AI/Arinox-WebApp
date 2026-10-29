/* SuiteFaq — the straight-answers block (SEO + trust), native
   <details>/<summary> so it works without JS and stays hermetic in tests.
   Data shape (src/data/*.js → `faq`): [{ q, a }] */
export function SuiteFaq({ faq }) {
  return (
    <>
      <p className="eyebrow text-ink-faint">Questions, answered</p>
      <h2 className="mt-5 max-w-3xl font-display text-[30px] leading-[1.08] tracking-[-0.02em] md:text-[40px]">
        Straight answers, <span className="italic text-ember">before the demo.</span>
      </h2>

      <div className="mt-8 border-t border-ink/80">
        {faq.map((f) => (
          <details key={f.q} className="group border-b border-line">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
              <span className="font-display text-[18px] leading-snug tracking-[-0.01em] md:text-[20px]">{f.q}</span>
              <span
                aria-hidden
                className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line font-mono text-[12px] text-ink-faint transition-colors group-open:border-ember/50 group-open:text-ember-deep"
              >
                <span className="group-open:hidden">+</span>
                <span className="hidden group-open:inline">&minus;</span>
              </span>
            </summary>
            <p className="max-w-3xl pb-6 text-[14.5px] leading-relaxed text-ink-soft">{f.a}</p>
          </details>
        ))}
      </div>
    </>
  );
}
