import { Link } from 'react-router-dom'

/* Button chrome: mono label (via .chip), 12px radius, solid fills.
   Single source of button styling for the whole site. */
const styles = {
  dark: 'bg-ink text-white hover:bg-black shadow-[0_14px_30px_-14px_rgba(23,23,26,0.55)]',
  ember: 'bg-ember text-ink hover:bg-ember-deep hover:text-white btn-ember-glow',
  ghost: 'bg-white text-ink border border-ink/20 hover:border-ink/60 hover:bg-paper-2',
  ghostDark: 'bg-transparent text-white border border-white/25 hover:border-white/70 hover:bg-white/5',
}

export function Button({
  children,
  to,
  href,
  download = false,
  target,
  variant = 'dark',
  size = 'md',
  type,
  onClick,
  disabled = false,
  className = '',
}) {
  const cls = `chip inline-flex items-center justify-center gap-2 rounded-btn font-medium leading-none transition-colors duration-200 ${
    size === 'sm' ? 'px-[18px] py-3 text-[11.5px]' : 'px-6 py-3.5 text-[12.5px]'
  } ${styles[variant]} ${disabled ? 'pointer-events-none opacity-50' : ''} ${className}`

  if (to) {
    return <Link to={to} className={cls} onClick={onClick}>{children}</Link>
  }
  if (href) {
    return (
      <a
        href={href}
        className={cls}
        download={download || undefined}
        target={target}
        rel={target ? 'noopener noreferrer' : undefined}
        onClick={onClick}
      >
        {children}
      </a>
    )
  }
  return (
    <button type={type ?? 'button'} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  )
}

export function TextLink({ children, to, dark = false }) {
  const cls = `text-[15px] font-medium inline-block border-b pb-0.5 transition-colors duration-150 ${
    dark ? 'text-white border-white/30 hover:border-white' : 'text-ink border-line hover:border-ink'
  }`
  return <Link to={to} className={cls}>{children}</Link>
}
