<template>
    <div>
        <!-- Overlay -->
        <div
            id="overlay"
            @click="cancelEdit()"
            class="bg-black opacity-30 dark:opacity-40 fixed inset-0"></div>
        
        <!-- Modal -->
        <div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <form
                @submit.prevent="updateReply()"
                class="text-sm bg-white dark:bg-zinc-700 rounded-xl p-5 shadow-lg w-[440px]">
                    <textarea
                        v-model="replyCopy.body"
                        name="body"
                        id="body"
                        class="w-full bg-transparent resize-none placeholder-slate-400 focus:outline-none"
                        rows="4"></textarea>

                <footer class="flex justify-between border-t border-slate-100 dark:border-zinc-600 pt-4">
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
        replyCopy: {
            type: Object,
            required: true
        },
        post_id: {
            type: [String, Number],
            required: true
        }
    },
    watch: {
        editSuccess: {
            handler() {
                if (this.editSuccess) {
                    this.$store.commit('reply/SET_EDIT_SUCCESS_STATUS', false)
                    this.updateReplyValues()
                }
            },
            deep: true,
            immediate: true
        }
    },
    computed: {
        editSuccess() {
            return this.$store.state.reply.editSuccess
        }
    },
    methods: {
        // Chiudo il modal e non applico le modifiche
        cancelEdit() {
            this.$emit('cancelEdit')
        },
        // Se this.success è true, chiudo il modal e applico le modifiche
        updateReplyValues() {
            this.$emit('updateReplyValues', this.replyCopy)
        },
        updateReply() {
            if (this.replyCopy.body == '') return
            this.$store.dispatch('reply/updateReply', { 
                id: this.post_id,
                reply: this.replyCopy
            })
        }
    }
}
</script>