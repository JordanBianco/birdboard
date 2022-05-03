<template>
    <div class="flex items-center space-x-4 w-full">

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bell w-5 h-5 flex-none text-yellow-500"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>

        <div>
            <span class="block text-slate-400 text-xxs mt-0.5">adesso</span>
            <span class="block text-sm text-slate-600 font-semibold">Nuovo commento</span>
            <router-link
                class="block text-slate-400 text-xs"
                :to="{
                    name: 'post.show',
                    params: {
                        username: notification.post.user.username,
                        id: notification.post.id
                    },
                    hash: '#' + notification.reply.id
                }"
            >
                {{ notification.reply.user.name }} ha commentato il tuo post
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NewReplyPopup',
    created() {
        setTimeout(() => {
            this.$store.commit('notification/REMOVE_POPUP_NOTIFICATION', this.notification)
        }, 5000);
    },
    props: {
        notification: {
            type: Object,
            required: true
        }
    }
}
</script>