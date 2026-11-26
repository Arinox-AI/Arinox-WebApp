// One box size per placement kind, so every illustration reads the same.
//   column — figure above copy in a hairline column / row of 2–4 items
//   row    — Industries ledger row figure
//   hero   — bare page-hero figure beside the headline
// Decorative only (alt=""). Palette rules: agent-docs/design.md §6b.
const BOX = {
  column: 'h-[136px]',
  row: 'h-[180px] lg:h-[200px]',
  hero: 'mx-auto h-[260px] w-full md:h-[320px]',
};
const IMG = {
  column: 'object-left',
  row: 'object-left',
  hero: 'object-center',
};

export default function Illustration({ src, alt = '', variant = 'column', className = '', imgClassName = '', eager = false }) {
  return (
    <div className={`flex items-center ${BOX[variant]} ${variant === 'hero' ? 'justify-center' : ''} ${className}`.trim()}>
      <img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        className={`h-full w-auto max-w-full object-contain ${IMG[variant]} ${imgClassName}`.trim()}
      />
    </div>
  );
}
