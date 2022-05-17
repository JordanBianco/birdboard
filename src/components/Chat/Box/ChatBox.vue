<template>
    <div class="h-full relative">
        <ChatBoxHeader
            :selectedUser="selectedUser"
            :notInFollowingList="notInFollowingList"
        />

        <MessagesFeed
            :messages="messages"
            :user="user"
        />

        <SendMessageTextarea
            :selectedUser="selectedUser"
            :user="user"
        />
    </div>
</template>

<script>
import ChatBoxHeader from '@/components/Chat/Box/ChatBoxHeader'
import MessagesFeed from '@/components/Chat/Box/MessagesFeed'
import SendMessageTextarea from '@/components/Chat/Box/SendMessageTextarea'

export default {
    name: 'ChatBox',
    components: {
        ChatBoxHeader,
        MessagesFeed,
        SendMessageTextarea
    },
    props: {
        selectedUser: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            notInFollowingList: ''
        }
    },
    watch: {
        selectedUser: {
            handler() {
                this.$store.commit('chat/EMPTY_CHAT_HISTORY')
                this.getChatHistory()
            },
            immediate: true
        },
        page() {
            if (this.page !== 1) {
                this.getChatHistory()
            }
        }
    },
    computed: {
        // Utente attualmente loggato
        user() {
            return this.$store.state.auth.user
        },
        messages() {
            return this.$store.state.chat.messages
        },
        page() {
            return this.$store.state.chat.page
        }
    },
    methods: {
        getChatHistory() {
            this.$store.dispatch('chat/getChatHistory', {
                id: this.selectedUser.id,
                page: this.page
            })
        }
    }
}
</script>