<template>
    <div v-if="user">
        <TheProfile
            :user="user"
            :loggedInUser="loggedInUser"
        />

        <div class="space-y-8 py-10">
            <CreatePost
                v-if="loggedInUser && loggedInUser.id === user.id"
            />

            <div v-if="posts && posts.length != 0">
                <SinglePost
                    v-for="post in posts"
                    :key="post.id"
                    :post="post"
                    :replies_count="post.replies_count"
                />
            </div>

            <div v-if="posts && posts.length" v-observe-visibility="visibilityChanged"></div>
        </div>
	</div>
</template>

<script>
import TheProfile from '@/components/User/TheProfile'
import CreatePost from '@/components/Post/CreatePost'
import SinglePost from '@/components/Post/SinglePost'

export default {
    name: 'user.show',
    props: {
        username: {
            type: String,
            required: true
        }
    },
    components: {
        TheProfile,
        CreatePost,
        SinglePost
    },
    mounted() {
        this.$store.commit('users/EMPTY_POSTS')
        this.getUser()
        this.getPosts()
    },
    watch: {
        "$route.params.username" : {
            handler() {
                this.$store.commit('users/EMPTY_POSTS')
                this.page = 1
                this.getUser()
                this.getPosts()
            }
        }
    },
    data() {
        return {
            page: 1
        }
    },
    computed: {
        user() {
            return this.$store.state.users.user
        },
        posts() {
            return this.$store.state.users.posts
        },
        lastPage() {
            return this.$store.state.users.lastPage
        },
        loggedInUser() {
            return this.$store.state.auth.user
        }
    },
    methods: {
        getUser() {
            this.$store.dispatch('users/getUser', { username: this.username })
        },
        getPosts() {
            this.$store.dispatch('users/getPosts', { 
                username: this.username,
                page: this.page
            })
        },
        visibilityChanged(isVisible) {
            if (! isVisible) { return }
            if (this.page >= this.lastPage) { return }
            this.page = this.page + 1
            this.getPosts()
        }
    }
}
</script>