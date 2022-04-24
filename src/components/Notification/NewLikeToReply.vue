<template>
    <div class="flex items-start space-x-4">
        <div class="flex items-center space-x-3 w-full">
            
            <svg
                :class="[ notification.read_at === null ? 'text-sky-400' : 'text-slate-400' ]"
                class="w-4.5 h-4.5 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M20.16,5A6.29,6.29,0,0,0,12,4.36a6.27,6.27,0,0,0-8.16,9.48l6.21,6.22a2.78,2.78,0,0,0,3.9,0l6.21-6.22A6.27,6.27,0,0,0,20.16,5Zm-1.41,7.46-6.21,6.21a.76.76,0,0,1-1.08,0L5.25,12.43a4.29,4.29,0,0,1,0-6,4.27,4.27,0,0,1,6,0,1,1,0,0,0,1.42,0,4.27,4.27,0,0,1,6,0A4.29,4.29,0,0,1,18.75,12.43Z"/></svg>

            <div>
                <span style="font-size: 11px" class="block text-slate-400 mt-0.5">{{ $moment(notification.created_at).format('HH:mm ' + '&bull;' + ' DD MMMM YYYY') }}</span>
                <span class="block text-sm text-slate-600">Nuovo Mi piace</span>
                <router-link
                    class="block text-slate-400"
                    @click.native="markAsRead()"
                    :to="{ 
                        name: 'post.show',
                        params: {
                            username: notification.data.reply.user.username,
                            id: notification.data.reply.replyable_id
                        },
                        hash: '#' + notification.data.reply.id
                    }"
                >
                    {{ notification.data.user.name }} ha messo mi piace al tuo commento
                </router-link>
            </div>
        </div>

        <!-- Non mostro azioni se mi trovo nel mini dropdown -->
        <NotificationActionMenu
            v-if="!dropdown"
            :user="user"
            :notification="notification"
        />
    </div>
</template>

<script>
import NotificationActionMenu from '@/components/Notification/NotificationActionMenu'

export default {
    name: 'NewLikeToReply',
    components: {
        NotificationActionMenu
    },
    props: {
        notification: {
            type: [Object, Array],
            required: true
        },
        user: {
            type: [Object, Array],
            required: true
        },
        dropdown: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        markAsRead() {
            this.$store.dispatch('notification/markAsRead', { 
                user: this.user,
                notification_id: this.notification.id    
            })
            this.$emit('closeNotificationMenu')
        }
    }
}
</script>