import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * Figma-style interactive 3D tilt card.
 * Mouse position drives rotateX / rotateY via spring physics.
 * Optional spotlight glare follows the cursor.
 */
const MouseTilt = ({
  children,
  className = '',
  intensity = 12,
  glare = true,
  scaleOnHover = 1.04,
}) => {
  const ref = useRef(null);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const isHovered = useMotionValue(0);

  const mxSpring = useSpring(mx, { stiffness: 200, damping: 24, mass: 0.5 });
  const mySpring = useSpring(my, { stiffness: 200, damping: 24, mass: 0.5 });
  const scaleSpring = useSpring(isHovered, {
    stiffness: 220,
    damping: 22,
    mass: 0.4,
  });

  const rotateX = useTransform(mySpring, [0, 1], [intensity, -intensity]);
  const rotateY = useTransform(mxSpring, [0, 1], [-intensity, intensity]);
  const scale = useTransform(scaleSpring, [0, 1], [1, scaleOnHover]);

  const glareOpacity = useSpring(useTransform(scaleSpring, [0, 1], [0, 1]), {
    stiffness: 200,
    damping: 24,
  });
  const glareBackground = useTransform(
    [mxSpring, mySpring],
    ([x, y]) =>
      `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.10) 0%, transparent 65%)`
  );

  const boundsRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!boundsRef.current || !ref.current) return;
    const { left, top, width, height } = boundsRef.current;
    mx.set((e.clientX - left) / width);
    my.set((e.clientY - top) / height);
  };

  const handleMouseEnter = () => {
    if (ref.current) boundsRef.current = ref.current.getBoundingClientRect();
    isHovered.set(1);
  };
  const handleMouseLeave = () => {
    mx.set(0.5);
    my.set(0.5);
    isHovered.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        willChange: 'transform',
      }}
      className={`relative ${className}`}
    >
      {children}
      {glare && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ background: glareBackground, opacity: glareOpacity }}
        />
      )}
    </motion.div>
  );
};

export default MouseTilt;
