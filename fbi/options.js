const path = require('path')

module.exports = {
  server: {
    root: 'dst',
    host: 'localhost',
    port: 8888,
    proxy: {
      '/proxy': 'http://localhost:4000'
    }
  },
  npm: {
    alias: 'tnpm',
    options: '' //--registry=https://registry.npm.taobao.org'
  },
  alias: {
    b: 'build',
    s: 'serve'
  },
  webpack: {
    /*
     * 模版数据（编译时数据）
     *
     * 注意：该数据仅在js代码内生效，使用定义的变量名称直接访问即可
     */
    data: {
      // 所有环境(可删除)
      all: {
        __KEY__: '',
        SUPER_ADMINS: ['shawnnxiao'],
        __IS_MAINTENANCING__: '',
        __MAINTENANCING_TIME__: []
      },
      // 开发环境: fbi s
      dev: {
        __APIROOT__: '/proxy/api',
        __RESOURCE_ROOT__: 'http://localhost:4000/'
      },
      // 测试环境: fbi b -test
      test: {
        __APIROOT__: 'http://wt.oa.com/retu/api',
        __RESOURCE_ROOT__: '/retu/'
      },
      // 线上环境: fbi b
      prod: {
        __APIROOT__: 'http://retu.oa.com/api',
        __RESOURCE_ROOT__: './'
      }
    },
    alias: {
      components: path.join(process.cwd(), 'src/components'),
      views: path.join(process.cwd(), 'src/views'),
      helpers: path.join(process.cwd(), 'src/helpers'),
      vue: path.join(process.cwd(), 'node_modules/vue/dist/vue.min.js'),
      vuex: path.join(process.cwd(), 'node_modules/vuex/dist/vuex.min.js'),
      'vue-router': path.join(
        process.cwd(),
        'node_modules/vue-router/dist/vue-router.min.js'
      ),
      'vuex-router-sync': path.join(
        process.cwd(),
        'node_modules/vuex-router-sync/index.js'
      )
    },
    targets: {
      browsers: ['last 2 versions', 'safari >= 7']
    }
  }
}
