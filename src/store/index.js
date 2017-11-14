import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import post from './modules/post'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
	getters,
	strict: true,
	modules: {
		post,
		user
	}
})