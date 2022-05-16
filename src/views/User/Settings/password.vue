<template>
    <div v-if="user">
        <h3 class="text-xl mb-5">Cambio Password</h3>
        <form @submit.prevent="updatePassword()">
            
            <ErrorMessages :errors="errors" class="pb-4" />

            <div class="mb-4">
                <label class="text-sm text-slate-400 block mb-1">Password attuale</label>
                <input
                    name="current_password"
                    id="current_password"
                    v-model="form.current_password"
                    type="password"
                    class="w-full bg-transparent border border-slate-200 dark:border-zinc-600 rounded-lg px-4 py-2 focus:outline-none text-sm">
            </div>

            <div class="mb-4">
                <label class="text-sm text-slate-400 block mb-1">Nuova password</label>
                <input
                    name="new_password"
                    id="new_password"
                    v-model="form.new_password"
                    type="password"
                    class="w-full bg-transparent border border-slate-200 dark:border-zinc-600 rounded-lg px-4 py-2 focus:outline-none text-sm">
            </div>

            <div class="mb-10">
                <label class="text-sm text-slate-400 block mb-1">Conferma password</label>
                <input
                    name="new_password_confirmation"
                    id="new_password_confirmation"
                    v-model="form.new_password_confirmation"
                    type="password"
                    class="w-full bg-transparent border border-slate-200 dark:border-zinc-600 rounded-lg px-4 py-2 focus:outline-none text-sm">
            </div>

            <div class="flex items-center space-x-4">
                <button
                    type="submit"
                    class="bg-sky-400 hover:bg-sky-500 transition text-white rounded-full px-4 py-2 focus:outline-sky-200 text-xs">
                        Aggiorna Informazioni
                </button>

                <Transition name="fade">
                    <p v-if="message" class="text-sm text-green-400">
                        {{ message }}
                    </p>
                </Transition>
            </div>
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
    watch: {
        success: {
            handler() {
                this.passwordUpdated()
                this.$store.commit('authUser/SET_SUCCESS_STATUS', false)
            }
        }
    },
    data() {
        return {
            form: {
                current_password: '',
                new_password: '',
                new_password_confirmation: ''
            },
            message: ''
        }
    },
    computed: {
        errors() {
            return this.$store.state.authUser.errors
        },
        success() {
            return this.$store.state.authUser.success
        }
    },
    methods: {
        updatePassword() {
            this.$store.dispatch('authUser/updatePassword', {
                id: this.user.id,
                form: this.form
            })
        },
        passwordUpdated() {
            this.form.current_password = ''
            this.form.new_password = ''
            this.form.new_password_confirmation = ''

            this.message = 'Password cambiata con successo'

            setTimeout(() => {
                this.message = ''
            }, 3500)
        }
    }
}
</script>