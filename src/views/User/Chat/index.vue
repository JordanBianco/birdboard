<template>
    <div class="flex py-10" style="height: 650px">

        <section class="border border-slate-200 bg-white overflow-y-auto w-1/3">

            <NewChatMessage
                :authUser="authUser"
                @selectUser="selectUser"
            />

            <!-- Chat avviate -->
            <div
                v-for="conversation,index in conversations"
                :key="index"
                class="flex items-center justify-between text-sm odd:bg-slate-50 cursor-pointer transition hover:bg-slate-100"
            >
                <!-- Io ho iniziato la conversazione e ho bisogno del to -->
                <div
                    v-if="conversation.from.id === authUser.id"
                    class="w-full flex items-center space-x-3 px-4 py-3"
                    :class="[ selectedUser != null && selectedUser.id === conversation.to.id ? 'bg-slate-100' : '' ]"
                    @click="selectUser(conversation.to)">
                        <div class="w-10 h-10 rounded-full bg-slate-500"></div>
                        <div class="w-full">
                            <span class="font-semibold text-slate-700 mr-2">{{ conversation.to.name }}</span>
                            <span class="text-slate-400 block -mt-0.5 max-w-max">@{{ conversation.to.username }}</span>
                        </div>

                        <div
                            v-if="conversation.my_unread_messages && conversation.my_unread_messages.length != 0"
                            class="w-4.5 h-4.5 flex-none flex items-center justify-center text-center text-white text-xs rounded-full bg-emerald-400">{{ conversation.my_unread_messages.length }}</div>
                </div>

                <!-- altrimenti se ho ricevuto un messaggio prendo il from -->
                <div
                    v-else
                    class="w-full flex items-center space-x-3 px-4 py-3"
                    :class="[ selectedUser != null && selectedUser.id === conversation.from.id ? 'bg-slate-100' : '' ]"
                    @click="selectUser(conversation.from)">
                        <div class="w-10 h-10 rounded-full bg-slate-300"></div>
                        <div class="w-full">
                            <span class="font-semibold text-slate-700 mr-2">{{ conversation.from.name }}</span>
                            <span class="text-slate-400 block -mt-0.5 max-w-max">@{{ conversation.from.username }}</span>
                        </div>
                        
                        <div
                            v-if="conversation.my_unread_messages && conversation.my_unread_messages.length != 0"
                            class="w-4.5 h-4.5 flex-none flex items-center justify-center text-center text-white text-xs rounded-full bg-emerald-400">{{ conversation.my_unread_messages.length }}</div>
                </div>
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
        this.$store.commit('chat/EMPTY_CONVERSATIONS')
        next()
    },
    mounted() {
        this.getConversations()

        window.Echo.private('messages.' + this.authUser.id)
            // .whisper('typing', {
                
            // })
            .listen('MessageSent', e => {
                this.newMessageReceived(e.message)

                if (this.selectedUser && this.selectedUser.id === e.message.from.id) {
                    this.$store.commit('chat/PUSH_MESSAGE', e.message)
                }
            })
    },
    data() {
        return {
            selectedUser: null,
        }
    },
    computed: {
        conversations() {
            return this.$store.state.chat.conversations
        },
        authUser() {
            return this.$store.state.auth.user
        }
    },
    methods: {
        getConversations() {
            this.$store.dispatch('chat/getConversations', {
                username: this.$store.state.auth.user.username
            })
        },
        selectUser(user) {
            if (this.selectedUser === user) return
            this.$store.commit('chat/EMPTY_CHAT_HISTORY')
            this.$store.commit('chat/RESET_PAGE')

            this.readAllUnreadMessages(user)

            this.selectedUser = user
        },
        newMessageReceived(message) {

            //  Se l'utente con cui sto chattando è quello selezionato, segno nel DB read = true
            if (this.selectedUser && this.selectedUser.id === message.from.id) {
                this.$store.dispatch('chat/readMessage', {
                    message: message
                })
                return
            }

            // altrimenti aggiungo pallino notifica nuovo messaggio 
            this.$store.commit('chat/NEW_MESSAGE_RECEIVED', {
                from: message.from,
                to: this.authUser
            })
        },
        readAllUnreadMessages(user) {
            this.$store.dispatch('chat/readAllUnreadMessages', {
                user: user
            })
        }
    }
}
</script>