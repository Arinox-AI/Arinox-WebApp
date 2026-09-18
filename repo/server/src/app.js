require('dotenv').config();
const express = require('express');
const http = require('http');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { connectDB } = require('./models');
const { verifyMailer } = require('./utils/mailer');
const { errorHandler, notFound } = require('./middleware/errorHandler');

const app = express();
const server = http.createServer(app);

// DB + email
connectDB();
verifyMailer();

// Security & middleware
app.use(helmet({ contentSecurityPolicy: false }));
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? [
      // The server serves its own frontend, so requests can carry either the
      // apex or www origin depending on which host the user visited.
      'https://arinox.ai', 'https://www.arinox.ai',
      process.env.CLIENT_URL,
    ].filter(Boolean)
  : [
      'http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175',
      'http://127.0.0.1:5173', 'http://127.0.0.1:5174',
      process.env.CLIENT_URL,
    ].filter(Boolean);
app.use(cors({
  origin: (origin, cb) => {
    // Vercel preview deployments for this project get *.vercel.app origins - 
    // allow ONLY our project's previews (arinox-website-*), not any Vercel app.
    if (!origin || allowedOrigins.includes(origin) || /^https:\/\/arinox-website(?:-[\w-]+)?\.vercel\.app$/.test(origin)) {
      return cb(null, true);
    }
    cb(new Error('CORS blocked'));
  },
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
}));
app.options('*', cors()); // pre-flight for all routes
app.use(express.json({ limit: '10kb' }));

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: process.env.NODE_ENV === 'development' ? 2000 : 100, message: 'Too many requests.' });
app.use('/api', limiter);

// Routes
app.use('/api/v1/blog', require('./routes/blog'));
app.use('/api/v1/case-studies', require('./routes/caseStudies'));
app.use('/api/v1/careers', require('./routes/careers'));
app.use('/api/v1/contact', require('./routes/contact'));
app.use('/api/v1/leads', require('./routes/leads'));
app.use('/api/v1/chat', require('./routes/chat'));

// Canonical origin used in SEO output. Guards against a misconfigured
// SITE_URL (e.g. the staging host leaking into the production
// sitemap.xml / robots.txt), which is exactly what would devalue the
// live domain in search.
const PROD_ORIGIN = 'https://www.arinox.ai';
const seoOrigin = () => {
  const configured = (process.env.SITE_URL || '').replace(/\/+$/, '');
  const looksNonProd = /staging|preview|localhost|127\.0\.0\.1|\.vercel\.app/i.test(configured);
  return configured && !looksNonProd ? configured : PROD_ORIGIN;
};

// Sitemap XML (SEO)
app.get('/sitemap.xml', (req, res) => {
  const base = seoOrigin();
  const lastmod = new Date().toISOString().split('T')[0];
  const pages = ['', '/commandcore', '/case-studies', '/partners', '/blog', '/careers', '/contact'];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url><loc>${base}${p}</loc><lastmod>${lastmod}</lastmod><changefreq>weekly</changefreq><priority>${p === '' ? '1.0' : '0.8'}</priority></url>`).join('\n')}
</urlset>`;
  res.header('Content-Type', 'application/xml').send(xml);
});

app.get('/robots.txt', (req, res) => {
  const base = seoOrigin();
  res.type('text/plain').send(`User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`);
});

app.get('/health', (req, res) => res.json({ status: 'ok', env: process.env.NODE_ENV }));

// Serve React build in production
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  const fs = require('fs');
  const clientBuild = path.join(__dirname, '../../client/dist');

  if (fs.existsSync(clientBuild)) {

  // Cache versioned assets (hashes in filenames) aggressively
  app.use('/assets', express.static(path.join(clientBuild, 'assets'), {
    maxAge: '365d',
    immutable: true,
  }));

  // Public directory (logos, industries, etc.) with short cache
  app.use(express.static(clientBuild, {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('index.html')) {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      } else if (!filePath.includes('/assets/')) {
        res.setHeader('Cache-Control', 'public, max-age=86400');
      }
    },
  }));

  app.get('*', (req, res) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.sendFile(path.join(clientBuild, 'index.html'));
  });
  }
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Vercel serverless: export the app and let the platform handle listening.
// Run directly (node src/app.js) → start the HTTP server as before.
if (require.main === module) {
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
