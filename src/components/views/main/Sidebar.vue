<template>
	<div>
		<div 
			:class="['h-full bg-gray-10 dark:bg-gray-1 w-0 sm:w-20 flex flex-col items-center justify-between hover:w-48 transition-all duration-200 z-40 fixed overflow-hidden', {'w-48': hovering}]"
			@mouseover="hovering = true"
			@mouseleave="hovering = false"
		>

			<div class="w-28 sm:w-auto max-w-28 h-28 rounded-b-md overflow-hidden">
				<img src="/assets/images/profile-square.jpg" alt="Profile Image">
			</div>

			<div class="grid transition-all duration-200" :style="sidebarIconStyle">
				<a href="#landing" class="contents">
					<div class="contents cursor-pointer text-gray-2 dark:text-white hover:text-purple-5">
						<Icon icon="fa/home" :size="6" class="pr-2 py-4 transition-all" />
						<div class="font-title font-bold mt-1 overflow-hidden transition-all duration-100 py-4">Welcome</div>
					</div>
				</a>
				
				<a href="#featured_header" class="contents">
					<div class="contents cursor-pointer text-gray-2 dark:text-white hover:text-purple-5">
						<Icon icon="fa/star" :size="6" class="pr-2 py-4 transition-all" />
						<div class="font-title font-bold mt-1 overflow-hidden transition-all duration-100 py-4">Featured</div>
					</div>
				</a>
				
				<a href="#projects_header" class="contents">
					<div class="contents cursor-pointer text-gray-2 dark:text-white hover:text-purple-5">
						<Icon icon="fa/code-file" :size="6" class="pr-2 py-4 transition-all" />
						<div class="font-title font-bold mt-1 overflow-hidden transition-all duration-100 py-4">Projects</div>
					</div>
				</a>
				
				<a href="#about_header" class="contents">
					<div class="contents cursor-pointer text-gray-2 dark:text-white hover:text-purple-5">
						<Icon icon="fa/id-badge" :size="6" class="pr-2 py-4 transition-all" />
						<div class="font-title font-bold mt-1 overflow-hidden transition-all duration-100 py-4">About</div>
					</div>
				</a>

				<a href="#contact_header" class="contents">
					<div class="contents cursor-pointer text-gray-2 dark:text-white hover:text-purple-5">
						<Icon icon="fa/send" :size="6" class="pr-2 py-4 transition-all" />
						<div class="font-title font-bold mt-1 overflow-hidden transition-all duration-100 py-4">Contact</div>
					</div>
				</a>
			</div>

			<div class="flex flex-col items-center pb-2">
				<div v-if="!isMobile" class="border-t-2 border-gray-7 mb-2 w-6"></div>
				<a href="https://github.com/dougalcaleb" target="_blank">
					<Icon v-if="!isMobile" icon="fa/github" :size="6" class="p-2 cursor-pointer text-gray-2 dark:text-white hover:text-purple-5 duration-200" />
				</a>
				<a href="https://www.linkedin.com/in/caleb-dougal/" target="_blank">
					<Icon v-if="!isMobile" icon="fa/linkedin" :size="6" class="p-2 cursor-pointer text-gray-2 dark:text-white hover:text-purple-5 duration-200" />
				</a>
				<div v-if="!isMobile" class="border-t-2 border-gray-7 my-2 w-6"></div>
				<Icon 
					:icon="isDarkTheme ? 'fa/moon' : 'fa/sun'" 
					:size="6" 
					:class="['p-2 cursor-pointer text-gray-2 dark:text-white hover:text-purple-5 duration-200', {'mb-12': isMobile}]" 
					@click="switchTheme()"
					hoverText="Toggle Theme"
					hoverDirection="right"
				/>
			</div>
			
		</div>

		<div class="h-10 sm:h-0 bg-gray-10 dark:bg-gray-0 w-full z-40 fixed bottom-0 flex justify-between items-center text-gray-2 dark:text-white px-6 overflow-hidden">
			<Icon icon="fa/bars" :size="6" @click="hovering = !hovering" />
			<div class="flex flex-row items-center">
				<a href="https://github.com/dougalcaleb" target="_blank">
					<Icon icon="fa/github" :size="6" />
				</a>
				<a href="https://www.linkedin.com/in/caleb-dougal/" target="_blank">
					<Icon icon="fa/linkedin" :size="6" class="ml-6" />
				</a>
			</div>
		</div>

		<Transition name="bgFade">
			<div 
				v-show="hovering"
				class="w-full h-full absolute z-30 bg-gray-7 left-0 top-0 opacity-40"
				@click="hovering = false"
			></div>
		</Transition>
	</div>
</template>

<script>
import Icon from '../../common/Icon.vue';
import ColorTheme from '../../mixins/ColorTheme';
import ScreenSize from '../../mixins/ScreenSize';

export default {
	mixins: [ColorTheme, ScreenSize],
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
	opacity: 0.4;
}
.bgFade-enter-active, .bgFade-leave-active {
	transition: opacity 0.2s;
}
</style>
