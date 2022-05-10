<template>
    <div v-if="user">
        <h3 class="text-xl mb-5">Password</h3>
        <form @submit.prevent="updatePassword()">
            
            <ErrorMessages :errors="errors" class="pb-4" />

            <div class="mb-10">
                <label class="text-sm text-slate-400 block mb-1">Vecchia password</label>
                <input
                    name="oldPassword"
                    id="oldPassword"
                    v-model="form.oldPassword"
                    type="text"
                    class="w-full bg-transparent border border-slate-200 dark:border-zinc-600 rounded-lg px-4 py-2 focus:outline-sky-200 text-sm">
            </div>

            <div class="mb-10">
                <label class="text-sm text-slate-400 block mb-1">Nuova password</label>
                <input
                    name="newPassword"
                    id="newPassword"
                    v-model="form.newPassword"
                    type="text"
                    class="w-full bg-transparent border border-slate-200 dark:border-zinc-600 rounded-lg px-4 py-2 focus:outline-sky-200 text-sm">
            </div>

            <div class="mb-10">
                <label class="text-sm text-slate-400 block mb-1">Conferma password</label>
                <input
                    name="password_confirmation"
                    id="password_confirmation"
                    v-model="form.password_confirmation"
                    type="text"
                    class="w-full bg-transparent border border-slate-200 dark:border-zinc-600 rounded-lg px-4 py-2 focus:outline-sky-200 text-sm">
            </div>

            <button
                type="submit"
                class="bg-sky-400 hover:bg-sky-500 transition text-white rounded-full px-4 py-2 focus:outline-sky-200 text-xs">
                    Aggiorna Informazioni
            </button>
        </form>
    </div>
</template>

<script>
import ErrorMessages from '@/components/Layout/ErrorMessages'

export default {
    name: 'user.settings.password',
    components: {
        ErrorMessages
    },
    props: {
        user: {
            type: Object,
            required: true
        }
    },
    mounted() {
        this.$store.commit('authUser/SET_ERRORS', [])
    },
    data() {
        return {
            form: {
                oldPassword: '',
                newPassword: '',
                password_confirmation: ''
            }
        }
    },
    computed: {
        errors() {
            return this.$store.state.authUser.errors
        }
    },
    methods: {
        updatePassword() {
            this.$store.dispatch('authUser/updatePassword', {
                id: this.user.id,
                form: this.form
            })
        }
    }
}
</script>