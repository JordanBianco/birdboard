<template>
	<div class="grid grid-cols-12 py-10">
		<section class="col-span-3">
			<SidebarLinks />
		</section>
		<section class="col-span-6 space-y-6">
			<!-- <CreatePost /> -->
			<TheFeed />
		</section>
		<section class="col-span-3">
			Followers
		</section>
	</div>
</template>

<script>
import SidebarLinks from '@/components/Layout/SidebarLinks'
// import CreatePost from '@/components/CreatePost'
import TheFeed from '@/components/TheFeed'

export default {
	name: 'Home',
	components: {
		SidebarLinks,
		// CreatePost,
		TheFeed
	}
}
</script>
