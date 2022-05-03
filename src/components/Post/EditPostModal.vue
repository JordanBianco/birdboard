<template>
    <div>
        <!-- Overlay -->
        <div
            id="overlay"
            @click="cancelEdit()"
            class="bg-black opacity-30 fixed inset-0 z-20"></div>
        
        <!-- Modal -->
        <div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
            <form
                @submit.prevent="updatePost()"
                class="text-sm bg-white border border-slate-200 rounded-xl pt-4 p-3 shadow-lg" style="width: 440px">
                    <textarea
                        v-model="postCopy.body"
                        name="body"
                        id="body"
                        class="w-full resize-none placeholder-slate-400 focus:outline-none"
                        rows="4"></textarea>

                <footer class="flex justify-between border-t border-slate-100 pt-2">
                    <button
                        id="cancel"
                        type="button"
                        @click="cancelEdit()"
                        class="text-xs bg-white hover:text-slate-500 border border-slate-200 text-slate-400 transition rounded-full px-4 py-2 focus:outline-sky-200 max-w-max">
                            Annulla
                    </button>
                    <button
                        type="submit"
                        class="text-xs bg-sky-400 hover:bg-sky-500 transition text-white rounded-full px-4 py-2 focus:outline-sky-200">
                            Modifica
                    </button>
                </footer>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        postCopy: {
            type: Object,
            required: true
        }
    },
    watch: {
        editSuccess: {
            handler() {
                if (this.editSuccess) {
                    this.$store.commit('users/SET_EDIT_SUCCESS_STATUS', false)
                    this.updatePostValues()
                }
            },
            deep: true,
            immediate: true
        }
    },
    computed: {
        editSuccess() {
            return this.$store.state.users.editSuccess
        }
    },
    methods: {
        // Chiudo il modal e non applico le modifiche
        cancelEdit() {
            this.$emit('cancelEdit')
        },
        // Chiudo il modal e applico le modifiche
        updatePostValues() {
            this.$emit('updatePostValues', this.postCopy)
        },
        updatePost() {
            if (this.postCopy.body == '') return
            this.$store.dispatch('users/updatePost', { 
                username: this.postCopy.user.username,
                post: this.postCopy
            })
        }
    }
}
</script>