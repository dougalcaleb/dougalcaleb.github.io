<template>
	<div 
		class="w-full h-screen relative left-0 top-0 bg-cover flex items-center shadow-lg shadow-gray-1 z-10" 
		style="background-image: url('assets/images/poly-dark.png')"
	>

		<div class="pl-8 sm:pl-40">
			<p class="font-subtitle text-white font-bold text-3xl sm:text-7xl sm:py-2">Hello!</p>
			<p class="font-subtitle text-white font-bold text-3xl sm:text-7xl sm:py-2">I'm Caleb,</p>
			<p class="font-subtitle text-white font-bold text-3xl sm:text-7xl sm:py-2">a programmer</p>
			<p class="font-subtitle text-white font-bold text-3xl sm:text-7xl sm:py-2">and web developer.</p>

			<div class="flex mt-6">
				<IconButton class="ml-0">
					<p class="sm:text-lg">Contact</p>
				</IconButton>
				<IconButton icon="fa/download">
					<p class="sm:text-lg">Resumé</p>
				</IconButton>
			</div>
			
		</div>
		
	</div>
</template>

<script>
import IconButton from '../../common/IconButton.vue';

export default {
	components: {
		IconButton,
	},
	props: {
		
	},
	data() {
		return {
			
		}
	},
	computed: {
		
	},
	methods: {
		
	}
}
</script>

<style scoped>

</style>
