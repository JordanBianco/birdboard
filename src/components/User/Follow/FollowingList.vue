<template>
    <div>
        <p
            @click="openFollowingList()"
            class="cursor-pointer text-slate-400 hover:text-sky-400 dark:hover:text-sky-400 dark:text-slate-100">
                {{ user.following_count }} Seguiti
        </p>

        <!-- Overlay -->
        <div
            id="overlay"
            @click="closeFollowingList()"
            v-if="showFollowingList"
            class="bg-black opacity-30 fixed inset-0 z-10"></div>
    
        <div
            v-if="showFollowingList"
            class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                
                <div
                    class="text-sm bg-white dark:bg-zinc-700 rounded-xl shadow-lg"
                    style="width: 440px">
                        <header class="py-4 border-b border-slate-200 dark:border-zinc-600">
                            <h3 class="text-base text-center">Profili seguiti</h3>
                        </header>

                        <section style="height:400px" class="overflow-y-auto">
                            <div v-if="following && following.length != 0">
                                <div
                                    v-for="followed in following"
                                    :key="followed.id"
                                    class="flex items-center justify-between px-4 py-3 odd:bg-slate-50 dark:odd:bg-zinc-600">
                                        <div class="w-full flex items-center space-x-3">
                                            <UserAvatar
                                                :user="followed"
                                                :classes="'w-9 h-9'"
                                            />
                                            <div>
                                                <span class="font-semibold mr-2">{{ followed.name }}</span>
                                        
                                                <router-link
                                                    :to="{ name: 'user.show', params: { username: followed.username } }"
                                                    class="text-slate-400 block -mt-0.5 max-w-max">
                                                        @{{ followed.username }}
                                                </router-link>
                                            </div>
                                        </div>
                                        <button
                                            v-if="loggedInUser.id === user.id"
                                            @click="removeFollowing(followed)"
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
                        </section>
                </div>
        </div>
    </div>
</template>

<script>
import UserAvatar from '@/components/User/UserAvatar'

export default {
    name: 'FollowingList',
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
            showFollowingList: false,
            page: 1,
            loading: false
        }
    },
    computed: {
        following() {
            return this.$store.state.follow.following
        },
        lastPage() {
            return this.$store.state.follow.lastPage
        },
    },
    methods: {
        getUserFollowing() {
            this.$store.dispatch('follow/getUserFollowing', { 
                id: this.user.id,
                page: this.page
            })
        },
        openFollowingList() {
            this.showFollowingList = true
            this.$store.commit('follow/EMPTY_FOLLOWING')
            this.getUserFollowing()
            
        },
        closeFollowingList() {
            this.showFollowingList = false
            this.$store.commit('follow/EMPTY_FOLLOWING')
            this.page = 1
        },
        removeFollowing(followed) {
            this.$store.dispatch('follow/removeFollowing', {
                following: followed,
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
            this.getUserFollowing()
        }
    }
}
</script>