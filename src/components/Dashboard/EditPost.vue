<template>
    <form
        @submit.prevent="updatePost()"
        class="text-sm bg-white border border-slate-200 rounded-lg pt-4 p-3">
            <textarea
                v-model="post.body"
                name="body"
                id="body"
                class="w-full resize-none placeholder-slate-400 focus:outline-none"
                rows="4"></textarea>

                <!-- Validation provider per lunghezza caratteri -->
            
            <footer class="flex justify-end border-t border-slate-100 pt-2">
                <button
                    type="submit"
                    class="bg-sky-400 hover:bg-sky-500 transition text-white rounded-full px-4 py-1.5 focus:outline-sky-200">
                        Modifica
                </button>
            </footer>
    </form>
</template>

<script>
export default {
    props: {
        post: {
            type: Object,
            required: true
        }
    },
    methods: {
        updatePost() {
            if (this.post.body == '') return
            this.$store.dispatch('user/updatePost', { post: this.post })
        }
    }
}
</script>