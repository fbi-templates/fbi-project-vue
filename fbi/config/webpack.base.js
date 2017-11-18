const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const nodeModulesPath = (ctx.nodeModulesPath =
  ctx.options.node_modules_path || path.join(process.cwd(), 'node_modules'))
const eslintConfig = require('./eslint.config')
const babelConfig = require('./babel.config')
const postcssConfig = require('./postcss.config')
const root = process.cwd()
const fbiModulesPaths = [nodeModulesPath, 'node_modules']
const webpackOpts = ctx.options.webpack
const merge = require('webpack-merge')

const DataForDefine = (function DataForDefinePlugin() {
  const data = Object.assign(
    {},
    webpackOpts.data.all || {},
    webpackOpts.data[ctx.env]
  )

  if (data && typeof data === 'object' && Object.keys(data).length > 0) {
    const copy = JSON.parse(JSON.stringify(data))
    copy['ENV'] = ctx.env
    Object.keys(copy).map(item => {
      switch (typeof item) {
        case 'string':
          copy[item] = JSON.stringify(copy[item])
          break
      }
    })
    return copy
  }

  return {}
})()

// remove warning:
// DeprecationWarning: loaderUtils.parseQuery() received a non-string value which can be problematic, see https://github.com/webpack/loader-utils/issues/56
// parseQuery() will be replaced with getOptions() in the next major version of loader-utils.
process.noDeprecation = true

const config = {
  cache: true,
  entry: {
    app: [
      nodeModulesPath + '/webpack-hot-middleware/client?reload=true',
      path.join(root, 'src/index.js')
    ]
  },
  output: {
    path: path.join(root, ctx.options.server.root, 'assets'),
    filename: '[name].js',
    publicPath: '/assets/'
  },
  target: 'web',
  resolve: {
    extensions: ['*', '.js', '.vue', '.css', '.json'],
    alias: webpackOpts.alias,
    modules: fbiModulesPaths
  },
  resolveLoader: {
    modules: fbiModulesPaths
  },
  // For development, use cheap-module-eval-source-map. For production, use cheap-module-source-map.
  devtool: 'source-map',
  module: {
    rules: [
      {
        enforce: 'pre', // enforce: 'pre', enforce: 'post',
        test: /\.(vue|js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'eslint-loader',
          options: eslintConfig
        }
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            loaders: {
              js: [
                {
                  loader: 'babel-loader',
                  options: babelConfig
                },
                {
                  loader: 'eslint-loader',
                  options: eslintConfig
                }
              ]
            },
            postcss: postcssConfig
          }
        }
      },
      {
        test: /\.html$/,
        use: 'vue-html-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: path.resolve('node_modules/.cache/cache-loader')
            }
          },
          {
            loader: 'babel-loader',
            options: babelConfig
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin(DataForDefine),
    new HtmlWebpackPlugin({
      data: DataForDefine,
      title: 'Vue 2',
      template: process.cwd() + '/src/index.ejs',
      filename: '../index.html'
    })
  ],
  performance: {
    hints: false
  }
}

if (webpackOpts.noParse && webpackOpts.noParse.length) {
  config.module.noParse = webpackOpts.noParse
}

module.exports = config
