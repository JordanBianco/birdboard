<template>
    <div
        v-if="user && posts && followers && following"
        class="lg:grid lg:grid-cols-12 lg:space-x-10">
            <section class="lg:col-span-9">
                <TheProfile
                    :user="user"
                    :posts_count="posts.length"
                    :loggedInUser="loggedInUser"
                    :followers="followers"
                    :following="following"
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
                </div>
            </section>

            <section class="lg:col-span-3">
                prova
            </section>
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
        this.getUser()
        this.getPosts()
        this.getFollowers()
        this.getFollowing()
    },
    watch: {
        username : {
            handler() {
                this.getUser()
                this.getPosts()
                this.getFollowers()
                this.getFollowing()
            },
            deep: true,
            immediate: true
        }
    },
    computed: {
        user() {
            return this.$store.state.users.user
        },
        posts() {
            return this.$store.state.users.posts
        },
        followers() {
            return this.$store.state.follow.followers
        },
        following() {
            return this.$store.state.follow.following
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
            this.$store.dispatch('users/getPosts', { username: this.username })
        },
        getFollowers() {
            this.$store.dispatch('follow/getUserFollowers', { username: this.username })
        },
        getFollowing() {
            this.$store.dispatch('follow/getUserFollowing', { username: this.username })
        }
    }
}
</script>