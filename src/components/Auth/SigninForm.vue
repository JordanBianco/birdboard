<template>
    <form
        @submit.prevent="signin()"
        class="max-w-sm mx-auto">

            <h2 class="text-xl font-semibold mb-5">Accedi</h2>

            <ErrorMessages :errors="errors" class="pb-5" />

            <div class="mb-4">
                <label class="text-xs text-slate-400 block mb-1">Email</label>
                <input
                    name="email"
                    id="email"
                    v-model="user.email"
                    type="email"
                    class="w-full border border-slate-200 dark:border-zinc-600 rounded-lg px-4 py-2 focus:outline-none text-sm bg-transparent">
            </div>

            <div class="relative mb-10">
                <label class="text-xs text-slate-400 block mb-1">Password</label>
                <input
                    name="password"
                    id="password"
                    v-model="user.password"
                    :type="showPassword ? 'text' : 'password'"
                    class="w-full border border-slate-200 dark:border-zinc-600 rounded-lg px-4 py-2 pr-20 focus:outline-none text-sm bg-transparent">

                <span
                    id="toggle"
                    @click="togglePassword()"
                    class="absolute text-slate-400 text-xxs right-6 top-8 uppercase">
                        Show
                </span>
            </div>

            <button
                type="submit"
                class="w-full bg-sky-400 hover:bg-sky-500 transition text-white rounded-full px-4 py-1.5 focus:outline-sky-200">
                    Accedi
            </button>
            <p class="text-xs text-slate-400 mt-2 text-center">Non hai ancora un account? <router-link :to="{ name: 'signup' }">Registrati</router-link> </p>
    </form>
</template>

<script>
import ErrorMessages from '@/components/Layout/ErrorMessages'

export default {
    name: 'SigninForm',
    components: {
        ErrorMessages
    },
    watch: {
        "$route" : {
            handler() {
                this.$store.commit('auth/SET_ERRORS', [])
            },
            deep: true,
            immediate: true
        }
    },
    data() {
        return {
            user: {
                email: '',
                password: ''
            },
            showPassword: false
        }
    },
    computed: {
        errors() {
            return this.$store.state.auth.errors
        }
    },
    methods: {
        togglePassword() {
            this.showPassword = ! this.showPassword
        },
        signin() {
            this.$store.dispatch('auth/signin', { user: this.user })
        }
    }
}
</script>