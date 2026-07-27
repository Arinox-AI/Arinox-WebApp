import { motion, useMotionValue, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';

const LogoGrid = ({ items }) => {
  const doubled = [...items, ...items];
  const trackRef = useRef(null);
  const x = useMotionValue(0);
  const animRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !items.length) return;

    const startAnim = () => {
      const halfWidth = track.scrollWidth / 2;
      animRef.current = animate(x, -halfWidth, {
        duration: 50,
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'loop',
      });
    };

    const stopAnim = () => { animRef.current?.stop(); };

    const container = track.parentElement;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) startAnim();
      else stopAnim();
    }, { threshold: 0 });
    if (container) observer.observe(container);

    startAnim();

    return () => { stopAnim(); observer.disconnect(); };
  }, [items.length, x]);

  return (
    <div className="logo-marquee-mask overflow-hidden">
      <motion.div
        ref={trackRef}
        className="flex items-center shrink-0"
        style={{ x, width: 'max-content' }}
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
      </motion.div>
    </div>
  );
};

export default LogoGrid;
