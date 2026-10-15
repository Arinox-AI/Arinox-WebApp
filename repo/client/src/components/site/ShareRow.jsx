import { useState } from 'react';
import toast from 'react-hot-toast';
import { Mail, Link2, Check } from 'lucide-react';
import { WhatsappIcon } from './Icons';

/* Editorial share row: WhatsApp · Email · Copy link.
   Deep links only (wa.me / mailto / clipboard) — no third-party scripts,
   widgets or tracking pixels, keeping the Privacy page's promises intact.
   `url` is the page's CANONICAL link (not location.href), so shares made
   anywhere (staging, localhost) always land on the live URL; the OG meta
   shells make WhatsApp/LinkedIn render a proper preview card for it. */

const ShareRow = ({ title, url, label = 'Share' }) => {
  const [copied, setCopied] = useState(false);

  const wa = `https://wa.me/?text=${encodeURIComponent(`${title} — ${url}`)}`;
  const mail = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${title}\n\n${url}`)}`;

  const copy = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const ta = document.createElement('textarea');
        ta.value = url;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setCopied(true);
      toast.success('Link copied.');
      setTimeout(() => setCopied(false), 2400);
    } catch {
      toast.error('Could not copy — long-press the page URL instead.');
    }
  };

  const btnCls =
    'chip inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-2 text-[11.5px] text-ink-soft transition-colors duration-200 hover:border-ink hover:text-ink';

  return (
    <div>
      <p className="eyebrow text-ink-faint">{label}</p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className={btnCls}
          aria-label={`Share on WhatsApp: ${title}`}
        >
          <WhatsappIcon size={14} />
          WhatsApp
        </a>
        <a href={mail} className={btnCls} aria-label={`Share by email: ${title}`}>
          <Mail size={14} strokeWidth={1.8} />
          Email
        </a>
        <button type="button" onClick={copy} className={btnCls} aria-label="Copy the page link">
          {copied ? <Check size={14} strokeWidth={2.2} /> : <Link2 size={14} strokeWidth={1.8} />}
          {copied ? 'Copied' : 'Copy link'}
        </button>
      </div>
    </div>
  );
};

export default ShareRow;
