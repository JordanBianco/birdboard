<template>
    <div class="space-y-5">
        <header class="flex items-center space-x-4 overflow-x-hidden">
            <div
                v-for="i in 5"
                :key="i"
                class="bg-slate-300 w-24 h-36 rounded-xl flex-none"></div>
        </header>

        <CreatePost />

        <div>
            <SinglePost
                v-for="post in posts"
                :key="post.id"
                :post="post"
                :replies_count="post.replies_count"
            />
            <div
                v-observe-visibility="visibilityChanged"
                :class="{ 'flex justify-center py-3' : loading }">
                    <svg v-if="loading" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-loader animate-spin text-slate-300 w-6 h-6"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
            </div>
        </div>
    </div>
</template>

<script>
import CreatePost from '@/components/Post/CreatePost'
import SinglePost from '@/components/Post/SinglePost'

export default {
    name: 'TheFeed',
    props: {
        user: {
            type: Object,
            required: true
        }
    },
    components: {
        CreatePost,
        SinglePost
    },
    mounted() {
        this.getFeedPosts()
    },
    data() {
        return {
            page: 1,
            loading: false
        }
    },
    computed: {
        posts() {
            return this.$store.state.feed.posts
        },
        lastPage() {
            return this.$store.state.feed.lastPage
        },
    },
    methods: {
        getFeedPosts() {
            this.$store.dispatch('feed/getFeedPosts', {
                id: this.user.id,
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
            this.getFeedPosts()
        }
    }
}
</script>