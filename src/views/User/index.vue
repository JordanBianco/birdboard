<template>
    <div class="grid grid-cols-12 space-x-10 py-10">
		<section class="col-span-3">

            <div class="bg-slate-200 rounded-full w-24 h-24 mb-2"></div>

            <span class="text-lg font-semibold block">{{ user.name }}</span>
            <span class="text-slate-400 block -mt-1">@{{ user.username }}</span>

            <div class="mt-2 text-sm text-slate-400">
                <!-- <p>Post: <span class="text-slate-600 font-semibold">{{ posts.length }}</span></p> -->
                <p>Follower: <span class="text-slate-600 font-semibold">0</span></p>
                <p>Seguiti: <span class="text-slate-600 font-semibold">0</span></p>

                <p v-if="user.bio" class="leading-tight mt-4">{{ user.bio }}</p>
            
                <router-link to="" class="mt-4 block text-sky-400">Modifica profilo</router-link>
            </div>
		</section>
		<section class="col-span-9">
            <router-view />
		</section>
	</div>
</template>

<script>
export default {
    name: 'dashboard.index',
    computed: {
        user() {
            return this.$store.state.auth.user
        }
    }
}
</script>