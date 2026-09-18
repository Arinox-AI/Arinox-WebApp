import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowUpRight } from 'lucide-react';
import SEO from '../components/ui/SEO';
import { Label } from '../components/site/Layout';
import { HalftoneBackground } from '../components/site/HalftoneBackground';
import { CtaBand } from '../components/site/Shell';
import { img } from '../data/images';

const aksImg             = img('aks-workshop');
const ansrImg            = img('ansr-workshop');
const nvidiaImg          = img('nvidia-workshop');
const hitachiImg         = img('hitachi-shori');
const aiSummitImg        = img('ai-summit');
const sovereignLaunchImg = img('sovereign-launch');
const hitachiSystemsImg  = img('hitachi-systems');
const indianGovImg       = img('indian-gov');
const bharatDigitalImg   = img('bharat-digital');

const AI_FINANCE_IMG   = img('banking');
const SERVER_ROOM_IMG  = img('commandcore-hero');
const FACTORY_AUTO_IMG = img('technology');

export const samplePosts = [
  {
    _id: 'e1',
    slug: 'aks-workshop-global-sovereign-ai',
    title: 'AKS Workshop Global: Sovereign AI for Kubernetes-Native Enterprises',
    excerpt: 'Arinox AI joined global CIOs and cloud architects at the AKS Workshop Global to demonstrate how Kubernetes-native deployments can achieve full data sovereignty without sacrificing performance, using CommandCore™ as the on-premises AI substrate.',
    image: aksImg,
    author: { name: 'Arinox AI Team', role: 'Events & Innovation' },
    category: 'Events',
    domain: 'Enterprise AI',
    publishedAt: '2025-11-09',
    readTime: 5,
  },
  {
    _id: 'e2',
    slug: 'ansr-tech-workshop-agentic-ai-gcc',
    title: 'ANSR Tech Workshop: Agentic AI Meets Global Capability Centre Operations',
    excerpt: 'At the ANSR Tech Workshop in July, Arinox AI explored how agentic AI systems are redefining the role of Global Capability Centres, shifting them from cost arbitrage hubs to autonomous intelligence factories.',
    image: ansrImg,
    imagePosition: 'center 35%',
    author: { name: 'Arinox AI Team', role: 'Events & Innovation' },
    category: 'Events',
    domain: 'GCC & Outsourcing',
    publishedAt: '2025-07-04',
    readTime: 6,
  },
  {
    _id: 'e3',
    slug: 'nvidia-workshop-h100-enterprise-ai',
    title: 'NVIDIA Workshop: Unlocking H100 Performance for Enterprise Sovereign AI',
    excerpt: 'Arinox AI joined NVIDIA\u2019s enterprise workshop to showcase how CommandCore harnesses H100 GPU clusters for real-time, on-premises AI inference, hyperscaler performance without hyperscaler dependency.',
    image: nvidiaImg,
    author: { name: 'Arinox AI Team', role: 'Events & Innovation' },
    category: 'Events',
    domain: 'Infrastructure',
    publishedAt: '2025-06-26',
    readTime: 6,
  },
  {
    _id: 'e4',
    slug: 'hitachi-shori-2026-industrial-ai',
    title: 'Hitachi Shori 2026: Industrial Intelligence at the Sovereign Edge',
    excerpt: 'Arinox AI was featured at Hitachi Shori 2026, an elite gathering of industrial leaders, to present how sovereign AI and agentic automation are transforming manufacturing, supply chain, and operational technology environments.',
    image: hitachiImg,
    imagePosition: 'top',
    author: { name: 'Arinox AI Team', role: 'Events & Innovation' },
    category: 'Events',
    domain: 'Industrial AI',
    publishedAt: '2026-05-07',
    readTime: 7,
  },
  {
    _id: 'e6',
    slug: 'langoor-arinox-sovereign-ai-launch',
    title: 'Langoor & Arinox Launch Sovereign AI: Marketing Transforms Into Autonomous Execution',
    excerpt: 'In a landmark broadcast on AIM\u2019s Front Page, Langoor and Arinox AI announced the joint launch of a sovereign AI platform built for marketing intelligence, turning campaign strategy into fully autonomous, on-premises AI execution without a single token leaving the enterprise.',
    image: sovereignLaunchImg,
    imagePosition: 'center 25%',
    author: { name: 'Arinox AI Team', role: 'Events & Innovation' },
    category: 'Events',
    domain: 'Marketing AI',
    publishedAt: '2026-05-09',
    readTime: 5,
  },
  {
    _id: 'e7',
    slug: 'hitachi-systems-india-partnership',
    title: 'Hitachi Systems India: Expanding the Sovereign AI SI Network',
    excerpt: 'Arinox AI formalised a strategic partnership with Hitachi Systems India, extending CommandCore\u2122 sovereign AI deployments into manufacturing, logistics, and government enterprise sectors through one of India\u2019s most trusted system integration networks.',
    image: hitachiSystemsImg,
    imagePosition: 'center 35%',
    author: { name: 'Arinox AI Team', role: 'Events & Innovation' },
    category: 'Events',
    domain: 'Enterprise AI',
    publishedAt: '2026-05-21',
    readTime: 4,
  },
  {
    _id: 'e8',
    slug: 'government-engagement-sovereign-ai-india',
    title: 'Government Engagement: Sovereign AI Briefing for India\u2019s Public Sector',
    excerpt: 'Arinox AI engaged senior officials from India\u2019s central and state government agencies to present CommandCore\u2122 as a sovereign AI platform for public sector digital transformation, with full data localisation, on-premises deployment, and compliance-ready agent governance.',
    image: indianGovImg,
    author: { name: 'Arinox AI Team', role: 'Events & Innovation' },
    category: 'Events',
    domain: 'Government & Defence',
    publishedAt: '2026-04-23',
    readTime: 5,
  },
  {
    _id: 'e9',
    slug: 'bharat-digital-summit-bdia',
    title: 'Bharat Digital Summit: Arinox at BDIA\u2019s Foundation Forum for India\u2019s Digital Future',
    excerpt: 'Arinox AI joined India\u2019s leading technologists, policymakers, and enterprise leaders at the Bharat Digital Summit, BDIA\u2019s Foundation Forum, contributing to the roadmap for India\u2019s sovereign digital infrastructure and AI-first public services.',
    image: bharatDigitalImg,
    imagePosition: 'center 55%',
    author: { name: 'Arinox AI Team', role: 'Events & Innovation' },
    category: 'Events',
    domain: 'Digital Infrastructure',
    publishedAt: '2026-05-28',
    readTime: 4,
  },
  {
    _id: 'e5',
    slug: 'nvidia-inception-ai-summit-2025',
    title: 'NVIDIA Inception AI Summit: Arinox Showcases Sovereign AI to Indian Defence & Enterprises',
    excerpt: 'At the NVIDIA Inception AI Summit, Arinox AI stood alongside India\u2019s defence leadership and enterprise innovators, demonstrating how CommandCore brings frontier AI to the most security-sensitive environments in the country.',
    image: aiSummitImg,
    imagePosition: 'center 25%',
    author: { name: 'Arinox AI Team', role: 'Events & Innovation' },
    category: 'Events',
    domain: 'Defence & Enterprise',
    publishedAt: '2026-02-18',
    readTime: 5,
  },
  {
    _id: '1',
    slug: 'beyond-offshoring-ai-shoring',
    title: 'Beyond Offshoring: The Macroeconomics of AI-Shoring',
    excerpt: 'Why CFOs will reclassify cloud savings as growth CAPEX, and how the 30-30-30 loop turns theory into cashflow in 90 days.',
    image: AI_FINANCE_IMG,
    author: { name: 'Praveer Kochhar', role: 'Co-Founder, KOGO AI' },
    category: 'AI Strategy',
    domain: 'General',
    publishedAt: '2025-05-01',
    readTime: 7,
  },
  {
    _id: '2',
    slug: 'edge-to-core-ai',
    title: 'Edge-to-Core AI: Turning On-Prem HPC Into a Profit Center',
    excerpt: 'Inside a Tier-1 bank that flipped its dormant DGX cluster into an agent farm and paid off hardware amortisation two quarters early.',
    image: SERVER_ROOM_IMG,
    author: { name: 'P.N. Sudarshan', role: 'Global CTO, HPE' },
    category: 'Technology',
    domain: 'BFSI',
    publishedAt: '2025-04-20',
    readTime: 9,
  },
  {
    _id: '3',
    slug: 'bpo-to-autonomous-ops',
    title: 'From BPO to Autonomous Ops: Building an Agent Factory',
    excerpt: 'A step-by-step walkthrough of how Coforge cut 40% ticket resolution time by roboshoring processes back to on-prem KOGO agents.',
    image: FACTORY_AUTO_IMG,
    author: { name: 'Nikhil Arora', role: 'SVP AI & Automation, Coforge' },
    category: 'Case Study',
    domain: 'Technology',
    publishedAt: '2025-04-10',
    readTime: 8,
  },
];

const categories = ['All', 'Events', 'AI Strategy', 'Case Study', 'Technology', 'Industry Insights', 'Research'];

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');

  useEffect(() => {
    const params = category !== 'All' ? { category } : {};
    axios.get('/api/v1/blog', { params })
      .then(({ data }) => {
        const apiPosts = (data.data || []).map((p) => ({ ...p, image: p.image ?? p.coverImage }));
        const sampleSlugs = new Set(samplePosts.map((p) => p.slug));
        const extras = apiPosts.filter((p) => !sampleSlugs.has(p.slug));
        setPosts([...samplePosts, ...extras]);
      })
      .catch(() => setPosts(samplePosts))
      .finally(() => setLoading(false));
  }, [category]);

  const filtered = category === 'All' ? posts : posts.filter((p) => p.category === category);

  return (
    <>
      <SEO
        title="Blog & Research | Arinox AI"
        description="Field notes from the AI transformation frontier. Strategy, case studies, technology insights, and research from the Arinox AI team."
        canonical="https://www.arinox.ai/blog"
      />

      <section className="relative overflow-hidden border-b border-line px-7 pb-12 pt-20 md:pt-28">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-56 opacity-70" aria-hidden>
          <HalftoneBackground dotSize={4} spacing={20} dotColor="#ff6301" opacity={0.35} gradient={{ type: 'linear', angle: 90 }} />
        </div>
        <div className="relative mx-auto max-w-6xl">
          <Label>Field notes</Label>
          <h1 className="mt-5 max-w-3xl font-display text-[40px] leading-[1.06] tracking-[-0.025em] md:text-[62px]">
            From inside <span className="italic text-ember">the walls.</span>
          </h1>
          <p className="mt-6 max-w-[560px] text-lg leading-relaxed text-ink-soft">
            Practical writing on sovereign AI, agentic systems, and what it actually takes to get
            enterprise work into production.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-7">
          <div className="mb-10 flex flex-wrap gap-2 border-t border-line pt-8">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`chip rounded-full border px-3.5 py-1.5 transition-colors ${
                  category === c
                    ? 'border-ember bg-ember text-white'
                    : 'border-line text-ink-soft hover:border-ink hover:text-ink'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => <div key={i} className="skeleton h-80 rounded-2xl" />)}
            </div>
          ) : filtered.length === 0 ? (
            <p className="py-16 text-center text-[15px] text-ink-soft">Nothing published in this category yet.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((post) => (
                <Link
                  key={post._id}
                  to={`/blog/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:border-ink/20 hover:shadow-[0_30px_70px_-40px_rgba(11,11,13,0.5)]"
                >
                  <div className="aspect-[16/10] overflow-hidden border-b border-line bg-paper-2">
                    {(post.image ?? post.coverImage) && (
                      <img
                        src={post.image ?? post.coverImage}
                        alt={post.title}
                        loading="lazy"
                        style={post.imagePosition ? { objectPosition: post.imagePosition } : undefined}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                      />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ember-deep">{post.category}</span>
                      <span className="font-mono text-[11px] text-ink-faint">{formatDate(post.publishedAt)}</span>
                    </div>
                    <h3 className="mt-4 font-display text-[21px] leading-snug tracking-[-0.01em] transition-colors group-hover:text-ember-deep line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-ink-soft line-clamp-3">{post.excerpt}</p>
                    <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
                      <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">{post.readTime} min read</span>
                      <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint transition-colors group-hover:text-ember-deep">
                        Read <ArrowUpRight size={14} strokeWidth={2.2} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <CtaBand
        title="Want the thinking before it is published?"
        offer={
          <>
            Book a discovery session and we will walk through the same material against your stack.{' '}
            <b className="font-medium text-white">No slides, just the architecture.</b>
          </>
        }
      />
    </>
  );
};

export default Blog;
