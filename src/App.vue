<template>
	<div class="flex p-8 bg-gray-5">
		<Placeholder v-if="isProd" />

	</div>
</template>

<script>
import Placeholder from './Placeholder.vue';

export default {
	components: {
		Placeholder,
	},
	props: {
		
	},
	data() {
		return {
			isProd: import.meta.env.PROD,
		}
	},
	computed: {
		
	},
	methods: {
		
	},
}
</script>

<style scoped>

</style>
