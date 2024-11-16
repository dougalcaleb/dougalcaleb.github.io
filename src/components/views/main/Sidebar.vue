<template>
	<div>
		<div 
			class="h-full bg-gray-1 w-0 sm:w-20 flex flex-col items-center justify-between hover:w-48 transition-all duration-200 z-20 relative"
			@mouseover="hovering = true"
			@mouseleave="hovering = false"
		>

			<div class="w-auto max-w-28 rounded-b-md overflow-hidden">
				<img src="/assets/images/profile-square.jpg" alt="Profile Image">
			</div>

			<div>
				<div class="flex items-center cursor-pointer py-4">
					<Icon icon="fa/home" iconColor="white" :size="6" class="pr-2" />
					<Transition name="bgFade">
						<div 
							v-show="hovering"
							class="font-title text-white font-bold mt-1"
						>Welcome</div>
					</Transition>
				</div>
				<div class="flex items-center cursor-pointer py-4">
					<Icon icon="fa/star" iconColor="white" :size="6" class="pr-2" />
					<Transition name="bgFade">
						<div 
							v-show="hovering"
							class="font-title text-white font-bold mt-1"
						>Featured</div>
					</Transition>
				</div>
				<div class="flex items-center cursor-pointer py-4">
					<Icon icon="fa/code-file" iconColor="white" :size="6" class="pr-2" />
					<Transition name="bgFade">
						<div 
							v-show="hovering"
							class="font-title text-white font-bold mt-1"
						>Experience</div>
					</Transition>
				</div>
				<div class="flex items-center cursor-pointer py-4">
					<Icon icon="fa/id-badge" iconColor="white" :size="6" class="pr-2" />
					<Transition name="bgFade">
						<div 
							v-show="hovering"
							class="font-title text-white font-bold mt-1"
						>About</div>
					</Transition>
				</div>
				<div class="flex items-center cursor-pointer py-4">
					<Icon icon="fa/send" iconColor="white" :size="6" class="pr-2" />
					<Transition name="bgFade">
						<div 
							v-show="hovering"
							class="font-title text-white font-bold mt-1"
						>Contact</div>
					</Transition>
				</div>
			</div>

			<div class="flex flex-col items-center pb-2">
				<div class="border-t-2 border-gray-7 mb-2 w-2/3"></div>
				<Icon icon="fa/github" iconColor="white" :size="6" class="p-2 cursor-pointer" />
				<Icon icon="fa/linkedin" iconColor="white" :size="6" class="p-2 cursor-pointer" />
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
