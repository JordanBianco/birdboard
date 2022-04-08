<template>
    <div>
        <p
            @click="openFollowingList()"
            class="cursor-pointer">
                <span class="text-slate-600 font-semibold text-base">
                    <!-- 
                        Controllo: se sono loggato e la pagina su cui mi trovo è quella dell'utente loggato, prendo come riferimento loggedInUserFollowing
                    -->
                    {{ loggedInUser && loggedInUser.id === user.id ? this.$store.state.follow.loggedInUserFollowing.length : following.length }}
                </span> Seguiti
        </p>

        <!-- Overlay -->
        <div
            id="overlay"
            @click="closeFollowingList()"
            v-if="showFollowingList"
            class="bg-black opacity-30 fixed inset-0"></div>
    
        <div
            v-if="showFollowingList"
            class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                
                <div class="text-sm bg-white border border-slate-200 rounded-lg shadow-lg" style="width: 440px">
                    <header class="py-4 mb-2 border-b border-slate-200">
                        <h3 class="text-slate-500 text-base text-center">Profili seguiti</h3>
                    </header>
                    <section style="height:400px" class="overflow-y-auto">
                        <div
                            v-for="followed in loggedInUser && loggedInUser.id === user.id ? this.$store.state.follow.loggedInUserFollowing : following"
                            :key="followed.id"
                            class="flex items-center justify-between px-4 py-2">
                                <div class="w-full flex items-center space-x-3">
                                    <div class="w-8 h-8 rounded-full bg-slate-300"></div>
                                    <div>
                                        <span class="font-semibold text-slate-700 mr-2">{{ followed.name }}</span>
                                
                                        <router-link
                                            :to="{ name: 'user.show', params: { username: followed.username } }"
                                            class="text-slate-400 block -mt-0.5 max-w-max">
                                                @{{ followed.username }}
                                        </router-link>
                                    </div>
                                </div>
                                <button
                                    v-if="loggedInUser && loggedInUser.id === user.id"
                                    @click="removeFollowing(followed)"
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
    name: 'FollowingList',
    props: {
        user: {
            type: Object,
            required: true
        },
        loggedInUser: {
            type: Object,
            required: false
        },
        following: {
            type: [Object, Array],
            required: false
        }
    },
    data() {
        return {
            showFollowingList: false
        }
    },
    methods: {
        openFollowingList() {
            this.showFollowingList = true
        },
        closeFollowingList() {
            this.showFollowingList = false
        },
        removeFollowing(user) {
            this.$store.dispatch('follow/removeFollowing', {
                user: user,
                loggedInUser: this.loggedInUser
            })
        }
    }
}
</script>