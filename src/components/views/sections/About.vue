<template>
	<div 
		class="w-full h-max relative left-0 dark:bg-gray-3 bg-white px-8 sm:pl-32 sm:pr-12 pt-8 sm:pt-20"	
	>

		<h1 class="font-title text-2xl sm:px-0 sm:text-4xl dark:text-white text-gray-1 font-bold">ABOUT</h1>
		
		<p class="text-gray-1 dark:text-white font-body sm:px-4 pt-2 sm:pt-8 sm:text-lg">
			Hey! I’m Caleb. I’m a Utah-based programmer currently attending Brigham Young University pursuing a Master’s degree in 
			Computer Science. 
			<br class="p-4" /><br/>
			I’ve been writing code since I was 12, when I discovered web development and took a few online courses at the encouragement
			of a friend and one of my teachers.
			<br/><br/>
			In high school, I breezed through the three available web development and two game development courses, even writing a plugin
			(which is now Roundabout) that ended up being taught and used in the top level web development class. In my senior year, I attended
			Mountainland Technical College in Lehi, UT, and gained experience with a wide variety of web and general software technologies. 
			Following my time at MTech, I interned at Verisk, working on their Xactware insurance analytics application for a summer. 
			<br/><br/>
			Now, I’m attending BYU for a Master’s in Computer Science, and I’m currently employed working on BYU Learning Suite, which is a custom
			and fully-featured LMS designed specifically for the needs of BYU students and instructors.
			<br/><br/>
			My long term goal is to join a team researching quantum computing technology, and to write critical software infrastructure that will
			pave the way for quantum computers to continue to develop and alter the landscape of computing.
			<br/><br/>
			Below you’ll see many of the technologies I’m familiar with. This list is always growing!
		</p>

		<div :class="['grid skill_grid text-gray-1 dark:text-white pt-8 sm:px-4', isMobile ? 'grid_2' : 'grid_3']">
			<Icon icon="brand/js" :iconColor="null" hoverText="Javascript" class="p-2 py-4"/>
			<p>Javascript</p>
			<Icon icon="brand/html" :iconColor="null" hoverText="HTML5" class="p-2 py-4"/>
			<p>HTML5</p>
			<Icon icon="brand/css" :iconColor="null" hoverText="CSS / SCSS / SASS" class="p-2 py-4"/>
			<p>CSS / SCSS / SASS</p>
			<Icon icon="brand/ts" :iconColor="null" hoverText="Typescript" class="p-2 py-4"/>
			<p>Typescript</p>
			<Icon icon="brand/csharp" :iconColor="null" hoverText="C#" class="p-2 py-4"/>
			<p>C#</p>
			<Icon icon="brand/c++" :iconColor="null" hoverText="C++" class="p-2 py-4"/>
			<p>C++</p>
			<Icon icon="brand/python" :iconColor="null" hoverText="Python" class="p-2 py-4"/>
			<p>Python</p>
			<Icon icon="brand/java" :iconColor="null" hoverText="Java" class="p-2 py-4"/>
			<p>Java</p>
			<Icon icon="brand/vue" :iconColor="null" hoverText="Vue" class="p-2 py-4" />
			<p>Vue (Vue 2 and Vue 3)</p>
			<Icon icon="brand/php" :iconColor="null" hoverText="PHP" class="p-2 py-4" />
			<p>PHP</p>
			<Icon icon="brand/node" :iconColor="null" hoverText="NodeJS" class="p-2 py-4" />
			<p>NodeJS</p>
			<Icon icon="brand/unity" :iconColor="null" hoverText="Unity3D" class="p-2 py-4" />
			<p>Unity3D</p>
			<Icon icon="brand/git" :iconColor="null" hoverText="Git" class="p-2 py-4" />
			<p>Git</p>
			<Icon icon="fa/github" hoverText="Github" class="p-2 py-4" />
			<p>Github</p>
			<Icon icon="brand/gitlab" :iconColor="null" hoverText="Gitlab" class="p-2 py-4" />
			<p>Gitlab</p>
			<Icon icon="brand/firebase" :iconColor="null" hoverText="Google Firebase" class="p-2 py-4" />
			<p>Google Firebase</p>
			<Icon icon="brand/docker" :iconColor="null" hoverText="Docker" class="p-2 py-4" />
			<p>Docker</p>
			<Icon icon="brand/linux" :iconColor="null" hoverText="Linux" class="p-2 py-4" />
			<p>Linux</p>
			<Icon icon="brand/illustrator" :iconColor="null" hoverText="Illustrator" class="p-2 py-4" />
			<p>Illustrator</p>

		</div>
	</div>
</template>

<script>
import Icon from '../../common/Icon.vue';
import ScreenSize from '../../mixins/ScreenSize';

export default {
	mixins: [ScreenSize],
	components: {
		Icon,
	},
	props: {
		showcaseBottom: Number,
	},
	data() {
		return {
			
		}
	},
	computed: {
		
	},
	methods: {
		
	}
}
</script>

<style scoped>
.skill_grid p {
	@apply flex text-gray-1 dark:text-white font-body sm:text-lg p-4
}
.grid_2 {
	grid-template-columns: max-content 1fr max-content 1fr;
}
.grid_3 {
	grid-template-columns: max-content 1fr max-content 1fr max-content 1fr;
}
</style>
