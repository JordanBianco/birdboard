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
			this.$store.commit('notification/NEW_POPUP_NOTIFICATION', notification)
		}
	}

}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');
</style>