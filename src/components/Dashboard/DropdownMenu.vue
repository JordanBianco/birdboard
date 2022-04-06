<template>
    <div v-if="user" class="relative">
        <div
            id="avatar"
            @click="toggleMenu()"
            class="bg-slate-200 rounded-full w-9 h-9 cursor-pointer"></div>

        <div
            v-if="showMenu"
            class="absolute top-12 right-0 w-48 bg-white border border-slate-200 rounded-lg z-20">
                <header class="p-3">
                    <span class="block font-semibold">{{ user.name }}</span>
                    <span class="block text-slate-400 text-sm -mt-1">@{{ user.username }}</span>
                </header>

                <section class="border-t border-b border-slate-200 p-3 text-sm text-slate-400">
                    <router-link
                        :to="{ name: 'user.show', params: { username: user.username }}"
                        @click.native="toggleMenu()"
                        class="flex items-center space-x-3 py-2 hover:text-slate-500 transition">
                            <svg class="w-5 h-5 flex-none" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24"><path fill="currentColor" d="M22.60107,2.062a1.00088,1.00088,0,0,0-.71289-.71289A11.25224,11.25224,0,0,0,10.46924,4.97217L9.35431,6.296l-2.6048-.62848A2.77733,2.77733,0,0,0,3.36279,7.0249L1.1626,10.9248A.99989.99989,0,0,0,1.82422,12.394l3.07275.65869a13.41952,13.41952,0,0,0-.55517,2.43409,1.00031,1.00031,0,0,0,.28466.83642l3.1001,3.1001a.99941.99941,0,0,0,.707.293c.02881,0,.05762-.00147.08692-.00391a12.16892,12.16892,0,0,0,2.49157-.49l.64368,3.00318a1.0003,1.0003,0,0,0,1.46924.66162l3.90527-2.20264a3.03526,3.03526,0,0,0,1.375-3.30371l-.6687-2.759,1.23706-1.13751A11.20387,11.20387,0,0,0,22.60107,2.062ZM3.57227,10.72314,5.12842,7.96338a.82552.82552,0,0,1,1.06982-.37549l1.71741.4162-.65.77179A13.09523,13.09523,0,0,0,5.67633,11.174Zm12.47021,8.22217L13.32666,20.477l-.4295-2.00464a11.33992,11.33992,0,0,0,2.41339-1.61987l.74353-.68366.40344,1.66462A1.041,1.041,0,0,1,16.04248,18.94531ZM17.65674,11.98l-3.68457,3.38623a9.77348,9.77348,0,0,1-5.17041,2.3042l-2.4043-2.4043a10.932,10.932,0,0,1,2.40088-5.206l1.67834-1.99268a.9635.9635,0,0,0,.07813-.09277L11.98975,6.271a9.27757,9.27757,0,0,1,8.80957-3.12012A9.21808,9.21808,0,0,1,17.65674,11.98Zm-.923-6.16376a1.5,1.5,0,1,0,1.5,1.5A1.49992,1.49992,0,0,0,16.7337,5.81622Z"/></svg>
                            <span>Dashboard</span>    
                    </router-link>

                    <router-link
                        :to="{ name: 'user.settings.profile', params: { username: user.username }}"
                        @click.native="toggleMenu()"
                        class="flex items-center space-x-3 py-2 hover:text-slate-500 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-tool w-5 h-5 text-slate-400"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
                            <span>Impostazioni</span>
                        </router-link>
                </section>

                <footer class="p-3 text-sm text-slate-400">
                    <button
                        id="signout"
                        class="flex items-center space-x-3 w-full hover:text-slate-500 transition"
                        @click="signout()">
                            <svg class="w-5 h-5 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M4,12a1,1,0,0,0,1,1h7.59l-2.3,2.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l4-4a1,1,0,0,0,.21-.33,1,1,0,0,0,0-.76,1,1,0,0,0-.21-.33l-4-4a1,1,0,1,0-1.42,1.42L12.59,11H5A1,1,0,0,0,4,12ZM17,2H7A3,3,0,0,0,4,5V8A1,1,0,0,0,6,8V5A1,1,0,0,1,7,4H17a1,1,0,0,1,1,1V19a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V16a1,1,0,0,0-2,0v3a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V5A3,3,0,0,0,17,2Z"/></svg>
                            <span>Esci</span>
                    </button>
                </footer>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DropdownMenu',
    mounted() {
        this.$store.dispatch('auth/getUser')
    },
    created: function() {
        let self = this;

        window.addEventListener('click', function(e){
            if (!self.$el.contains(e.target)){
                self.showMenu = false
            } 
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
        }
    },
    methods: {
        toggleMenu() {
            this.showMenu = ! this.showMenu
        },
        signout() {
            this.$store.dispatch('auth/signout')
        }
    }
}
</script>