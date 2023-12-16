module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  env: { browser: true, node: true },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  ignorePatterns: [
    '**/node_modules/**',
    'tsconfig.tsbuildinfo',
    'dist/**',
    '!.eslintrc.js',
    '!.prettierrc.js',
  ],
  rules: {
    'no-console': 'error',
    'no-debugger': 'error',
    'sort-imports': ['error', { ignoreDeclarationSort: true }],
    'object-shorthand': 'error',
    'no-useless-rename': 'error',
  },
  settings: {
    'import/resolver': { typescript: true, browser: true },
  },
};
