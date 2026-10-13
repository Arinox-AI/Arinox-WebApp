/* ─── Suite app-window mockups ──────────────────────────────
   The visuals for the Industry Suites, built the way the best B2B sites do
   it (Linear, Stripe, Segment): the product's own UI, framed as an app
   window, on the site's product-stage backdrop. Tokens only: paper, ink,
   line, ember. No invented metrics — signal directions and statuses only.
   ──────────────────────────────────────────────────────────── */

function Chrome({ title }) {
  return (
    <div className="flex items-center gap-2 border-b border-line bg-paper-2/70 px-4 py-2.5">
      <span className="h-2 w-2 rounded-full bg-line" aria-hidden />
      <span className="h-2 w-2 rounded-full bg-line" aria-hidden />
      <span className="h-2 w-2 rounded-full bg-ember/60" aria-hidden />
      <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint">{title}</span>
      <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-ember-deep">
        <span className="relative inline-flex h-1.5 w-1.5" aria-hidden>
          <span className="pulse-ring absolute inset-0 rounded-full bg-ember" />
          <span className="relative h-1.5 w-1.5 rounded-full bg-ember" />
        </span>
        live
      </span>
    </div>
  );
}

const Frame = ({ title, children, className = '' }) => (
  <div className={`overflow-hidden rounded-xl border border-line bg-white shadow-[0_24px_60px_-30px_rgba(11,11,13,0.35)] ${className}`}>
    <Chrome title={title} />
    {children}
  </div>
);

const SigRow = ({ platform, signal, dir }) => (
  <div className="flex items-center gap-3 border-b border-line/70 py-2 last:border-b-0">
    <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dir === 'down' ? 'bg-ink-faint' : 'bg-ember'}`} aria-hidden />
    <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-faint">{platform}</span>
    <span className="min-w-0 flex-1 truncate text-[12px] text-ink-soft">{signal}</span>
    <span
      className={`shrink-0 rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em] ${
        dir === 'down' ? 'border-line bg-paper-2 text-ink-faint' : 'border-ember/40 bg-ember/10 text-ember-deep'
      }`}
    >
      {dir === 'down' ? 'flag' : 'scale'}
    </span>
  </div>
);

export function MarketingOSMock({ className = '' }) {
  return (
    <Frame title="Marketing OS — cockpit" className={className}>
      <div className="grid gap-3.5 p-3.5 sm:grid-cols-[1fr_190px]">
        <div className="min-w-0">
          <SigRow platform="Meta" signal="Clicks falling while repeat views rise" dir="down" />
          <SigRow platform="Google" signal="Creative scaling, three days strong" dir="up" />
          <SigRow platform="Stores" signal="Footfall up, evening peak" dir="up" />
          <SigRow platform="CRM" signal="Two accounts showing churn signals" dir="down" />
        </div>
        <div className="rounded-lg border border-ember/30 bg-ember/[0.05] p-3">
          <svg viewBox="0 0 180 14" preserveAspectRatio="none" className="mb-1.5 h-3.5 w-full" aria-hidden>
            <path d="M2 3 H118" fill="none" stroke="#ff6301" strokeWidth="1.2" strokeDasharray="5 6" className="flow-dash" opacity="0.8" vectorEffect="non-scaling-stroke" />
            <path d="M2 7 H118" fill="none" stroke="#ff6301" strokeWidth="1.2" strokeDasharray="5 6" className="flow-dash" opacity="0.5" vectorEffect="non-scaling-stroke" />
            <path d="M2 11 H118" fill="none" stroke="#ff6301" strokeWidth="1.2" strokeDasharray="5 6" className="flow-dash" opacity="0.3" vectorEffect="non-scaling-stroke" />
            <path d="M126 2.5 L134 7 L126 11.5" fill="none" stroke="#ff6301" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
          </svg>
          <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-ember-deep">Needs your approval</p>
          <ul className="mt-2 space-y-1.5">
            {['Pause the tired ad', 'Replacement drafted from the winner', 'Budget moves to the performer'].map((t) => (
              <li key={t} className="flex gap-2 text-[11px] leading-snug text-ink-soft">
                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-ember" aria-hidden />
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <span className="chip rounded-btn bg-ember px-2.5 py-1.5 text-[9.5px] font-medium text-white">Approve</span>
            <span className="chip rounded-btn border border-line px-2.5 py-1.5 text-[9.5px] text-ink-soft">Edit</span>
            <span className="chip rounded-btn border border-line px-2.5 py-1.5 text-[9.5px] text-ink-soft">Decline</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-2 border-t border-line bg-paper-2/60 px-3.5 py-2.5">
        <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-faint">Always on</span>
        {['Monitor', 'Analyse', 'Decide'].map((a) => (
          <span
            key={a}
            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.08em] text-ink-soft"
          >
            <span className="h-1 w-1 rounded-full bg-ember/70" aria-hidden />
            {a}
          </span>
        ))}
      </div>
    </Frame>
  );
}

export function ApparelOSMock({ className = '' }) {
  const rows = [
    { k: 'Attendance', v: 'Shift A checked in via CCTV analysis', tag: 'OK', tone: 'ok' },
    { k: 'Line 3', v: 'Fabric jam reported by the supervisor', tag: 'Flag', tone: 'flag' },
    { k: 'ERP', v: 'Work orders and materials synced', tag: 'Sync', tone: 'ok' },
    { k: 'CRM', v: 'Buyer enquiry assigned to sales', tag: 'New', tone: 'new' },
  ];
  return (
    <Frame title="Apparel OS — floor console" className={className}>
      <div className="p-3.5">
        {rows.map((r) => (
          <div key={r.k} className="flex items-center gap-3 border-b border-line/70 py-2 last:border-b-0">
            <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-faint">{r.k}</span>
            <span className="min-w-0 flex-1 truncate text-[12px] text-ink-soft">{r.v}</span>
            <span
              className={`shrink-0 rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em] ${
                r.tone === 'flag' ? 'border-ember/40 bg-ember/10 text-ember-deep' : 'border-line bg-paper-2 text-ink-faint'
              }`}
            >
              {r.tag}
            </span>
          </div>
        ))}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {['Attendance', 'Line', 'ERP', 'CRM'].map((c) => (
            <span key={c} className="rounded-full border border-line bg-paper-2 px-2.5 py-1 font-mono text-[9.5px] text-ink-soft">{c}</span>
          ))}
        </div>
      </div>
    </Frame>
  );
}
