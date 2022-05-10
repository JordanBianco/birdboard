<template>
    <div class="relative">
        <div class="relative w-64">
            <input
                type="text"
                v-model="search"
                placeholder="Cerca"
                class="bg-slate-100 dark:bg-zinc-700 placeholder-slate-400 rounded-lg pl-10 p-2 text-sm focus:outline-none w-full">

            <svg class="w-4 h-4 text-slate-400 flex-none absolute left-2 top-2.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z"/></svg>
        </div>

        <div
            v-if="searchResults.length != 0"
            class="absolute w-full top-12 z-10">
                <div class="dark:bg-zinc-700 bg-white shadow-md drop-shadow-xs dark:shadow-zinc-800 shadow-slate-200 p-5 rounded-xl">
                    <div
                        v-for="user in searchResults"
                        :key="user.id"
                        class="mb-4 last:mb-0">
                            <div class="flex items-center space-x-4">
                                <UserAvatar
                                    :user="user"
                                    :classes="'w-8 h-8'"
                                />
                                <router-link
                                    :to="{ name: 'user.show', params: { username: user.username }}">
                                        <span class="block text-sm">{{ user.name }}</span>
                                        <span class="block text-xs text-slate-400">@{{ user.username }}</span>
                                </router-link>
                            </div>
                    </div>
                </div>
        </div>
    </div>
</template>

<script>
import UserAvatar from '@/components/User/UserAvatar'

export default {
    name: 'TheSearchbar',
    components: {
        UserAvatar
    },
    data() {
        return {
            search: ''
        }
    },
    computed: {
        searchResults() {
            return this.$store.state.users.searchResults
        }
    },
    watch: {
        search() {
            this.searchUser()                
        }
    },
    methods: {
        searchUser() {
            if (this.search.length > 1) {
                this.$store.dispatch('users/searchUser', { search: this.search })
            } else {
                this.$store.commit('users/SEARCH_RESULTS', [])
            }
        }
    }
}
</script>