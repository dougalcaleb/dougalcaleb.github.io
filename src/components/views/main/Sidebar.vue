<template>
	<div>
		<div 
			class="h-full bg-gray-1 w-0 sm:w-20 flex flex-col items-center justify-between hover:w-48 transition-all duration-200 z-20 relative overflow-hidden"
			@mouseover="hovering = true"
			@mouseleave="hovering = false"
		>

			<div class="w-auto max-w-28 rounded-b-md overflow-hidden">
				<img src="/assets/images/profile-square.jpg" alt="Profile Image">
			</div>

			<div class="grid transition-all duration-200" :style="sidebarIconStyle">
				<div class="contents cursor-pointer text-white hover:text-purple-4">
					<Icon icon="fa/home" :size="6" class="pr-2 py-4 transition-all" />
					<div class="font-title font-bold mt-1 overflow-hidden transition-all duration-100 py-4">Welcome</div>
				</div>
				
				<div class="contents cursor-pointer text-white hover:text-purple-4">
					<Icon icon="fa/star" :size="6" class="pr-2 py-4 transition-all" />
					<div class="font-title font-bold mt-1 overflow-hidden transition-all duration-100 py-4">Featured</div>
				</div>

				<div class="contents cursor-pointer text-white hover:text-purple-4">
					<Icon icon="fa/code-file" :size="6" class="pr-2 py-4 transition-all" />
					<div class="font-title font-bold mt-1 overflow-hidden transition-all duration-100 py-4">Experience</div>
				</div>
				
				<div class="contents cursor-pointer text-white hover:text-purple-4">
					<Icon icon="fa/id-badge" :size="6" class="pr-2 py-4 transition-all" />
					<div class="font-title font-bold mt-1 overflow-hidden transition-all duration-100 py-4">About</div>
				</div>

				<div class="contents cursor-pointer text-white hover:text-purple-4">
					<Icon icon="fa/send" :size="6" class="pr-2 py-4 transition-all" />
					<div class="font-title font-bold mt-1 overflow-hidden transition-all duration-100 py-4">Contact</div>
				</div>
			</div>

			<div class="flex flex-col items-center pb-2">
				<div class="border-t-2 border-gray-7 mb-2 w-6"></div>
				<Icon icon="fa/github" :size="6" class="p-2 cursor-pointer text-white hover:text-purple-4 duration-200" />
				<Icon icon="fa/linkedin" :size="6" class="p-2 cursor-pointer text-white hover:text-purple-4 duration-200" />
			</div>
			
		</div>
		<Transition name="bgFade">
			<div 
				v-show="hovering"
				class="w-full h-full absolute z-10 bg-gray-7 left-0 top-0 transition-all"
			></div>
		</Transition>
	</div>
</template>

<script>
import Icon from '../../common/Icon.vue';

export default {
	components: {
		Icon,
	},
	props: {
		
	},
	data() {
		return {
			hovering: false
		}
	},
	computed: {
		sidebarIconStyle() {
			return this.hovering
				? 'grid-template-columns: max-content 6rem'
				: 'grid-template-columns: max-content 0';
		}
	},
	methods: {
		
	}
}
</script>

<style scoped>
.bgFade-enter-from, .bgFade-leave-to {
	opacity: 0;
}
.bgFade-enter-to, .bgFade-leave-from {
	opacity: 1;
}
.bgFade-enter-active, .bgFade-leave-active {
	transition: opacity 0.2s;
}
</style>
