<template>
    <div class="space-y-6">
        <div class="bg-white dark:bg-zinc-700 p-5 rounded-xl shadow-md shadow-slate-200 dark:shadow-zinc-900 drop-shadow-xs">
            <div class="flex items-center space-x-4">
                <UserAvatar
                    :user="user"
                    :classes="'w-10 h-10'"
                />
                <div>
                    <span class="block font-semibold text-sm mb-0.5">{{ user.name }}</span>
                    <span class="block text-slate-400 text-sm">@{{ user.username }}</span>
                </div>
            </div>
        </div>

        <div class="bg-white dark:bg-zinc-700 p-5 rounded-xl shadow-md shadow-slate-200 dark:shadow-zinc-900 drop-shadow-xs">
            <ul class="space-y-5">
                <router-link
                    :to="{ name: 'home' }"
                    exact-active-class="text-sky-400"
                    class="flex items-center space-x-3 hover:text-sky-400 transition">
                        <svg class="w-5 h-5 flex-none text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M20,8h0L14,2.74a3,3,0,0,0-4,0L4,8a3,3,0,0,0-1,2.26V19a3,3,0,0,0,3,3H18a3,3,0,0,0,3-3V10.25A3,3,0,0,0,20,8ZM14,20H10V15a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1Zm5-1a1,1,0,0,1-1,1H16V15a3,3,0,0,0-3-3H11a3,3,0,0,0-3,3v5H6a1,1,0,0,1-1-1V10.25a1,1,0,0,1,.34-.75l6-5.25a1,1,0,0,1,1.32,0l6,5.25a1,1,0,0,1,.34.75Z"/></svg>
                        <span class="font-semibold text-sm">News Feed</span>
                </router-link>

                <router-link
                    :to="{ name: 'user.show', params: { username: user.username }}"
                    exact-active-class="text-sky-400"
                    class="flex items-center space-x-3 hover:text-sky-400 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user w-5 h-5 flex-none text-slate-400"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        <span class="font-semibold text-sm">Profilo</span>
                </router-link>

                <div class="flex items-center justify-between">
                    <router-link
                        :to="{ name: 'chat.index', params: { username: user.username }}"
                        exact-active-class="text-sky-400"
                        class="flex items-center space-x-3 hover:text-sky-400 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-send w-5 h-5 flex-none text-slate-400"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                            <span class="font-semibold text-sm">Chat</span>
                    </router-link>

                    <!-- <div class="rounded-full w-4 h-4 bg-red-600 text-white text-xs text-center">
                        2
                    </div> -->
                </div>

                <div class="flex items-center justify-between">
                    <router-link
                        :to="{ name: 'notification.index', params: { username: user.username }}"
                        exact-active-class="text-sky-400"
                        class="flex items-center space-x-3 hover:text-sky-400 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bell w-5 h-5 flex-none text-slate-400"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                            <span class="font-semibold text-sm">Notifiche</span>
                    </router-link>

                    <div v-if="unreadNotifications > 0" class="rounded-full w-4.5 h-4.5 bg-red-500 text-white text-xxs flex justify-center items-center">
                        {{ unreadNotifications > 9 ? '9+' : unreadNotifications }}
                    </div>
                </div>

                <div class="flex items-center justify-between">
                    <router-link
                        :to="{ name: 'notification.index', params: { username: user.username }}"
                        exact-active-class="text-sky-400"
                        class="flex items-center space-x-3 hover:text-sky-400 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user-plus w-5 h-5 flex-none text-slate-400"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
                            <span class="font-semibold text-sm">Richieste</span>
                    </router-link>

                    <div class="rounded-full w-4.5 h-4.5 bg-sky-400 text-white text-xxs flex justify-center items-center">
                        8
                    </div>
                </div>

                <button
                    id="signout"
                    class="flex items-center space-x-3 hover:text-sky-400 transition"
                    @click="signout()">
                        <svg class="w-5 h-5 flex-none text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M4,12a1,1,0,0,0,1,1h7.59l-2.3,2.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l4-4a1,1,0,0,0,.21-.33,1,1,0,0,0,0-.76,1,1,0,0,0-.21-.33l-4-4a1,1,0,1,0-1.42,1.42L12.59,11H5A1,1,0,0,0,4,12ZM17,2H7A3,3,0,0,0,4,5V8A1,1,0,0,0,6,8V5A1,1,0,0,1,7,4H17a1,1,0,0,1,1,1V19a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V16a1,1,0,0,0-2,0v3a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V5A3,3,0,0,0,17,2Z"/></svg>
                        <span class="font-semibold text-sm">Esci</span>
                </button>
            </ul>
        </div>

        <LatestNotifications
            v-if="latestNotifications.length > 0"
            :notifications="latestNotifications"
            :user="user"
        />
    </div>
</template>

<script>
import UserAvatar from '@/components/User/UserAvatar'
import LatestNotifications from '@/components/Notification/LatestNotifications'

export default {
    name: 'TheSidebar',
    components: {
        UserAvatar,
        LatestNotifications
    },
    props: {
        user: {
            type: Object,
            required: true
        }
    },
    computed: {
        latestNotifications() {
            return this.$store.state.notification.notifications
        },
        unreadNotifications() {
            return this.$store.state.notification.notifications.filter(n => { return n.read_at === null }).length
        },
    },
    methods: {
        signout() {
            this.$store.dispatch('auth/signout')
        }
    }
}
</script>