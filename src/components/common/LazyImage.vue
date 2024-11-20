<template>
	<img :alt="alt" ref="img" >
</template>

<script>
export default {
	components: {
		
	},
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
		}
	},
	computed: {
		
	},
	methods: {
		loadImage() {
			this.imgObj = new Image();
			this.imgObj.onload = () => {
				this.$refs['img'].src = this.src;
				this.$emit("loaded");
			};
			this.imgObj.onerror = () => this.$emit("error");;
			this.imgObj.src = this.src;
		}
	},
	created() {
		this.loadImage();
	},
	watch: {
		src() {
			this.loadImage();
		}
	}
}
</script>

<style scoped>

</style>
