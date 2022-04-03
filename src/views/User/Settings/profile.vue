<template>
    <div v-if="user">
        <h3 class="text-xl mb-5">Profilo pubblico</h3>
        <form>
            <!-- <ErrorMessage :errors="errors" /> -->

            <div class="mb-4">
                <label class="text-sm text-slate-400 block mb-1">Nome</label>
                <input
                    name="name"
                    id="name"
                    v-model="user.name"
                    type="text"
                    class="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-sky-200 text-sm">
            </div>

            <div class="mb-10">
                <label class="text-sm text-slate-400 block mb-1">Bio</label>
                <textarea
                    name="bio"
                    id="bio"
                    v-model="user.bio"
                    rows="4"
                    class="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-sky-200 text-sm resize-none"></textarea>
                    <p class="text-xs text-slate-400">Tell us a little bit about yourself</p>
            </div>

            <button
                type="submit"
                class="bg-sky-400 hover:bg-sky-500 transition text-white rounded px-4 py-1.5 focus:outline-sky-200 text-sm">
                    Aggiorna Informazioni
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