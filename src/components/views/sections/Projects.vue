<template>
	<div
		class="w-full h-max relative left-0 dark:bg-gray-3 bg-white px-2 sm:px-8 sm:pl-32 sm:pr-12 pt-8 sm:pt-20"	
	>

		<h1 class="font-title text-2xl px-6 sm:px-0 sm:text-4xl dark:text-white text-gray-1 font-bold" id="projects_header">PROJECTS</h1>

		<div class="grid xl:grid-cols-2">
			<div id="image-carousel-wrapper" class="relative py-8 xl:px-8 grid image_grid_cols dark:text-white text-gray-1">
				<div class="flex flex-col justify-center">
					<Icon icon="fa/chevron-left" class="xl:mx-2 cursor-pointer" :size="isMobile ? 8 : 12" @click="scrollCarousel('l')"/>
				</div>
				<div id="image-carousel-parent" :class="[isMobile ? 'h-48' : 'xl_height']"></div>
				<div class="flex flex-col justify-center">
					<Icon icon="fa/chevron-right" class="xl:mx-2 cursor-pointer" :size="isMobile ? 8 : 12" @click="scrollCarousel('r')"/>
				</div>
			</div>
			<div id="description-carousel-wrapper" :class="['relative xl:p-8', isMobile ? 'xl_height px-6' : 'xl_height']">
				<div id="description-template">
					<div>
						<div class="desc_content_wrap">
							<h3 class="desc_title">Physics2D</h3>
							<p class="desc_body">I built this 2D physics engine with the intent of putting to use everything I had learned about data structures and algorithms from my University courses. 
								While this is still a WIP project, it does feature a highly optimized and efficient core, and I intend on building this out into a small plugin that 
								can be used to create simple interactive experiences in-browser. This is currently in use on this site for the physics simulation on the landing page.
							</p>
							<div class="flex mt-8">
								<Icon icon="brand/js" :iconColor="null" hoverText="Javascript" />
							</div>
							<a href="https://github.com/dougalcaleb/Physics2D" target="_blank" class="flex w-max">
								<IconButton icon="fa/external" :iconSize="5" class="mt-8">Repository</IconButton>
							</a>
						</div>
					</div>
					<div>
						<div class="desc_content_wrap">
							<h3 class="desc_title">Corruption's Edge</h3>
							<p class="desc_body">
								This game was built entirely from scratch in two days for the MelonJam 2024 game jam on itch.io, and ended up winning 3rd place in its category.
								Our goal was to create a simple but highly polished game that was satisfying to play, fully fleshed out, and clear to players.
								The game features extremely responsive controls, a dynamic camera system, an original soundtrack, and an invitingly simple art style.
								Additionally, despite being a two-day project, I am proud of my extremely clean code organization, which helped me to iterate and collaborate quickly and easily.
							</p>
							<div class="flex mt-8">
								<Icon icon="brand/csharp" :iconColor="null" hoverText="C#" class="mr-2" />
								<Icon icon="brand/unity" :iconColor="null" hoverText="Unity" />
							</div>
							<a href="https://theexception.itch.io/corruptionsedge" target="_blank" class="flex w-max">
								<IconButton icon="fa/external" :iconSize="5" class="mt-8">Play in browser</IconButton>
							</a>
						</div>
					</div>
					<div>
						<div class="desc_content_wrap">
							<h3 class="desc_title">Minecraft Server Status Bot</h3>
							<p class="desc_body">Hook this plugin up to your own Minecraft server in just a few minutes and feel your server administration stress drop to zero. 
								Now you can always keep tabs on the health of your Minecraft server, in Discord, from anywhere! Over the several times I've used this for my friends'
								Minecraft worlds, I've learned a lot about networking and server hosting, and what goes into maintaining servers.
							</p>
							<div class="flex mt-8 text-gray-1 dark:text-white">
								<Icon icon="brand/node" :iconColor="null" hoverText="NodeJS" class="mr-1" />
								<Icon icon="brand/java" :iconColor="null" hoverText="Java" class="mr-1" />
								<Icon icon="brand/raspberrypi" hoverText="Raspberry Pi" class="mr-1" />
								<Icon icon="brand/api" hoverText="APIs" class="mr-1" />
							</div>
							<a href="https://github.com/dougalcaleb/spigot-status-bot" target="_blank" class="flex w-max">
								<IconButton icon="fa/external" :iconSize="5" class="mt-8">Repository</IconButton>
							</a>
						</div>
					</div>
					<div>
						<div class="desc_content_wrap">
							<h3 class="desc_title">Alchemy Ascension</h3>
							<p class="desc_body">This game was built over a 3-day weekend by me and a friend as part of an itch.io game jam focused on speedrunning with a theme of "Ascend".
								Playing as a wizard whose ultimate goal is ascending to godhood, you must learn how to quickly gather your potion ingredients - either peacefully
								or by force. With responsive controls, charming pixel art, and over a dozen potions to brew, you must find the quickest way to achieve your goal. 
								<br/> <br/>
								Can you beat 60 seconds?
							</p>
							<div class="flex mt-8">
								<Icon icon="brand/csharp" :iconColor="null" hoverText="C#" class="mr-2" />
								<Icon icon="brand/unity" :iconColor="null" hoverText="Unity" />
							</div>
							<a href="https://dougalcaleb.itch.io/alchemy-ascension" target="_blank" class="flex w-max">
								<IconButton icon="fa/external" :iconSize="5" class="mt-8">Play in browser</IconButton>
							</a>
						</div>
					</div>
					<div>
						<div class="desc_content_wrap">
							<h3 class="desc_title">Roundabout</h3>
							<p class="desc_body">An easy to use, extremely configurable, and responsive carousel plugin for the web. I built this during my junior-senior years of
								high school, and it ended up being taught to my Web Development 3 class for two days as part of the class curriculum. This carousel was made with Roundabout!
							</p>
							<div class="flex mt-8 text-gray-1 dark:text-white">
								<Icon icon="brand/js" :iconColor="null" hoverText="Javascript" class="mr-2" />
								<Icon icon="brand/html" :iconColor="null" hoverText="HTML5" class="mr-2" />
								<Icon icon="brand/css" :iconColor="null" hoverText="CSS3" class="mr-2" />
								<Icon icon="brand/git" :iconColor="null" hoverText="Git" class="mr-2" />
								<Icon icon="fa/github" hoverText="Github" />
							</div>
							<a href="https://github.com/dougalcaleb/roundabout" target="_blank" class="flex w-max">
								<IconButton icon="fa/external" :iconSize="5" class="mt-8">Repository</IconButton>
							</a>
							<a href="/roundabout/docs.html" target="_blank" class="flex w-max">
								<IconButton icon="fa/external" :iconSize="5" class="mt-4">Docs</IconButton>
							</a>
						</div>
					</div>
					<div>
						<div class="desc_content_wrap">
							<h3 class="desc_title">Polygen</h3>
							<p class="desc_body">Revamped in version 2.0, this is an easy-to-use tool for creating low-poly gradients and images, 
								downloadable in PNG or SVG format. From this project, I learned a lot about canvas drawing, image processing, and UI/UX design.
								 The background of the landing page on this site uses this!
							</p>
							<div class="flex mt-8 text-gray-1 dark:text-white">
								<Icon icon="brand/js" :iconColor="null" hoverText="Javascript" class="mr-2" />
								<Icon icon="brand/html" :iconColor="null" hoverText="HTML5" class="mr-2" />
								<Icon icon="brand/css" :iconColor="null" hoverText="CSS3" class="mr-2" />
							</div>
							<a href="/portfolio/polygen/index.html" target="_blank">
								<IconButton icon="fa/external" :iconSize="5" class="mt-8">Visit</IconButton>
							</a>
						</div>
					</div>
					<div>
						<div class="desc_content_wrap">
							<h3 class="desc_title">Storm Center</h3>
							<p class="desc_body">In my junior year of high school, I was asked to design and build a webpage for our school spirit store. While it isn't live anymore, it served
								as a catalog for all of the school's available spirit items. This was my first live project!
							</p>
							<div class="flex mt-8 text-gray-1 dark:text-white">
								<Icon icon="brand/js" :iconColor="null" hoverText="Javascript" class="mr-2" />
								<Icon icon="brand/html" :iconColor="null" hoverText="HTML5" class="mr-2" />
								<Icon icon="brand/css" :iconColor="null" hoverText="CSS3" class="mr-2" />
							</div>
						</div>
					</div>
					<div>
						<div class="desc_content_wrap">
							<h3 class="desc_title">Isometry</h3>
							<p class="desc_body">This game, built in Unity, is an entertaining survival experience, letting you survive a constant onslaught 
								of enemies while trying to protect and upgrade the ancient monolith. This my final project for my high school Game Development class, and 
								features full support for both keyboard and controller, utilizes a powerful particle system, and incorporates a low-poly 3D environment viewed from an isometric angle.
							</p>
							<div class="flex mt-8 text-gray-1 dark:text-white">
								<Icon icon="brand/csharp" :iconColor="null" hoverText="C#" class="mr-2" />
								<Icon icon="brand/unity" :iconColor="null" hoverText="Unity3D" />
							</div>
						</div>
					</div>
					<div>
						<div class="desc_content_wrap">
							<h3 class="desc_title">React Chat App</h3>
							<p class="desc_body">Using React and Firebase, this simple chat app features login capabilities for identifying users, persistent and low-latency cloud storage, and seperate message channels.
								While most of my experience in front-end frameworks is in Vue (like this site!), I have some additional experience in React and Angular, like this project.
							</p>
							<div class="flex mt-8 text-gray-1 dark:text-white">
								<Icon icon="brand/react" :iconColor="null" hoverText="React" class="mr-2" />
								<Icon icon="brand/js" :iconColor="null" hoverText="Javascript" class="mr-2" />
								<Icon icon="brand/firebase" :iconColor="null" hoverText="Google Firebase" class="mr-2" />
								<Icon icon="brand/git" :iconColor="null" hoverText="Git" class="mr-2" />
								<Icon icon="fa/github" hoverText="Github" class="mr-2" />
								<Icon icon="brand/api" hoverText="Public APIs" class="mr-2" />
							</div>
						</div>
					</div>
					<div>
						<div class="desc_content_wrap">
							<h3 class="desc_title">Reactive Bubbles</h3>
							<p class="desc_body">This field of bubbles will react to your mouse movements as you swipe through it. This was one of my earlier complete projects as I started to move away
								from basic experimentation of Javascript.
							</p>
							<div class="flex mt-8 text-gray-1 dark:text-white">
								<Icon icon="brand/js" :iconColor="null" hoverText="Javascript" class="mr-2" />
								<Icon icon="brand/html" :iconColor="null" hoverText="HTML5" class="mr-2" />
								<Icon icon="brand/css" :iconColor="null" hoverText="CSS3" class="mr-2" />
							</div>
							<a href="/portfolio/bubbles/index.html" target="_blank">
								<IconButton icon="fa/external" :iconSize="5" class="mt-8">Visit</IconButton>
							</a>
						</div>
					</div>
					<div>
						<div class="desc_content_wrap">
							<h3 class="desc_title">Stronger Together</h3>
							<p class="desc_body">Built over the course of a week for Brackeys Game Jam 2021.1 along with two friends, this game has a unique take on the wave fighting genre, 
								where you must prevent an army of enemies from amassing enough allies to defeat you.
							</p>
							<div class="flex mt-8 text-gray-1 dark:text-white">
								<Icon icon="brand/csharp" :iconColor="null" hoverText="C#" class="mr-2" />
								<Icon icon="brand/unity" :iconColor="null" hoverText="Unity3D" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
import Roundabout from '../../../modules/roundabout/roundabout.min';
import RoundaboutScripter from '../../../modules/roundabout/roundabout-scripting.min';
import Icon from '../../common/Icon.vue';
import IconButton from '../../common/IconButton.vue';
import ScreenSize from '../../mixins/ScreenSize';

export default {
	mixins: [ScreenSize],
	components: {
		Icon,
		IconButton,
	},
	props: {
		
	},
	data() {
		return {
			roundaboutInstances: [null, null],
			imageCarouselSettings: {
				parent: "#image-carousel-parent",
				id: "#image-carousel",
				navigation: false,
				buttons: false,
				keys: false,
				scrollwheel: true,
				lazyLoad: "lazy-hidden",
				swipeThreshold: 50,
				pages: [
					{ backgroundImage: "/assets/images/projects-slider/physics2d.png" },
					{ backgroundImage: "/assets/images/projects-slider/polarity.png" },
					{ backgroundImage: "/assets/images/projects-slider/spigot-status-bot-wide.png" },
					{ backgroundImage: "/assets/images/projects-slider/alchemy-ascension.png" },
					{ backgroundImage: "/assets/images/projects-slider/roundabout.png" },
					{ backgroundImage: "/assets/images/projects-slider/polygen.png" },
					{ backgroundImage: "/assets/images/projects-slider/stormcenter.png" },
					{ backgroundImage: "/assets/images/projects-slider/gamedevfinal.png" },
					{ backgroundImage: "/assets/images/projects-slider/react-chat.png" },
					{ backgroundImage: "/assets/images/projects-slider/bubbles.png" },
					{ backgroundImage: "/assets/images/projects-slider/stronger-together.png" },
				]
			},
			descriptionCarouselSettings: {
				template: "#description-template",
				id: "#description-carousel",
				uiEnabled: false,
				keys: false,
				type: "gallery",
				transition: 200,
			}
		}
	},
	computed: {
		
	},
	methods: {
		scrollCarousel(direction) {
			RoundaboutScripter.throttledScroll(this.roundaboutInstances[0], direction === 'l' ? -1 : 1);
		}
	},
	mounted() {
		this.roundaboutInstances[0] = new Roundabout(this.imageCarouselSettings);
		this.roundaboutInstances[1] = new Roundabout(this.descriptionCarouselSettings);

		RoundaboutScripter.onScroll(this.roundaboutInstances[0], (dist) => {
			RoundaboutScripter.scroll(this.roundaboutInstances[1], dist);
			if (this.isMobile || this.isTablet) {
				const bbox = document.querySelector(".roundabout-1-visible-page-0 .desc_content_wrap").getBoundingClientRect();
				this.$emit("scroll", bbox.bottom);
			}
		});
	}
}
</script>

<style scoped>
.desc_title {
	@apply font-subtitle dark:text-white text-gray-1 font-bold text-3xl
}
.desc_body {
	@apply font-body dark:text-gray-10 text-gray-1 text-lg mt-4
}
.xl_height {
	height: 40rem;
}
.image_grid_cols {
	grid-template-columns: max-content 1fr max-content;
}
</style>
