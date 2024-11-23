<template>
	<div class="w-full h-max pb-12 bg-gray-10 dark:bg-gray-2">
		<Landing />
		<Featured />
		<Projects @scroll="showcaseBottom = arguments[0]"/>
		<About :showcaseBottom="showcaseBottom" />
	</div>
</template>

<script>
import Landing from '../sections/Landing.vue';
import Featured from '../sections/Featured.vue';
import Projects from '../sections/Projects.vue';
import About from '../sections/About.vue';

export default {
	components: {
		Landing,
		Featured,
		Projects,
		About,
	},
	props: {
		
	},
	data() {
		return {
			showcaseBottom: 0,
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
