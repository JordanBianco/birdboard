import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import moment from 'moment'
import VueObserveVisibility from 'vue-observe-visibility'
import VueChatScroll from 'vue-chat-scroll'

import Echo from 'laravel-echo';
window.Pusher = require('pusher-js');

Vue.prototype.$moment = moment

Vue.use(VueObserveVisibility)
Vue.use(VueChatScroll)

Vue.config.productionTip = false

Pusher.log = function (message) {
    window.console.log(message);
};

window.Echo = new Echo({
    authEndpoint: 'https://birdboardapp.herokuapp.com/broadcasting/auth',
    // authEndpoint: 'http://localhost:8000/broadcasting/auth',
    broadcaster: 'pusher',
    key: process.env.VUE_APP_PUSHER_APP_KEY,
    forceTLS: true,
    cluster: "eu",
    auth: {
        headers: {
           Authorization: 'Bearer ' + store.state.auth.token
        }
    }
});

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
