import repoApi from '@/api/repo'

const state = {
  list: []
}

const getters = {}

const actions = {
  getList (ctx) {
    return repoApi.list().then(list => {
      ctx.commit('reciveList', {
        list
      })
      return list
    })
  }
}

const mutations = {
  reciveList (state, { list }) {
    state.list = list
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
