import * as getters from './getters'

import Vue from 'vue'
import Vuex from 'vuex'
import repo from './modules/repo'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    repo
  },
  // getters
})
