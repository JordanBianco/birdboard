<template>
    <div
        v-if="post"
        class="text-sm bg-white border-t border-l border-r last:border-b border-slate-200 first:rounded-t-lg last:rounded-b-lg p-3 flex items-start space-x-3">
            <div>
                <div class="bg-slate-200 rounded-full w-9 h-9"></div>
            </div>
            <div class="w-full flex items-start justify-between">
                <section class="w-full">
                    <span class="font-semibold text-slate-700 mr-2">{{ post.user.name }}</span>
                    <span class="text-slate-400">@{{ post.user.username }}</span>
                    <span class="text-slate-400 mx-1">&bull;</span>
                    <span class="text-slate-400">{{ post.created_at }}</span>

                    <p class="py-3">{{ post.body }}</p>
                    
                    <footer class="border-t border-slate-100 pt-2 flex items-center space-x-4 text-slate-400">
                        <div class="flex space-x-1 items-center">
                            <svg class="w-5 h-5 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M20.16,5A6.29,6.29,0,0,0,12,4.36a6.27,6.27,0,0,0-8.16,9.48l6.21,6.22a2.78,2.78,0,0,0,3.9,0l6.21-6.22A6.27,6.27,0,0,0,20.16,5Zm-1.41,7.46-6.21,6.21a.76.76,0,0,1-1.08,0L5.25,12.43a4.29,4.29,0,0,1,0-6,4.27,4.27,0,0,1,6,0,1,1,0,0,0,1.42,0,4.27,4.27,0,0,1,6,0A4.29,4.29,0,0,1,18.75,12.43Z"/></svg>
                            <span class="text-xs">2.100</span>
                        </div>
                        
                        <div class="flex space-x-1 items-center">
                            <router-link
                                :to="{ name: 'post.show', params: { id: post.id }}">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-circle w-5 h-5 flex-none"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                            </router-link>
                            <span class="text-xs">12</span>
                        </div>
                    </footer>
                </section>

                <div v-if="user && post.user_id === user.id" class="relative">
                    <svg
                        id="toggleMenu"
                        @click="toggleMenu()"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical w-5 h-5 flex-none text-slate-400 cursor-pointer"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                
                    <div
                        v-if="showMenu"
                        class="absolute right-0 bg-white border border-slate-200 rounded-lg">
                            <router-link
                                :to="{ name: 'dashboard.post.edit', params: { id: post.id }}"
                                @click.native="toggleMenu()"
                                class="block p-3">
                                    Modifica
                            </router-link>
                            <button
                                id="deletePost"
                                @click="deletePost()"
                                class="border-t border-slate-200 p-3 w-full">
                                    Elimina
                            </button>
                    </div>
                </div>
            </div>
    </div>
</template>

<script>
export default {
    name: 'SinglePost',
    props: {
        post: {
            type: Object,
            required: true
        }
    },
    created: function() {
        let self = this;

        window.addEventListener('click', function(e){
            if (!self.$el.contains(e.target)){
                self.showMenu = false
            } 
        })
    },
    data() {
        return {
            showMenu: false
        }
    },
    computed: {
        user() {
            return this.$store.state.auth.user
        }
    },
    methods: {
        toggleMenu() {
            this.showMenu = ! this.showMenu
        },
        deletePost() {
            this.$store.dispatch('user/deletePost', { post: this.post })
        }
    }
}
</script>