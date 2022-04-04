<template>
    <div
        v-if="post && replies"
        class="max-w-3xl mx-auto space-y-8 py-10">
        
        <SinglePost
            :post="post"
            :replies_count="replies.length"
        />

        <!-- Commenti caricati a parte non eagerloaded -->
        <CreateReply
            v-if="user"
            :post="post"
            :user="user"    
        />
        <div v-else class="text-slate-500">
            <router-link
                class="text-sky-400 hover:underline"
                :to="{ name: 'signin' }">
                    Accedi
            </router-link>
            per partecipare alla conversazione
        </div>

        <div v-if="replies && replies.length != 0">
            <SingleReply
                v-for="reply in replies"
                :key="reply.id"
                :reply="reply"
            />
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
    computed: {
        user() {
            return this.$store.state.auth.user
        },
        post() {
            return this.$store.state.users.post
        },
        replies() {
            return this.$store.state.reply.replies
        }
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
                id: this.id
            })
        }
    }
}
</script>