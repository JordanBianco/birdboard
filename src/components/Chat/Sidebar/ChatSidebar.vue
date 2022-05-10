<template>
    <div class="pt-6 pr-5">

        <SearchConversation
            @searchConversation="searchConversation"
        />

        <NewSingleConversation
            class="py-6"
            :authUser="authUser"
        />

        <SingleConversation
            v-for="conversation in conversations"
            :key="conversation.id"
            :conversation="conversation"
            :authUser="authUser"
        />
    </div>
</template>

<script>
import SearchConversation from '@/components/Chat/Sidebar/SearchConversation'
import NewSingleConversation from '@/components/Chat/Sidebar/NewSingleConversation'
import SingleConversation from '@/components/Chat/Sidebar/SingleConversation'

export default {
    name: 'ChatSidebar',
    props: {
        conversations: {
            type: Array,
            required: true
        },
        authUser: {
            type: Object,
            required: true
        }
    },
    components: {
        SearchConversation,
        NewSingleConversation,
        SingleConversation,
    },
    methods: {
        searchConversation(search) {
            this.$emit('searchConversation', search)
        }
    }
}
</script>