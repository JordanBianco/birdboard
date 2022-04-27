<template>
    <div>
        <header class="py-5 px-6 border-b border-slate-200">
            <div
                @click="openChatUsers()"
                class="flex items-center space-x-2 text-slate-400 hover:text-slate-500 transition cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-send w-5 h-5 flex-none"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                    <span class="text-xs ">Nuovo messaggio</span>
            </div>
        </header>

        <!-- Overlay -->
        <div
            id="overlay"
            @click="closeChatUsers()"
            v-if="showChatUsers"
            class="bg-black opacity-30 fixed inset-0 z-10"></div>
    
        <div
            v-if="showChatUsers"
            class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                
                <div class="text-sm bg-white border border-slate-200 rounded-lg shadow-lg" style="width: 440px">
                    <header class="py-4 border-b border-slate-200">
                        <h3 class="text-slate-500 text-base text-center">Nuovo messaggio</h3>
                    </header>

                    <SearchUserToChatWith
                        @searchUser="searchUser"
                    />
                    
                    <section style="height:400px" class="overflow-y-auto p-1">
                        <p
                            v-if="suggested.length != 0"
                            class="text-sm font-semibold text-slate-600 p-4">
                                Suggeriti
                        </p>
                        <div
                            v-for="user in suggested"
                            :key="user.id"
                            @click="selectUser(user)"
                            class="flex items-center justify-between px-4 py-3 odd:bg-slate-50 cursor-pointer transition hover:bg-slate-100">
                                <div class="w-full flex items-center space-x-3">
                                    <div class="w-8 h-8 rounded-full bg-slate-300"></div>
                                    <div>
                                        <span class="font-semibold text-slate-600">{{ user.name }}</span>
                                        <span class="text-slate-400 block -mt-0.5 max-w-max">@{{ user.username }}</span>
                                    </div>
                                </div>
                        </div>
                    </section>
                </div>
        </div>
    </div>
</template>

<script>
import SearchUserToChatWith from '@/components/Chat/SearchUserToChatWith'

export default {
    name: 'NewChatMessage',
    components: {
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
            this.$store.commit('chat/ADD_TO_CHAT_STARTED', {
                to: user,
                authUser: this.authUser
            })
            this.$emit('selectUser', user)
        },
        searchUser(search) {
            this.search = search
        }
    }
}
</script>