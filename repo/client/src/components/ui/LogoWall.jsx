import Reveal from './Reveal';

/* Quiet, boxless logo row, logos in ink, names in mono micro-label. */
const LogoWall = ({ items, cols = 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5', className = '' }) => (
  <div className={`grid ${cols} gap-x-8 gap-y-9 items-center ${className}`}>
    {items.map(({ name, logo }) => (
      <Reveal key={name}>
        <div className="logo-wall-item flex flex-col items-center gap-2">
          <img src={logo} alt={name} title={name} loading="lazy" className="h-6 md:h-7 max-w-[110px] w-auto object-contain" />
          <span className="mono text-[9px] tracking-[0.14em] text-brand-subtle uppercase text-center leading-tight">{name}</span>
        </div>
      </Reveal>
    ))}
  </div>
);

export default LogoWall;
