import { SVG_GLOBE_PATH } from '../../lib/svgGlobePath';

/* Globe — the Systaliko UI globe block (YoucefBnm, MIT) ported to the Arinox
   stack: no shadcn `cn`, tokens swapped to the paper/ember palette, unique
   gradient id so it never collides. A stylized world map that fills its
   container; pins mark the two cities the platform runs from. */

export function GlobeSvg({ className = '', children, ...props }) {
  return (
    <svg
      viewBox="0 0 1259 477"
      className={`h-full w-full ${className}`}
      preserveAspectRatio="xMidYMid meet"
      {...props}
    >
      <defs>
        <linearGradient
          id="arinox-globe-grad"
          x1="629.21"
          y1="-67.3351"
          x2="629.21"
          y2="627.144"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.274038" stopColor="#ff6301" />
          <stop offset="0.735577" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      <path
        d={SVG_GLOBE_PATH.p15b69c00}
        fillRule="evenodd"
        clipRule="evenodd"
        fill="url(#arinox-globe-grad)"
        fillOpacity="0.32"
      />

      {children}
    </svg>
  );
}

export function Globe({ className = '', ...props }) {
  return (
    <div
      className={`relative flex aspect-[2/1] w-full items-center justify-center ${className}`}
      {...props}
    />
  );
}

/* One location pin. Coordinates are map-space (viewBox 0 0 1259 477);
   Delhi and Bengaluru are pre-wired in Home. */
export function GlobePin({ x, y, title, ...props }) {
  return (
    <g {...props}>
      {title && <title>{title}</title>}
      <circle cx={x} cy={y} r="4" fill="#ff6301" />
      <circle cx={x} cy={y} r="12" fill="#ff6301" fillOpacity="0.18" className="animate-pulse" />
    </g>
  );
}