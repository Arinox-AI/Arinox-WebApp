import { motion, useReducedMotion } from 'framer-motion';

/* Gentle reveal-on-scroll: fade + small translate, ~280ms, fires once.
 * Honours prefers-reduced-motion (renders statically instead). */
export function Reveal({ children, className = '', delay = 0 }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-48px' }}
      transition={{ duration: 0.28, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
