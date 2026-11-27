import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { banner, categories } from '../../data/cookies';
import { applyGpc, getConsent, gpcOn, hasDecided, setConsent, SETTINGS_EVENT_NAME } from '../../lib/consent';
import { startConsentEffects } from '../../lib/consentEffects';

/* A slim dark strip along the bottom edge: one sentence, three equal buttons.
   Equal on purpose (same size, same style, no accent on Accept) - regulators
   require Reject to be as easy as Accept. "Choose" opens the categories inside
   the strip as compact columns, not a tall box. */
const BTN =
  'inline-flex items-center justify-center whitespace-nowrap border border-paper/35 px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-paper transition-colors hover:border-paper hover:bg-paper hover:text-void focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper';

function Toggle({ id, label, description, checked, locked, onChange }) {
  return (
    <label htmlFor={id} className={`flex items-start gap-3 border-t border-paper/15 pt-3 ${locked ? '' : 'cursor-pointer'}`}>
      <input
        id={id}
        type="checkbox"
        role="switch"
        checked={checked}
        disabled={locked}
        aria-labelledby={`${id}-l`}
        aria-describedby={`${id}-d`}
        onChange={(e) => onChange?.(e.target.checked)}
        className="mt-0.5 h-4 w-4 shrink-0 accent-ember"
      />
      <span>
        <span className="block font-mono text-[11px] uppercase tracking-[0.12em] text-paper">
          <span id={`${id}-l`}>{label}</span>
          {locked ? <span className="ml-2 text-paper/50">{banner.alwaysOn}</span> : null}
        </span>
        <span id={`${id}-d`} className="mt-1 block text-[12.5px] leading-snug text-paper/60">{description}</span>
      </span>
    </label>
  );
}

export function CookieBanner() {
  // GPC with no stored choice is recorded as "Reject all" and the panel stays closed.
  const [open, setOpen] = useState(() => !applyGpc() && !hasDecided());
  const fromSettings = useRef(false);
  const [choosing, setChoosing] = useState(false);
  const [draft, setDraft] = useState(() => getConsent());
  const panelRef = useRef(null);

  useEffect(() => startConsentEffects(), []);

  useEffect(() => {
    const reopen = () => {
      fromSettings.current = true;
      setDraft(getConsent());
      setChoosing(true);
      setOpen(true);
    };
    window.addEventListener(SETTINGS_EVENT_NAME, reopen);
    return () => window.removeEventListener(SETTINGS_EVENT_NAME, reopen);
  }, []);

  useEffect(() => {
    if (open && choosing) panelRef.current?.focus();
  }, [open, choosing]);

  const decide = (choice) => {
    setConsent(choice, fromSettings.current ? 'settings' : 'banner');
    fromSettings.current = false;
    setOpen(false);
    setChoosing(false);
  };

  if (!open) return null;

  return (
    <div
      ref={panelRef}
      tabIndex={-1}
      role="region"
      aria-label="Cookie preferences"
      aria-live="polite"
      onKeyDown={(e) => { if (e.key === 'Escape' && choosing) setChoosing(false); }}
      className="fixed inset-x-0 bottom-0 z-[60] max-h-[80vh] overflow-y-auto bg-void text-paper outline-none"
    >
      <div className="mx-auto max-w-6xl px-5 py-3.5 md:px-7">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-8">
          <p className="text-[13px] leading-snug text-paper/80">
            {banner.body}{' '}
            <Link to={banner.learnMore.to} className="whitespace-nowrap text-paper underline decoration-paper/40 underline-offset-2 hover:decoration-paper">
              {banner.learnMore.label}
            </Link>
            <span className="text-paper/40"> · </span>
            <Link to={banner.privacy.to} className="whitespace-nowrap text-paper underline decoration-paper/40 underline-offset-2 hover:decoration-paper">
              {banner.privacy.label}
            </Link>
            {gpcOn() ? <span className="mt-1 block text-[12px] text-paper/60">{banner.gpc}</span> : null}
          </p>
          <div className="flex shrink-0 gap-2">
            <button type="button" className={BTN} onClick={() => decide({ functional: true, analytics: true })}>
              {banner.acceptAll}
            </button>
            <button type="button" className={BTN} onClick={() => decide({ functional: false, analytics: false })}>
              {banner.rejectAll}
            </button>
            {choosing ? (
              <button type="button" className={BTN} onClick={() => decide({ functional: draft.functional, analytics: draft.analytics })}>
                {banner.save}
              </button>
            ) : (
              <button type="button" className={BTN} aria-expanded="false" onClick={() => { setDraft(getConsent()); setChoosing(true); }}>
                {banner.choose}
              </button>
            )}
          </div>
        </div>

        {choosing && (
          <div className="mt-3.5 grid gap-3 pb-1 md:grid-cols-3 md:gap-6">
            {categories.map((c) => (
              <Toggle
                key={c.key}
                id={`cookie-${c.key}`}
                label={c.label}
                description={c.short || c.description}
                locked={c.locked}
                checked={c.locked ? true : draft[c.key] === true}
                onChange={(v) => setDraft((d) => ({ ...d, [c.key]: v }))}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
