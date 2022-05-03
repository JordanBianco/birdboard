<template>
    <div>
        <h3 class="text-xl mb-5">Elimina account</h3>

        <form @submit.prevent="deleteAccount()" class="mt-10 pt-10 border-t border-slate-200">

            <p class="text-slate-400 text-sm mb-10">Una volta eliminato il tuo account, non puoi tornare indietro. Si prega di essere certi.</p>
            
            <button
                type="submit"
                class="bg-red-400 hover:bg-red-500 transition text-white rounded-full px-4 py-1.5 focus:outline-sky-200 text-sm">
                    Elimina account
            </button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'user.settings.delete',
    props: {
        user: {
            type: Object,
            required: true
        }
    },
    methods: {
        deleteAccount() {
            this.$store.dispatch('authUser/deleteAccount', {
                id: this.user.id
            })
        }
    }
}
</script>