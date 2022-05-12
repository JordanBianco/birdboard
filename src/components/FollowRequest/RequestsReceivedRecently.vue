<template>
    <section>
        <span class="block text-slate-400 font-semibold text-xs uppercase mb-3">Richieste recenti</span>
    
        <div
            v-for="user in receivedFollowRequests.slice(0, 2)"
            :key="user.id"
            class="p-5 rounded-xl shadow-md drop-shadow-xs bg-white dark:bg-zinc-700 shadow-slate-200 dark:shadow-zinc-900 mb-5 last:mb-0 flex items-start space-x-4">
                <UserAvatar
                    :user="user"
                    :classes="'w-8 h-8'"
                />

                <div class="text-sm w-full">
                    <p class="text-xs leading-tight">
                        <span class="font-semibold">{{ user.name }}</span>
                        <span class="text-slate-400"> ha chiesto di seguirti</span>
                    </p>
                    
                    <div class="text-xxs text-slate-400 whitespace-nowrap my-1">
                        {{ user.pivot ? $moment(user.pivot.created_at).fromNow() : $moment().fromNow() }}
                    </div>

                    <div class="flex items-center space-x-2">
                        <button
                            type="button"
                            @click="acceptRequest(user)"
                            class="text-xs bg-sky-400 hover:bg-sky-500 transition text-white rounded-lg w-full py-1">
                                Accetta
                        </button>
                        <button
                            type="button"
                            @click="declineRequest(user)"
                            class="text-xs bg-white hover:text-slate-500 border border-slate-200 text-slate-400 transition rounded-lg w-full py-1">
                                Rifiuta
                        </button>
                    </div>
                </div>
        </div>
    </section>
</template>

<script>
import UserAvatar from '@/components/User/UserAvatar'

export default {
    name: 'RequestsReceivedRecently',
    props: {
        user: {
            type: Object,
            required: true
        }
    },
    components: {
        UserAvatar
    },
    computed: {
        receivedFollowRequests() {
            return this.$store.state.followRequest.receivedFollowRequests
        }
    },
    methods: {
        acceptRequest(follower) {
            this.$store.dispatch('followRequest/acceptRequest', {
                user: this.user,
                follower: follower,
                status: 'accepted'
            })
        },
        declineRequest(follower) {
            this.$store.dispatch('followRequest/acceptRequest', {
                user: this.user,
                follower: follower,
                status: 'declined'
            })
        }
    }
}
</script>

<style>

</style>