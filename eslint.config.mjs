/**
 * Phase 3 skeleton — flat ESLint config.
 * Install eslint when ready: pnpm add -D eslint @eslint/js
 * Extend per-package as apps/services adopt lint.
 */
export default [
  {
    ignores: ['**/node_modules/**', '**/.next/**', '**/dist/**', '**/build/**'],
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    rules: {},
  },
];
