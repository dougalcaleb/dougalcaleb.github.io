<template>
	<div class="flex justify-center absolute top-0 w-full z-50">
		<div class="w-78 h-max bg-gray-4 text-white font-subtitle font-bold mt-8 shadow-lg shadow-gray-0 rounded-md py-4 px-16 relative">
			<Icon icon="fa/xmark" :size="4" class="text-red-2 absolute right-4 cursor-pointer" @click="destroy"/>
			<p class="text-center">This site is currently under construction!</p>
			<p class="text-center">Please check back soon for the full thing.</p>
		</div>
	</div>
</template>

<script>
import Icon from './components/common/Icon.vue';

export default {
	components: {
		Icon,
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
		destroy() {
			this.$el.parentNode.removeChild(this.$el);
		}
	}
}
</script>

<style scoped>

</style>
