<template>
    <div v-if="post">
        <!-- Show single post with comments -->
        <SinglePost :post="post" />

        <!-- Commenti caricati a parte non eagerloaded -->
    </div>
</template>

<script>
import SinglePost from '@/components/SinglePost'

export default {
    name: 'post.show',
    components: {
        SinglePost
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
    },
    computed: {
        post() {
            return this.$store.state.users.post
        }
    },
    methods: {
        getPost() {
            this.$store.dispatch('users/getPost', {
                username: this.$route.params.username,
                id: this.id
            })
        }
    }
}
</script>