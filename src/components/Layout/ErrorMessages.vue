<template>
    <div v-if="errors.length != 0">
        <div
            v-for="error, i in errors"
            :key="i"
            class="text-sm text-red-500 mt-1">
                {{ error[0] }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'ErrorMessages',
    props: {
        errors: {
            type: [Array, Object],
            required: true
        }
    }
}
</script>