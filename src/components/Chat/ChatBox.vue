<template>
    <div class="h-full relative">
        <!-- Header info -->
        <header class="py-3 px-6 border-b border-slate-200">
            <div class="w-full flex items-center space-x-3">
                <div class="w-8 h-8 rounded-full bg-slate-300"></div>
                <div>
                    <span class="font-semibold text-sm text-slate-600">{{ selectedUser.name }}</span>
                    <span class="text-slate-400 text-xs block -mt-1 max-w-max">@{{ selectedUser.username }}</span>
                </div>
            </div>
        </header>
        <!-- Feed -->
        <div
            v-chat-scroll
            class="p-4 text-sm overflow-auto"
            style="height: 432px">            
                <div
                    v-for="message in messages.data"
                    :key="message.id"
                    :class="[ message.from === user.id ? 'flex justify-end' : '' ]">
                        <div
                            :class="[ message.from === user.id ? 'bg-sky-400' : 'bg-emerald-400' ]"
                            class="text-white rounded-lg px-4 py-2 mb-2 max-w-max">
                                {{ message.body }}
                        </div>
                </div>
        </div>
        <!-- Send Message input -->
        <div class="flex items-center justify-between border-t border-slate-200 absolute bottom-0 left-0 right-0">
            <textarea
                v-model="message.body"
                @keydown.enter.prevent="sendMessage()"
                name="body"
                rows="2"
                autofocus
                placeholder="Scrivi un messaggio..."
                class="resize-none w-full placeholder-slate-300 text-sm p-4 focus:outline-none"></textarea>

                <button
                    @click="sendMessage()"
                    class="mx-4 p-2 rounded-full text-slate-400 hover:bg-sky-400 hover:text-white transition">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-send w-5 h-5 flex-none"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ChatBox',
    props: {
        selectedUser: {
            type: Object,
            required: true
        }
    },
    watch: {
        success: {
            handler() {
                if (this.success) {
                    this.$store.commit('chat/SET_SUCCESS_STATUS', false)
                    this.clearInput()
                }
            }
        },
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
    data() {
        return {
            message: {
                body: ''
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
        success() {
            return this.$store.state.chat.success
        }
    },
    methods: {
        sendMessage() {
            if (this.message.body === '') return
            this.$store.dispatch('chat/sendMessage', {
                message: this.message,
                to: this.selectedUser
            })
        },
        clearInput() {
            this.message.body = ''
        }
    }
}
</script>