<template>
	<div class="paginacao">
		<b-pagination
			pills
			v-model="_v_model"
			:total-rows="_total_rows"
			:per-page="_per_page"
			class="my-0"
		></b-pagination>
	</div>
</template>

<script>
	export default {
		props: ["_v_model", "_total_rows", "_per_page"],
		methods: {},
	};
</script>
 
<style>
</style>