// eslint is loading via CommonJS :(
module.exports = {
  extends: 'next/core-web-vitals',
  rules: {
    'import/no-anonymous-default-export': ['warn', { allowObject: true }],
  },
};
