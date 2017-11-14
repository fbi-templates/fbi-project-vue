import * as api from '../../api'

const state = {
  isLogin: false,
  info: {
    name: '',
    pwd: ''
  },
}

const mutations = {
  LOGIN(state) {
    state.isLogin = true
  },
  LOGOUT(state) {
    state.isLogin = false
  },
  USER_INFO(state, { user }) {
    state.info = user
  },
}

const actions = {
  login({ commit }, user) {
    return api.user.login()
      .then(() => {
        commit('LOGIN')
        commit('USER_INFO', { user })
      })
  },
  logout({ commit }) {
    commit('LOGOUT')
    commit('USER_INFO', null)
  },
  updateUserInfo({ commit }, user) {
    console.log(user)
    commit('USER_INFO', { user })
  },
}

export default {
  state,
  actions,
  mutations
}