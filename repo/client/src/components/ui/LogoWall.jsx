import Reveal from './Reveal';

/* Static logo wall — no marquee, no motion theatre. */
const LogoWall = ({ items, cols = 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5', className = '' }) => (
  <div className={`grid ${cols} gap-3 ${className}`}>
    {items.map(({ name, logo }) => (
      <Reveal key={name} delay={0}>
        <div className="logo-wall-item card card-hover flex flex-col items-center justify-center gap-2.5 px-5 py-6 h-full">
          <img src={logo} alt={name} title={name} loading="lazy" className="h-8 max-w-[120px] w-auto object-contain" />
          <span className="text-[11px] text-brand-muted text-center leading-tight">{name}</span>
        </div>
      </Reveal>
    ))}
  </div>
);

export default LogoWall;
