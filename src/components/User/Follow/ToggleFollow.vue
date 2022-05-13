<template>
    <div class="flex items-center space-x-2">
        <button
            v-if="loggedInUser.id !== user.id"
            @click="toggleFollow()"
            :class="[ 
                followRequestStatus === 'null' ? 'bg-sky-400 hover:bg-sky-500 text-white focus:outline-sky-200' 
                    : followRequestStatus === 'pending' || followRequestStatus === 'accepted' ? 'bg-white hover:border-slate-300 dark:hover:text-slate-600 border border-slate-200 text-slate-400' : '' ]"
            class="text-xs transition rounded-full px-4 py-2 max-w-max">
                {{ buttonText() }}
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
    mounted() {
        if (this.loggedInUser.id !== this.user.id) {
            this.checkRequestStatus()            
        }
    },
    data() {
        return {
            followingStatus: false
        }
    },
    computed: {
        followRequestStatus() {
            return this.$store.state.followRequest.followRequestStatus
        },
        success() {
            return this.$store.state.followRequest.success
        }
    },
    methods: {
        checkRequestStatus() {
            this.$store.dispatch('followRequest/checkRequestStatus', {
                loggedInUser: this.loggedInUser,
                user: this.user
            })
        },
        buttonText() {
            switch (this.followRequestStatus) {
                case 'null':
                    return 'Segui'
                case 'pending':
                    return 'Richiesta inviata'
                case 'accepted':
                    return 'Non seguire più'
            }
        },
        toggleFollow() {
            if (this.followRequestStatus === 'null') {
                this.$store.dispatch('followRequest/sendFollowRequest', {
                    following: this.user,
                    loggedInUser: this.loggedInUser
                })
            } else if (this.followRequestStatus === 'pending') {
                this.$store.dispatch('followRequest/cancelRequest', {
                    user: this.loggedInUser,
                    following: this.user,
                    route_name: this.$route.name
                })
            } else {
                this.$store.dispatch('follow/removeFollowing', {
                    following: this.user,
                    user: this.loggedInUser,
                })
            }
        }
    }
}
</script>