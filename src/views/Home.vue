<template>
	<div v-if="user" class="grid grid-cols-12 py-10">
		<section class="col-span-3">
			<SidebarLinks :user="user" />
		</section>
		<section class="col-span-6 space-y-6">
			<TheFeed :user="user" />
		</section>
		<section class="col-span-3">
			<div class="px-4">
				TOP POST CON PIU LIKE E PIU COMMENTI RANDOM 5 / 8
			</div>
		</section>
	</div>
</template>

<script>
import SidebarLinks from '@/components/Layout/SidebarLinks'
import TheFeed from '@/components/TheFeed'

export default {
	name: 'Home',
	components: {
		SidebarLinks,
		TheFeed
	},
	beforeRouteLeave(to, from, next) {
        this.emptyFeedPosts()
        next()
    },
	// mounted() {
	// 	window.Echo.private('App.Models.User.' + this.user.id)
	// 		.notification((notification) => {
	// 			console.log(test)
	// 			console.log(notification.message)
	// 		})
	// },
	computed: {
        user() {
            return this.$store.state.auth.user
        }
    },
	methods: {
		emptyFeedPosts() {
            this.$store.commit('feed/EMPTY_FEED_POSTS')
        }
	}
}
</script>
