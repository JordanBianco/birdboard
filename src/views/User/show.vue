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

            <div
                v-if="posts && posts.length != 0"
                v-observe-visibility="visibilityChanged"
                :class="{ 'flex justify-center py-3' : loading }">
                    <svg v-if="loading" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-loader animate-spin text-slate-300 w-6 h-6"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
            </div>

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
            page: 1,
            loading: false
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
            if (this.page >= this.lastPage) { 
                this.loading = false
                return
            } else {
                this.loading = true
            }
            this.page = this.page + 1
            this.getPosts()
        }
    }
}
</script>