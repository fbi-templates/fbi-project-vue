const path = require('path')

const targets = {
  browsers: ['last 2 versions', 'safari >= 7', 'ie > 8']
}

module.exports = {
  server: {
    root: 'dist',
    host: 'localhost',
    port: 8888,
    proxy: {
      '/proxy': 'http://localhost:4000'
    }
  },

  // Compile time data (Valid only in js code)
  data: {
    // All environments
    all: {
      __KEY__: ''
    },
    // `fbi s`
    dev: {
      __APIROOT__: '/proxy/api',
      __RESOURCE_ROOT__: 'http://localhost:4000/'
    },
    // `fbi b -test`
    test: {
      __APIROOT__: 'http://test.demo.com/api',
      __RESOURCE_ROOT__: '/retu/'
    },
    // `fbi b` or `fbi b -p`
    prod: {
      __APIROOT__: 'http://demo.com/api',
      __RESOURCE_ROOT__: './'
    }
  },

  // Resolve alias e.g: import '../../components/x' => import 'components/x'
  alias: {
    src: path.join(process.cwd(), 'src'),
    components: path.join(process.cwd(), 'src/components'),
    views: path.join(process.cwd(), 'src/views'),
    helpers: path.join(process.cwd(), 'src/helpers'),
    vue: path.join(process.cwd(), 'node_modules/vue/dist/vue.min.js'),
    vuex: path.join(process.cwd(), 'node_modules/vuex/dist/vuex.min.js'),
    'vue-router': path.join(process.cwd(), 'node_modules/vue-router/dist/vue-router.min.js'),
    'vuex-router-sync': path.join(process.cwd(), 'node_modules/vuex-router-sync/index.js')
  },

  // Webpack module noParse Docs:
  // https://webpack.js.org/configuration/module/#module-noparse
  noParse: content => {
    return false
  },

  sourcemap: 'cheap-module-source-map',

  // ESlint config
  eslint: {
    status: 'on', // `on`: turn on; others: turn off
    options: {
      // code style: https://github.com/airbnb/javascript Docs:
      // http://eslint.org/docs/user-guide/configuring
      rules: {
        semi: [
          'error', 'never'
        ],
        'no-console': [0],
        'no-debugger': process.env.NODE_ENV === 'production'
          ? 'error'
          : 'off'
      }
    }
  },

  // babel-loader options Docs:
  // https://github.com/babel/babel-loader/tree/7.x#options
  babel: {
    babelrc: false,
    presets: [
      [
        'babel-preset-env', {
          targets,
          modules: false,
          useBuiltIns: true
        }
      ],
      'babel-preset-stage-1'
    ]
  },

  // Postcss config (plugin-name: plugin-options)
  postcss: {
    autoprefixer: targets,
    precss: {}
  }
}
