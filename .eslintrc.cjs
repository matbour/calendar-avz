// eslint is loading via CommonJS :(
module.exports = {
  root: true,
  extends: 'next/core-web-vitals',
  plugins: ['@tanstack/eslint-plugin-query'],
  rules: {
    'no-console': ['error', { allow: ['error', 'warn', 'debug'] }],
    'import/no-anonymous-default-export': ['warn', { allowObject: true }],
  },
};
