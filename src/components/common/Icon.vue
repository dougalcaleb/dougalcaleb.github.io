<template>
	<div :title="hoverText">
		<svg v-if="iconColor" :style="{ ...sizeStyle, color: finalIconColor }">
			<use :href="iconPath"></use>
		</svg>
		<img v-else :src="iconPath" :style="sizeStyle" />
	</div>
</template>

<script>
// Not inlined as data: URIs, since <use> can't reference fragments inside them
const iconUrls = import.meta.glob("@/assets/icons/**/*.svg", {
	query: "?no-inline",
	import: "default",
	eager: true,
});

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
	computed: {
		iconPath() {
			const url = iconUrls[`/src/assets/icons/${this.icon}.svg`];
			if (!url) {
				console.warn(`Icon not found: ${this.icon}`);
				return "";
			}
			return `${url}#icon`;
		},
		sizeStyle() {
			// Same scale as Tailwind's h-*/w-* utilities (0.25rem per step)
			const size = `${this.size * 0.25}rem`;
			return { width: size, height: size };
		},
		finalIconColor() {
			// Theme color names (e.g. "purple-3") resolve to their Tailwind variable; anything else is used as-is
			if (/^[a-z]+(-[a-z0-9]+)*$/i.test(this.iconColor)) {
				return `var(--color-${this.iconColor}, ${this.iconColor})`;
			}
			return this.iconColor;
		},
	},
};
</script>
