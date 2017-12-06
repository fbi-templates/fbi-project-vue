import * as api from '../../api'

const state = {}

const mutations = {}

const actions = {
  all() {
    return api.city.all()
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
