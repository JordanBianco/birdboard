<template>
    <div class="flex py-10" style="height: 650px">
        <section class="border border-slate-200 bg-white overflow-y-auto w-1/3">

            <NewChatMessage
                :authUser="authUser"
                @selectUser="selectUser"
            />

            <!-- Chat avviate -->
            <div
                v-for="user,index in chatStarted"
                :key="index"
                class="flex items-center justify-between text-sm odd:bg-slate-50 cursor-pointer transition hover:bg-slate-100"
            >
                <!-- Io ho iniziato la conversazione e ho bisogno del to -->
                <div
                    v-if="user.from.id === authUser.id"
                    class="w-full flex items-center space-x-3 px-4 py-3"
                    :class="[ selectedUser != null && selectedUser.id === user.to.id ? 'bg-slate-100' : '' ]"
                    @click="selectUser(user.to)">
                        <div class="w-10 h-10 rounded-full bg-slate-300"></div>
                        <div>
                            <span class="font-semibold text-slate-700 mr-2">{{ user.to.name }}</span>
                            <span class="text-slate-400 block -mt-0.5 max-w-max">@{{ user.to.username }}</span>
                        </div>
                </div>

                <!-- altrimenti se ho ricevuto un messaggio prendo il from -->
                <div
                    v-else
                    class="w-full flex items-center space-x-3 px-4 py-3"
                    :class="[ selectedUser != null && selectedUser.id === user.from.id ? 'bg-slate-100' : '' ]"
                    @click="selectUser(user.from)">
                        <div class="w-10 h-10 rounded-full bg-slate-300"></div>
                        <div>
                            <span class="font-semibold text-slate-700 mr-2">{{ user.from.name }}</span>
                            <span class="text-slate-400 block -mt-0.5 max-w-max">@{{ user.from.username }}</span>
                        </div>
                </div>

                <!-- <div
                    v-observe-visibility="visibilityChanged"
                    :class="{ 'flex justify-center py-3' : loading }">
                        <svg v-if="loading" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-loader animate-spin text-slate-300 w-6 h-6"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
                </div> -->
            </div>
        </section>

        <section class="w-2/3 border border-l-0 border-slate-200 bg-white">
            <ChatBox
                v-if="selectedUser"
                :selectedUser="selectedUser"
            />
        </section>
    </div>
</template>

<script>
import NewChatMessage from '@/components/Chat/NewChatMessage'
import ChatBox from '@/components/Chat/ChatBox'

export default {
    name: 'Chat.index',
    components: {
        NewChatMessage,
        ChatBox
    },
    beforeRouteLeave(to, from, next) {
        this.emptyChatStarted()
        next()
    },
    mounted() {
        this.getChatStarted()
    },
    data() {
        return {
            selectedUser: null,
            page: 1     
        }
    },
    computed: {
        chatStarted() {
            return this.$store.state.chat.chatStarted
        },
        authUser() {
            return this.$store.state.auth.user
        }
    },
    methods: {
        getChatStarted() {
            this.$store.dispatch('chat/getChatStarted', {
                username: this.$store.state.auth.user.username
                // page: this.page
            })
        },
        getChatHistory() {
            this.$store.dispatch('chat/getChatHistory', {
                id: this.selectedUser.id
            })
        },
        selectUser(user) {
            if (this.selectedUser === user) {
                return
            }
            this.$store.commit('chat/EMPTY_CHAT_HISTORY')
            this.selectedUser = user
            this.getChatHistory()
        },
        emptyChatStarted() {
            this.$store.commit('chat/EMPTY_CHAT_STARTED')
        }
    }
}
</script>