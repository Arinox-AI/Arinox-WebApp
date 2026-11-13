import SEO from '../components/ui/SEO'
import { Section } from '../components/site/Section'
import { Label } from '../components/site/Layout'
import { HalftoneBackground } from '../components/site/HalftoneBackground'
import { CtaBand } from '../components/site/Shell'
import { team, advisors, gallery, people } from '../data/site'
import { img } from '../data/images'

function PersonGroup({ label, list }) {
  const layout = list.length > 3
    ? 'lg:grid-cols-4'
    : 'lg:grid-cols-3 mx-auto max-w-[51.5rem]'
  return (
    <div>
      <div className="mb-8 flex items-center gap-4">
        <span className="eyebrow text-ember-deep">{label}</span>
        <span className="h-px flex-1 bg-line" aria-hidden />
      </div>
      <div className={`grid gap-4 sm:grid-cols-2 ${layout}`}>
        {list.map((p) => (
          <div key={p.name} className="group">
            <div className="aspect-square overflow-hidden bg-paper-2">
              <img
                src={p.photo}
                alt={p.name}
                loading="lazy"
                className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>
            <div className="mt-3 border-t border-ink/80 pt-3">
              <p className="font-display text-[17px] leading-tight tracking-[-0.01em]">{p.name}</p>
              <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-ember-deep">{p.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const [lead, ...rest] = gallery

const People = () => (
  <>
    <SEO
      title="People | Leadership & Advisors | Arinox AI"
      description="Meet the leadership team and advisors behind Arinox AI, the Bengaluru-based AI transformation company building private, sovereign AI."
      canonical="https://www.arinox.ai/people"
    />

    <section className="relative overflow-hidden px-7 pb-10 pt-20 md:pt-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 opacity-70" aria-hidden>
        <HalftoneBackground dotSize={4} spacing={20} dotColor="#ff6301" opacity={0.35} gradient={{ type: 'linear', angle: 90 }} />
      </div>
      <div className="relative mx-auto max-w-[68.5rem]">
        <Label>{people.eyebrow}</Label>
        <h1 className="mt-5 max-w-3xl font-display text-[40px] leading-[1.06] tracking-[-0.025em] md:text-[62px]">
          {people.title}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">{people.intro}</p>
      </div>
    </section>

    <Section border={false}>
      <div className="space-y-16">
        <PersonGroup label={people.leadershipLabel} list={team} />
        <PersonGroup label={people.advisorsLabel} list={advisors} />
      </div>
    </Section>

    <Section border eyebrow={people.galleryEyebrow} title={people.galleryTitle}>
      <div className="grid gap-x-10 gap-y-8 lg:grid-cols-12">
        <figure className="lg:col-span-8">
          <div className="aspect-[3/2] overflow-hidden bg-paper-2">
            <img src={img(lead.photo)} alt={`${lead.event}: ${lead.caption}`} loading="lazy" className="h-full w-full object-cover" />
          </div>
        </figure>
        <div className="border-t border-ink/80 pt-4 lg:col-span-4 lg:self-end">
          <p className="font-mono text-[11.5px] uppercase tracking-[0.1em] text-ember-deep">{lead.event}</p>
          <p className="mt-3 font-display text-[24px] leading-[1.2] tracking-[-0.01em]">{lead.caption}</p>
        </div>
      </div>
      <div className="mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((g) => (
          <figure key={g.photo}>
            <div className="aspect-[4/3] overflow-hidden bg-paper-2">
              <img src={img(g.photo)} alt={`${g.event}: ${g.caption}`} loading="lazy" className="h-full w-full object-cover" />
            </div>
            <figcaption className="mt-3 border-t border-line pt-3">
              <span className="block font-mono text-[11.5px] uppercase tracking-[0.1em] text-ink-faint">{g.event}</span>
              <span className="mt-1.5 block text-[14px] leading-relaxed text-ink-soft">{g.caption}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>

    <CtaBand
      title={people.ctaTitle}
      offer={people.ctaOffer}
      primary={{ label: 'Join us', to: '/careers' }}
    />
  </>
)

export default People
