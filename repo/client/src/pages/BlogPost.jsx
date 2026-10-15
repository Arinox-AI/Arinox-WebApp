import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';
import SEO from '../components/ui/SEO';
import ShareRow from '../components/site/ShareRow';
import { blogPosts } from '../data/blogPosts';

const formatDate = (d) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

const BlogPost = () => {
  const { slug } = useParams();
  const localPost = blogPosts.find(p => p.slug === slug);
  const [dbPost, setDbPost] = useState(null);
  const [dbState, setDbState] = useState('idle'); // idle | loading | found | missing

  // Posts published in Supabase (not in the local sample set) are fetched
  // from the API and mapped into the same shape the detail view renders.
  useEffect(() => {
    if (localPost) return;
    let alive = true;
    setDbPost(null);
    setDbState('loading');
    axios.get(`/api/v1/blog/${encodeURIComponent(slug)}`)
      .then(({ data }) => {
        const p = data?.data;
        if (!alive) return;
        if (!p) { setDbState('missing'); return; }
        setDbPost({
          _id: p.slug, slug: p.slug, title: p.title, excerpt: p.excerpt,
          image: p.coverImage || p.image,
          imagePosition: p.imagePosition || undefined,
          author: { name: p.authorName || 'Arinox AI Team', role: p.authorRole || '' },
          category: p.category, domain: p.domain,
          publishedAt: p.publishedAt, readTime: p.readTime || 5,
          body: Array.isArray(p.body)
            ? p.body
            : (typeof p.body === 'string' && p.body ? p.body.split(/\n\n+/) : null),
        });
        setDbState('found');
      })
      .catch(() => { if (alive) setDbState('missing'); });
    return () => { alive = false; };
  }, [slug, localPost]);

  const post = localPost || dbPost;

  if (!post) {
    if (dbState === 'loading') {
      return (
        <div className="mx-auto max-w-3xl px-7 pb-24 pt-20 md:pt-24">
          <div className="skeleton h-5 w-40 rounded-md" />
          <div className="skeleton mt-6 h-10 w-full rounded-md md:w-3/4" />
          <div className="skeleton mt-16 aspect-[16/9] w-full rounded-2xl" />
          <div className="skeleton mt-8 h-4 w-full rounded" />
          <div className="skeleton mt-3 h-4 w-11/12 rounded" />
          <div className="skeleton mt-3 h-4 w-9/12 rounded" />
        </div>
      );
    }
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-7">
        <p className="text-[16px] text-ink-soft">Post not found.</p>
        <Link to="/blog" className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.08em] text-ember-deep hover:text-ink">
          <ArrowLeft size={14} strokeWidth={2.2} />
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${post.title} | Arinox AI`}
        description={post.excerpt}
        canonical={`https://www.arinox.ai/blog/${post.slug}`}
        type="article"
        image={typeof post.image === 'string' && post.image.startsWith('http') ? post.image : 'https://www.arinox.ai/og-image.jpg'}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.title,
          description: post.excerpt,
          datePublished: post.publishedAt,
          author: { '@type': post.author?.name === 'Arinox AI Team' ? 'Organization' : 'Person', name: post.author?.name || 'Arinox AI Team' },
          publisher: {
            '@type': 'Organization',
            name: 'Arinox AI',
            logo: { '@type': 'ImageObject', url: 'https://www.arinox.ai/logo.png' },
          },
          mainEntityOfPage: { '@type': 'WebPage', '@id': `https://www.arinox.ai/blog/${post.slug}` },
        }}
      />

      <article className="mx-auto max-w-3xl px-7 pb-24 pt-20 md:pt-24">

        {/* Back */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Link to="/blog" className="mb-6 inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.08em] text-ink-soft transition-colors hover:text-ember-deep">
            <ArrowLeft size={14} strokeWidth={2.2} />
            Back to Blog
          </Link>
        </motion.div>

        {/* Meta */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-ember/30 bg-ember/10 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.1em] text-ember-deep">{post.category}</span>
          {post.domain && <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-faint">{post.domain}</span>}
          <span className="ml-auto font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-faint">
            {formatDate(post.publishedAt)} · {post.readTime} min read
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 mt-5 font-display text-[34px] leading-[1.08] tracking-[-0.025em] text-ink md:text-[46px]"
        >
          {post.title}
        </motion.h1>

        {/* Hero image */}
        <div className="img-frame mb-8 aspect-[16/9] overflow-hidden rounded-2xl border border-line">
          <img
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover"
            style={post.imagePosition ? { objectPosition: post.imagePosition } : undefined}
          />
        </div>

        {/* Author */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="mb-10 flex items-center gap-3 border-b border-line pb-8">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-paper-2 font-mono text-[13px] text-ember-deep">
            {post.author.name.charAt(0)}
          </div>
          <div>
            <p className="font-display text-[17px] tracking-[-0.01em] text-ink">{post.author.name}</p>
            <p className="mt-0.5 font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-faint">{post.author.role}</p>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-5">
          <p className="text-[17.5px] leading-[1.75] text-ink">{post.excerpt}</p>
          {post.body?.map((para, i) => (
            i === post.body.length - 1 ? (
              <div key={i} className="mt-10 border-t border-line pt-6">
                <p className="eyebrow mb-2 text-ink-faint">Research Note</p>
                <p className="text-[14.5px] leading-relaxed text-ink-soft">{para.replace(/^Do your own research:\s*/i, '')}</p>
              </div>
            ) : (
              <p key={i} className="text-[16.5px] leading-[1.75] text-ink-soft">{para}</p>
            )
          ))}
        </motion.div>

        {/* Share */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="mt-12">
          <ShareRow label="Share this piece" title={post.title} url={`https://www.arinox.ai/blog/${post.slug}`} />
        </motion.div>
      </article>
    </>
  );
};

export default BlogPost;
