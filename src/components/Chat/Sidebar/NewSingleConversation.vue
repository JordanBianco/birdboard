<template>
    <div>
        <header class="flex items-center justify-between">
            <span class="uppercase font-semibold text-xs text-slate-400 block">Messaggi diretti</span>
            <svg
                @click="openChatUsers()"
                class="w-5 h-5 flex-none text-slate-400 hover:text-sky-400 transition cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M19,11H13V5a1,1,0,0,0-2,0v6H5a1,1,0,0,0,0,2h6v6a1,1,0,0,0,2,0V13h6a1,1,0,0,0,0-2Z"/></svg>
        </header>

        <!-- Overlay -->
        <div
            id="overlay"
            @click="closeChatUsers()"
            v-if="showChatUsers"
            class="bg-black opacity-30 fixed inset-0 z-20"></div>
    
        <div
            v-if="showChatUsers"
            class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
                
                <div class="text-sm bg-white dark:bg-zinc-700 rounded-xl shadow-lg w-[400px]">
                    <header class="py-4 border-b border-slate-200 dark:border-zinc-600">
                        <h3 class="text-center">Nuovo messaggio</h3>
                    </header>

                    <SearchUserToChatWith
                        @searchUser="searchUser"
                    />
                    
                    <section class="overflow-y-auto h-[400px]">
                        <p
                            v-if="suggested.length != 0"
                            class="text-xs uppercase p-4">
                                Suggeriti
                        </p>
                        <div
                            v-for="user in suggested"
                            :key="user.id"
                            @click="selectUser(user)"
                            class="flex items-center justify-between px-4 py-3 cursor-pointer transition hover:bg-slate-100 dark:hover:bg-zinc-800">
                                <div class="w-full flex items-center space-x-3">
                                    <UserAvatar
                                        :user="user"
                                        :classes="'w-8 h-8'"
                                    />
                                    <div>
                                        <span class="block">{{ user.name }}</span>
                                        <span class="text-slate-400 block -mt-0.5">@{{ user.username }}</span>
                                    </div>
                                </div>
                        </div>
                    </section>
                </div>
        </div>
    </div>
</template>

<script>
import SearchUserToChatWith from '@/components/Chat/Sidebar/SearchUserToChatWith'
import UserAvatar from '@/components/User/UserAvatar'

export default {
    name: 'NewConversation',
    components: {
        UserAvatar,
        SearchUserToChatWith
    },
    props: {
        authUser: {
            type: Object,
            required: true
        }
    },
    watch: {
        search: {
            handler() {
                this.getSuggestedUsers()
            }
        }
    },
    data() {
        return {
            showChatUsers: false,
            page: 1,
            search: ''
        }
    },
    computed: {
        suggested() {
            return this.$store.state.chat.suggested
        }
    },
    methods: {
        openChatUsers() {
            this.showChatUsers = true
            this.getSuggestedUsers()
        },
        closeChatUsers() {
            this.showChatUsers = false
            this.search = ''
        },
        getSuggestedUsers() {
            this.$store.dispatch('chat/getSuggestedUsers', { 
                username: this.authUser.username,
                search: this.search
            })
        },
        selectUser(user) {
            this.closeChatUsers()
            // Aggiungo, se non presente, la persona con cui sto chattando alla lista delle chat avviate
            this.$store.commit('chat/ADD_TO_CONVERSATIONS', {
                to: user,
                authUser: this.authUser
            })

            this.$store.commit('chat/SELECT_USER', user)
        },
        searchUser(search) {
            this.search = search
        }
    }
}
</script>