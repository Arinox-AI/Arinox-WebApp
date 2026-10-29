/* AskPanel — "Ask the OS anything", in the spirit of the best product
   sites' embedded-AI sections: sample questions by function, pointed at
   ARIN (the site-wide assistant) — no fake chat UI, no fake answers.
   Data shape (src/data/*.js → `ask`):
     { label, titleLead, titleAccent, hint,
       questions: [{ t, q }] }
   ──────────────────────────────────────────────────────────── */
export function AskPanel({ ask }) {
  return (
    <section aria-label={ask.label} className="border-b border-line bg-paper-2/40 px-7 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="eyebrow text-ink-faint">{ask.label}</p>
            <h2 className="mt-5 font-display text-[30px] leading-[1.08] tracking-[-0.02em] md:text-[40px]">
              {ask.titleLead} <span className="italic text-ember">{ask.titleAccent}</span>
            </h2>
          </div>
          {ask.hint ? (
            <p className="max-w-xs text-[13.5px] leading-relaxed text-ink-soft">{ask.hint}</p>
          ) : null}
        </div>

        <ul className="mt-10 border-t border-ink/80">
          {ask.questions.map((q) => (
            <li key={q.t} className="grid items-baseline gap-x-6 border-b border-line py-5 sm:grid-cols-[9rem_1fr]">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ember-deep">{q.t}</span>
              <p className="font-display text-[19px] leading-snug tracking-[-0.01em] md:text-[21px]">
                &ldquo;{q.q}&rdquo;
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
