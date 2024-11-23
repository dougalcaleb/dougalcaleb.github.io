<template>
	<div :class="['rounded-md text-white py-3 font-title font-bold w-max h-max cursor-pointer m-2 duration-100 transition', rootClasses]" @click="$emit('click')">
		<div class="flex items-center h-full">
			<div :class="[{'mr-3': Boolean(icon) && $slots.default}]">
				<slot></slot> 
			</div>

			<Icon v-if="icon" :icon="icon" :size="iconSize" :iconColor="iconColor" />
		</div>
	</div>
</template>

<script>
import Icon from './Icon.vue';

export default {
	components: {
		Icon,
	},
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
		iconColor: {
			type: String,
			default: "currentColor",
		},
		iconSize: {
			type: Number,
			default: 5
		}
	},
	data() {
		return {};
	},
	computed: {
		iconPath() {
			return `assets/icons/fontawesome/${this.icon}.svg`;
		},
		rootClasses() {
			let classes = "";

			switch (this.variant) {
				case "general":
					classes += "bg-purple-3 hover:bg-purple-2";
					break;
				case "action":
					classes += "bg-blue-1 hover:bg-blue-0";
					break;
			}

			if (this.$slots.default) {
				classes += " px-8";
			} else {
				classes += " px-4";
			}

			return classes;
		},
	},
	methods: {},
};
</script>

<style scoped>

</style>
