const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackBaseConfig = require('./webpack.base')

const config = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            esModule: false,
            loaders: {
              js: [
                {
                  loader: 'babel-loader',
                  options: ctx.options.babel
                }
              ]
            },
            postcss: {
              ident: 'postcss',
              plugins: Object.keys(ctx.options.postcss).map(item => {
                return require(`${item}`)(ctx.options.postcss[item])
              })
            }
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: Object.keys(ctx.options.postcss).map(item => {
                return require(`${item}`)(ctx.options.postcss[item])
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
