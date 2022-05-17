<template>
    <div v-if="user">
        <div class="bg-gray-400 h-56"></div>

        <section class="px-4 pb-8">
            <header class="-mt-20">
                <UserAvatar
                    :user="user"
                    :classes="'border-4 border-slate-50 dark:border-zinc-800 mb-2 w-36 h-36 rounded-full'"
                />

                <div class="flex items-start justify-between mt-4">
                    <div>
                        <span class="font-semibold block text-base sm:text-xl">{{ user.name }}</span>
                        <span class="text-slate-400 block text-xs sm:text-sm">@{{ user.username }}</span>
                    </div>

                    <div>
                        <router-link
                            v-if="loggedInUser && user.id === loggedInUser.id"
                            :to="{ name: 'user.settings.profile', params: { username: user.username }}"
                            class="text-xs sm:text-sm bg-sky-400 hover:bg-sky-500 text-white transition rounded-full px-4 py-2 max-w-max">
                                Modifica
                        </router-link>

                        <ToggleFollow
                            :user="user"
                            :loggedInUser="loggedInUser"
                        />
                    </div>
                </div>
            </header>

            <div class="text-sm mt-5">
                <p v-if="user.bio" class="leading-tight pb-5 overflow-ellipsis text-slate-400 dark:text-slate-200 overflow-hidden">{{ user.bio }}</p>

                <p class="pb-5 flex items-center space-x-2 text-slate-400 dark:text-slate-200">
                    <svg class="w-5 h-5 flex-none" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24"><path fill="currentColor" d="M12,19a1,1,0,1,0-1-1A1,1,0,0,0,12,19Zm5,0a1,1,0,1,0-1-1A1,1,0,0,0,17,19Zm0-4a1,1,0,1,0-1-1A1,1,0,0,0,17,15Zm-5,0a1,1,0,1,0-1-1A1,1,0,0,0,12,15ZM19,3H18V2a1,1,0,0,0-2,0V3H8V2A1,1,0,0,0,6,2V3H5A3,3,0,0,0,2,6V20a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V6A3,3,0,0,0,19,3Zm1,17a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V11H20ZM20,9H4V6A1,1,0,0,1,5,5H6V6A1,1,0,0,0,8,6V5h8V6a1,1,0,0,0,2,0V5h1a1,1,0,0,1,1,1ZM7,15a1,1,0,1,0-1-1A1,1,0,0,0,7,15Zm0,4a1,1,0,1,0-1-1A1,1,0,0,0,7,19Z"/></svg>
                    <span>Iscrizione a {{ $moment(user.created_at).format('MMMM YYYY') }}</span>
                </p>

                <div class="flex items-center space-x-4">                    
                    <FollowersList
                        :user="user"
                        :loggedInUser="loggedInUser"
                    />

                    <FollowingList
                        :user="user"
                        :loggedInUser="loggedInUser"
                    />
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import UserAvatar from '@/components/User/UserAvatar'
import ToggleFollow from '@/components/User/Follow/ToggleFollow'
import FollowingList from '@/components/User/Follow/FollowingList'
import FollowersList from '@/components/User/Follow/FollowersList'

export default {
    name: 'TheProfile',
    components: {
        UserAvatar,
        ToggleFollow,
        FollowingList,
        FollowersList
    },
    props: {
        user: {
            type: Object,
            required: true
        },
        loggedInUser: {
            type: [Object, null],
            required: false
        }
    }
}
</script>