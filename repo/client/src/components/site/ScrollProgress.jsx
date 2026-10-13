import { useEffect, useState } from 'react';

/* ScrollProgress — an ember hairline across the top of the page showing
   reading progress. ReactBits "Scroll Progress" pattern (MIT), rebuilt on
   the site's tokens. Scroll-driven only, so it is naturally
   reduced-motion safe. */
export function ScrollProgress() {
  const [p, setP] = useState(0);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        setP(max > 0 ? Math.min(1, h.scrollTop / max) : 0);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[2px]">
      <div
        className="h-full bg-gradient-to-r from-ember to-ember-deep"
        style={{ width: `${p * 100}%` }}
      />
    </div>
  );
}