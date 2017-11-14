const path = require('path')

module.exports = {
  server: {
    root: 'dst/',
    host: 'localhost',
    port: 8888
    // proxy: {
    //   '/api': 'http://www.example.com'
    // }
  },
  npm: {
    alias: 'npm',
    options: '' // '--registry=https://registry.npm.taobao.org'
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
        __KEY__: ''
      },
      // 开发环境: fbi s
      dev: {
        __APIROOT__: '/api/'
      },
      // 线上环境: fbi b
      prod: {
        __APIROOT__: 'http://demo.api.com/'
      },
      /*
        可自由定义环境，如下：
      */
      // 测试环境: fbi b -test
      test: {
        __APIROOT__: '/test/api/'
      }
    },
    alias: {
      components: path.join(process.cwd(), 'src/components'),
      views: path.join(process.cwd(), 'src/views'),
      vue: path.join(process.cwd(), 'node_modules/vue/dist/vue.min.js'),
      vuex: path.join(process.cwd(), 'node_modules/vuex/dist/vuex.min.js'),
      'vue-router': path.join(process.cwd(), 'node_modules/vue-router/dist/vue-router.min.js'),
      'vue-resource': path.join(process.cwd(), 'node_modules/vue-resource/dist/vue-resource.common.js'),
      'vuex-router-sync': path.join(process.cwd(), 'node_modules/vuex-router-sync/index.js')
    }
  }
}
