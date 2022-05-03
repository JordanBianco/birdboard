<template>
    <div>
        <span class="block text-slate-400 font-semibold text-xs uppercase mb-3">Notifiche recenti</span>
        <div class="bg-white p-5 rounded-xl shadow-md shadow-slate-100 drop-shadow-xs">
            <div
                v-for="notification in notifications.slice(0, 3)"
                :key="notification.id"
                class="mb-6 last:mb-0">
                    <!-- Component dinamico in base al tipo della notifica  -->
                    <component
                        :is="notificationType(notification)"
                        :notification="notification"
                        :user="user"
                        :feed="true"
                        class="text-xs"
                    ></component>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LatestNotifications',
    props: {
        /** 10 Notifiche ne mostro solo 3 */
        notifications: {
            type: Array,
            required: true
        },
        user: {
            type: Object,
            required: true
        }
    },
    components: {
        NewReply: () => import ('@/components/Notification/NewReply'),
        NewLikeToPost: () => import ('@/components/Notification/NewLikeToPost'),
        NewLikeToReply: () => import ('@/components/Notification/NewLikeToReply'),
        // NewFollower: () => import ('@/components/Notification/NewFollower')
    },
    methods: {
        notificationType(notification) {
            return notification.type.replace("App\\Notifications\\", '')
        },
    }
}
</script>