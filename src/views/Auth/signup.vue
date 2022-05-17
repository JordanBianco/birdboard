<template>
    <div class="py-10">
        <SignupForm />
    </div>
</template>

<script>
import SignupForm from '@/components/Auth/SignupForm'

export default {
    name: 'signup',
    components: {
        SignupForm
    }
}
</script>