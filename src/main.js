import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import moment from 'moment'
import Echo from 'laravel-echo';
window.Pusher = require('pusher-js');

Vue.prototype.$moment = moment

Vue.config.productionTip = false

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.VUE_APP_PUSHER_APP_KEY,
    forceTLS: true
});

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
