/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        /* Handoff v3 — paper + void + ember */
        paper: '#e7e4de', /* toned down 2026-11-26 (LCD glare); was #f2f2f0 */
        'paper-0': '#efede8', /* raised surfaces - replaces pure white */
        'paper-2': '#dcd9d2',
        ink: '#17171a',
        'ink-soft': '#5b5b60',
        'ink-faint': '#5f5f67',
        line: '#d3d0c9',
        void: '#0b0b0d',
        'void-2': '#17171a',
        carbon: '#212125',
        phos: '#f4ede8',
        ember: '#ff6301',
        'ember-deep': '#b84300',
        'ember-lite': '#ff8a4a',
        tint: '#ffe8d9',
        ghost: '#a39d99',
        /* Booking / intake confirmation states */
        success: '#1d7a5f',
        'success-tint': '#eaf7f2',
      },
      fontFamily: {
        body:    ['Switzer', 'system-ui', '-apple-system', 'sans-serif'],
        sans:    ['Switzer', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Newsreader', 'Georgia', 'serif'],
        mono:    ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        card: '8px',
        btn:  '12px',
      },
    },
  },
  plugins: [],
};
