<template>
    <header class="py-5 px-6 border-b border-slate-100 dark:border-zinc-600 flex justify-between items-center">
        <div class="w-full flex items-center space-x-4">
            <UserAvatar
                :user="selectedUser"
                :classes="'w-10 h-10'"
            />

            <div>
                <router-link
                    class="block"
                    :to="{ name: 'user.show', params: { username: selectedUser.username }}">
                        {{ selectedUser.name }}
                </router-link>
                <!-- <p
                    v-if="notInFollowingList"
                    class="text-slate-400 text-sm">
                        {{ notInFollowingList }}
                </p> -->
                <p
                    v-if="isTyping && typingUser.id === selectedUser.id"
                    class="text-slate-400 text-sm">
                        sta scrivendo...
                </p>
            </div>
        </div>

        <ChatBoxActionMenu />
    </header>
</template>

<script>
import UserAvatar from '@/components/User/UserAvatar'
import ChatBoxActionMenu from '@/components/Chat/Box/ChatBoxActionMenu'

export default {
    name: 'ChatBoxHeader',
    props: {
        selectedUser: {
            type: Object,
            required: false
        },
        notInFollowingList: {
            type: String,
            required: true
        }
    },
    components: {
        UserAvatar,
        ChatBoxActionMenu
    },
    computed: {
        typingUser() {
            return this.$store.state.chat.typingUser
        },
        isTyping() {
            return this.$store.state.chat.isTyping
        },
    }
}
</script>