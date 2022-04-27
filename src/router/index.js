import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home,
		meta: { auth: true }
	},
	{
		path: '/signup',
		name: 'signup',
		component: () => import(/* webpackChunkName: "signup" */ '../views/Auth/signup.vue'),
		meta: { guest: true }
	},
	{
		path: '/signin',
		name: 'signin',
		component: () => import(/* webpackChunkName: "signin" */ '../views/Auth/signin.vue'),
		meta: { guest: true }
	},
	// User Profile
	{
		path: '/:username',
		name: 'user.show',
		component: () => import(/* webpackChunkName: "show" */ '../views/User/show.vue'),
		props: true,
		meta: { auth: true }
	},
	// User Posts
	{
		path: '/:username/post/:id',
		name: 'post.show',
		component: () => import(/* webpackChunkName: "post.show" */ '../views/User/Post/show.vue'),
		props: true,
		meta: { auth: true }
	},
	// User Notification
	{
		path: '/:username/notifications',
		name: 'notification.index',
		component: () => import(/* webpackChunkName: "notification.index" */ '../views/User/Notification/index.vue'),
		props: true,
		meta: { auth: true }
	},
	// User Chat
	{
		path: '/:username/chat',
		name: 'chat.index',
		component: () => import(/* webpackChunkName: "chat.index" */ '../views/User/Chat/index.vue'),
		props: true,
		meta: { auth: true }
	},
	// Pagina per modificare i dati dell'utente loggato
	{
		path: '/:username/settings',
		component: () => import(/* webpackChunkName: "settings.index" */ '../views/User/Settings/index.vue'),
		props: true,
		meta: { auth: true },
		children: [
			{
				path: '/',
				name: 'user.settings.profile',
				component: () => import(/* webpackChunkName: "settings.profile" */ '../views/User/Settings/profile.vue'),
				props: true,
				meta: { auth: true }
			},
			{
				path: '/:username/settings/account',
				name: 'user.settings.account',
				component: () => import(/* webpackChunkName: "settings.account" */ '../views/User/Settings/account.vue'),
				props: true,
				meta: { auth: true }
			}
		]
	}
]

const router = new VueRouter({
	routes,
	mode: 'history'
})

router.beforeEach((to, from, next) => {
	if (to.meta.auth && !store.state.auth.loggedIn) next({ name: 'signin' })
	else next()

	if (to.meta.guest && store.state.auth.loggedIn) next({ name: 'home' })
	else next()
})

export default router
