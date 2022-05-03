<template>
	<div style="background-color: #f9fafb; font-family: 'Lato', sans-serif;" class="text-slate-800 min-h-screen">
		<TheNavbar />
		
		<div class="xl:max-w-5xl mx-auto">
			<router-view class="px-6"/>
		</div>

		<!-- Notifica Real Time -->
		<PopupNotification />
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