<template>
	<div :title="hoverText">
		<svg v-if="iconColor" :class="iconClasses" :style="{ color: finalIconColor }">
			<use :xlink:href="iconPath"></use>
		</svg>
		<img v-else :src="iconPath" :class="iconClasses" />
	</div>
</template>

<script>
import tailwindConfig from '../../../tailwind.config';

export default {
	components: {},
	props: {
		icon: {
			type: String,
			default: "",
		},
		size: {
			type: Number,
			default: 8,
		},
		iconColor: {
			type: [String, null],
			default: "currentColor",
		},
		hoverText: {
			type: String,
			default: "",
		},
	},
	data() {
		return {
			customColors: new Set(),
		};
	},
	computed: {
		iconPath() {
			return `assets/icons/${this.icon}.svg#icon`;
		},
		iconClasses() {
			return `h-${this.size} w-${this.size}`;
		},
		finalIconColor() {
			if (this.customColors.has(this.iconColor)) {
				return tailwindConfig.theme.colors[this.iconColor];
			}
			return this.iconColor;
		}
	},
	methods: {},
	created() {
		this.customColors = new Set(Object.keys(tailwindConfig.theme.colors));
	}
};
</script>

<style scoped>
</style>
