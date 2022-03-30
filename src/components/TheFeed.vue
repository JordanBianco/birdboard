<template>
    <div>
        <SinglePost
            v-for="post in posts"
            :key="post.id"
            :post="post"
        />
    </div>
</template>

<script>
import SinglePost from '@/components/SinglePost'

export default {
    name: 'TheFeed',
    components: {
        SinglePost
    },
    mounted() {
        this.$store.dispatch('posts/getAll')
    },
    computed: {
        posts() {
            return this.$store.state.posts.posts
        }
    }
}
</script>