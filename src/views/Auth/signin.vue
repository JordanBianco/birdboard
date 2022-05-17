<template>
    <div class="py-10">
        <SigninForm />
    </div>
</template>

<script>
import SigninForm from '@/components/Auth/SigninForm'

export default {
    name: 'signin',
    components: {
        SigninForm
    }
}
</script>