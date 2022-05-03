<template>
    <div v-if="userCopy">
        <h3 class="text-xl mb-5">Account</h3>
        <form @submit.prevent="updateAccountInfo()">
            
            <ErrorMessages :errors="errors" class="pb-4" />

            <div class="mb-10">
                <label class="text-sm text-slate-400 block mb-1">Username</label>
                <input
                    name="username"
                    id="username"
                    v-model="userCopy.username"
                    type="text"
                    class="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-sky-200 text-sm">
            </div>

            <button
                type="submit"
                class="bg-sky-400 hover:bg-sky-500 transition text-white rounded-full px-4 py-1.5 focus:outline-sky-200 text-sm">
                    Aggiorna Informazioni
            </button>
        </form>
    </div>
</template>

<script>
import ErrorMessages from '@/components/Layout/ErrorMessages'

export default {
    name: 'user.settings.profile',
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
        Object.keys(this.user).forEach((key) => {
            this.$set(this.userCopy, key, this.user[key]);
        })

        this.$store.commit('authUser/SET_ERRORS', [])
    },
    data() {
        return {
            userCopy: {}
        }
    },
    computed: {
        errors() {
            return this.$store.state.authUser.errors
        }
    },
    methods: {
        updateAccountInfo() {
            this.$store.dispatch('authUser/updateAccountInfo', {
                id: this.userCopy.id,
                username: this.userCopy.username,
            })
        }
    }
}
</script>