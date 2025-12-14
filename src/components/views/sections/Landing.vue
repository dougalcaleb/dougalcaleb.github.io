<template>
	<div 
		class="w-full h-screen relative left-0 top-0 bg-cover flex items-center shadow-lg dark:shadow-gray-1 shadow-gray-6 z-10" 
		:style="backgroundImage"
	>

		<div class="invisible absolute top-0 left-0" id="landing"></div>

		<canvas id="physics2d-canvas" class="h-full w-full absolute"></canvas>

		<div class="absolute right-0 top-0">
			<IconButton 
				class="m-4 w-6 opacity-20 hover:opacity-100"
				:icon="simRunning ? 'fa/pause' : 'fa/play'"
				:variant="simRunning ? 'cancel' : 'action'"
				@mousedown="togglePhysicsSim"
				:title="simRunning ? 'Pause physics sim' : 'Resume physics sim'"
			/>
		</div>

		<div class="px-8 sm:pl-40 z-20">
			<p :class="['landing_text', shadowTextClass]">Hello!</p>
			<p :class="['landing_text', shadowTextClass]">I'm Caleb,</p>
			<p :class="['landing_text', shadowTextClass]">a programmer</p>
			<p :class="['landing_text', shadowTextClass]">and web developer.</p>

			<div class="flex mt-6 flex-wrap">
				<a href="#contact_header">
					<IconButton class="mr-4 mb-4 sm:mr-2 ml-0">
						<p class="text-md sm:text-lg">Contact</p>
					</IconButton>
				</a>
				
				<a href="/assets/files/Resume August 2025.pdf" download="Caleb Dougal's Resume">
					<IconButton class="ml-0 sm:ml-2" icon="fa/download" :iconSize="isMobile ? 4 : 5">
						<p class="text-md sm:text-lg">Resumé</p>
					</IconButton>
				</a>
				
			</div>
			
		</div>
		
	</div>
</template>

<script>
import IconButton from '../../common/IconButton.vue';
import ColorTheme from '../../mixins/ColorTheme';
import ScreenSize from '../../mixins/ScreenSize';

export default {
	mixins: [ColorTheme, ScreenSize],
	components: {
		IconButton,
	},
	props: {
		
	},
	data() {
		return {
			simRunning: true,
		}
	},
	computed: {
		backgroundImage() {
			return `background-image: url('assets/images/poly-${this.darkThemeString}.svg')`;
		},
		shadowTextClass() {
			let classStr = 'landing_text_shadow_' + this.darkThemeString;
			if (this.isMobile) {
				classStr = 'm_' + classStr;
			}
			return classStr;
		}
	},
	methods: {
		togglePhysicsSim() {
			if (this.simRunning) {
				window.pausePhysics2D();
			} else {
				window.resumePhysics2D();
			}
			this.simRunning = !this.simRunning;
		}
	},
	mounted() {
		window.onLandingPageLoad();
	}
}
</script>

<style scoped>
.landing_text {
	@apply font-subtitle text-gray-3 dark:text-white font-bold text-3xl sm:text-7xl sm:py-2;
}
.landing_text_shadow_light {
	text-shadow: 0.4rem 0.4rem theme(colors.gray-8); 
}
.landing_text_shadow_dark {
	text-shadow: 0.5rem 0.5rem theme(colors.gray-0);
}

.m_landing_text_shadow_light {
	text-shadow: 0.125rem 0.25rem theme(colors.gray-8); 
}
.m_landing_text_shadow_dark {
	text-shadow: 0.125rem 0.25rem theme(colors.gray-0);
}
</style>
