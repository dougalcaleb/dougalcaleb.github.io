<template>
	<Placeholder />
	<div class="flex h-full w-full">

		<Sidebar />

		<MainBody />
	</div>
</template>

<script>
import MainBody from './components/views/main/MainBody.vue';
import Sidebar from './components/views/main/Sidebar.vue';
import Placeholder from './Placeholder.vue';

export default {
	components: {
		Placeholder,
		Sidebar,
		MainBody,
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
