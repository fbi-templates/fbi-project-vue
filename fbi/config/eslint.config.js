// http://eslint.org/docs/user-guide/configuring
module.exports = (require, ctx) => {
  return {
    // https://github.com/airbnb/javascript
    // https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base
    extends: ctx.nodeModulesPath + '/eslint-config-airbnb-base',
    parser: ctx.nodeModulesPath + '/babel-eslint',
    plugins: [
      'html'
    ],
    parserOptions: {
      ecmaVersion: 7,
      sourceType: 'module',
      allowImportExportEverywhere: false
    },
    rules: {
      semi: [2, 'never'],
      'no-console': [0],
      'no-param-reassign': [0], // https://github.com/airbnb/javascript#functions--mutate-params
    }
  }
}