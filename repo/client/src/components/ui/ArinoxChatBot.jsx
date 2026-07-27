import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const WELCOME = {
  role: 'assistant',
  content: "Hey! I'm Arin. How may I assist you?",
};

const SUGGESTED = [
  'What is Arinox?',
  'What is Agentic AI?',
  'Who leads Arinox?',
  'Where are your offices?',
];

const KidBotIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Top head bumps — teal, like reference image */}
    <rect x="13" y="1.5" width="8" height="11" rx="4" fill="#1db8aa" />
    <rect x="27" y="1.5" width="8" height="11" rx="4" fill="#1db8aa" />

    {/* Side ear left */}
    <circle cx="4" cy="23" r="5.5" fill="#dcdcec" />
    <circle cx="4" cy="23" r="2.8" fill="#1db8aa" />
    {/* Side ear right */}
    <circle cx="44" cy="23" r="5.5" fill="#dcdcec" />
    <circle cx="44" cy="23" r="2.8" fill="#1db8aa" />

    {/* Head */}
    <circle cx="24" cy="22" r="17.5" fill="#e6e6f2" />
    {/* Head highlight (soft sheen top-left) */}
    <circle cx="16" cy="14" r="7" fill="white" fillOpacity="0.4" />

    {/* Dark visor face */}
    <ellipse cx="24" cy="24" rx="13.5" ry="10.5" fill="#06061e" />
    {/* Visor blue inner glow */}
    <ellipse cx="24" cy="25" rx="10.5" ry="7.5" fill="#0f22cc" fillOpacity="0.5" />
    {/* Visor top gloss */}
    <ellipse cx="18.5" cy="17.5" rx="4.5" ry="2" fill="white" fillOpacity="0.15" transform="rotate(-18 18.5 17.5)" />

    {/* Left eye — glow halo */}
    <path d="M14 22 Q18 15.5 22 22" stroke="#4d7aff" strokeWidth="4.5" strokeLinecap="round" fill="none" strokeOpacity="0.65" />
    {/* Left eye — white crescent */}
    <path d="M14 22 Q18 15.5 22 22" stroke="white" strokeWidth="2.4" strokeLinecap="round" fill="none" />

    {/* Right eye — glow halo */}
    <path d="M26 22 Q30 15.5 34 22" stroke="#4d7aff" strokeWidth="4.5" strokeLinecap="round" fill="none" strokeOpacity="0.65" />
    {/* Right eye — white crescent */}
    <path d="M26 22 Q30 15.5 34 22" stroke="white" strokeWidth="2.4" strokeLinecap="round" fill="none" />

    {/* Body */}
    <ellipse cx="24" cy="42" rx="11.5" ry="8" fill="#d0d0e4" />
    {/* Teal chest panel */}
    <ellipse cx="24" cy="43" rx="7.5" ry="5.5" fill="#1db8aa" />

    {/* Left arm */}
    <ellipse cx="10" cy="39" rx="4" ry="7.5" fill="#d0d0e4" transform="rotate(-18 10 39)" />
    {/* Right arm */}
    <ellipse cx="38" cy="39" rx="4" ry="7.5" fill="#d0d0e4" transform="rotate(18 38 39)" />
  </svg>
);

export default function ArinoxChatBot() {
  const [open, setOpen] = useState(false);
  const [popup, setPopup] = useState(false);
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const streamRef = useRef(null);

  // Show popup after 2.5s on first load
  useEffect(() => {
    const t = setTimeout(() => setPopup(true), 2500);
    return () => clearTimeout(t);
  }, []);

  // Sync popup with open state (skip first render)
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    setPopup(!open);
  }, [open]);

  useEffect(() => {
    if (open) {
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
      inputRef.current?.focus();
    }
  }, [open, messages]);

  // Clean up streaming timer on unmount
  useEffect(() => () => { if (streamRef.current) clearTimeout(streamRef.current); }, []);

  const send = async (text) => {
    const content = (text ?? input).trim();
    if (!content || loading || streaming) return;
    setInput('');
    setError('');

    const userMsg = { role: 'user', content };
    const next = [...messages, userMsg];
    setMessages(next);
    setLoading(true);

    try {
      const payload = next.filter(m => m.role !== 'system');
      const { data } = await axios.post('/api/v1/chat', { messages: payload });
      const fullReply = data.reply;
      setLoading(false);

      // Typewriter effect: reveal one word at a time.
      // Pauses 450ms at sentence endings (. ! ?) for a natural rhythm.
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);
      setStreaming(true);

      const words = fullReply.trim().split(/\s+/);
      let wordIdx = 0;

      const typeNext = () => {
        wordIdx++;
        const word = words[wordIdx - 1] ?? '';
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: 'assistant',
            content: words.slice(0, wordIdx).join(' '),
          };
          return updated;
        });

        if (wordIdx >= words.length) {
          streamRef.current = null;
          setStreaming(false);
          return;
        }

        // Short pause after sentence-ending punctuation
        const delay = /[.!?]$/.test(word) ? 450 : 75;
        streamRef.current = setTimeout(typeNext, delay);
      };

      typeNext();
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.error;
      setError(msg || 'Could not reach Arin. Please try again.');
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <div
      data-chatbot
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[150] flex flex-col items-end gap-3"
    >
      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            style={{
              width: 'min(420px, calc(100vw - 24px))',
              maxHeight: 'min(600px, calc(100dvh - 100px))',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,0,0,0.08)',
              background: '#ffffff',
            }}
          >
            {/* Header */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '12px 16px',
              background: 'linear-gradient(135deg, #FE6300 0%, #E55A00 100%)',
              flexShrink: 0,
            }}>
              <div style={{
                width: '42px', height: '42px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, position: 'relative',
              }}>
                <KidBotIcon size={30} />
                <span style={{
                  position: 'absolute', bottom: '1px', right: '1px',
                  width: '9px', height: '9px', borderRadius: '50%',
                  background: '#4ade80', border: '2px solid #E55A00',
                }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ color: '#fff', fontWeight: 700, fontSize: '15px', lineHeight: 1.2, margin: 0 }}>Arin</p>
                <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '11px', margin: '2px 0 0 0' }}>Arinox AI • Online</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                style={{ color: 'rgba(255,255,255,0.8)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px', flexShrink: 0 }}
                aria-label="Close"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px', minHeight: 0, background: '#f7f7f8' }}>
              {messages.map((m, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start', alignItems: 'flex-end', gap: '7px' }}>
                  {m.role === 'assistant' && (
                    <div style={{
                      width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                      background: 'linear-gradient(135deg, #FE6300, #E55A00)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(254,99,0,0.3)',
                    }}>
                      <KidBotIcon size={18} />
                    </div>
                  )}
                  <div style={{
                    maxWidth: '78%',
                    padding: '9px 13px',
                    borderRadius: m.role === 'user' ? '16px 16px 4px 16px' : '4px 16px 16px 16px',
                    fontSize: '13.5px',
                    lineHeight: '1.55',
                    ...(m.role === 'user'
                      ? { background: 'linear-gradient(135deg, #FE6300, #E55A00)', color: '#fff' }
                      : { background: '#ffffff', color: '#1a1a1a', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }
                    ),
                  }}>
                    {m.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end', gap: '7px' }}>
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                    background: 'linear-gradient(135deg, #FE6300, #E55A00)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(254,99,0,0.3)',
                  }}>
                    <KidBotIcon size={18} />
                  </div>
                  <div style={{ display: 'flex', gap: '5px', alignItems: 'center', padding: '10px 14px', background: '#ffffff', borderRadius: '4px 16px 16px 16px', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}>
                    {[0, 1, 2].map(i => (
                      <motion.span key={i} style={{ display: 'block', width: '6px', height: '6px', borderRadius: '50%', background: '#FE6300' }}
                        animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
                        transition={{ duration: 0.85, delay: i * 0.17, repeat: Infinity }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {error && (
                <div style={{ textAlign: 'center', fontSize: '12px', color: '#cc2200', padding: '6px 10px', background: '#fff0ee', borderRadius: '8px', border: '1px solid #ffccc7' }}>
                  {error}
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Suggestions */}
            {messages.length === 1 && (
              <div style={{ padding: '10px 14px 8px', display: 'flex', flexWrap: 'wrap', gap: '6px', background: '#f7f7f8', borderTop: '1px solid #ebebeb' }}>
                {SUGGESTED.map(s => (
                  <button key={s} onClick={() => send(s)} style={{
                    fontSize: '11.5px', padding: '5px 11px', borderRadius: '20px', cursor: 'pointer',
                    background: '#fff', color: '#FE6300',
                    border: '1px solid rgba(254,99,0,0.35)', transition: 'background 0.15s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#FE6300'; e.currentTarget.style.color = '#fff'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#FE6300'; }}
                  >{s}</button>
                ))}
              </div>
            )}

            {/* Input */}
            <div style={{ padding: '12px 14px 14px', flexShrink: 0, borderTop: '1px solid #ebebeb', background: '#fff' }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', background: '#f4f4f5', border: '1.5px solid #e5e5e5', borderRadius: '14px', padding: '10px 12px' }}>
                <textarea
                  ref={inputRef}
                  rows={2}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Ask Arin about Arinox or AI…"
                  disabled={loading || streaming}
                  style={{
                    flex: 1, background: 'transparent', border: 'none', outline: 'none', resize: 'none',
                    color: '#1a1a1a', fontSize: '13.5px', lineHeight: '1.55', maxHeight: '120px',
                    overflowY: 'auto', fontFamily: 'inherit', cursor: 'text',
                  }}
                />
                <button
                  onClick={() => send()}
                  disabled={!input.trim() || loading || streaming}
                  style={{
                    flexShrink: 0, width: '34px', height: '34px', borderRadius: '9px', border: 'none',
                    background: input.trim() && !loading && !streaming ? 'linear-gradient(135deg, #FE6300, #E55A00)' : '#e5e5e5',
                    cursor: input.trim() && !loading && !streaming ? 'pointer' : 'not-allowed',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s',
                  }}
                  aria-label="Send"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 2 11 13M22 2 15 22l-4-9-9-4 20-7z" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Popup speech bubble */}
      <AnimatePresence>
        {popup && !open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            style={{
              position: 'relative',
              background: '#fff',
              borderRadius: '16px 16px 4px 16px',
              padding: '12px 14px 12px 14px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.18)',
              maxWidth: 'min(220px, calc(100vw - 80px))',
              cursor: 'pointer',
              border: '1.5px solid rgba(254,99,0,0.18)',
            }}
            onClick={() => { setPopup(false); setOpen(true); }}
          >
            <button
              onClick={e => { e.stopPropagation(); setPopup(false); }}
              style={{
                position: 'absolute', top: '8px', right: '8px',
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#aaa', fontSize: '14px', lineHeight: 1, padding: '2px',
              }}
              aria-label="Dismiss"
            >×</button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <div style={{
                width: '34px', height: '34px', borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg, #FE6300, #E55A00)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}><KidBotIcon size={22} /></div>
              <div>
                <p style={{ margin: 0, fontWeight: 700, fontSize: '13px', color: '#1a1a1a' }}>Arin</p>
                <p style={{ margin: 0, fontSize: '10.5px', color: '#FE6300', fontWeight: 600 }}>Arinox AI</p>
              </div>
            </div>
            <p style={{ margin: 0, fontSize: '12.5px', color: '#444', lineHeight: 1.55 }}>
              Hey! I'm Arin, how may I assist you?
            </p>

            <div style={{
              position: 'absolute', bottom: '-10px', right: '22px',
              width: 0, height: 0,
              borderLeft: '10px solid transparent',
              borderTop: '10px solid #fff',
              filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.08))',
            }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating toggle button */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        aria-label="Chat with Arin"
        style={{
          width: '50px', height: '50px', borderRadius: '50%', border: 'none', cursor: 'pointer',
          background: 'linear-gradient(135deg, #FE6300, #E55A00)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
          boxShadow: '0 8px 30px rgba(254,99,0,0.45)',
        }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.svg key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}
              width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M18 6 6 18M6 6l12 12" />
            </motion.svg>
          ) : (
            <motion.div key="bot" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <KidBotIcon size={30} />
            </motion.div>
          )}
        </AnimatePresence>

        {!open && (
          <motion.span style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            background: 'linear-gradient(135deg, #FE6300, #E55A00)', opacity: 0.5,
          }}
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        )}
      </motion.button>
    </div>
  );
}
