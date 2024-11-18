<template>
	<div class="w-full h-screen fixed overflow-y-auto pb-12 bg-gray-2">
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
