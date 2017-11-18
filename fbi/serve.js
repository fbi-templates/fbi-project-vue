const path = require('path')
const http = require('http')
const express = require('express')
const webpack = require('webpack')
const proxy = require('http-proxy-middleware')
const statsConfig = require('./config/stats.config')
const envData = ctx.options.webpack.data
const envDataItemArr = Object.keys(envData)

ctx.env = 'dev'
let startPort = ctx.options.server.port

if (ctx.taskParams) {
  ctx.taskParams.map(item => {
    if (envDataItemArr.includes(item)) {
      ctx.env = item
    }

    if (!isNaN(item * 1) && item.length >= 4) {
      startPort = item * 1
    }
  })
}

const webpackConfig = require('./config/webpack.dev')
const webpackOptions = {
  publicPath: webpackConfig.output.publicPath,
  stats: statsConfig
}

function server() {
  return new Promise((resolve, reject) => {
    const app = express()

    const compiler = webpack(webpackConfig)
    const devMiddleWare = require('webpack-dev-middleware')(
      compiler,
      webpackOptions
    )

    // proxy
    const proxyOptions = ctx.options.server.proxy
    if (proxyOptions) {
      for (let p in proxyOptions) {
        app.use(
          proxy(p, {
            target: proxyOptions[p],
            changeOrigin: true,
            pathRewrite: path => {
              return path.replace(p, '/')
            }
          })
        )
      }
    }

    app.use(devMiddleWare)
    app.use(require('webpack-hot-middleware')(compiler))

    app.get('*', (req, res) => {
      const fs = devMiddleWare.fileSystem
      devMiddleWare.waitUntilValid(() => {
        res.end(
          fs.readFileSync(path.join(webpackConfig.output.path, '../index.html'))
        )
      })
    })

    devMiddleWare.waitUntilValid(() => resolve(app))
  })
}

function listen(app) {
  return new Promise((resolve, reject) => {
    let port = startPort
    startPort += 1
    const server = http.createServer(app)

    server.listen(port, err => {
      server.once('close', () => {
        app.listen(port, err => {
          return err ? reject(err) : resolve(port)
        })
      })
      server.close()
    })
    server.on('error', err => {
      listen(app)
    })
  })
}

async function start() {
  try {
    const app = await server()
    const port = await listen(app)
    ctx.logger.success(
      `Server runing at http://${ctx.options.server.host}:${port}`
    )
  } catch (err) {
    ctx.logger.error(err)
  }
}

module.exports = start
