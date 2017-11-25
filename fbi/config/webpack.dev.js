const webpack = require('webpack')
const merge = require('webpack-merge')

const webpackBaseConfig = require('./webpack.base')
const postcssConfig = require('./postcss.config')

const config = {
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 5000,
            name: 'img/[name].[ext]?[hash:8]'
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
            options: postcssConfig
          }
        ]
      }
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
}

module.exports = merge(webpackBaseConfig, config)
