<template>
    <div v-if="loggedInUser">
        <header class="flex items-center justify-between py-2">
            <div class="flex items-center space-x-4">
                <div class="bg-slate-200 rounded-full w-12 h-12"></div>
                <div>
                    <span class="font-semibold block">{{ loggedInUser.name }}</span>
                    <span class="text-sm text-slate-400 block">@{{ loggedInUser.username }}</span>
                </div>
            </div>

            <router-link
                :to="{ name: 'user.show', params: { username: loggedInUser.username }}"
                class="text-xs bg-sky-400 hover:bg-sky-500 transition text-white rounded-full px-4 py-1.5 focus:outline-sky-200 max-w-max">
                    Torna al profilo
            </router-link>
        </header>

        <section class="grid grid-cols-12 space-x-16 mt-5">
            <aside class="col-span-3 text-slate-400">
                <!-- Impostazioni -->
                <div class="border-b border-slate-200 pb-6">
                    <span class="block text-xs mb-4 text-slate-500">Impostazioni</span>
                    <router-link
                        :to="{ name: 'user.settings.profile', params: { username: loggedInUser.username } }"
                        exact-active-class="text-slate-500"
                        class="flex items-center space-x-2 text-sm pb-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user w-5 h-5 flex-none"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                            <span>Profilo pubblico</span>
                    </router-link>

                    <router-link
                        :to="{ name: 'user.settings.account', params: { username: loggedInUser.username } }"
                        exact-active-class="text-slate-500"
                        class="flex items-center space-x-2 text-sm pb-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-tool w-5 h-5"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
                            <span>Account</span>
                    </router-link>
                </div>

                <!-- Sicurezza -->
                <div class="py-6">
                    <span class="block text-xs mb-4 text-slate-500">Sicurezza</span>
                    <router-link
                        :to="{ name: 'user.settings.profile', params: { username: loggedInUser.username } }"
                        exact-active-class="text-slate-500"
                        class="flex items-center space-x-2 text-sm pb-1.5">
                            <svg class="w-5 h-5 flex-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg>
                            <span>Cambio password</span>
                    </router-link>
                </div>
            </aside>

            <div class="col-span-9">
                <router-view :user="loggedInUser"></router-view>
            </div>
        </section>
	</div>
</template>

<script>
export default {
    name: 'user.settings.index',
    props: {
        username: {
            type: String,
            required: true
        }
    },
    mounted() {
        this.getUser()
    },
    computed: {
        loggedInUser() {
            return this.$store.state.auth.user
        }
    },
    methods: {
        getUser() {
            this.$store.dispatch('users/getUser', { username: this.username })
        }
    }
}
</script>