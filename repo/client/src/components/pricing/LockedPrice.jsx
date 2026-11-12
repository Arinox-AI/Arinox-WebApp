import { Lock } from 'lucide-react';

/* Locked price: lock icon + currency symbol + masked digits. The bullets are
 * aria-hidden so screen readers hear the label, not "● ● ● ●"; the wrapper is
 * focusable and exposes the human-readable label + hover/focus tooltip
 * ("Shared in a conversation"). */
export function LockedPrice({ per, className = '' }) {
  return (
    <span
      tabIndex={0}
      aria-label="Price available after Price Discovery"
      className={`group/lk relative inline-flex cursor-default items-center gap-2 focus:outline-none ${className}`}
    >
      <Lock size={14} strokeWidth={2.2} className="text-ink-faint" aria-hidden />
      <span
        aria-hidden
        className="inline-block select-none tracking-[0.25em] text-ghost blur-[2px]"
      >
        &#9679;&#9679;&#9679;&#9679;
      </span>
      {per && (
        <span className="text-[13.5px] text-ink-faint" aria-hidden>
          / {per}
        </span>
      )}
      {/* Tooltip on hover or keyboard focus */}
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-0 z-10 mb-2 hidden whitespace-nowrap rounded border border-line bg-white px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-ink shadow-[0_14px_30px_-14px_rgba(11,11,13,0.35)] group-hover/lk:block group-focus-within/lk:block"
      >
        Shared in a conversation
      </span>
    </span>
  );
}
