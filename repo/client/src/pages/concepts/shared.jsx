import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export const CONCEPTS = [
  {
    id: 'a',
    name: 'Sovereign',
    school: 'Anduril · Helsing · Shield AI',
    one: 'Black, cinematic duotone photography, huge caps grotesk, reticle framing. One ember accent, spent like ammunition.',
  },
  {
    id: 'b',
    name: 'Precision',
    school: 'Groq · Mistral · Together',
    one: 'Warm light, instrument-grade IBM Plex Mono as the display voice, repetition rhetoric, pixel motifs, annotated hardware.',
  },
  {
    id: 'c',
    name: 'Statement',
    school: 'Cohere · Vercel · Palantir',
    one: 'One sentence, one button, one logo wall. Radical restraint that reads as confidence, not emptiness.',
  },
]

export function Switcher({ current }) {
  return (
    <div className="fixed bottom-5 left-1/2 z-[60] -translate-x-1/2">
      <div className="flex items-center gap-1 rounded-full border border-white/15 bg-black/85 px-2.5 py-2 backdrop-blur">
        <span className="px-1.5 font-mono text-[8.5px] uppercase tracking-[0.2em] text-white/35">local</span>
        {CONCEPTS.map((c) => (
          <Link
            key={c.id}
            to={`/concepts/${c.id}`}
            aria-current={c.id === current ? 'page' : undefined}
            className={`flex h-7 items-center justify-center rounded-full px-3 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors ${
              c.id === current ? 'bg-ember text-white' : 'text-white/55 hover:bg-white/10 hover:text-white'
            }`}
          >
            {c.name}
          </Link>
        ))}
        <span className="mx-1 h-4 w-px bg-white/15" aria-hidden />
        <Link to="/concepts" className="flex h-7 items-center rounded-full px-2.5 font-mono text-[11px] text-white/55 transition-colors hover:bg-white/10 hover:text-white">
          index
        </Link>
      </div>
    </div>
  )
}

export function FadeIn({ children, delay = 0, className = '', y = 22 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
