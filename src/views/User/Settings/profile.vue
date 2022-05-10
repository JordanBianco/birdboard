<template>
    <div v-if="userCopy">
        <h3 class="text-xl mb-5">Profilo pubblico</h3>
        
        <form @submit.prevent="updateProfileInfo()">

            <ErrorMessages :errors="errors" class="pb-4" />

            <div class="mb-4">
                <label class="text-sm text-slate-400 block mb-1">Nome</label>
                <input
                    name="name"
                    id="name"
                    v-model="userCopy.name"
                    type="text"
                    class="w-full bg-transparent border border-slate-200 dark:border-zinc-600 rounded-lg px-4 py-2 focus:outline-sky-200 text-sm">
            </div>

            <div class="mb-10">
                <label class="text-sm text-slate-400 block mb-1">Bio</label>
                <textarea
                    name="bio"
                    id="bio"
                    v-model="userCopy.bio"
                    rows="4"
                    class="w-full bg-transparent border border-slate-200 dark:border-zinc-600 rounded-lg px-4 py-2 focus:outline-sky-200 text-sm resize-none"></textarea>
                    <p class="text-xs text-slate-400">Tell us a little bit about yourself</p>
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
        updateProfileInfo() {
            this.$store.dispatch('authUser/updateProfileInfo', {
                id: this.userCopy.id,
                name: this.userCopy.name,
                bio: this.userCopy.bio,
            })
        }
    }
}
</script>