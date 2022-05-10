<template>
    <div
        :class="classes"
        class="flex-none">
            <router-link
                :to="{ name: 'user.show', params: { username: user.username }}">
                    <img
                        v-if="user.image"
                        :src="userImage"
                        :alt="user.name + ' avatar'"
                        class="rounded-full w-full h-full object-cover">

                    <img
                        v-else
                        :src="'https://eu.ui-avatars.com/api/?background=eeeeee&color=3f3f46&name=' + user.name"
                        alt=""
                        class="rounded-full flex-none">
            </router-link>
    </div>
</template>

<script>
export default {
    props: {
        user: {
            type: Object,
            required: false
        },
        classes: {
            type: String,
            required: false,
        }
    },
    computed: {
        userImage() {
            return 'http://localhost:8000/storage/' + this.user.image.url
        },
    }
}
</script>