import Reveal from './Reveal';

/* Editorial section header: overline + title + optional lead. */
const SectionHead = ({ overline, title, lead, align = 'left', className = '' }) => (
  <Reveal className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''} ${className}`}>
    {overline && <p className="overline" style={align === 'center' ? { justifyContent: 'center' } : undefined}>{overline}</p>}
    <h2 className="text-3xl md:text-4xl font-display font-extrabold leading-[1.15] mb-4">
      {title}
    </h2>
    {lead && <p className="lead">{lead}</p>}
  </Reveal>
);

export default SectionHead;
