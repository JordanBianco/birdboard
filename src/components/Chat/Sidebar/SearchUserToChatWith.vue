<template>
    <div>
        <section class="p-4 border-b border-slate-200 dark:border-zinc-600 flex items-center space-x-4">
            <span class="block"> A: </span>
            <input
                v-model="search"
                type="text"
                placeholder="Cerca..."
                autofocus
                class="placeholder-slate-300 bg-transparent w-full focus:outline-none">
        </section>
    </div>
</template>

<script>
export default {
    name: 'SearchUserToChatWith',
    data() {
        return {
            search: '',
        }
    },
    watch: {
        search: {
            handler() {
                this.searchUser()
            }
        }
    },
    methods: {
        searchUser() {
            this.$emit('searchUser', this.search)
        }
    }
}
</script>