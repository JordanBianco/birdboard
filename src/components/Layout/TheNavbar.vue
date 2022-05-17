<template>
    <nav class="p-4 bg-white dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-700 z-10">
        <div class="flex justify-between items-center xl:max-w-7xl mx-auto">
            <router-link
                :to="{ name: 'home' }"
                class="text-xl font-semibold flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 flex-none feather feather-feather text-sky-400"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line></svg>
                    <h1>Birdboard</h1>
            </router-link>

            <div class="flex items-center space-x-2">
                <div v-if="!loggedIn" class="flex items-center space-x-6 text-sm">
                    <router-link
                        id="signin"
                        exact-active-class="dark:text-slate-100 text-slate-600"
                        :to="{ name: 'signin' }"
                        class="text-slate-400 hover:text-slate-500 transition hidden sm:block">
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
                        <TheSearchbar class="hidden sm:block" />
                        <DropdownMenu />
                </div>

                <ToggleTheme />
            </div>
        </div>
    </nav>
</template>

<script>
import TheSearchbar from '@/components/Navbar/TheSearchbar'
import DropdownMenu from '@/components/Navbar/DropdownMenu'
import ToggleTheme from '@/components/Navbar/ToggleTheme'

export default {
    name: 'TheNavbar',
    components: {
        TheSearchbar,
        DropdownMenu,
        ToggleTheme
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.loggedIn
        }
    }
}
</script>