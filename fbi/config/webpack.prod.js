const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin')
const WebpackChunkHash = require('webpack-chunk-hash')
const ManifestPlugin = require('webpack-manifest-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const webpackBaseConfig = require('./webpack.base')
const pkg = require('../../package')
const nodeModulesPath = (ctx.nodeModulesPath = ctx.options.node_modules_path)
const eslintConfig = require('./eslint.config')
const babelConfig = require('./babel.config')
const postcssConfig = require('./postcss.config')
const root = process.cwd()
const fbiModulesPaths = [nodeModulesPath, 'node_modules']
const webpackOpts = ctx.options.webpack
const noop = function() {}
const hasFavicon = ctx.utils.fs.existSync(
  path.join(process.cwd(), 'src/favicon.ico')
)

const config = {
  entry: {
    app: path.join(root, 'src/index.js')
  },
  output: {
    path: path.join(root, ctx.options.server.root, 'assets'),
    filename: '[name].[chunkhash:8].js',
    publicPath: './assets/'
  },
  // For development, use cheap-module-eval-source-map. For production, use cheap-module-source-map.
  devtool: webpackOpts.sourcemap || false,
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 5000,
            name: '[name].[hash:8].[ext]'
          }
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            },
            {
              loader: 'postcss-loader',
              options: postcssConfig
            }
          ],
          publicPath: './' // assets path prefix in css
        })
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([ctx.options.server.root], {
      root: root
    }),
    new ProgressBarPlugin(),
    hasFavicon
      ? new CopyWebpackPlugin([
          {
            from: 'src/favicon.ico',
            to: '../'
          }
        ])
      : noop,
    new ExtractTextPlugin('app.[contenthash:8].css'),
    new UglifyJSPlugin({
      compress: {
        warnings: false
      },
      comments: false,
      sourceMap: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'manifest'],
      minChunks: Infinity
    }),
    new webpack.HashedModuleIdsPlugin(),
    new WebpackChunkHash(),
    new ManifestPlugin(),
    new ChunkManifestPlugin({
      manifestVariable: 'webpackManifest',
      inlineManifest: true
    }),
    // https://github.com/numical/script-ext-html-webpack-plugin
    new ScriptExtHtmlWebpackPlugin({
      inline: ['chunk-manifest.json'],
      sync: ['manifest', 'vendor'],
      defaultAttribute: 'async'
    })
  ],
  performance: {
    hints: 'warning'
  }
}

if (webpackOpts.noParse && webpackOpts.noParse.length) {
  config.module.noParse = webpackOpts.noParse
}

config.entry.vendor = Object.keys(pkg.dependencies).filter(name => {
  return true
})

module.exports = merge(webpackBaseConfig, config)
