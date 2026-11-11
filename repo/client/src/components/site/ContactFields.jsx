/* The contact details every form on the site asks for.
 *
 * One component, one validation, one voice - used by the contact hub
 * (InquiryForm), the pricing quick form and the Price Discovery wizard's
 * last step. Before this, the wizard had its own copy of these fields and
 * its own error text; the copy drifted and the site spoke in two voices.
 */

export const fieldCls =
  'w-full rounded-none border-b border-line bg-transparent py-2.5 text-base outline-none transition-colors placeholder:text-ink-faint focus:border-ember';

export const labelCls =
  'mb-1.5 block font-mono text-[11.5px] font-medium uppercase tracking-[0.08em] text-ink-soft';

export const errorCls =
  'mt-2 block font-mono text-[11px] uppercase tracking-[0.08em] text-ember-deep';

/* The shared rule: a name, a real email, and - where the message is the
   point of the form - something more than whitespace. */
export function validateContact(values, { requireMessage = false, messageMin = 10 } = {}) {
  const e = {};
  const name = (values.name || '').trim();
  const email = (values.email || '').trim();
  const message = (values.message || '').trim();
  if (!name) e.name = 'Your name — we reply person to person.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'That email doesn’t look complete.';
  if (requireMessage && message.length < messageMin) {
    e.message = 'One sentence is enough — ten characters minimum.';
  }
  return e;
}

/* Renders a list of fields:
     { name, label, type: 'text'|'email'|'tel'|'textarea', autoComplete,
       placeholder, required, rows, maxLength, span: 'full'|'half' }
   `span` lets a form put two fields side by side on wide screens. */
export function ContactFields({ fields, values, onChange, errors = {}, id, inputRef }) {
  return (
    <div className={id ? `grid gap-x-8 ${id}` : ''}>
      {fields.map((f) => (
        <label key={f.name} className="mt-6 block first:mt-0">
          <span className={labelCls}>{f.label}</span>
          {f.type === 'textarea' ? (
            <textarea
              name={f.name}
              value={values[f.name] || ''}
              onChange={onChange}
              ref={inputRef ? (el) => inputRef(f.name, el) : undefined}
              rows={f.rows || 3}
              maxLength={f.maxLength || 4000}
              required={f.required}
              placeholder={f.placeholder}
              aria-invalid={errors[f.name] ? 'true' : undefined}
              className={`${fieldCls} resize-y`}
            />
          ) : (
            <input
              type={f.type || 'text'}
              name={f.name}
              value={values[f.name] || ''}
              onChange={onChange}
              ref={inputRef ? (el) => inputRef(f.name, el) : undefined}
              autoComplete={f.autoComplete}
              maxLength={f.maxLength || 255}
              required={f.required}
              placeholder={f.placeholder}
              aria-invalid={errors[f.name] ? 'true' : undefined}
              className={fieldCls}
            />
          )}
          {errors[f.name] ? (
            <span role="alert" className={errorCls}>{errors[f.name]}</span>
          ) : null}
        </label>
      ))}
    </div>
  );
}
