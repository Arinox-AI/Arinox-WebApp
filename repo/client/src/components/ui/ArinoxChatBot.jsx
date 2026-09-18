import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowUp, Square, X } from 'lucide-react';

const WELCOME = {
  role: 'assistant',
  content: "Hey, I'm Arin. Ask me anything about Arinox or AI.",
};

const SUGGESTED = [
  'What is Arinox?',
  'What is CommandCore?',
  'What is agentic AI?',
  'Where are your offices?',
];

const EASE = [0.22, 1, 0.36, 1];

/* Mono micro-label, the site's instrument chrome. Written explicitly rather
   than via .eyebrow so the size can drop without a specificity fight. */
const Label = ({ children, className = '' }) => (
  <span className={`font-mono uppercase tracking-[0.14em] ${className}`}>{children}</span>
);

/* Arin's mark is the Arinox "A", not a mascot. */
const ArinMark = ({ size = 18, className = '' }) => (
  <img
    src="/images/brand/arinox-a-orange.png"
    alt=""
    aria-hidden
    className={`select-none object-contain ${className}`}
    style={{ width: size, height: size }}
  />
);

/* Group plain-text replies into paragraphs and "- " bullet lists. */
function renderRich(text) {
  const blocks = [];
  let list = null;
  for (const raw of text.split('\n')) {
    const bullet = /^\s*[-•]\s+(.*)$/.exec(raw);
    if (bullet) {
      if (!list) {
        list = [];
        blocks.push({ type: 'list', items: list });
      }
      list.push(bullet[1]);
    } else if (raw.trim() === '') {
      list = null;
      blocks.push({ type: 'gap' });
    } else {
      list = null;
      blocks.push({ type: 'p', text: raw });
    }
  }
  return blocks;
}

function MessageBody({ text }) {
  return (
    <div className="break-words">
      {renderRich(text).map((b, i) => {
        if (b.type === 'gap') return <div key={i} className="h-2.5" />;
        if (b.type === 'list') {
          return (
            <ul key={i} className="my-1.5 space-y-1.5">
              {b.items.map((item, j) => (
                <li key={j} className="flex gap-2.5">
                  <span className="mt-[9px] h-px w-3 shrink-0 bg-ember" aria-hidden />
                  <span className="flex-1">{item}</span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="whitespace-pre-wrap">
            {b.text}
          </p>
        );
      })}
    </div>
  );
}

const Caret = () => (
  <span
    aria-hidden
    className="ml-0.5 inline-block h-[12px] w-[2px] translate-y-[1px] bg-ember"
    style={{ animation: 'blink 1s steps(1) infinite' }}
  />
);

export default function ArinoxChatBot() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [popup, setPopup] = useState(false);
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState('');
  const [lastSent, setLastSent] = useState('');

  const messagesRef = useRef(null);
  const inputRef = useRef(null);
  const abortRef = useRef(null);

  useEffect(() => {
    try {
      if (sessionStorage.getItem('arinox_chat_popup_dismissed')) return;
    } catch { /* storage blocked — still show the popup */ }
    const t = setTimeout(() => setPopup(true), 4000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Pin to the bottom directly; a smooth scroll per token reads as jitter.
  useEffect(() => {
    const el = messagesRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, streaming, open]);

  useEffect(() => () => abortRef.current?.abort(), []);

  const dismissPopup = useCallback(() => {
    try { sessionStorage.setItem('arinox_chat_popup_dismissed', 'true'); } catch { /* ignore */ }
    setPopup(false);
  }, []);

  const autoGrow = (el) => {
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  };

  const stop = () => {
    abortRef.current?.abort();
    abortRef.current = null;
  };

  const send = async (text) => {
    const content = (text ?? input).trim();
    if (!content || streaming) return;

    setInput('');
    setError('');
    setLastSent(content);
    requestAnimationFrame(() => autoGrow(inputRef.current));

    const history = [...messages, { role: 'user', content }];
    setMessages([...history, { role: 'assistant', content: '' }]);
    setStreaming(true);

    const payload = history.filter((m) => m.role !== 'system' && m.content);
    const controller = new AbortController();
    abortRef.current = controller;

    const appendDelta = (delta) =>
      setMessages((prev) => {
        const next = [...prev];
        const last = next[next.length - 1];
        next[next.length - 1] = { ...last, content: last.content + delta };
        return next;
      });

    const replaceLast = (value) =>
      setMessages((prev) => {
        const next = [...prev];
        next[next.length - 1] = { role: 'assistant', content: value };
        return next;
      });

    try {
      const res = await fetch('/api/v1/chat/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: payload }),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) throw new Error('bad response');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let finished = false;

      while (!finished) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const frames = buffer.split('\n\n');
        buffer = frames.pop() || '';

        for (const frame of frames) {
          const line = frame.split('\n').find((l) => l.startsWith('data:'));
          if (!line) continue;
          let data;
          try { data = JSON.parse(line.slice(5).trim()); } catch { continue; }

          if (data.delta) appendDelta(data.delta);
          else if (data.replace) replaceLast(data.replace);
          else if (data.error) setError(data.error);
          else if (data.done) finished = true;
        }
      }
    } catch (err) {
      if (err.name !== 'AbortError') setError('Could not reach Arin. Please try again.');
    } finally {
      abortRef.current = null;
      setStreaming(false);
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === 'assistant' && !last.content) return prev.slice(0, -1);
        return prev;
      });
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  // Container morph sizes. The shell starts as the compact chip and grows to
  // the panel; measured so the open size tracks the viewport.
  const [dims, setDims] = useState({ w: 420, h: 620 });
  useEffect(() => {
    const measure = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      setDims({ w: Math.min(420, vw - 24), h: Math.min(620, vh - 104) });
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);
  const CLOSED = { w: 136, h: 48 };

  // Open overshoots slightly (bouncy); close settles calmly. The content waits
  // for the box to be most of the way there before blurring in, so text never
  // reflows on screen mid-resize.
  const shellTransition = reduce
    ? 'none'
    : open
      ? 'width 460ms cubic-bezier(0.34, 1.2, 0.64, 1), height 460ms cubic-bezier(0.34, 1.2, 0.64, 1), border-radius 460ms cubic-bezier(0.34, 1.2, 0.64, 1), border-color 300ms ease'
      : 'width 300ms cubic-bezier(0.22, 1, 0.36, 1), height 300ms cubic-bezier(0.22, 1, 0.36, 1), border-radius 300ms cubic-bezier(0.22, 1, 0.36, 1), border-color 300ms ease';

  const contentParent = {
    hidden: {},
    show: { transition: { staggerChildren: 0.05, delayChildren: reduce ? 0 : 0.24 } },
  };
  const contentItem = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 10, filter: 'blur(6px)' },
        show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: 'spring', stiffness: 380, damping: 30 } },
      };

  const lastMsg = messages[messages.length - 1];
  const waitingFirstToken = streaming && !lastMsg?.content;

  const openChat = () => { if (popup) dismissPopup(); setOpen(true); };

  return (
    <div data-chatbot className="fixed bottom-4 right-4 z-[50] sm:bottom-6 sm:right-6">
      <div className="relative">
        {/* Popup — restrained card, eyebrow rule, no speech tail */}
        <AnimatePresence>
          {popup && !open && (
            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10, filter: 'blur(6px)' }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: 10, filter: 'blur(6px)' }}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              onClick={openChat}
              className="absolute bottom-[68px] right-0 w-[236px] cursor-pointer rounded-lg border border-line bg-white p-4 shadow-[0_20px_50px_-24px_rgba(11,11,13,0.38)]"
            >
              <button
                onClick={(e) => { e.stopPropagation(); dismissPopup(); }}
                aria-label="Dismiss"
                className="absolute right-2 top-2 rounded p-1.5 text-ink-faint transition-colors hover:text-ink"
              >
                <X size={13} strokeWidth={2} />
              </button>
              <span className="block h-px w-6 bg-ember" aria-hidden />
              <Label className="mt-3 block text-[9px] text-ink-faint">Arin · Arinox AI</Label>
              <p className="mt-2 pr-3 font-display text-[15px] leading-snug text-ink">
                Ask me anything about Arinox or AI.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* One element that is the launcher when closed and the panel when open:
            it morphs in size, radius and border while the two faces cross-blur. */}
        <div
          role={open ? 'dialog' : undefined}
          aria-label={open ? 'Chat with Arin' : undefined}
          className="absolute bottom-0 right-0 overflow-hidden border bg-white shadow-[0_28px_70px_-28px_rgba(11,11,13,0.45)]"
          style={{
            width: open ? dims.w : CLOSED.w,
            height: open ? dims.h : CLOSED.h,
            borderRadius: open ? 8 : 12,
            borderColor: open ? '#e2e1dd' : '#17171a',
            transition: shellTransition,
            willChange: 'width, height',
          }}
        >
          {/* Closed face — the ink chip, blurring out as the panel unfolds */}
          <button
            type="button"
            onClick={openChat}
            aria-label="Chat with Arin"
            aria-expanded={open}
            aria-hidden={open}
            tabIndex={open ? -1 : 0}
            className="chip absolute inset-0 flex items-center justify-center gap-2.5 bg-ink leading-none text-phos transition-colors hover:bg-black"
            style={{
              opacity: open ? 0 : 1,
              filter: open ? 'blur(8px)' : 'blur(0px)',
              transform: open ? 'scale(0.92)' : 'scale(1)',
              pointerEvents: open ? 'none' : 'auto',
              transition: reduce ? 'none' : open
                ? 'opacity 140ms ease, filter 140ms ease, transform 180ms ease'
                : 'opacity 180ms ease 130ms, filter 180ms ease 130ms, transform 180ms ease 130ms',
            }}
          >
            <ArinMark size={15} />
            Ask Arin
          </button>

          {/* Open face — mounted only while open so its controls never sit in the
              tab order, and blur-faded in once the box has settled. */}
          <AnimatePresence>
            {open && (
              <motion.div
                key="panel"
                variants={contentParent}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, transition: { duration: 0.12, ease: EASE } }}
                className="absolute inset-0 flex flex-col"
              >
                {/* Header — eyebrow rule + display name + mono status */}
                <motion.header variants={contentItem} className="flex shrink-0 items-center gap-3 border-b border-line px-4 py-3.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] border border-line bg-paper">
                <ArinMark size={17} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-display text-[16px] leading-none text-ink">Arin</p>
                <Label className="mt-1.5 flex items-center gap-1.5 text-[9px] text-ink-faint">
                  <span className="h-1.5 w-1.5 rounded-full bg-ember" aria-hidden />
                  Arinox AI · Online
                </Label>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="shrink-0 rounded-md p-2 text-ink-faint transition-colors hover:bg-paper-2 hover:text-ink"
              >
                <X size={16} strokeWidth={1.9} />
              </button>
            </motion.header>

            {/* Messages — editorial rows, not speech bubbles */}
            <motion.div
              variants={contentItem}
              ref={messagesRef}
              aria-live="polite"
              className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto bg-paper px-4 py-5"
            >
              {messages.map((m, i) => {
                const isLast = i === messages.length - 1;
                const isStreamingThis = streaming && isLast && m.role === 'assistant';
                // An empty assistant turn has nothing to show; the thinking row
                // below covers that state, so rendering it here caused a double.
                if (m.role === 'assistant' && !m.content) return null;

                if (m.role === 'user') {
                  return (
                    <div key={i} className="flex justify-end">
                      <div className="max-w-[86%]">
                        <Label className="block text-right text-[9px] text-ink-faint">You</Label>
                        <div className="mt-1.5 rounded-lg bg-ink px-3.5 py-2.5 text-[13.5px] leading-[1.62] text-phos">
                          <p className="whitespace-pre-wrap break-words">{m.content}</p>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={i} className="flex gap-2.5">
                    <span className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] border border-line bg-white">
                      <ArinMark size={12} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <Label className="text-[9px] text-ember-deep">Arin</Label>
                      <div className="mt-1.5 border-l border-line pl-3 text-[14.5px] leading-[1.68] text-ink">
                        <MessageBody text={m.content} />
                        {isStreamingThis && <Caret />}
                      </div>
                    </div>
                  </div>
                );
              })}

              {waitingFirstToken && (
                <div className="flex items-center gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] border border-line bg-white">
                    <ArinMark size={12} />
                  </span>
                  <Label className="flex items-center gap-2 text-[9px] text-ink-faint">
                    Arin is thinking
                    <Caret />
                  </Label>
                </div>
              )}

              {error && (
                <div className="border-l-2 border-ember bg-white px-3.5 py-3">
                  <p className="text-[13px] leading-relaxed text-ember-deep">{error}</p>
                  {lastSent && (
                    <button
                      onClick={() => send(lastSent)}
                      className="mt-2 border-b border-ember/40 pb-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ember-deep transition-colors hover:border-ember-deep"
                    >
                      Try again
                    </button>
                  )}
                </div>
              )}
            </motion.div>

            {/* Suggested prompts — a small grid of hairline cards */}
            {messages.length === 1 && (
              <motion.div variants={contentItem} className="shrink-0 border-t border-line bg-white p-3">
                <Label className="block px-1 text-[9px] text-ink-faint">Try asking</Label>
                <div className="mt-2.5 grid grid-cols-2 gap-2">
                  {SUGGESTED.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="group flex items-start gap-2 rounded-lg border border-line bg-paper/60 p-3 text-left transition-colors hover:border-ink/25 hover:bg-white"
                    >
                      <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-ember" aria-hidden />
                      <span className="text-[12.5px] leading-snug text-ink-soft transition-colors group-hover:text-ink">{s}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Composer — bordered field with an inline send control */}
            <motion.div variants={contentItem} className="shrink-0 border-t border-line bg-white p-3">
              <div className="flex items-end gap-2 rounded-xl border border-line bg-paper/60 p-2 transition-colors focus-within:border-ember/60">
                <textarea
                  ref={inputRef}
                  rows={1}
                  value={input}
                  onChange={(e) => { setInput(e.target.value); autoGrow(e.target); }}
                  onKeyDown={handleKey}
                  placeholder="Ask Arin about Arinox or AI"
                  disabled={streaming}
                  className="max-h-[120px] flex-1 resize-none bg-transparent px-1.5 py-1.5 text-[14px] leading-[1.55] text-ink outline-none placeholder:text-ink-faint disabled:opacity-60"
                />
                {streaming ? (
                  <button
                    onClick={stop}
                    aria-label="Stop"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-white text-ink transition-colors hover:border-ink/50"
                  >
                    <Square size={13} strokeWidth={2} />
                  </button>
                ) : (
                  <button
                    onClick={() => send()}
                    disabled={!input.trim()}
                    aria-label="Send"
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors ${
                      input.trim()
                        ? 'bg-ember text-white hover:bg-ember-deep'
                        : 'cursor-not-allowed border border-line bg-white text-ink-faint'
                    }`}
                  >
                    <ArrowUp size={16} strokeWidth={2.2} />
                  </button>
                )}
              </div>
              <Label className="mt-2 block text-center text-[8.5px] tracking-[0.1em] text-ink-faint">
                Arin can make mistakes. For anything important, contact{' '}
                <a href="/contact" className="text-ember-deep underline underline-offset-2 hover:text-ink">assist@arinox.ai</a>
              </Label>
            </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
