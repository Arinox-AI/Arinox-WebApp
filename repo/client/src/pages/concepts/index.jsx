import { Routes, Route, Navigate, Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { CONCEPTS, Switcher } from './shared'
import ConceptA from './ConceptA'
import ConceptB from './ConceptB'
import ConceptC from './ConceptC'

const SWATCH = { a: 'bg-[#0A0A0B]', b: 'bg-[#F4F2EC]', c: 'bg-[#FBFAF8]' }

function Hub() {
  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#F2EFEA]">
      <div className="mx-auto max-w-6xl px-7 pb-32 pt-16 md:pt-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/45">
          Local preview · studied from 100+ live references
        </p>
        <h1 className="font-display mt-6 max-w-3xl text-[44px] leading-[1.04] tracking-[-0.025em] text-phos md:text-[64px]">
          Landing directions for <span className="italic text-ember">Arinox.</span>
        </h1>
        <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-ghost">
          Each direction is rebuilt from a school actually studied this session — defense-tech
          sovereign (Anduril, Helsing, Shield AI), instrument precision (Groq, Mistral, Together),
          and radical statement minimalism (Cohere, Vercel, Palantir). Library icons and your real
          assets only. Dev builds only.
        </p>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {CONCEPTS.map((c) => (
            <Link
              key={c.id}
              to={`/concepts/${c.id}`}
              className="group rounded-xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-ember/50"
            >
              <div className={`h-16 w-full rounded-lg ${SWATCH[c.id]} border border-white/10`} />
              <div className="mt-5 flex items-center justify-between">
                <h2 className="font-display text-[22px] tracking-[-0.01em]">{c.name}</h2>
                <ArrowUpRight size={15} className="text-ember transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
              <p className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.14em] text-white/35">{c.school}</p>
              <p className="mt-3 text-[13.5px] leading-relaxed text-white/50">{c.one}</p>
            </Link>
          ))}
        </div>

        <p className="mt-14 font-mono text-[11px] text-white/30">
          npm run dev → /concepts · stripped from production builds
        </p>
      </div>
      <Switcher current="" />
    </div>
  )
}

export default function Concepts() {
  return (
    <Routes>
      <Route index element={<Hub />} />
      <Route path="a" element={<ConceptA />} />
      <Route path="b" element={<ConceptB />} />
      <Route path="c" element={<ConceptC />} />
      <Route path="*" element={<Navigate to="/concepts" replace />} />
    </Routes>
  )
}
