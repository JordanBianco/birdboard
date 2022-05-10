<template>
    <div
        v-if="popupNotifications.length != 0"
        class="fixed top-24 right-6 z-10">
            <div
                v-for="notification in popupNotifications"
                :key="notification.id"
                class="bg-white dark:bg-zinc-700 shadow-md shadow-slate-200 dark:shadow-zinc-800 drop-shadow-xs rounded-xl p-4">
                    <component
                        :is="notificationType(notification)"
                        :notification="notification"
                    ></component>
            </div>
    </div>
</template>

<script>
export default {
    name: 'PopupNotification',
    components: {
        NewReplyPopup: () => import ('@/components/Notification/PopupsNotifications/NewReplyPopup'),
        NewLikeToPostPopup: () => import ('@/components/Notification/PopupsNotifications/NewLikeToPostPopup'),
        NewLikeToReplyPopup: () => import ('@/components/Notification/PopupsNotifications/NewLikeToReplyPopup'),
        // NewFollower: () => import ('@/components/Notification/NewFollower')
    },
    computed: {
        popupNotifications() {
			return this.$store.state.notification.popupNotifications
		}
    },
    methods: {
        notificationType(notification) {
            return notification.type.replace("App\\Notifications\\", '') + 'Popup'             
        }
    }    
}
</script>