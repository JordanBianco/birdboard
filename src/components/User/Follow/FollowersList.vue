<template>
    <div>
        <p
            @click="openFollowersList()"
            class="cursor-pointer text-slate-400 hover:text-sky-400 dark:hover:text-sky-400 dark:text-slate-100">
                {{ user.followers_count }} Followers
        </p>

        <!-- Overlay -->
        <div
            id="overlay"
            @click="closeFollowersList()"
            v-if="showFollowersList"
            class="bg-black opacity-30 fixed inset-0 z-10"></div>
    
        <div
            v-if="showFollowersList"
            class="fixed w-full sm:max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                
                <div class="text-sm sm:w-[400px] bg-white dark:bg-zinc-700 rounded-xl shadow-lg">
                    <header class="py-4 border-b border-slate-200 dark:border-zinc-600 relative">
                        <h3 class="text-base text-center">Followers</h3>
                        <div class="absolute right-4 top-5">
                            <svg
                                @click="closeFollowersList()"
                                class="w-5 h-5 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M13.41,12l4.3-4.29a1,1,0,1,0-1.42-1.42L12,10.59,7.71,6.29A1,1,0,0,0,6.29,7.71L10.59,12l-4.3,4.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l4.29,4.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"/></svg>
                        </div>
                    </header>

                    <section class="overflow-y-auto h-[400px]">
                        <div v-if="followers && followers.length > 0">
                            <div
                                v-for="follower in followers"
                                :key="follower.id"
                                class="flex items-center justify-between px-4 py-3 odd:bg-slate-50 dark:odd:bg-zinc-600">
                                    <div class="w-full flex items-center space-x-3">
                                        <UserAvatar
                                            :user="follower"
                                            :classes="'w-9 h-9'"
                                        />
                                        <div>
                                            <span class="font-semibold mr-2">{{ follower.name }}</span>
                                    
                                            <router-link
                                                :to="{ name: 'user.show', params: { username: follower.username } }"
                                                class="text-slate-400 block -mt-0.5 max-w-max">
                                                    @{{ follower.username }}
                                            </router-link>
                                        </div>
                                    </div>
                                    <button
                                        v-if="loggedInUser.id === user.id"
                                        @click="removeFollower(follower)"
                                        class="text-slate-400 hover:text-red-500 transition">
                                            <svg class="w-5 h-5 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M13.41,12l4.3-4.29a1,1,0,1,0-1.42-1.42L12,10.59,7.71,6.29A1,1,0,0,0,6.29,7.71L10.59,12l-4.3,4.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l4.29,4.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"/></svg>
                                    </button>
                            </div>

                            <div
                                v-observe-visibility="visibilityChanged"
                                :class="{ 'flex justify-center py-3' : loading }">
                                    <svg v-if="loading" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-loader animate-spin text-slate-300 w-6 h-6"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
                            </div>

                        </div>
                    </section>
                </div>
        </div>
    </div>
</template>

<script>
import UserAvatar from '@/components/User/UserAvatar'

export default {
    name: 'FollowersList',
    components: {
        UserAvatar
    },
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
                id: this.user.id,
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