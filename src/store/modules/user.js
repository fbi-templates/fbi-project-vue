const state = {
  name: ''
}

const mutations = {
  updateName(state, name) {
    state.name = name
  }
}

const actions = {
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
