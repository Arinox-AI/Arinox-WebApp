// Flat ESLint config for the whole workspace; run via `npm run lint` from repo/.
// ESLint is intentionally pinned to v9: eslint-plugin-react supports up to
// ^9.7, so ESLint 10 would orphan the React plugin.
import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

const noUnusedVars = ['warn', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }];

export default [
  { ignores: ['**/dist/**', '**/node_modules/**'] },

  // Client: browser ESM + JSX.
  {
    files: ['client/src/**/*.{js,jsx}'],
    plugins: { react, 'react-hooks': reactHooks },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    settings: { react: { version: '18.3' } },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',     // automatic JSX runtime
      'react/prop-types': 'off',             // plain-JS house style: no prop-types
      'react/no-unescaped-entities': 'off',  // marketing copy is full of apostrophes
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'no-unused-vars': noUnusedVars,
    },
  },

  // Server: Node CommonJS.
  {
    files: ['server/src/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: { ...globals.node },
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-unused-vars': noUnusedVars,
    },
  },

  // Tests and smoke suites: ESM.
  {
    files: ['client/tests/**/*.{js,jsx}', 'server/tests/**/*.js'],
    plugins: { react },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.node, ...globals.browser },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      ...js.configs.recommended.rules,
      'react/jsx-uses-vars': 'error',
      'no-unused-vars': noUnusedVars,
    },
  },
];
