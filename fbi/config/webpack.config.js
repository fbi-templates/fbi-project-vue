module.exports = (require, ctx) => {
  'use strict'
  const path = require('path')
  const webpack = require('webpack')
  const CleanPlugin = require('clean-webpack-plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const CopyWebpackPlugin = require('copy-webpack-plugin')
  const ExtractTextPlugin = require('extract-text-webpack-plugin')
  const ProgressBarPlugin = require('progress-bar-webpack-plugin')
  const pkg = require('../package')
  const nodeModulesPath = ctx.nodeModulesPath = ctx.options.node_modules_path
  const eslintConfig = require('./config/eslint.config')(require, ctx)
  const root = process.cwd()
  const fbiModulesPaths = [nodeModulesPath, 'node_modules']
  const webpackOpts = ctx.options.webpack
  const noop = function () {}

  const postcss = [
    require('autoprefixer')({
      browsers: ['last 2 versions', 'ie > 8']
    }),
    require('precss')
  ]

  const DataForDefine = (function DataForDefinePlugin() {
    const data = Object.assign({},
      webpackOpts.data.all || {},
      webpackOpts.data[ctx.env]
    )

    if (data && typeof data === 'object' && Object.keys(data).length > 0) {
      const copy = JSON.parse(JSON.stringify(data))
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
  })();

  // const DataForDefine = DataForDefinePlugin()

  const config = {
    cache: true,
    entry: {
      app: ctx.isProd ?
        path.join(root, 'src/index.js') : [nodeModulesPath + '/webpack-hot-middleware/client', path.join(root, 'src/index.js')]
    },
    output: {
      path: path.join(root, ctx.options.server.root, 'assets'),
      filename: ctx.isProd ? '[name].[chunkhash:8].js' : '[name].js',
      publicPath: ctx.isProd ? './assets' : '/assets/'
    },
    resolve: {
      extensions: ['*', '.js', '.vue', '.css', '.json'],
      alias: webpackOpts.alias,
      modules: fbiModulesPaths
    },
    resolveLoader: {
      modules: fbiModulesPaths
    },
    devtool: !ctx.isProd ? 'source-map' : false,
    module: {
      rules: [{
        enforce: 'pre', // enforce: 'pre', enforce: 'post',
        test: /\.(vue|js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        query: eslintConfig
      }, {
        test: /\.vue$/,
        loader: 'vue-loader'
      }, {
        test: /\.html$/,
        loader: 'vue-html-loader'
      }, {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: path => {
          const isNpmModule = !!path.match(/node_modules/)
          return isNpmModule
        }
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      }, {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        query: {
          limit: 5000,
          name: ctx.isProd ?
            '/[name].[hash:8].[ext]' : 'img/[name].[ext]?[hash:8]'
        }
      }, {
        test: /\.css$/,
        loader: ctx.isProd ? ExtractTextPlugin.extract({
            fallbackLoader: 'style-loader',
            loader: 'css-loader!postcss-loader',
            publicPath: '' // assets path prefix in css
          }) : 'style-loader!css-loader!postcss-loader' // extract-text-webpack-plugin not support css links hot reload
      }]
    },
    plugins: [
      ctx.isProd ?
      new CleanPlugin([ctx.options.server.root], {
        root: root,
        verbose: true, // Write logs to console.
        dry: false, // Use boolean "true" to test/emulate delete. (will not remove files).
        exclude: [], // Instead of removing whole path recursively
      }) :
      noop,
      new webpack.DefinePlugin(DataForDefine),

      // ^Webpack 2.1.0-beta23
      // https://github.com/webpack/webpack/pull/2974#issuecomment-245857168
      new webpack.LoaderOptionsPlugin({
        options: {
          babel: {
            babelrc: false,
            presets: [
              [nodeModulesPath + '/babel-preset-es2015', {
                modules: false
              }],
              nodeModulesPath + '/babel-preset-stage-1'
            ]
          },
          postcss,
          vue: {
            loaders: {
              css: ctx.isProd ?
                ExtractTextPlugin.extract({
                  loader: 'css-loader',
                  fallbackLoader: 'vue-style-loader'
                }) : 'style-loader!css-loader!postcss-loader'
            },
            postcss
          }
        },
        minimize: ctx.isProd // minify css
      }),
      new HtmlWebpackPlugin({
        data: DataForDefine,
        title: 'Vue 2',
        template: process.cwd() + '/src/index.html',
        filename: '../index.html'
      }),
      ctx.isProd ?
      new ProgressBarPlugin() :
      new webpack.HotModuleReplacementPlugin(),
      ctx.isProd ?
      new CopyWebpackPlugin([{
        from: 'src/favicon.ico',
        to: '../'
      }]) :
      new webpack.NoErrorsPlugin(),
      ctx.isProd ?
      new ExtractTextPlugin('app.[contenthash:8].css') :
      noop,
      ctx.isProd ?
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        },
        comments: false
      }) :
      noop,
      ctx.isProd ?
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'vendor.[chunkhash:8].js'
      }) :
      noop
    ]
  }

  if (webpackOpts.noParse && webpackOpts.noParse.length) {
    config.module.noParse = webpackOpts.noParse
  }

  if (ctx.isProd) {
    config.entry.vendor = Object.keys(pkg.dependencies).filter(name => {
      return true
    })
  }

  return config
}