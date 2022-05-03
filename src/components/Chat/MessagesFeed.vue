<template>
    <div
        v-chat-scroll="{ always: false }"
        @v-chat-scroll-top-reached="loadMoreMessages()"
        class="p-4 text-sm overflow-auto"
        style="height: 432px">

            <div
                v-for="message in messages"
                :key="message.id"
                :class="[ message.from === user.id ? 'flex justify-end' : '' ]">
                    <div class="relative mb-5">
                        <div
                            :class="[ message.from === user.id ? '-right-2 bg-sky-400' : '-left-2 bg-emerald-400 transform rotate-90' ]"
                            class="triangle w-4 h-4 absolute"></div>

                        <div
                            :class="[ message.from === user.id ? 'bg-sky-400' : 'bg-emerald-400' ]"
                            class="text-white rounded-lg px-4 py-2 mb-2 max-w-max">
                                {{ message.body }}
                        </div>

                        <div
                            :class="[ message.from === user.id ? 'absolute right-0' : '' ]"
                            class="flex items-center space-x-1 -mt-2 ">
                                <p
                                    style="font-size: 11px"
                                    class="text-slate-400 whitespace-nowrap">{{ $moment(message.created_at).format('DD MMMM YYYY H:mm') }}</p>

                            <div
                                v-if="message.from === user.id"
                                :class="[ message.read ? 'text-sky-400' : 'text-slate-300' ]">
                                    <svg class="w-5 h-5 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M18.71,7.21a1,1,0,0,0-1.42,0L9.84,14.67,6.71,11.53A1,1,0,1,0,5.29,13l3.84,3.84a1,1,0,0,0,1.42,0l8.16-8.16A1,1,0,0,0,18.71,7.21Z"/></svg>
                            </div>
                        </div>
                    </div>
            </div>
    </div>
</template>

<script>
export default {
    name: 'MessagesFeed',
    props: {
        messages: {
            type: [Object, Array],
            required: true
        },
        user: {
            type: Object,
            required: true
        }
    },
    computed: {
        page() {
            return this.$store.state.chat.page
        },
        lastPage() {
            return this.$store.state.chat.lastPage
        }
    },
    methods: {
        loadMoreMessages() {
            if (this.page >= this.lastPage) return
            this.$store.commit('chat/NEXT_PAGE')
        }
    }
}
</script>

<style scoped>
    .triangle {
        clip-path: polygon(0 0, 0 100%, 100% 0);
    }
</style>
