<template>
	<div class="w-full h-max pb-12 bg-gray-10 dark:bg-gray-2">
		<Landing />
		<Featured />
	</div>
</template>

<script>
import Landing from '../sections/Landing.vue';
import Featured from '../sections/Featured.vue';

export default {
	components: {
		Landing,
		Featured,
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
