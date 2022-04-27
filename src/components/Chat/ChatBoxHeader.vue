<template>
    <header class="py-3 px-6 border-b border-slate-200 flex justify-between items-center">
        <div class="w-full flex items-center space-x-3">
            <div class="w-8 h-8 rounded-full bg-slate-300"></div>
            <div>
                <span class="font-semibold text-sm text-slate-600">{{ selectedUser.name }}</span>
                <span class="text-slate-400 text-xs block -mt-1 max-w-max">@{{ selectedUser.username }}</span>
            </div>
        </div>

        <div class="relative">
            <svg
                @click="toggleChatActionMenu()"
                :class="{ 'text-slate-500' : showChatActions }"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-horizontal w-4.5 h-4.5 flex-none cursor-pointer text-slate-400 hover:text-slate-500 transition"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>

            <div
                v-if="showChatActions"
                class="absolute top-5 right-0 bg-white border border-slate-200 rounded-lg z-10 py-2">
                    <button
                        class="p-3 py-1 flex items-center space-x-1 text-xs whitespace-nowrap text-slate-400 hover:text-slate-500 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash w-4 h-4 flex-none"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                            <span>Elimina Chat</span>
                    </button>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: 'ChatBoxHeader',
    props: {
        selectedUser: {
            type: Object,
            required: false
        }
    },
    created: function() {
        let self = this;

        window.addEventListener('click', function(e){
            if (!self.$el.contains(e.target)){
                self.showChatActions = false
            } 
        })
    },
    data() {
        return {
            showChatActions: false
        }
    },
    methods: {
        toggleChatActionMenu() {
            this.showChatActions = ! this.showChatActions
        }
    }
}
</script>