import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  { slug: 'aks-workshop-global-sovereign-ai', title: 'AKS Workshop Global: Sovereign AI for Kubernetes-Native Enterprises', excerpt: 'Arinox AI joined global CIOs and cloud architects at the AKS Workshop Global to demonstrate how Kubernetes-native deployments can achieve full data sovereignty without sacrificing performance — using CommandCore™ as the on-premises AI substrate.', image: aksImg, author: { name: 'Arinox AI Team', role: 'Events & Innovation' }, category: 'Events', domain: 'Enterprise AI', publishedAt: '2025-11-09', readTime: 5 },
  { slug: 'ansr-tech-workshop-agentic-ai-gcc', title: 'ANSR Tech Workshop: Agentic AI Meets Global Capability Centre Operations', excerpt: 'At the ANSR Tech Workshop in July, Arinox AI explored how agentic AI systems are redefining the role of Global Capability Centres — shifting them from cost arbitrage hubs to autonomous intelligence factories.', image: ansrImg, author: { name: 'Arinox AI Team', role: 'Events & Innovation' }, category: 'Events', domain: 'GCC & Outsourcing', publishedAt: '2025-07-04', readTime: 6 },
  { slug: 'nvidia-workshop-h100-enterprise-ai', title: 'NVIDIA Workshop: Unlocking H100 Performance for Enterprise Sovereign AI', excerpt: 'Arinox AI partnered with NVIDIA to showcase how CommandCore harnesses H100 GPU clusters for real-time, on-premises AI inference — delivering hyperscaler performance without hyperscaler dependency.', image: nvidiaImg, author: { name: 'Arinox AI Team', role: 'Events & Innovation' }, category: 'Events', domain: 'Infrastructure', publishedAt: '2025-06-26', readTime: 6 },
  { slug: 'hitachi-shori-2026-industrial-ai', title: 'Hitachi Shori 2026: Industrial Intelligence at the Sovereign Edge', excerpt: 'Arinox AI was featured at Hitachi Shori 2026 — an elite gathering of industrial leaders — to present how sovereign AI and agentic automation are transforming manufacturing, supply chain, and operational technology environments.', image: hitachiImg, imagePosition: 'object-top', author: { name: 'Arinox AI Team', role: 'Events & Innovation' }, category: 'Events', domain: 'Industrial AI', publishedAt: '2026-01-01', readTime: 7 },
  { slug: 'nvidia-inception-ai-summit-2025', title: 'NVIDIA Inception AI Summit: Arinox Showcases Sovereign AI to Indian Defence & Enterprises', excerpt: 'At the NVIDIA Inception AI Summit, Arinox AI stood alongside India\'s defence leadership and enterprise innovators — demonstrating how CommandCore brings frontier AI to the most security-sensitive environments in the country.', image: aiSummitImg, imagePosition: 'object-top', author: { name: 'Arinox AI Team', role: 'Events & Innovation' }, category: 'Events', domain: 'Defence & Enterprise', publishedAt: '2025-09-15', readTime: 5 },
  { slug: 'beyond-offshoring-ai-shoring', title: 'Beyond Offshoring: The Macroeconomics of AI-Shoring', excerpt: 'Why CFOs will reclassify cloud savings as growth CAPEX — and how the 30-30-30 loop turns theory into cashflow in 90 days.', image: AI_FINANCE_IMG, author: { name: 'Praveer Kochhar', role: 'Co-Founder, KOGO AI' }, category: 'AI Strategy', domain: 'General', publishedAt: '2025-05-01', readTime: 7 },
  { slug: 'edge-to-core-ai', title: 'Edge-to-Core AI: Turning On-Prem HPC Into a Profit Center', excerpt: 'Inside a Tier-1 bank that flipped its dormant DGX cluster into an agent farm and paid off hardware amortisation two quarters early.', image: SERVER_ROOM_IMG, author: { name: 'P.N. Sudarshan', role: 'Global CTO, HPE' }, category: 'Technology', domain: 'BFSI', publishedAt: '2025-04-20', readTime: 9 },
  { slug: 'bpo-to-autonomous-ops', title: 'From BPO to Autonomous Ops: Building an Agent Factory', excerpt: 'A step-by-step walkthrough of how Coforge cut 40% ticket resolution time by roboshoring processes back to on-prem KOGO agents.', image: FACTORY_AUTO_IMG, author: { name: 'Nikhil Arora', role: 'SVP AI & Automation, Coforge' }, category: 'Case Study', domain: 'Technology', publishedAt: '2025-04-10', readTime: 8 },
];

const formatDate = (d) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

const BlogPost = () => {
  const { slug } = useParams();
  const post = samplePosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
        <p className="text-brand-muted text-lg">Post not found.</p>
        <Link to="/blog" className="text-brand-primary hover:underline text-sm">← Back to Blog</Link>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${post.title} — Arinox AI`}
        description={post.excerpt}
        canonical={`https://www.arinox.ai/blog/${post.slug}`}
      />

      {/* Hero image */}
      <div className="w-full h-56 sm:h-72 md:h-96 overflow-hidden mt-16">
        <img
          src={post.image}
          alt={post.title}
          className={`w-full h-full object-cover ${post.imagePosition ?? 'object-center'}`}
        />
      </div>

      <article className="container-wide px-4 sm:px-6 py-10 sm:py-14 max-w-3xl">

        {/* Back */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-brand-muted hover:text-brand-primary text-sm mb-6 transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 5l-7 7 7 7"/></svg>
            Back to Blog
          </Link>
        </motion.div>

        {/* Meta */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-[11px] px-2.5 py-1 rounded-full bg-brand-primary/10 text-brand-primary font-semibold">{post.category}</span>
          {post.domain && <span className="text-[11px] text-brand-muted">{post.domain}</span>}
          <span className="text-[11px] text-brand-muted ml-auto">{formatDate(post.publishedAt)} · {post.readTime} min read</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-brand-text leading-tight mb-4"
        >
          {post.title}
        </motion.h1>

        {/* Author */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="flex items-center gap-3 mb-8 pb-8 border-b border-brand-border">
          <div className="w-9 h-9 rounded-full bg-brand-primary/20 border border-brand-primary/40 flex items-center justify-center text-brand-primary font-bold text-sm flex-shrink-0">
            {post.author.name.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-semibold text-brand-text">{post.author.name}</p>
            <p className="text-xs text-brand-muted">{post.author.role}</p>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="prose prose-invert max-w-none">
          <p className="text-base sm:text-lg text-brand-muted leading-relaxed mb-6">{post.excerpt}</p>
          <div className="glass-card rounded-2xl p-6 text-center">
            <p className="text-brand-muted text-sm">Full article coming soon.</p>
            <Link to="/contact" className="inline-block mt-3 text-brand-primary text-sm hover:underline">Get in touch with our team →</Link>
          </div>
        </motion.div>
      </article>
    </>
  );
};

export default BlogPost;
