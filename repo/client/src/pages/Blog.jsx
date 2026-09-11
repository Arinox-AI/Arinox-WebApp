import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SEO from '../components/ui/SEO';
import Reveal from '../components/ui/Reveal';
import { img } from '../data/images';

import aksImg              from '../assets/9th Nov- AKS Workshop Global.jpeg';
import ansrImg             from '../assets/4th July - ANSR Tech Workshop_.jpg';
import nvidiaImg           from '../assets/26th June- Nvidia Workshop.jpg';
import hitachiImg          from '../assets/Hitachi_shori_2026.JPG';
import aiSummitImg         from '../assets/ai_summit.jpg';
import sovereignLaunchImg  from '../assets/severign_launch.jpeg';
import hitachiSystemsImg   from '../assets/Hitachi_systems_event.jpeg';
import indianGovImg        from '../assets/IndianGov.jpeg';
import bharatDigitalImg    from '../assets/Bharat_digital_event.jpeg';

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
    excerpt: 'Arinox AI joined NVIDIA\u2019s enterprise workshop to showcase how CommandCore harnesses H100 GPU clusters for real-time, on-premises AI inference — hyperscaler performance without hyperscaler dependency.',
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

      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-12 md:pb-16 border-b border-brand-border">
        <div className="container-wide">
          <Reveal>
            <p className="overline">Insights &amp; events</p>
            <h1 className="text-4xl md:text-5xl font-display font-extrabold leading-[1.08] mb-5">
              Field notes from the <span className="text-gradient">transformation frontier.</span>
            </h1>
            <p className="lead max-w-xl">
              Event recaps, strategy essays, and distilled five-minute reads from the frontier of private enterprise AI.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="container-wide">
          {/* Filters */}
          <div className="flex gap-2 sm:gap-3 mb-8 md:mb-10 overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap scrollbar-none">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`flex-shrink-0 px-3.5 py-2 rounded-lg text-[13px] font-semibold transition-all whitespace-nowrap ${
                  category === c
                    ? 'bg-brand-primary text-white'
                    : 'card text-brand-muted hover:text-brand-text hover:border-brand-primary/40'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 items-start">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => <div key={i} className="skeleton h-72" />)
              : filtered.map((post, i) => (
                  <Reveal key={post._id} delay={(i % 3) * 0.06}>
                    <Link to={`/blog/${post.slug}`} className="card card-hover group overflow-hidden flex flex-col h-full">
                      {(post.image ?? post.coverImage) && (
                        <div className="h-44 md:h-52 overflow-hidden flex-shrink-0 bg-brand-surface">
                          <img
                            src={post.image ?? post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                            style={post.imagePosition ? { objectPosition: post.imagePosition } : undefined}
                            loading="lazy"
                          />
                        </div>
                      )}

                      <div className="p-5 flex flex-col flex-1">
                        <div className="flex items-center gap-2 mb-2.5 flex-wrap">
                          <span className="chip">{post.category}</span>
                          {post.domain && <span className="text-[11px] text-brand-subtle">{post.domain}</span>}
                          <span className="text-[11px] text-brand-subtle ml-auto">{formatDate(post.publishedAt)}</span>
                        </div>

                        <h2 className="text-[15px] text-brand-text font-display font-bold leading-snug mb-2 group-hover:text-brand-primary transition-colors line-clamp-2">
                          {post.title}
                        </h2>
                        <p className="text-[13px] text-brand-muted leading-relaxed mb-4 line-clamp-3 flex-1">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between pt-3 border-t border-brand-border gap-2 min-w-0">
                          <div className="min-w-0">
                            <p className="text-xs text-brand-text font-medium truncate">{post.author?.name}</p>
                            <p className="text-[11px] text-brand-subtle truncate">{post.author?.role}</p>
                          </div>
                          <span className="text-[11px] text-brand-subtle flex-shrink-0">{post.readTime} min read</span>
                        </div>
                      </div>
                    </Link>
                  </Reveal>
                ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
