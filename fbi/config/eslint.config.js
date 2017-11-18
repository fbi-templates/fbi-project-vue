// http://eslint.org/docs/user-guide/configuring
module.exports = {
  // code style: https://github.com/airbnb/javascript
  // lint config: https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base
  extends: ctx.nodeModulesPath + '/eslint-config-airbnb-base',
  parser: ctx.nodeModulesPath + '/babel-eslint',
  plugins: ['html'],
  cache: true,
  failOnWarning: true,
  failOnError: true,
  rules: {
    semi: [2, 'never'],
    'no-console': [0]
  }
}
