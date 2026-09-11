import { useReducedMotion } from 'framer-motion';

const DeploymentMarquee = ({ items, className = '' }) => {
  const reduce = useReducedMotion();
  const loop = [...items, ...items];
  return (
    <div
      className={`feed-marquee-mask marquee relative overflow-hidden border-y border-brand-border/30 bg-brand-surface/50 py-3 ${className}`}
      aria-hidden="true"
    >
      <div className="marquee-track" style={reduce ? { animation: 'none' } : undefined}>
        {loop.map((it, i) => (
          <span key={i} className="flex items-center gap-2.5 px-4 text-xs whitespace-nowrap">
            <span className="text-white font-bold">{it.title}</span>
            {it.meta && (
              <>
                <span className="text-brand-border">/</span>
                <span className="text-brand-muted">{it.meta}</span>
              </>
            )}
            {it.highlight && (
              <>
                <span className="mx-1.5" />
                <span className="text-brand-primary font-bold">{it.highlight}</span>
              </>
            )}
            <span className="text-brand-primary/40 ml-1.5 text-[10px]">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default DeploymentMarquee;
