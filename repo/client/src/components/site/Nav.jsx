import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { Button } from './Button'
import { nav } from '../../data/site'

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
    timeout.current = setTimeout(() => setOpen(false), 320)
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
        className={`flex items-center gap-1 whitespace-nowrap pb-1 transition-colors duration-150 ${active ? 'text-ink shadow-[inset_0_-2px_0_var(--color-ember)]' : 'text-ink-soft hover:text-ink'}`}
        aria-haspopup="true"
        aria-expanded={open}
        onFocus={openNow}
        onBlur={closeSoon}
      >
        {item.label}
        <ChevronDown size={12} strokeWidth={2.2} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </NavLink>

      {open && (
        /* Single-column panel (Solutions and Company): square paper panel, hairline
           border, no shadow; names in serif, notes in quiet sans. */
        <div className="absolute -left-4 top-full z-50 w-[300px] pt-3">
          <div role="group" aria-label={item.label} className="border border-line bg-paper font-sans normal-case tracking-normal">
            <div className="px-5 pb-4 pt-5">
              <p className="mb-3 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-faint">{item.label}</p>
              {item.group.map((c) => (
                <Link key={c.to} to={c.to} onClick={() => setOpen(false)} className="group block py-2">
                  <span className="block font-display text-[16.5px] leading-tight tracking-[-0.01em] text-ink transition-colors group-hover:text-ember-deep">{c.label}</span>
                  <span className="mt-0.5 block text-[12.5px] leading-snug text-ink-soft">{c.note}</span>
                </Link>
              ))}
            </div>
            {/* Opt-in footer link (item.allLabel), so the hub page is one click away */}
            {item.allLabel && (
              <Link
                to={item.to}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-t border-line px-5 py-3 font-mono text-[11px] uppercase tracking-[0.1em] text-ember-deep transition-colors hover:text-ink"
              >
                {item.allLabel}
                <span aria-hidden>&rarr;</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function navCls({ isActive }) {
  return `whitespace-nowrap text-[12.5px] transition-colors duration-150 pb-1 ${
    isActive ? 'text-ink shadow-[inset_0_-2px_0_var(--color-ember)]' : 'text-ink-soft hover:text-ink'
  }`
}

export function Nav() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const mobile = nav.flatMap((item) => {
    if (item.group) {
      return [
        { label: item.label, to: item.to, heading: true },
        ...item.group,
        ...(item.allLabel ? [{ label: item.allLabel, to: item.to }] : []),
      ]
    }
    return [item]
  })

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur-[10px]">
      <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between gap-4 px-7">
        <Link to="/" aria-label="Arinox home" className="shrink-0">
          <img src="/images/brand/logo-orange.webp" alt="Arinox" className="h-[26px] w-auto" />
        </Link>

        <nav className="chip hidden items-center lg:flex" aria-label="Main">
          {nav.map((item, i) => (
            <span key={item.label} className="flex items-center">
              {i > 0 && <span className="px-1.5 text-ink-faint xl:px-2.5" aria-hidden>·</span>}
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

        {/* One button, always visible, no animation. */}
        <div className="hidden items-center gap-2.5 lg:flex">
          <Button to="/get-started" variant="dark" size="sm" className="whitespace-nowrap">Get your AI roadmap</Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Button to="/get-started" variant="dark" size="sm" className="hidden whitespace-nowrap md:inline-flex">Get your AI roadmap</Button>
        <button
          className="-mr-2 flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="h-px w-6 bg-ink" />
          <span className="h-px w-6 bg-ink" />
          <span className="h-px w-6 bg-ink" />
        </button>
        </div>
      </div>

      {open && (
        <>
          <button
            className="fixed inset-0 top-[68px] z-40 cursor-default bg-ink/40 backdrop-blur-[2px] lg:hidden"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <div className="fixed inset-x-0 top-[68px] z-50 max-h-[calc(100vh-68px)] overflow-y-auto border-b border-line bg-paper p-7 pb-10 shadow-[0_30px_60px_-30px_rgba(11,11,13,0.45)] lg:hidden">
            <nav className="flex flex-col" aria-label="Mobile">
              {mobile.map((l) => l.sub ? (
                <p key={`s-${l.label}`} className="pb-1 pt-5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-faint">{l.label}</p>
              ) : (
                <NavLink
                  key={`${l.heading ? 'h' : 'l'}-${l.to}-${l.label}`}
                  to={l.to}
                  end={l.to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => {
                    if (l.heading) {
                      return `pt-7 pb-2 font-mono text-[11px] uppercase tracking-[0.16em] ${isActive ? 'text-ember-deep' : 'text-ink-faint'}`
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
            <div className="mt-7 flex flex-col gap-3">
              <Button to="/get-started" variant="ember" className="w-full" onClick={() => setOpen(false)}>
                Get your AI roadmap
              </Button>
            </div>
          </div>
        </>
      )}
    </header>
  )
}
