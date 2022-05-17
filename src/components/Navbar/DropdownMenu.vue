<template>
    <div v-if="user" class="relative">
        <div class="flex-none w-9 h-9" @click="toggleMenu()">
            <img
                v-if="user.image"
                :src="userImage"
                :alt="user.name + ' avatar'"
                class="rounded-full w-full h-full object-cover">

            <img
                v-else
                :src="'https://eu.ui-avatars.com/api/?background=eeeeee&color=3f3f46&name=' + user.name"
                alt=""
                class="rounded-full flex-none">
        </div>

        <div
            v-if="showMenu"
            class="absolute top-12 right-0 w-48 bg-white dark:bg-zinc-700 shadow-md shadow-slate-200 dark:shadow-zinc-900 rounded-xl z-20 p-5">
                <div>
                    <span class="block font-semibold text-sm mb-0.5">{{ user.name }}</span>
                    <span class="block text-slate-400 text-xs">@{{ user.username }}</span>
                </div>

                <section class="pt-5 space-y-3">
                    <router-link
                        :to="{ name: 'user.show', params: { username: user.username }}"
                        @click.native="toggleMenu()"
                        class="flex items-center space-x-3 text-slate-400 hover:text-sky-400 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user w-5 h-5 flex-none text-slate-400"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                            <span class="text-sm">Profilo</span>
                    </router-link>

                    <router-link
                        :to="{ name: 'user.settings.profile', params: { username: user.username }}"
                        @click.native="toggleMenu()"
                        class="flex items-center space-x-3 text-slate-400 hover:text-sky-400 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-tool w-5 h-5 text-slate-400"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
                            <span class="text-sm">Impostazioni</span>
                    </router-link>

                    <button
                        id="signout"
                        class="flex items-center space-x-3 w-full text-slate-400 hover:text-sky-400 transition"
                        @click="signout()">
                            <svg class="w-5 h-5 flex-none text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M4,12a1,1,0,0,0,1,1h7.59l-2.3,2.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l4-4a1,1,0,0,0,.21-.33,1,1,0,0,0,0-.76,1,1,0,0,0-.21-.33l-4-4a1,1,0,1,0-1.42,1.42L12.59,11H5A1,1,0,0,0,4,12ZM17,2H7A3,3,0,0,0,4,5V8A1,1,0,0,0,6,8V5A1,1,0,0,1,7,4H17a1,1,0,0,1,1,1V19a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V16a1,1,0,0,0-2,0v3a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V5A3,3,0,0,0,17,2Z"/></svg>
                            <span class="text-sm">Esci</span>
                    </button>
                </section>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DropdownMenu',
    mounted() {
        /** Una volta loggato carico tutte le notifiche (10 per pagina ritornate dall API) */
        this.$store.dispatch('notification/getNotifications', {
            id: this.user.id,
            page: 1
        })

        /** Una volta loggato carico tutte le richieste (10 per pagina ritornate dall API) */
        this.$store.dispatch('followRequest/getReceivedFollowRequests', {
            user: this.user,
            page: 1
        })
    },
    data() {
        return {
            showMenu: false
        }
    },
    computed: {
        user() {
            return this.$store.state.auth.user
        },
        userImage() {
            return 'http://localhost:8000/storage/' + this.user.image.url
        }
    },
    methods: {
        toggleMenu() {
            let self = this;

            window.addEventListener('click', function(e){
                if (!self.$el.contains(e.target)){
                    self.showMenu = false
                } 
            })

            this.showMenu = ! this.showMenu
        },
        signout() {
            this.$store.dispatch('auth/signout')
        }
    }
}
</script>