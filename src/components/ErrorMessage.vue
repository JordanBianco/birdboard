<template>
    <div v-if="errors.length != 0">
        <div class="bg-red-100 border-l-4 border-red-500 pl-4 py-2 rounded-r-lg">
            <div
                v-for="error, index in errors"
                :key="index"
                class="text-red-400 text-sm">
                    {{ error[0] }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ErrorMessage',
    props: {
        errors: {
            type: [Object, Array],
            required: true
        }
    }
}
</script>