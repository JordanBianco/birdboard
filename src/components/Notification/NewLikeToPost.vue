<template>
    <div class="flex items-start space-x-4">
        <UserAvatar
            :user="notification.data.user"
            :classes="'w-9 h-9'"
        />

        <div class="flex items-start justify-between space-x-6 w-full">
            <div>
                <span class="font-semibold block">Nuovo mi piace</span>
                
                <span class="text-slate-400 block my-1">{{ notification.data.user.name }} ha messo mi piace al tuo
                    <router-link
                        class="text-sky-400"
                        @click.native="markAsRead()"
                        :to="{ 
                            name: 'post.show',
                            params: {
                                username: notification.data.post.user.username,
                                id: notification.data.post.id
                            }
                        }"
                    >
                        post
                    </router-link>
                </span>

                <div class="text-xxs text-slate-400">
                    {{ $moment(notification.created_at).fromNow() }}
                </div>
            </div>
        </div>

        <NotificationActionMenu
            v-if="!feed"
            :user="user"
            :notification="notification"
        />
    </div>
</template>

<script>
import UserAvatar from '@/components/User/UserAvatar'
import NotificationActionMenu from '@/components/Notification/NotificationActionMenu'

export default {
    name: 'NewLikeToPost',
    components: {
        UserAvatar,
        NotificationActionMenu
    },
    props: {
        notification: {
            type: Object,
            required: true
        },
        user: {
            type: Object,
            required: true
        },
        feed: {
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