// Server smoke tests — no DB, no SMTP, no Groq. These endpoints must work
// with zero external services so they double as a "is the server alive" gate.
import { describe, it, expect, vi } from 'vitest';
import { createRequire } from 'node:module';
import request from 'supertest';

// Load the Express app with native CJS semantics so `require.main === module`
// stays false and app.js never starts listening inside the test process.
const require = createRequire(import.meta.url);
const app = require('../src/app.js');

describe('liveness', () => {
  it('GET /health returns ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});

describe('SEO endpoints', () => {
  it('GET /sitemap.xml lists pages under the canonical origin', async () => {
    const res = await request(app).get('/sitemap.xml');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/xml/);
    expect(res.text).toContain('<?xml');
    expect(res.text).toContain('https://www.arinox.ai');
    expect(res.text).toContain('/case-studies');
    expect(res.text).toContain('/industries/marketing');
    expect(res.text).toContain('/industries/fashion-lifestyle');
    expect(res.text).toContain('/industries/industrial');
    expect(res.text).toContain('/industries/secure');
    expect(res.text).toContain('/privacy');
    expect(res.text).toContain('/terms');
  });

  it('GET /robots.txt points at the canonical sitemap', async () => {
    const res = await request(app).get('/robots.txt');
    expect(res.status).toBe(200);
    expect(res.text).toContain('User-agent: *');
    expect(res.text).toContain('Sitemap: https://www.arinox.ai/sitemap.xml');
  });
});

describe('error handling', () => {
  it('unknown routes return JSON 404', async () => {
    const res = await request(app).get('/api/v1/does-not-exist');
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toContain('Route not found');
  });

  it('DB-backed endpoints degrade gracefully when Supabase is unconfigured', async () => {
    const res = await request(app).get('/api/v1/blog');
    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
  });
});

describe('blog SEO surfaces', () => {
  it('GET /blog serves an HTML shell with blog metas and canonical', async () => {
    const res = await request(app).get('/blog');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/html/);
    expect(res.text).toContain('<title>Blog &amp; Research | Arinox AI</title>');
    expect(res.text).toContain('rel="canonical" href="https://www.arinox.ai/blog"');
  });

  it('GET /blog/:slug falls back to blog-index metas for unknown slugs', async () => {
    const res = await request(app).get('/blog/not-a-real-post');
    expect(res.status).toBe(200);
    expect(res.text).toContain('property="og:url" content="https://www.arinox.ai/blog"');
  });

  it('GET /rss.xml returns a valid RSS channel', async () => {
    const res = await request(app).get('/rss.xml');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/rss/);
    expect(res.text).toContain('<title>Arinox AI Blog</title>');
  });

  it('GET /case-studies/:slug serves the deep canonical in the shell', async () => {
    const res = await request(app).get('/case-studies/situational-awareness');
    expect(res.status).toBe(200);
    expect(res.text).toContain('rel="canonical" href="https://www.arinox.ai/case-studies/situational-awareness"');
  });

  it('GET /sitemap.xml still lists static pages when Supabase is unconfigured', async () => {
    const res = await request(app).get('/sitemap.xml');
    expect(res.status).toBe(200);
    expect(res.text).toContain('<loc>https://www.arinox.ai</loc>');
    expect(res.text).toContain('/blog</loc>');
  });
});

describe('spam screens (humans middleware)', () => {
  it('POST /api/v1/contact swallows honeypot submissions silently', async () => {
    const res = await request(app)
      .post('/api/v1/contact')
      .send({ name: 'Bot', email: 'bot@example.com', message: 'spam', website: 'junk' });
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
  });

  it('POST /api/v1/leads swallows honeypot submissions silently', async () => {
    const res = await request(app)
      .post('/api/v1/leads')
      .send({ name: 'Bot', email: 'bot@example.com', website: 'http://spam.example' });
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
  });

  it('rejected Turnstile tokens return 403 and stop the flow', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => ({ json: async () => ({ success: false }) })));
    process.env.TURNSTILE_SECRET_KEY = 'test-secret';
    try {
      const res = await request(app)
        .post('/api/v1/contact')
        .send({ name: 'Actor', email: 'a@example.com', message: 'hey', turnstileToken: 'tok' });
      expect(res.status).toBe(403);
      expect(res.body.success).toBe(false);
    } finally {
      delete process.env.TURNSTILE_SECRET_KEY;
      vi.unstubAllGlobals();
    }
  });

  it('accepted Turnstile tokens let the flow continue (until the DB layer)', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => ({ json: async () => ({ success: true }) })));
    process.env.TURNSTILE_SECRET_KEY = 'test-secret';
    try {
      const res = await request(app)
        .post('/api/v1/contact')
        .send({ name: 'Human', email: 'human@example.com', message: 'hey', turnstileToken: 'tok' });
      // Hermetic: Supabase is unconfigured, so the DB write decides the status —
      // what matters is that the human screen did NOT reject it.
      expect([201, 500]).toContain(res.status);
      expect(res.body.message).not.toContain('human check');
    } finally {
      delete process.env.TURNSTILE_SECRET_KEY;
      vi.unstubAllGlobals();
    }
  });
});

describe('CORS', () => {
  it('allows the dev client origin', async () => {
    const res = await request(app).get('/health').set('Origin', 'http://localhost:5173');
    expect(res.status).toBe(200);
  });

  it('blocks foreign origins', async () => {
    const res = await request(app).get('/health').set('Origin', 'https://evil.example');
    expect(res.status).toBe(403);
    expect(res.body.message).toBe('Cross-origin request blocked.');
  });
});
