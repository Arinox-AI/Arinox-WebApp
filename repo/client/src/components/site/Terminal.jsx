/**
 * TerminalWindow, code-window card, animated log lines, traffic-light dots,
 * live ember pill.
 */
export function Terminal({ title, lines, className = '', loop = true }) {
  const stCls = (st) =>
    st === 'act'
      ? 'rounded-full bg-ember px-2 py-0.5 text-[10px] font-medium text-white'
      : st === 'gate'
        ? 'rounded-full border border-white/25 px-2 py-0.5 text-[10px] text-white/80'
        : 'rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-ghost'

  const stLabel = (st) => (st === 'act' ? 'acting' : st === 'gate' ? 'approval' : 'logged')

  return (
    <div className={`overflow-hidden card-dark ${className}`}>
      <div className="flex items-center gap-2 border-b border-white/10 bg-carbon px-5 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="ml-3 truncate font-mono text-[11.5px] text-ghost">{title}</span>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-[10.5px] font-medium text-ember">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ember" />
          live
        </span>
      </div>
      <div className="font-mono text-[12.5px] leading-relaxed">
        {lines.map((l, i) => (
          <div
            key={`${l.k}-${i}`}
            className={`flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-white/5 px-5 py-3.5 last:border-b-0 ${
              loop ? 'terminal-line' : ''
            }`}
            style={loop ? { animationDelay: `${(i * 0.45).toFixed(2)}s` } : undefined}
          >
            <span className="shrink-0 text-white/90">{l.k}</span>
            <span className="min-w-0 flex-1 text-ghost">{l.v}</span>
            <span className={`shrink-0 ${stCls(l.st ?? 'ok')}`}>{stLabel(l.st ?? 'ok')}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
