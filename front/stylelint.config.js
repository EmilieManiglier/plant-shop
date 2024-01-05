module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-sass-guidelines'],
  overrides: [
    {
      files: ['**/*.scss'],
      customSyntax: 'postcss-scss'
    }
  ],
  customSyntax: 'postcss-html',
  plugins: ['stylelint-scss'],
  ignoreFiles: ['**/node_modules/**/*', '**/vendor/**/*', '**/build/**/*'],
  rules: {
    'at-rule-no-unknown': null,
    'string-quotes': 'single',
    'declaration-block-no-duplicate-properties': true,
    'import-notation': null,
    'max-nesting-depth': [5, { ignore: ['pseudo-classes'] }],
    'no-descending-specificity': null,
    'scss/at-rule-no-unknown': true,
    'selector-no-qualifying-type': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global']
      }
    ]
  }
};
