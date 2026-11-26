import { Label } from './Layout'
import { Marquee } from './Marquee'
import { trustedLogos } from '../../data/site'

/* Trusted-by logo carousel, shared by Home and Solutions. The Marquee track
   holds two IDENTICAL halves (it renders the children twice itself), so the
   -50% loop seam never jumps. Logo sizes live with the data (data/site.js). */
export function TrustedStrip({ className = '' }) {
  return (
    <section className={`border-t border-line py-12 ${className}`} data-trusted-strip>
      <div className="mb-9 flex justify-center">
        <Label>Trusted by leaders</Label>
      </div>
      <div className="relative overflow-hidden">
        <Marquee duration={44}>
          <div className="flex items-center gap-16 pr-16">
            {trustedLogos.map((l) => (
              <img
                key={l.alt}
                src={l.src}
                alt={l.alt}
                loading="lazy"
                style={{ width: l.w, height: l.h }}
                className="shrink-0 object-contain opacity-55 transition-opacity duration-200 hover:opacity-90"
              />
            ))}
          </div>
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-paper to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-paper to-transparent" />
      </div>
    </section>
  )
}
