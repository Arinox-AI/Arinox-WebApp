import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LinkedinIcon } from '../components/site/Icons';
import SEO from '../components/ui/SEO';
import { Eyebrow } from '../components/site/Eyebrow';
import { HalftoneBackground } from '../components/site/HalftoneBackground';
import { Pill } from '../components/site/Pill';
import BookingWidget from '../components/booking/BookingWidget';
import { InquiryForm } from '../components/site/InquiryForm';
import { booking } from '../data/booking';
import { inquiries } from '../data/inquiries';
import { company } from '../data/site';

const Contact = () => {
  /* The hub can be deep-linked: /contact?intent=deck&asset=industrial-os
     opens the message tab with the document already picked, and
     /contact?tab=book opens the calendar directly - the Price Discovery
     completion screen sends people here to take the meeting. */
  const [params] = useSearchParams();
  const deepIntent = params.get('intent');
  const deepAsset = params.get('asset');
  const deepTab = params.get('tab');

  const [mode, setMode] = useState(
    deepIntent || deepTab === 'message' ? 'message' : 'book'
  ); // 'book' (calendar) | 'message' (form)

  return (
    <>
      <SEO
        title="Contact Arinox AI | Book a Discovery Session"
        description="Ready to implement private AI in your company? Talk to Arinox, a focused call to map where CommandCore and KOGO fit your operations, strategy, and compliance needs."
        canonical="https://www.arinox.ai/contact"
      />

      <section className="relative overflow-hidden border-b border-line px-7 pb-12 pt-20 text-center md:pt-28">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-56 opacity-70" aria-hidden>
          <HalftoneBackground dotSize={4} spacing={20} dotColor="#ff6301" opacity={0.35} gradient={{ type: 'linear', angle: 90 }} />
        </div>
        <div className="relative mx-auto max-w-3xl">
          <Eyebrow centered>Contact</Eyebrow>
          <h1 className="font-display text-[40px] leading-[1.06] tracking-[-0.025em] md:text-[62px]">
            Book a <span className="italic text-ember">discovery session.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-[560px] text-lg leading-relaxed text-ink-soft">
            One focused call. We map where intelligent AI fits your operations, strategy, and
            compliance needs, free, and the map is yours whatever you decide.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 font-mono text-[11.5px] text-ink-faint">
            <Pill>zero jargon</Pill>
            <Pill>zero commitment</Pill>
            <Pill>map is yours either way</Pill>
          </div>
          <div role="tablist" aria-label="How would you like to reach us?" className="mt-8 inline-flex overflow-hidden rounded-btn border border-ink">
            {[['message', booking.tabs.message], ['book', booking.tabs.book]].map(([k, label]) => (
              <button
                key={k} type="button" role="tab" aria-selected={mode === k} onClick={() => setMode(k)}
                className={`chip px-6 py-3 text-[12px] transition-colors ${mode === k ? 'bg-ink text-white' : 'bg-white text-ink hover:bg-paper-2'}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-28">
        <div className="mx-auto grid max-w-6xl items-start gap-12 px-7 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          {mode === 'book' ? (
            <BookingWidget />
          ) : (
            <InquiryForm
              id="contact"
              subjects={inquiries.subjects}
              assets={inquiries.assets}
              initialIntent={deepIntent}
              initialAsset={deepAsset}
              label={inquiries.form.label}
              note={inquiries.form.note}
              success={inquiries.form.success}
              cta={inquiries.form.cta}
              form={inquiries.form}
              pricingSurvey={inquiries.pricingSurvey}
              messageRequired
            />
          )}

          <div>
            <div className="mb-8 card-light p-7">
              <h4 className="font-display text-lg">Offices</h4>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {company.offices.map(({ city, note }) => (
                  <div key={city}>
                    <p className="text-[15px] font-medium">{city}</p>
                    <p className="mt-0.5 text-xs text-ink-faint">{note}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-8 card-light p-7">
              <h4 className="font-display text-lg">Direct</h4>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                <a href={`mailto:${company.email}`} className="font-medium text-ink underline underline-offset-2">
                  {company.email}
                </a>{' '}
                · <a href={`tel:${company.phone.replace(/\s/g, '')}`} className="font-medium text-ink underline underline-offset-2">{company.phone}</a>
              </p>
              <a
                href={company.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ember-deep transition-opacity hover:opacity-75"
              >
                <LinkedinIcon size={15} />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
