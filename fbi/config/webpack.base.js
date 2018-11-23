const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const DataForCompile = require('./data-for-compile')

const opts = ctx.options
const root = process.cwd()
let templateFilepath = path.join(root, opts.paths.public || 'public', 'index.html')
if (!fs.existsSync(templateFilepath)) {
  templateFilepath = templateFilepath.replace('.html', '.ejs')
}

// remove warning:
// DeprecationWarning: loaderUtils.parseQuery() received a non-string value which can be problematic, see https://github.com/webpack/loader-utils/issues/56
// parseQuery() will be replaced with getOptions() in the next major version of loader-utils.
process.noDeprecation = true

const config = {
  cache: true,
  target: 'web',
  resolve: {
    extensions: ['*', '.js', '.vue', '.css', '.json'],
    alias: opts.alias,
    // https://github.com/benmosher/eslint-plugin-import/issues/139#issuecomment-287183200
    modules: ctx.nodeModulesPaths.concat([path.resolve(__dirname, '..', 'src')])
  },
  resolveLoader: {
    modules: ctx.nodeModulesPaths
  },
  // For development, use cheap-module-eval-source-map. For production, use cheap-module-source-map.
  devtool: 'source-map',
  module: {
    noParse: opts.noParse ? opts.noParse : [],
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // this will apply to both plain `.js` files
      // AND `<script>` blocks in `.vue` files
      {
        test: /\.js?$/,
        exclude: file => /node_modules/.test(file) && !/\.vue\.js/.test(file),
        use: [
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: path.resolve('node_modules/.cache/cache-loader')
            }
          },
          {
            loader: 'babel-loader',
            options: ctx.utils.assign(
              {},
              {
                cacheDirectory: true,
                plugins: ['transform-vue-jsx']
              },
              opts.babel
            )
          }
        ]
      },
      {
        test: /\.html$/,
        use: 'vue-html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 5000,
          name: process.env.NODE_ENV === 'production' ? 'img/[name].[hash:8].[ext]' : 'img/[name].[ext]?[hash:8]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 5000,
          name: process.env.NODE_ENV === 'production' ? 'media/[name].[hash:8].[ext]' : 'media/[name].[ext]?[hash:8]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 5000,
          name: process.env.NODE_ENV === 'production' ? 'fonts/[name].[hash:8].[ext]' : 'fonts/[name].[ext]?[hash:8]'
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin(DataForCompile),
    new HtmlWebpackPlugin({
      data: DataForCompile,
      template: templateFilepath,
      filename: '../index.html'
    })
  ],
  performance: {
    hints: false
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}

if (opts.eslint.enable) {
  config.module.rules.push({
    test: /\.(vue|js)$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    exclude: /node_modules/,
    options: ctx.utils.assign(
      {},
      {
        cache: true,
        root: true,
        parser: 'babel-eslint',
        extends: 'eslint-config-standard',
        formatter: require('eslint-friendly-formatter'),
        // required to lint *.vue files
        plugins: ['html'],
        parserOptions: {
          ecmaVersion: 8,
          sourceType: 'module',
          ecmaFeatures: {
            experimentalObjectRestSpread: true
          }
        },
        env: {
          node: true,
          browser: true
        },
        rules: {
          // rules docs: https://standardjs.com/rules.html
          semi: ['error', 'never'],
          indent: ['error', 2]
        }
      },
      opts.eslint.options
    )
  })
}

module.exports = config
