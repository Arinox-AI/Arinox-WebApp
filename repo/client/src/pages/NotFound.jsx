import SEO from '../components/ui/SEO';
import { Label } from '../components/site/Layout';
import { HalftoneBackground } from '../components/site/HalftoneBackground';
import { Button } from '../components/site/Button';

/* 404 — same hero recipe as every page: halftone, hairline, serif headline.
   "Perimeter" wording mirrors the site's own security story. */
const NotFound = () => (
  <>
    <SEO
      title="Page not found | Arinox AI"
      description="This page left the perimeter. Head back to arinox.ai."
      canonical="https://www.arinox.ai/"
    />

    <section className="relative overflow-hidden border-b border-line px-7 pb-20 pt-20 md:pt-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 opacity-70" aria-hidden>
        <HalftoneBackground dotSize={4} spacing={20} dotColor="#ff6301" opacity={0.35} gradient={{ type: 'linear', angle: 90 }} />
      </div>
      <div className="relative mx-auto max-w-6xl">
        <Label>404</Label>
        <h1 className="mt-5 max-w-3xl font-display text-[44px] leading-[1.04] tracking-[-0.025em] md:text-[64px]">
          This page left the <span className="italic text-ember">perimeter.</span>
        </h1>
        <p className="mt-6 max-w-[560px] text-lg leading-relaxed text-ink-soft">
          The page you&apos;re looking for isn&apos;t there — a moved link, a typo, or it never
          existed. Everything else is right where it should be.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button to="/" variant="dark">Back to home</Button>
          <Button to="/contact" variant="ghost">Talk to us</Button>
        </div>
      </div>
    </section>
  </>
);

export default NotFound;