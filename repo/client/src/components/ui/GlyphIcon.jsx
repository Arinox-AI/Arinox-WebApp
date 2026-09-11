const SIZES = {
  sm: { box: 'w-8 h-8 rounded-lg', icon: 'w-4 h-4' },
  md: { box: 'w-11 h-11 rounded-xl', icon: 'w-5 h-5' },
};

const GlyphIcon = ({ Icon, color = 'rgb(var(--color-primary))', size = 'md', className = '' }) => {
  const s = SIZES[size] || SIZES.md;
  return (
    <span
      className={`relative inline-flex items-center justify-center shrink-0 border border-brand-border bg-brand-surface/80 shadow-sm ${s.box} ${className}`}
    >
      <Icon strokeWidth={1.8} className={s.icon} style={{ color }} />
    </span>
  );
};

export default GlyphIcon;
