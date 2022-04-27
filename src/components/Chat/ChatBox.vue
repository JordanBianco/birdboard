<template>
    <div class="h-full relative">

        <ChatBoxHeader
            :selectedUser="selectedUser"
        />        

        <MessagesFeed
            :messages="messages"
            :user="user"
        />
        
        <SendMessageTextarea
            :selectedUser="selectedUser"
        />
    </div>
</template>

<script>
import ChatBoxHeader from '@/components/Chat/ChatBoxHeader'
import MessagesFeed from '@/components/Chat/MessagesFeed'
import SendMessageTextarea from '@/components/Chat/SendMessageTextarea'

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
    watch: {
        selectedUser: {
            handler() {
                window.Echo.private('messages.' + this.user.id)
                    .listen('MessageSent', e => {
                        this.$store.commit('chat/PUSH_MESSAGE', e.message)
                    })
            },
            immediate: true
        }
    },
    computed: {
        // Utente attualmente loggato
        user() {
            return this.$store.state.auth.user
        },
        messages() {
            return this.$store.state.chat.messages
        }
    }
}
</script>