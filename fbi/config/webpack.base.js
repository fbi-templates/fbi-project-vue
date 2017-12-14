const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const DataForCompile = require('./data-for-compile')

const root = process.cwd()
let templateFilepath = path.join(root, '/src/index.html')
if (!fs.existsSync(templateFilepath)) {
  templateFilepath = templateFilepath.replace('.html', '.ejs')
}

// remove warning: DeprecationWarning: loaderUtils.parseQuery() received a
// non-string value which can be problematic, see
// https://github.com/webpack/loader-utils/issues/56 parseQuery() will be
// replaced with getOptions() in the next major version of loader-utils.
process.noDeprecation = true
const devModulesPath = ctx.nodeModulesPaths[1] || './node_modules'

const config = {
  cache: true,
  entry: {
    app: [
      devModulesPath + '/webpack-hot-middleware/client?reload=true',
      path.join(root, 'src/index.js')
    ]
  },
  output: {
    path: path.join(root, ctx.options.server.root, 'assets'),
    filename: '[name].js',
    publicPath: '/assets/'
  },
  target: 'web',
  // context: process.cwd(),
  resolve: {
    extensions: [
      '*', '.js', '.vue', '.css', '.json'
    ],
    alias: ctx.options.alias,
    // https://github.com/benmosher/eslint-plugin-import/issues/139#issuecomment-287
    // 183200 modules: ctx.nodeModulesPaths.concat([path.resolve(root, 'src')])
    modules: ctx
      .nodeModulesPaths
      .concat([path.resolve(__dirname, '..', 'src')])
      // path.resolve(__dirname, '..', 'src')
  },
  resolveLoader: {
    modules: ctx.nodeModulesPaths
  },
  // For development, use cheap-module-eval-source-map. For production, use
  // cheap-module-source-map.
  devtool: 'source-map',
  module: {
    noParse: ctx.options.noParse
      ? ctx.options.noParse
      : [],
    rules: [
      {
        test: /\.html$/,
        use: 'vue-html-loader'
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: path.resolve('node_modules/.cache/cache-loader')
            }
          }, {
            loader: 'babel-loader',
            options: Object.assign({}, {
              cacheDirectory: true
            }, ctx.options.babel)
          }
        ]
      }, {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 5000,
          name: process.env.NODE_ENV === 'production'
            ? 'img/[name].[hash:8].[ext]'
            : 'img/[name].[ext]?[hash:8]'
        }
      }, {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 5000,
          name: process.env.NODE_ENV === 'production'
            ? 'media/[name].[hash:8].[ext]'
            : 'media/[name].[ext]?[hash:8]'
        }
      }, {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 5000,
          name: process.env.NODE_ENV === 'production'
            ? 'fonts/[name].[hash:8].[ext]'
            : 'fonts/[name].[ext]?[hash:8]'
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin(DataForCompile),
    new HtmlWebpackPlugin({data: DataForCompile, template: templateFilepath, filename: '../index.html'}),
    new LodashModuleReplacementPlugin({
      collections: true,
      paths: true
    })
  ],
  performance: {
    hints: false
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules that does not
    // make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}

if (ctx.options.eslint.status === 'on') {
  config
    .module
    .rules
    .push({
      test: /\.(vue|js)$/,
      loader: 'eslint-loader',
      enforce: 'pre',
      exclude: /node_modules/,
      options: Object.assign({}, {
        formatter: require('eslint-friendly-formatter'),
        root: true,
        parser: 'babel-eslint',
        parserOptions: {
          sourceType: 'module'
        },
        env: {
          browser: true
        },
        extends: 'airbnb-base',
        // required to lint *.vue files
        plugins: ['html']
      }, ctx.options.eslint.options)
    })
}

module.exports = config
