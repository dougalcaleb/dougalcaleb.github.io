<template>
	<img ref="img" :alt="alt" />
</template>

<script>
export default {
	components: {},
	props: {
		src: {
			type: String,
			required: true,
		},
		alt: {
			type: String,
			default: "",
		},
	},
	data() {
		return {
			imgObj: null,
		};
	},
	computed: {},
	watch: {
		src() {
			this.loadImage();
		},
	},
	created() {
		this.loadImage();
	},
	methods: {
		loadImage() {
			this.imgObj = new Image();
			this.imgObj.onload = () => {
				this.$refs["img"].src = this.src;
				this.$emit("loaded");
			};
			this.imgObj.onerror = () => this.$emit("error");
			this.imgObj.src = this.src;
		},
	},
};
</script>

<style scoped></style>
