<template>
    <div class="relative w-full">
        <input
            type="text"
            v-model="search"
            placeholder="Cerca"
            class="bg-slate-200 dark:bg-zinc-700 placeholder-slate-400 rounded-lg pl-10 p-2 text-sm focus:outline-none w-full">

        <svg class="w-5 h-5 text-slate-400 flex-none absolute left-2 top-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z"/></svg>
    </div>
</template>

<script>
export default {
    name: 'SearchConversation',
    data() {
        return {
            search: ''
        }
    },
    watch: {
        search() {
            this.$emit('searchConversation', this.search)
        }
    }
}
</script>