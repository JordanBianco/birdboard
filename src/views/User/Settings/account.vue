<template>
    <div v-if="user">
        <h3 class="text-xl mb-5">Account</h3>
        <form>
            <!-- <ErrorMessage :errors="errors" /> -->

            <div class="mb-10">
                <label class="text-sm text-slate-400 block mb-1">Username</label>
                <input
                    name="username"
                    id="username"
                    v-model="user.username"
                    type="text"
                    class="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-sky-200 text-sm">
            </div>

            <button
                type="submit"
                class="bg-sky-400 hover:bg-sky-500 transition text-white rounded px-4 py-1.5 focus:outline-sky-200 text-sm">
                    Aggiorna Informazioni
            </button>
        </form>

        <form class="mt-10 pt-10 border-t border-slate-200">
            <span class="text-red-500 font-semibold block mb-4">Elimina Account</span>
            <!-- <ErrorMessage :errors="errors" /> -->

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
    name: 'user.settings.profile',
    props: {
        user: {
            type: Object,
            required: true
        }
    },
}
</script>