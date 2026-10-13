import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/* CompareSlider — before/after wipe, the pattern shipped by LoomUI, Paragon
   and s11a (all MIT). The `after` layer sits in flow and sizes the frame;
   `before` is clipped to the divider position with pure clip-path, so the
   drag touches compositor work only, nothing reflows.
   - Whole frame takes the gesture (click jumps, then drags; pointer capture)
   - sr-only range input drives keyboard arrows + reduced-motion use
   - Corner chips label each side; a hairline seam + round handle mark the line */
export function CompareSlider({
  before,
  after,
  defaultPosition = 42,
  beforeLabel = 'BEFORE',
  afterLabel = 'AFTER',
  className = '',
}) {
  const frameRef = useRef(null);
  const drag = useRef(false);
  const [pos, setPos] = useState(Math.min(100, Math.max(0, defaultPosition)));

  const setFromClientX = (clientX) => {
    const r = frameRef.current?.getBoundingClientRect();
    if (!r || r.width === 0) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };

  const onDown = (e) => {
    drag.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    setFromClientX(e.clientX);
  };
  const onMove = (e) => {
    if (drag.current) setFromClientX(e.clientX);
  };
  const onUp = (e) => {
    drag.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* capture already released */
    }
  };

  return (
    <figure className={className}>
      <div
        ref={frameRef}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        className="group relative touch-none select-none overflow-hidden rounded-2xl border border-white/10 bg-[#0e0e11]"
      >
        {/* AFTER in flow — sizes the frame */}
        <div className="pointer-events-none w-full">{after}</div>

        {/* BEFORE on top, clipped to the left of the divider */}
        <div className="pointer-events-none absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          {before}
        </div>

        {/* corner chips */}
        <span className="pointer-events-none absolute left-3 top-3 z-10 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-white/80 backdrop-blur-sm">
          {beforeLabel}
        </span>
        <span className="pointer-events-none absolute right-3 top-3 z-10 rounded-full border border-ember/40 bg-black/40 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-[#ff8a4a] backdrop-blur-sm">
          {afterLabel}
        </span>

        {/* seam + handle */}
        <div className="pointer-events-none absolute inset-y-0 z-10" style={{ left: `${pos}%` }} aria-hidden>
          <div className="absolute inset-y-0 -left-px w-px bg-white/30" />
          <div className="absolute left-0 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-white shadow-[0_10px_24px_rgba(0,0,0,0.45)]">
            <ChevronLeft size={12} strokeWidth={2.6} className="text-ink" />
            <ChevronRight size={12} strokeWidth={2.6} className="text-ink" />
          </div>
        </div>

        {/* keyboard / reduced-motion access: invisible range input */}
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={pos}
          onChange={(e) => setPos(Math.min(100, Math.max(0, +e.target.value)))}
          aria-label="Compare before and after"
          className="sr-only"
        />
      </div>
      <figcaption className="mt-3 text-center font-mono text-[9.5px] uppercase tracking-[0.16em] text-ghost/70">
        Drag to compare
      </figcaption>
    </figure>
  );
}