module.exports = {
  parser: 'babel-eslint',
  env: {
    jest: true
  },
  extends: ['eslint:recommended', 'plugin:node/recommended'],
  parserOptions: {
    sourceType: 'module'
  },
  rules: {
    'no-console': 'off',
    'no-unused-vars': 'off',
    'node/no-unsupported-features/es-syntax': 'off',
    'node/prefer-global/buffer': ['error', 'always'],
    'node/prefer-global/console': ['error', 'always'],
    'node/prefer-global/process': ['error', 'always'],
    'node/prefer-global/url-search-params': ['error', 'always'],
    'node/prefer-global/url': ['error', 'always'],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'never']
  },
  plugins: []
}
