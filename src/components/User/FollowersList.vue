<template>
    <div>
        <p
            @click="openFollowersList()"
            class="cursor-pointer">
                <span class="text-slate-600 font-semibold text-base">
                    {{ user.followers_count }}
                </span> Followers
        </p>

        <!-- Overlay -->
        <div
            id="overlay"
            @click="closeFollowersList()"
            v-if="showFollowersList"
            class="bg-black opacity-30 fixed inset-0"></div>
    
        <div
            v-if="showFollowersList"
            class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                
                <div class="text-sm bg-white border border-slate-200 rounded-lg shadow-lg" style="width: 440px">
                    <header class="py-4 border-b border-slate-200">
                        <h3 class="text-slate-500 text-base text-center">Followers</h3>
                    </header>
                    <section style="height:400px" class="overflow-y-auto">
                        <div v-if="followers && followers.length != 0">
                            <div
                                v-for="follower in followers"
                                :key="follower.id"
                                class="flex items-center justify-between px-4 py-3 odd:bg-slate-50">
                                    <div class="w-full flex items-center space-x-3">
                                        <div class="w-8 h-8 rounded-full bg-slate-300"></div>
                                        <div>
                                            <span class="font-semibold text-slate-700 mr-2">{{ follower.name }}</span>
                                    
                                            <router-link
                                                :to="{ name: 'user.show', params: { username: follower.username } }"
                                                class="text-slate-400 block -mt-0.5 max-w-max">
                                                    @{{ follower.username }}
                                            </router-link>
                                        </div>
                                    </div>
                                    <button
                                        v-if="loggedInUser && loggedInUser.id === user.id"
                                        @click="removeFollower(follower)"
                                        class="whitespace-nowrap text-xs bg-white hover:text-slate-500 border border-slate-300 text-slate-400 transition rounded-full px-4 py-1.5 focus:outline-sky-200 max-w-max">
                                            Rimuovi
                                    </button>
                            </div>
                        </div>
                        <div v-else class="text-center p-10">
                            Caricamento...
                        </div>
                    </section>
                </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FollowersList',
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
    data() {
        return {
            showFollowersList: false
        }
    },
    computed: {
        followers() {
            return this.$store.state.follow.followers
        },
    },
    methods: {
        openFollowersList() {
            this.showFollowersList = true
            this.$store.dispatch('follow/getUserFollowers', { username: this.user.username })
        },
        closeFollowersList() {
            this.showFollowersList = false
        },
        removeFollower(follower) {
            this.$store.dispatch('follow/removeFollower', {
                follower: follower,
                user: this.user
            })
        }
    }
}
</script>