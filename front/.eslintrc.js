module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    node: true
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  extends: [
    'eslint:recommended',
    'plugin:cypress/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['cypress', 'react'],
  rules: {
    'comma-dangle': ['error', 'never'],
    indent: ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': [2, 'unix'],
    'max-len': ['error', 120],
    quotes: [2, 'single', { avoidEscape: true }],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 1,
    semi: [2, 'always'],
    'space-in-parens': ['error', 'never'],
    'space-before-blocks': ['error', 'always']
  }
};
