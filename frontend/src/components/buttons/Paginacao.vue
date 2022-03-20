<template>
	<div class="paginacao">
		<b-pagination
			pills
			v-model="mudarPagina"
			:total-rows="_total_rows"
			:per-page="_per_page"
			class="my-0"
		></b-pagination>
	</div>
</template>

<script>
	export default {
		props: ["_v_model", "_total_rows", "_per_page"],
		methods: {
			mudarPagina() {
				this.$store.commit("paginaAtual");
			},
		},
	};
</script>

<style>
</style>