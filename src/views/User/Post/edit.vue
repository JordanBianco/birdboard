<template>
    <div v-if="post">
        <EditPost :post="post" />
    </div>
</template>

<script>
import EditPost from '@/components/Dashboard/EditPost'

export default {
    name: 'post.edit',
    components: {
        EditPost
    },
    props: {
        id: {
            type: [Number, String],
            required: true
        }
    },
    mounted() {
        this.$store.dispatch('posts/get', { id: this.id })
    },
    computed: {
        post() {
            return this.$store.state.posts.post
        }
    }
}
</script>