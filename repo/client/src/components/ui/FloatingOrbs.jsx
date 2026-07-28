import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const PRESETS = {
  default: [
    { w: 420, h: 420, color: '#FE6300', opacity: 0.07,  blur: 90,  top: '10%',    left: '5%',   dur: 20, dx: [0, 50, -25, 35, 0],  dy: [0, -35, 50, -15, 0] },
    { w: 320, h: 320, color: '#D0500A', opacity: 0.045, blur: 80,  top: '55%',    right: '8%',  dur: 27, dx: [0, -40, 25, -30, 0], dy: [0, 40, -30, 20, 0] },
    { w: 240, h: 240, color: '#FE6300', opacity: 0.035, blur: 70,  bottom: '15%', left: '45%',  dur: 18, dx: [0, 30, -40, 20, 0],  dy: [0, -25, 35, -20, 0] },
  ],
  warm: [
    { w: 500, h: 500, color: '#FE6300', opacity: 0.08,  blur: 100, top: '0%',     left: '20%',  dur: 24, dx: [0, 60, -30, 45, 0],  dy: [0, -45, 60, -25, 0] },
    { w: 280, h: 280, color: '#FF8C3A', opacity: 0.06,  blur: 80,  top: '60%',    right: '5%',  dur: 18, dx: [0, -35, 20, -28, 0], dy: [0, 30, -40, 15, 0] },
    { w: 200, h: 200, color: '#D0500A', opacity: 0.04,  blur: 65,  bottom: '5%',  left: '10%',  dur: 22, dx: [0, 25, -45, 30, 0],  dy: [0, -20, 40, -30, 0] },
  ],
  cool: [
    { w: 400, h: 400, color: '#FE6300', opacity: 0.055, blur: 90,  top: '5%',     right: '10%', dur: 26, dx: [0, -55, 30, -40, 0], dy: [0, 40, -50, 25, 0] },
    { w: 300, h: 300, color: '#D0500A', opacity: 0.06,  blur: 75,  bottom: '20%', left: '5%',   dur: 20, dx: [0, 45, -25, 35, 0],  dy: [0, -30, 45, -20, 0] },
    { w: 220, h: 220, color: '#FF8C3A', opacity: 0.038, blur: 65,  top: '50%',    left: '40%',  dur: 16, dx: [0, 30, -40, 20, 0],  dy: [0, -35, 30, -15, 0] },
  ],
};

const FloatingOrbs = ({ preset = 'default', extra = [] }) => {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isMobile = window.innerWidth < 640;
    if (mq.matches || isMobile) setShow(false);
  }, []);
  if (!show) return null;

  const orbs = [...(PRESETS[preset] ?? PRESETS.default), ...extra];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {orbs.map(({ w, h, color, opacity, blur, top, left, right, bottom, dur, dx, dy }, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: w,
            height: h,
            borderRadius: '50%',
            background: color,
            opacity,
            filter: `blur(${blur}px)`,
            top, left, right, bottom,
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{ x: dx, y: dy }}
          transition={{
            duration: dur,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
            times: [0, 0.25, 0.5, 0.75, 1],
          }}
        />
      ))}
    </div>
  );
};

export default FloatingOrbs;
