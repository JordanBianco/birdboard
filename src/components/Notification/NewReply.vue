<template>
    <div class="flex items-center space-x-2">
        <div v-if="notification.read_at === null" class="bg-sky-400 w-1 h-1 rounded-full"></div>
        <div>
            <router-link
                class="block"
                @click.native="markAsRead()"
                :to="{ name: 'post.show', params: {
                    username: notification.data.post.user.username,
                    id: notification.data.post.id
                }}"
            >
                {{ notification.data.reply.user.name }} ha commentato il tuo post
            </router-link>
            <span class="block text-slate-400 mt-0.5">{{ $moment(notification.created_at).format('HH:mm DD MM YYYY') }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NewReply',
    props: {
        notification: {
            type: [Object, Array],
            required: true
        }
    },
    methods: {
        markAsRead() {
            // mando request notifica letta
            this.$emit('closeNotificationMenu')
        }
    }
}
</script>