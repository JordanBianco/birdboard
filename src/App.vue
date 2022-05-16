<template>
	<div
		:class="[ theme === 'light' ? 'light' : 'dark' ]"
		style="font-family: 'Lato', sans-serif;">
			<div class="text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-zinc-800 min-h-screen">
				<TheNavbar />
				
				<router-view class="px-6 xl:px-0 xl:max-w-7xl mx-auto"/>

				<!-- Notifica Real Time -->
				<PopupNotification />
			</div>
	</div>
</template>

<script>
import TheNavbar from '@/components/Layout/TheNavbar'
import PopupNotification from '@/components/Notification/PopupsNotifications/PopupNotification'

export default {
	components: { 
		TheNavbar,
		PopupNotification
	},
	computed: {
		user() { // auth user
			return this.$store.state.auth.user
		},
		theme() { // auth user
			return this.$store.state.site.theme
		}
	},
	mounted() {
		if (this.user) {
			Echo.private('App.Models.User.' + this.user.id)
				.notification((notification) => {
					this.newNotification(notification)
				});	
		}
    },
	methods: {
		newNotification(notification) {
			/**
			 * Va pushata anche nelle notifiche ricevute 
			 * Laravel ritorna le notifiche dal DB in modo diverso da quelle viaBroadcast (broadcast non ha data)
			 * Quindi qui ricreo la struttura come fosse dal DB, e in base al tipo di notifica creo l'oggetto
			 */
			let type = notification.type.replace("App\\Notifications\\", '')

			/**
			 * Se ricevo una notifica di follow, va pushata anche nelle richieste riceveute recenti (oltre alla notifica pop up)
			 */
			if (type === 'NewFollowRequestReceived') {
				this.$store.commit('followRequest/PUSH_NEW_FOLLOW_REQUEST', notification)
			}

			this.$store.commit('notification/PUSH_NEW_NOTIFICATION', {notification, type})
			this.$store.commit('popupNotification/NEW_POPUP_NOTIFICATION', notification)
		}
	}

}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>