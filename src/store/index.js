import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

import auth from '@/store/modules/auth'
import posts from '@/store/modules/posts'
import user from '@/store/modules/user'

const dataState = createPersistedState({
	paths: [
		'auth.loggedIn',
		'auth.user',
		'auth.token'
	]
})

export default new Vuex.Store({
	state: {
	},
	getters: {
	},
	mutations: {
	},
	actions: {
	},
	modules: {
		auth,
		posts,
		user
	},
	plugins: [dataState],
})
