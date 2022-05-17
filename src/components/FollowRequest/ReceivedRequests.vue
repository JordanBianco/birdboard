<template>
    <div>
        <div v-if="receivedFollowRequests && receivedFollowRequests.length != 0">
            
            <p class="mb-6 text-slate-400 text-sm">Hai {{ receivedTotal }} richieste in attesa di risposta.</p>
            
            <div
                v-for="user in receivedFollowRequests"
                :key="user.id"
                class="p-5 rounded-xl shadow-md drop-shadow-xs bg-white dark:bg-zinc-700 shadow-slate-200 dark:shadow-zinc-900 mb-5 last:mb-0 flex justify-between items-start space-x-4">
                    <div class="flex items-start space-x-4 w-full">
                        <UserAvatar
                            :user="user"
                            :classes="'w-9 h-9'"
                        />

                        <div class="text-sm w-full">
                            <span class="font-semibold">{{ user.name }}</span>
                            <span class="text-slate-400"> ha chiesto di seguirti</span>

                            <div class="flex items-center space-x-2 mt-2 md:w-1/2">
                                <button
                                    type="button"
                                    @click="acceptRequest(user)"
                                    class="text-xs bg-sky-400 hover:bg-sky-500 transition text-white rounded-lg w-full py-1.5">
                                        Accetta
                                </button>
                                <button
                                    type="button"
                                    @click="declineRequest(user)"
                                    class="text-xs bg-white hover:text-slate-500 border border-slate-200 text-slate-400 transition rounded-lg w-full py-1.5">
                                        Rifiuta
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="text-xxs text-slate-400 whitespace-nowrap">
                        {{ user.pivot ? $moment(user.pivot.created_at).fromNow() : $moment().fromNow() }}
                    </div>
            </div>

            <div
                v-observe-visibility="visibilityChanged"
                :class="{ 'flex justify-center py-3' : loading }">
                    <svg v-if="loading" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-loader animate-spin text-slate-300 w-6 h-6"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
            </div>
        </div>
    </div>
</template>

<script>
import UserAvatar from '@/components/User/UserAvatar'

export default {
    name: 'ReceivedRequests',
    components: {
        UserAvatar
    },
    props: {
        user: {
            type: Object,
            required: true
        },
        receivedFollowRequests: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            loading: false
        }
    },
    computed: {
        receivedPage() {
            return this.$store.state.followRequest.receivedPage
        },
        receivedLastPage() {
            return this.$store.state.followRequest.receivedLastPage
        },
        receivedTotal() {
            return this.$store.state.followRequest.receivedTotal
        },
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
        },
        visibilityChanged(isVisible) {
            if (! isVisible) return

            if (this.receivedPage >= this.receivedLastPage) { 
                this.loading = false
                return
            } else {
                this.loading = true

                this.$store.commit('followRequest/NEXT_RECEIVED_PAGE')

                this.$store.dispatch('followRequest/getReceivedFollowRequests', {
                    user: this.user,
                    page: this.receivedPage
                })
            }
        }
    }
}
</script>