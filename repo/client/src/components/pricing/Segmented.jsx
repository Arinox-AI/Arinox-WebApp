/* Segmented control for the Deployment / Currency toggles.
 * Real <button>s with aria-pressed (the brief's toggle contract); the group
 * carries an aria-label so screen readers announce what it controls.
 * Appearance: mono chip labels, hairline pill, ink fill for the active side. */
export function Segmented({ label, options, value, onChange, className = '' }) {
  return (
    <div
      role="group"
      aria-label={label}
      className={`inline-flex border border-line bg-white p-1 ${className}`}
    >
      {options.map((opt) => {
        const active = opt.id === value;
        return (
          <button
            key={opt.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(opt.id)}
            className={`chip px-4 py-2 text-[11.5px] transition-colors duration-200 ${
              active ? 'bg-ink text-white' : 'text-ink-soft hover:text-ember-deep'
            }`}
          >
            {opt.label ?? opt.id}
          </button>
        );
      })}
    </div>
  );
}
