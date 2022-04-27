<template>
	<div v-if="user" class="flex space-x-10 py-10">
		<section class="w-1/4">
			<SidebarLinks :user="user" />
		</section>
		<section class="w-2/4">
			<TheFeed :user="user" />
		</section>
		<section class="w-1/4">
			TOP POST CON PIU LIKE E PIU COMMENTI RANDOM 5 / 8
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
