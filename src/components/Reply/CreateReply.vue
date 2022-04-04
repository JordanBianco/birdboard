<template>
    <div>
        <form
            @submit.prevent="storeReply()"
            class="text-sm bg-white border border-slate-200 rounded-lg pt-4 p-3">
                <textarea
                    v-model="reply.body"
                    name="body"
                    id="body"
                    placeholder="Write a comment"
                    class="w-full resize-none placeholder-slate-400 focus:outline-none"
                    rows="4"></textarea>

                    <!-- Validation provider per lunghezza caratteri -->
                
                <footer class="flex items-center justify-between border-t border-slate-100 pt-2">
                    <div class="flex items-center space-x-2">
                        <div class="bg-slate-200 rounded-full w-9 h-9"></div>
                        <span class="text-slate-400">@{{ user.username }}</span>
                    </div>
                    <button
                        type="submit"
                        class="bg-sky-400 hover:bg-sky-500 transition text-white rounded-full px-4 py-1.5 focus:outline-sky-200">
                            Reply
                    </button>
                </footer>
        </form>
        <ErrorMessages :errors="errors" />
    </div>
</template>

<script>
import ErrorMessages from '@/components/Layout/ErrorMessages'

export default {
    name: 'CreateReply',
    components: {
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