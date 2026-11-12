const { createCompletion, MODEL, REQUEST_TIMEOUT_MS } = require('../chat/groq');
const { buildSystemPrompt } = require('../chat/prompt');
const { selectKnowledge } = require('../chat/retrieve');
const { screenInput, screenOutput, REINFORCEMENT, HARD_REFUSAL } = require('../chat/guardrails');
const { logExchange } = require('../chat/store');

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

// Which page the visitor was on - lets the log show what each page prompts.
const pageOf = (body) => (typeof body?.page === 'string' && body.page.startsWith('/') ? body.page : null);

function buildPrompt(sanitized) {
  // A high-confidence injection anywhere in the user's turns is refused — the
  // client controls history, so an attacker could try to bury one earlier.
  const hard = sanitized.some((m) => m.role === 'user' && screenInput(m.content).level === 'hard');
  if (hard) return { messages: [], screened: { level: 'hard', reason: 'injection' } };

  const screened = screenInput(lastUserMessage(sanitized));
  // Only the knowledge this conversation needs: keeps each request well inside
  // Groq's per-minute token budget (see chat/retrieve.js).
  const messages = [{ role: 'system', content: buildSystemPrompt(selectKnowledge(sanitized)) }];
  if (screened.level === 'soft') messages.push({ role: 'system', content: REINFORCEMENT });
  return { messages: [...messages, ...sanitized], screened };
}

function friendlyError(err) {
  if (err?.status === 429) return FRIENDLY[429];
  if (err?.status === 401 || err?.status === 403) return FRIENDLY[401];
  if (err?.name === 'AbortError') return 'Arin took too long to respond. Please try again.';
  return 'Sorry, something went wrong. Please try again.';
}

/* Streamed text is tidied as it arrives: exotic spaces become plain spaces,
 * zero-width characters are dropped, the non-breaking hyphen becomes '-'.
 * Built from char codes so the source holds no invisible characters. */
const charClass = (codes) => new RegExp(`[${codes.map((c) => String.fromCharCode(c)).join('')}]`, 'g');
const ODD_SPACES = charClass([0xa0, 0x2007, 0x2009, 0x202f, 0x2002, 0x2003]);
const ZERO_WIDTH = charClass([0x200b, 0x200c, 0x200d, 0xfeff]);
const NB_HYPHEN = charClass([0x2011]);
const tidyDelta = (text) => text.replace(ODD_SPACES, ' ').replace(ZERO_WIDTH, '').replace(NB_HYPHEN, '-');

const errorReason = (err) => (err?.status ? `http-${err.status}` : 'upstream');

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
  const question = lastUserMessage(sanitized);
  const page = pageOf(req.body);
  const startedAt = Date.now();

  // High-confidence injection: refuse without spending a token.
  if (screened.level === 'hard') {
    await logExchange({ question, reply: HARD_REFUSAL, blocked: true, reason: 'injection', model: MODEL, page });
    return res.json({ reply: HARD_REFUSAL });
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const completion = await createCompletion(
      { messages: prompt },
      { signal: controller.signal },
    );
    const raw = completion.choices?.[0]?.message?.content ?? '';
    const { text, blocked, reason } = screenOutput(raw);
    await logExchange({ question, reply: text, blocked, reason, latencyMs: Date.now() - startedAt, model: MODEL, page });
    return res.json({ reply: text });
  } catch (err) {
    await logExchange({ question, reply: '', error: true, reason: errorReason(err), latencyMs: Date.now() - startedAt, model: MODEL, page });
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
  const question = lastUserMessage(sanitized);
  const page = pageOf(req.body);
  const startedAt = Date.now();

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
    await logExchange({ question, reply: HARD_REFUSAL, blocked: true, reason: 'injection', model: MODEL, page });
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
    const stream = await createCompletion(
      { messages: prompt, stream: true },
      { signal: controller.signal },
    );

    for await (const chunk of stream) {
      const delta = tidyDelta(chunk.choices?.[0]?.delta?.content || '');
      if (delta) {
        full += delta;
        send({ delta });
      }
    }

    // screenOutput also normalises markdown and stray unicode. If that changed
    // anything — or blocked the reply — tell the client to replace what it got.
    const { text, blocked, reason } = screenOutput(full);
    if (text !== full) send({ replace: text });
    // Logged BEFORE the stream closes: a serverless function can be frozen the
    // moment the response ends. The write is time-boxed inside logExchange.
    await logExchange({ question, reply: text, blocked, reason, latencyMs: Date.now() - startedAt, model: MODEL, page });
    finish();
  } catch (err) {
    if (abortedByClient) {
      if (!res.writableEnded) res.end();
      return;
    }
    if (full) {
      // Partial answer already delivered — screen and close cleanly.
      const { text, blocked, reason } = screenOutput(full);
      if (text !== full) send({ replace: text });
      await logExchange({ question, reply: text, blocked, reason, latencyMs: Date.now() - startedAt, model: MODEL, page });
      return finish();
    }
    await logExchange({ question, reply: '', error: true, reason: errorReason(err), latencyMs: Date.now() - startedAt, model: MODEL, page });
    send({ error: friendlyError(err) });
    if (!res.writableEnded) res.end();
  } finally {
    clearTimeout(timer);
    req.off('close', onClose);
  }
};

module.exports = { chatHandler, chatStreamHandler };
