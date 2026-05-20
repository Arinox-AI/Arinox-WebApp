import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import SEO from '../components/ui/SEO';

const samplePosts = [
  { _id: '1', slug: 'beyond-offshoring-ai-shoring', title: 'Beyond Offshoring: The Macroeconomics of AI-Shoring', excerpt: 'Why CFOs will reclassify cloud savings as growth CAPEX — and how the 30-30-30 loop turns theory into cashflow in 90 days.', author: { name: 'Praveer Kochhar', role: 'Co-Founder, KOGO AI' }, category: 'AI Strategy', domain: 'General', publishedAt: '2025-05-01', readTime: 7 },
  { _id: '2', slug: 'edge-to-core-ai', title: 'Edge-to-Core AI: Turning On-Prem HPC Into a Profit Center', excerpt: 'Inside a Tier-1 bank that flipped its dormant DGX cluster into an agent farm and paid off hardware amortisation two quarters early.', author: { name: 'P.N. Sudarshan', role: 'Global CTO, HPE' }, category: 'Technology', domain: 'BFSI', publishedAt: '2025-04-20', readTime: 9 },
  { _id: '3', slug: 'bpo-to-autonomous-ops', title: 'From BPO to Autonomous Ops: Building an Agent Factory', excerpt: 'A step-by-step walkthrough of how Coforge cut 40% ticket resolution time by roboshoring processes back to on-prem KOGO agents.', author: { name: 'Nikhil Arora', role: 'SVP AI & Automation, Coforge' }, category: 'Case Study', domain: 'Technology', publishedAt: '2025-04-10', readTime: 8 },
];

const categories = ['All', 'AI Strategy', 'Case Study', 'Technology', 'Industry Insights', 'Research'];

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
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs tracking-widest uppercase text-brand-primary mb-4">Insights</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-4xl font-display font-bold text-white mb-3">
            Future-Forward <span className="text-gradient">Field Notes.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-sm md:text-base text-brand-muted">
            Real consulting war-stories, distilled into 5-minute reads.
          </motion.p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-10">
            {categories.map(c => (
              <button key={c} onClick={() => setCategory(c)} className={`px-4 py-2 rounded-xl text-sm transition-all ${category === c ? 'bg-brand-primary text-white' : 'glass border border-brand-border text-brand-muted hover:text-white'}`}>
                {c}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => <div key={i} className="glass-card rounded-2xl h-72 animate-pulse" />)
              : posts.map((post, i) => (
                <motion.article key={post._id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                  <Link to={`/blog/${post.slug}`} className="glass-card rounded-2xl p-6 block h-full group">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs px-2 py-1 rounded-full bg-brand-primary/10 text-brand-primary">{post.category}</span>
                      {post.domain && <span className="text-xs text-brand-muted">{post.domain}</span>}
                    </div>
                    <h2 className="text-white font-bold text-lg leading-snug mb-3 group-hover:text-brand-primary transition-colors">{post.title}</h2>
                    <p className="text-sm text-brand-muted leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <div>
                        <p className="text-xs text-white font-medium">{post.author?.name}</p>
                        <p className="text-xs text-brand-muted">{post.author?.role}</p>
                      </div>
                      <div className="text-xs text-brand-muted">
                        {post.readTime} min read
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
