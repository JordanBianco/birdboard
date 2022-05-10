<template>
    <div>
        <div
            v-if="dataPost"
            class="bg-white dark:bg-zinc-700 p-5 rounded-xl shadow-md shadow-slate-200 dark:shadow-zinc-900 drop-shadow-xs flex items-start mb-5"> 
                <UserAvatar
                    :user="dataPost.user"
                    :classes="'w-12 h-12'"
                />

                <div class="w-full flex items-start justify-between ml-4">
                    <section class="w-full">
                        <div>
                            <span class="font-semibold text-sm block -mb-1">{{ dataPost.user.name }}</span>
                            <span class="text-slate-400 text-xs">{{ $moment(dataPost.created_at).fromNow() }}</span>
                        </div>

                        <router-link
                            class="py-4 block text-sm"
                            :to="{ name: 'post.show', params: { username: dataPost.user.username, id: dataPost.id } }">
                                {{ dataPost.body }}
                        </router-link>
                        
                        <footer class="flex items-center space-x-4 text-slate-400">
                            <TogglePostLike
                                :post="dataPost"
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

                    <PostActionMenu
                        :post="dataPost"
                        @openEditPostModal="openEditPostModal"
                    />
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
import UserAvatar from '@/components/User/UserAvatar'
import EditPostModal from '@/components/Post/EditPostModal'
import PostActionMenu from '@/components/Post/PostActionMenu'
import TogglePostLike from '@/components/Like/TogglePostLike'

export default {
    name: 'SinglePost',
    components: {
        UserAvatar,
        EditPostModal,
        PostActionMenu,
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
    data() {
        return {
            showEditPostModal: false,
            postCopy: {},
            // Aggiunto per risolvere errore di modificare una prop direttamente
            dataPost: this.post
        }
    },
    methods: {
        openEditPostModal() {
            // Copio l'oggetto in caso l'utente annulli la modifica, cosi da riportare l'oggetto allo stato iniziale
            Object.keys(this.dataPost).forEach((key) => {
                this.$set(this.postCopy, key, this.dataPost[key]);
            })
            
            this.showEditPostModal = true
        },
        cancelEdit() {
            this.showEditPostModal = false
        },
        updatePostValues(post) {
            this.showEditPostModal = false
            this.dataPost = post
            this.postCopy = {}
        }
    }
}
</script>