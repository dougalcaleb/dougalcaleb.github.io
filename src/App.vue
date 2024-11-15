<template>
	<div>
		<h2>This website is being upgraded. Please check back again soon.</h2>
		<img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
		<img src="./assets/profile-square.jpg" class="logo profile" alt="Vue logo" />
	</div>
</template>

<script setup>

</script>

<style scoped>
.logo {
	height: 6em;
	padding: 1.5em;
	will-change: filter;
	transition: filter 300ms;
}
.logo.profile {
	border-radius: 30%;
}
</style>
