// Root Vitest config — run via `npm test` from repo/.
// Server suites run in the default node environment; client suites opt into
// jsdom with a `// @vitest-environment jsdom` banner at the top of the file.
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    include: ['client/tests/**/*.test.{js,jsx}', 'server/tests/**/*.test.js'],
    setupFiles: ['server/tests/setup.js', 'client/tests/setup.js'],
  },
});
