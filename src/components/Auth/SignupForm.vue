<template>
    <form @submit.prevent="signup()" class="mt-10 space-y-6">

        <ErrorMessage :errors="errors" />

        <div>
            <label class="text-xs text-sky-400 uppercase block mb-1">Nome</label>
            <input
                id="name"
                v-model="user.name"
                type="text"
                class="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-sky-200 text-sm">
        </div>

        <div>
            <label class="text-xs text-sky-400 uppercase block mb-1">Username</label>
            <input
                id="username"
                v-model="user.username"
                type="text"
                class="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-sky-200 text-sm">
        </div>

        <div>
            <label class="text-xs text-sky-400 uppercase block mb-1">Email</label>
            <input
                id="email"
                v-model="user.email"
                type="email"
                class="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-sky-200 text-sm">
        </div>

        <div class="relative">
            <label class="text-xs text-sky-400 uppercase block mb-1">Password</label>
            <input
                id="password"
                v-model="user.password"
                :type="showPassword ? 'text' : 'password'"
                class="w-full border border-slate-200 rounded-lg py-2 pl-4 pr-20 focus:outline-sky-200 text-sm">

            <button
                id="toggle"
                @click="togglePassword()"
                class="absolute text-slate-400 text-xs right-6 top-8 uppercase">
                    Show
            </button>
        </div>

        <button
            type="submit"
            class="w-full bg-sky-400 hover:bg-sky-500 transition text-white rounded-full px-4 py-1.5 focus:outline-sky-200">
                Iscriviti
        </button>
    </form>
</template>

<script>
import ErrorMessage from '@/components/ErrorMessage'

export default {
    name: 'SignupForm',
    components: {
        ErrorMessage
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
                name: '',
                username: '',
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
        signup() {
            this.$store.dispatch('auth/signup', { user: this.user })
        }
    }
}
</script>