const { getGroq, MODEL, TEMPERATURE, MAX_TOKENS, REQUEST_TIMEOUT_MS } = require('../chat/groq');
const { SYSTEM_PROMPT } = require('../chat/prompt');
const { screenInput, screenOutput, REINFORCEMENT, HARD_REFUSAL } = require('../chat/guardrails');

const MAX_MESSAGES = 12;
const MAX_CHARS = 1500;

const FRIENDLY = {
  429: 'Arin is busy right now. Please try again in a moment.',
  401: 'Chatbot is not configured correctly. Please try later.',
};

/* Keep only well-formed turns, cap the window and each message length, and force
 * roles to user/assistant so a client cannot inject its own system message. */
function normalize(messages) {
  return messages
    .filter((m) => m && typeof m.content === 'string' && m.content.trim())
    .slice(-MAX_MESSAGES)
    .map((m) => ({
      role: m.role === 'user' ? 'user' : 'assistant',
      content: m.content.slice(0, MAX_CHARS),
    }));
}

const lastUserMessage = (sanitized) => [...sanitized].reverse().find((m) => m.role === 'user')?.content || '';

function buildPrompt(sanitized) {
  // A high-confidence injection anywhere in the user's turns is refused — the
  // client controls history, so an attacker could try to bury one earlier.
  const hard = sanitized.some((m) => m.role === 'user' && screenInput(m.content).level === 'hard');
  if (hard) return { messages: [], screened: { level: 'hard', reason: 'injection' } };

  const screened = screenInput(lastUserMessage(sanitized));
  const messages = [{ role: 'system', content: SYSTEM_PROMPT }];
  if (screened.level === 'soft') messages.push({ role: 'system', content: REINFORCEMENT });
  return { messages: [...messages, ...sanitized], screened };
}

function friendlyError(err) {
  if (err?.status === 429) return FRIENDLY[429];
  if (err?.status === 401 || err?.status === 403) return FRIENDLY[401];
  if (err?.name === 'AbortError') return 'Arin took too long to respond. Please try again.';
  return 'Sorry, something went wrong. Please try again.';
}

/* ── Non-streaming ───────────────────────────────────────────────────────── */
const chatHandler = async (req, res) => {
  const { messages } = req.body || {};

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ message: 'messages array is required' });
  }
  const sanitized = normalize(messages);
  if (sanitized.length === 0) {
    return res.status(400).json({ message: 'No valid messages provided' });
  }

  const { messages: prompt, screened } = buildPrompt(sanitized);

  // High-confidence injection: refuse without spending a token.
  if (screened.level === 'hard') {
    return res.json({ reply: HARD_REFUSAL });
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const completion = await getGroq().chat.completions.create(
      { model: MODEL, messages: prompt, max_tokens: MAX_TOKENS, temperature: TEMPERATURE },
      { signal: controller.signal },
    );
    const raw = completion.choices?.[0]?.message?.content ?? '';
    const { text } = screenOutput(raw);
    return res.json({ reply: text });
  } catch (err) {
    return res.status(502).json({ message: friendlyError(err) });
  } finally {
    clearTimeout(timer);
  }
};

/* ── Streaming (SSE) ─────────────────────────────────────────────────────── */
/* Frames sent to the client:
 *   { delta: "..." }   append text to the current assistant message
 *   { replace: "..." } discard what was streamed and use this instead
 *   { error: "..." }   surface a friendly error
 *   { done: true }     end of stream
 */
const chatStreamHandler = async (req, res) => {
  const { messages } = req.body || {};

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ message: 'messages array is required' });
  }
  const sanitized = normalize(messages);
  if (sanitized.length === 0) {
    return res.status(400).json({ message: 'No valid messages provided' });
  }

  const { messages: prompt, screened } = buildPrompt(sanitized);

  res.writeHead(200, {
    'Content-Type': 'text/event-stream; charset=utf-8',
    'Cache-Control': 'no-cache, no-transform',
    Connection: 'keep-alive',
    'X-Accel-Buffering': 'no',
  });

  const send = (payload) => {
    if (!res.writableEnded) res.write(`data: ${JSON.stringify(payload)}\n\n`);
  };
  const finish = () => {
    send({ done: true });
    if (!res.writableEnded) res.end();
  };

  if (screened.level === 'hard') {
    send({ delta: HARD_REFUSAL });
    return finish();
  }

  const controller = new AbortController();
  const onClose = () => controller.abort();
  req.on('close', onClose);
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let full = '';
  let abortedByClient = false;
  res.on('close', () => { abortedByClient = true; });

  try {
    const stream = await getGroq().chat.completions.create(
      { model: MODEL, messages: prompt, max_tokens: MAX_TOKENS, temperature: TEMPERATURE, stream: true },
      { signal: controller.signal },
    );

    for await (const chunk of stream) {
      const delta = (chunk.choices?.[0]?.delta?.content || '')
        .replace(/[\u00a0\u2007\u2009\u202f\u2002\u2003]/g, ' ')
        .replace(/[\u200b\u200c\u200d\ufeff]/g, '')
        .replace(/\u2011/g, '-');
      if (delta) {
        full += delta;
        send({ delta });
      }
    }

    // screenOutput also normalises markdown and stray unicode. If that changed
    // anything — or blocked the reply — tell the client to replace what it got.
    const { text } = screenOutput(full);
    if (text !== full) send({ replace: text });
    finish();
  } catch (err) {
    if (abortedByClient) {
      if (!res.writableEnded) res.end();
      return;
    }
    if (full) {
      // Partial answer already delivered — screen and close cleanly.
      const { text } = screenOutput(full);
      if (text !== full) send({ replace: text });
      return finish();
    }
    send({ error: friendlyError(err) });
    if (!res.writableEnded) res.end();
  } finally {
    clearTimeout(timer);
    req.off('close', onClose);
  }
};

module.exports = { chatHandler, chatStreamHandler };
