/* Marquee — the ReactBits marquee technique (MIT): one track, two identical
   copies of the children, translated -50% on the site's existing `marquee`
   keyframes. Duration via CSS var (--marquee-duration), pauses on hover,
   honours the global reduced-motion kill switch. */

export function Marquee({ children, duration = 40, reverse = false, className = '' }) {
  return (
    <div className={`group relative w-full overflow-hidden ${className}`}>
      <div
        className="marquee-track flex w-max items-center"
        style={{ '--marquee-duration': `${duration}s`, animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}