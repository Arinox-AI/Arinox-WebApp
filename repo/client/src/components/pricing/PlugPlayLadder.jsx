import { motion } from 'framer-motion';
import { LockedPrice } from './LockedPrice';

/* levels: data/pricing.js ladder levels. Level 1 carries the ONLY visible
 * price line on the page; every other level is locked. Ledger rows: the
 * ember rule under each row lengthens level by level — the staircase,
 * without the floating cards. */
export function PlugPlayLadder({ levels, deploymentLabel = 'SaaS' }) {
  return (
    <ol className="border-t border-ink/80">
      {levels.map((lvl, i) => (
        <li
          key={lvl.level}
          className={`group relative grid items-baseline gap-x-5 gap-y-2 border-b border-line py-5 md:grid-cols-[4.5rem_11rem_1fr_auto] ${
            lvl.dark ? 'bg-void text-white [margin-inline:-1.25rem] [padding-inline:1.25rem] md:[margin-inline:-1.75rem] md:[padding-inline:1.75rem]' : ''
          }`}
        >
          <span className={`num font-mono text-[11px] tracking-[0.08em] ${lvl.dark ? 'text-ember' : 'text-ember-deep'}`}>
            {String(i + 1).padStart(2, '0')}
          </span>
          <h4
            className={`font-display text-[20px] tracking-[-0.01em] transition-colors ${
              lvl.dark ? 'text-phos' : 'group-hover:text-ember-deep'
            }`}
          >
            {lvl.name}
          </h4>
          <div>
            <p className={`max-w-xl text-[14.5px] leading-relaxed ${lvl.dark ? 'text-ghost' : 'text-ink-soft'}`}>
              {lvl.body}
            </p>
            <motion.span
              key={deploymentLabel}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`mt-2 block font-mono text-[10px] uppercase tracking-[0.1em] ${
                lvl.dark ? 'text-ghost/70' : 'text-ink-faint'
              }`}
            >
              Delivered as {deploymentLabel}
            </motion.span>
          </div>
          <div className="flex min-h-[28px] items-center md:justify-end">
            {lvl.visible ? (
              /* The single visible price line — [YOUR PRICE] placeholder */
              <span
                className="chip border border-ember/40 bg-tint px-3 py-1.5 text-[11px] text-ember-deep"
                aria-label="The entry level of the ladder"
              >
                {lvl.priceLine}
              </span>
            ) : (
              <LockedPrice className={lvl.dark ? 'text-ghost' : 'text-ink-soft'} />
            )}
          </div>
          {/* stair rule */}
          <span
            aria-hidden
            className="absolute bottom-[-1px] left-0 h-[2px] bg-ember"
            style={{ width: `${(i + 1) * 20}%` }}
          />
        </li>
      ))}
    </ol>
  );
}
