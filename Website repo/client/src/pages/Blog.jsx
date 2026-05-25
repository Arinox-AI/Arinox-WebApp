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

const samplePosts = [
  {
    _id: 'e1',
    slug: 'aks-workshop-global-sovereign-ai',
    title: 'AKS Workshop Global: Sovereign AI for Kubernetes-Native Enterprises',
    excerpt: 'Arinox AI joined global CIOs and cloud architects at the AKS Workshop Global to demonstrate how Kubernetes-native deployments can achieve full data sovereignty without sacrificing performance — using CommandCore as the on-premises AI substrate.',
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
      .then(({ data }) => setPosts(data.data.length ? data.data : samplePosts))
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
      <section className="relative pt-40 pb-20 grid-bg overflow-hidden">
        <div className="orb w-[400px] h-[400px] bg-brand-primary/10 top-0 left-1/3 -translate-y-1/4" />
        <div className="container-wide relative">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs tracking-widest uppercase text-brand-primary mb-4">Insights & Events</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-4xl font-display font-bold text-white mb-3">
            Future-Forward <span className="text-gradient">Field Notes.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-sm md:text-base text-brand-muted">
            Real consulting war-stories, event recaps, and distilled 5-minute reads.
          </motion.p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-10">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-4 py-2 rounded-xl text-sm transition-all ${category === c ? 'bg-brand-primary text-white' : 'glass border border-brand-border text-brand-muted hover:text-brand-text'}`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Grid — items-start so text-only cards don't stretch to image-card height */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => <div key={i} className="glass-card rounded-2xl h-72 animate-pulse" />)
              : filtered.map((post, i) => (
                <motion.article
                  key={post._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link to={`/blog/${post.slug}`} className="glass-card rounded-2xl group overflow-hidden flex flex-col">
                    {/* Cover image — taller for more visual impact */}
                    {post.image && (
                      <div className="h-56 overflow-hidden flex-shrink-0">
                        <img
                          src={post.image}
                          alt={post.title}
                          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${post.imagePosition ?? 'object-center'}`}
                          loading="lazy"
                        />
                      </div>
                    )}

                    <div className="p-5 flex flex-col">
                      {/* Category + domain + date */}
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span className="text-[11px] px-2.5 py-1 rounded-full bg-brand-primary/10 text-brand-primary font-semibold">{post.category}</span>
                        {post.domain && <span className="text-[11px] text-brand-muted">{post.domain}</span>}
                        <span className="text-[11px] text-brand-muted ml-auto">{formatDate(post.publishedAt)}</span>
                      </div>

                      <h2 className={`text-brand-text font-bold leading-snug mb-2 group-hover:text-brand-primary transition-colors line-clamp-2 ${post.image ? 'text-base' : 'text-sm'}`}>
                        {post.title}
                      </h2>
                      <p className="text-sm text-brand-muted leading-relaxed mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between pt-3 border-t border-brand-border/40">
                        <div>
                          <p className="text-xs text-brand-text font-medium">{post.author?.name}</p>
                          <p className="text-[11px] text-brand-muted">{post.author?.role}</p>
                        </div>
                        <span className="text-[11px] text-brand-muted">{post.readTime} min read</span>
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
