import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import SEO from '../components/ui/SEO';
import DemoLink from '../components/ui/DemoLink';

const featured = [
  { slug: 'indian-army-dgis', client: { name: 'Indian Army (DGIS)', industry: 'Defense' }, challenge: 'Disconnected legacy systems preventing real-time situational awareness and alert triage.', solution: 'KOGO Sentinel + on-prem LLaMA-4', results: [{ value: '−82%', metric: 'Alert-triage time' }, { value: '100%', metric: 'On-premises, sovereign' }] },
  { slug: 'fortune500-cloud-cost', client: { name: 'Fortune 500 Client', industry: 'Manufacturing' }, challenge: 'Cloud bill spiralling with no visibility into resource utilisation across multiple regions.', solution: 'KOGO FinOps + AutoML Agent', results: [{ value: '−31%', metric: 'Cloud bill reduction' }, { value: '12mo', metric: 'ROI payback period' }] },
  { slug: 'insurance-claims-ai', client: { name: 'Insurance Enterprise', industry: 'Healthcare / Insurance' }, challenge: 'Manual claims processing causing bottlenecks and high per-FTE cost.', solution: 'KOGO Claim-QA Agent', results: [{ value: '2×', metric: 'Claims processed per FTE' }, { value: '70%', metric: 'Faster settlement' }] },
  { slug: 'global-bpo-helpdesk', client: { name: 'Global BPO', industry: 'BPO / Technology' }, challenge: 'High ticket backlog and expensive cloud costs in BPO operations.', solution: 'KOGO Helpdesk Mesh', results: [{ value: '+18%', metric: 'Ticket capacity' }, { value: '−28%', metric: 'Cloud cost reduction' }] },
];

const CaseStudies = () => {
  const [studies, setStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/v1/case-studies')
      .then(({ data }) => setStudies(data.data.length ? data.data : featured))
      .catch(() => setStudies(featured))
      .finally(() => setLoading(false));
  }, []);

  const display = studies.length ? studies : featured;

  return (
    <>
      <SEO
        title="Case Studies — Arinox AI Real-World Results"
        description="See how Arinox AI delivers measurable results — from −82% alert-triage time for the Indian Army to multi-million dollar savings for Fortune 500 enterprises. Real clients, real outcomes."
        canonical="https://www.arinox.ai/case-studies"
      />

      {/* Hero */}
      <section className="relative pt-40 pb-20 grid-bg overflow-hidden">
        <div className="orb w-[400px] h-[400px] bg-brand-accent/8 top-0 right-1/4 -translate-y-1/4" />
        <div className="container-wide relative">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs tracking-widest uppercase text-brand-primary mb-4">Impact</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl md:text-7xl font-display font-bold text-white mb-4">
            Real Clients.<br /><span className="text-gradient">Real Results.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-brand-muted">
            Tangible outcomes, delivered in 90 days or less.
          </motion.p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          {loading ? (
            <div className="grid md:grid-cols-2 gap-6">
              {Array.from({ length: 4 }).map((_, i) => <div key={i} className="glass-card rounded-2xl h-64 animate-pulse" />)}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {display.map((study, i) => (
                <motion.div key={study.slug || i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <Link to={`/case-studies/${study.slug}`} className="glass-card rounded-2xl p-8 block group h-full">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h2 className="text-white font-bold text-xl mb-1">{study.client.name}</h2>
                        <span className="text-xs px-2 py-1 rounded-full bg-brand-primary/10 text-brand-primary">{study.client.industry}</span>
                      </div>
                      <div className="text-3xl font-bold text-gradient">{study.client.name[0]}</div>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs text-brand-muted uppercase tracking-widest mb-1">Challenge</p>
                      <p className="text-sm text-brand-muted leading-relaxed">{study.challenge}</p>
                    </div>

                    <div className="mb-6">
                      <p className="text-xs text-brand-primary uppercase tracking-widest mb-1">Solution</p>
                      <p className="text-sm text-white">{study.solution}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-auto">
                      {study.results.map(({ value, metric }) => (
                        <div key={metric} className="text-center p-3 rounded-xl bg-brand-bg/60 border border-brand-border">
                          <div className="text-2xl font-display font-bold text-brand-accent">{value}</div>
                          <div className="text-xs text-brand-muted mt-1">{metric}</div>
                        </div>
                      ))}
                    </div>

                    <p className="text-xs text-brand-primary mt-4 group-hover:underline">Read full case study →</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20">
        <div className="orb w-96 h-96 bg-brand-primary/15 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="container-wide text-center relative">
          <h2 className="text-4xl font-display font-bold text-white mb-4">Your case study starts <span className="text-gradient">here.</span></h2>
          <DemoLink className="inline-flex px-10 py-4 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold hover:opacity-90 transition-all">
            Start Your Transformation →
          </DemoLink>
        </div>
      </section>
    </>
  );
};

export default CaseStudies;
