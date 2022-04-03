<template>
	<div class="grid grid-cols-12 py-10">
		<section class="col-span-3">
			<SidebarLinks />
		</section>
		<section class="col-span-6 space-y-6">
			<TheFeed />
		</section>
		<section class="col-span-3">
			<div class="px-4">
				<div class="bg-slate-100 rounded-lg flex items-start space-x-3 p-3">
					<div class="bg-slate-300 rounded-full w-8 h-8"></div>
					<div>
						<span class="block text-sm -mb-1.5">Jordan Bianco</span>
						<span class="text-xs text-slate-400">@jordanbianco</span>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import SidebarLinks from '@/components/Layout/SidebarLinks'
import TheFeed from '@/components/TheFeed'

export default {
	name: 'Home',
	components: {
		SidebarLinks,
		TheFeed
	}
}
</script>
