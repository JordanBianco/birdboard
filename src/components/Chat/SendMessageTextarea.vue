<template>
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
</template>

<script>
export default {
    name: 'SendMessageTextarea',
    props: {
        selectedUser: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            message: {
                body: ''
            }
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
    },
    computed: {
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