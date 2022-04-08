import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

import auth from '@/store/modules/auth'
import feed from '@/store/modules/feed'
import users from '@/store/modules/users' // cambiare in post
import reply from '@/store/modules/reply'
import like from '@/store/modules/like'
import follow from '@/store/modules/follow'

const dataState = createPersistedState({
	paths: [
		'auth.loggedIn',
		'auth.token',
		'like.likes',
		'follow.loggedInUserFollowers',
		'follow.loggedInUserFollowing',
	]
})

export default new Vuex.Store({
	state: {},
	getters: {},
	mutations: {},
	actions: {},
	modules: {
		auth,
		feed,
		users,
		reply,
		like,
		follow
	},
	plugins: [dataState],
})
