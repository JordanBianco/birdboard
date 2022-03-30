<template>
    <div>
        {{ $route.params.id }}
    </div>
</template>

<script>
export default {
    name: 'post.show',
    props: {
        id: {
            type: Number,
            required: true
        }
    }
}
</script>