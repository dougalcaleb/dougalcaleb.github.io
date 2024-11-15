<template>
	<div :class="['rounded-md text-white py-3 font-title font-bold w-max cursor-pointer m-2', rootClasses]" @click="$emit('click')">
		<div class="flex items-center h-full">
			<div :class="[{'mr-3': Boolean(icon) && $slots.default}]">
				<slot></slot> 
			</div>

			<img
				v-if="icon"
				:src="iconPath"
				:class="['h-5']"
				:style="iconColorStyle"
				:alt="icon"
			/>
		</div>
	</div>
</template>

<script>
export default {
	components: {},
	props: {
		icon: {
			type: String,
			default: "",
		},
		variant: {
			type: String,
			default: "general",
			validator: (val) => ["general", "action", "error", "cancel"].includes(val),
		},
		iconShade: {
			type: [String, Number],
			default: "white",
			validator: (val) => ["white", "black"].includes(val) || (typeof val === "number" && val >= 0 && val <= 100),
		}
	},
	data() {
		return {};
	},
	computed: {
		iconPath() {
			return `assets/icons/${this.icon}.svg`;
		},
		rootClasses() {
			let classes = "";

			switch (this.variant) {
				case "general":
					classes += "bg-purple-3";
					break;
				case "action":
					classes += "bg-blue-1";
					break;
			}

			if (this.$slots.default) {
				classes += " px-5";
			} else {
				classes += " px-4";
			}

			return classes;
		},
		iconColorStyle() {
			if (this.iconShade === "white") {
				return "filter: invert(1)";
			} else if (typeof this.iconShade === "number") {
				return `filter: invert(${this.iconShade}%)`;
			}
		},
	},
	methods: {},
};
</script>

<style scoped>

</style>
