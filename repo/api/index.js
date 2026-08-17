// Vercel serverless entry — exports the Express app for @vercel/node.
// Client static files are served by Vercel's CDN (see vercel.json);
// this function handles /api/* and the SEO/health endpoints.
const app = require('../server/src/app');

module.exports = app;
