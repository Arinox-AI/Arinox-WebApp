import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { Switcher, FadeIn } from './shared'
import { commandCoreIntro, whatItIs, powerUseCases } from '../../data/commandcore'
import { anchorDeployment } from '../../data/caseStudies'
import { company } from '../../data/site'

const TRUST = [
  ['/images/logos/ibm.svg', 'IBM', 100],
  ['/images/logos/hpe.svg', 'HPE', 94],
  ['/images/logos/hitachi.svg', 'Hitachi', 132],
  ['/images/logos/hcltech.svg', 'HCL Tech', 132],
  ['/images/logos/NVIDIA_logo.svg', 'NVIDIA', 82],
  ['/images/logos/indian-army.png', 'Indian Army', 50],
  ['/images/logos/Coforge.webp', 'Coforge', 122],
  ['/images/logos/hul.svg', 'HUL', 100],
]

export default function ConceptC() {
  return (
    <div className="min-h-screen bg-[#FBFAF8] text-[#141311] antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:ital,wdth,wght@0,62..125,100..900;1,62..125,100..900&display=swap');
        .grotesk { font-family: 'Archivo', 'Inter Tight', sans-serif; }
      `}</style>

      <header className="border-b border-black/[0.07]">
        <div className="mx-auto flex h-[64px] max-w-6xl items-center justify-between px-7">
          <img src="/images/brand/logo-black.png" alt="Arinox" className="h-[19px] w-auto" />
          <nav className="grotesk hidden items-center gap-8 text-[14px] text-black/60 md:flex">
            <a href="#machine" className="transition-colors hover:text-black">CommandCore</a>
            <a href="#proof" className="transition-colors hover:text-black">Deployments</a>
            <a href="#sectors" className="transition-colors hover:text-black">Sectors</a>
          </nav>
          <Link to="/contact" className="grotesk rounded-full bg-[#141311] px-5 py-2.5 text-[13.5px] font-medium text-white transition-colors hover:bg-black">
            Book a session
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-7 pb-14 pt-24 md:pb-20 md:pt-36">
        <FadeIn>
          <h1 className="grotesk mx-auto max-w-[17ch] text-center text-[52px] font-semibold leading-[1.0] tracking-[-0.03em] md:text-[88px]">
            Your data. Your premises. Your AI.
          </h1>
          <p className="mx-auto mt-7 max-w-lg text-center text-[16.5px] leading-relaxed text-black/55">
            Arinox implements private AI end to end — on CommandCore, a sovereign AI appliance,
            or inside your own infrastructure. Zero data egress, every decision auditable.
          </p>
          <div className="mt-10 flex items-center justify-center gap-3.5">
            <Link to="/contact" className="grotesk inline-flex items-center gap-2 rounded-full bg-[#141311] px-7 py-4 text-[14.5px] font-medium text-white transition-colors hover:bg-black">
              Book a discovery session <ArrowRight size={15} />
            </Link>
            <a href="#machine" className="grotesk inline-flex items-center gap-2 rounded-full border border-black/15 px-7 py-4 text-[14.5px] font-medium transition-colors hover:border-black/45">
              See the machine
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.15} className="mt-20 md:mt-28">
          <div className="grid items-end gap-x-10 gap-y-6 md:grid-cols-6">
            {TRUST.map(([src, alt, w]) => (
              <img key={alt} src={src} alt={alt} style={{ width: w }} className="mx-auto w-auto object-contain opacity-45 transition-opacity hover:opacity-90" />
            ))}
          </div>
          <p className="grotesk mt-8 text-center text-[12.5px] text-black/40">
            IBM · HPE · Hitachi · HCLTech · NVIDIA · Indian Army · Coforge · Hindustan Unilever
          </p>
        </FadeIn>
      </section>

      <section id="machine" className="border-t border-black/[0.07] bg-white">
        <div className="mx-auto max-w-6xl px-7 py-20 md:py-28">
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <FadeIn>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-[#D0500A]">The platform</p>
              <h2 className="grotesk mt-4 text-[34px] font-semibold leading-[1.05] tracking-[-0.025em] md:text-[46px]">
                {commandCoreIntro.title}
              </h2>
              <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-black/55">{commandCoreIntro.lead}</p>
              <div className="mt-9 grid gap-x-8 gap-y-7 sm:grid-cols-3">
                {[
                  ['100%', 'AI, local'],
                  ['0%', 'internet egress'],
                  ['100%', 'actions audited'],
                ].map(([big, small]) => (
                  <div key={small} className="border-t border-black/15 pt-4">
                    <p className="grotesk text-[30px] font-semibold leading-none tracking-[-0.02em]">{big}</p>
                    <p className="grotesk mt-1.5 text-[13px] text-black/50">{small}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="relative rounded-2xl border border-black/[0.08] bg-[#F6F5F2] px-10 py-14">
                <img
                  src="/images/commandcore/commandcore-xl2.webp"
                  alt="CommandCore XL"
                  className="mx-auto max-h-[330px] w-auto drop-shadow-[0_36px_50px_rgba(20,19,17,0.22)]"
                />
                <div className="absolute left-6 top-6 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80]" aria-hidden />
                  <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-black/40">air-gapped · verified at boot</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-7 py-20 md:py-28">
        <FadeIn>
          <h2 className="grotesk max-w-xl text-[32px] font-semibold leading-[1.06] tracking-[-0.025em] md:text-[44px]">
            Everything the demo promised. Deployed.
          </h2>
        </FadeIn>
        <div className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
          {whatItIs.map((w, i) => (
            <FadeIn key={w.title} delay={i * 0.05}>
              <p className="grotesk text-[17px] font-semibold tracking-[-0.01em]">{w.title}</p>
              <p className="mt-2.5 text-[14.5px] leading-relaxed text-black/55">{w.desc}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      <section id="proof" className="border-t border-black/[0.07] bg-[#141311] text-[#F2EFEA]">
        <div className="mx-auto max-w-6xl px-7 py-20 md:py-28">
          <FadeIn>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ember-lite">{anchorDeployment.label} — {anchorDeployment.client}</p>
            <h2 className="grotesk mt-5 max-w-2xl text-[32px] font-semibold leading-[1.05] tracking-[-0.025em] text-white md:text-[44px]">
              {anchorDeployment.headline}
            </h2>
          </FadeIn>
          <div className="mt-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <FadeIn>
              {anchorDeployment.body.map((p) => (
                <p key={p.slice(0, 20)} className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/55 first:mt-0">{p}</p>
              ))}
            </FadeIn>
            <FadeIn delay={0.08}>
              <ul>
                {anchorDeployment.capabilities.map((c) => (
                  <li key={c} className="flex items-start gap-3 border-b border-white/10 py-3.5 text-[14px] leading-relaxed text-white/65">
                    <Check size={15} className="mt-[4px] shrink-0 text-ember" />{c}
                  </li>
                ))}
              </ul>
              <p className="mt-6 font-mono text-[10.5px] uppercase leading-relaxed tracking-[0.14em] text-white/35">
                {anchorDeployment.metricSlot.label} — {anchorDeployment.metricSlot.note}
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <section id="sectors" className="mx-auto max-w-6xl px-7 py-20 md:py-28">
        <FadeIn>
          <h2 className="grotesk max-w-xl text-[30px] font-semibold leading-[1.06] tracking-[-0.025em] md:text-[40px]">
            Deployed where the constraints are hardest.
          </h2>
        </FadeIn>
        <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {powerUseCases.map((s, i) => (
            <FadeIn key={s.sector} delay={i * 0.05}>
              <div className="flex items-center gap-3 border-t border-black/15 pt-5">
                <img src={s.image} alt="" className="h-9 w-9" />
                <p className="grotesk text-[15.5px] font-semibold tracking-[-0.01em]">{s.sector}</p>
              </div>
              <ul className="mt-3.5 space-y-1.5">
                {s.items.slice(0, 3).map((it) => (
                  <li key={it} className="text-[13.5px] leading-relaxed text-black/55">{it}</li>
                ))}
              </ul>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="border-t border-black/[0.07]">
        <div className="mx-auto max-w-6xl px-7 py-24 text-center md:py-32">
          <FadeIn>
            <h2 className="grotesk mx-auto max-w-[16ch] text-[40px] font-semibold leading-[1.02] tracking-[-0.03em] md:text-[60px]">
              Start with one workflow.
            </h2>
            <p className="mx-auto mt-6 max-w-md text-[16px] leading-relaxed text-black/55">
              A free working session. We map the first workflow worth transforming — the roadmap is yours either way.
            </p>
            <div className="mt-10 flex items-center justify-center gap-3.5">
              <Link to="/contact" className="grotesk inline-flex items-center gap-2 rounded-full bg-[#141311] px-7 py-4 text-[14.5px] font-medium text-white transition-colors hover:bg-black">
                Book a discovery session <ArrowRight size={15} />
              </Link>
            </div>
            <p className="grotesk mt-10 text-[13px] text-black/40">{company.tagline}</p>
          </FadeIn>
        </div>
      </section>

      <Switcher current="c" />
    </div>
  )
}
