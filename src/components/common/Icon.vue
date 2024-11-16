<template>
	<div>
		<svg v-if="icon" :class="iconClasses" :style="{ color: finalIconColor }">
			<use :xlink:href="iconPath"></use>
		</svg>
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
			type: String,
			default: "currentColor",
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
