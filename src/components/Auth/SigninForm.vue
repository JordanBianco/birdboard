<template>
    <form @submit.prevent="signin()" class="mt-10 space-y-6">

        <ErrorMessages :errors="errors" />

        <div>
            <label class="text-xs text-sky-400 uppercase block mb-1">Email</label>
            <input
                name="email"
                id="email"
                v-model="user.email"
                type="email"
                class="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-sky-200 text-sm">
        </div>

        <div class="relative">
            <label class="text-xs text-sky-400 uppercase block mb-1">Password</label>
            <input
                name="password"
                id="password"
                v-model="user.password"
                :type="showPassword ? 'text' : 'password'"
                class="w-full border border-slate-200 rounded-lg py-2 pl-4 pr-20 focus:outline-sky-200 text-sm">

            <span
                id="toggle"
                @click="togglePassword()"
                class="absolute text-slate-400 text-xs right-6 top-8 uppercase">
                    Show
            </span>
        </div>

        <button
            type="submit"
            class="w-full bg-sky-400 hover:bg-sky-500 transition text-white rounded-full px-4 py-1.5 focus:outline-sky-200">
                Accedi
        </button>
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
                email: 'udavis@example.org',
                password: 'password'
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