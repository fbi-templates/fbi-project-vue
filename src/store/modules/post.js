import * as api from '../../api'

const state = {
  all: [],
  item: {}
}

const mutations = {
  GET_POSTS(state, {posts}) {
    state.all = posts
  },
  GET_POST(state, id) {
    state.item = state.all.find(p => p.id == id)
  }
}

const actions = {
  getPosts(ctx, pageIndex) {
    return api.post.getPosts(pageIndex).then(posts => {
      ctx.commit('GET_POSTS', {
        posts
      })
    })
  },
  getPostById(ctx, id) {
    if (state.all.length) {
      setTimeout(() => {
        ctx.commit('GET_POST', id)
      }, 200)
    } else {
      return ctx.dispatch('getPosts').then(() => {
        ctx.commit('GET_POST', id)
      })
    }
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
