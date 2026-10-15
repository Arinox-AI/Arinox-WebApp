import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowUpRight } from 'lucide-react';
import SEO from '../components/ui/SEO';
import { Label } from '../components/site/Layout';
import { HalftoneBackground } from '../components/site/HalftoneBackground';
import { CtaBand } from '../components/site/Shell';
import { blogPosts } from '../data/blogPosts';

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
        const sampleSlugs = new Set(blogPosts.map((p) => p.slug));
        const extras = apiPosts.filter((p) => !sampleSlugs.has(p.slug));
        setPosts([...blogPosts, ...extras]);
      })
      .catch(() => setPosts(blogPosts))
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
