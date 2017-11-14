const path = require('path')
const http = require('http')
const express = require('express')
const webpack = require('webpack')
const proxy = require('express-http-proxy')
const serveDst = ctx.taskParams && ctx.taskParams[0] === 'p' // fbi s -p

// get env match config
require('./helpers/getEnv.js')(ctx, serveDst ? '' : 'dev')
const config = require('./config/webpack.config')(require, ctx)
let start = require('./helpers/getPort.js')(ctx, ctx.options.server.port)

const app = express()

// proxy
const proxyOptions = ctx.options.server.proxy
if (proxyOptions) {
  for (let p in proxyOptions) {
    app.use(p, proxy(proxyOptions[p]))
    ctx.log(`Proxy ${p} => ${proxyOptions[p]}`)
  }
}

if (serveDst) {
  app.use(express.static(ctx.options.server.root))
  ctx.log(`Serving '${ctx.options.server.root}'`)
} else {
  const options = {
    publicPath: config.output.publicPath,
    stats: {
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }
  }
  const compiler = webpack(config)
  const devMiddleWare = require('webpack-dev-middleware')(compiler, options)

  app.use(devMiddleWare)
  app.use(require('webpack-hot-middleware')(compiler))

  app.get('*', (req, res) => {
    const fs = devMiddleWare.fileSystem
    devMiddleWare.waitUntilValid(() => {
      res.end(fs.readFileSync(path.join(config.output.path, '../index.html')))
    })
  })
}

// auto selected a valid port & start server
function autoPortServer(cb) {
  let port = start
  start += 1
  const server = http.createServer(app)

  server.listen(port, err => {
    server.once('close', () => {
      app.listen(port, err => {
        if (err) {
          ctx.log(err)
          return
        }
        cb(port)
      })
    })
    server.close()
  })
  server.on('error', err => {
    autoPortServer(cb)
  })
}

// listen
autoPortServer(port => {
  ctx.logger.success(`Server Addr: ${ctx.utils.style.yellow('http://'+ctx.options.server.host+':'+port)}`)
})