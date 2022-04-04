<template>
	<div class="bg-slate-50 text-slate-600 min-h-screen">
		<TheNavbar />
		<div class="xl:max-w-5xl mx-auto">
			<router-view class="px-6"/>
		</div>
	</div>
</template>

<script>
import TheNavbar from '@/components/Layout/TheNavbar'
export default {
	components: { TheNavbar }
}
</script>