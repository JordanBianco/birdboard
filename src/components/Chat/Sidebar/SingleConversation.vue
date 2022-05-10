<template>
    <div>
        <div class="flex items-center justify-between cursor-pointer mb-3">
            
                <!-- Io ho iniziato la conversazione e ho bisogno del to -->
                <div
                    v-if="conversation.from.id === authUser.id"
                    class="w-full flex items-center justify-between dark:hover:text-slate-100 hover:text-slate-600"
                    :class="[ selectedUser != null && selectedUser.id === conversation.to.id ? 'dark:text-slate-100 hover:text-slate-600' : 'text-slate-400' ]"
                    @click="selectUser(conversation.to)">
                        <div class="flex items-center space-x-3">
                            <div class="relative w-8 h-8 flex-none">
                                <UserAvatar
                                    :user="conversation.to"
                                />

                                <div
                                    v-if="isOnline(conversation.to)"
                                    class="w-2.5 h-2.5 border dark:border-zinc-800 border-slate-100 m-0 bg-green-500 rounded-full absolute -bottom-0.5 -right-0.5"></div>
                                <div
                                    v-else
                                    class="w-2.5 h-2.5 border dark:border-zinc-800 border-slate-100 m-0 bg-red-500 rounded-full absolute -bottom-0.5 -right-0.5"></div>
                            </div>
                            
                            <span class="text-sm">{{ conversation.to.name }}</span>
                        </div>

                        <div
                            v-if="conversation.my_unread_messages && conversation.my_unread_messages.length != 0"
                            class="w-4.5 h-4.5 flex-none flex items-center justify-center text-center text-white text-xs rounded-full bg-sky-400">
                                {{ conversation.my_unread_messages.length }}
                        </div>
                </div>

                <!-- altrimenti se ho ricevuto un messaggio prendo il from -->
                <div
                    v-else
                    class="w-full flex items-center justify-between dark:hover:text-slate-100 hover:text-slate-600"
                    :class="[ selectedUser != null && selectedUser.id === conversation.from.id ? 'dark:text-slate-100 hover:text-slate-600' : 'text-slate-400' ]"
                    @click="selectUser(conversation.from)">
                        <div class="flex items-center space-x-3">
                            <div class="relative w-8 h-8 flex-none">
                                <UserAvatar
                                    :user="conversation.from"
                                />

                                <div
                                    v-if="isOnline(conversation.from)"
                                    class="w-2.5 h-2.5 border dark:border-zinc-800 border-slate-100 m-0 bg-green-500 rounded-full absolute -bottom-0.5 -right-0.5"></div>
                                <div
                                    v-else
                                    class="w-2.5 h-2.5 border dark:border-zinc-800 border-slate-100 m-0 bg-red-500 rounded-full absolute -bottom-0.5 -right-0.5"></div>
                            </div>
                            
                            <span class="text-sm">{{ conversation.from.name }}</span>
                        </div>

                        <div
                            v-if="conversation.my_unread_messages && conversation.my_unread_messages.length != 0"
                            class="w-4.5 h-4.5 flex-none flex items-center justify-center text-center text-white text-xs rounded-full bg-sky-400">
                                {{ conversation.my_unread_messages.length }}
                        </div>
                </div>
        </div>
    </div>
</template>

<script>
import UserAvatar from '@/components/User/UserAvatar'

export default {
    props: {
        conversation: {
            type: Object,
            required: true
        },
        authUser: {
            type: Object,
            required: true
        }
    },
    components: {
        UserAvatar,
    },
    computed: {
        selectedUser() {
            return this.$store.state.chat.selectedUser
        },
        onlineUsers() {
            return this.$store.state.chat.onlineUsers
        },
    },
    methods: {
        selectUser(user) {
            if (this.selectedUser === user) return
            this.$store.commit('chat/EMPTY_CHAT_HISTORY')
            this.$store.commit('chat/RESET_PAGE')

            this.readAllUnreadMessages(user)

            this.$store.commit('chat/SELECT_USER', user)
        },
        readAllUnreadMessages(user) {
            this.$store.dispatch('chat/readAllUnreadMessages', {
                user: user
            })
        },
        isOnline(user) {
            return this.onlineUsers.find(u => {
                return user.id === u.id
            })
        }
    }
}
</script>