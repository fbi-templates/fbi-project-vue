process.env.NODE_ENV = 'production'
const webpack = require('webpack')
const statsConfig = require('./config/stats.config')
const envData = ctx.options.webpack.data
const envDataItemArr = Object.keys(envData)

ctx.isProd = true
ctx.env = taskParams.t ? 'test' : 'prod'
ctx.options.server.root += '-' + ctx.env
ctx.logger.log(`Env: ${ctx.env}`)
ctx.logger.log(`Target root: ${ctx.options.server.root}`)

const webpackConfig = require('./config/webpack.prod')

function build() {
  return new Promise((resolve, reject) => {
    webpack(webpackConfig, (err, stats) => {
      if (err) {
        reject(err)
      }
      const info = stats.toJson()
      console.log(stats.toString(statsConfig))
      resolve()
    })
  })
}

module.exports = build
