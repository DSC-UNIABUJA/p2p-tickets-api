module.exports = {
  extends: [
    'google',
    'eslint:recommended',
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    'valid-jsdoc': 'off',
    'new-cap': 'off',
  },
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
};
