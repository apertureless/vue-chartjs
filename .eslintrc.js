module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module'
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: [
    'standard',
    'plugin:prettier/recommended',
    'plugin:vue/recommended',
    'plugin:prettier-vue/recommended',
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-typescript'
  ],
  // required to lint *.vue files
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'prettier/prettier': 'error',
    quotes: [2, 'single', 'avoid-escape']
  }
}
