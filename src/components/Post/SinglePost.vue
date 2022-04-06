<template>
    <div
        v-if="dataPost"
        :class="{ 'border-b rounded-b-lg' : $route.name === 'post.show' }"
        class="text-sm bg-white border-t border-l border-r last:border-b border-slate-200 first:rounded-t-lg last:rounded-b-lg p-3 flex items-start space-x-3">
            <div>
                <div class="bg-slate-200 rounded-full w-9 h-9"></div>
            </div>
            <div class="w-full flex items-start justify-between">
                <section class="w-full">
                    <div>
                        <span class="font-semibold text-slate-700 mr-2">{{ dataPost.user.name }}</span>
                    
                        <router-link
                            :to="{ name: 'user.show', params: { username: dataPost.user.username } }"
                            class="text-slate-400 block -mt-0.5 max-w-max">
                                @{{ dataPost.user.username }}
                        </router-link>
                    </div>

                    <p class="py-3">{{ dataPost.body }}</p>

                    <div class="mb-2">
                        <span class="text-slate-400">{{ $moment(dataPost.created_at).format('HH:mm') }}</span>
                        <span class="text-slate-300 mx-1">&bull;</span>
                        <span class="text-slate-400">{{ $moment(dataPost.created_at).format('DD MMMM YYYY') }}</span>
                    </div>
                    
                    <footer class="border-t border-slate-100 pt-2 flex items-center space-x-4 text-slate-400">
                        <TogglePostLike
                            :post="dataPost"
                            :user="user"
                        />

                        <div class="flex space-x-1 items-center">
                            <router-link
                                :to="{ name: 'post.show', params: { username: dataPost.user.username, id: dataPost.id } }">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-circle w-5 h-5 flex-none"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                            </router-link>
                            <span class="text-xs">{{ replies_count }}</span>
                        </div>
                    </footer>
                </section>

                <div v-if="user && dataPost.user_id === user.id" class="relative">
                    <svg
                        id="toggleActionMenu"
                        @click="toggleActionMenu()"
                        :class="{ 'text-slate-500' : showActionMenu }"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-horizontal w-5 h-5 flex-none cursor-pointer text-slate-400 hover:text-slate-500 transition"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                
                    <div
                        v-if="showActionMenu"
                        class="absolute right-0 bg-white border border-slate-200 rounded-lg">
                            <button
                                id="openEditPostModal"
                                @click="openEditPostModal()"
                                class="p-3">
                                    Modifica
                            </button>
                            <button
                                id="deletePost"
                                @click="deletePost()"
                                class="border-t border-slate-200 p-3 w-full">
                                    Elimina
                            </button>
                    </div>
                </div>
            </div>

            <EditPostModal
                v-if="showEditPostModal"
                :postCopy="postCopy"
                @cancelEdit="cancelEdit"
                @updatePostValues="updatePostValues"
            />
    </div>
</template>

<script>
import EditPostModal from '@/components/Post/EditPostModal'
import TogglePostLike from '@/components/Like/TogglePostLike'

export default {
    name: 'SinglePost',
    components: {
        EditPostModal,
        TogglePostLike
    },
    props: {
        post: {
            type: Object,
            required: true
        },
        replies_count: {
            type: Number,
            required: true
        }
    },
    created: function() {
        let self = this;

        window.addEventListener('click', function(e){
            if (!self.$el.contains(e.target)){
                self.showActionMenu = false
            } 
        })
    },
    data() {
        return {
            showActionMenu: false,
            showEditPostModal: false,
            postCopy: {},
            // Aggiunto per risolvere errore di modificare una prop direttamente
            dataPost: this.post
        }
    },
    computed: {
        user() {
            return this.$store.state.auth.user
        }
    },
    methods: {
        toggleActionMenu() {
            this.showActionMenu = ! this.showActionMenu
        },
        openEditPostModal() {
            // Copio l'oggetto in caso l'utente annulli la modifica, cosi da riportare l'oggetto allo stato iniziale
            Object.keys(this.dataPost).forEach((key) => {
                this.$set(this.postCopy, key, this.dataPost[key]);
            })
            
            this.toggleActionMenu()
            this.showEditPostModal = true
        },
        cancelEdit() {
            this.showEditPostModal = false
        },
        deletePost() {
            this.$store.dispatch('users/deletePost', { 
                username: this.user.username,
                post: this.dataPost
            })
        },
        updatePostValues(post) {
            this.showEditPostModal = false
            this.dataPost = post
            this.postCopy = {}
        }
    }
}
</script>