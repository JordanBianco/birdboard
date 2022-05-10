<template>
    <div class="relative">
        <svg
            @click="toggleNotificationsActionMenu()"
            :class="{ 'text-slate-500' : showNotificationsActionMenu }"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-horizontal w-4.5 h-4.5 flex-none cursor-pointer text-slate-400 hover:text-slate-500 transition"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>

        <div
            v-if="showNotificationsActionMenu"
            class="absolute top-5 right-0 bg-white dark:bg-zinc-700 shadow-md shadow-slate-200 dark:shadow-zinc-800 drop-shadow-xs rounded-xl z-10 p-3 space-y-3">
                <button
                    v-if="unreadNotifications != 0"
                    @click="markAllAsRead()"
                    class="flex items-center space-x-3 text-xs whitespace-nowrap text-slate-400 hover:text-sky-400 transition">
                        <svg class="w-4 h-4 flex-none text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                        <span>Segna tutte come lette</span>
                </button>
                <button
                    @click="deleteAll()"
                    class="flex items-center space-x-3 text-xs whitespace-nowrap text-slate-400 hover:text-sky-400 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash w-4 h-4 flex-none text-slate-400"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                        <span>Cancella tutte le notifiche</span>
                </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NotificationsActionMenu',
    props: {
        unreadNotifications: {
            type: Number,
            required: true
        },
        user: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            showNotificationsActionMenu: false
        }
    },
    methods: {
        toggleNotificationsActionMenu() {
            let self = this;

            window.addEventListener('click', function(e){
                if (!self.$el.contains(e.target)){
                    self.showNotificationsActionMenu = false
                } 
            })
            
            this.showNotificationsActionMenu = ! this.showNotificationsActionMenu
        },
        markAllAsRead() {
            this.$store.dispatch('notification/markAllAsRead', {
                user: this.user
            })
        },
        deleteAll() {
            this.$store.dispatch('notification/deleteAll', {
                user: this.user
            })
        }
    }
}
</script>