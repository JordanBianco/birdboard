<template>
    <router-link :to="{ name: 'user.show', params: { username: user.username }}">
        <img
            v-if="user.image"
            src=""
            :alt="user.name + ' avatar'"
            :class="[ classes ? classes : 'w-9 h-9' ]"
            class="rounded-lg">

        <div
            v-else
            :class="[ classes ? classes : 'w-9 h-9' ]"
            class="bg-slate-200 rounded-lg"></div>
    </router-link>
</template>

<script>
export default {
    props: {
        user: {
            type: Object,
            required: false
        },
        classes: {
            type: [String, Array],
            required: false
        }
    }
}
</script>