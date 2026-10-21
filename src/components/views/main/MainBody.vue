<template>
	<div class="w-full h-max bg-gray-10 dark:bg-gray-2">
		<Landing />
		<Featured />
		<Projects @scroll="showcaseBottom = arguments[0]" />
		<About :showcaseBottom="showcaseBottom" />
		<Contact />
	</div>
</template>

<script>
import Landing from "@/components/views/sections/Landing.vue";
import Featured from "@/components/views/sections/Featured.vue";
import Projects from "@/components/views/sections/Projects.vue";
import About from "@/components/views/sections/About.vue";
import Contact from "@/components/views/sections/Contact.vue";

export default {
	components: {
		Landing,
		Featured,
		Projects,
		About,
		Contact,
	},
	props: {},
	data() {
		return {
			showcaseBottom: 0,
		};
	},
	computed: {},
	methods: {},
};
</script>

<style scoped></style>
