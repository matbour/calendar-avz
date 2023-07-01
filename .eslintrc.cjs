// eslint is loading via CommonJS :(
module.exports = {
  root: true,
  plugins: ['@tanstack/eslint-plugin-query', '@typescript-eslint', 'prettier'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
    'next/core-web-vitals',
  ],
  rules: {
    'no-console': ['error', { allow: ['error', 'warn', 'debug'] }],
    'import/no-anonymous-default-export': ['warn', { allowObject: true }],
    '@typescript-eslint/no-empty-interface': 'off', // Conflict with how we declare the components props
  },
};
