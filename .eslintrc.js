module.exports = {
  env: {
    node: true, // Node.js global variables and Node.js scoping
    es2021: true, // Adds all ECMAScript 2021 globals and automatically sets the ecmaVersion parser option to 12
  },
  extends: 'eslint:recommended', // Use a set of recommended rules by ESLint
  parserOptions: {
    ecmaVersion: 12, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  rules: {
    'semi': ['error', 'always'], // Enforce semicolons at the end of statements
    'quotes': ['error', 'single'], // Enforce single quotes for strings
    'indent': ['error', 2], // Enforce 2 spaces for indentation
    'no-unused-vars': 'warn', // Turn off no-unused-vars or set to 'warn'
    'no-console': 'off', // Turn off no-console or set to 'warn'
  },
  jest: true,
};
