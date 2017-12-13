import * as getters from './getters'

import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'

Vue.use(Vuex)

// store 默认已开启命名空间，详见：./modules/*
export default new Vuex.Store({
  strict: true,
  modules: {
    user
  }
})
