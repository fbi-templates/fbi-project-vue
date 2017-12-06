const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackBaseConfig = require('./webpack.base')
const pkg = require('../../package')

const noop = function() {}
const root = process.cwd()
const staticPath = path.join(root, 'static')
const needCopy = fs.existsSync(staticPath)

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
  devtool: ctx.options.sourcemap || false,
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          extractCSS: true
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
              options: {
                ident: 'postcss',
                plugins: Object.keys(ctx.options.postcss).map(item => {
                  return require(`${item}`)(ctx.options.postcss[item])
                })
              }
            }
          ],
          publicPath: './' // assets path prefix in css
        })
      }
    ]
  },
  plugins: [
    new ProgressBarPlugin(),
    // short-circuits all Vue.js warning code
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new CleanWebpackPlugin([ctx.options.server.root], {
      root: root,
      verbose: false
    }),
    new UglifyJSPlugin({
      parallel: true,
      sourceMap: Boolean(ctx.options.sourcemap),
      uglifyOptions: {
        ecma: 8
      }
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: 'app.[contenthash:8].css',
      // set the following option to `true` if you want to extract CSS from
      // codesplit chunks into this main css file as well.
      // This will result in *all* of your app's CSS being loaded upfront.
      allChunks: false
    }),

    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {safe: true}
    }),
    // keep module.id stable when vender modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // optimize module ids by occurrence count
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function(module) {
        // This prevents stylesheet resources with the .css or .scss extension
        // from being moved from their original chunk to the vendor chunk
        if (module.resource && /^.*\.(css|scss)$/.test(module.resource)) {
          return false
        }
        return module.context && module.context.indexOf('node_modules') !== -1
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    // This instance extracts shared chunks from code splitted chunks and bundles them
    // in a separate chunk, similar to the vendor chunk
    // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    }),

    needCopy
      ? new CopyWebpackPlugin([
          {
            from: staticPath,
            to: '../',
            ignore: ['.*']
          }
        ])
      : noop
  ]
}

module.exports = merge(webpackBaseConfig, config)
