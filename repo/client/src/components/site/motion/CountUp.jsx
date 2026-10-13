import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useMotionValue, useReducedMotion } from 'framer-motion';

/* CountUp — numbers count from 0 to their value once scrolled into view.
   Technique: ReactBits "Count Up" / Magic UI "Number Ticker" (MIT), kept
   dependency-free on framer-motion. Non-numeric values render as-is. */
export function CountUp({ value, duration = 1.4, className = '' }) {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  const m = String(value).match(/^(-?\d+(?:\.\d+)?)(.*)$/);
  const target = m ? parseFloat(m[1]) : null;
  const suffix = m ? m[2] : '';

  useEffect(() => {
    if (!inView || target == null) return;
    if (reduced) {
      setDisplay(target);
      return;
    }
    const controls = animate(mv, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, target, reduced, duration, mv]);

  const text = target == null ? value : `${+display.toFixed(2)}${suffix}`;
  return (
    <span ref={ref} className={`num ${className}`}>
      {text}
    </span>
  );
}