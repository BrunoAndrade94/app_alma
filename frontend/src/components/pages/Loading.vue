<template>
	<div class="loading">
		<img src="@/assets/loading_pato.gif" alt="Carregado..." />
	</div>
</template>

<script>
	export default {
		nome: "Loading",
	};
</script>

<style>
	.loading {
		grid-area: content;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>