<template>
    <div v-if="user">
        <header class="flex items-center justify-between py-5">
            <div class="flex items-center space-x-4">
                <UserAvatar
                    :user="user"
                    :classes="'w-12 h-12'"
                />

                <div>
                    <span class="font-semibold block">{{ user.name }}</span>
                    <span class="text-sm text-slate-400 block">@{{ user.username }}</span>
                </div>
            </div>

            <router-link
                :to="{ name: 'user.show', params: { username: user.username }}"
                class="text-xs bg-sky-400 hover:bg-sky-500 transition text-white rounded-full px-4 py-2 focus:outline-sky-200 max-w-max">
                    Torna al profilo
            </router-link>
        </header>

        <div class="grid grid-cols-12 space-x-16 mt-10">
            <aside class="col-span-3 space-y-6">
                <section>
                    <span class="block text-slate-400 font-semibold text-xs uppercase mb-3">Impostazioni</span>
                    <div class="bg-white dark:bg-zinc-700 p-5 rounded-xl shadow-md shadow-slate-200 dark:shadow-slate-900 drop-shadow-xs">
                        <ul class="space-y-5">
                            <router-link
                                :to="{ name: 'user.settings.profile', params: { username: user.username }}"
                                exact-active-class="text-sky-400"
                                class="flex items-center space-x-3 hover:text-sky-400 transition">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user w-5 h-5 flex-none text-slate-400"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                    <span class="font-semibold text-sm">Profilo pubblico</span>
                            </router-link>

                            <router-link
                                :to="{ name: 'user.settings.image', params: { username: user.username }}"
                                exact-active-class="text-sky-400"
                                class="flex items-center space-x-3 hover:text-sky-400 transition">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-image w-5 h-5 flex-none text-slate-400"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                                    <span class="font-semibold text-sm">Immagine profilo</span>
                            </router-link>

                            <router-link
                                :to="{ name: 'user.settings.account', params: { username: user.username }}"
                                exact-active-class="text-sky-400"
                                class="flex items-center space-x-3 hover:text-sky-400 transition">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-tool w-5 h-5 flex-none text-slate-400"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
                                    <span class="font-semibold text-sm">Account</span>
                            </router-link>
                        </ul>
                    </div>
                </section>

                <section>
                    <span class="block text-slate-400 font-semibold text-xs uppercase mb-3">Sicurezza</span>
                    <div class="bg-white dark:bg-zinc-700 p-5 rounded-xl shadow-md shadow-slate-200 dark:shadow-slate-900 drop-shadow-xs">
                        <ul class="space-y-5">
                            <router-link
                                :to="{ name: 'user.settings.password', params: { username: user.username }}"
                                exact-active-class="text-sky-400"
                                class="flex items-center space-x-3 hover:text-sky-400 transition">
                                    <svg class="w-5 h-5 flex-none text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg>
                                    <span class="font-semibold text-sm">Cambio password</span>
                            </router-link>

                            <router-link
                                :to="{ name: 'user.settings.delete', params: { username: user.username }}"
                                exact-active-class="text-sky-400"
                                class="flex items-center space-x-3 hover:text-sky-400 transition">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash w-5 h-5 flex-none text-slate-400"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                    <span class="font-semibold text-sm">Elimina account</span>
                            </router-link>
                        </ul>
                    </div>
                </section>
            </aside>

            <div class="col-span-9">
                <router-view :user="user"></router-view>
            </div>
        </div>
	</div>
</template>

<script>
import UserAvatar from '@/components/User/UserAvatar'

export default {
    name: 'user.settings.index',
    components: {
        UserAvatar
    },
    computed: {
        user() {
            return this.$store.state.auth.user
        }
    }
}
</script>