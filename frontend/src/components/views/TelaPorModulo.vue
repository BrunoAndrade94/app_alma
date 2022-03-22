<template>
	<div class="tela-por-modulo">
		<TituloPagina
			icone="fa-solid fa-boxes-stacked"
			titulo="Módulos"
			sub="Aqui pode gerenciar as informações dos módulos"
		/>
	</div>
</template>

<script>
	import axios from "axios";
	import g from "@/global";
	import TituloPagina from "../others/TituloPagina.vue";
	export default {
		components: { TituloPagina },
		data: function () {
			return {
				modulo: {},
			};
		},
		methods: {
			obterModulo() {
				axios.get(`${g.baseApi}:modulo`).then();
			},
		},
	};
</script>

<style>
</style>