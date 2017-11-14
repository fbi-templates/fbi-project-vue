import * as api from '../../api'

const state = {
  all: [],
  item: {},
}

const mutations = {
  GET_POSTS(state, { posts }) {
    state.all = posts
  },
  GET_POST(state, id) {
    state.item = state.all.find(p => p.id == id)
  },
}

const actions = {
  getPosts({ commit }, pageIndex) {
    return api.post.getPosts(pageIndex)
      .then(posts => {
        commit('GET_POSTS', { posts })
      })
  },
  getPostById({ dispatch, commit }, id) {
    if (state.all.length) {
      setTimeout(() => {
        commit('GET_POST', id)
      }, 200)
    } else {
      return dispatch('getPosts').then(() => {
        commit('GET_POST', id)
      })
    }
  },
}

export default {
  state,
  actions,
  mutations
}