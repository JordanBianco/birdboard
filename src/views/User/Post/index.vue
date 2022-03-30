<template>
    <div class="space-y-8">
        <CreatePost />

        <div v-if="posts.length != 0">
            <SinglePost
                v-for="post in posts"
                :key="post.id"
                :post="post"
            /> 
        </div>
    </div>
</template>

<script>
import CreatePost from '@/components/CreatePost'
import SinglePost from '@/components/SinglePost'

export default {
    name: 'posts.index',
    components: {
        CreatePost,
        SinglePost
    },
    mounted() {
        this.$store.dispatch('user/getPosts')
    },
    computed: {
        posts() {
            return this.$store.state.user.posts
        }
    }
}
</script>