const Groq = require('groq-sdk');

/* Central Groq client + model config. Keeping this in one place means the model
 * and limits are changed in a single spot for both the JSON and streaming paths. */
const MODEL = process.env.CHAT_MODEL || 'openai/gpt-oss-120b';

// Grounded, factual answers want a low temperature. 0.6 encouraged confident
// hallucination; 0.3 keeps it close to the knowledge base.
const TEMPERATURE = Number(process.env.CHAT_TEMPERATURE || 0.3);
const MAX_TOKENS = Number(process.env.CHAT_MAX_TOKENS || 512);

// Upstream request ceiling. Groq streams fast; this only guards a stall.
const REQUEST_TIMEOUT_MS = Number(process.env.CHAT_TIMEOUT_MS || 30000);

let _groq = null;
const getGroq = () => {
  if (!process.env.GROQ_API_KEY) {
    throw Object.assign(new Error('GROQ_API_KEY not set'), { status: 401 });
  }
  if (!_groq) _groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  return _groq;
};

module.exports = { getGroq, MODEL, TEMPERATURE, MAX_TOKENS, REQUEST_TIMEOUT_MS };
