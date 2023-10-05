module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
    'plugin:prettier/recommended',
    'plugin:jest/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  plugins: ['prettier', 'jest', 'simple-import-sort', '@typescript-eslint'],
  ignorePatterns: 'build',
  rules: {
    'class-methods-use-this': 'off',
    'prettier/prettier': 'error',
    'simple-import-sort/imports': 'error',
    semi: ['error', 'always'],
    'import/extensions': [
      'error',
      'ignorePackages',
      { js: 'never', jsx: 'never', ts: 'never', tsx: 'never' },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      { args: 'after-used', argsIgnorePattern: '^next$' },
    ],
    camelcase: ['error', { allow: ['created_at', 'updated_at'] }],
  },
};
