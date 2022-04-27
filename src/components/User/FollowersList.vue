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
                    <section style="height:400px" class="overflow-y-auto p-1">
                        <div v-if="followers && followers.length > 0">
                            <div
                                v-for="follower in followers"
                                :key="follower.id"
                                class="flex items-center justify-between px-4 py-3 odd:bg-slate-50">
                                    <div class="w-full flex items-center space-x-3">
                                        <div class="w-8 h-8 rounded-full bg-slate-300"></div>
                                        <div>
                                            <span class="font-semibold text-slate-600 mr-2">{{ follower.name }}</span>
                                    
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
                                        class="whitespace-nowrap text-xs bg-white hover:bg-red-500 border border-slate-300 hover:border-red-600 text-slate-400 hover:text-white transition rounded-full px-4 py-1.5 focus:outline-sky-200 max-w-max">
                                            Rimuovi
                                    </button>
                            </div>

                            <div
                                v-observe-visibility="visibilityChanged"
                                :class="{ 'flex justify-center py-3' : loading }">
                                    <svg v-if="loading" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-loader animate-spin text-slate-300 w-6 h-6"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
                            </div>

                        </div>
                        <div v-else class="text-center p-10">
                            Questo utente non ha followers.
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
            showFollowersList: false,
            page: 1,
            loading: false
        }
    },
    computed: {
        followers() {
            return this.$store.state.follow.followers
        },
        lastPage() {
            return this.$store.state.follow.lastPage
        },
    },
    methods: {
        getUserFollowers() {
            this.$store.dispatch('follow/getUserFollowers', { 
                username: this.user.username,
                page: this.page
            })
        },
        openFollowersList() {
            this.showFollowersList = true
            // se carico nuovi followers e chiudo il modal prima che la richiesta finisca, mi ritrovo con i follower caricati nello state anche con il modal chiusto, per questo refresh anche prima che si apra il modal
            this.$store.commit('follow/EMPTY_FOLLOWERS')
            this.getUserFollowers()
        },
        closeFollowersList() {
            this.showFollowersList = false
            this.$store.commit('follow/EMPTY_FOLLOWERS')
            this.page = 1
        },
        removeFollower(follower) {
            this.$store.dispatch('follow/removeFollower', {
                follower: follower,
                user: this.user
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
            this.getUserFollowers()
        }
    }
}
</script>