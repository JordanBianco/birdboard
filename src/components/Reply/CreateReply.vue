<template>
    <div>
        <form
            @submit.prevent="storeReply()"
            class="text-sm bg-white dark:bg-zinc-700 shadow-md shadow-slate-200 dark:shadow-slate-900 drop-shadow-xs rounded-xl p-5">
                <textarea
                    v-model="reply.body"
                    name="body"
                    id="body"
                    placeholder="Rispondi a questo post"
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
                            Commenta
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
    name: 'CreateReply',
    components: {
        UserAvatar,
       ErrorMessages 
    },
    props: {
        post: {
            type: Object,
            required: true
        },
        user: {
            type: Object,
            required: true
        }
    },
    watch: {
        "success": {
            handler() {
                if (this.success) {
                    this.$store.commit('reply/SET_SUCCESS_STATUS', false)
                    this.reply.body = ''
                }
            },
            deep: true,
            immediate: true
        },
        "$route" : {
            handler() {
                this.$store.commit('reply/SET_ERRORS', [])
            },
            deep: true,
            immediate: true
        }
    },
    data() {
        return {
            reply: {
                body: ''
            }
        }
    },
    computed: {
        success() {
            return this.$store.state.reply.success
        },
        errors() {
            return this.$store.state.reply.errors
        },
    },
    methods: {
        storeReply() {
            if (this.reply.body == '') return
            this.$store.dispatch('reply/storeReply', { 
                post: this.post,
                reply: this.reply
            })
        }
    }
}
</script>