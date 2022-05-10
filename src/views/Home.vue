<template>
	<div v-if="user" class="grid grid-cols-12 gap-x-6 py-10">

		<TheSidebar
			class="lg:col-span-3 col-span-12"
			:user="user"
		/>

		<TheFeed
			class="lg:col-span-6 col-span-12"
			:user="user"
		/>

		<section class="lg:col-span-3 lg:block hidden mb-10 sm:mb-0">
			<div class="flex items-center justify-between mb-3">
				<span class="block text-slate-400 font-semibold text-xs uppercase">Richieste di seguirti</span>
				<div class="rounded-full w-4.5 h-4.5 bg-sky-500 text-white text-xxs flex justify-center items-center">
					2
				</div>
			</div>

			<div
				v-for="i in 2"
				:key="i"
				class="flex items-start space-x-4 mb-3 last:mb-0 bg-white dark:bg-zinc-700 p-5 rounded-xl shadow-md shadow-slate-200 dark:shadow-zinc-900 drop-shadow-xs">
					<UserAvatar
						:user="{}"
						class="w-9 h-9"
					/>

					<div class="text-xs">
						<span class="font-semibold">Jordan Bianco</span>
						<span class="text-slate-400"> ha chiesto di seguirti</span>

						<div class="flex items-center space-x-2 mt-2">
							<button
								type="button"
								class="text-xs bg-sky-400 hover:bg-sky-500 transition text-white rounded-lg w-full py-1.5">
									Accetta
							</button>
							<button
								type="button"
								class="text-xs bg-white hover:text-slate-500 border border-slate-200 text-slate-400 transition rounded-lg w-full py-1.5">
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
