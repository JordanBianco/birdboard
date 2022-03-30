<template>
    <form
        @submit.prevent="storePost()"
        class="text-sm bg-white border border-slate-200 rounded-lg pt-4 p-3">
            <textarea
                v-model="post.body"
                name="body"
                id="body"
                :placeholder="'Hey ' + user.name + '! What\'s up?'"
                class="w-full resize-none placeholder-slate-400 focus:outline-none"
                rows="4"></textarea>

                <!-- Validation provider per lunghezza caratteri -->
            
            <footer class="flex items-center justify-between border-t border-slate-100 pt-2">
                <div v-if="user" class="flex items-center space-x-2">
                    <div class="bg-slate-200 rounded-full w-9 h-9"></div>
                    <span class="text-slate-400">@{{ user.username }}</span>
                </div>
                <div v-else>
                    <span class="text-slate-400 text-xs">accedi per pubblicare un post</span>
                </div>
                <button
                    type="submit"
                    class="bg-sky-400 hover:bg-sky-500 transition text-white rounded-full px-4 py-1.5 focus:outline-sky-200">
                        Post
                </button>
            </footer>
    </form>
</template>

<script>
export default {
    name: 'CreatePost',
    watch: {
        "success": {
            handler() {
                if (this.success) {
                    this.$store.commit('user/SET_SUCCESS_STATUS', false)
                    this.post.body = ''
                }
            },
            deep: true,
            immediate: true
        }
    },
    data() {
        return {
            post: {
                body: ''
            }
        }
    },
    computed: {
        user() {
            return this.$store.state.auth.user
        },
        success() {
            return this.$store.state.user.success
        }
    },
    methods: {
        storePost() {
            if (this.post.body == '') return
            this.$store.dispatch('user/storePost', { post: this.post })
        }
    }
}
</script>