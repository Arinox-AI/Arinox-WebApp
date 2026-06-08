/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          bg:        'rgb(var(--color-bg) / <alpha-value>)',
          surface:   'rgb(var(--color-surface) / <alpha-value>)',
          card:      'rgb(var(--color-card) / <alpha-value>)',
          border:    'rgb(var(--color-border) / <alpha-value>)',
          primary:   'rgb(var(--color-primary) / <alpha-value>)',
          secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
          accent:    'rgb(var(--color-accent) / <alpha-value>)',
          blue:      'rgb(var(--color-blue) / <alpha-value>)',
          gold:      'rgb(var(--color-gold) / <alpha-value>)',
          text:      'rgb(var(--color-text) / <alpha-value>)',
          muted:     'rgb(var(--color-muted) / <alpha-value>)',
          subtle:    'rgb(var(--color-subtle) / <alpha-value>)',
          /* Brand Guide named tokens */
          orange:    '#E8590C',
          ink:       '#1F1A12',
          midgrey:   '#5C5244',
          lightgrey: '#9A8E82',
          divider:   '#DDD8CF',
          green:     '#1D7A5F',
          alert:     '#C0392B',
          warmbg:    '#F2EFE9',
        },
      },
      fontFamily: {
        sans:    ['avenir-lt-w01_35-light1475496', 'sans-serif'],
        display: ['avenir-lt-w01_35-light1475496', 'sans-serif'],
        serif:   ['avenir-lt-w01_35-light1475496', 'sans-serif'],
        poppins: ['avenir-lt-w01_35-light1475496', 'sans-serif'],
      },
      fontSize: {
        '3xl': ['2rem',     { lineHeight: '1.3'  }],
        '4xl': ['2.5rem',   { lineHeight: '1.25' }],
        '5xl': ['3rem',     { lineHeight: '1.2'  }],
        '6xl': ['3.75rem',  { lineHeight: '1.15' }],
        '7xl': ['4.5rem',   { lineHeight: '1.1'  }],
        '8xl': ['5.5rem',   { lineHeight: '1.05' }],
        '9xl': ['7rem',     { lineHeight: '1.0'  }],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glow-primary':    'radial-gradient(ellipse at center, rgba(232,89,12,0.15) 0%, transparent 70%)',
        'glow-blue':       'radial-gradient(ellipse at center, rgba(26,106,255,0.10) 0%, transparent 70%)',
      },
      animation: {
        'float':       'float 6s ease-in-out infinite',
        'pulse-slow':  'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow':   'spin 20s linear infinite',
        'marquee':     'marquee 30s linear infinite',
        'shimmer':     'shimmer 2s linear infinite',
        'glow-pulse':  'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        float:     { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-20px)' } },
        marquee:   { '0%': { transform: 'translateX(0%)' }, '100%': { transform: 'translateX(-50%)' } },
        shimmer:   { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        /* Brand orange #E8590C = 232,89,12 */
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(232,89,12,0.3)' },
          '50%':      { boxShadow: '0 0 50px rgba(232,89,12,0.6)' },
        },
      },
    },
  },
  plugins: [],
};
