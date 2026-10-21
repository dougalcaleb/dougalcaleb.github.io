<template>
	<div class="flex h-max w-full">
		<Sidebar />
		<MainBody />
	</div>
</template>

<script>
import MainBody from "@/components/views/main/MainBody.vue";
import Sidebar from "@/components/views/main/Sidebar.vue";

export default {
	components: {
		Sidebar,
		MainBody,
	},
	props: {},
	data() {
		return {
			isProd: import.meta.env.PROD,
		};
	},
	computed: {},
	methods: {},
};
</script>

<style scoped></style>
