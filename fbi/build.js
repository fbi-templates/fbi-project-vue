const webpack = require('webpack')
process.env.NODE_ENV = 'production'
ctx.isProd = true

require('./helpers/getEnv.js')(ctx, 'prod')
const webpackConfig = require('./config/webpack.config')(require, ctx)

webpack(webpackConfig, (err, stats) => {
  if (err) {
    console.log(err, 0)
  }

  console.log(`
${stats.toString({
      chunks: false,
      colors: true
    })}
    `)
})
