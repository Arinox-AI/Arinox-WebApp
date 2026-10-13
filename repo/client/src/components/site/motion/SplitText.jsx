import { motion, useReducedMotion } from 'framer-motion';

/* SplitText — headline words rise in, one by one, when scrolled into view.
   Technique: ReactBits "Split Text" (MIT), kept on framer-motion only.
   `words` = [{ t: 'plain words', accent: 'optional classes on that unit' }].
   A single aria-label keeps the heading readable to AT. */
export function SplitText({ words, className = '', tag: Tag = 'h1', step = 0.055 }) {
  const reduced = useReducedMotion();

  let cursor = 0;
  return (
    <Tag className={className}>
      <motion.span
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
        variants={{ hidden: {}, show: {} }}
        aria-label={words.map((w) => w.t).join(' ')}
        className="block"
      >
        {words.map((w) => (
          <span key={w.t} className={w.accent || undefined} aria-hidden>
            {w.t.split(/\s+/).filter(Boolean).map((word) => {
              const i = cursor++;
              return (
                <motion.span
                  key={`${w.t}-${word}`}
                  className="inline-block will-change-transform"
                  variants={{
                    hidden: { opacity: 0, y: reduced ? 0 : 16 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * step },
                    },
                  }}
                >
                  {word}
                  {'\u00A0'}
                </motion.span>
              );
            })}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}