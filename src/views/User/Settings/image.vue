<template>
    <div v-if="user">
        <h3 class="text-xl mb-5">Immagine del profilo</h3>
        <form @submit.prevent="updateImage()">
            
            <ErrorMessages :errors="errors" class="pb-4" />

            <div class="mb-10">
                <input
                    name="image"
                    id="image"
                    @change="onFileChange"
                    type="file"
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
    name: 'user.settings.image',
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
            image: null
        }
    },
    computed: {
        errors() {
            return this.$store.state.authUser.errors
        }
    },
    methods: {
        updateImage() {
            const formData = new FormData();
            formData.append('image', this.image)
            formData.append('id', this.user.id)

            this.$store.dispatch('authUser/updateImage', formData)
        },
        onFileChange(e) {
            this.image = e.target.files[0];
        }
    }
}
</script>