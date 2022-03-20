<template>
	<div class="content">
		<router-view />
	</div>
</template>

<script>
	export default {};
</script>

<style>
	.content {
		grid-area: content;
		background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);
		padding: 20px;
	}
</style>