<template>
    <div
        v-chat-scroll
        class="p-4 text-sm overflow-auto"
        style="height: 432px">
            <div
                v-for="message in messages.data"
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
                        <p
                            style="font-size: 11px"
                            :class="[ message.from === user.id ? 'absolute right-0' : '' ]"
                            class="text-slate-400 -mt-2 whitespace-nowrap">{{ $moment(message.created_at).format('DD MMMM YYYY H:mm') }}</p>
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
    }
}
</script>

<style scoped>
    .triangle {
        clip-path: polygon(0 0, 0 100%, 100% 0);
    }
</style>
