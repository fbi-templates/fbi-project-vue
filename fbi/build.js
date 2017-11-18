process.env.NODE_ENV = 'production'
const webpack = require('webpack')
const statsConfig = require('./config/stats.config')
const envData = ctx.options.webpack.data
const envDataItemArr = Object.keys(envData)
ctx.isProd = true

Object.keys(taskParams).map(p => {
  if (p.t) {
    ctx.env = 'test'
  } else {
    ctx.env = 'prod'
  }
})
ctx.options.server.root += '-' + ctx.env

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
