<template>
	<div v-if="user" class="grid grid-cols-12 gap-6 mt-10">

		<TheSidebar
			class="lg:col-span-3 col-span-12"
			:user="user"
		/>

		<TheFeed
			class="lg:col-span-6 col-span-12 mt-10 md:mt-0"
			:user="user"
		/>

		<RequestsReceivedRecently
			class="lg:col-span-3 lg:block hidden mb-10 sm:mb-0"
			:user="user"
		/>
	</div>
</template>

<script>
import TheSidebar from '@/components/Layout/TheSidebar'
import TheFeed from '@/components/TheFeed'
import RequestsReceivedRecently from '@/components/FollowRequest/RequestsReceivedRecently'

export default {
	name: 'Home',
	components: {
		TheSidebar,
		TheFeed,
		RequestsReceivedRecently
	},
	beforeRouteEnter(to, from, next) {
        next(vm => {
			vm.emptyFeedPosts()
		})
    },
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
