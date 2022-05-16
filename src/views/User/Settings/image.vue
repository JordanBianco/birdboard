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
    watch: {
        success: {
            handler() {
                this.imageUpdated()
                this.$store.commit('authUser/SET_SUCCESS_STATUS', false)
            }
        }
    },
    data() {
        return {
            image: null,
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
        updateImage() {
            const formData = new FormData();
            formData.append('image', this.image)
            formData.append('id', this.user.id)

            this.$store.dispatch('authUser/updateImage', formData)
        },
        onFileChange(e) {
            this.image = e.target.files[0];
        },
        imageUpdated() {
            this.message = 'Immagine del profilo cambiata con successo'

            setTimeout(() => {
                this.message = ''
            }, 3500)
        }
    }
}
</script>