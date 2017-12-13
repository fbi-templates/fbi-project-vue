import './static/css/base.css'
import App from './App.vue'
import Vue from 'vue'
import router from './router'
import store from './store'
import global from './global'
import {sync} from 'vuex-router-sync'

sync(store, router)

const app = new Vue({
  router,
  store,
  ...App
})

app.$mount('#app')
