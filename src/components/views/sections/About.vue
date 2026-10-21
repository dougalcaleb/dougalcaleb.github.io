<template>
	<div class="w-full h-max relative left-0 dark:bg-gray-3 bg-white px-6 sm:pl-32 sm:pr-12 pt-8 sm:pt-20">
		<h1 id="about_header" class="font-title text-2xl sm:px-0 sm:text-4xl dark:text-white text-gray-1 font-bold">
			ABOUT
		</h1>

		<p class="text-gray-1 dark:text-white font-body sm:px-4 pt-4 sm:pt-8 sm:text-lg">
			Hey! I’m Caleb. I’m a Utah-based programmer currently attending Brigham Young University pursuing a Master’s
			degree in Computer Science.
			<br class="p-4" /><br />
			I’ve been writing code since I was 12, when I discovered web development and took a few online courses at
			the encouragement of a friend and one of my teachers.
			<br /><br />
			In high school, I breezed through the three available web development and two game development courses, even
			writing a plugin (which is now Roundabout) that ended up being taught and used in the top level web
			development class. In my senior year, I attended Mountainland Technical College in Lehi, UT, and gained
			experience with a wide variety of web and general software technologies. Following my time at MTech, I
			interned at Verisk, working on their Xactware insurance analytics application for a summer.
			<br /><br />
			Now, I’m attending BYU for a Master’s in Computer Science, and I’m currently employed working on BYU
			Learning Suite, which is a custom and fully-featured LMS designed specifically for the needs of BYU students
			and instructors.
			<br /><br />
			My long term goal is to join a team researching quantum computing technology, and to write critical software
			infrastructure that will pave the way for quantum computers to continue to develop and alter the landscape
			of computing.
			<br /><br />
			Below you’ll see many of the technologies I’m familiar with. This list is always growing!
		</p>

		<div
			:class="[
				'grid skill_grid gap-2 sm:gap-4 text-gray-1 dark:text-white pt-8 sm:px-4',
				isMobile ? 'grid_2' : 'grid_3',
			]"
		>
			<template v-for="skill in skills" :key="skill.icon">
				<div class="flex items-center bg-gray-10 dark:bg-gray-2 rounded-lg px-2 border border-gray-5">
					<Icon
						:icon="skill.icon"
						:iconColor="skill.themed ? undefined : null"
						:hoverText="skill.hoverText ?? skill.name"
						class="px-1 sm:px-2 py-4 shrink-0"
					/>
					<p class="px-2 sm:px-4 py-2">{{ skill.name }}</p>
				</div>
			</template>
		</div>
	</div>
</template>

<script>
import Icon from "@/components/common/Icon.vue";
import ScreenSize from "@/components/mixins/ScreenSize";

// name: label shown beside the icon; hoverText: tooltip (defaults to name);
// themed: true to let the icon use its default theme color instead of its brand colors
const skills = [
	{ icon: "brand/js", name: "Javascript" },
	{ icon: "brand/html", name: "HTML5 / CSS3" },
	{ icon: "brand/ts", name: "Typescript" },
	{ icon: "brand/csharp", name: "C#" },
	{ icon: "brand/c++", name: "C++" },
	{ icon: "brand/python", name: "Python" },
	{ icon: "brand/aws", name: "AWS" },
	{ icon: "brand/java", name: "Java" },
	{ icon: "brand/vue", name: "Vue", hoverText: "Vue" },
	{ icon: "brand/react", name: "React", hoverText: "React" },
	{ icon: "brand/php", name: "PHP" },
	{ icon: "brand/node", name: "NodeJS" },
	{ icon: "brand/unity", name: "Unity3D" },
	{ icon: "brand/git", name: "Git" },
	{ icon: "fa/github", name: "Github", themed: true },
	{ icon: "brand/gitlab", name: "Gitlab" },
	{ icon: "brand/firebase", name: "Google Firebase" },
	{ icon: "brand/docker", name: "Docker" },
	{ icon: "brand/linux", name: "Linux" },
	{ icon: "brand/illustrator", name: "Illustrator" },
	{ icon: "brand/genai", name: "Agentic AI", themed: true },
];

export default {
	components: {
		Icon,
	},
	mixins: [ScreenSize],
	props: {
		showcaseBottom: Number,
	},
	data() {
		return { skills };
	},
	computed: {},
	methods: {},
};
</script>

<style scoped>
@reference "@/style.css";

.skill_grid p {
	@apply flex text-gray-1 dark:text-white font-body sm:text-lg;
}
.grid_2 {
	grid-template-columns: repeat(2, 1fr);
}
.grid_3 {
	grid-template-columns: repeat(3, 1fr);
}
</style>
