import { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

/* Magnet — the element is gently pulled toward the cursor.
   Technique: ReactBits "Magnet" (MIT), kept on framer-motion only.
   Disabled under reduced motion. */
export function Magnet({ children, className = '', strength = 0.25, max = 10 }) {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const x = useSpring(useMotionValue(0), { stiffness: 170, damping: 14 });
  const y = useSpring(useMotionValue(0), { stiffness: 170, damping: 14 });

  const onMove = (e) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    x.set(Math.max(-max, Math.min(max, dx * strength)));
    y.set(Math.max(-max, Math.min(max, dy * strength)));
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x, y }}
      className={`inline-block will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}