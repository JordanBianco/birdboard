import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

import auth from '@/store/modules/auth'
import feed from '@/store/modules/feed'
import users from '@/store/modules/users' // cambiare in post
import reply from '@/store/modules/reply'
import like from '@/store/modules/like'

const dataState = createPersistedState({
	paths: [
		'auth.loggedIn',
		'auth.token',
		'like.likes'
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
		reply,
		like
	},
	plugins: [dataState],
})
