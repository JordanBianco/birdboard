<template>
    <div
        v-if="post"
        class="mx-auto md:w-[440px] space-y-8 py-10">

        <SinglePost
            :post="post"
            :replies_count="post.replies_count"
        />

        <!-- Commenti caricati a parte non eagerloaded -->
        <CreateReply
            :post="post"
            :user="user"    
        />

        <div v-if="replies && replies.length != 0">
            <SingleReply
                :id="reply.id"
                v-for="reply in replies"
                :key="reply.id"
                :reply="reply"
                :post="post"
            />
        </div>

        <div
            v-if="replies && replies.length != 0"
            v-observe-visibility="visibilityChanged"
            :class="{ 'flex justify-center py-3' : loading }">
                <svg v-if="loading" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-loader animate-spin text-slate-300 w-6 h-6"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
        </div>
    </div>
</template>

<script>
import SinglePost from '@/components/Post/SinglePost'
import CreateReply from '@/components/Reply/CreateReply'
import SingleReply from '@/components/Reply/SingleReply'

export default {
    name: 'post.show',
    components: {
        SinglePost,
        CreateReply,
        SingleReply,
    },
    props: {
        username: {
            type: String,
            required: true
        },
        id: {
            type: [Number, String],
            required: true
        }
    },
    mounted() {
        this.getPost()
        this.getReplies()
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.emptyReplies()
        })
    },
    watch: {
        id: {
            handler() {
                // Azzerare le replies
                this.page = 1
                this.emptyReplies()
                this.getPost()
                this.getReplies()
            }
        },
        post: {
            handler() {
                setTimeout(() => {
                    if (this.$route.hash) {
                        let id = this.$route.hash.replace('#', '')
                        if (document.getElementById(id) != null) {
                            document.getElementById(id).scrollIntoView({ 
                                behavior: "smooth",
                                block: "end"
                            })
                        }
                    }
                }, 1000);
            }
        },
        '$route.hash' : {
            handler() {
                setTimeout(() => {
                    let id = this.$route.hash.replace('#', '')
                    if (document.getElementById(id) != null) {
                        document.getElementById(id).scrollIntoView({ 
                            behavior: "smooth",
                            block: "end"
                        })
                    }
                }, 1000);
            }
        }
    },
    data() {
        return {
            page: 1,
            loading: false
        }
    },
    computed: {
        user() {
            return this.$store.state.auth.user
        },
        post() {
            return this.$store.state.users.post
        },
        replies() {
            return this.$store.state.reply.replies
        },
        lastPage() {
            return this.$store.state.reply.lastPage
        },
    },
    methods: {
        getPost() {
            this.$store.dispatch('users/getPost', {
                username: this.$route.params.username,
                id: this.id
            })
        },
        getReplies() {
            this.$store.dispatch('reply/getReplies', {
                id: this.id,
                page: this.page
            })
        },
        visibilityChanged(isVisible) {
            if (! isVisible) { return }
            if (this.page >= this.lastPage) {
                this.loading = false
                return
            } else {
                this.loading = true
            }
            this.page = this.page + 1
            this.getReplies()
        },
        emptyReplies() {
            this.$store.commit('reply/EMPTY_REPLIES')
        }
    }
}
</script>