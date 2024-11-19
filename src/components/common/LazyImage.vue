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
		imgLoaded() {
			this.$refs['img'].src = this.src;
			this.$emit("loaded");
		},
		imgError() {
			this.$emit("error");
		},
	},
	created() {
		this.imgObj = new Image();
		this.imgObj.onload = this.imgLoaded;
		this.imgObj.onerror = this.imgError;
		this.imgObj.src = this.src;
	}
}
</script>

<style scoped>

</style>
