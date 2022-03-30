import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home
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
	{
		path: '/post/:id',
		name: 'post.show',
		component: () => import(/* webpackChunkName: "post.show" */ '../views/Post/show.vue'),
		props: true
	},
	// Dashboard
	{
		path: '/dashboard',
		component: () => import(/* webpackChunkName: "index" */ '../views/User/index.vue'),
		meta: { auth: true },
		children: [
			{
				path: '/',
				name: 'dashboard.post',
				component: () => import(/* webpackChunkName: "dashboard.post.index" */ '../views/User/Post/index.vue'),
				meta: { auth: true },
			},
			{
				path: 'post/:id/edit',
				name: 'dashboard.post.edit',
				component: () => import(/* webpackChunkName: "dashbaord.post.edit" */ '../views/User/Post/edit.vue'),
				props: true,
				meta: { auth: true },
			}
		]
	},
]

const router = new VueRouter({
	routes,
	mode: 'history'
})

router.beforeEach((to, from, next) => {
	if (to.meta.auth && !store.state.auth.loggedIn) next({ name: 'signin' })
	else next()

	if (to.meta.guest && store.state.auth.loggedIn) next({ name: 'dashboard' })
	else next()
})

export default router
