<template>
    <div>
        <section class="max-w-md mx-auto space-y-8 py-10">
            <header class="flex items-center justify-between">
                <h3 class="text-lg text-slate-600">Notifiche <small>({{ total }})</small></h3>
                <NotificationsActionMenu
                    v-if="notifications && notifications.length != 0"
                    :unreadNotifications="unreadNotifications"
                    :user="user"
                />
            </header>
            
            <div v-if="notifications && notifications.length != 0">
                <div
                    v-for="notification in notifications"
                    :key="notification.id"
                    class="border border-t-0 first:border-t first:rounded-t-lg"
                    :class="[ notification.read_at === null ? 'bg-slate-100' : '' ]">
                        <component
                            :is="notificationType(notification)"
                            :notification="notification"
                            :user="user"
                            :dropdown="false"
                            class="p-4 text-sm"
                        ></component>
                </div>

                <div
                    v-observe-visibility="visibilityChanged"
                    :class="{ 'flex justify-center py-3' : loading }">
                        <svg v-if="loading" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-loader animate-spin text-slate-300 w-6 h-6"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
                </div>
            </div>
            <div v-else>
                <p class="text-sm text-slate-500">Non hai nuove notifiche</p>
            </div>
        </section>
    </div>
</template>

<script>
import NotificationsActionMenu from '@/components/Notification/NotificationsActionMenu'

export default {
    name: 'Notification.index',
    components: {
        NotificationsActionMenu,
        NewReply: () => import ('@/components/Notification/NewReply'),
        NewLikeToPost: () => import ('@/components/Notification/NewLikeToPost'),
        NewLikeToReply: () => import ('@/components/Notification/NewLikeToReply'),
        NewFollower: () => import ('@/components/Notification/NewFollower')
    },
    mounted() {
        this.getNotifications()
    },
    beforeRouteLeave(to, from, next) {
        this.emptyNotifications()
        next()
    },
    data() {
        return {
            page: 1,
            loading: false
        }
    },
    computed: {
        user() {
            return this.$store.state.auth.user
        },
        notifications() {
            return this.$store.state.notification.notifications
        },
        unreadNotifications() {
            return this.$store.state.notification.notifications.filter(n => {
                return n.read_at === null
            }).length
        },
        lastPage() {
            return this.$store.state.notification.lastPage
        },
        total() {
            return this.$store.state.notification.total
        }
    },
    methods: {
        getNotifications() {
            this.$store.dispatch('notification/getNotifications', {
                id: this.user.id,
                page: this.page
            })
        },
        notificationType(n) {
            return n.type.replace("App\\Notifications\\", '')
        },
        visibilityChanged(isVisible) {
            if (! isVisible) { return }
            if (this.page >= this.lastPage) { 
                this.loading = false
                return
            } else {
                this.loading = true
            }
            this.page = this.page + 1
            this.getNotifications()
        },
        emptyNotifications() {
            this.$store.commit('notification/EMPTY_NOTIFICATIONS')
        }
    }
}
</script>