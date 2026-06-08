import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import SEO from '../components/ui/SEO';

import aksImg      from '../assets/9th Nov- AKS Workshop Global.jpeg';
import ansrImg     from '../assets/4th July - ANSR Tech Workshop_.jpg';
import nvidiaImg   from '../assets/26th June- Nvidia Workshop.jpg';
import hitachiImg  from '../assets/Hitachi_shori_2026.JPG';
import aiSummitImg from '../assets/ai_summit.jpg';

const AI_FINANCE_IMG   = 'https://plus.unsplash.com/premium_photo-1683121710572-7723bd2e235d?auto=format&fit=crop&w=800&q=80';
const SERVER_ROOM_IMG  = 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80';
const FACTORY_AUTO_IMG = 'https://images.unsplash.com/photo-1647427060118-4911c9821b82?auto=format&fit=crop&w=800&q=80';

const samplePosts = [
  {
    _id: 'e1',
    slug: 'aks-workshop-global-sovereign-ai',
    title: 'AKS Workshop Global: Sovereign AI for Kubernetes-Native Enterprises',
    excerpt: 'Arinox AI joined global CIOs and cloud architects at the AKS Workshop Global to demonstrate how Kubernetes-native deployments can achieve full data sovereignty without sacrificing performance — using CommandCore™ as the on-premises AI substrate.',
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
    excerpt: 'At the ANSR Tech Workshop in July, Arinox AI explored how agentic AI systems are redefining the role of Global Capability Centres — shifting them from cost arbitrage hubs to autonomous intelligence factories.',
    image: ansrImg,
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
    excerpt: 'Arinox AI partnered with NVIDIA to showcase how CommandCore harnesses H100 GPU clusters for real-time, on-premises AI inference — delivering hyperscaler performance without hyperscaler dependency.',
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
    excerpt: 'Arinox AI was featured at Hitachi Shori 2026 — an elite gathering of industrial leaders — to present how sovereign AI and agentic automation are transforming manufacturing, supply chain, and operational technology environments.',
    image: hitachiImg,
    imagePosition: 'object-top',
    author: { name: 'Arinox AI Team', role: 'Events & Innovation' },
    category: 'Events',
    domain: 'Industrial AI',
    publishedAt: '2026-01-01',
    readTime: 7,
  },
  {
    _id: 'e5',
    slug: 'nvidia-inception-ai-summit-2025',
    title: 'NVIDIA Inception AI Summit: Arinox Showcases Sovereign AI to Indian Defence & Enterprises',
    excerpt: 'At the NVIDIA Inception AI Summit, Arinox AI stood alongside India\'s defence leadership and enterprise innovators — demonstrating how CommandCore brings frontier AI to the most security-sensitive environments in the country.',
    image: aiSummitImg,
    imagePosition: 'object-top',
    author: { name: 'Arinox AI Team', role: 'Events & Innovation' },
    category: 'Events',
    domain: 'Defence & Enterprise',
    publishedAt: '2025-09-15',
    readTime: 5,
  },
  {
    _id: '1',
    slug: 'beyond-offshoring-ai-shoring',
    title: 'Beyond Offshoring: The Macroeconomics of AI-Shoring',
    excerpt: 'Why CFOs will reclassify cloud savings as growth CAPEX — and how the 30-30-30 loop turns theory into cashflow in 90 days.',
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
        const apiPosts = (data.data || []).map(p => ({ ...p, image: p.image ?? p.coverImage }));
        const sampleSlugs = new Set(samplePosts.map(p => p.slug));
        const extras = apiPosts.filter(p => !sampleSlugs.has(p.slug));
        setPosts([...samplePosts, ...extras]);
      })
      .catch(() => setPosts(samplePosts))
      .finally(() => setLoading(false));
  }, [category]);

  const filtered = category === 'All' ? posts : posts.filter(p => p.category === category);

  return (
    <>
      <SEO
        title="Blog & Research — Arinox AI"
        description="Field notes from the AI transformation frontier. Strategy, case studies, technology insights, and research from the Arinox AI team and partners."
        canonical="https://www.arinox.ai/blog"
      />

      {/* Hero */}
      <section className="relative pt-24 sm:pt-32 md:pt-40 pb-12 sm:pb-16 md:pb-20 grid-bg overflow-hidden">
        <div className="orb w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-brand-primary/10 top-0 left-1/3 -translate-y-1/4" />
        <div className="container-wide relative px-4 sm:px-6">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[10px] sm:text-xs tracking-widest uppercase text-brand-primary mb-3 sm:mb-4"
          >
            Insights & Events
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-2 sm:mb-3"
          >
            Future-Forward <span className="text-gradient">Field Notes.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-base text-brand-muted max-w-xl"
          >
            Real consulting war-stories, event recaps, and distilled 5-minute reads.
          </motion.p>
        </div>
      </section>

      <section className="section-padding py-10 sm:py-14 md:py-20">
        <div className="container-wide px-4 sm:px-6">

          {/* Filters — horizontal scroll on xs, wraps on sm+ */}
          <div className="flex gap-2 sm:gap-3 mb-8 sm:mb-10 overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap scrollbar-none">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`flex-shrink-0 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm transition-all whitespace-nowrap ${
                  category === c
                    ? 'bg-brand-primary text-white'
                    : 'glass border border-brand-border text-brand-muted hover:text-brand-text'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 items-start">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="glass-card rounded-2xl h-64 sm:h-72 animate-pulse" />
                ))
              : filtered.map((post, i) => (
                  <motion.article
                    key={post._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <Link
                      to={`/blog/${post.slug}`}
                      className="glass-card rounded-2xl group overflow-hidden flex flex-col h-full"
                    >
                      {/* Cover image */}
                      {(post.image ?? post.coverImage) && (
                        <div className="h-44 sm:h-48 md:h-52 overflow-hidden flex-shrink-0">
                          <img
                            src={post.image ?? post.coverImage}
                            alt={post.title}
                            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${post.imagePosition ?? 'object-center'}`}
                            loading="lazy"
                          />
                        </div>
                      )}

                      <div className="p-4 sm:p-5 flex flex-col flex-1">
                        {/* Category + domain + date */}
                        <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3 flex-wrap">
                          <span className="text-[10px] sm:text-[11px] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-brand-primary/10 text-brand-primary font-semibold">
                            {post.category}
                          </span>
                          {post.domain && (
                            <span className="text-[10px] sm:text-[11px] text-brand-muted">{post.domain}</span>
                          )}
                          <span className="text-[10px] sm:text-[11px] text-brand-muted ml-auto">
                            {formatDate(post.publishedAt)}
                          </span>
                        </div>

                        <h2 className="text-sm sm:text-base text-brand-text font-bold leading-snug mb-2 group-hover:text-brand-primary transition-colors line-clamp-2">
                          {post.title}
                        </h2>
                        <p className="text-xs sm:text-sm text-brand-muted leading-relaxed mb-4 line-clamp-3 flex-1">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between pt-3 border-t border-brand-border/40 gap-2 min-w-0">
                          <div className="min-w-0">
                            <p className="text-xs text-brand-text font-medium truncate">{post.author?.name}</p>
                            <p className="text-[10px] sm:text-[11px] text-brand-muted truncate">{post.author?.role}</p>
                          </div>
                          <span className="text-[10px] sm:text-[11px] text-brand-muted flex-shrink-0">
                            {post.readTime} min read
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
