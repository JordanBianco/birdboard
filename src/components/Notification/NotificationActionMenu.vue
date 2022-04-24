<template>
    <div class="relative">
        <svg
            @click="toggleNotificationActionMenu()"
            :class="{ 'text-slate-500' : showNotificationActionMenu }"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-horizontal w-4.5 h-4.5 flex-none cursor-pointer text-slate-400 hover:text-slate-500 transition"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>

        <div
            v-if="showNotificationActionMenu"
            class="absolute top-5 right-0 bg-white border border-slate-200 rounded-lg z-10">
                <button
                    v-if="notification.read_at === null"
                    @click="markAsRead()"
                    class="px-3 py-2 flex items-center space-x-2 text-xs whitespace-nowrap text-slate-400">
                        <svg class="w-4 h-4 flex-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                        <span>Segna come letta</span>
                </button>
                <button
                    @click="deleteNotification()"
                    class="px-3 py-2 flex items-center space-x-2 text-xs whitespace-nowrap text-slate-400">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash w-4 h-4 flex-none"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                        <span>Elimina</span>
                </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NotificationActionMenu',
    props: {
        notification: {
            type: [Object, Array],
            required: true
        },
        user: {
            type: [Object, Array],
            required: true
        }
    },
    created: function() {
        let self = this;

        window.addEventListener('click', function(e){
            if (!self.$el.contains(e.target)){
                self.showNotificationActionMenu = false
            } 
        })
    },
    data() {
        return {
            showNotificationActionMenu: false
        }
    },
    methods: {
        toggleNotificationActionMenu() {
            this.showNotificationActionMenu = ! this.showNotificationActionMenu
        },
        markAsRead() {
            this.showNotificationActionMenu = false
            
            this.$store.dispatch('notification/markAsRead', { 
                user: this.user,
                notification_id: this.notification.id
            })
        },
        deleteNotification() {
            this.showNotificationActionMenu = false

            this.$store.dispatch('notification/deleteNotification', { 
                user: this.user,
                notification_id: this.notification.id
            })
        }
    }
}
</script>