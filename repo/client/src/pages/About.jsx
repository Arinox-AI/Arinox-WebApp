import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEO from '../components/ui/SEO';
import Reveal from '../components/ui/Reveal';
import SectionHead from '../components/ui/SectionHead';
import { img } from '../data/images';
import { story, values, team, advisors, gallery, company } from '../data/site';

const photoByKey = { ajay: 'ajay', chytra: 'chytra', uday: 'uday', venu: 'venu', repswal: 'repswal', aniruddha: 'aniruddha' };

const About = () => (
  <>
    <SEO
      title="Company | Arinox AI"
      description="Arinox AI — an AI transformation company based in Bengaluru and New Delhi, recognised by Startup India (DPIIT). We help enterprises implement private AI through CommandCore and the KOGO agentic layer."
      canonical="https://www.arinox.ai/about"
    />

    {/* ── Hero + story ──────────────────────────────────────── */}
    <section className="pt-32 md:pt-40 pb-16 md:pb-20 border-b border-brand-border">
      <div className="container-wide grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="overline">Company</p>
            <h1 className="text-4xl md:text-5xl font-display font-extrabold leading-[1.08] mb-8 max-w-2xl">
              We&rsquo;re building the private AI layer for enterprise India.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            {story.paragraphs.map((p, i) => (
              <p key={i} className={`mb-4 max-w-2xl ${i === 0 ? 'lead' : 'text-[14.5px] text-brand-muted leading-relaxed'}`}>
                {p}
              </p>
            ))}
          </Reveal>
        </div>
        <div className="lg:col-span-4 lg:col-start-9">
          <Reveal delay={0.15}>
            <div className="card p-6 sticky top-28">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-subtle mb-4" style={{ fontFamily: 'Manrope' }}>
                Facts
              </p>
              <ul className="space-y-3.5">
                {story.facts.map(({ label, value }) => (
                  <li key={label} className="flex items-baseline justify-between gap-3 border-b border-brand-border pb-3 last:border-0 last:pb-0">
                    <span className="text-[11px] uppercase tracking-wider text-brand-subtle shrink-0">{label}</span>
                    <span className="text-[13.5px] font-semibold text-brand-text text-right">{value}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-lg bg-brand-primary/[0.06] border border-brand-primary/20 px-4 py-3">
                <p className="text-[12px] font-semibold text-brand-secondary">Recognised by Startup India (DPIIT)</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>

    {/* ── Values ────────────────────────────────────────────── */}
    <section className="section-padding">
      <div className="container-wide">
        <SectionHead
          overline="Values"
          title="How we work."
          className="mb-10"
        />
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {values.map(({ letter, title, desc }, i) => (
            <Reveal key={letter} delay={i * 0.06} className="h-full">
              <div className="card card-hover p-5 h-full">
                <p className="step-num text-2xl mb-3">{letter}</p>
                <h3 className="font-display font-bold text-[14px] mb-1.5">{title}</h3>
                <p className="text-[12.5px] text-brand-muted leading-relaxed">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* ── Leadership ────────────────────────────────────────── */}
    <section className="section-padding bg-brand-surface border-y border-brand-border">
      <div className="container-wide">
        <SectionHead
          overline="Leadership"
          title="Architects of change."
          className="mb-10"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {team.map(({ name, role, bio, photo }, i) => (
            <Reveal key={name} delay={i * 0.08}>
              <div className="card card-hover overflow-hidden h-full">
                <div className="aspect-[4/3] overflow-hidden bg-brand-bg">
                  <img src={img(photoByKey[photo])} alt={name} loading="lazy" className="w-full h-full object-cover object-[center_top]" />
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-[15px]">{name}</h3>
                  <p className="text-xs text-brand-primary font-semibold mb-2 mt-0.5">{role}</p>
                  <p className="text-[13px] text-brand-muted leading-relaxed">{bio}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <SectionHead
          overline="Advisory board"
          title="Guided by depth."
          className="mb-10"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {advisors.map(({ name, role, bio, photo }, i) => (
            <Reveal key={name} delay={i * 0.08}>
              <div className="card card-hover p-6 text-center h-full">
                <div className="w-28 h-28 rounded-full overflow-hidden mx-auto mb-4 border-2 border-brand-primary/25">
                  <img src={img(photoByKey[photo])} alt={name} loading="lazy" className="w-full h-full object-cover" />
                </div>
                <h3 className="font-display font-bold text-[15px]">{name}</h3>
                <p className="text-xs text-brand-primary font-semibold mt-0.5 mb-2">{role}</p>
                <p className="text-[13px] text-brand-muted leading-relaxed">{bio}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* ── On the ground ─────────────────────────────────────── */}
    <section className="section-padding">
      <div className="container-wide">
        <SectionHead
          overline="On the ground"
          title="Where the work shows up."
          lead="Industry forums, partner stages, and government briefings — the journey of building enterprise AI in India, in pictures."
          className="mb-10"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {gallery.map(({ photo, caption }, i) => (
            <Reveal key={photo} delay={(i % 4) * 0.06}>
              <figure className="group">
                <div className="img-frame aspect-[4/3]">
                  <img
                    src={img(photo)}
                    alt={caption}
                    loading="lazy"
                    className="transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <figcaption className="text-[12px] text-brand-muted leading-snug mt-2.5 px-1">{caption}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* ── CTA ───────────────────────────────────────────────── */}
    <section className="band-ink">
      <div className="container-wide py-20 text-center max-w-3xl">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold leading-[1.15] mb-5">
            Come build with us.
          </h2>
          <p className="lead mb-8" style={{ color: 'rgba(242,239,233,0.72)' }}>
            Whether you&rsquo;re an enterprise ready to implement private AI, or exceptional people who want to build it — we&rsquo;d like to talk.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/contact" className="btn btn-on-dark">
              Talk to us <ArrowRight size={16} />
            </Link>
            <Link to="/careers" className="btn btn-on-dark-ghost">
              Join the team
            </Link>
          </div>
          <p className="text-[11px] text-white/40 mt-8">
            {company.entity} · {company.entityNote}
          </p>
        </Reveal>
      </div>
    </section>
  </>
);

export default About;
