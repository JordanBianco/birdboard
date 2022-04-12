<template>
    <div class="relative">

        <div class="relative">
            <svg
                @click="toggleNotificationMenu()"
                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bell text-slate-400 w-6 h-6 flex-none cursor-pointer"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
        
            <div
                v-if="unreadNotifications"
                style="font-size: 11px"
                class="absolute -top-1.5 -right-0.5 w-3.5 h-3.5 border-2 border-white bg-red-500 rounded-full"></div>
        </div>

        <div
            v-if="showNotificationMenu"
            class="absolute top-12 right-0 w-64 bg-white border border-slate-200 rounded-lg z-20">
                <header class="border-b border-slate-200 p-3">
                    <span class="block font-semibold">Notifiche</span>
                    <router-link
                        to=""
                        class="text-xs block text-slate-400 -mt-0.5 hover:underline transition">visualizza tutte</router-link>
                </header>
                <div v-if="lastNotifications.length != 0">
                    <div
                        v-for="notification in lastNotifications"
                        :key="notification.id"
                        class="border-b last:border-0 p-3 text-xs text-slate-600">
                            <component
                                :is="notificationType(notification)"
                                :notification="notification"
                                @closeNotificationMenu="closeNotificationMenu"></component>
                    </div>
                </div>
                <div v-else>
                    <p class="p-3 text-sm text-slate-600">Non hai nuove notifiche</p>
                </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NotificationComponent',
    components: {
        NewReply: () => import ('@/components/Notification/NewReply'),
    },
    props: {
        user: {
            type: Object,
            required: true
        }
    },
    mounted() {
        this.$store.dispatch('notification/getLastNotifications', { id: this.user.id })
    },
    created: function() {
        let self = this;

        window.addEventListener('click', function(e){
            if (!self.$el.contains(e.target)){
                self.showNotificationMenu = false
            } 
        })
    },
    data() {
        return {
            showNotificationMenu: false
        }
    },
    computed: {
        lastNotifications() {
            return this.$store.state.notification.lastNotifications
        },
        unreadNotifications() {
            return this.lastNotifications.filter(n => {
                return n.read_at === null
            }).length
        }
    },
    methods: {
        toggleNotificationMenu() {
            this.showNotificationMenu = ! this.showNotificationMenu
        },
        notificationType(n) {
            return n.type.replace("App\\Notifications\\", '')
        },
        closeNotificationMenu() {
            this.showNotificationMenu = false
        }
    }
}
</script>