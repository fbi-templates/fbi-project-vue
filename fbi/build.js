process.env.NODE_ENV = 'production'
const webpack = require('webpack')
const statsConfig = require('./config/stats.config')

// Set environment
ctx.isProd = true
ctx.env = ctx.task.getParams('build', 't') ? 'test' : 'prod'
ctx.logger.log(`Env : ${ctx.env}`)

// Set target root
ctx.options.server.root = ctx.options.server.root || 'dist'

ctx.logger.log(`Root: ${ctx.options.server.root}`)

const webpackConfig = require('./config/webpack.prod')

function build () {
  return new Promise((resolve, reject) => {
    webpack(webpackConfig, (err, stats) => {
      if (err) {
        reject(err)
      }

      console.log(stats.toString(statsConfig))
      resolve()
    })
  })
}

module.exports = build
