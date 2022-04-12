<template>
    <div class="flex items-center space-x-2">
        <div
            :class="[ notification.read_at === null ? 'bg-sky-400' : '' ]"
            class="w-1.5 h-1.5 rounded-full"></div>
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
            <span class="block text-slate-400 mt-0.5">{{ $moment(notification.created_at).format('HH:mm ' + '&bull;' + ' DD MMMM YYYY') }}</span>
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
            // this.$store.dispatch('notification/markAsRead', { notification_id: this.notification.id })
            this.$emit('closeNotificationMenu')
        }
    }
}
</script>