<template>
    <div>
        <p
            @click="openFollowersList()"
            class="cursor-pointer">
                <span class="text-slate-600 font-semibold text-base">
                    <!-- 
                        Controllo: se sono loggato e la pagina su cui mi trovo è quella dell'utente loggato, prendo come riferimento loggedInUserFollowers
                    -->
                    {{ loggedInUser && loggedInUser.id === user.id ? this.$store.state.follow.loggedInUserFollowers.length : followers.length }}
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
                    <header class="py-4 mb-2 border-b border-slate-200">
                        <h3 class="text-slate-500 text-base text-center">Followers</h3>
                    </header>
                    <section style="height:400px" class="overflow-y-auto">
                        <div
                            v-for="follower in loggedInUser && loggedInUser.id === user.id ? this.$store.state.follow.loggedInUserFollowers : followers"
                            :key="follower.id"
                            class="flex items-center justify-between px-4 py-2">
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
        },
        followers: {
            type: [Object, Array],
            required: false
        }
    },
    data() {
        return {
            showFollowersList: false
        }
    },
    methods: {
        openFollowersList() {
            this.showFollowersList = true
        },
        closeFollowersList() {
            this.showFollowersList = false
        },
        removeFollower(user) {
            this.$store.dispatch('follow/removeFollower', {
                user: user,
                loggedInUser: this.loggedInUser
            })
        }
    }
}
</script>