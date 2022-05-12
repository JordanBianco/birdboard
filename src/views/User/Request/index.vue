<template>
    <div>
        <section class="max-w-md mx-auto space-y-8 py-10">
            <header>
                <h3 class="font-semibold text-sm uppercase text-slate-400">Richieste</h3>
            </header>

            <div class="border-b dark:border-zinc-700 border-slate-100 flex items-center">
                <div
                    @click="view = 'received'"
                    class="w-1/2 text-center cursor-pointer py-5"
                    :class="[ view === 'received' ? 'dark:text-slate-100 text-slate-800 border-sky-400 border-b' : 'dark:text-slate-500 text-slate-400' ]">
                        Ricevute
                </div>
                <div
                    @click="view = 'sent'"
                    class="w-1/2 text-center cursor-pointer py-5"
                    :class="[ view === 'sent' ? 'dark:text-slate-100 text-slate-800 border-sky-400 border-b' : 'dark:text-slate-500 text-slate-400' ]">
                        Inviate
                </div>
            </div>

            <ReceivedRequests
                v-if="view === 'received'"
                :user="user"
                :receivedFollowRequests="receivedFollowRequests"
            />

            <SentRequests
                v-if="view === 'sent'"
                :user="user"
                :sentFollowRequests="sentFollowRequests"
            />
        </section>
    </div>
</template>

<script>
import ReceivedRequests from '@/components/FollowRequest/ReceivedRequests'
import SentRequests from '@/components/FollowRequest/SentRequests'

export default {
    components: {
        ReceivedRequests,
        SentRequests
    },
    mounted() {
        // API CALL per le richieste inviate, quelle ricevute le chiamo già dal dropdownMenu
        if (this.sentFollowRequests.length === 0) {
            this.$store.dispatch('followRequest/getSentFollowRequests', {
                user: this.user,
                page: 1
            })
        }
    },
    data() {
        return {
            view: 'received'
        }
    },
    computed: {
        user() {
            return this.$store.state.auth.user
        },
        receivedFollowRequests() {
            return this.$store.state.followRequest.receivedFollowRequests
        },
        sentFollowRequests() {
            return this.$store.state.followRequest.sentFollowRequests
        }
    }
}
</script>