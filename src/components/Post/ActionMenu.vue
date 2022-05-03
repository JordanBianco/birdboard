<template>
    <div
        v-if="post.user_id === user.id"
        class="relative">

            <div class="px-1 border border-slate-200 rounded-lg">
                <svg
                    id="toggleActionMenu"
                    @click="toggleActionMenu()"
                    :class="{ 'text-slate-500' : showActionMenu }"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-horizontal w-5 h-5 flex-none cursor-pointer text-slate-400 hover:text-slate-500 transition"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
            </div>

            <div
                v-if="showActionMenu"
                class="absolute top-7 right-0 bg-white rounded-xl shadow-md shadow-slate-200 drop-shadow-xs p-3 space-y-3">
                    <button
                        id="openEditPostModal"
                        @click="openEditPostModal()"
                        class="flex items-center space-x-3 text-xs whitespace-nowrap text-slate-400 hover:text-sky-400 transition">
                            <svg class="w-4.5 h-4.5 flex-none text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M21,12a1,1,0,0,0-1,1v6a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V5A1,1,0,0,1,5,4h6a1,1,0,0,0,0-2H5A3,3,0,0,0,2,5V19a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V13A1,1,0,0,0,21,12ZM6,12.76V17a1,1,0,0,0,1,1h4.24a1,1,0,0,0,.71-.29l6.92-6.93h0L21.71,8a1,1,0,0,0,0-1.42L17.47,2.29a1,1,0,0,0-1.42,0L13.23,5.12h0L6.29,12.05A1,1,0,0,0,6,12.76ZM16.76,4.41l2.83,2.83L18.17,8.66,15.34,5.83ZM8,13.17l5.93-5.93,2.83,2.83L10.83,16H8Z"/></svg>
                            <span>Modifica post</span>
                    </button>

                    <button
                        id="deletePost"
                        @click="deletePost()"
                        class="flex items-center space-x-3 text-xs whitespace-nowrap text-slate-400 hover:text-sky-400 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash w-4 h-4 flex-none text-slate-400"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                            <span>Elimina post</span>
                    </button>
            </div>
    </div>
</template>

<script>
export default {
    name: 'ActionMenu',
    props: {
        post: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            showActionMenu: false,
        }
    },
    computed: {
        user() {
            return this.$store.state.auth.user
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
        },
        deletePost() {
            this.$store.dispatch('users/deletePost', { 
                username: this.user.username,
                post: this.post,
                route: this.$route.name
            })
        },
        openEditPostModal() {
            this.toggleActionMenu()
            this.$emit('openEditPostModal')
        }
    }
}
</script>