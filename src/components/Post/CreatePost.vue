<template>
    <div>
        <form
            @submit.prevent="storePost()"
            class="text-sm bg-white dark:bg-zinc-700 shadow-md shadow-slate-200 dark:shadow-slate-900 drop-shadow-xs rounded-xl p-5">
                <textarea
                    v-model="post.body"
                    name="body"
                    id="body"
                    :placeholder="'Hey ' + user.name + '! Come va?'"
                    class="w-full resize-none placeholder-slate-400 focus:outline-none bg-transparent"
                    rows="4"></textarea>
                
                <footer class="flex items-center justify-between border-t border-slate-100 dark:border-zinc-600 pt-4">
                    
                    <UserAvatar
                        :user="user"
                        :classes="'w-9 h-9'"
                    />
                    <button
                        type="submit"
                        class="bg-sky-400 hover:bg-sky-500 transition text-xs text-white rounded-full px-4 py-2 focus:outline-sky-200">
                            Post
                    </button>
                </footer>
        </form>
        <ErrorMessages :errors="errors" />
    </div>
</template>

<script>
import UserAvatar from '@/components/User/UserAvatar'
import ErrorMessages from '@/components/Layout/ErrorMessages'

export default {
    name: 'CreatePost',
    components: {
        UserAvatar,
        ErrorMessages
    },
    watch: {
        "success": {
            handler() {
                if (this.success) {
                    this.$store.commit('users/SET_SUCCESS_STATUS', false)
                    this.post.body = ''
                }
            },
            deep: true,
            immediate: true
        },
        "$route" : {
            handler() {
                this.$store.commit('users/SET_ERRORS', [])
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
            return this.$store.state.users.success
        },
        errors() {
            return this.$store.state.users.errors
        }
    },
    methods: {
        storePost() {
            if (this.post.body == '') return

            this.$store.dispatch('users/storePost', { 
                username: this.user.username,
                post: this.post,
                route: this.$route.name
            })
        }
    }
}
</script>