<template>
    <div class="relative">

        <div class="flex items-center space-x-2">
            <div v-if="notification.read_at === null" class="w-2 h-2 rounded-full bg-sky-400"></div>
            <div class="px-1 border border-slate-200 dark:border-zinc-600 rounded-lg">
                <svg
                    @click="toggleNotificationActionMenu()"
                    :class="{ 'text-slate-500' : showNotificationActionMenu }"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-horizontal w-4.5 h-4.5 flex-none cursor-pointer text-slate-400 hover:text-slate-500 transition"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
            </div>
        </div>

        <div
            v-if="showNotificationActionMenu"
            class="absolute top-7 right-0 rounded-xl shadow-md drop-shadow-xs p-3 space-y-3 bg-white shadow-slate-200 dark:bg-zinc-700 dark:shadow-zinc-800">
                <button
                    v-if="notification.read_at === null"
                    @click="markAsRead()"
                    class="flex items-center space-x-3 text-xs whitespace-nowrap text-slate-400 hover:text-sky-400 transition">
                        <svg class="w-4 h-4 flex-none text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                        <span>Segna come letta</span>
                </button>
                <button
                    @click="deleteNotification()"
                    class="flex items-center space-x-3 text-xs whitespace-nowrap text-slate-400 hover:text-sky-400 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash w-4 h-4 flex-none text-slate-400"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
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
            type: Object,
            required: true
        }
    },
    data() {
        return {
            showNotificationActionMenu: false
        }
    },
    methods: {
        toggleNotificationActionMenu() {
            let self = this;

            window.addEventListener('click', function(e){
                if (!self.$el.contains(e.target)){
                    self.showNotificationActionMenu = false
                } 
            })
            
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