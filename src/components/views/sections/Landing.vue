<template>
	<div
		class="w-full h-screen relative left-0 top-0 bg-cover flex items-center shadow-lg dark:shadow-gray-1 shadow-gray-6 z-10"
		:style="backgroundImage"
	>
		<div id="landing" class="invisible absolute top-0 left-0"></div>

		<canvas id="physics2d-canvas" class="h-full w-full absolute"></canvas>

		<div class="absolute right-0 top-0">
			<IconButton
				class="m-4 w-6 opacity-20 hover:opacity-100"
				:icon="simRunning ? 'fa/pause' : 'fa/play'"
				:variant="simRunning ? 'cancel' : 'action'"
				:title="simRunning ? 'Pause physics sim' : 'Resume physics sim'"
				@mousedown="togglePhysicsSim"
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

				<a href="/files/Caleb-Dougal-Resume.pdf" download="Caleb Dougal's Resume.pdf">
					<IconButton class="ml-0 sm:ml-2" icon="fa/download" :iconSize="isMobile ? 4 : 5">
						<p class="text-md sm:text-lg">Resumé</p>
					</IconButton>
				</a>
			</div>
		</div>
	</div>
</template>

<script>
import IconButton from "@/components/common/IconButton.vue";
import ColorTheme from "@/components/mixins/ColorTheme";
import ScreenSize from "@/components/mixins/ScreenSize";
import polyDark from "@/assets/images/poly-dark.svg";
import polyLight from "@/assets/images/poly-light.svg";

export default {
	components: {
		IconButton,
	},
	mixins: [ColorTheme, ScreenSize],
	props: {},
	data() {
		return {
			simRunning: true,
		};
	},
	computed: {
		backgroundImage() {
			return `background-image: url('${this.isDarkTheme ? polyDark : polyLight}')`;
		},
		shadowTextClass() {
			let classStr = "landing_text_shadow_" + this.darkThemeString;
			if (this.isMobile) {
				classStr = "m_" + classStr;
			}
			return classStr;
		},
	},
	mounted() {
		window.onLandingPageLoad();
	},
	methods: {
		togglePhysicsSim() {
			if (this.simRunning) {
				window.pausePhysics2D();
			} else {
				window.resumePhysics2D();
			}
			this.simRunning = !this.simRunning;
		},
	},
};
</script>

<style scoped>
@reference "@/style.css";

.landing_text {
	@apply font-subtitle text-gray-3 dark:text-white font-bold text-3xl sm:text-7xl sm:py-2;
}
.landing_text_shadow_light {
	text-shadow: 0.4rem 0.4rem var(--color-gray-8);
}
.landing_text_shadow_dark {
	text-shadow: 0.5rem 0.5rem var(--color-gray-0);
}

.m_landing_text_shadow_light {
	text-shadow: 0.125rem 0.25rem var(--color-gray-8);
}
.m_landing_text_shadow_dark {
	text-shadow: 0.125rem 0.25rem var(--color-gray-0);
}
</style>
