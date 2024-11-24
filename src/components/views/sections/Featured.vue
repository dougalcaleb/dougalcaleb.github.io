<template>
	<div 
		class="w-full h-max relative left-0 dark:bg-gray-3 bg-white pl-8 sm:pl-32 pr-8 sm:pr-12 pt-8 sm:pt-20"
		ref="sectionWrapper"
	>
		<h1 class="font-title text-2xl sm:text-4xl dark:text-white text-gray-1 font-bold" id="featured_header">FEATURED</h1>

		<div class="relative w-full mt-8" ref="imgWrapper">
			<LazyImage 
				:src="imgSources[0]" 
				alt="Learning Suite Screenshot" 
				:class="['absolute rounded-md w-10/12 md:w-1/2 left-0 md:left-6 top-0 origin-center', `box-shadow-0-${this.darkThemeString}`]"
				@loaded="imageLoaded"
				@error="imageLoaded"
			/>
			<LazyImage
				:src="imgSources[1]"
				alt="Learning Suite Screenshot"
				:class="['absolute rounded-md w-10/12 md:w-1/2 left-0 top-0 right-0 mx-auto origin-center translate-y-1/3', `box-shadow-1-${this.darkThemeString}`]"
				@loaded="imageLoaded"
				@error="imageLoaded"
			/>
			<LazyImage
				:src="imgSources[2]"
				alt="Learning Suite Screenshot"
				:class="['absolute rounded-md w-10/12 md:w-1/2 right-0 md:right-6 top-0 origin-center', `box-shadow-2-${this.darkThemeString}`]"
				style="transform: translateY(66.66%)"
				@loaded="imageLoaded"
				@error="imageLoaded"
			/>
		</div>

		<div ref="textContent" class="w-full sm:px-6">
			<div class="flex items-center">
				<Icon icon="brand/learningsuite" :iconColor="null" :size="isMobile ? 10 : 14" />
				<div class="flex flex-col ml-4">
					<p class="font-ls text-ls-blue-light font-bold text-xl sm:text-3xl -mb-1 mt-1">LEARNING</p>
					<p class="font-ls text-ls-blue-light font-bold text-xl sm:text-3xl -mt-1">SUITE</p>
				</div>
			</div>

			<p class="text-gray-1 dark:text-white font-body sm:px-4 pt-2 sm:pt-8 sm:text-lg">
				Learning Suite is a fully-featured Learning Management
				System (LMS) built entirely in-house at Brigham Young 
				University. It provides full functionality for instructors to 
				administrate their courses across a wide range of styles 
				and preferences. Different types of assignments
				provide ways for students to submit files, hold class 
				discussions, or interface with external tools for more 
				flexibility. Exams can be held online or easily coordinated 
				with and imported from the on-campus Testing Center. 
				Instructors can build progress tracks to get insights on 
				student engagement and guide them through curated 
				modules. Class content can easily be organized in stockpile 
				fashion or laid out in an interactive syllabus. 

				<br/><br/>

				Since joining the team in Fall 2023, I’ve gained a lot of 
				experience with working with a tight-knit team on 
				production-grade Vue, Javascript, PHP, databases, and 
				other web technologies. The site is used daily by nearly 
				1,300 full-time instructors and over 30,000 students. 
				So far, I’ve built several instructor-facing pages and added 
				numerous major features relating to assignments, grading, 
				administrator tools, and more, while also ensuring that the 
				legacy system remains fully intact; at times even 
				backporting new features.
			</p>
		</div>
	</div>
</template>

<script>
import Icon from '../../common/Icon.vue';
import LazyImage from '../../common/LazyImage.vue';
import ScreenSize from '../../mixins/ScreenSize';
import ColorTheme from '../../mixins/ColorTheme';

export default {
	mixins: [ColorTheme, ScreenSize],
	components: {
		LazyImage,
		Icon,
	},
	props: {},
	data() {
		return {
			imagesLoaded: 0,
		};
	},
	computed: {
		imgSources() {
			return [
				`/assets/images/gradebook-${this.darkThemeString}.png`,
				`/assets/images/dialog-${this.darkThemeString}.png`,
				`/assets/images/assignments-${this.darkThemeString}.png`,
			];
		}
	},
	methods: {
		imageLoaded() {
			this.imagesLoaded++;
			if (this.imagesLoaded === 3) {
				this.setParentDimensions();
			}
		},
		setParentDimensions() {
			this.$nextTick(() => {
				const featuredSection = this.$refs['sectionWrapper'];
				const imagesWrapper = this.$refs['imgWrapper'];
				const featuredSectionRect = featuredSection.getBoundingClientRect();
				let bottom = 0;

				for (let child of imagesWrapper.children) {
					const rect = child.getBoundingClientRect();
					bottom = Math.max(bottom, rect.bottom - featuredSectionRect.top);
				}

				this.$refs['textContent'].style.marginTop = `${bottom -25}px`;
			});
		},
	},
	mounted() {
		this.watchForThemeSwitch((isDark) => {
			this.imagesLoaded = 0;
		});
	},
};
</script>

<style scoped>
.box-shadow-0-dark {
	box-shadow: 0px 0px 10px 5px rgba(0,0,0,0.6);
}
.box-shadow-1-dark {
	box-shadow: 0px 0px 15px 10px rgba(0,0,0,0.6);
}
.box-shadow-2-dark {
	box-shadow: 0px 0px 20px 15px rgba(0,0,0,0.6);
}

.box-shadow-0-light {
	box-shadow: 0px 0px 10px 5px rgba(100,100,100,0.6);
}
.box-shadow-1-light {
	box-shadow: 0px 0px 15px 10px rgba(100,100,100,0.6);
}
.box-shadow-2-light {
	box-shadow: 0px 0px 20px 15px rgba(100,100,100,0.6);
}
</style>
