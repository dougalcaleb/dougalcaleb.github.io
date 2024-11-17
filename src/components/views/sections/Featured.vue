<template>
	<div 
		class="w-full h-max relative left-0 bg-gray-3 pl-8 sm:pl-32 pt-20"
		ref="sectionWrapper"
	>
		<h1 class="font-title text-2xl sm:text-4xl text-white font-bold">FEATURED</h1>

		<div class="relative w-full mt-8" ref="imgWrapper">
			<img 
				src="/assets/images/ls-grader.png" 
				alt="Learning Suite Screenshot" 
				class="absolute shadow-lg shadow-gray-0 w-1/2 left-0 top-0" 
			/>
			<img
				src="/assets/images/ls-courselist.png"
				alt="Learning Suite Screenshot"
				class="absolute shadow-lg shadow-gray-0 w-1/2 left-0 top-0 translate-x-1/2 translate-y-1/3"
			/>
			<img
				src="/assets/images/ls-assignments.png"
				alt="Learning Suite Screenshot"
				class="absolute shadow-lg shadow-gray-0 w-1/2 left-0 top-0 translate-x-full translate-y-2/3"
			/>
		</div>
	</div>
</template>

<script>
export default {
	components: {},
	props: {},
	data() {
		return {};
	},
	computed: {},
	methods: {
		setParentDimensions() {
			this.$nextTick(() => {
				const parent = this.$refs['sectionWrapper'];
				const childContainer = this.$refs['imgWrapper'];
				const children = childContainer.children;
				let maxHeight = 0;

				for (let child of children) {
					const rect = child.getBoundingClientRect();
					maxHeight = Math.max(maxHeight, rect.top + rect.height);
				}

				parent.style.height = `calc(${maxHeight}px - 5rem)`;
			});
		},
	},
	mounted() {
		this.setParentDimensions();
		// TODO:
		// make box shadow custom
		// make translate custom (probably have to use calc())
		// take another look at the dimensions thing, it's adding too much at the bottom (also find a way to recompute on img load)
		// get actual images
	},
};
</script>

<style scoped></style>
