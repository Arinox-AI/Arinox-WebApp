require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const { connectDB } = require('./models');
const { errorHandler, notFound } = require('./middleware/errorHandler');

const app = express();
const server = http.createServer(app);

// Socket.IO — used for real-time QR auth notifications
const io = new Server(server, {
  cors: { origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true },
});
app.set('io', io);

io.on('connection', (socket) => {
  socket.on('join-qr-room', (token) => socket.join(token));
  socket.on('disconnect', () => {});
});

// DB
connectDB();

// Security & middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }));
app.use(cookieParser());
app.use(express.json({ limit: '10kb' }));

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: process.env.NODE_ENV === 'development' ? 2000 : 100, message: 'Too many requests.' });
app.use('/api', limiter);

// Routes
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/blog', require('./routes/blog'));
app.use('/api/v1/case-studies', require('./routes/caseStudies'));
app.use('/api/v1/careers', require('./routes/careers'));
app.use('/api/v1/contact', require('./routes/contact'));
app.use('/api/v1/partners', require('./routes/partners'));

// Sitemap XML (SEO)
app.get('/sitemap.xml', (req, res) => {
  const base = process.env.SITE_URL || 'https://www.arinox.ai';
  const pages = ['', '/about', '/partners', '/solutions', '/commandcore', '/careers', '/contact', '/blog', '/case-studies'];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url><loc>${base}${p}</loc><changefreq>weekly</changefreq><priority>${p === '' ? '1.0' : '0.8'}</priority></url>`).join('\n')}
</urlset>`;
  res.header('Content-Type', 'application/xml').send(xml);
});

app.get('/robots.txt', (req, res) => {
  const base = process.env.SITE_URL || 'https://www.arinox.ai';
  res.type('text/plain').send(`User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`);
});

app.get('/health', (req, res) => res.json({ status: 'ok', env: process.env.NODE_ENV }));

// Serve React build in production
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  const clientBuild = path.join(__dirname, '../../client/dist');
  app.use(express.static(clientBuild));
  app.get('*', (req, res) => res.sendFile(path.join(clientBuild, 'index.html')));
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
