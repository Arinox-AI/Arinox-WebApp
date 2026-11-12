import SEO from '../components/ui/SEO'
import { Section } from '../components/site/Section'
import { Label } from '../components/site/Layout'
import { Button } from '../components/site/Button'
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
          <div key={p.name} className="group overflow-hidden card-light">
            <div className="aspect-square overflow-hidden bg-paper-2">
              <img
                src={p.photo}
                alt={p.name}
                loading="lazy"
                className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
            </div>
            <div className="p-4">
              <p className="font-display text-[16px] leading-tight tracking-[-0.01em]">{p.name}</p>
              <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-ember-deep">{p.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

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
      <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {gallery.map((g) => (
          <figure key={g.photo}>
            <div className="img-frame aspect-[4/3] overflow-hidden rounded-xl border border-line">
              <img src={img(g.photo)} alt={g.caption} loading="lazy" className="h-full w-full object-cover" />
            </div>
            <figcaption className="mt-3 text-[13.5px] leading-relaxed text-ink-soft">{g.caption}</figcaption>
          </figure>
        ))}
      </div>
      <div className="mt-12 flex flex-wrap gap-3.5">
        <Button to="/careers" variant="dark">Join us</Button>
        <Button to="/contact" variant="ghost">Talk to the team</Button>
      </div>
    </Section>

    <CtaBand title={people.ctaTitle} offer={people.ctaOffer} />
  </>
)

export default People
