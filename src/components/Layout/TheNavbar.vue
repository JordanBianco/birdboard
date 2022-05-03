<template>
    <nav class="px-6 py-4 bg-white border-b border-slate-200">
        <div class="flex justify-between items-center xl:max-w-5xl mx-auto">
            <router-link
                :to="{ name: 'home' }"
                class="text-lg font-semibold flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 flex-none feather feather-feather text-sky-400"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line></svg>
                    <h1>Birdboard</h1>
            </router-link>

            <div v-if="!loggedIn" class="flex items-center space-x-6 text-sm">
                <router-link
                    id="signin"
                    :to="{ name: 'signin' }"
                    class="text-slate-400 hover:text-slate-600 transition">
                        Accedi
                </router-link>
                <router-link
                    id="signup"
                    :to="{ name: 'signup' }"
                    class="bg-sky-400 hover:bg-sky-500 transition text-white rounded-full px-4 py-1.5 focus:outline-sky-200">
                        Iscriviti
                </router-link>
            </div>
            <div
                v-else
                class="flex items-center space-x-3">
                    <div class="relative w-64">
                        <input
                            type="text"
                            placeholder="Cerca"
                            class="bg-slate-100 placeholder-slate-400 rounded-lg pl-10 p-2 text-sm focus:outline-none w-full">

                        <svg class="w-4 h-4 text-slate-400 flex-none absolute left-2 top-2.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z"/></svg>
                    </div>
                    <DropdownMenu />
            </div>
        </div>
    </nav>
</template>

<script>
import DropdownMenu from '@/components/Dashboard/DropdownMenu'

export default {
    name: 'TheNavbar',
    components: {
        DropdownMenu
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.loggedIn
        }
    }
}
</script>