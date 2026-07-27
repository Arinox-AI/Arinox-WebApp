/**
 * Logo marquee — continuous horizontal scroll with gradient fade edges.
 * All logos rendered at the same height with balanced breathing room.
 * Seamless loop (items duplicated), pauses on hover.
 */
const LogoGrid = ({ items }) => {
  const doubled = [...items, ...items];

  return (
    <div className="logo-marquee-mask overflow-hidden">
      <div
        className="logo-marquee-track flex items-center shrink-0"
        style={{ width: 'max-content' }}
      >
        {doubled.map(({ name, logo }, i) => (
          <div
            key={`${name}-${i}`}
            className="flex-shrink-0 flex items-center justify-center px-8 sm:px-10 py-3"
            title={name}
          >
            {logo ? (
              <img
                src={logo}
                alt={name}
                className="h-7 sm:h-9 max-w-[100px] sm:max-w-[140px] object-contain opacity-70 hover:opacity-100 transition-opacity"
                style={{ filter: 'brightness(0) invert(1)' }}
                loading="lazy"
              />
            ) : (
              <span className="text-sm font-semibold text-gray-400">{name}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoGrid;
