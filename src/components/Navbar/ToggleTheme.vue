<template>
    <div class="mt-1">
        <button @click="toggleTheme()">
            <svg
                v-if="theme === 'light'"
                class="w-6 h-6 flex-none text-slate-400 hover:text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>

            <svg
                v-else
                class="w-7 h-7 flex-none text-slate-400 hover:text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>

        </button>
    </div>
</template>

<script>
export default {
    name: 'ToggleTheme',
    computed: {
        theme() {
            return this.$store.state.site.theme
        }
    },
    methods: {
        toggleTheme() {
            if (this.theme === 'light') {
                this.$store.commit('site/TOGGLE_THEME', 'dark')                
            } else {
                this.$store.commit('site/TOGGLE_THEME', 'light')                
            }
        }
    }
}
</script>