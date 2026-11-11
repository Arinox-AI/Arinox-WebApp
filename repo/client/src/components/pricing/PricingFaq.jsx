/* Pricing FAQ — native <details>/<summary> disclosure (same pattern as
 * site/components/site/SuiteFaq.jsx, no JS dependency, hermetic in tests). */
export function PricingFaq({ items }) {
  return (
    <div className="border-t border-ink/80">
      {items.map((f) => (
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
  );
}
