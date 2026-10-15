import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Button } from './Button'
import { nav } from '../../data/site'
import { useBookCta, BOOK_CTA_TRANSITION } from './BookCtaContext'

/* Minimal dropdown: opens on hover and on keyboard focus, closes on leave,
   blur or Escape. The panel sits inside the header so there is no hover gap. */
function NavDropdown({ item }) {
  const [open, setOpen] = useState(false)
  const timeout = useRef(null)
  const { pathname } = useLocation()
  const active = pathname === item.to || item.group.some((c) => c.to === pathname)

  const openNow = () => {
    clearTimeout(timeout.current)
    setOpen(true)
  }
  const closeSoon = () => {
    clearTimeout(timeout.current)
    timeout.current = setTimeout(() => setOpen(false), 140)
  }

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      clearTimeout(timeout.current)
    }
  }, [])

  return (
    <div className="relative flex items-center" onMouseEnter={openNow} onMouseLeave={closeSoon}>
      <NavLink
        to={item.to}
        end={item.to === '/'}
        className={`flex items-center gap-1 pb-1 transition-colors duration-150 ${active ? 'text-ink shadow-[inset_0_-2px_0_var(--color-ember)]' : 'text-ink-soft hover:text-ink'}`}
        aria-haspopup="true"
        aria-expanded={open}
        onFocus={openNow}
        onBlur={closeSoon}
      >
        {item.label}
        <ChevronDown size={12} strokeWidth={2.2} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </NavLink>

      {open && (
        <div className="absolute left-1/2 top-full z-50 w-[290px] -translate-x-1/2 pt-3">
          <div className="rounded-card border border-line bg-white p-2 shadow-[0_24px_50px_-24px_rgba(11,11,13,0.28)]">
            {item.group.map((c) => (
              <Link
                key={c.to}
                to={c.to}
                onClick={() => setOpen(false)}
                className="block rounded-btn px-3.5 py-2.5 transition-colors hover:bg-paper-2"
              >
                <span className="block font-display text-[16.5px] leading-tight tracking-[-0.01em] text-ink">{c.label}</span>
                <span className="mt-0.5 block font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-faint">{c.note}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function navCls({ isActive }) {
  return `text-[12.5px] transition-colors duration-150 pb-1 ${
    isActive ? 'text-ink shadow-[inset_0_-2px_0_var(--color-ember)]' : 'text-ink-soft hover:text-ink'
  }`
}

export function Nav() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const { passed, hasHero } = useBookCta()
  const showNavCta = !hasHero || passed

  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const mobile = nav.flatMap((item) =>
    item.group
      ? [{ label: item.label, to: item.to, heading: true }, ...item.group]
      : [item]
  )

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur-[10px]">
      <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between gap-4 px-7">
        <Link to="/" aria-label="Arinox home" className="shrink-0">
          <img src="/images/brand/logo-orange.png" alt="Arinox" className="h-[26px] w-auto" />
        </Link>

        <nav className="chip hidden items-center lg:flex" aria-label="Main">
          {nav.map((item, i) => (
            <span key={item.label} className="flex items-center">
              {i > 0 && <span className="px-2.5 text-ink-faint" aria-hidden>·</span>}
              {item.group ? (
                <NavDropdown item={item} />
              ) : (
                <NavLink to={item.to} className={navCls} end={item.to === '/'}>
                  {item.label}
                </NavLink>
              )}
            </span>
          ))}
        </nav>

        <div className="hidden lg:block">
          <motion.div
            initial={false}
            animate={{
              opacity: showNavCta ? 1 : 0,
              y: showNavCta ? 0 : -10,
              scale: showNavCta ? 1 : 0.9,
            }}
            transition={BOOK_CTA_TRANSITION}
            style={{ pointerEvents: showNavCta ? 'auto' : 'none' }}
            aria-hidden={!showNavCta}
          >
            <Button to="/contact" variant="ember" size="sm">Book a session</Button>
          </motion.div>
        </div>

        <button
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="h-px w-6 bg-ink" />
          <span className="h-px w-6 bg-ink" />
          <span className="h-px w-6 bg-ink" />
        </button>      </div>

      {open && (
        <>
          <button
            className="fixed inset-0 top-[68px] z-40 cursor-default bg-ink/40 backdrop-blur-[2px] lg:hidden"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <div className="fixed inset-x-0 top-[68px] z-50 max-h-[calc(100vh-68px)] overflow-y-auto border-b border-line bg-paper p-7 pb-10 shadow-[0_30px_60px_-30px_rgba(11,11,13,0.45)] lg:hidden">
            <nav className="flex flex-col" aria-label="Mobile">
              {[...mobile, { label: 'Contact', to: '/contact' }].map((l) => (
                <NavLink
                  key={`${l.heading ? 'h' : 'l'}-${l.to}-${l.label}`}
                  to={l.to}
                  end={l.to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => {
                    if (l.heading) {
                      return `pt-7 pb-2 font-mono text-[10.5px] uppercase tracking-[0.16em] ${isActive ? 'text-ember-deep' : 'text-ink-faint'}`
                    }
                    return `border-b border-line py-3.5 font-display text-2xl tracking-[-0.01em] transition-colors ${
                      isActive ? 'text-ember' : 'text-ink'
                    }`
                  }}
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>
            <div className="mt-7">
              <Button to="/contact" variant="ember" className="w-full" onClick={() => setOpen(false)}>
                Book a session
              </Button>
            </div>
          </div>
        </>
      )}
    </header>
  )
}
