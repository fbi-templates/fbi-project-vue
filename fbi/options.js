const path = require('path')

const targets = {
  browsers: ['last 2 versions', 'safari >= 7', 'ie > 8']
}

function resolve (dir) {
  return path.join(process.cwd(), dir)
}

module.exports = {
  server: {
    root: 'dist',
    host: 'localhost',
    port: 8888,
    proxy: {
      '/proxy': 'https://api.github.com'
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
      __APIROOT__: '/proxy',
      __RESOURCE_ROOT__: 'http://localhost:4000/'
    },
    // `fbi b -test`
    test: {
      __APIROOT__: 'https://api.github.com',
      __RESOURCE_ROOT__: '/retu/'
    },
    // `fbi b` or `fbi b -p`
    prod: {
      __APIROOT__: 'https://api.github.com',
      __RESOURCE_ROOT__: './'
    }
  },

  // Resolve alias
  // e.g: import '../../components/x' => import 'components/x'
  alias: {
    '@': resolve('src'),
    vue: path.join(process.cwd(), 'node_modules/vue/dist/vue.runtime.esm.js'),
    vuex: path.join(process.cwd(), 'node_modules/vuex/dist/vuex.esm.js'),
    'vue-router': path.join(
      process.cwd(),
      'node_modules/vue-router/dist/vue-router.esm.js'
    ),
    'vuex-router-sync': path.join(
      process.cwd(),
      'node_modules/vuex-router-sync/index.js'
    )
  },

  // Webpack module noParse
  // Docs: https://webpack.js.org/configuration/module/#module-noparse
  noParse: content => {
    return false
  },

  sourcemap: 'cheap-module-source-map',

  // ESlint config
  eslint: {
    enable: true,
    options: {
      rules: {
        // rules docs: https://standardjs.com/rules.html
      }
    }
  },

  // babel-loader options
  // Docs: https://github.com/babel/babel-loader/tree/7.x#options
  babel: {
    babelrc: false,
    presets: [
      [
        'babel-preset-env',
        {
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
  },

  paths: {
    main: 'src/main.js',
    public: 'public',
    assets: 'assets'
  }
}
