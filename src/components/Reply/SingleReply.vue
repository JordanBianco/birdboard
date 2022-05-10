<template>
    <div>
        <div
            v-if="dataReply"
            :class="{ 'border border-sky-300' : $route.hash.replace('#', '') == dataReply.id }"
            class="bg-white dark:bg-zinc-700 p-5 rounded-xl shadow-md shadow-slate-200 dark:shadow-zinc-900 drop-shadow-xs flex items-start mb-5"> 
                <UserAvatar
                    :user="dataReply.user"
                    :classes="'w-9 h-9'"
                />

                <div class="w-full flex items-start justify-between ml-4">
                    <section class="w-full">
                        <div>
                            <span class="font-semibold text-sm block -mb-1">{{ dataReply.user.name }}</span>
                            <span class="text-slate-400 text-xs">{{ $moment(dataReply.created_at).fromNow() }}</span>
                        </div>

                        <p class="py-4 text-sm">{{ dataReply.body }}</p>
                        
                        <footer class="text-slate-400">
                            <ToggleReplyLike
                                :reply="reply"
                                :user="user"
                            /> 
                        </footer>
                    </section>

                    <ReplyActionMenu
                        :reply="dataReply"
                        :post="post"
                        @openEditReplyModal="openEditReplyModal"
                    />
                </div>
        </div>

        <EditReplyModal
            v-if="showEditReplyModal"
            :replyCopy="replyCopy"
            :post_id="$route.params.id"
            @cancelEdit="cancelEdit"
            @updateReplyValues="updateReplyValues"
        />
    </div>
</template>

<script>
import UserAvatar from '@/components/User/UserAvatar'
import ReplyActionMenu from '@/components/Reply/ReplyActionMenu'
import EditReplyModal from '@/components/Reply/EditReplyModal'
import ToggleReplyLike from '@/components/Like/ToggleReplyLike'

export default {
    name: 'SingleReply',
    components: {
        UserAvatar,
        ReplyActionMenu,
        EditReplyModal,
        ToggleReplyLike
    },
    props: {
        reply: {
            type: Object,
            required: true
        },
        post: {
            type: Object,
            required: true
        }        
    },
    data() {
        return {
            showEditReplyModal: false,
            replyCopy: {},
            // Aggiunto per risolvere errore di modificare una prop direttamente
            dataReply: this.reply
        }
    },
    computed: {
        user() {
            return this.$store.state.auth.user
        }
    },
    methods: {
        openEditReplyModal() {
            // Copio l'oggetto in caso l'utente annulli la modifica, cosi da riportare l'oggetto allo stato iniziale
            Object.keys(this.dataReply).forEach((key) => {
                this.$set(this.replyCopy, key, this.dataReply[key]);
            })
            
            this.showEditReplyModal = true
        },
        cancelEdit() {
            this.showEditReplyModal = false
        },
        updateReplyValues(reply) {
            this.showEditReplyModal = false
            this.dataReply = reply
            this.replyCopy = {}
        }
    }
}
</script>