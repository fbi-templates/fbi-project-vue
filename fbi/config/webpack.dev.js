const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base')

const opts = ctx.options
const root = process.cwd()
const devModulesPath = ctx.nodeModulesPaths[1] || './node_modules'

const config = {
  mode: 'development',
  entry: {
    app: [
      path.join(devModulesPath, 'webpack-hot-middleware/client?reload=true'),
      path.join(root, opts.paths.main || 'src/main.js')
    ]
  },
  output: {
    path: path.join(root, opts.server.root, opts.paths.assets || 'assets'),
    filename: 'js/[name].js',
    publicPath: `/${opts.paths.assets || 'assets'}/`
  },
  module: {
    rules: [
      // this will apply to both plain `.css` files
      // AND `<style>` blocks in `.vue` files
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: Object.keys(opts.postcss).map(item => {
                return require(`${item}`)(opts.postcss[item])
              })
            }
          }
        ]
      }
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
}

module.exports = merge(webpackBaseConfig, config)
