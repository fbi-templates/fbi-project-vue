import * as api from '../../api'

const state = {
  isLogin: false,
  info: {
    name: '',
    pwd: ''
  }
}

const mutations = {
  LOGIN(state) {
    state.isLogin = true
  },
  LOGOUT(state) {
    state.isLogin = false
  },
  USER_INFO(state, {user}) {
    state.info = user
  }
}

const actions = {
  login(ctx, user) {
    return api.user.login().then(() => {
      ctx.commit('LOGIN')
      ctx.commit('USER_INFO', {
        user
      })
    })
  },
  logout(ctx) {
    ctx.commit('LOGOUT')
    ctx.commit('USER_INFO', null)
  },
  updateUserInfo(ctx, user) {
    console.log(user)
    ctx.commit('USER_INFO', {
      user
    })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
