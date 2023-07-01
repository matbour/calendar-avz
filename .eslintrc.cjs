// eslint is loading via CommonJS :(
module.exports = {
  extends: 'next/core-web-vitals',
  rules: {
    'no-console': ['error', { allow: ['error', 'warn', 'debug'] }],
    'import/no-anonymous-default-export': ['warn', { allowObject: true }],
  },
};
