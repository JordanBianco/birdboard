<template>
    <div class="flex items-start space-x-4">
        <div class="flex items-center space-x-3 w-full">

            <svg
                :class="[ notification.read_at === null ? 'text-sky-400' : 'text-slate-400' ]"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user-plus w-4.5 h-4.5 flex-none"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>

            <div>
                <span style="font-size: 11px" class="block text-slate-400 mt-0.5">{{ $moment(notification.created_at).format('HH:mm ' + '&bull;' + ' DD MMMM YYYY') }}</span>
                <span class="block text-sm text-slate-600">Nuovo follower</span>
                <router-link
                    class="block text-slate-400"
                    @click.native="markAsRead()"
                    :to="{
                        name: 'user.show',
                        params: { username: notification.data.user.username }
                    }"
                >
                    {{ notification.data.user.name }} ha iniziato a seguirti
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
    name: 'NewFollower',
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