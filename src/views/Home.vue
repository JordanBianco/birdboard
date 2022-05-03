<template>
	<div v-if="user" class="sm:flex sm:space-x-8 py-10">
		<section class="sm:w-[32%] mb-10 sm:mb-0">
			<TheSidebar :user="user" />
		</section>
		<section class="sm:w-[36%">
			<TheFeed :user="user" />
		</section>
		<section class="sm:w-[32%] mb-10 sm:mb-0">
			<div class="flex items-center justify-between mb-3">
				<span class="block text-slate-400 font-semibold text-xs uppercase">Richieste di seguirti</span>
				<div class="rounded-full w-4.5 h-4.5 bg-sky-500 text-white text-xxs flex justify-center items-center">
					2
				</div>
			</div>

			<div
				v-for="i in 2"
				:key="i"
				class="flex items-start space-x-4 mb-3 last:mb-0 bg-white p-5 rounded-xl shadow-md shadow-slate-100 drop-shadow-xs">
					<UserAvatar
						:user="{}"
						classes="w-10 h-10"
					/>

					<div class="text-xs">
						<span class="font-semibold">Jordan Bianco</span>
						<span class="text-slate-400"> ha chiesto di seguirti</span>

						<div class="flex items-center space-x-2 mt-2">
							<button
								type="button"
								class="text-xs bg-sky-400 hover:bg-sky-500 transition text-white rounded-lg w-full py-1.5 focus:outline-sky-200">
									Accetta
							</button>
							<button
								type="button"
								class="text-xs bg-white hover:text-slate-500 border border-slate-200 text-slate-400 transition rounded-lg w-full py-1.5 focus:outline-sky-200">
									Rifiuta
							</button>
						</div>
					</div>
			</div>
		</section>
	</div>
</template>

<script>
import TheSidebar from '@/components/Layout/TheSidebar'
import TheFeed from '@/components/TheFeed'
import UserAvatar from '@/components/User/UserAvatar'

export default {
	name: 'Home',
	components: {
		TheSidebar,
		TheFeed,
		UserAvatar
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
