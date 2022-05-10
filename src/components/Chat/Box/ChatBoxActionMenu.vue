<template>
    <div class="relative z-20">

        <div class="px-1 border border-slate-200 dark:border-zinc-600 rounded-lg">
            <svg
                id="toggleActionMenu"
                @click="toggleActionMenu()"
                :class="{ 'text-slate-500' : showActionMenu }"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-horizontal w-5 h-5 flex-none cursor-pointer text-slate-400 hover:text-slate-500 transition"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
        </div>

        <div
            v-if="showActionMenu"
            class="absolute top-7 right-0 bg-white dark:bg-zinc-700 rounded-xl shadow-md shadow-slate-200 dark:shadow-zinc-800 drop-shadow-xs p-3 space-y-3">
                <button
                    id="deletePost"
                    class="flex items-center space-x-3 text-xs whitespace-nowrap text-slate-400 hover:text-sky-400 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash w-4 h-4 flex-none text-slate-400"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                        <span>Elimina Chat</span>
                </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ChatBoxActionMenu',
    data() {
        return {
            showActionMenu: false
        }
    },
    methods: {
        toggleActionMenu() {
            let self = this;

            window.addEventListener('click', function(e){
                if (!self.$el.contains(e.target)){
                    self.showActionMenu = false
                } 
            })

            this.showActionMenu = ! this.showActionMenu
        }
    }
}
</script>