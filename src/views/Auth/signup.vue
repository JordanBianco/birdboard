<template>
    <div class="max-w-md mx-auto">
        <h2 class="text-xl font-semibold">Crea il tuo account</h2>
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