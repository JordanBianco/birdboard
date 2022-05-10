<template>
    <div class="grid grid-cols-12 absolute left-0 right-0 bottom-0 top-[71px]">

        <section class="col-span-3 bg-slate-50 dark:bg-zinc-800 border-r dark:border-zinc-600 border-slate-100 overflow-y-auto">
            <ChatSidebar
                :conversations="conversations"
                :authUser="authUser"
                @searchConversation="searchConversation"
            />
        </section>

        <section class="col-span-9 bg-white dark:bg-zinc-700">
            <ChatBox
                v-if="selectedUser"
                :selectedUser="selectedUser"
            />
        </section>
    </div>
</template>

<script>
import ChatSidebar from '@/components/Chat/Sidebar/ChatSidebar'
import ChatBox from '@/components/Chat/Box/ChatBox'

export default {
    name: 'Chat.index',
    components: {
        ChatSidebar,
        ChatBox
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.emptyConversations()
            vm.emptySelectedUser()
        })
    },
    beforeDestroy() {
        Echo.leave('chatpage');
        this.$store.commit('chat/REMOVE_ONLINE_USER', {user: this.authUser})
    },
    mounted() {
        let _this = this;

        this.getConversations()

        Echo.join('chatpage')
            .here((users) => {
                this.$store.commit('chat/SET_ONLINE_USERS', users)
            })
            .joining((user) => {
                this.$store.commit('chat/PUSH_ONLINE_USER', user)
            })
            .leaving((user) => {
                this.$store.commit('chat/REMOVE_ONLINE_USER', user)
            })
            .error((error) => {
                console.error(error);
            });

        Echo.private('messages.' + this.authUser.id)
            .listen('MessageSent', e => {
                this.newMessageReceived(e.message)

                if (this.selectedUser && this.selectedUser.id === e.message.from.id) {
                    this.$store.commit('chat/PUSH_MESSAGE', e.message)
                }
            })
            .listenForWhisper('typing', (e) => {
                if (this.selectedUser && e.user.id === this.selectedUser.id) {
                    this.$store.commit('chat/SET_TYPING_USER', e.user)
                    this.$store.commit('chat/IS_TYPING', e.isTyping)

                    if (this.typingClock) clearTimeout()

                    this.typingClock = setTimeout(function() {
                        _this.$store.commit('chat/IS_TYPING', false)
                        _this.$store.commit('chat/SET_TYPING_USER', [])
                    }, 2000);
                }
            })
    },
    watch: {
        search() {
            this.getConversations()
        }
    },
    data() {
        return {
            search: '',
            typingClock: null
        }
    },
    computed: {
        selectedUser() {
            return this.$store.state.chat.selectedUser
        },
        conversations() {
            return this.$store.state.chat.conversations
        },
        authUser() {
            return this.$store.state.auth.user
        }
    },
    methods: {
        searchConversation(search) {
            this.search = search
        },
        getConversations() {
            this.$store.dispatch('chat/getConversations', {
                username: this.$store.state.auth.user.username,
                search: this.search
            })
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
        emptyConversations() {
            this.$store.commit('chat/EMPTY_CONVERSATIONS')
        },
        emptySelectedUser() {
            this.$store.commit('chat/SELECT_USER', null)
        }
    }
}
</script>