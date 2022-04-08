<template>
    <div class="max-w-md mx-auto py-10">
        <h2 class="text-xl font-semibold">Accedi</h2>
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