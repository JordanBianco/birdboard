<template>
    <div v-if="user">
        <div class="bg-gray-400 h-36"></div>

        <section class="px-4 pb-8">
            <header class="-mt-14">
                <div class="bg-slate-200 border-4 border-slate-50 rounded-full w-28 h-28 mb-2"></div>

                <div class="flex items-start justify-between">
                    <div>
                        <span class="text-xl font-semibold block">{{ user.name }}</span>
                        <span class="text-slate-400 block">@{{ user.username }}</span>
                    </div>

                    <div class="flex items-center space-x-2">
                        <router-link
                            v-if="loggedInUser && user.id === loggedInUser.id"
                            :to="{ name: 'user.settings.profile', params: { username: user.username }}"
                            class="text-sm bg-white hover:text-slate-500 border border-slate-200 text-slate-400 transition rounded-full px-4 py-1.5 focus:outline-sky-200 max-w-max">
                                Modifica
                        </router-link>
                        <button class="text-sm bg-sky-400 hover:bg-sky-500 transition text-white rounded-full px-4 py-1.5 focus:outline-sky-200 max-w-max">
                            Segui
                        </button>
                    </div>
                </div>
            </header>
            <div class="text-sm text-slate-400 mt-5">
                <p v-if="user.bio" class="leading-tight pb-5 overflow-ellipsis overflow-hidden">{{ user.bio }}</p>

                <p class="pb-5 flex items-center space-x-1">
                    <svg class="w-5 h-5 flex-none" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24"><path fill="currentColor" d="M12,19a1,1,0,1,0-1-1A1,1,0,0,0,12,19Zm5,0a1,1,0,1,0-1-1A1,1,0,0,0,17,19Zm0-4a1,1,0,1,0-1-1A1,1,0,0,0,17,15Zm-5,0a1,1,0,1,0-1-1A1,1,0,0,0,12,15ZM19,3H18V2a1,1,0,0,0-2,0V3H8V2A1,1,0,0,0,6,2V3H5A3,3,0,0,0,2,6V20a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V6A3,3,0,0,0,19,3Zm1,17a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V11H20ZM20,9H4V6A1,1,0,0,1,5,5H6V6A1,1,0,0,0,8,6V5h8V6a1,1,0,0,0,2,0V5h1a1,1,0,0,1,1,1ZM7,15a1,1,0,1,0-1-1A1,1,0,0,0,7,15Zm0,4a1,1,0,1,0-1-1A1,1,0,0,0,7,19Z"/></svg>
                    <span>Iscrzione a {{ $moment(user.created_at).format('MMMM YYYY') }}</span>
                </p>

                <div class="flex items-center space-x-4">
                    <p><span class="text-slate-600 font-semibold">{{ posts_count }}</span> Post</p>
                    <p><span class="text-slate-600 font-semibold">100</span> Follower</p>
                    <p><span class="text-slate-600 font-semibold">4</span> Seguiti</p>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: 'TheProfile',
    props: {
        user: {
            type: Object,
            required: true
        },
        loggedInUser: {
            type: [Object, null],
            required: false
        },
        posts_count: {
            type: Number,
            required: true
        }
    }
}
</script>