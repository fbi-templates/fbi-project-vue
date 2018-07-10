import '@/utils/rem'
import '@/assets/css/base.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = true
Vue.config.devtools = ENV === 'dev'

Vue.config.warnHandler = function (msg, vm, trace) {
  // `trace` 是组件的继承关系追踪
  console.warn(msg, vm, trace)
}

Vue.config.errorHandler = function (err, vm, info) {
  // handle error
  // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
  // 只在 2.2.0+ 可用
  console.warn(err, vm, info)
}

new Vue({
  router,
  store,
  ...App
}).$mount('#app')
