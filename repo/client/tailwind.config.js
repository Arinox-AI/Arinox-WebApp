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
          green:     'rgb(var(--color-green) / <alpha-value>)',
          alert:     'rgb(var(--color-alert) / <alpha-value>)',
          orange:    '#E8590C',
          ink:       '#2A2724',
        },
      },
      fontFamily: {
        sans:    ['Geist', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Source Serif 4"', 'Georgia', 'serif'],
        mono:    ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};
