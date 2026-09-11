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
          text:      'rgb(var(--color-text) / <alpha-value>)',
          muted:     'rgb(var(--color-muted) / <alpha-value>)',
          subtle:    'rgb(var(--color-subtle) / <alpha-value>)',
          ink:       'rgb(var(--color-ink) / <alpha-value>)',
          cream:     'rgb(var(--color-cream) / <alpha-value>)',
          green:     'rgb(var(--color-green) / <alpha-value>)',
          alert:     'rgb(var(--color-alert) / <alpha-value>)',
          /* Brand guide named tokens */
          orange:    '#E8590C',
          ink:       '#1F1A12',
          midgrey:   '#5C5244',
          lightgrey: '#9A8E82',
          divider:   '#DDD8CF',
          warmbg:    '#F2EFE9',
        },
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'Inter', 'sans-serif'],
        serif:   ['Georgia', 'serif'],
      },
      backgroundImage: {
        'glow-primary': 'radial-gradient(ellipse at center, rgba(232,89,12,0.12) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
};
