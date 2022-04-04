import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

import auth from '@/store/modules/auth'
import feed from '@/store/modules/feed'
import users from '@/store/modules/users'
import reply from '@/store/modules/reply'

const dataState = createPersistedState({
	paths: [
		'auth.loggedIn',
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
		feed,
		users,
		reply
	},
	plugins: [dataState],
})
