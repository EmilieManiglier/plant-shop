module.exports = {
  arrowParens: 'always',
  importOrder: [
    '<THIRD_PARTY_MODULES>',
    '^(api|components|constants|helpers|hooks|router|services|store|translations)',
    '^assets',
    '^[./]'
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  printWidth: 120,
  tabWidth: 2,
  trailingComma: 'none',
  singleQuote: true
};
