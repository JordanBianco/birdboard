<template>
    <div>
        <!--
            replies_count è una proprietà che prendo dall'api quando non c'è bisogno che questa si aggiorni in tempo reale (ad. es con l'aggiunta di un commento). 
            Nella pagina post.show invece, replies_count la ottengo dallo store di Vuex (reply.replies.length) in modo che si aggiori in tempo reale
         -->
        <SinglePost
            v-for="post in posts"
            :key="post.id"
            :post="post"
            :replies_count="post.replies_count"
        />
    </div>
</template>

<script>
import SinglePost from '@/components/Post/SinglePost'

export default {
    name: 'TheFeed',
    components: {
        SinglePost
    },
    mounted() {
        this.$store.dispatch('feed/getAll')
    },
    computed: {
        posts() {
            return this.$store.state.feed.posts
        }
    }
}
</script>