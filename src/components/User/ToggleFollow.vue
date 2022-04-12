<template>
    <div class="flex items-center space-x-2">
        <button
            v-if="loggedInUser && loggedInUser.id !== user.id"
            @click="toggleFollow()"
            :class="[ alreadyFollowing() ? 'bg-white hover:text-slate-500 border border-slate-300 text-slate-400 focus:outline-sky-200' : 'bg-sky-400 hover:bg-sky-500 text-white focus:outline-sky-200' ]"
            class="text-sm  transition rounded-full px-4 py-1.5  max-w-max">
                {{ alreadyFollowing() ? 'Non seguire più' : 'Segui' }}
        </button>
    </div>
</template>

<script>
export default {
    name: 'ToggleFollow',
    props: {
        user: {
            type: Object,
            required: true
        },
        loggedInUser: {
            type: Object,
            required: false
        }
    },
    methods: {
        toggleFollow() {
            if (this.alreadyFollowing()) {
                this.$store.dispatch('follow/removeFollowing', {
                    followed: this.user,
                    user: this.loggedInUser,
                    value: false
                })
            } else {
                this.$store.dispatch('follow/addFollowing', {
                    user: this.user,
                    loggedInUser: this.loggedInUser
                })
            }
        },
        alreadyFollowing() {
            return this.$store.state.follow.loggedInUserFollowing.find(user => {
                return user.id === this.user.id
            })
        }
    }
}
</script>