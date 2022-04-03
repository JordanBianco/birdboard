<template>
    <form v-if="user" class="space-y-6">
        <!-- <ErrorMessage :errors="errors" /> -->

        <div>
            <label class="text-xs text-sky-400 uppercase block mb-1">Nome</label>
            <input
                name="name"
                id="name"
                v-model="user.name"
                type="text"
                class="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-sky-200 text-sm">
        </div>

        <!-- <div>
            <label class="text-xs text-sky-400 uppercase block mb-1">Username</label>
            <input
                name="username"
                id="username"
                v-model="user.username"
                type="text"
                class="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-sky-200 text-sm">
        </div>

        <div>
            <label class="text-xs text-sky-400 uppercase block mb-1">Email</label>
            <input
                name="email"
                id="email"
                v-model="user.email"
                type="email"
                class="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-sky-200 text-sm">
        </div> -->

        <div>
            <label class="text-xs text-sky-400 uppercase block mb-1">Bio</label>
            <textarea
                name="bio"
                id="bio"
                v-model="user.bio"
                rows="4"
                class="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-sky-200 text-sm resize-none"></textarea>
        </div>

        <!-- <div class="relative">
            <label class="text-xs text-sky-400 uppercase block mb-1">Password</label>
            <input
                name="password"
                id="password"
                v-model="user.password"
                :type="showPassword ? 'text' : 'password'"
                class="w-full border border-slate-200 rounded-lg py-2 pl-4 pr-20 focus:outline-sky-200 text-sm">

            <span
                id="toggle"
                @click="togglePassword()"
                class="absolute text-slate-400 text-xs right-6 top-8 uppercase">
                    Show
            </span>
        </div> -->

        <button
            type="submit"
            class="w-full bg-sky-400 hover:bg-sky-500 transition text-white rounded-full px-4 py-1.5 focus:outline-sky-200">
                Aggiorna
        </button>
    </form>
</template>

<script>
export default {
    name: 'dashboard.EditUserProfile',
    props: {
        user: {
            type: Object,
            required: true
        }
    },
    methods: {

    }
}
</script>