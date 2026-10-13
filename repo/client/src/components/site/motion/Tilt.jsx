import { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

/* Tilt — gentle 3D tilt toward the cursor. Technique: Aceternity "Tilt"
   (MIT), kept on framer-motion only. Disabled under reduced motion. */
export function Tilt({ children, className = '', max = 6 }) {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 160, damping: 18 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 160, damping: 18 });

  const onMove = (e) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    rotateY.set(px * max * 2);
    rotateX.set(-py * max * 2);
  };
  const onLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}