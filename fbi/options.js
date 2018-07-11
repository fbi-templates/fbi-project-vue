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
    all: {
      // for all environments
      __KEY__: ''
    },
    // `fbi s`
    dev: {
      __APIROOT__: '/proxy'
    },
    // `fbi b -test`
    test: {
      __APIROOT__: 'https://api.github.com'
    },
    // `fbi b` or `fbi b -p`
    prod: {
      __APIROOT__: 'https://api.github.com'
    }
  },

  // Resolve alias
  // e.g: import '../../components/x' => import '@/components/x'
  alias: {
    '@': resolve('src'),
    vue: resolve('node_modules/vue/dist/vue.esm.js'),
    vuex: resolve('node_modules/vuex/dist/vuex.esm.js'),
    'vue-router': resolve('node_modules/vue-router/dist/vue-router.esm.js'),
    'vuex-router-sync': resolve('node_modules/vuex-router-sync/index.js')
  },

  // Webpack module noParse
  // Docs: https://webpack.js.org/configuration/module/#module-noparse
  noParse: content => {
    return false
  },

  sourcemap: 'source-map',

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
